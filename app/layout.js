import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { photographer } from "@/data/photographer";

export const metadata = {
  title: `${photographer.name} · 互勉约拍`,
  description: `新手摄影师互勉约拍 —— 日系 / 街拍 / 夜景人像，免费约拍，坐标${photographer.city}`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
