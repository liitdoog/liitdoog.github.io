import { photographer } from "@/data/photographer";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>{photographer.name} · {photographer.title}</div>
        <div className={styles.contact}>
          <a href={`tel:${photographer.phone}`}>📞 {photographer.phone}</a>
          <span>💬 微信：{photographer.wechatId}</span>
          <span>📍 {photographer.city}</span>
        </div>
        <div className={styles.copy}>© 2026 {photographer.name} Photography. All rights reserved.</div>
      </div>
    </footer>
  );
}
