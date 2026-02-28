import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingLines from '@/components/FloatingLines';
import spendzyMain from '../assets/spendzy.webp';
import spendzySignup from '../assets/spendzysignup.webp';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Floating Lines Background ─── */
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

/* ─── Data ─── */
const data = {
  technologies: ['Flutter', 'Dart', 'Supabase'],
  overview: 'Spendzy was a mobile-first financial tracking application designed to help users manage their expenses, track spending patterns, and achieve their financial goals. Built with Flutter for cross-platform compatibility, it aimed to provide an intuitive interface for daily financial management. Development was discontinued after completing the core authentication and UI foundation.',
  challenges: [
    { n: '01', title: 'Flutter Widget Architecture', desc: "Learning Flutter's declarative UI framework and understanding how to properly structure widgets for reusability and maintainability across the application." },
    { n: '02', title: 'State Management', desc: 'Implementing an effective state management solution to handle user authentication, expense data, and UI updates across different screens without coupling.' },
    { n: '03', title: 'Supabase Integration', desc: 'Setting up Supabase backend for authentication and real-time database functionality, managing secure connections and data synchronization on mobile.' },
  ],
  process: [
    { n: '01', label: 'Week 1', title: 'Concept & Planning', desc: 'Researched finance apps, identified pain points, created user personas and flows, designed data models, set up Flutter environment.' },
    { n: '02', label: 'Week 2', title: 'UI/UX Design', desc: 'Wireframes, high-fidelity Figma designs, mobile-optimized component hierarchy, and design system with color palette.' },
    { n: '03', label: 'Week 3', title: 'Auth Setup', desc: 'Supabase project and config, authentication implementation, signup and login screens, basic navigation structure.' },
    { n: '04', label: 'Week 4', title: 'Core UI', desc: 'Main app screens with Flutter widgets, responsive layouts, reusable components, app theming — then discontinued.' },
  ],
  builtFeatures: [
    'User authentication & signup',
    'Quick expense entry interface',
    'Category-based organization',
    'Transaction history view',
    'Basic dashboard layout',
  ],
  plannedFeatures: [
    'Spending analytics charts',
    'Budget tracking',
    'Visual graphs and reports',
    'Recurring expense management',
    'Multi-currency support',
    'Dark mode support',
    'Data export functionality',
  ],
  faqs: [
    { q: 'Why Flutter instead of React Native?', a: 'Flutter offered a single codebase with native-like performance and a rich widget library. For a personal project aimed at learning cross-platform mobile, it was the fastest path to a real working UI.', tag: 'Stack' },
    { q: 'How far did the app actually get?', a: 'Authentication was fully functional via Supabase, the design system was established, and the core screens — dashboard, transaction entry, and history view — were built. The analytics and budget layers were never started.', tag: 'Progress' },
    { q: 'Why was it discontinued exactly?', a: 'A combination of two things: a shift in priority toward client work (Omniportal was starting), and an honest reassessment that the market for yet another budgeting app was extremely crowded without a strong differentiator.', tag: 'Decision' },
    { q: 'Did this work carry forward?', a: 'Yes. The Supabase auth patterns established here were directly reused in Omniportal. The Flutter widget architecture experience informed how we think about component structure even in React projects.', tag: 'Legacy' },
    { q: 'Would you continue it?', a: 'Possibly, with a narrower scope — focusing on a specific niche (e.g., freelancer income tracking) rather than general expense management. The foundation is solid and could be revived.', tag: 'Future' },
  ],
  discontinuedReasons: [
    'Shifted focus to higher-priority client projects',
    'Reassessed project viability and market fit',
    'Valuable learning experience with Flutter and Supabase',
    'Core concepts and designs reusable in future projects',
  ],
};

const techLogos: Record<string, string> = {
  Flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  Dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  Supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
};

const mqItems = ['Flutter', 'Dart', 'Supabase', 'Mobile', 'PWA', 'Authentication', 'Finance', 'Cross-platform', 'IndexedDB', 'Design System'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.07, ease } }),
};

