import Link from "next/link";
import { photographer, plans, works } from "@/data/photographer";
import styles from "./page.module.css";

export default function Home() {
  const featured = works.filter((w) => w.featured);

  return (
    <div>
      {/* 首屏 Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${photographer.heroImage})` }}>
        <div className={styles.heroOverlay}>
          <p className={styles.heroKicker}>TFP · 互勉约拍</p>
          <h1 className={styles.heroTitle}>
            新手摄影师，
            <br />
            想和你一起拍照
          </h1>
          <p className={styles.heroSub}>
            {photographer.name} · {photographer.title} · {photographer.city}
          </p>
          <div className={styles.heroActions}>
            <Link href="/booking" className="btn-primary">
              互勉报名
            </Link>
            <Link href="/works" className={styles.heroGhost}>
              看看我的练习作品 →
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* 摄影师名片 */}
        <section className={`card ${styles.profileCard}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.avatar} src={photographer.avatar} alt={photographer.name} />
          <div className={styles.profileMain}>
            <div className={styles.nameRow}>
              <span className={styles.name}>{photographer.name}</span>
              <span className={styles.city}>{photographer.city}</span>
            </div>
            <div className={styles.title}>{photographer.title}</div>
          </div>
          <Link className={styles.callBtn} href="/booking">
            约拍联系
          </Link>
        </section>

        {/* 数据统计 */}
        <section className={`card ${styles.statsRow}`}>
          {photographer.stats.map((s) => (
            <div className={styles.stat} key={s.label}>
              <div className={styles.statNum}>
                {s.value}
                <span className={styles.statUnit}>{s.unit}</span>
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </section>

        {/* 关于我 */}
        <section className="card">
          <h2 className="section-title">关于我</h2>
          <p className={styles.bio}>{photographer.bio}</p>
          <div>
            {photographer.specialties.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
          {photographer.gears.map((g) => (
            <p className={styles.honor} key={g}>
              {g}
            </p>
          ))}
        </section>

        {/* 练习作品 */}
        <section className="card">
          <h2 className="section-title">练习作品</h2>
          <div className={styles.featuredGrid}>
            {featured.map((w) => (
              <Link href="/works" key={w.id} className={styles.featuredItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.url} alt={w.title} loading="lazy" />
                <span className={styles.featuredCaption}>
                  {w.title} · {w.category}
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.moreWorks}>
            <Link href="/works">查看全部作品 →</Link>
          </div>
        </section>

        {/* 互勉招募 */}
        <section className="card">
          <h2 className="section-title">互勉招募中</h2>
          <div className={styles.pkgGrid}>
            {plans.map((p) => (
              <div className={styles.pkg} key={p.id}>
                <div className={styles.pkgName}>{p.name}</div>
                <div className={styles.pkgDuration}>{p.theme}</div>
                <div className={styles.pkgPrice}>{p.deliver}</div>
                <p className={styles.pkgDesc}>{p.desc}</p>
                <Link href={`/booking?plan=${p.id}`} className={styles.pkgBtn}>
                  报名
                </Link>
              </div>
            ))}
          </div>
          <p className={styles.mutualTip}>互勉 = 双方互不收费 · 我积累作品，你收获照片</p>
        </section>
      </div>
    </div>
  );
}
