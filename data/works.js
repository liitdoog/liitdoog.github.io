// 作品数据 —— 构建时从 public/作品/manifest.json 读取
//
// 清单由 scripts/sync-works.mjs 自动生成，源文件在项目根目录的「作品/」文件夹。
// 想加照片，把图片放进 作品/<标签>/ 即可，不需要改这里的代码。
//
// ⚠️ 本文件只能被 Server Component 导入。
//    它依赖 node:fs，一旦被 "use client" 的组件 import，构建会直接报错。
//    客户端组件需要的作品数据，请由服务端通过 props 传进去
//    （参考 app/works/page.js 和 app/works/WorksClient.js 的拆分）。

import fs from "node:fs";
import path from "node:path";

/** 首页「练习作品」取这个文件夹里的照片 */
export const FEATURED_FOLDER = "精选";

const MANIFEST = path.join(process.cwd(), "public", "作品", "manifest.json");

function readManifest() {
  if (!fs.existsSync(MANIFEST)) {
    throw new Error(
      "找不到作品清单 public/作品/manifest.json。\n" +
        "  请用 `npm run dev` / `npm run build` 启动（它们会自动先生成清单），\n" +
        "  不要直接运行 `next build`。"
    );
  }
  return JSON.parse(fs.readFileSync(MANIFEST, "utf-8"));
}

/**
 * 全部作品，字段：{ id, category, title, url, width, height }
 * 写成函数而不是常量，这样开发时刷新页面就能读到刚同步进来的新照片。
 */
export function getWorks() {
  return readManifest().works;
}

/** 作品页的标签列表，首位固定是「全部」 */
export function getCategories() {
  return ["全部", ...readManifest().categories];
}

/** 首页展示的精选作品 */
export function getFeatured() {
  return readManifest().works.filter((w) => w.category === FEATURED_FOLDER);
}
