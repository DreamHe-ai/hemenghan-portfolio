import { useEffect, useRef, useState } from 'react'
import './App.css'
import { SITE } from './content'

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

/* ---------- 小组件：待填角标 ---------- */
function TodoBadge() {
  return <span className="todo-badge">待填</span>
}

export default function App() {
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  const p = SITE.profile

  return (
    <div className="app">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">{p.name}</span>
          <div className="nav-links">
            <a href="#about">关于</a>
            <a href="#factory">AI 工厂</a>
            <a href="#drama">短剧</a>
            <a href="#interactive">互动影游</a>
            <a href="#vibe">Vibe</a>
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
          <div className="hero-emoji">{p.emoji}</div>
          <h1 className="hero-title">{p.name}</h1>
          <p className="hero-subtitle">{p.title}</p>
          <p className="hero-quote">{p.quote}</p>
          <p className="hero-desc">{p.sub}</p>
          <div className="hero-stats">
            {p.stats.map(s => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-tags">
            {p.tags.map((t, i) => (
              <span key={t}>{i > 0 && <span className="tag-dot">·</span>}{t}</span>
            ))}
          </div>
        </div>
        <div className="hero-scroll-hint"><span>↓</span></div>
      </section>

      {/* About */}
      <section className="section about-section" id="about">
        <div className="container">
          <Section>
            <div className="section-label">关于我 · ABOUT</div>
            <h2 className="section-title">{SITE.about.heading[0]}<br />{SITE.about.heading[1]}</h2>
          </Section>
          <div className="about-grid">
            <Section delay={100} className="about-left">
              <div className="about-tagline">{SITE.about.tagline}</div>
              {SITE.about.paras.map((t, i) => (
                <p key={i} className="about-desc">{t}</p>
              ))}
            </Section>
            <Section delay={200} className="about-right">
              <div className="skill-group">
                <h4 className="skill-group-title">🛠 技能栈</h4>
                <div className="skill-tags">
                  {SITE.about.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">🤖 AI 工具</h4>
                <div className="skill-tags">
                  {SITE.about.aiTools.map(s => <span key={s} className="skill-tag ai">{s}</span>)}
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">🏢 经历</h4>
                <div className="exp-list">
                  {SITE.about.experience.map(e => (
                    <div key={e.org} className="exp-item">
                      <div className="exp-row">
                        <span className="exp-company">{e.org}</span>
                        <span className="exp-role">{e.role}</span>
                      </div>
                      {e.note && <span className="exp-note">{e.note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* AI 编剧工厂 */}
      <section className="section factory-section" id="factory">
        <div className="container">
          <Section>
            <div className="section-label">{SITE.factory.eyebrow}</div>
            <h2 className="section-title">{SITE.factory.heading}</h2>
            <p className="factory-desc">{SITE.factory.desc}</p>
          </Section>

          {/* 三权分立 */}
          <div className="agent-grid">
            {SITE.factory.agents.map((a, i) => (
              <Section key={a.id} delay={i * 120}>
                <div className="agent-card">
                  <div className="agent-id">&lt;{a.id} /&gt;</div>
                  <h3 className="agent-name">{a.name}</h3>
                  <p className="agent-desc">{a.desc}</p>
                  <div className="agent-rule do"><span>✓</span>{a.duty}</div>
                  <div className="agent-rule dont"><span>✕</span>{a.taboo}</div>
                </div>
              </Section>
            ))}
          </div>

          {/* SOP 流水线 */}
          <Section delay={100}>
            <div className="sop-box">
              <div className="sop-title">九节点 SOP · 每个关口独立验收</div>
              <div className="sop-flow">
                {SITE.factory.sop.map((s, i) => (
                  <div key={i} className={`sop-step ${s.review ? 'review' : ''}`}>
                    <span className="sop-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="sop-text">{s.t}</span>
                  </div>
                ))}
              </div>
              <p className="sop-note">{SITE.factory.sopNote}</p>
            </div>
          </Section>

          <div className="factory-bottom">
            <Section delay={100}>
              <div className="bible-card">
                <div className="bible-title">📖 {SITE.factory.bible.title}</div>
                <p className="bible-desc">{SITE.factory.bible.desc}</p>
                <ul className="bible-list">
                  {SITE.factory.bible.items.map(it => <li key={it}>{it}</li>)}
                </ul>
              </div>
            </Section>
            <Section delay={200}>
              <div className="stack-card">
                <div className="bible-title">⚙️ {SITE.factory.stackChips[0] ? '引擎与素材分离' : ''}</div>
                <p className="bible-desc">写作引擎与素材引擎分离：拆解的 AI 不参与创作，创作的 AI 不碰素材。</p>
                <div className="stack-chips">
                  {SITE.factory.stackChips.map(c => (
                    <span key={c.t} className={`stack-chip ${c.hl ? 'hl' : ''}`}>{c.t}</span>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* 短剧作品 */}
      <section className="section drama-section" id="drama">
        <div className="container">
          <Section>
            <div className="section-label">{SITE.dramas.eyebrow}</div>
            <h2 className="section-title">{SITE.dramas.heading}</h2>
            <p className="drama-desc">{SITE.dramas.desc}</p>
          </Section>

          {/* 国内 */}
          <div className="drama-list">
            {SITE.dramas.domestic.map((d, i) => (
              <Section key={i} delay={(i % 3) * 80}>
                <div className={`drama-item ${d.todo ? 'is-todo' : ''} ${d.featured ? 'is-featured' : ''}`}>
                  {d.todo && <TodoBadge />}
                  <div className="drama-item-top">
                    <span className={`status-pill st-${d.status.replace(/\s/g, '')}`}>{d.status}</span>
                    {d.platform && <span className="drama-platform">{d.platform}</span>}
                  </div>
                  <h3 className="drama-item-title">{d.title}</h3>
                  <div className="drama-item-genre">{d.genre}</div>
                  <p className="drama-item-logline">{d.logline}</p>
                  <div className="drama-item-meta">
                    <span>{d.episodes}</span>
                    <span>·</span>
                    <span>付费卡点 {d.paywall}</span>
                  </div>
                </div>
              </Section>
            ))}
          </div>

          {/* 海外短剧 */}
          <div className="overseas-block">
            <Section>
              <div className="sub-header">
                <span className="sub-header-label">{SITE.dramas.overseas.eyebrow}</span>
                <h3 className="sub-header-title">{SITE.dramas.overseas.heading}</h3>
                <p className="sub-header-desc">{SITE.dramas.overseas.desc}</p>
              </div>
            </Section>
            <div className="drama-list overseas">
              {SITE.dramas.overseas.items.map((d, i) => (
                <Section key={i} delay={i * 80}>
                  <div className={`drama-item ${d.todo ? 'is-todo' : ''}`}>
                    {d.todo && <TodoBadge />}
                    <div className="drama-item-top">
                      <span className="status-pill st-待补充">{d.status}</span>
                      <span className="drama-platform">{d.market}</span>
                    </div>
                    <h3 className="drama-item-title">{d.title}</h3>
                    <div className="drama-item-genre">{d.genre}</div>
                    <p className="drama-item-logline">{d.logline}</p>
                    <div className="drama-item-meta"><span>{d.episodes}</span></div>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 互动影游 */}
      <section className="section interactive-section" id="interactive">
        <div className="container">
          <Section>
            <div className="section-label">{SITE.interactive.eyebrow}</div>
            <h2 className="section-title">{SITE.interactive.heading}</h2>
            <p className="drama-desc">{SITE.interactive.desc}</p>
          </Section>

          {SITE.interactive.items.map((it, i) => (
            <Section key={i} delay={100}>
              <div className="int-card">
                <div className="int-info">
                  <div className="int-top">
                    <span className="status-pill st-已上线">{it.status}</span>
                    <span className="int-subtitle">{it.subtitle}</span>
                  </div>
                  <h3 className="int-title">{it.title}</h3>
                  <p className="int-logline">{it.logline}</p>
                  <div className="int-stats">
                    <div className="int-stat"><span className="int-stat-num">{it.branches.split(' + ')[0].replace(/\D/g, '')}</span><span>核心分支</span></div>
                    <div className="int-stat"><span className="int-stat-num">{it.nodes.replace(/\D/g, '')}</span><span>互动节点</span></div>
                    <div className="int-stat"><span className="int-stat-num">5</span><span>结局（含失败）</span></div>
                  </div>
                  <div className="int-meta">
                    <div><b>担任</b>{it.role}</div>
                    <div><b>分支</b>{it.branches}</div>
                    <div><b>结局</b>{it.endings}</div>
                  </div>
                  <div className="int-actions">
                    <a href={it.demo} target="_blank" rel="noopener noreferrer" className="vibe-card-btn">试玩可交互 Demo ↗</a>
                  </div>
                </div>
                <div className="int-demo">
                  <iframe
                    src={it.demo}
                    title={`${it.title} 互动 Demo`}
                    loading="lazy"
                    className="int-demo-frame"
                  />
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* 小红书 */}
      <section className="section xhs-section" id="xiaohongshu">
        <div className="container">
          <Section>
            <div className="section-label">{SITE.xhs.eyebrow}</div>
            <h2 className="section-title">{SITE.xhs.heading}</h2>
          </Section>
          <div className="xhs-grid">
            {SITE.xhs.items.map((account, i) => (
              <Section delay={i * 150} key={account.name}>
                <a href={account.link} target="_blank" rel="noopener noreferrer"
                  className="xhs-card" style={{ background: account.bg } as React.CSSProperties}>
                  <div className="xhs-card-emoji">{account.emoji}</div>
                  <div className="xhs-card-body">
                    <div className="xhs-card-meta">
                      <span className="xhs-card-name">{account.name}</span>
                      <span className="xhs-card-badge" style={{ background: account.color }}>{account.nickname}</span>
                    </div>
                    <p className="xhs-card-desc">{account.desc}</p>
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
            <div className="section-label">{SITE.projects.eyebrow}</div>
            <h2 className="section-title">{SITE.projects.heading}</h2>
          </Section>

          {SITE.projects.items.map((pr, i) => (
            <Section key={pr.title} delay={100 + i * 50}>
              <div className="vibe-card">
                <div className="vibe-card-inner">
                  <div className="vibe-card-header">
                    <span className="vibe-status-dot" />
                    <span className="vibe-status-label">{pr.badge}</span>
                    <span className="vibe-tag">{pr.tag}</span>
                  </div>
                  <h3 className="vibe-card-title">{pr.title}</h3>
                  <p className="vibe-card-desc">{pr.desc}</p>
                  <a href={pr.link} target="_blank" rel="noopener noreferrer" className="vibe-card-btn">{pr.btn}</a>
                </div>
                <div className="vibe-card-decoration">
                  <pre className="code-block">{pr.code}</pre>
                </div>
              </div>
            </Section>
          ))}

          {/* 项目作品 */}
          <Section delay={200}>
            <div className="pw-section">
              <div className="pw-title-row">
                <span className="pw-title">项目作品</span>
                <div className="pw-gradient-line" />
              </div>
              <div className="pw-grid">
                {SITE.projects.works.map((wk, i) => (
                  <div key={i} className="pw-card">
                    <div className="pw-card-top">
                      <span className="pw-card-title">{wk.title}</span>
                      <span className="pw-card-subtitle">{wk.subtitle}</span>
                    </div>
                    <p className="pw-card-desc">{wk.desc}</p>
                    <ul className="pw-highlights">
                      {wk.highlights.map((h, j) => <li key={j}>{h}</li>)}
                    </ul>
                    <div className="pw-stats">
                      {wk.stats.map((s, k) => (
                        <div key={k} className="pw-stat">
                          <span className="pw-stat-value">{s.n}</span>
                          <span className="pw-stat-label">{s.l}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pw-tags">
                      {wk.tags.map(t => <span key={t} className="pw-tag">{t}</span>)}
                    </div>
                    {wk.screenshot && (
                      <div className="pw-screenshot">
                        <img src={wk.screenshot} alt={wk.title + ' 产品截图'} />
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
            <h2 className="section-title">{p.name}作品集</h2>
          </Section>
          <Section delay={100}>
            <div className="pdf-embed-wrapper">
              <iframe src="/portfolio.pdf" className="pdf-embed-frame" title={`${p.name}作品集`} />
            </div>
          </Section>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <Section>
            <div className="footer-inner">
              <p className="footer-tagline">{SITE.footer.tagline}</p>
              <div className="footer-links">
                {SITE.footer.links.map(link => (
                  <a key={link.label} href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer" className="footer-link">
                    <span className="footer-link-icon">{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="footer-bottom">
                <span>{SITE.footer.copyright}</span>
                <span className="footer-divider">·</span>
                <span>{SITE.footer.note}</span>
              </div>
            </div>
          </Section>
        </div>
      </footer>
    </div>
  )
}
