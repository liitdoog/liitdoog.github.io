#!/usr/bin/env node
/**
 * 一键推送：检查代理 → 打包 → 上传
 *
 * 由「更新网站.bat」双击调用，也可以手动执行：npm run push
 *
 * 放在 Node 里而不是写在 .bat 里，是因为 cmd 的代码页处理中文太容易出错
 * （chcp 65001 之后 cmd 会用旧代码页算出的偏移读文件，把行劈成两半）。
 */

import { execFileSync } from "node:child_process";
import { spawnSync } from "node:child_process";
import net from "node:net";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";

const PROXY_HOST = "127.0.0.1";
const PROXY_PORT = 7890;
const SITE = "https://liitdoog.github.io/";
const ACTIONS = "https://github.com/liitdoog/liitdoog.github.io/actions";

const line = "==========================================";

function say(msg = "") {
  console.log(msg);
}

/** 跑一条 git 命令，返回 stdout（失败时抛错） */
function git(args, { quiet = true } = {}) {
  return execFileSync("git", args, {
    encoding: "utf-8",
    stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
  });
}

/** 检查本地代理端口有没有在监听 */
function proxyUp() {
  return new Promise((resolve) => {
    const sock = net.connect({ host: PROXY_HOST, port: PROXY_PORT });
    const done = (ok) => {
      sock.destroy();
      resolve(ok);
    };
    sock.setTimeout(1200);
    sock.once("connect", () => done(true));
    sock.once("timeout", () => done(false));
    sock.once("error", () => done(false));
  });
}

/** 结束后等一下回车，这样双击运行时窗口不会一闪就没 */
async function hold() {
  if (!process.stdin.isTTY) return; // 非交互环境（比如被脚本调用）直接跳过
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await new Promise((r) => rl.question("\n按回车键关闭窗口…", () => (rl.close(), r())));
}

async function fail(msg) {
  say("");
  say(`  [X] ${msg}`);
  say("");
  await hold();
  process.exit(1);
}

async function main() {
  say("");
  say(`  ${line}`);
  say("                更新网站");
  say(`  ${line}`);
  say("");

  // ---- 0. 环境检查 ----
  const probe = spawnSync("git", ["--version"], { encoding: "utf-8" });
  if (probe.error) {
    await fail("找不到 git，请确认已经安装 Git for Windows。");
  }

  // ---- 1. 代理 ----
  if (!(await proxyUp())) {
    say(`  [X] 代理没有开，连不上 GitHub`);
    say("");
    say(`      请在 ${PROXY_HOST}:${PROXY_PORT} 上启动代理客户端（Clash / v2ray 之类），`);
    say("      然后重新双击一次这个文件。");
    say("");
    await hold();
    process.exit(1);
  }
  say("  [1/4] 代理正常");

  // ---- 2. 有没有改动 ----
  const status = git(["status", "--porcelain"]).trim();
  if (!status) {
    say("");
    say("  [!] 没有任何改动，不需要推送。");
    say("      照片要先放进 作品\\ 里面对应的文件夹哦。");
    say("");
    await hold();
    process.exit(0);
  }

  const changed = status.split("\n");
  const photos = changed.filter((l) => /\.(jpe?g|png|webp|avif|tiff?|heic|heif)$/i.test(l));
  say(`  [2/4] 发现 ${changed.length} 处改动${photos.length ? `（其中 ${photos.length} 张照片）` : ""}`);
  for (const l of changed.slice(0, 8)) {
    say(`        ${l.slice(0, 3).trim() || "?"}  ${l.slice(3)}`);
  }
  if (changed.length > 8) say(`        …还有 ${changed.length - 8} 处`);

  // ---- 3. 打包 ----
  try {
    git(["add", "-A"]);
  } catch (err) {
    await fail(`打包失败：${err.message}`);
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const msgFile = path.join(os.tmpdir(), `ws-commit-${process.pid}.txt`);
  fs.writeFileSync(msgFile, `更新网站 ${stamp}\n`, "utf-8"); // 写成 UTF-8，git 读进去才不会乱码

  try {
    git(["commit", "-F", msgFile]);
  } catch (err) {
    await fail(`打包失败：${err.message}`);
  } finally {
    fs.rmSync(msgFile, { force: true });
  }
  say("  [3/4] 已打包");

  // ---- 4. 上传 ----
  say("  [4/4] 正在上传…");
  say("");
  let pushOk = true;
  try {
    git(["push"], { quiet: false });
  } catch {
    pushOk = false;
  }

  if (!pushOk) {
    say("");
    say("  [X] 上传失败。");
    say("      如果提示 connection / timeout，多半是代理断了，重新开一下再双击本文件。");
    say("");
    await hold();
    process.exit(1);
  }

  say("");
  say(`  ${line}`);
  say("               上传成功！");
  say(`  ${line}`);
  say("");
  say("  等 1~2 分钟网站就会更新：");
  say(`    ${SITE}`);
  say("");
  say("  想看构建进度：");
  say(`    ${ACTIONS}`);
  say("");
  await hold();
}

main().catch(async (err) => {
  await fail(`出错了：${err.message}`);
});
