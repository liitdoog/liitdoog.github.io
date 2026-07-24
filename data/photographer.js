// 摄影师资料与作品数据 —— 改内容只需要动这个文件
// 提示：图片目前使用 picsum.photos 占位图，正式上线前请替换为自己的作品
// （放到 public/images/ 下，url 改成 /images/xxx.jpg 即可）

export const photographer = {
  name: "可卡鱼",
  title: "新手摄影师 · 互勉约拍进行中",
  avatar: "/images/avatar.png",
  city: "杭州",
  phone: "15868631770",
  wechatId: "pxw15868631770",
  bio: "去年入手了人生第一台相机，从此周末不是在拍照，就是在去拍照的路上。目前主攻扫街，人像，正在积累作品、打磨后期。希望通过互勉认识更多镜头前的朋友，一起进步、互相成就。",
  stats: [
    { value: "1", unit: "年", label: "入坑摄影" },
    { value: "20", unit: "+", label: "互勉拍摄" },
    { value: "200", unit: "+", label: "交付精修" },
  ],
  specialties: ["日系人像", "胶片感", "街拍", "校园写真"],
  gears: ["📷 尼康 Z50Ⅱ", "🔭 56mm F1.4", "🔭 16-50mm 🔭 50-250mm "],
};

// 互勉主题（招募中）
export const plans = [
  {
    id: "fresh",
    name: "日系清新人像",
    theme: "公园 / 校园外景",
    desc: "浅色服装自备、自然妆即可，爱笑的你最出片",
    deliver: "精修 3 张",
  },
  {
    id: "street",
    name: "胶片感街拍",
    theme: "老城区 / 咖啡馆 ",
    desc: "边走边拍不摆拍，记录自然松弛状态下的你",
    deliver: "精修 3 张",
  },
  {
    id: "night",
    name: "夜景情绪人像",
    theme: "城市灯光 / 天台",
    desc: "需要一点表现力，但成片会很值得",
    deliver: "精修 3 张",
  },
  {
    id: "custom",
    name: "你有想法？",
    theme: "主题不限",
    desc: "有想拍的主题或风格，欢迎自带灵感来找我聊",
    deliver: "好商量",
  },
];

// 互勉须知
export const rules = [
  "互勉 = 双方互不收费：我积累作品，你收获照片",
  "精修照片 2 周内交付，底片不全部赠送",
  "成片默认双方都可用于个人展示（介意请提前沟通）",
  "妆造、服装需自备，如涉及场地费用 AA",
  "请守时，临时有事请至少提前一天告知，🕊️ 勿扰",
];

export const categories = ["全部", "日系", "街拍", "夜景", "日常"];

// category 取值与 categories 中一致（不含“全部”）
export const works = [
  { id: 1, category: "日系", title: "窗边", url: "https://picsum.photos/seed/portrait1/600/800", featured: true },
  { id: 2, category: "街拍", title: "午后街角", url: "https://picsum.photos/seed/street1/600/750", featured: true },
  { id: 3, category: "夜景", title: "天台灯光", url: "https://picsum.photos/seed/night1/1200/700", featured: true },
  { id: 4, category: "日系", title: "逆光", url: "https://picsum.photos/seed/portrait2/600/900" },
  { id: 5, category: "日常", title: "巷口早餐铺", url: "https://picsum.photos/seed/doc1/600/450" },
  { id: 6, category: "街拍", title: "第一眼", url: "https://picsum.photos/seed/street2/600/800" },
  { id: 7, category: "夜景", title: "江边晚风", url: "https://picsum.photos/seed/night2/600/400" },
  { id: 8, category: "日系", title: "少年", url: "https://picsum.photos/seed/portrait3/600/750" },
  { id: 9, category: "日常", title: "爷爷的棋盘", url: "https://picsum.photos/seed/doc2/600/600" },
  { id: 10, category: "街拍", title: "梧桐树下", url: "https://picsum.photos/seed/street3/600/900" },
  { id: 11, category: "夜景", title: "山间星轨", url: "https://picsum.photos/seed/night3/600/450" },
  { id: 12, category: "日系", title: "舞者", url: "https://picsum.photos/seed/portrait4/600/800" },
  { id: 13, category: "日常", title: "放学路上", url: "https://picsum.photos/seed/doc3/600/700" },
  { id: 14, category: "街拍", title: "拥抱", url: "https://picsum.photos/seed/street4/600/800" },
];

export const timeSlots = [
  "工作日晚 19:00 后",
  "周末全天",
];