export default function Spendzy() {
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
      --danger:#f87171;--danger-bg:rgba(248,113,113,.08);--danger-border:rgba(248,113,113,.2);
      --success:#4ade80;--success-bg:rgba(74,222,128,.08);--success-border:rgba(74,222,128,.2);
      --rf:9999px;--rsm:8px;--rmd:11px;--rlg:15px;--rxl:17px;
    }
    .SZ{font-family:${INTER};background:transparent;color:var(--text);min-height:100vh;font-size:13px;overflow-x:hidden;width:100%}

    /* SCROLLBAR */
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,transparent,#f04444 15%,#ff6b6b 40%,#f04444 60%,#991b1b 85%,transparent);border-radius:999px;box-shadow:0 0 6px rgba(240,68,68,.8)}
    *{scrollbar-width:thin;scrollbar-color:#f04444 transparent}

    /* NAV */
    .sz-nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      padding:18px 32px;
      display:flex;justify-content:center;
      background:transparent;pointer-events:none;
    }
    .sz-nav-i{pointer-events:all;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1100px}
    .sz-back{
      display:inline-flex;align-items:center;gap:6px;
      font-family:${INTER};font-size:11px;font-weight:500;
      color:rgba(255,255,255,.6);background:none;border:none;cursor:pointer;
      padding:0;transition:color .2s;letter-spacing:.01em;
    }
    .sz-back:hover{color:var(--text)}
    .sz-nav-pills{display:flex;align-items:center;gap:6px}
    .sz-pill{
      display:flex;align-items:center;gap:7px;
      background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
      border-radius:var(--rf);padding:6px 14px;
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 1px 0 rgba(255,255,255,.12) inset;
    }
    .sz-pill.danger{background:var(--danger-bg);border-color:var(--danger-border)}
    .sz-nav-tag{font-size:10px;font-weight:400;letter-spacing:.04em;color:rgba(255,255,255,.5);font-family:${INTER}}
    .sz-nav-tag.danger{color:var(--danger)}
    .live-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;animation:livepulse 2.2s ease-in-out infinite}
    .danger-dot{width:6px;height:6px;border-radius:50%;background:var(--danger);flex-shrink:0}
    @keyframes livepulse{0%,100%{box-shadow:0 0 0 0 rgba(240,68,68,.4)}60%{box-shadow:0 0 0 5px rgba(240,68,68,0)}}

    /* BUTTONS */
    .sz-btn{
      display:inline-flex;align-items:center;gap:7px;
      background:#111;color:#fff;
      font-family:${INTER};font-size:11.5px;font-weight:500;
      border:1px solid rgba(255,255,255,.18);border-radius:var(--rf);
      padding:9px 20px;cursor:pointer;letter-spacing:.01em;
      box-shadow:0 1px 0 rgba(255,255,255,.06) inset;
      transition:background .2s,border-color .2s,transform .15s;
    }
    .sz-btn:hover{background:#1c1c1c;border-color:rgba(255,255,255,.3);transform:translateY(-1px)}
    .sz-btn-cta{
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
    .sz-btn-cta:hover{box-shadow:0 0 36px rgba(200,40,40,.55);transform:translateY(-1px)}
    @keyframes btn-shift{
      0%{background-position:0% 0%}33%{background-position:80% 20%}
      66%{background-position:30% 90%}100%{background-position:100% 100%}
    }

    /* HERO */
    .sz-hero{min-height:100vh;background:transparent;display:flex;flex-direction:column;position:relative;overflow:hidden}
    .sz-hero-inner{
      max-width:1100px;margin:0 auto;width:100%;
      padding:140px 32px 80px;
      display:flex;flex-direction:column;justify-content:space-between;
      flex:1;position:relative;z-index:1;
    }
    .sz-eyebrow-row{
      display:flex;align-items:center;gap:10px;
      font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
      color:var(--muted);font-family:${INTER};margin-bottom:40px;
    }
    .sz-eline{width:20px;height:1px;background:var(--accent);flex-shrink:0}
    .sz-h1{
      font-family:${INTER};font-size:clamp(3.8rem,9vw,9rem);
      font-weight:800;letter-spacing:-.055em;line-height:.92;
      color:var(--text);margin-bottom:10px;
    }
    .sz-tagline{
      font-family:${INTER};font-size:clamp(.95rem,2vw,1.7rem);
      font-weight:300;letter-spacing:-.02em;color:var(--muted);font-style:italic;margin-bottom:52px;
    }
    .sz-hero-bottom{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:end}
    .sz-meta{display:flex;flex-wrap:wrap;gap:28px}
    .sz-meta-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:4px;opacity:.6}
    .sz-meta-val{font-size:12.5px;font-weight:500;color:var(--text);font-family:${INTER}}
    .sz-meta-val.danger{color:var(--danger)}
    .sz-hero-btns{display:flex;gap:8px;align-items:center;flex-wrap:wrap}

    /* MARQUEE */
    .sz-mq{overflow:hidden;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:transparent;width:100%}
    .sz-mq-outer{display:flex;width:max-content;will-change:transform}
    .sz-mq-track{display:flex;animation:mqs 30s linear infinite;flex-shrink:0}
    @keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
    .sz-mq-item{display:flex;align-items:center;gap:9px;padding:0 20px;white-space:nowrap;font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .sz-mq-dot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}

    /* DUAL MOCKUP */
    .sz-mockup{padding:48px 32px;background:transparent;position:relative;z-index:1}
    .sz-mockup-inner{max-width:1100px;margin:0 auto}
    .sz-mockup-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .sz-mockup-frame{
      border-radius:18px;overflow:hidden;
      border:1px solid rgba(255,255,255,.08);
      box-shadow:0 48px 120px rgba(0,0,0,.7),0 8px 28px rgba(0,0,0,.5);
    }
    .sz-mockup-frame img{width:100%;height:auto;display:block}
    @media(max-width:640px){.sz-mockup-grid{grid-template-columns:1fr}}

    /* PROGRESS CARD */
    .sz-prog-card{
      background:rgba(255,255,255,.04);border:1px solid var(--border-s);
      border-radius:var(--rxl);padding:22px 24px;
    }
    .sz-prog-title{font-size:11px;font-weight:600;color:var(--text);font-family:${INTER};margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
    .sz-disc-pill{
      display:inline-flex;align-items:center;gap:4px;
      background:var(--danger-bg);border:1px solid var(--danger-border);
      border-radius:var(--rf);padding:3px 9px;
      font-size:9px;font-weight:500;color:var(--danger);font-family:${INTER};letter-spacing:.04em;
    }
    .sz-prog-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
    .sz-prog-row:last-child{margin-bottom:0}
    .sz-prog-label{font-size:10.5px;color:var(--muted);font-weight:300;font-family:${INTER};flex:1}
    .sz-prog-track{flex:2;height:3px;background:rgba(255,255,255,.07);border-radius:9px;overflow:hidden}
    .sz-prog-fill{height:100%;border-radius:9px;background:var(--success)}
    .sz-prog-fill.none{background:rgba(248,113,113,.3)}
    .sz-prog-pct{font-size:9.5px;font-weight:600;color:var(--muted);font-family:${INTER};width:28px;text-align:right}
    .sz-prog-pct.done{color:var(--success)}

    /* SECTIONS */
    .sz-S{padding:64px 32px;position:relative;z-index:1;overflow-x:hidden}
    .sz-I{max-width:1100px;margin:0 auto;width:100%}

    /* EYEBROW TAG */
    .sz-etag{display:inline-flex;align-items:center;gap:6px;font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:10px}
    .sz-etag.danger{color:var(--danger)}
    .sz-en{color:var(--accent)}
    .sz-stitle{font-family:${INTER};font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;letter-spacing:-.04em;line-height:1.08;color:var(--text);margin-bottom:8px}
    .sz-ssub{font-size:12px;color:var(--muted);line-height:1.75;font-weight:300;max-width:320px;font-family:${INTER};margin-bottom:28px}
    .sz-shead{margin-bottom:32px}

    /* ghost number */
    .sz-ghost{font-size:4.5rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.18);font-family:${INTER};margin-bottom:2px}

    /* OVERVIEW */
    .sz-ov-grid{display:grid;grid-template-columns:180px 1fr;gap:56px;align-items:start}
    .sz-ov-sticky{position:sticky;top:80px}
    .sz-ov-head{font-family:${INTER};font-size:1.6rem;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:var(--text)}
    .sz-ov-body{font-size:13px;line-height:1.9;color:var(--muted);font-weight:300;margin-bottom:24px;font-family:${INTER}}
    .sz-tech-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:9px;display:block;opacity:.7}
    .sz-tech-list{display:flex;flex-wrap:wrap;gap:6px}
    .sz-tech-pill{
      display:inline-flex;align-items:center;gap:7px;font-size:11px;color:var(--text);
      background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:var(--rsm);
      padding:5px 11px;font-weight:400;font-family:${INTER};transition:border-color .18s,background .18s;
    }
    .sz-tech-pill:hover{border-color:var(--border-s);background:rgba(255,255,255,.08)}
    @media(max-width:800px){.sz-ov-grid{grid-template-columns:1fr;gap:20px}.sz-ov-sticky{position:static}}

    /* CHALLENGES */
    .sz-chal-list{display:flex;flex-direction:column}
    .sz-chal-row{display:grid;grid-template-columns:56px 1fr 1.7fr;gap:28px;padding:26px 0;border-bottom:1px solid var(--border);align-items:start}
    .sz-chal-row:first-child{border-top:1px solid var(--border)}
    .sz-chal-n{font-family:${INTER};font-size:.75rem;font-weight:700;color:var(--accent);letter-spacing:.06em}
    .sz-chal-title{font-family:${INTER};font-size:.92rem;font-weight:600;color:var(--text);line-height:1.25;letter-spacing:-.025em}
    .sz-chal-desc{font-size:12px;line-height:1.8;color:var(--muted);font-weight:300;font-family:${INTER}}
    @media(max-width:640px){.sz-chal-row{grid-template-columns:38px 1fr;gap:10px 14px}.sz-chal-desc{grid-column:1/-1}}

    /* PROCESS */
    .sz-proc{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .sz-pst{background:rgba(255,255,255,.03);padding:24px 20px;transition:background .2s}
    .sz-pst:hover{background:rgba(255,255,255,.05)}
    .sz-pst.discontinued{background:rgba(248,113,113,.04)}
    .sz-pbig{font-size:3.8rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.1);font-family:${INTER};margin-bottom:8px}
    .sz-pst.discontinued .sz-pbig{color:rgba(248,113,113,.12)}
    .sz-plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.7;margin-bottom:4px;font-family:${INTER}}
    .sz-pst.discontinued .sz-plbl{color:var(--danger);opacity:1}
    .sz-pttl{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);margin-bottom:6px;line-height:1.3}
    .sz-pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}
    @media(max-width:700px){.sz-proc{grid-template-columns:1fr 1fr}}
    @media(max-width:440px){.sz-proc{grid-template-columns:1fr}}

    /* FEATURES — built vs planned */
    .sz-feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .sz-feat-col{background:rgba(255,255,255,.03)}
    .sz-feat-col-head{
      padding:16px 20px;border-bottom:1px solid var(--border);
      display:flex;align-items:center;justify-content:space-between;
    }
    .sz-feat-col-title{font-family:${INTER};font-size:11px;font-weight:600;color:var(--text)}
    .sz-feat-col-pill{
      display:inline-flex;align-items:center;gap:4px;
      border-radius:var(--rf);padding:3px 9px;
      font-size:9px;font-weight:500;font-family:${INTER};letter-spacing:.04em;
    }
    .sz-feat-col-pill.built{background:var(--success-bg);border:1px solid var(--success-border);color:var(--success)}
    .sz-feat-col-pill.planned{background:rgba(255,255,255,.05);border:1px solid var(--border-s);color:var(--muted)}
    .sz-feat-item{
      display:flex;align-items:center;gap:10px;
      padding:12px 20px;border-bottom:1px solid var(--border);
      font-size:11.5px;color:var(--muted);font-weight:300;font-family:${INTER};
      transition:background .2s;
    }
    .sz-feat-item:last-child{border-bottom:none}
    .sz-feat-item:hover{background:rgba(255,255,255,.03)}
    .sz-feat-dot{width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .sz-feat-dot.built{background:var(--success-bg);border:1px solid var(--success-border)}
    .sz-feat-dot.planned{background:rgba(255,255,255,.05);border:1px solid var(--border-s)}
    @media(max-width:560px){.sz-feat-grid{grid-template-columns:1fr}}

    /* DISCONTINUED */
    .sz-disc-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--danger-border);border-radius:var(--rxl);overflow:hidden}
    .sz-disc-cell{
      background:rgba(0,0,0,.6);padding:22px 24px;
      display:flex;align-items:flex-start;gap:12px;
      transition:background .2s;
    }
    .sz-disc-cell:hover{background:var(--danger-bg)}
    .sz-disc-icon{
      width:28px;height:28px;border-radius:50%;flex-shrink:0;
      background:var(--danger-bg);border:1px solid var(--danger-border);
      display:flex;align-items:center;justify-content:center;margin-top:1px;
    }
    .sz-disc-text{font-size:12px;color:var(--muted);font-weight:300;font-family:${INTER};line-height:1.65}
    @media(max-width:560px){.sz-disc-grid{grid-template-columns:1fr}}

    /* TAKEAWAY */
    .sz-takeaway{
      margin-top:28px;padding:24px 28px;
      background:rgba(240,68,68,.05);border:1px solid rgba(240,68,68,.12);
      border-radius:var(--rxl);
    }
    .sz-takeaway-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-family:${INTER};margin-bottom:10px;display:block}
    .sz-takeaway-text{font-size:clamp(.9rem,1.8vw,1.2rem);font-weight:300;line-height:1.6;color:var(--muted);letter-spacing:-.01em;font-family:${INTER}}
    .sz-takeaway-text strong{color:var(--text);font-weight:600}

    /* FAQ */
    .sz-faq{display:grid;grid-template-columns:280px 1fr;gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .sz-faq-ql{background:rgba(255,255,255,.03);padding:24px 20px;display:flex;flex-direction:column;gap:4px}
    .sz-faq-ql-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:10px;opacity:.6}
    .sz-faq-btn{
      display:block;width:100%;text-align:left;
      font-family:${INTER};font-size:11px;font-weight:400;color:var(--muted);
      background:none;border:none;cursor:pointer;padding:9px 12px;border-radius:var(--rsm);
      transition:background .18s,color .18s;line-height:1.45;
    }
    .sz-faq-btn:hover{background:rgba(255,255,255,.06);color:var(--text)}
    .sz-faq-btn.active{background:rgba(240,68,68,.1);color:var(--text);font-weight:500}
    .sz-faq-ar{background:rgba(255,255,255,.02);padding:32px 28px;position:relative}
    .sz-faq-num{font-size:5rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.07);font-family:${INTER};position:absolute;top:20px;right:24px}
    .sz-faq-anim{animation:faq-in .3s ease}
    @keyframes faq-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .sz-faq-q{font-family:${INTER};font-size:1rem;font-weight:600;color:var(--text);letter-spacing:-.025em;line-height:1.3;margin-bottom:14px}
    .sz-faq-a{font-size:12.5px;line-height:1.85;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:18px;max-width:480px}
    .sz-faq-tag{display:inline-flex;align-items:center;gap:6px;font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .sz-faq-tdot{width:4px;height:4px;border-radius:50%;background:var(--accent);flex-shrink:0}
    @media(max-width:640px){.sz-faq{grid-template-columns:1fr}}

    /* CTA */
    .sz-cta{padding:96px 32px;text-align:center;position:relative;z-index:1}
    .sz-cta-in{max-width:480px;margin:0 auto}
    .sz-cta-badge{
      display:inline-flex;align-items:center;gap:6px;
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
      border-radius:var(--rf);padding:5px 14px;
      font-size:9.5px;font-weight:400;color:var(--muted);letter-spacing:.04em;
      font-family:${INTER};margin-bottom:20px;
    }
    .sz-cta-h{font-family:${INTER};font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-.05em;line-height:1.08;color:var(--text);margin-bottom:12px}
    .sz-cta-sub{font-size:12px;line-height:1.75;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:28px}
    .sz-cta-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}

    /* FOOTER */
    .sz-foot{padding:16px 32px;border-top:1px solid var(--border);position:relative;z-index:1}
    .sz-foot-i{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
    .sz-logo{display:flex;align-items:center;gap:7px;cursor:pointer}
    .sz-logo-box{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,.08);border:1px solid var(--border-s);display:flex;align-items:center;justify-content:center}
    .sz-logo-text{font-size:11px;font-weight:600;color:rgba(255,255,255,.6);letter-spacing:.02em;font-family:${INTER}}
    .sz-fcopy{font-size:10px;color:rgba(232,232,230,.25);font-family:${INTER}}

    @media(max-width:640px){
      .sz-hero-inner{padding:120px 20px 60px}
      .sz-S{padding:52px 20px}
      .sz-hero-bottom{grid-template-columns:1fr;gap:24px}
      .sz-nav{padding:14px 20px}
      .sz-mockup{padding:32px 20px}
    }
  `;

  return (
    <div className="SZ">
      <style>{css}</style>
      <FloatingLinesBg />

      {/* NAV */}
      <nav className="sz-nav">
        <div className="sz-nav-i">
          <button className="sz-back" onClick={() => navigate('/')}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div className="sz-nav-pills">
            <div className="sz-pill">
              <span className="live-dot" />
              <span className="sz-nav-tag">Case Study</span>
            </div>
            <div className="sz-pill danger">
              <span className="danger-dot" />
              <span className="sz-nav-tag danger">Discontinued</span>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="sz-hero">
        <div className="sz-hero-inner">
          <motion.div className="sz-eyebrow-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="sz-eline" />
            <span>2024–2025</span>
            <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
            <span style={{ color: 'var(--accent)' }}>Personal Project</span>
            <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
            <span>Full Stack Developer</span>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1 className="sz-h1" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
              Spend<br />zy
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <motion.p className="sz-tagline" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.07, ease }}>
              Smart Financial Tracking Made Simple
            </motion.p>
          </div>

          <motion.div className="sz-hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.28, ease }}>
            <div className="sz-meta">
              {[
                { label: 'Duration', val: '4 weeks' },
                { label: 'Year', val: '2024–2025' },
                { label: 'Role', val: 'Full Stack Developer' },
                { label: 'Status', val: 'Discontinued', danger: true },
              ].map(({ label, val, danger }) => (
                <div key={label}>
                  <div className="sz-meta-lbl">{label}</div>
                  <div className={`sz-meta-val${danger ? ' danger' : ''}`}>{val}</div>
                </div>
              ))}
            </div>
            <div className="sz-hero-btns">
              <button className="sz-btn" onClick={() => navigate('/')}>
                <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2l-6 4 6 4" />
                </svg>
                All work
              </button>
              <button className="sz-btn-cta" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
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
      <div className="sz-mq">
        <div className="sz-mq-outer">
          {[...mqItems, ...mqItems].map((item, i) => (
            <div key={i} className="sz-mq-item">
              <span className="sz-mq-dot" />{item}
            </div>
          ))}
        </div>
      </div>

      {/* DUAL MOCKUP */}
      <div className="sz-mockup">
        <div className="sz-mockup-inner">
          <motion.div className="sz-mockup-grid" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease }}>
            <div className="sz-mockup-frame"><img src={spendzyMain} alt="Spendzy Main Interface" /></div>
            <div className="sz-mockup-frame"><img src={spendzySignup} alt="Spendzy Signup Screen" /></div>
          </motion.div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="sz-S" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="sz-I">
          <div className="sz-ov-grid">
            <motion.div className="sz-ov-sticky" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
              <div className="sz-ghost">01</div>
              <div className="sz-ov-head">Project<br />Overview</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease }}>
              <p className="sz-ov-body">{data.overview}</p>
              <span className="sz-tech-lbl">Technologies</span>
              <div className="sz-tech-list">
                {data.technologies.map((t) => (
                  <span key={t} className="sz-tech-pill">
                    {techLogos[t] && <img src={techLogos[t]} alt={t} width={13} height={13} style={{ objectFit: 'contain' }} loading="lazy" />}
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BUILD PROGRESS */}
      <section className="sz-S" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="sz-I">
          <motion.div className="sz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-etag"><span className="sz-en">02</span> Progress</div>
            <div className="sz-stitle">Discontinued<br />at 40%</div>
            <p className="sz-ssub">Core auth and UI foundation were complete. Analytics and budget layers were never started.</p>
          </motion.div>
          <motion.div className="sz-prog-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-prog-title">
              <span>Build progress</span>
              <span className="sz-disc-pill">
                <svg width={7} height={7} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Discontinued at 40%
              </span>
            </div>
            {[
              { label: 'Auth & Backend', pct: 100, done: true },
              { label: 'Design System', pct: 100, done: true },
              { label: 'Core UI Screens', pct: 80, done: true },
              { label: 'Analytics & Charts', pct: 0, done: false },
              { label: 'Budget Tracking', pct: 0, done: false },
            ].map(({ label, pct, done }, i) => (
              <div key={i} className="sz-prog-row">
                <span className="sz-prog-label">{label}</span>
                <div className="sz-prog-track">
                  <div className={`sz-prog-fill${!done ? ' none' : ''}`} style={{ width: `${pct || 4}%` }} />
                </div>
                <span className={`sz-prog-pct${done ? ' done' : ''}`}>{pct}%</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="sz-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="sz-I">
          <motion.div className="sz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-etag"><span className="sz-en">03</span> Challenges</div>
            <div className="sz-stitle">Key challenges<br />& learnings</div>
          </motion.div>
          <div className="sz-chal-list">
            {data.challenges.map(({ n, title, desc }, i) => (
              <motion.div key={n} className="sz-chal-row" custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="sz-chal-n">{n}</div>
                <div className="sz-chal-title">{title}</div>
                <div className="sz-chal-desc">{desc}</div>
              </motion.div>
            ))}
          </div>
          <motion.div className="sz-takeaway" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.2, ease }}>
            <span className="sz-takeaway-lbl">The takeaway</span>
            <p className="sz-takeaway-text">
              Even <strong>discontinued projects teach</strong> — Flutter's widget model and Supabase's auth flow carried directly into every mobile project that came after.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sz-S">
        <div className="sz-I">
          <motion.div className="sz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-etag"><span className="sz-en">04</span> Process</div>
            <div className="sz-stitle">4 weeks,<br />4 phases completed.</div>
            <p className="sz-ssub">A 4-week sprint that reached core auth and UI before the project was discontinued.</p>
          </motion.div>
          <motion.div className="sz-proc" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
            {data.process.map(({ n, label, title, desc }, i) => (
              <motion.div key={n} className={`sz-pst${i === data.process.length - 1 ? ' discontinued' : ''}`} variants={fadeUp}>
                <div className="sz-pbig">{n}</div>
                <div className="sz-plbl">{label}</div>
                <div className="sz-pttl">{title}</div>
                <div className="sz-pdsc">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES — built vs planned */}
      <section className="sz-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="sz-I">
          <motion.div className="sz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-etag"><span className="sz-en">05</span> Features</div>
            <div className="sz-stitle">Built vs planned</div>
            <p className="sz-ssub">What shipped before discontinuation — and what was designed but never built.</p>
          </motion.div>
          <motion.div className="sz-feat-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
            {/* Built */}
            <motion.div className="sz-feat-col" variants={fadeUp}>
              <div className="sz-feat-col-head">
                <span className="sz-feat-col-title">Completed</span>
                <span className="sz-feat-col-pill built">✓ Shipped</span>
              </div>
              {data.builtFeatures.map((f, i) => (
                <div key={i} className="sz-feat-item">
                  <div className="sz-feat-dot built">
                    <svg width={7} height={7} viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </motion.div>
            {/* Planned */}
            <motion.div className="sz-feat-col" variants={fadeUp}>
              <div className="sz-feat-col-head">
                <span className="sz-feat-col-title">Planned</span>
                <span className="sz-feat-col-pill planned">Not built</span>
              </div>
              {data.plannedFeatures.map((f, i) => (
                <div key={i} className="sz-feat-item">
                  <div className="sz-feat-dot planned">
                    <svg width={7} height={7} viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth={2} strokeLinecap="round">
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY DISCONTINUED */}
      <section className="sz-S">
        <div className="sz-I">
          <motion.div className="sz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-etag danger"><span className="sz-en" style={{ color: 'var(--danger)' }}>06</span> Discontinued</div>
            <div className="sz-stitle">Why it was<br />discontinued</div>
          </motion.div>
          <motion.div className="sz-disc-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {data.discontinuedReasons.map((reason, i) => (
              <motion.div key={i} className="sz-disc-cell" variants={fadeUp}>
                <div className="sz-disc-icon">
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4M12 17h.01" />
                  </svg>
                </div>
                <span className="sz-disc-text">{reason}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sz-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="sz-I">
          <motion.div className="sz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="sz-etag"><span className="sz-en">07</span> FAQ</div>
            <div className="sz-stitle">Common questions</div>
            <p className="sz-ssub">Questions about the Spendzy build, the stack decisions, and what came from it.</p>
          </motion.div>
          <motion.div className="sz-faq" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease }}>
            <div className="sz-faq-ql">
              <div className="sz-faq-ql-lbl">Questions</div>
              {data.faqs.map(({ q }, i) => (
                <button key={i} className={`sz-faq-btn${faqActive === i ? ' active' : ''}`} onClick={() => setOpenFaq(i)}>{q}</button>
              ))}
            </div>
            <div className="sz-faq-ar">
              <div className="sz-faq-num">{String(faqActive + 1).padStart(2, '0')}</div>
              <div key={faqActive} className="sz-faq-anim">
                <div className="sz-faq-q">{data.faqs[faqActive].q}</div>
                <div className="sz-faq-a">{data.faqs[faqActive].a}</div>
                <div className="sz-faq-tag"><span className="sz-faq-tdot" />{data.faqs[faqActive].tag}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sz-cta">
        <motion.div className="sz-cta-in" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, ease }}>
          <div className="sz-cta-badge">
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            Every project teaches something
          </div>
          <h2 className="sz-cta-h">Ready to build<br />something that ships?</h2>
          <p className="sz-cta-sub">While Spendzy was discontinued, the lessons from it live in every project we've shipped since. Let's build yours.</p>
          <div className="sz-cta-btns">
            <button className="sz-btn-cta" onClick={() => navigate('/#contact')}>
              Start a conversation
              <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </button>
            <button className="sz-btn" onClick={() => navigate('/')}>View all work</button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="sz-foot">
        <div className="sz-foot-i">
          <div className="sz-logo" onClick={() => navigate('/')}>
            <div className="sz-logo-box">
              <img src="/kernlogoblack.png" alt="Kern" style={{ width: 15, height: 15, objectFit: 'contain', filter: 'invert(1) opacity(0.7)' }} />
            </div>
            <span className="sz-logo-text">Kern</span>
          </div>
          <span className="sz-fcopy">
            <span style={{ color: 'var(--text)' }}>Kern</span> is a registered trademark © All rights reserved {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}