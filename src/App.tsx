import { useEffect, useRef, useState } from 'react'
import './App.css'

const xiaohongshuAccounts = [
  {
    name: '墨水荷包蛋',
    nickname: '成长号',
    description: '小镇女孩的北漂故事 / 大学生福利 / 实习干货 / 挑战杯 / 校招经验',
    tags: ['成长叙事', '信息差', '实用工具感'],
    color: '#c0453a',
    bgGradient: 'linear-gradient(135deg, #fff5f3 0%, #fde8e6 100%)',
    link: 'https://www.xiaohongshu.com/user/profile/566d06ebb8c8b433dd2ddc01',
    emoji: '🫧',
  },
  {
    name: '小浛游玩日记',
    nickname: '旅游号',
    description: '北京周边游 / 小众胡同 / 集市灯光节 / 看剧repo / 旅行攻略',
    tags: ['情绪入口', '悬念钩子', '工具感强'],
    color: '#2a7a5e',
    bgGradient: 'linear-gradient(135deg, #f0faf6 0%, #d8f0e6 100%)',
    link: 'https://www.xiaohongshu.com/user/profile/5d03b83c000000001000c3d6',
    emoji: '🍧',
  },
]

const vibeProjects = [
  {
    name: '话术工厂',
    description: 'AI 驱动的文案生成工具，基于 MiniMax 大模型，支持多场景话术批量生产',
    url: 'https://87xiy3f9qrul.space.minimaxi.com',
    tag: 'Vibe Coding · AI',
    status: '在线运行中',
  },
]

const projectWorks = [
  {
    title: '美国区 TikTok TAP',
    subtitle: '海外 & 国内社媒运营',
    description: '负责商家与美区 TikTok 达人 KOL/KOC 的 Affiliate 联盟全链路合作，设计"固定坑位费 + CPS 分佣"佣金结构，推动达人短视频挂车 Campaign 落地。',
    highlights: ['建立达人分级体系（S/A/B 级），月均筛选合作 50+ 达人', '某家居单品周销量提升 200%'],
    stats: [{ value: '50+', label: '合作达人' }, { value: '200%', label: '销量提升' }],
    tags: ['TikTok', '达人运营', 'Affiliate 营销', '数据分析'],
  },
  {
    title: '海外 AI 陪伴项目',
    subtitle: '内容运营 & 海外达人运营',
    description: '利用 Vidu 生动图、Midjourney 文生图和 ChatGPT 辅助创造智能体（AI 虚拟伴侣），推动用户增长和留存提升。',
    highlights: ['创造智能体 500+，用户使用量超 10w', '推动用户日均互动频次提升 30%，30 日留存率提高 20%', '部署模型分析竞品搜索词库，挖掘长尾情感需求关键词 380+'],
    stats: [{ value: '500+', label: '智能体' }, { value: '10w+', label: '使用量' }, { value: '20%', label: '留存提升' }],
    tags: ['AI 产品', 'AIGC', '内容运营', '用户增长'],
    screenshot: '/ai-companion.png',
  },
]

const socialLinks = [
  {
    label: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/566d06ebb8c8b433dd2ddc01',
    icon: '△',
  },
  {
    label: '简历 PDF',
    href: '/resume.pdf',
    icon: '◎',
  },
  {
    label: 'GitHub',
    href: '#',
    icon: '◇',
  },
  {
    label: '邮件',
    href: 'mailto:hemenghan227@163.com',
    icon: '○',
  },
]

function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, isVisible }
}

