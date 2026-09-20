/*
 * 个人主页内容配置
 * ------------------------------------------------------------
 * 后续更新主页时，优先修改这个文件即可。链接暂时不用时可填写 ""，
 * 对应按钮会自动隐藏。请保留字段名以及引号、逗号等 JavaScript 语法。
 */

window.PROFILE_DATA = {
  nameZh: "中文姓名",
  nameEn: "Yuxiang Qin",
  initials: "YQ",
  role: "研究者 / 在读学生",
  affiliation: "所在院校 · 所在院系",
  location: "中国 · 所在城市",
  email: "your.email@example.com",
  status: "期待学术交流与合作",
  shortBio:
    "我的研究聚焦于此处填写核心研究方向，致力于从真实问题出发，探索兼具理论价值与实践意义的方法。",
  contactText:
    "欢迎通过邮件联系我，讨论研究合作、学术访问、学生交流或其他有趣的可能性。",

  links: [
    { label: "Google Scholar", url: "" },
    { label: "ORCID", url: "" },
    { label: "GitHub", url: "https://github.com/ccq1n" },
    { label: "CV", url: "" },
  ],

  about: [
    "我目前在此处填写院校与院系从事研究工作，主要关注此处填写研究领域。我的工作尝试连接基础理论、方法创新与真实世界中的应用需求。",
    "在研究之外，我重视开放、清晰的学术表达，也乐于参与跨学科合作。当前正在持续完善个人成果档案，欢迎对相关方向感兴趣的老师与同学联系交流。",
  ],

  facts: [
    { label: "当前身份", value: "请填写职称或学位阶段" },
    { label: "研究机构", value: "请填写院校及实验室" },
    { label: "研究领域", value: "关键词一、关键词二" },
    { label: "工作语言", value: "中文、English" },
  ],

  metrics: [
    { value: "—", label: "论文发表" },
    { value: "—", label: "研究项目" },
    { value: "—", label: "引用次数" },
    { value: "—", label: "学术报告" },
  ],

  research: [
    {
      number: "01",
      title: "核心研究方向",
      titleEn: "PRIMARY RESEARCH AREA",
      description:
        "用两到三句话说明研究对象、核心问题与研究价值，让不同专业背景的访问者也能快速理解。",
      keywords: ["关键词 A", "关键词 B", "关键词 C"],
    },
    {
      number: "02",
      title: "交叉研究方向",
      titleEn: "INTERDISCIPLINARY STUDY",
      description:
        "介绍与其他学科产生联系的研究主题，以及你希望通过交叉视角解决的关键问题。",
      keywords: ["交叉方法", "数据分析", "实际应用"],
    },
    {
      number: "03",
      title: "应用与转化",
      titleEn: "APPLICATION & IMPACT",
      description:
        "说明研究如何落地到真实场景，或对产业、社会和公共政策可能产生的影响。",
      keywords: ["应用场景", "技术转化", "社会影响"],
    },
  ],

  publications: [
    {
      year: "2026",
      type: "期刊论文",
      title: "在此填写论文题目：可同时保留正式英文标题",
      authors: "Yuxiang Qin, Collaborator A, Collaborator B",
      venue: "Journal / Conference Name",
      note: "代表作",
      links: [
        { label: "论文", url: "" },
        { label: "代码", url: "" },
      ],
    },
    {
      year: "2025",
      type: "会议论文",
      title: "第二篇代表性成果标题",
      authors: "Collaborator A, Yuxiang Qin, Collaborator B",
      venue: "Conference Name",
      note: "",
      links: [{ label: "论文", url: "" }],
    },
    {
      year: "2025",
      type: "工作论文",
      title: "正在推进的研究工作或预印本标题",
      authors: "Yuxiang Qin et al.",
      venue: "Working Paper / arXiv",
      note: "研究中",
      links: [],
    },
  ],

  projects: [
    {
      period: "2025 — 至今",
      title: "代表研究项目名称",
      description:
        "简要介绍项目背景、你承担的角色、使用的方法，以及最终产生的学术或实际成果。",
      tags: ["负责人", "方法创新", "开放研究"],
      url: "",
    },
    {
      period: "2024 — 2025",
      title: "跨学科合作项目",
      description:
        "说明合作单位、所解决的问题与个人贡献。量化数据会让项目描述更有说服力。",
      tags: ["跨学科", "合作研究", "数据分析"],
      url: "",
    },
  ],

  timeline: [
    {
      year: "现在",
      title: "当前学术身份",
      organization: "所在院校 / 研究机构",
      description: "补充主要研究职责、导师或所属团队信息。",
    },
    {
      year: "20XX",
      title: "学位或重要经历",
      organization: "院校 / 机构名称",
      description: "补充专业方向、研究课题或代表性经历。",
    },
    {
      year: "20XX",
      title: "奖项或荣誉名称",
      organization: "授予机构",
      description: "简要说明荣誉的级别、范围或获奖原因。",
    },
  ],
};
