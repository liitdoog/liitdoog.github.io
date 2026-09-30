#!/usr/bin/env node
/**
 * 作品同步与压缩脚本
 *
 * 把「作品/<标签>/」里的原图压缩后输出到「public/作品/<标签>/」，
 * 并生成 public/作品/manifest.json，供构建期读取。
 *
 * 平时不用手动跑 —— npm 会在 `npm run dev` 和 `npm run build` 之前自动执行。
 * 想单独跑一次：npm run sync
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "作品");
const OUT_DIR = path.join(ROOT, "public", "作品");
const MANIFEST = path.join(OUT_DIR, "manifest.json");

// ---- 压缩参数 ----------------------------------------------------------
const SHORT_EDGE = 1080; // 图片短边像素（和微信一致），长边按比例
const JPEG_QUALITY = 82;

// 认识的图片后缀 -> 输出后缀。浏览器不支持的 tif / heic 统一转成 jpg。
const EXT_MAP = {
  ".jpg": ".jpg",
  ".jpeg": ".jpg",
  ".png": ".png",
  ".webp": ".webp",
  ".avif": ".avif",
  ".tif": ".jpg",
  ".tiff": ".jpg",
  ".heic": ".jpg",
  ".heif": ".jpg",
};

// Windows 不允许出现在文件名里的字符；# % 在 URL 里也容易出岔子，一并去掉
const ILLEGAL_CHARS = ["<", ">", ":", '"', "|", "?", "*", "#", "%", "\\", "/"];

// 中文按拼音排序，数字按数值排序（01- 会排在 02- 前面）
const collator = new Intl.Collator("zh-Hans-CN", { numeric: true, sensitivity: "base" });

// ---- 小工具 ------------------------------------------------------------

/** 去掉文件名里的非法字符，并清掉首尾的点和空格（Windows 不允许文件名以它们结尾） */
function sanitizeStem(stem) {
  let out = "";
  for (const ch of stem) {
    const code = ch.codePointAt(0);
    if (code < 0x20 || code === 0x7f) continue; // 控制字符
    if (ILLEGAL_CHARS.includes(ch)) continue;
    out += ch;
  }
  return out
    .replace(/\s+/g, " ")
    .replace(/^[\s.]+/, "")
    .replace(/[\s.]+$/, "");
}

/** 「01-窗边」->「窗边」；没有数字前缀就原样返回 */
function parseTitle(stem) {
  const m = stem.match(/^(\d{1,3})[-_](.+)$/);
  return m ? m[2].trim() : stem;
}

/** 拼 URL：统一用 /，并且按段做百分号编码 */
function toUrl(category, fileName) {
  return `/作品/${encodeURIComponent(category)}/${encodeURIComponent(fileName)}`;
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function decodeError(category, file, ext, err) {
  const heicHint =
    ext === ".heic" || ext === ".heif"
      ? "\n      iPhone 拍的 HEIC 需要先转成 JPG：手机「设置 → 相机 → 格式」选「兼容性最佳」，\n" +
        "      或在电脑上用「导出为 JPEG」之后再放进 作品/ 文件夹。"
      : "";
  return `作品/${category}/${file}：读不出来（${err.message}）。${heicHint}`;
}

function writeManifest(categories, works) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    MANIFEST,
    JSON.stringify(
      {
        version: 1,
        params: { shortEdge: SHORT_EDGE, quality: JPEG_QUALITY },
        categories,
        works,
      },
      null,
      2
    )
  );
}

// ---- 主流程 ------------------------------------------------------------

