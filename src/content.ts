/* ============================================================
   content.ts —— 全站内容数据
   ------------------------------------------------------------
   补素材只需要改这个文件，不用碰 App.tsx / App.css。

   规则：
   1. 所有文字内容都在这里，改完重新构建即可生效。
   2. 带 todo: true 的条目会渲染成虚线「待填」卡片，
      填好内容后把 todo 删掉，卡片就恢复正常样式。
   3. 数组长度随意，加了就多渲染一张卡，布局自动适配。
   ============================================================ */

export interface DramaItem {
  todo?: boolean
  status: string
  platform?: string
  title: string
  genre: string
  logline: string
  episodes: string
  paywall: string
  featured?: boolean
}

export const SITE = {

  /* ---------- 1. 顶部形象 ---------- */
  profile: {
    emoji: '🫧',
    name: '何梦涵',
    title: '短剧编剧 × AI 工作流搭建者',
    quote: '「别人在写剧本，我在写那套写剧本的系统。」',
    sub: '北京 · 编剧',
    tags: ['ENTJ', '短剧编剧', 'AI 叙事', '互动叙事', 'Vibe Coding'],
    stats: [
      { num: '7', label: '完整剧本' },
      { num: '1', label: '已上线' },
      { num: '6', label: '制作 / 排期中' },
      { num: '2–3', label: '天出一本' },
    ],
  },

  /* ---------- 2. 关于我 ---------- */
  about: {
    tagline: '「我叫何梦涵，不是在写剧本，就是在教 AI 写剧本。」',
    heading: ['用营销思维讲故事', '用 AI 把产能翻倍'],
    paras: [
      '本科期间积累了互联网大厂、4A 广告公司、央企出版社、AI 大模型独角兽的多元经历，主攻内容营销与数据增长的交叉地带。',
      '如今在短剧公司做全职编剧，已产出 7 本完整剧本、1 部上线、6 部在制作或排期。同时我把整套创作流程用 AI 自动化——搭了一条「AI 编剧工厂」，两三天出一本剧本。',
    ],
    skills: ['Python', 'SQL', 'C++', 'SPSS', 'Axure', 'Blender', 'Google Ads', 'SEO / SEM'],
    aiTools: ['ENTJ', 'WorkBuddy', 'DeepSeek', 'ChatGPT', 'Claude', 'Midjourney', 'Coze', 'Vibe Coding'],
    experience: [
      { org: '某头部短剧公司', role: '编剧（全职）', note: '7 本完整剧本 · 1 部上线' },
      { org: '小米', role: 'SEO 实习生', note: '北京' },
      { org: '中信出版集团', role: '营销编辑实习生', note: '北京' },
      { org: '蓝色光标', role: 'AE 公关实习生', note: '北京' },
    ],
  },

  /* ---------- 3. AI 编剧工厂 ---------- */
  factory: {
    eyebrow: 'AI Writing Pipeline',
    heading: '一个人，就是一条流水线',
    desc: '我把短剧生产拆成可复用的工序：AI 负责生成，我负责判断。导演 / 统筹是我，执行是它们。',
    agents: [
      { id: 'Director', name: '总监 Agent', desc: '统筹与派单中枢。拆解任务、控制节奏、决定下一步交给谁。', duty: '派单 · 拆解 · 控节奏', taboo: '不亲自写，也不亲自审' },
      { id: 'Writer', name: '编剧 Agent', desc: '纯执行写作单元。只按策划案与集纲输出正文，不做自我评判。', duty: '只写，不评审', taboo: '不允许自己改方向' },
      { id: 'Editor', name: '主编 Agent', desc: '独立审阅单元。卡住每一道关口，对漂移和注水直接打回。', duty: '只审，不代写', taboo: '不参与生成，保持制衡' },
    ],
    sop: [
      { t: '出策划案', review: false },
      { t: '主编审', review: true },
      { t: 'AI 写一卡', review: false },
      { t: '主编审', review: true },
      { t: '后 40 集大纲', review: false },
      { t: '分阶段审', review: true },
      { t: '阶段集纲', review: false },
      { t: '生成正文', review: false },
      { t: '主编终审', review: true },
    ],
    sopNote: '绿色为审阅关口。每个阶段独立验收，不合格不流入下一环节——这是 50 集不崩的关键。',
    bible: {
      title: 'Control Bible · 控制圣经',
      desc: '整部剧的唯一事实源。所有 Agent 在动笔前先读它，写完后对照它校验，防止 50 集长线漂移。',
      items: [
        '人物小传与人设边界锁定',
        '世界观、时间线、伏笔回收表',
        '以「卡」为故事阶段：一卡 → 五卡',
        '每部 50 集，付费卡点固定第 6–8 集',
      ],
    },
    stackChips: [
      { t: 'WorkBuddy + DeepSeek API', hl: true },
      { t: 'Claude · 拆解素材' },
      { t: 'Coze 智能体' },
      { t: 'Excel 素材库' },
      { t: 'Word 供 AI 调用' },
      { t: '扒片 Agent' },
    ],
  },

  /* ---------- 4. 短剧作品 ---------- */
  dramas: {
    eyebrow: 'Dramas · 短剧作品',
    heading: '剧本 × AI 视频',
    desc: '全部原创剧本 · 独立制作 · 单部 50 集 · 付费卡点第 6–8 集',
    domestic: [
      {
        todo: true,
        status: '已上线',
        platform: '平台待补充',
        title: '剧名待补充',
        genre: '题材待补充',
        logline: '一句话梗概待补充。已上线作品放第一位，平台、题材、可公开的数据一并补齐。',
        episodes: '50 集',
        paywall: '第 6–8 集',
        featured: true,
      },
      { todo: true, status: '制作中', title: '剧名待补充', genre: '题材待补充', logline: '一句话梗概待补充', episodes: '50 集', paywall: '第 6–8 集' },
      { todo: true, status: '制作中', title: '剧名待补充', genre: '题材待补充', logline: '一句话梗概待补充', episodes: '50 集', paywall: '第 6–8 集' },
      { todo: true, status: '制作中', title: '剧名待补充', genre: '题材待补充', logline: '一句话梗概待补充', episodes: '50 集', paywall: '第 6–8 集' },
      { todo: true, status: '排期中', title: '剧名待补充', genre: '题材待补充', logline: '一句话梗概待补充', episodes: '50 集', paywall: '第 6–8 集' },
      { todo: true, status: '排期中', title: '剧名待补充', genre: '题材待补充', logline: '一句话梗概待补充', episodes: '50 集', paywall: '第 6–8 集' },
      { todo: true, status: '排期中', title: '剧名待补充', genre: '题材待补充', logline: '一句话梗概待补充', episodes: '50 集', paywall: '第 6–8 集' },
    ] as DramaItem[],

    overseas: {
      eyebrow: 'Overseas · 海外短剧',
      heading: '把中国叙事方法带去海外市场',
      desc: '面向海外市场的原创短剧剧本，本地化叙事 × 本土付费习惯。',
      items: [
        {
          todo: true,
          status: '待补充',
          title: '剧名待补充',
          genre: '题材待补充',
          logline: '一句话梗概待补充：海外那部剧的市场、题材、集数、进展。',
          market: '目标市场待补充',
          episodes: '集数待补充',
        },
      ],
    },
  },

  /* ---------- 5. 互动影游 ---------- */
  interactive: {
    eyebrow: 'Interactive · 互动影游',
    heading: '观众不再只是观众',
    desc: '分支叙事 × 选择驱动，写的不只是故事，是一棵会分叉的树。',
    items: [
      {
        status: 'Playable · 可试玩',
        title: '皇弟为穿越女折辱我？我联手情敌夺皇位',
        subtitle: '古风 · 大周 · 女性称帝',
        logline: '庆功宴上，镇国长公主萧玉卿被皇弟削爵、丈夫斥责、亲子辱骂。她拔剑斩断温情，联手穿越女商与蒙冤才女，一步一步走上那把龙椅。',
        role: '编剧 · 互动叙事架构',
        branches: '4 核心分支 + 8 路径分支 + 12 风味分支',
        nodes: '8 个互动节点',
        endings: '4 结局 + 1 失败结局',
        demo: '/demo/interactive-video.html',
      },
    ],
  },

  /* ---------- 6. 小红书账号 ---------- */
  xhs: {
    eyebrow: 'CREATIONS · 小红书',
    heading: '两个账号，一种表达',
    items: [
      {
        emoji: '🫧',
        name: '墨水荷包蛋',
        nickname: '成长号',
        desc: '小镇女孩的北漂故事 / 大学生福利 / 实习干货 / 挑战杯 / 校招经验',
        tags: ['成长叙事', '信息差', '实用工具感'],
        color: '#c0453a',
        bg: 'linear-gradient(135deg, #fff5f3 0%, #fde8e6 100%)',
        link: 'https://www.xiaohongshu.com/user/profile/566d06ebb8c8b433dd2ddc01',
      },
      {
        emoji: '🍧',
        name: '小浛游玩日记',
        nickname: '旅游号',
        desc: '北京周边游 / 小众胡同 / 集市灯光节 / 看剧 repo / 旅行攻略',
        tags: ['情绪入口', '悬念钩子', '工具感强'],
        color: '#2a7a5e',
        bg: 'linear-gradient(135deg, #f0faf6 0%, #d8f0e6 100%)',
        link: 'https://www.xiaohongshu.com/user/profile/5d03b83c000000001000c3d6',
      },
    ],
  },

  /* ---------- 7. Vibe Coding 项目 ---------- */
  projects: {
    eyebrow: 'VIBE CODING · PROJECTS',
    heading: '用 AI 写代码，用代码造玩具',
    items: [
      {
        badge: '在线运行中',
        title: '话术工厂',
        desc: 'AI 驱动的文案生成工具，基于 MiniMax 大模型，支持多场景话术批量生产',
        tag: 'Vibe Coding · AI',
        link: 'https://87xiy3f9qrul.space.minimaxi.com',
        btn: '去看看 ↗',
        code: '// 正在用 AI 造梦\nconst dream = "话术工厂"\ngenerate({ topic })\n  -> "批量话术"',
      },
      {
        badge: '在线工具',
        title: '旅游攻略生成器',
        desc: '根据目的地、出行天数、预算，AI 自动生成专属旅游行程规划，支持多城市比较与一键导出',
        tag: 'AI · Vibe Coding',
        link: 'https://ncngkpmlwpsr.aiforce.cloud/spark/faas/app_4jxceyqcbkesh',
        btn: '去体验 ↗',
        code: '// AI 帮你做旅行规划\ntrip = generate_travel_plan(\n  destination="北京",\n  days=3,\n  budget="1000元"\n)',
      },
    ],
    works: [
      {
        title: '美国区 TikTok TAP',
        subtitle: '海外 & 国内社媒运营',
        desc: '负责商家与美区 TikTok 达人 KOL/KOC 的 Affiliate 联盟全链路合作，设计「固定坑位费 + CPS 分佣」佣金结构，推动达人短视频挂车 Campaign 落地。',
        highlights: [
          '建立达人分级体系（S/A/B 级），月均筛选合作 50+ 达人',
          '某家居单品周销量提升 200%',
        ],
        stats: [{ n: '50+', l: '合作达人' }, { n: '200%', l: '销量提升' }],
        tags: ['TikTok', '达人运营', 'Affiliate 营销', '数据分析'],
      },
      {
        title: '海外 AI 陪伴项目',
        subtitle: '内容运营 & 海外达人运营',
        desc: '利用 Vidu 生动图、Midjourney 文生图和 ChatGPT 辅助创造智能体（AI 虚拟伴侣），推动用户增长和留存提升。',
        highlights: [
          '创造智能体 500+，用户使用量超 10w',
          '推动用户日均互动频次提升 30%，30 日留存率提高 20%',
          '部署模型分析竞品搜索词库，挖掘长尾情感需求关键词 380+',
        ],
        stats: [{ n: '500+', l: '智能体' }, { n: '10w+', l: '使用量' }, { n: '20%', l: '留存提升' }],
        tags: ['AI 产品', 'AIGC', '内容运营', '用户增长'],
        screenshot: '/ai-companion.png',
      },
    ],
  },

  /* ---------- 8. 页脚 ---------- */
  footer: {
    tagline: '「在剧本和代码之间，我在造自己的流水线。」',
    links: [
      { label: '小红书', href: 'https://www.xiaohongshu.com/user/profile/566d06ebb8c8b433dd2ddc01', icon: '△' },
      { label: '简历 PDF', href: '/resume.pdf', icon: '◎' },
      { label: 'GitHub', href: 'https://github.com/DreamHe-ai', icon: '◇' },
      { label: '邮件', href: 'mailto:hemenghan227@163.com', icon: '○' },
    ],
    copyright: '© 2026 何梦涵',
    note: 'built with vibe & ink',
  },
}
