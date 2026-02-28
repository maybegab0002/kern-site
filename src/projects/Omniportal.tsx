import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingLines from '@/components/FloatingLines';
import omniportalMockup from '../assets/omniportallogin.webp';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const ease = [0.22, 1, 0.36, 1] as const;

const FloatingLinesBg = React.memo(() => (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
    opacity: 0.35, mixBlendMode: 'screen' as const,
  }}>
    <FloatingLines
      linesGradient={['#b30000', '#f53232', '#ffffff']}
      animationSpeed={1}
      interactive={false}
      bendRadius={5}
      bendStrength={-0.5}
      mouseDamping={0.05}
      parallax
      parallaxStrength={0.2}
    />
  </div>
));

const data = {
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vite', 'Vercel', 'Git'],
  overview: 'Omniportal is a comprehensive real estate management platform designed to streamline operations across multiple user roles. The system provides dedicated interfaces for administrators, clients, and real estate agents — each with tailored features to manage properties, track sales, process payments, and monitor performance.',
  challenges: [
    { n: '01', title: 'Multi-Role Architecture', desc: 'Designed and implemented a role-based system with three distinct user interfaces while maintaining code reusability and consistent experience across all portals.' },
    { n: '02', title: 'Real-time Data Sync', desc: 'Leveraged Supabase real-time capabilities to ensure instant updates across all user dashboards when sales, payments, or inventory changes occur.' },
    { n: '03', title: 'Commission Calculations', desc: 'Built a sophisticated commission tracking system that automatically calculates agent earnings based on sales data, deductions, and allowances with full accuracy.' },
  ],
  process: [
    { n: '01', label: 'Week 1–2', title: 'Plan & Architect', desc: 'Requirements gathering, DB schema, system architecture with Supabase, Git workflow setup.' },
    { n: '02', label: 'Week 2–3', title: 'Design & Setup', desc: 'Component library, Tailwind design system, auth flows, and responsive layouts.' },
    { n: '03', label: 'Week 3–6', title: 'Admin Dashboard', desc: 'Analytics, inventory, payment tracking, ticketing, reporting, and agent sales recording.' },
    { n: '04', label: 'Week 6–8', title: 'Client Portal', desc: 'Secure payments, balance statements, SOA generation, ticket submission, document management.' },
    { n: '05', label: 'Week 8–10', title: 'Agent Portal', desc: 'Commission tracking, sales upload, allowance history, leaderboard, performance analytics.' },
    { n: '06', label: 'Week 10–12', title: 'Test & Deploy', desc: 'Security audits, performance tuning, CI/CD pipeline, production launch, user documentation.' },
  ],
  scope: [
    { n: '01', title: 'Admin', items: ['Inventories Management', 'Balance Tracking', 'Payment Processing', 'Ticketing System', 'Dashboard Analytics', 'Comprehensive Reports', 'Agent Sales Recording'] },
    { n: '02', title: 'Client', items: ['Secure Payment Gateway', 'Balance Statement Viewing', 'Statement of Account', 'Ticket Submission', 'Document Management'] },
    { n: '03', title: 'Agent', items: ['Commission Tracking', 'Sales Upload System', 'Allowance Tracking', 'Performance Leaderboard', 'Analytics & Insights'] },
  ],
  features: ['Admin Dashboard', 'Inventory Management', 'Payment Processing', 'Ticketing System', 'Custom Reporting', 'Agent Sales Recording', 'SOA Generation', 'Commission Engine', 'Interactive Leaderboard', 'Role-Based Access', 'Mobile Responsive', 'Real-time Updates'],
  results: [
    { value: '50+', label: 'Agents served', sub: 'Successfully launched' },
    { value: '200+', label: 'Transactions / mo', sub: 'Processing volume' },
    { value: '60%', label: 'Admin overhead cut', sub: 'Operational efficiency' },
    { value: '75%', label: 'Faster payments', sub: 'Processing speed' },
    { value: '95%', label: 'User satisfaction', sub: 'Client feedback score' },
    { value: '0', label: 'Security incidents', sub: 'Since launch' },
  ],
  faqs: [
    { q: 'Why Supabase instead of a traditional backend?', a: 'Supabase gave us real-time subscriptions, Row Level Security for RBAC, and a hosted Postgres DB — three pain points solved out of the box. It cut backend development time by roughly 40%.', tag: 'Stack' },
    { q: 'How did you handle three separate portals?', a: 'Each portal is a separate route group with its own layout and auth guard. Shared components and hooks live in a common layer, so there is almost zero duplication despite three distinct UIs.', tag: 'Architecture' },
    { q: 'What was the biggest technical challenge?', a: 'Commission calculations — edge cases in partial sales, deduction sequences, and retroactive adjustments. We solved this with a pure-function engine that is fully unit-tested and replayable.', tag: 'Engineering' },
    { q: 'How is data kept secure between roles?', a: 'Supabase Row Level Security policies ensure each query only returns data the authenticated role is permitted to see — even if a client somehow crafted a rogue request.', tag: 'Security' },
    { q: 'Is the system still actively used?', a: 'Yes. Omniportal has been in production since May 2025, processing 200+ transactions per month with zero security incidents to date.', tag: 'Status' },
  ],
};

