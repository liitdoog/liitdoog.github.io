/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出，构建产物在 out/ 目录，可直接部署到 GitHub Pages
  output: "export",
  // 静态导出不支持服务端图片优化，且本站点全部使用 <img> 标签
  images: { unoptimized: true },
};

export default nextConfig;
