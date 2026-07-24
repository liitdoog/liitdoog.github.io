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
| `/works` | 分类筛选（人像/婚纱/风光/纪实）、双列瀑布流、点击灯箱看大图 |
| `/booking` | 预约联系方式（复制微信号 / 拨打电话）、预约流程、服务套餐 |

## 修改内容

摄影师资料、套餐、作品都在 [data/photographer.js](data/photographer.js)，改内容只动这个文件。
图片目前是 picsum.photos 占位图，正式上线前替换为真实作品（放到 `public/images/` 下引用本地路径即可）。

## 部署到 GitHub Pages

```bash
npm run build        # 生成静态文件到 out/
git add -A && git commit -m "更新"
git push             # 配合 GitHub Actions 或手动上传 out/ 内容
```

仓库设置：Settings → Pages → Source 选 GitHub Actions（用 Next.js 官方 workflow）
或将 `out/` 目录内容推到 `gh-pages` 分支。
