"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { photographer } from "@/data/photographer";
import styles from "./Nav.module.css";

const links = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {photographer.name} <span>PHOTOGRAPHY</span>
        </Link>
        <nav className={styles.links}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${pathname === l.href ? styles.active : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className={styles.cta}>
            互勉报名
          </Link>
        </nav>
      </div>
    </header>
  );
}
