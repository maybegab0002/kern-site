import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import spendzyMain from '../assets/spendzy.webp';
import spendzySignup from '../assets/spendzysignup.webp';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const ease = [0.22, 1, 0.36, 1] as const;

const projectDetails = {
  title: 'Spendzy',
  tagline: 'Smart Financial Tracking Made Simple',
  duration: '4 weeks',
  role: 'Full Stack Developer',
  year: '2024–2025',
  status: 'Discontinued',
  technologies: ['Flutter', 'Dart', 'Supabase'],
  overview: 'Spendzy was a mobile-first financial tracking application designed to help users manage their expenses, track spending patterns, and achieve their financial goals. Built with Flutter for cross-platform compatibility, it aimed to provide an intuitive interface for daily financial management. Development was discontinued after completing the core authentication and UI foundation.',
  challenges: [
    { title: 'Flutter Widget Architecture', description: "Learning Flutter's declarative UI framework and understanding how to properly structure widgets for reusability and maintainability across the application." },
    { title: 'State Management', description: 'Implementing an effective state management solution to handle user authentication, expense data, and UI updates across different screens without coupling.' },
    { title: 'Supabase Integration', description: 'Setting up Supabase backend for authentication and real-time database functionality, managing secure connections and data synchronization on mobile.' }
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
  currentStatus: [
    'Authentication system fully implemented',
    'Basic UI screens designed and built',
    'Navigation structure completed',
    'Design system established',
  ],
  discontinuedReasons: [
    'Shifted focus to higher-priority client projects',
    'Reassessed project viability and market fit',
    'Valuable learning experience with Flutter and Supabase',
    'Core concepts and designs reusable in future projects',
  ]
};

const techLogos: Record<string, string> = {
  Flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  Dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  Supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
};

export default function Spendzy() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{overflow-x:hidden;-webkit-font-smoothing:antialiased}
    :root{
      --bg:#f5f5f5;--white:#fff;--text:#1a1a1a;--muted:rgba(26,26,26,.45);
      --accent:#272B30;--border:rgba(0,0,0,.07);--border-s:rgba(0,0,0,.12);
      --danger:#dc2626;--danger-bg:rgba(220,38,38,.06);--danger-border:rgba(220,38,38,.18);
      --rsm:8px;--rmd:11px;--rlg:15px;--rxl:17px;--rf:9999px
    }
    .SZ{font-family:${INTER};background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;min-height:100vh;font-size:13px}

    /* NAV */
    .sz-nav{position:sticky;top:0;z-index:200;padding:0 32px;height:56px;display:flex;align-items:center;background:rgba(245,245,245,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
    .sz-nav-i{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1100px;margin:0 auto}
    .sz-back{display:inline-flex;align-items:center;gap:6px;font-family:${INTER};font-size:11.5px;font-weight:500;color:var(--muted);background:none;border:none;cursor:pointer;padding:0;transition:color .2s}
    .sz-back:hover{color:var(--text)}
    .sz-nav-badges{display:flex;align-items:center;gap:6px}
    .sz-nav-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);border:1px solid var(--border-s);border-radius:var(--rf);padding:4px 11px;font-size:9.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .sz-nav-badge.danger{background:var(--danger-bg);border-color:var(--danger-border);color:var(--danger)}
    .sz-ndot{width:5px;height:5px;border-radius:50%;background:#82D49F;flex-shrink:0}
    .sz-ddot{width:5px;height:5px;border-radius:50%;background:var(--danger);flex-shrink:0}

    /* SECTIONS */
    .S{padding:52px 32px;position:relative;z-index:1}
    .S.white{background:var(--white);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
    .I{max-width:1100px;margin:0 auto}
    .eyebrow{font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);display:block;font-family:${INTER}}
    .stitle{font-family:${INTER};font-size:clamp(1.35rem,2.6vw,2rem);font-weight:600;letter-spacing:-.025em;line-height:1.15;color:var(--text)}
    .ssub{font-size:12px;color:var(--muted);line-height:1.75;font-weight:300;max-width:280px;font-family:${INTER}}
    .shead{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:26px;gap:1.5rem}
    .section-eyebrow-row{display:flex;align-items:center;gap:10px;margin-bottom:13px}
    .eyebrow-line{flex:1;height:1px;background:var(--border)}

    /* HERO */
    .sz-hero{padding:90px 32px 64px;border-bottom:1px solid var(--border);position:relative;overflow:hidden}
    .sz-hero-inner{max-width:1100px;margin:0 auto}
    .sz-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
    .sz-h1{font-family:${INTER};font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.04;letter-spacing:-.04em;color:var(--text);margin-bottom:14px}
    .sz-tagline{font-size:13px;line-height:1.78;color:var(--muted);font-weight:300;font-family:${INTER};max-width:340px;margin-bottom:28px}
    .sz-hero-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}

    /* BUTTONS */
    .bp{display:inline-flex;align-items:center;gap:5px;background:var(--accent);color:white;font-family:${INTER};font-size:11.5px;font-weight:500;border:none;border-radius:var(--rf);padding:7px 18px;cursor:pointer;transition:all .2s;box-shadow:0 3px 10px rgba(0,0,0,.18)}
    .bp:hover{background:#3a3a3a;transform:translateY(-1px)}
    .bg{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);color:var(--text);font-family:${INTER};font-size:11.5px;font-weight:500;border:1px solid var(--border-s);border-radius:var(--rf);padding:7px 18px;cursor:pointer;transition:all .2s}
    .bg:hover{background:rgba(201,201,201,.28)}
    .bdot{width:5px;height:5px;border-radius:50%;background:#82D49F;flex-shrink:0}

    /* META STRIP */
    .sz-meta-strip{display:flex;flex-wrap:wrap;border:1px solid var(--border);border-radius:var(--rmd);overflow:hidden;background:var(--white);width:fit-content;margin-bottom:16px}
    .sz-meta-item{padding:12px 18px;border-right:1px solid var(--border)}
    .sz-meta-item:last-child{border-right:none}
    .sz-meta-label{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:4px}
    .sz-meta-value{font-size:12px;font-weight:600;color:var(--text);font-family:${INTER}}
    .sz-meta-value.danger{color:var(--danger)}

    /* HERO RIGHT CARD */
    .sz-hero-card{background:var(--white);border:1px solid var(--border);border-radius:var(--rxl);padding:20px 22px;box-shadow:0 2px 12px rgba(0,0,0,.05)}
    .sz-hero-card-title{font-size:11px;font-weight:600;color:var(--text);font-family:${INTER};margin-bottom:14px;display:flex;align-items:center;justify-content:space-between}
    .sz-disc-pill{display:inline-flex;align-items:center;gap:4px;background:var(--danger-bg);border:1px solid var(--danger-border);border-radius:var(--rf);padding:3px 9px;font-size:9px;font-weight:500;color:var(--danger);font-family:${INTER};letter-spacing:.04em}
    .sz-progress-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
    .sz-progress-label{font-size:10.5px;color:var(--muted);font-weight:300;font-family:${INTER};flex:1}
    .sz-progress-track{flex:2;height:4px;background:rgba(0,0,0,.06);border-radius:9px;overflow:hidden}
    .sz-progress-fill{height:100%;border-radius:9px;background:var(--accent)}
    .sz-progress-fill.done{background:#22c55e}
    .sz-progress-fill.danger{background:var(--danger)}
    .sz-progress-pct{font-size:9.5px;font-weight:600;color:var(--text);font-family:${INTER};width:28px;text-align:right}

    /* DUAL MOCKUP */
    .sz-mockup-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .sz-mockup-img{border-radius:var(--rxl);overflow:hidden;border:1px solid var(--border);box-shadow:0 24px 64px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.04)}
    .sz-mockup-img img{width:100%;height:auto;display:block}

    /* OVERVIEW */
    .sz-overview-grid{display:grid;grid-template-columns:1fr 1.65fr;gap:56px;align-items:start}
    .sz-overview-body{font-size:12px;line-height:1.82;color:var(--muted);font-weight:300;margin-bottom:24px;font-family:${INTER}}
    .sz-tech-label{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:9px;display:block}
    .sz-tech-list{display:flex;flex-wrap:wrap;gap:6px}
    .sz-tech-pill{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--text);background:var(--white);border:1px solid var(--border);border-radius:var(--rmd);padding:5px 10px;font-weight:400;font-family:${INTER};transition:border-color .2s,box-shadow .2s}
    .sz-tech-pill:hover{border-color:var(--border-s);box-shadow:0 2px 8px rgba(0,0,0,.06)}

    /* PROC GRID (4-col) */
    .proc{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:var(--white);box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .pst{padding:22px 20px;border-right:1px solid var(--border);transition:background .2s}
    .pst:last-child{border-right:none}
    .pst:hover{background:rgba(39,43,48,.02)}
    .pbig{font-family:${INTER};font-size:3.2rem;font-weight:800;color:rgba(0,0,0,.04);letter-spacing:-.04em;line-height:1;margin-bottom:10px}
    .plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.6;margin-bottom:3px;font-family:${INTER}}
    .pttl{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);margin-bottom:8px;line-height:1.3}
    .pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}
    .pst:last-child .plbl{color:var(--danger);opacity:1}
    .pst:last-child .pbig{color:rgba(220,38,38,.07)}

    /* CHALLENGES */
    .sz-chal-list{display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden}
    .sz-chal-row{display:grid;grid-template-columns:220px 1fr;gap:28px;padding:22px 26px;background:var(--white);transition:background .2s;align-items:start}
    .sz-chal-row:hover{background:rgba(39,43,48,.015)}
    .sz-chal-num{font-size:9px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:5px;display:block}
    .sz-chal-title{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);line-height:1.3}
    .sz-chal-desc{font-size:12px;line-height:1.78;color:var(--muted);font-weight:300;font-family:${INTER}}

    /* FEATURES — two-column split (built vs planned) */
    .sz-feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .sz-feat-col{border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:var(--white);box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .sz-feat-col-head{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:7px}
    .sz-feat-col-title{font-family:${INTER};font-size:11px;font-weight:600;color:var(--text)}
    .sz-feat-col-pill{display:inline-flex;align-items:center;gap:4px;border-radius:var(--rf);padding:2px 8px;font-size:9px;font-weight:500;font-family:${INTER};letter-spacing:.04em}
    .sz-feat-col-pill.built{background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);color:#16a34a}
    .sz-feat-col-pill.planned{background:rgba(0,0,0,.04);border:1px solid var(--border-s);color:var(--muted)}
    .sz-feat-item{display:flex;align-items:center;gap:9px;padding:11px 18px;border-bottom:1px solid var(--border);font-size:11.5px;color:var(--muted);font-weight:300;font-family:${INTER};transition:background .2s}
    .sz-feat-item:last-child{border-bottom:none}
    .sz-feat-item:hover{background:rgba(39,43,48,.015)}
    .sz-feat-dot{width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .sz-feat-dot.built{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2)}
    .sz-feat-dot.planned{background:rgba(0,0,0,.04);border:1px solid var(--border-s)}

    /* STATUS LIST */
    .sz-status-list{display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden}
    .sz-status-row{display:flex;align-items:center;gap:12px;padding:14px 20px;background:var(--white);transition:background .2s}
    .sz-status-row:hover{background:rgba(39,43,48,.015)}
    .sz-status-dot{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2)}
    .sz-status-text{font-size:12px;color:var(--text);font-weight:400;font-family:${INTER}}

    /* DISCONTINUED GRID (2-col svc style) */
    .sz-disc-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--danger-border);border-radius:var(--rxl);overflow:hidden;background:var(--white);box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .sz-disc-cell{padding:22px 24px;border-right:1px solid var(--danger-border);border-bottom:1px solid var(--danger-border);display:flex;align-items:flex-start;gap:12px;transition:background .2s}
    .sz-disc-cell:nth-child(2n){border-right:none}
    .sz-disc-cell:nth-child(n+3){border-bottom:none}
    .sz-disc-cell:hover{background:var(--danger-bg)}
    .sz-disc-icon{width:28px;height:28px;border-radius:50%;flex-shrink:0;background:var(--danger-bg);border:1px solid var(--danger-border);display:flex;align-items:center;justify-content:center;margin-top:1px}
    .sz-disc-text{font-size:12px;color:var(--muted);font-weight:300;font-family:${INTER};line-height:1.65}

    /* PULL QUOTE */
    .pull-quote{font-size:clamp(.95rem,1.9vw,1.3rem);font-weight:400;line-height:1.55;color:var(--muted);letter-spacing:-.01em;font-family:${INTER};max-width:540px}
    .pull-quote strong{color:var(--text);font-weight:600}

    /* FAQ */
    .faq{border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:var(--white);box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .fi{border-bottom:1px solid var(--border)}
    .fi:last-child{border-bottom:none}
    .fb{width:100%;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:15px 20px;background:transparent;border:none;cursor:pointer;text-align:left;font-family:${INTER};transition:background .2s}
    .fb:hover{background:rgba(39,43,48,.02)}
    .fq{font-family:${INTER};font-size:.8rem;font-weight:500;color:var(--text);line-height:1.4}
    .ficon{width:22px;height:22px;border-radius:50%;flex-shrink:0;border:1px solid var(--border-s);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:13px;transition:all .3s;transform-origin:center}
    .ficon.open{background:var(--accent);border-color:var(--accent);color:white;transform:rotate(45deg)}
    .fbody{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.4,0,.2,1)}
    .fbody.open{grid-template-rows:1fr}
    .fbi{overflow:hidden}
    .fa{padding:0 20px 15px;font-size:11.5px;color:var(--muted);line-height:1.78;font-weight:300;max-width:520px;font-family:${INTER}}

    /* BADGE */
    .badge{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);border-radius:var(--rf);padding:4px 11px;font-size:9.5px;font-weight:400;color:var(--muted);letter-spacing:.02em;border:1px solid var(--border);font-family:${INTER}}
    .bdg-dot{width:5px;height:5px;border-radius:50%;background:#FF9900;flex-shrink:0}

    /* CTA + FOOTER */
    .sz-cta-section{padding:72px 32px;text-align:center;border-top:1px solid var(--border)}
    .sz-cta-inner{max-width:480px;margin:0 auto}
    .sz-cta-title{font-family:${INTER};font-size:clamp(1.5rem,3vw,2.2rem);font-weight:600;letter-spacing:-.025em;line-height:1.12;color:var(--text);margin-bottom:10px}
    .sz-cta-sub{font-size:12px;line-height:1.75;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:24px}
    .sz-cta-actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
    .foot{padding:16px 32px;border-top:1px solid var(--border);background:var(--bg)}
    .fi2{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
    .logo{display:flex;align-items:center;gap:7px;cursor:pointer}
    .logo-box{width:28px;height:28px;border-radius:7px;background:var(--accent);display:flex;align-items:center;justify-content:center}
    .logo-text{font-size:11px;font-weight:600;color:var(--accent);letter-spacing:.02em;font-family:${INTER}}
    .fcopy{font-size:10px;color:rgba(26,26,26,.35);font-family:${INTER}}

    /* RESPONSIVE */
    @media(max-width:960px){
      .sz-hero-grid{grid-template-columns:1fr!important;gap:32px!important}
      .sz-overview-grid{grid-template-columns:1fr!important;gap:28px!important}
      .proc{grid-template-columns:1fr 1fr}
      .pst:nth-child(2n){border-right:none!important}
      .sz-feat-grid{grid-template-columns:1fr}
      .sz-disc-grid{grid-template-columns:1fr}
      .sz-disc-cell{border-right:none!important}
      .shead{flex-direction:column;align-items:flex-start}
      .ssub{max-width:100%}
      .sz-chal-row{grid-template-columns:1fr!important;gap:6px!important;padding:16px 18px!important}
    }
    @media(max-width:640px){
      .S{padding:44px 16px}
      .sz-hero{padding:68px 16px 48px}
      .foot,.sz-cta-section{padding-left:16px;padding-right:16px}
      .sz-nav{padding:0 16px}
      .proc{grid-template-columns:1fr}
      .pst{border-right:none!important;border-bottom:1px solid var(--border)}
      .pst:last-child{border-bottom:none}
      .sz-mockup-grid{grid-template-columns:1fr}
      .sz-meta-strip{flex-direction:column;width:100%}
      .sz-meta-item{border-right:none!important;border-bottom:1px solid var(--border)}
      .sz-meta-item:last-child{border-bottom:none}
    }
  `;

  return (
    <div className="SZ">
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className="sz-nav">
        <div className="sz-nav-i">
          <button className="sz-back" onClick={() => navigate('/')}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </button>
          <div className="sz-nav-badges">
            <span className="sz-nav-badge">
              <span className="sz-ndot" />
              Case Study
            </span>
            <span className="sz-nav-badge danger">
              <span className="sz-ddot" />
              Discontinued
            </span>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sz-hero">
        <div className="sz-hero-inner">
          <div className="sz-hero-grid">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <span className="eyebrow" style={{ marginBottom: 10 }}>{projectDetails.year} · {projectDetails.role}</span>
              <h1 className="sz-h1">{projectDetails.title}</h1>
              <p className="sz-tagline">{projectDetails.tagline}</p>
              <div className="sz-hero-actions">
                <button className="bp" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span className="bdot" />
                  Read case study
                </button>
                <button className="bg" onClick={() => navigate('/')}>← Back to work</button>
              </div>
            </motion.div>

            {/* Right: meta strip + progress card */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
              <div className="sz-meta-strip">
                {[
                  { label: 'Duration', value: projectDetails.duration },
                  { label: 'Year', value: projectDetails.year },
                  { label: 'Type', value: projectDetails.status },
                ].map(({ label, value }, i) => (
                  <div key={i} className="sz-meta-item">
                    <div className="sz-meta-label">{label}</div>
                    <div className={`sz-meta-value${label === 'Type' ? ' danger' : ''}`}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Progress card — unique to Spendzy */}
              <div className="sz-hero-card">
                <div className="sz-hero-card-title">
                  <span>Build progress</span>
                  <span className="sz-disc-pill">
                    <svg width={7} height={7} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    Discontinued at 40%
                  </span>
                </div>
                {[
                  { label: 'Auth & Backend', pct: 100, state: 'done' },
                  { label: 'Design System', pct: 100, state: 'done' },
                  { label: 'Core UI Screens', pct: 80, state: 'done' },
                  { label: 'Analytics & Charts', pct: 0, state: 'danger' },
                  { label: 'Budget Tracking', pct: 0, state: 'danger' },
                ].map(({ label, pct, state }, i) => (
                  <div key={i} className="sz-progress-row">
                    <span className="sz-progress-label">{label}</span>
                    <div className="sz-progress-track">
                      <div className={`sz-progress-fill ${state}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="sz-progress-pct" style={{ color: state === 'danger' ? 'var(--muted)' : 'var(--text)' }}>
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DUAL MOCKUP ── */}
      <section className="S white">
        <div className="I">
          <motion.div
            className="sz-mockup-grid"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}
          >
            <div className="sz-mockup-img"><img src={spendzyMain} alt="Spendzy Main Interface" /></div>
            <div className="sz-mockup-img"><img src={spendzySignup} alt="Spendzy Signup Screen" /></div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section id="overview" className="S">
        <div className="I">
          <div className="sz-overview-grid">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              <div className="section-eyebrow-row">
                <span className="eyebrow">Overview</span>
                <span className="eyebrow-line" />
              </div>
              <h2 className="stitle">Project<br />Overview</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}>
              <p className="sz-overview-body">{projectDetails.overview}</p>
              <span className="sz-tech-label">Technologies Used</span>
              <div className="sz-tech-list">
                {projectDetails.technologies.map((tech, i) => (
                  <span key={i} className="sz-tech-pill">
                    {techLogos[tech] && <img src={techLogos[tech]} alt={tech} width={13} height={13} style={{ objectFit: 'contain' }} loading="lazy" />}
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="S white">
        <div className="I">
          <motion.div style={{ marginBottom: 26 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">Challenges</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="stitle">Key challenges & learnings</h2>
          </motion.div>

          <div className="sz-chal-list">
            {projectDetails.challenges.map((c, i) => (
              <motion.div
                key={i} className="sz-chal-row"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <div>
                  <span className="sz-chal-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="sz-chal-title">{c.title}</div>
                </div>
                <p className="sz-chal-desc">{c.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div style={{ marginTop: 32, display: 'flex', flexDirection: 'column' as const, gap: 11, maxWidth: 540 }} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">The takeaway</span>
              <span className="eyebrow-line" />
            </div>
            <p className="pull-quote">
              Even <strong>discontinued projects teach</strong> — Flutter's widget model and Supabase's auth flow carried directly into every mobile project that came after.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DEVELOPMENT PROCESS (4-col proc) ── */}
      <section className="S">
        <div className="I">
          <motion.div className="shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>Process</span>
              <h2 className="stitle">4 weeks,<br />4 phases completed.</h2>
            </div>
            <p className="ssub">A 4-week sprint that reached core auth and UI before the project was discontinued.</p>
          </motion.div>

          <motion.div
            className="proc"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {projectDetails.process.map(({ n, label, title, desc }) => (
              <motion.div key={n} className="pst" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}>
                <div className="pbig">{n}</div>
                <div className="plbl">{label}</div>
                <div className="pttl">{title}</div>
                <div className="pdsc">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES — built vs planned split ── */}
      <section className="S white">
        <div className="I">
          <motion.div className="shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>Features</span>
              <h2 className="stitle">Built vs planned</h2>
            </div>
            <p className="ssub">What shipped before discontinuation — and what was designed but never built.</p>
          </motion.div>

          <motion.div
            className="sz-feat-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {/* Built column */}
            <motion.div className="sz-feat-col" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
              <div className="sz-feat-col-head">
                <span className="sz-feat-col-title">Completed</span>
                <span className="sz-feat-col-pill built">✓ Shipped</span>
              </div>
              {projectDetails.builtFeatures.map((f, i) => (
                <div key={i} className="sz-feat-item">
                  <div className="sz-feat-dot built">
                    <svg width={7} height={7} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </motion.div>

            {/* Planned column */}
            <motion.div className="sz-feat-col" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
              <div className="sz-feat-col-head">
                <span className="sz-feat-col-title">Planned</span>
                <span className="sz-feat-col-pill planned">Not built</span>
              </div>
              {projectDetails.plannedFeatures.map((f, i) => (
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

      {/* ── WHAT WAS COMPLETED (status list) ── */}
      <section className="S">
        <div className="I">
          <motion.div style={{ marginBottom: 26 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">Status</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="stitle">What was completed</h2>
          </motion.div>

          <div className="sz-status-list">
            {projectDetails.currentStatus.map((s, i) => (
              <motion.div
                key={i} className="sz-status-row"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08, ease }}
              >
                <div className="sz-status-dot">
                  <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="sz-status-text">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DISCONTINUED ── */}
      <section className="S white">
        <div className="I">
          <motion.div style={{ marginBottom: 26 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow" style={{ color: 'var(--danger)' }}>Discontinued</span>
              <span className="eyebrow-line" style={{ background: 'var(--danger-border)' }} />
            </div>
            <h2 className="stitle">Why it was discontinued</h2>
          </motion.div>

          <motion.div
            className="sz-disc-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {projectDetails.discontinuedReasons.map((reason, i) => (
              <motion.div key={i} className="sz-disc-cell" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } }}>
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

      {/* ── FAQ ── */}
      <section className="S">
        <div className="I">
          <div className="shead">
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>FAQ</span>
              <h2 className="stitle">Common questions</h2>
            </div>
            <p className="ssub">Questions about the Spendzy build, the stack decisions, and what came from it.</p>
          </div>

          <motion.div className="faq" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {[
              { q: 'Why Flutter instead of React Native?', a: 'Flutter offered a single codebase with native-like performance and a rich widget library. For a personal project aimed at learning cross-platform mobile, it was the fastest path to a real working UI.' },
              { q: 'How far did the app actually get?', a: 'Authentication was fully functional via Supabase, the design system was established, and the core screens — dashboard, transaction entry, and history view — were built. The analytics and budget layers were never started.' },
              { q: 'Why was it discontinued exactly?', a: 'A combination of two things: a shift in priority toward client work (Omniportal was starting), and an honest reassessment that the market for yet another budgeting app was extremely crowded without a strong differentiator.' },
              { q: 'Did this work carry forward?', a: 'Yes. The Supabase auth patterns established here were directly reused in Omniportal. The Flutter widget architecture experience informed how we think about component structure even in React projects.' },
              { q: 'Would you continue it?', a: 'Possibly, with a narrower scope — focusing on a specific niche (e.g., freelancer income tracking) rather than general expense management. The foundation is solid and could be revived.' },
            ].map(({ q, a }, i) => (
              <motion.div key={i} className="fi" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } }}>
                <button className="fb" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="fq">{q}</span>
                  <span className={`ficon${openFaq === i ? ' open' : ''}`}>+</span>
                </button>
                <div className={`fbody${openFaq === i ? ' open' : ''}`}>
                  <div className="fbi"><p className="fa">{a}</p></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="sz-cta-section">
        <div className="sz-cta-inner">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <div className="badge"><span className="bdg-dot" />Every project teaches something</div>
            </div>
            <h2 className="sz-cta-title">Ready to build<br />something that ships?</h2>
            <p className="sz-cta-sub">
              While Spendzy was discontinued, the lessons from it live in every project we've shipped since. Let's build yours.
            </p>
            <div className="sz-cta-actions">
              <button className="bp" onClick={() => navigate('/#contact')}><span className="bdot" />Start a conversation</button>
              <button className="bg" onClick={() => navigate('/')}>View all work →</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="foot">
        <div className="fi2">
          <div className="logo" onClick={() => navigate('/')}>
            <div className="logo-box">
              <img src="/kernlogoblack.png" alt="Kern" style={{ width: 18, height: 18, objectFit: 'contain', filter: 'invert(1)' }} />
            </div>
            <span className="logo-text">Kern</span>
          </div>
          <span className="fcopy">
            <span style={{ color: 'var(--text)' }}>Kern</span> is a registered trademark © All rights reserved {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}