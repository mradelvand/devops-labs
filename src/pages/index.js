import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// ─────────────────────────────────────────────────────────────────────────────
// SERIES — update count and active:true when you publish posts in that section
// ─────────────────────────────────────────────────────────────────────────────
const SERIES = [
  {
    icon: '📊',
    title: 'Monitoring',
    desc: 'Prometheus, Grafana, and Loki from scratch — dashboards, alerts, and log ingestion on a real server.',
    to: '/docs/monitoring/overview',
    count: 1,
    active: true,
  },
  {
    icon: '🐳',
    title: 'Docker',
    desc: 'Dockerfiles, multi-stage builds, Compose stacks, and pushing images to Docker Hub.',
    to: '/docs/docker/overview',
    count: 0,
    active: false,
  },
  {
    icon: '☁️',
    title: 'AWS',
    desc: 'VPC architecture, EC2, Lambda, and Terraform — all free-tier safe. No NAT Gateway surprises.',
    to: '/docs/aws/overview',
    count: 0,
    active: false,
  },
  {
    icon: '🚀',
    title: 'GitOps & EKS',
    desc: 'GitHub Actions pipelines that build, test, and deploy to EKS on every commit. The employer-visible project.',
    to: '/docs/gitops/overview',
    count: 0,
    active: false,
  },
  {
    icon: '🖥️',
    title: 'Linux',
    desc: 'SadServers writeups — real broken servers, fixed. What the problem was, what revealed it, what fixed it.',
    to: '/docs/linux/overview',
    count: 0,
    active: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY — the four pillars of this blog
// ─────────────────────────────────────────────────────────────────────────────
const PHILOSOPHY = [
  {
    icon: '🔬',
    title: 'Hands-on first',
    desc: 'Every post comes from a real lab. Not a tutorial rewrite — something was actually built, broken, and fixed.',
  },
  {
    icon: '💸',
    title: 'Free-tier safe',
    desc: 'AWS labs avoid NAT Gateway and RDS. No surprise bills. Every cost decision is documented explicitly.',
  },
  {
    icon: '🔗',
    title: 'Cert-aligned',
    desc: 'Each post maps to AZ-104 or AZ-400 skill areas. Learn by building, prep for exams simultaneously.',
  },
  {
    icon: '⚡',
    title: 'What got me',
    desc: 'Every post has a "What got me" section — the thing that broke and took time to find. That\'s the real learning.',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <div className="hero-section">
          <h1>DevOps Labs</h1>
          <p>{siteConfig.tagline}</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">1+</span>
              <span className="hero-stat-label">Posts</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">5</span>
              <span className="hero-stat-label">Topics</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">2</span>
              <span className="hero-stat-label">Exam certs</span>
            </div>
          </div>
          <div>
            <Link className="hero-cta" to="/docs/monitoring/overview">
              Start with Monitoring →
            </Link>
            <a
              className="hero-cta-secondary"
              href="https://github.com/mradelvand/devops-labs"
              target="_blank"
              rel="noreferrer"
            >
              ⭐ GitHub
            </a>
          </div>
        </div>

        {/* ── Philosophy ── */}
        <div className="philosophy-section">
          <div className="philosophy-grid">
            {PHILOSOPHY.map((item) => (
              <div className="philosophy-item" key={item.title}>
                <span className="philosophy-item-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Series grid ── */}
        <div style={{ padding: '0 2rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label">Content</div>
          <div className="section-title">Lab Series</div>
          <div className="section-sub">
            Each series links to{' '}
            <a href="https://azurecertprep.github.io" target="_blank" rel="noreferrer" style={{ color: '#378ADD' }}>
              azurecertprep
            </a>
            {' '}for the cert foundation — then goes deeper with real hands-on content.
          </div>
        </div>

        <div className="series-grid">
          {SERIES.map((s) => (
            <Link className="series-card" to={s.to} key={s.title}>
              <span className="series-card-icon">{s.icon}</span>
              <div className="series-card-title">{s.title}</div>
              <div className="series-card-desc">{s.desc}</div>
              <div className="series-card-meta">
                {s.active && s.count > 0 ? (
                  <span className="badge-post-count">{s.count} post{s.count !== 1 ? 's' : ''}</span>
                ) : (
                  <span className="badge-coming-soon">Coming soon</span>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </Layout>
  );
}