const techLogos: Record<string, string> = {
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  Vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  Supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  Vercel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.07, ease } }),
};

export default function Omniportal() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqActive = openFaq ?? 0;

  useEffect(() => {
    document.body.style.background = '#000';
    document.body.style.margin = '0';
    return () => { document.body.style.background = ''; };
  }, []);

  const css = `
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth;overflow-x:hidden;width:100%}
    body{overflow-x:hidden;width:100%;position:relative;-webkit-font-smoothing:antialiased}
    :root{
      --accent:#f04444;--text:#f0f0ee;--muted:rgba(232,232,230,.72);
      --border:rgba(232,232,230,.08);--border-s:rgba(232,232,230,.14);
      --rf:9999px;--rsm:8px;--rmd:11px;--rlg:15px;--rxl:17px;
    }
    .OP{font-family:${INTER};background:transparent;color:var(--text);min-height:100vh;font-size:13px;overflow-x:hidden;width:100%}

    /* SCROLLBAR */
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,transparent,#f04444 15%,#ff6b6b 40%,#f04444 60%,#991b1b 85%,transparent);border-radius:999px;box-shadow:0 0 6px rgba(240,68,68,.8)}
    *{scrollbar-width:thin;scrollbar-color:#f04444 transparent}

    /* NAV */
    .op-nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      padding:18px 32px;
      display:flex;justify-content:center;
      background:transparent;pointer-events:none;
    }
    .op-nav-i{pointer-events:all;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1100px}
    .op-back{
      display:inline-flex;align-items:center;gap:6px;
      font-family:${INTER};font-size:11px;font-weight:500;
      color:rgba(255,255,255,.6);background:none;border:none;cursor:pointer;
      padding:0;transition:color .2s;letter-spacing:.01em;
    }
    .op-back:hover{color:var(--text)}
    .op-pill{
      display:flex;align-items:center;gap:7px;
      background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
      border-radius:var(--rf);padding:6px 14px;
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 1px 0 rgba(255,255,255,.12) inset;
    }
    .op-nav-tag{font-size:10px;font-weight:400;letter-spacing:.04em;color:rgba(255,255,255,.5);font-family:${INTER}}
    .live-dot{
      width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;
      animation:livepulse 2.2s ease-in-out infinite;
    }
    @keyframes livepulse{0%,100%{box-shadow:0 0 0 0 rgba(240,68,68,.4)}60%{box-shadow:0 0 0 5px rgba(240,68,68,0)}}

    /* BUTTONS */
    .op-btn{
      display:inline-flex;align-items:center;gap:7px;
      background:#111;color:#fff;
      font-family:${INTER};font-size:11.5px;font-weight:500;
      border:1px solid rgba(255,255,255,.18);border-radius:var(--rf);
      padding:9px 20px;cursor:pointer;letter-spacing:.01em;
      box-shadow:0 1px 0 rgba(255,255,255,.06) inset;
      transition:background .2s,border-color .2s,transform .15s;
    }
    .op-btn:hover{background:#1c1c1c;border-color:rgba(255,255,255,.3);transform:translateY(-1px)}
    .op-btn-cta{
      display:inline-flex;align-items:center;gap:7px;
      background:
        radial-gradient(ellipse 80% 60% at 20% 30%, #7a0a0a 0%, transparent 65%),
        radial-gradient(ellipse 60% 80% at 80% 20%, #c01818 0%, transparent 60%),
        radial-gradient(ellipse 70% 50% at 60% 90%, #e8430a 0%, transparent 55%),
        radial-gradient(ellipse 90% 70% at 10% 80%, #1a0505 0%, transparent 70%),
        #1c0606;
      background-size:200% 200%;
      animation:btn-shift 6s ease infinite alternate;
      color:#fff;font-family:${INTER};font-size:11.5px;font-weight:600;
      border:1px solid rgba(220,60,60,.5);border-radius:var(--rf);
      padding:9px 22px;cursor:pointer;letter-spacing:.01em;
      box-shadow:0 0 20px rgba(180,30,30,.35),0 1px 0 rgba(255,120,80,.18) inset;
      transition:box-shadow .25s,transform .15s;
    }
    .op-btn-cta:hover{box-shadow:0 0 36px rgba(200,40,40,.55);transform:translateY(-1px)}
    @keyframes btn-shift{
      0%{background-position:0% 0%}33%{background-position:80% 20%}
      66%{background-position:30% 90%}100%{background-position:100% 100%}
    }

    /* HERO */
    .op-hero{min-height:100vh;background:transparent;display:flex;flex-direction:column;position:relative;overflow:hidden}
    .op-hero-inner{
      max-width:1100px;margin:0 auto;width:100%;
      padding:140px 32px 80px;
      display:flex;flex-direction:column;justify-content:space-between;
      flex:1;position:relative;z-index:1;
    }
    .op-eyebrow-row{
      display:flex;align-items:center;gap:10px;
      font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
      color:var(--muted);font-family:${INTER};margin-bottom:40px;
    }
    .op-eline{width:20px;height:1px;background:var(--accent);flex-shrink:0}
    .op-h1{
      font-family:${INTER};font-size:clamp(3.8rem,9vw,9rem);
      font-weight:800;letter-spacing:-.055em;line-height:.92;
      color:var(--text);margin-bottom:10px;
    }
    .op-tagline{
      font-family:${INTER};font-size:clamp(.95rem,2vw,1.7rem);
      font-weight:300;letter-spacing:-.02em;color:var(--muted);font-style:italic;margin-bottom:52px;
    }
    .op-hero-bottom{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:end}
    .op-meta{display:flex;flex-wrap:wrap;gap:28px}
    .op-meta-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:4px;opacity:.6}
    .op-meta-val{font-size:12.5px;font-weight:500;color:var(--text);font-family:${INTER}}
    .op-hero-btns{display:flex;gap:8px;align-items:center;flex-wrap:wrap}

    /* MARQUEE */
    .op-mq{overflow:hidden;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:transparent;width:100%}
    .op-mq-outer{display:flex;width:max-content;will-change:transform}
    .op-mq-track{display:flex;animation:mqs 30s linear infinite;flex-shrink:0}
    @keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
    .op-mq-item{display:flex;align-items:center;gap:9px;padding:0 20px;white-space:nowrap;font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .op-mq-dot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}

    /* MOCKUP */
    .op-mockup{padding:48px 32px;background:transparent;position:relative;z-index:1}
    .op-mockup-inner{max-width:1100px;margin:0 auto}
    .op-mockup-frame{
      border-radius:18px;overflow:hidden;
      border:1px solid rgba(255,255,255,.08);
      box-shadow:0 48px 120px rgba(0,0,0,.7),0 8px 28px rgba(0,0,0,.5);
    }
    .op-mockup-frame img{width:100%;height:auto;display:block}

    /* SECTIONS */
    .op-S{padding:64px 32px;position:relative;z-index:1;overflow-x:hidden}
    .op-I{max-width:1100px;margin:0 auto;width:100%}

    /* EYEBROW TAG */
    .op-etag{display:inline-flex;align-items:center;gap:6px;font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:10px}
    .op-en{color:var(--accent)}
    .op-stitle{font-family:${INTER};font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;letter-spacing:-.04em;line-height:1.08;color:var(--text);margin-bottom:8px}
    .op-ssub{font-size:12px;color:var(--muted);line-height:1.75;font-weight:300;max-width:320px;font-family:${INTER};margin-bottom:28px}
    .op-shead{margin-bottom:32px}

    /* ghost number */
    .op-ghost{font-size:4.5rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.18);font-family:${INTER};margin-bottom:2px}

    /* OVERVIEW */
    .op-ov-grid{display:grid;grid-template-columns:180px 1fr;gap:56px;align-items:start}
    .op-ov-sticky{position:sticky;top:80px}
    .op-ov-head{font-family:${INTER};font-size:1.6rem;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:var(--text)}
    .op-ov-body{font-size:13px;line-height:1.9;color:var(--muted);font-weight:300;margin-bottom:24px;font-family:${INTER}}
    .op-tech-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:9px;display:block;opacity:.7}
    .op-tech-list{display:flex;flex-wrap:wrap;gap:6px}
    .op-tech-pill{
      display:inline-flex;align-items:center;gap:7px;font-size:11px;color:var(--text);
      background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:var(--rsm);
      padding:5px 11px;font-weight:400;font-family:${INTER};transition:border-color .18s,background .18s;
    }
    .op-tech-pill:hover{border-color:var(--border-s);background:rgba(255,255,255,.08)}
    @media(max-width:800px){.op-ov-grid{grid-template-columns:1fr;gap:20px}.op-ov-sticky{position:static}}

    /* SCOPE */
    .op-scope-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .op-scope-cell{background:rgba(255,255,255,.03);padding:28px 22px;transition:background .2s}
    .op-scope-cell:hover{background:rgba(255,255,255,.05)}
    .op-scope-title{font-family:${INTER};font-size:.9rem;font-weight:600;color:var(--text);margin-bottom:14px;letter-spacing:-.02em}
    .op-scope-item{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);font-family:${INTER};padding:6px 0;border-bottom:1px solid var(--border);font-weight:300}
    .op-scope-item:last-child{border-bottom:none}
    .op-sdot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}
    @media(max-width:640px){.op-scope-grid{grid-template-columns:1fr}}

    /* CHALLENGES */
    .op-chal-list{display:flex;flex-direction:column}
    .op-chal-row{display:grid;grid-template-columns:56px 1fr 1.7fr;gap:28px;padding:26px 0;border-bottom:1px solid var(--border);align-items:start}
    .op-chal-row:first-child{border-top:1px solid var(--border)}
    .op-chal-n{font-family:${INTER};font-size:.75rem;font-weight:700;color:var(--accent);letter-spacing:.06em}
    .op-chal-title{font-family:${INTER};font-size:.92rem;font-weight:600;color:var(--text);line-height:1.25;letter-spacing:-.025em}
    .op-chal-desc{font-size:12px;line-height:1.8;color:var(--muted);font-weight:300;font-family:${INTER}}
    @media(max-width:640px){
      .op-chal-row{grid-template-columns:38px 1fr;gap:10px 14px}
      .op-chal-desc{grid-column:1/-1}
    }

    /* PROCESS — KernSite proc */
    .op-proc{
      display:grid;grid-template-columns:repeat(3,1fr);
      border:1px solid rgba(255,255,255,.1);border-radius:var(--rxl);overflow:hidden;
      background:linear-gradient(145deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.01) 100%);
      box-shadow:0 1px 0 rgba(255,255,255,.07) inset,0 8px 32px rgba(0,0,0,.4);
    }
    .op-pst{padding:20px 18px;border-right:1px solid rgba(255,255,255,.06);transition:background .2s;position:relative}
    .op-pst:last-child{border-right:none}
    .op-pst:hover{background:rgba(255,255,255,.03)}
    .op-pbig{font-family:${INTER};font-size:3rem;font-weight:800;color:rgba(232,232,230,.18);letter-spacing:-.06em;line-height:1;margin-bottom:8px}
    .op-plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.7;margin-bottom:3px;font-family:${INTER}}
    .op-pttl{font-family:${INTER};font-size:.78rem;font-weight:600;color:var(--text);margin-bottom:4px;line-height:1.3}
    .op-pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}
    @media(max-width:760px){.op-proc{grid-template-columns:1fr 1fr}.op-pst{border-bottom:1px solid rgba(255,255,255,.06)}}
    @media(max-width:480px){.op-proc{grid-template-columns:1fr}.op-pst{border-right:none!important}}

    /* FEATURES */
    .op-feat-grid{display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:var(--border)}
    .op-feat-item{background:rgba(255,255,255,.03);padding:14px 16px;flex:0 0 25%;display:flex;align-items:center;gap:8px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);font-family:${INTER};font-size:11.5px;font-weight:500;color:var(--text);transition:background .18s}
    .op-feat-item:hover{background:rgba(255,255,255,.06)}
    .op-fdot{width:4px;height:4px;border-radius:50%;background:var(--accent);flex-shrink:0}
    .op-fn{font-size:9px;font-weight:500;color:rgba(232,232,230,.2);letter-spacing:.1em;margin-left:auto;font-family:${INTER}}
    @media(max-width:900px){.op-feat-item{flex-basis:33.33%}}
    @media(max-width:560px){.op-feat-item{flex-basis:50%}}

    /* RESULTS */
    .op-res-mosaic{display:grid;grid-template-columns:1.5fr 1fr 1fr;grid-template-rows:repeat(3,1fr);gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .op-res-hero{
      grid-row:span 3;
      background:linear-gradient(145deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 60%,rgba(255,255,255,.05) 100%);
      padding:36px 28px;display:flex;flex-direction:column;justify-content:space-between;
      position:relative;overflow:hidden;
    }
    .op-res-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(to bottom,rgba(255,255,255,.05),transparent);pointer-events:none}
    .op-res-hero-ew{font-size:8px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-family:${INTER}}
    .op-res-hero-val{font-family:${INTER};font-size:clamp(3.5rem,6vw,6rem);font-weight:900;letter-spacing:-.07em;line-height:.88;color:var(--text)}
    .op-res-hero-lbl{font-size:13px;font-weight:600;color:var(--text);font-family:${INTER};margin-bottom:3px}
    .op-res-hero-sub{font-size:10.5px;font-weight:300;color:var(--muted);font-family:${INTER}}
    .op-res-cell{background:rgba(255,255,255,.03);padding:22px 18px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;transition:background .18s}
    .op-res-cell:hover{background:rgba(255,255,255,.05)}
    .op-res-val{font-family:${INTER};font-weight:800;letter-spacing:-.05em;line-height:1;color:var(--text);font-size:clamp(1.6rem,2.5vw,2.4rem)}
    .op-res-lbl{font-size:11px;font-weight:500;color:var(--text);font-family:${INTER};line-height:1.25}
    .op-res-sub{font-size:10px;font-weight:300;color:var(--muted);font-family:${INTER}}
    @media(max-width:768px){
      .op-res-mosaic{grid-template-columns:1fr 1fr;grid-template-rows:auto}
      .op-res-hero{grid-row:span 1;grid-column:1/-1;min-height:160px}
    }

    /* FAQ */
    .op-faq{
      display:grid;grid-template-columns:1fr 1fr;border-radius:var(--rxl);overflow:hidden;
      border:1px solid rgba(255,255,255,.1);
      box-shadow:0 1px 0 rgba(255,255,255,.07) inset,0 12px 40px rgba(0,0,0,.45);
      min-height:360px;
    }
    .op-faq-ql{background:linear-gradient(160deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 100%);padding:22px 16px;display:flex;flex-direction:column;gap:5px;border-right:1px solid rgba(255,255,255,.07)}
    .op-faq-ql-lbl{font-size:8.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.3);font-family:${INTER};padding:0 8px;margin-bottom:5px}
    .op-faq-btn{width:100%;background:none;border:none;cursor:pointer;padding:10px 12px;border-radius:10px;text-align:left;font-family:${INTER};font-size:11.5px;font-weight:400;color:rgba(255,255,255,.5);line-height:1.4;transition:background .2s,color .2s,transform .18s;display:flex;align-items:center;gap:8px}
    .op-faq-btn::before{content:'';flex-shrink:0;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.2);transition:background .2s,transform .2s}
    .op-faq-btn:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.8);transform:translateX(2px)}
    .op-faq-btn.active{background:rgba(240,68,68,.15);color:white;font-weight:500}
    .op-faq-btn.active::before{background:#f04444;transform:scale(1.4);box-shadow:0 0 6px rgba(240,68,68,.5)}
    .op-faq-ar{
      background:linear-gradient(145deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.01) 60%,rgba(255,255,255,.04) 100%);
      padding:28px;display:flex;flex-direction:column;justify-content:center;
      position:relative;overflow:hidden;
    }
    .op-faq-ar::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 80% 20%,rgba(240,68,68,.05) 0%,transparent 65%);pointer-events:none}
    .op-faq-num{font-size:5rem;font-weight:800;letter-spacing:-.06em;line-height:1;color:rgba(232,232,230,.04);font-family:${INTER};position:absolute;bottom:16px;right:22px;pointer-events:none}
    .op-faq-q{font-size:.8rem;font-weight:600;color:var(--text);font-family:${INTER};line-height:1.4;margin-bottom:12px;position:relative;z-index:1}
    .op-faq-q::before{content:'"';font-size:1.8rem;line-height:.8;color:rgba(232,232,230,.1);font-weight:800;display:block;margin-bottom:4px;font-family:Georgia,serif}
    .op-faq-a{font-size:12px;color:var(--muted);line-height:1.8;font-weight:300;font-family:${INTER};position:relative;z-index:1}
    .op-faq-tag{display:inline-flex;align-items:center;gap:4px;margin-top:14px;background:rgba(232,232,230,.04);border-radius:99px;padding:4px 10px;font-size:9.5px;font-weight:500;color:var(--muted);font-family:${INTER};border:1px solid var(--border);position:relative;z-index:1}
    .op-faq-tdot{width:5px;height:5px;border-radius:50%;background:#f04444}
    @keyframes faq-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .op-faq-anim{animation:faq-in .32s cubic-bezier(.22,1,.36,1) forwards}
    @media(max-width:640px){.op-faq{grid-template-columns:1fr}}

    /* CTA */
    .op-cta{padding:80px 32px;text-align:center;position:relative;z-index:1;border-top:1px solid var(--border)}
    .op-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(240,68,68,.07),transparent 60%);pointer-events:none}
    .op-cta-in{position:relative;z-index:1;max-width:480px;margin:0 auto}
    .op-cta-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(240,68,68,.08);border:1px solid rgba(240,68,68,.18);border-radius:var(--rf);padding:4px 12px;font-size:9.5px;font-weight:500;color:var(--accent);letter-spacing:.08em;text-transform:uppercase;font-family:${INTER};margin-bottom:20px}
    .op-cta-h{font-family:${INTER};font-size:clamp(2rem,4.5vw,3.6rem);font-weight:800;letter-spacing:-.055em;line-height:.95;color:var(--text);margin-bottom:14px}
    .op-cta-sub{font-size:12.5px;line-height:1.75;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:28px;max-width:360px;margin-left:auto;margin-right:auto}
    .op-cta-btns{display:flex;gap:9px;justify-content:center;flex-wrap:wrap}

    /* FOOTER */
    .op-foot{padding:16px 32px;border-top:1px solid var(--border);background:transparent;position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
    .op-logo{display:flex;align-items:center;gap:7px;cursor:pointer}
    .op-logo-box{width:26px;height:26px;border-radius:7px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;border:1px solid var(--border)}
    .op-logo-text{font-size:11px;font-weight:600;color:var(--text);letter-spacing:.02em;font-family:${INTER}}
    .op-fcopy{font-size:10px;color:rgba(232,232,230,.3);font-family:${INTER}}

    /* RESPONSIVE */
    @media(max-width:768px){
      .op-nav{padding:14px 16px}
      .op-hero-inner{padding:110px 16px 56px}
      .op-hero-bottom{grid-template-columns:1fr;gap:20px}
      .op-S{padding:48px 16px}
      .op-mockup{padding:32px 16px}
      .op-foot{padding:14px 16px}
    }
    @media(max-width:425px){
      .op-nav{padding:12px 14px}
      .op-hero-inner{padding:90px 14px 48px}
      .op-S{padding:36px 14px}
      .op-h1{font-size:3rem}
      .op-scope-grid{grid-template-columns:1fr}
      .op-feat-item{flex-basis:50%}
      .op-cta{padding:56px 14px}
      .op-foot{padding:14px}
    }
  `;

  const mqItems = ['50+ Agents', '200+ Transactions / mo', '60% Less Overhead', '99.9% Accuracy', '75% Faster Payments', '95% Satisfaction', '0 Security Incidents'];

  return (
    <div className="OP">
      <style>{css}</style>

      <FloatingLinesBg />

      {/* NAV */}
      <nav className="op-nav">
        <div className="op-nav-i">
          <button className="op-back" onClick={() => navigate('/')}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to work
          </button>
          <div className="op-pill">
            <span className="op-nav-tag">Case Study</span>
            <div className="live-dot" />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="op-hero">
        <div className="op-hero-inner">
          <motion.div className="op-eyebrow-row" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="op-eline" />
            <span>2025</span>
            <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
            <span style={{ color: 'var(--accent)' }}>Henceforth Group of Companies</span>
            <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
            <span>Full Stack Developer</span>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1 className="op-h1" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
              Omni<br />portal
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <motion.p className="op-tagline" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.07, ease }}>
              Comprehensive Real Estate Management Portal
            </motion.p>
          </div>

          <motion.div className="op-hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.28, ease }}>
            <div className="op-meta">
              {[
                { label: 'Client', val: 'HGC' },
                { label: 'Duration', val: 'Feb – May 2025' },
                { label: 'Role', val: 'Full Stack Developer' },
                { label: 'Status', val: 'Live in Production' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="op-meta-lbl">{label}</div>
                  <div className="op-meta-val">{val}</div>
                </div>
              ))}
            </div>
            <div className="op-hero-btns">
              <button className="op-btn" onClick={() => navigate('/')}>
                <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2l-6 4 6 4" />
                </svg>
                All work
              </button>
              <button className="op-btn-cta" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
                Read case study
                <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="op-mq">
        <div className="op-mq-outer">
          {[...mqItems, ...mqItems].map((item, i) => (
            <div key={i} className="op-mq-item">
              <span className="op-mq-dot" />{item}
            </div>
          ))}
        </div>
      </div>

      {/* MOCKUP */}
      <div className="op-mockup">
        <div className="op-mockup-inner">
          <motion.div className="op-mockup-frame" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease }}>
            <img src={omniportalMockup} alt="Omniportal Interface" />
          </motion.div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="op-S" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="op-I">
          <div className="op-ov-grid">
            <motion.div className="op-ov-sticky" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
              <div className="op-ghost">01</div>
              <div className="op-ov-head">Project<br />Overview</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease }}>
              <p className="op-ov-body">{data.overview}</p>
              <span className="op-tech-lbl">Technologies</span>
              <div className="op-tech-list">
                {data.technologies.map((t) => (
                  <span key={t} className="op-tech-pill">
                    {techLogos[t] && <img src={techLogos[t]} alt={t} width={13} height={13} style={{ objectFit: 'contain' }} loading="lazy" />}
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="op-S" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="op-I">
          <motion.div className="op-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="op-etag"><span className="op-en">02</span> Scope</div>
            <div className="op-stitle">Three portals.<br />One system.</div>
            <p className="op-ssub">Each role gets a dedicated interface sharing one consistent Supabase backend.</p>
          </motion.div>
          <motion.div className="op-scope-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {data.scope.map(({ n, title, items }) => (
              <motion.div key={n} className="op-scope-cell" variants={fadeUp}>
                <div className="op-ghost">{n}</div>
                <div className="op-scope-title">{title}</div>
                {items.map((item) => (
                  <div key={item} className="op-scope-item"><span className="op-sdot" />{item}</div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="op-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="op-I">
          <motion.div className="op-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="op-etag"><span className="op-en">03</span> Challenges</div>
            <div className="op-stitle">Key challenges<br />& solutions</div>
          </motion.div>
          <div className="op-chal-list">
            {data.challenges.map(({ n, title, desc }, i) => (
              <motion.div key={n} className="op-chal-row" custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="op-chal-n">{n}</div>
                <div className="op-chal-title">{title}</div>
                <div className="op-chal-desc">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="op-S">
        <div className="op-I">
          <motion.div className="op-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="op-etag"><span className="op-en">04</span> Process</div>
            <div className="op-stitle">12 weeks,<br />6 phases.</div>
            <p className="op-ssub">Weekly build-and-review cycles from requirements to production.</p>
          </motion.div>
          <motion.div className="op-proc" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
            {data.process.map(({ n, label, title, desc }) => (
              <motion.div key={n} className="op-pst" variants={fadeUp}>
                <div className="op-pbig">{n}</div>
                <div className="op-plbl">{label}</div>
                <div className="op-pttl">{title}</div>
                <div className="op-pdsc">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="op-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="op-I">
          <motion.div className="op-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="op-etag"><span className="op-en">05</span> Features</div>
            <div className="op-stitle">What's inside</div>
          </motion.div>
          <motion.div className="op-feat-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
            {data.features.map((f, i) => (
              <motion.div key={f} className="op-feat-item" variants={fadeUp}>
                <span className="op-fdot" />{f}
                <span className="op-fn">{String(i + 1).padStart(2, '0')}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="op-S">
        <div className="op-I">
          <motion.div className="op-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="op-etag"><span className="op-en">06</span> Results</div>
            <div className="op-stitle">Results & Impact</div>
            <p className="op-ssub">Measurable outcomes from the first week of launch.</p>
          </motion.div>
          <motion.div className="op-res-mosaic" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div className="op-res-hero" variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }}>
              <div className="op-res-hero-ew">Highlight</div>
              <div className="op-res-hero-val">99.9%</div>
              <div>
                <div className="op-res-hero-lbl">Commission accuracy</div>
                <div className="op-res-hero-sub">Financial precision since launch</div>
              </div>
            </motion.div>
            {data.results.map(({ value, label, sub }, i) => (
              <motion.div key={i} className="op-res-cell" variants={fadeUp}>
                <div className="op-res-val">{value}</div>
                <div>
                  <div className="op-res-lbl">{label}</div>
                  <div className="op-res-sub">{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="op-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="op-I">
          <motion.div className="op-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="op-etag"><span className="op-en">07</span> FAQ</div>
            <div className="op-stitle">Project questions</div>
            <p className="op-ssub">Common questions about the build, stack, and delivery.</p>
          </motion.div>
          <motion.div className="op-faq" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease }}>
            <div className="op-faq-ql">
              <div className="op-faq-ql-lbl">Questions</div>
              {data.faqs.map(({ q }, i) => (
                <button key={i} className={`op-faq-btn${faqActive === i ? ' active' : ''}`} onClick={() => setOpenFaq(i)}>{q}</button>
              ))}
            </div>
            <div className="op-faq-ar">
              <div className="op-faq-num">{String(faqActive + 1).padStart(2, '0')}</div>
              <div key={faqActive} className="op-faq-anim">
                <div className="op-faq-q">{data.faqs[faqActive].q}</div>
                <div className="op-faq-a">{data.faqs[faqActive].a}</div>
                <div className="op-faq-tag"><span className="op-faq-tdot" />{data.faqs[faqActive].tag}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="op-cta">
        <motion.div className="op-cta-in" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, ease }}>
          <div className="op-cta-badge">
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Open for new projects
          </div>
          <h2 className="op-cta-h">Have a project<br />in mind?</h2>
          <p className="op-cta-sub">Let's build something great together — from internal tools to full-scale platforms.</p>
          <div className="op-cta-btns">
            <button className="op-btn-cta" onClick={() => navigate('/#contact')}>
              Start a conversation
              <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </button>
            <button className="op-btn" onClick={() => navigate('/')}>View all work</button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="op-foot">
        <div className="op-logo" onClick={() => navigate('/')}>
          <div className="op-logo-box">
            <img src="/kernlogoblack.png" alt="Kern" style={{ width: 15, height: 15, objectFit: 'contain', filter: 'invert(1) opacity(0.7)' }} />
          </div>
          <span className="op-logo-text">Kern</span>
        </div>
        <span className="op-fcopy">
          <span style={{ color: 'var(--text)' }}>Kern</span> is a registered trademark © All rights reserved {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}