async function main() {
  // public/作品/ 完全由本脚本生成，每次清空重建，避免删掉的照片残留在产物里
  fs.rmSync(OUT_DIR, { recursive: true, force: true });

  if (!fs.existsSync(SRC_DIR)) {
    console.log("⚠ 没有找到 作品/ 目录，跳过。网站会显示「作品整理中」。");
    writeManifest([], []);
    return;
  }

  const folders = fs
    .readdirSync(SRC_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".") && !d.name.startsWith("_"))
    .map((d) => d.name)
    .sort(collator.compare);

  if (folders.length === 0) {
    console.log("⚠ 作品/ 下还没有任何标签文件夹，跳过。");
    writeManifest([], []);
    return;
  }

  const works = [];
  const errors = [];
  const skipped = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const category of folders) {
    const srcFolder = path.join(SRC_DIR, category);
    const outFolder = path.join(OUT_DIR, category);
    const files = fs
      .readdirSync(srcFolder, { withFileTypes: true })
      .filter((f) => f.isFile() && !f.name.startsWith("."))
      .map((f) => f.name)
      .sort(collator.compare);

    const usedNames = new Map(); // 输出文件名（小写）-> 来源文件名，用于查重
    let count = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!EXT_MAP[ext]) {
        skipped.push(`${category}/${file}`); // .gitkeep、README、Thumbs.db 之类
        continue;
      }

      const srcPath = path.join(srcFolder, file);
      const stem = sanitizeStem(path.basename(file, path.extname(file)));
      if (!stem) {
        errors.push(`作品/${category}/${file}：文件名去掉非法字符后变成空的，请改个名字。`);
        continue;
      }

      let meta;
      try {
        meta = await sharp(srcPath).metadata();
      } catch (err) {
        errors.push(decodeError(category, file, ext, err));
        continue;
      }

      // PNG 没有透明通道时按照片处理，转成 jpg 能小一大截
      const outExt = ext === ".png" && !meta.hasAlpha ? ".jpg" : EXT_MAP[ext];
      const outName = stem + outExt;

      const key = outName.toLowerCase();
      if (usedNames.has(key)) {
        errors.push(
          `作品/${category}/ 里有两个文件会输出成同一个名字「${outName}」：\n` +
            `      ${usedNames.get(key)} 和 ${file}\n` +
            `      请给其中一个改名（比如加上 01- 前缀）。`
        );
        continue;
      }
      usedNames.set(key, file);

      try {
        // .rotate() 必须放在 resize 之前：手机/相机照片靠 EXIF 记录方向，
        // 不先摆正，「短边 1080」会算错（竖图会被压成 810 宽）。
        const pipeline = sharp(srcPath)
          .rotate()
          .resize({
            width: SHORT_EDGE,
            height: SHORT_EDGE,
            fit: "outside", // 保证短边正好等于 SHORT_EDGE
            withoutEnlargement: true, // 本来就比 1080 小的图不放大
          });

        if (outExt === ".jpg") {
          pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true });
        } else if (outExt === ".png") {
          pipeline.png({ compressionLevel: 9 });
        } else if (outExt === ".webp") {
          pipeline.webp({ quality: JPEG_QUALITY });
        } else {
          pipeline.avif({ quality: 60 });
        }

        const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

        fs.mkdirSync(outFolder, { recursive: true });
        fs.writeFileSync(path.join(outFolder, outName), data);

        totalIn += fs.statSync(srcPath).size;
        totalOut += data.length;
        count++;

        works.push({
          id: `${category}/${outName}`,
          category,
          title: parseTitle(stem),
          url: toUrl(category, outName),
          width: info.width,
          height: info.height,
          bytes: data.length,
          sortKey: stem,
        });
      } catch (err) {
        errors.push(decodeError(category, file, ext, err));
      }
    }

    if (count === 0) {
      fs.rmSync(outFolder, { recursive: true, force: true }); // 别在产物里留空壳
    }
  }

  // 同一标签内按文件名自然排序（01- 前缀会自动排在前面）
  works.sort((a, b) => {
    const byCat = collator.compare(a.category, b.category);
    return byCat !== 0 ? byCat : collator.compare(a.sortKey, b.sortKey);
  });

  const categories = folders.filter((c) => works.some((w) => w.category === c));

  writeManifest(
    categories,
    works.map(({ sortKey, ...w }) => w)
  );

  // ---- 汇总 ----------------------------------------------------------
  for (const category of categories) {
    const n = works.filter((w) => w.category === category).length;
    console.log(`  ${category}  ${n} 张`);
  }
  if (works.length > 0) {
    console.log(`✔ 作品同步完成：${works.length} 张，${formatSize(totalIn)} → ${formatSize(totalOut)}`);
  } else {
    console.log("⚠ 作品/ 下还没有可用图片。");
  }
  if (skipped.length > 0) {
    const head = skipped.slice(0, 3).join("、");
    console.log(`  （忽略了 ${skipped.length} 个非图片文件：${head}${skipped.length > 3 ? "…" : ""}）`);
  }

  if (errors.length > 0) {
    console.error(`\n✖ 有 ${errors.length} 个文件没能处理：\n`);
    for (const e of errors) console.error(`  · ${e}`);
    console.error("");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n✖ 作品同步脚本出错：", err.message);
  if (err.code === "MODULE_NOT_FOUND") {
    console.error("  看起来还没装依赖，先执行 npm install。");
  }
  process.exit(1);
});
