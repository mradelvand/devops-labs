# DevOps Labs

Real-world DevOps. Built, broken, and fixed.

**Live site → [mradelvand.github.io/devops-labs](https://mradelvand.github.io/devops-labs)**

---

## What this is

I'm an IT/sysadmin transitioning into Cloud and DevSecOps. This site is my lab notebook — not polished tutorials, not documentation. Just the actual steps I took, what broke, and how I fixed it.

If you're on a similar path, you'll probably recognize the problems.

---

## Labs by topic

| Topic | What's in there |
|---|---|
| **Linux** | Process management, log hunting, disk troubleshooting |
| **Monitoring** | Metrics, alerting, observability stacks |
| **Docker** | Containers, Compose, image troubleshooting |
| **AWS** | Free-tier infrastructure, IAM, networking |
| **GitOps** | Git-driven deployments, workflow automation |

---

## How posts are structured

Every post follows the same format:

- **The goal** — what I was trying to do and why
- **What I did** — step by step, with real commands
- **What got me** — what broke and how I found the fix
- **Cost note** — free tier or actual spend

The "What got me" section is the most useful part. That's where the real learning is.

---

## Tech stack

- [Docusaurus v3](https://docusaurus.io/) — static site
- GitHub Actions — auto-deploys on every push to `main`
- GitHub Pages — hosting

---

## Running locally

```bash
git clone https://github.com/mradelvand/devops-labs.git
cd devops-labs
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Related

**Entra Security Labs** → [mradelvand.github.io/entra-security-labs](https://mradelvand.github.io/entra-security-labs)
Microsoft Entra ID, Conditional Access, and Azure security — same format, different stack.
