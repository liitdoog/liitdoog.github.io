# 摄影师助手 · 个人网站

基于 Next.js 的摄影师个人网站，**纯静态站点**，无后端依赖：
首页介绍、作品展示、预约联系方式。部署在 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 页面

| 路由 | 说明 |
| --- | --- |
| `/` | 首屏 Hero、摄影师名片、从业数据、个人介绍、精选作品、服务套餐 |
| `/works` | 分类筛选（标签来自 `作品/` 下的文件夹名）、双列瀑布流、点击灯箱看大图 |
| `/booking` | 预约联系方式（复制微信号 / 拨打电话）、预约流程、服务套餐 |

## 修改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、简介、电话、微信、套餐、互勉须知 | [data/photographer.js](data/photographer.js) |
| 首屏封面图 | 替换 `public/images/封面.jpg`（不用改代码） |
| 头像 | 替换 `public/images/avatar.jpg` |
| **作品照片** | 放进 [作品/](作品/) 下对应的标签文件夹，**不用改代码** |

作品的命名规则、格式要求都写在 [作品/README.md](作品/README.md)。

原理：`npm run dev` / `npm run build` 之前会自动跑 [scripts/sync-works.mjs](scripts/sync-works.mjs)，
扫描 `作品/` 里的原图、压到短边 1080px、输出到 `public/作品/` 并生成清单，
再由 [data/works.js](data/works.js) 在构建时读进页面。所以相机原图直接丢进 `作品/` 就行，不用自己缩图。

> `public/作品/` 和 `out/` 都是自动生成的产物，已在 .gitignore 里，不要手动改。

## 部署到 GitHub Pages

推送到 `main` 分支后由 GitHub Actions 自动构建发布（见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)），
正常更新只要 commit + push，**不需要手动 build 或上传**：

```bash
git add -A && git commit -m "更新" && git push
```

一分钟左右自动上线：<https://liitdoog.github.io/>

本地想先验证构建结果再推，就跑 `npm run build`，产物在 `out/`。
