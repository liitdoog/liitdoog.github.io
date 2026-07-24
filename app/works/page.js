"use client";

import { useMemo, useState } from "react";
import { categories, works } from "@/data/photographer";
import styles from "./works.module.css";

export default function WorksPage() {
  const [active, setActive] = useState("全部");
  const [lightbox, setLightbox] = useState(null); // 当前预览的图片 url

  const list = useMemo(
    () => (active === "全部" ? works : works.filter((w) => w.category === active)),
    [active]
  );

  // 双列瀑布流：轮流分配
  const columns = [[], []];
  list.forEach((w, i) => columns[i % 2].push(w));

  return (
    <div className="container">
      {/* 分类筛选 */}
      <div className={styles.catBar}>
        {categories.map((c) => (
          <button
            key={c}
            className={`${styles.catItem} ${active === c ? styles.catActive : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 作品墙 */}
      <div className={styles.wall}>
        {columns.map((col, i) => (
          <div className={styles.wallCol} key={i}>
            {col.map((w) => (
              <figure className={styles.work} key={w.id} onClick={() => setLightbox(w.url)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.url} alt={w.title} loading="lazy" />
                <figcaption className={styles.workMeta}>
                  <span>{w.title}</span>
                  <span className={styles.workCat}>{w.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>

      {list.length === 0 && <p className={`text-muted ${styles.empty}`}>该分类暂无作品</p>}

      {/* 灯箱 */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="作品大图" />
          <span className={styles.lightboxClose}>✕ 点击任意处关闭</span>
        </div>
      )}
    </div>
  );
}
