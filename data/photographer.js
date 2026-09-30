// 摄影师资料 —— 改文案只要动这个文件
//
// 作品不在这里。作品照片放进项目根目录的「作品/<标签>/」文件夹即可，
// 网站会自动扫描生成作品列表，详见 作品/README.md。

export const photographer = {
  name: "可卡鱼",
  title: "新手摄影师 · 互勉约拍进行中",
  avatar: "/images/avatar.jpg",
  // 首屏大图，直接放 public/images/ 下，建议 1920×1080 以内、500KB 以下
  heroImage: "/images/封面.jpg",
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
  gears: ["📷 尼康 Z50Ⅱ", "🔭 56mm F1.4 🔭 56mm F1.4", "🔭 16-50mm 🔭 50-250mm "],
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

export const timeSlots = [
  "工作日晚 19:00 后",
  "周末全天",
];