function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver()
  return (
    <div
      ref={ref}
      className={`section-reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const BLOB_PATH = 'M47.5,-62.1C60.5,-52.8,69.2,-36.8,73.4,-19.8C77.6,-2.8,77.3,15.3,70.4,30.5C63.5,45.7,49.9,58.1,35.1,65.4C20.3,72.7,4.2,74.9,-11.4,-71.8C-27,-65.7,-34.5,-71.4,-47.6,-68.1C-60.7,-64.8,-79.3,-52.5,-84.6,-36.4C-89.9,-20.3,-81.9,-0.4,-73.3,15.8C-64.7,32,-55.5,44.5,-43.6,53.9C-31.7,63.3,-17.1,69.6,-1.4,68.7C14.3,67.8,34.5,-71.4,47.5,-62.1Z'

function Blob({ top, right, bottom, left, color, size, delay }: {
  top?: string; right?: string; bottom?: string; left?: string;
  color: string; size: number; delay?: number;
}) {
  return (
    <div style={{
      position: 'absolute', top, right, bottom, left,
      width: size, height: size, color,
      animation: `float 8s ease-in-out ${delay ?? 0}s infinite`,
      pointerEvents: 'none', zIndex: 0,
    }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path fill="currentColor" d={BLOB_PATH} transform="translate(100 100)" />
      </svg>
    </div>
  )
}

export default function App() {
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="app">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">何梦涵</span>
          <div className="nav-links">
            <a href="#about">关于</a>
            <a href="#xiaohongshu">小红书</a>
            <a href="#vibe">Vibe Coding</a>
            <a href="#portfolio">作品集</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <Blob color="#fde8e6" size={320} top="-60px" right="-80px" delay={0} />
          <Blob color="#d0efe5" size={240} bottom="80px" left="-60px" delay={-3} />
          <Blob color="#f0ede6" size={180} top="40%" left="10%" delay={-5} />
        </div>
        <div className={`hero-content ${heroVisible ? 'hero-visible' : ''}`}>
          <div className="hero-emoji">🫧</div>
          <h1 className="hero-title">何梦涵</h1>
          <p className="hero-subtitle">墨水荷包蛋 · 市场营销人 · Vibe Coder</p>
          <p className="hero-desc">
            在剧本里写人间烟火，在代码里造有趣灵魂。
            <br />
            中国矿业大学（北京）25届 · 市场营销人 · Vibe Coder
          </p>
          <div className="hero-tags">
            <span>ENTJ</span>
            <span>·</span>
            <span>创意写作</span>
            <span>·</span>
            <span>AI 工具</span>
            <span>·</span>
            <span>全链路营销</span>
            <span>·</span>
            <span>Vibe Coding</span>
          </div>
        </div>
        <div className="hero-scroll-hint"><span>↓</span></div>
      </section>

      {/* About */}
      <section className="section about-section" id="about">
        <div className="container">
          <Section>
            <div className="section-label">关于我 · ABOUT</div>
            <h2 className="section-title">用营销思维讲故事<br />用代码把效率翻倍</h2>
          </Section>
          <div className="about-grid">
            <Section delay={100} className="about-left">
              <div className="about-tagline">
                「我叫何梦涵，不是在写文案，就是在教 AI 写文案。」
              </div>
              <p className="about-desc">
                本科期间积累了互联网大厂、4A 广告公司、央企出版社、AI 大模型独角兽的多元经历，主攻内容营销与数据增长的交叉地带。
              </p>
              <p className="about-desc">
                擅长从需求洞察到活动执行到数据复盘的全链路营销策划，曾组织策划 200+ 场线上线下活动，建联达人 300+ 位。热爱把繁琐的工作流用 AI 自动化，在 Vibe Coding 里找创意自由。
              </p>
            </Section>
            <Section delay={200} className="about-right">
              <div className="skill-group">
                <h4 className="skill-group-title">🛠 技能栈</h4>
                <div className="skill-tags">
                  {['Python', 'SQL', 'C++', 'SPSS', 'Axure', 'Blender', 'Google Ads', 'SEO / SEM'].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">🤖 AI 工具</h4>
                <div className="skill-tags">
                  {['ENTJ', 'OpenClaw', 'ChatGPT', 'Claude', 'Midjourney', 'Stable Diffusion', 'AI Agent', 'Vibe Coding'].map(s => (
                    <span key={s} className="skill-tag ai">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">🏢 经历</h4>
                <div className="exp-list">
                  {[
                    { company: '小米', role: 'SEO 实习生', period: '北京' },
                    { company: '中信出版集团', role: '营销编辑实习生', period: '北京' },
                    { company: '蓝色光标', role: 'AE 公关实习生', period: '北京' },
                  ].map(e => (
                    <div key={e.company} className="exp-item">
                      <span className="exp-company">{e.company}</span>
                      <span className="exp-role">{e.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* 小红书 */}
      <section className="section xhs-section" id="xiaohongshu">
        <div className="container">
          <Section>
            <div className="section-label">小红书 · CREATIONS</div>
            <h2 className="section-title">两个账号，一种表达</h2>
          </Section>
          <div className="xhs-grid">
            {xiaohongshuAccounts.map((account, i) => (
              <Section delay={i * 150} key={account.name}>
                <a
                  href={account.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xhs-card"
                  style={{ background: account.bgGradient } as React.CSSProperties}
                >
                  <div className="xhs-card-emoji">{account.emoji}</div>
                  <div className="xhs-card-body">
                    <div className="xhs-card-meta">
                      <span className="xhs-card-name">{account.name}</span>
                      <span className="xhs-card-badge" style={{ background: account.color }}>{account.nickname}</span>
                    </div>
                    <p className="xhs-card-desc">{account.description}</p>
                    <div className="xhs-card-tags">
                      {account.tags.map(t => (
                        <span key={t} className="tag" style={{ borderColor: account.color, color: account.color }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="xhs-card-arrow" style={{ color: account.color }}>→</div>
                </a>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe Coding */}
      <section className="section vibe-section" id="vibe">
        <div className="container">
          <Section>
            <div className="section-label">VIBE CODING · PROJECTS</div>
            <h2 className="section-title">用 AI 写代码，用代码造玩具</h2>
          </Section>

          {/* 话术工厂 */}
          <Section delay={100}>
            <div className="vibe-card">
              <div className="vibe-card-inner">
                <div className="vibe-card-header">
                  <span className="vibe-status-dot" />
                  <span className="vibe-status-label">{vibeProjects[0].status}</span>
                  <span className="vibe-tag">{vibeProjects[0].tag}</span>
                </div>
                <h3 className="vibe-card-title">{vibeProjects[0].name}</h3>
                <p className="vibe-card-desc">{vibeProjects[0].description}</p>
                <a
                  href={vibeProjects[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vibe-card-btn"
                >
                  去看看 ↗
                </a>
              </div>
              <div className="vibe-card-decoration">
                <pre className="code-block">{`// 正在用 AI 造梦
const dream = "话术工厂"
generate({ topic })
  -> "批量话术"`}</pre>
              </div>
            </div>
          </Section>

          {/* 项目作品 */}
          <Section delay={200}>
            <div className="pw-section">
              <div className="pw-title-row">
                <span className="pw-title">项目作品</span>
                <div className="pw-gradient-line" />
              </div>
              <div className="pw-grid">
                {projectWorks.map((p, i) => (
                  <div key={i} className="pw-card">
                    <div className="pw-card-top">
                      <span className="pw-card-title">{p.title}</span>
                      <span className="pw-card-subtitle">{p.subtitle}</span>
                    </div>
                    <p className="pw-card-desc">{p.description}</p>
                    <ul className="pw-highlights">
                      {p.highlights.map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                    <div className="pw-stats">
                      {p.stats.map((s, k) => (
                        <div key={k} className="pw-stat">
                          <span className="pw-stat-value">{s.value}</span>
                          <span className="pw-stat-label">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pw-tags">
                      {p.tags.map((t, l) => (
                        <span key={l} className="pw-tag">{t}</span>
                      ))}
                    </div>
                    {p.screenshot && (
                      <div className="pw-screenshot">
                        <img src={p.screenshot} alt={p.title + ' 产品截图'} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* 作品集 PDF */}
      <section className="section portfolio-section" id="portfolio">
        <div className="container">
          <Section>
            <div className="section-label">作品集 · PORTFOLIO</div>
            <h2 className="section-title">何梦涵作品集</h2>
          </Section>
          <Section delay={100}>
            <div className="pdf-embed-wrapper">
              <iframe
                src="/portfolio.pdf"
                className="pdf-embed-frame"
                title="何梦涵作品集"
              />
            </div>
          </Section>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <Section>
            <div className="footer-inner">
              <p className="footer-tagline">「在文字和代码之间，我在找自己。」</p>
              <div className="footer-links">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    <span className="footer-link-icon">{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="footer-bottom">
                <span>© 2025 何梦涵</span>
                <span className="footer-divider">·</span>
                <span>built with vibe &amp; ink</span>
              </div>
            </div>
          </Section>
        </div>
      </footer>
    </div>
  )
}
