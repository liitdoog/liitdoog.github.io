"use client";

import { useState } from "react";
import { plans, rules, timeSlots, photographer } from "@/data/photographer";
import styles from "./booking.module.css";

const steps = [
  { icon: "💬", title: "加我微信", desc: "备注「互勉」，发我几张你的生活照" },
  { icon: "🎯", title: "聊聊想法", desc: "选个互勉主题，或说说你想拍的风格" },
  { icon: "📸", title: "约时间开拍", desc: "敲定时间地点，剩下的交给我" },
];

export default function BookingPage() {
  const [copied, setCopied] = useState(false);

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(photographer.wechatId);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = photographer.wechatId;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="container">
      {/* 联系方式 */}
      <section className={`card ${styles.contactCard}`}>
        <h1 className={styles.contactTitle}>互勉报名</h1>
        <p className={styles.contactSub}>
          互勉 = 双方互不收费 · 我积累作品，你收获照片
        </p>
        <div className={styles.contactActions}>
          <button className={styles.wechatBtn} onClick={copyWechat}>
            {copied ? "✅ 已复制微信号" : `💬 复制微信号：${photographer.wechatId}`}
          </button>
          <a className={styles.phoneBtn} href={`tel:${photographer.phone}`}>
            📞 {photographer.phone}
          </a>
        </div>
        <p className="text-muted">
          📍 {photographer.city} · 可约时段：{timeSlots.join(" / ")}
        </p>
      </section>

      {/* 报名流程 */}
      <section className="card">
        <h2 className="section-title">报名流程</h2>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div className={styles.step} key={s.title}>
              <div className={styles.stepIcon}>{s.icon}</div>
              <div className={styles.stepTitle}>
                {i + 1}. {s.title}
              </div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 互勉主题 */}
      <section className="card">
        <h2 className="section-title">互勉主题（招募中）</h2>
        <div className={styles.pkgGrid}>
          {plans.map((p) => (
            <div className={styles.pkg} key={p.id}>
              <div className={styles.pkgName}>{p.name}</div>
              <div className={styles.pkgDuration}>{p.theme}</div>
              <div className={styles.pkgPrice}>{p.deliver}</div>
              <p className={styles.pkgDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 互勉须知 */}
      <section className="card">
        <h2 className="section-title">互勉须知</h2>
        <ul className={styles.rules}>
          {rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className={`text-muted ${styles.rulesTip}`}>
          看完都能接受的话，复制上方微信号来找我吧，备注「互勉」更快通过 ✅
        </p>
      </section>
    </div>
  );
}
