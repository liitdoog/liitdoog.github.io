import { getCategories, getWorks } from "@/data/works";
import WorksClient from "./WorksClient";

export const metadata = {
  title: "作品集 · 可卡鱼",
};

/**
 * 服务端组件：构建时扫描 作品/ 文件夹（经 data/works.js 读清单），
 * 把结果作为 props 交给客户端组件做筛选和灯箱。
 */
export default function WorksPage() {
  return <WorksClient works={getWorks()} categories={getCategories()} />;
}
