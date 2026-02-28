import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingLines from '@/components/FloatingLines';
import kadizMockup from '../assets/kadizmockup.webp';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Floating Lines Background (identical to Omniportal) ─── */
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
  technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Supabase', 'Git'],
  overview: 'Kadiz POS is a modern, cloud-based point of sale system designed for retail businesses. It offers seamless transaction processing, inventory management, and real-time sales analytics — all wrapped in an intuitive interface that works across devices, even offline.',
  challenges: [
    { n: '01', title: 'Offline Functionality', desc: 'Implemented PWA features with IndexedDB to ensure the system works seamlessly without internet, syncing data automatically when the connection is restored.' },
    { n: '02', title: 'Payment Integration', desc: 'Integrated multiple payment gateways (Stripe, PayPal) with robust error handling and transaction reconciliation to ensure secure and reliable payment processing.' },
    { n: '03', title: 'Real-time Inventory Sync', desc: 'Developed real-time inventory synchronization across multiple store locations using Supabase subscriptions, preventing overselling and stock discrepancies.' },
  ],
  process: [
    { n: '01', label: '1 week', title: 'Research & Analysis', desc: 'Interviewed retail owners, analyzed competitor POS systems, created user stories and defined success KPIs.' },
    { n: '02', label: '2 weeks', title: 'UI/UX Design', desc: 'Wireframes, high-fidelity Figma designs, interactive prototype for cashier flow, and usability testing with retail staff.' },
    { n: '03', label: '4 weeks', title: 'Backend Development', desc: 'Supabase DB setup, RESTful API with Express.js, auth system, Stripe integration, and automated backup pipeline.' },
    { n: '04', label: '6 weeks', title: 'Frontend Development', desc: 'Responsive React UI, Zustand state management, offline-first Service Workers, barcode scanning, and receipt printing.' },
    { n: '05', label: '3 weeks', title: 'Testing & Launch', desc: 'End-to-end and load testing, beta with 5 pilot stores, production deployment, and training documentation.' },
  ],
  scope: [
    { n: '01', title: 'Cashier Interface', items: ['Barcode scanning support', 'Fast product search', 'Cart & discount management', 'Multiple payment methods', 'Receipt printing & email'] },
    { n: '02', title: 'Inventory Management', items: ['Multi-store stock tracking', 'Low stock alerts', 'Reorder notifications', 'Product catalog & variants', 'Real-time sync across locations'] },
    { n: '03', title: 'Admin Dashboard', items: ['Sales analytics & reports', 'Employee management', 'Shift tracking', 'Revenue insights', 'Customizable KPI dashboard'] },
  ],
  features: ['Barcode Scanning', 'Offline Mode', 'Multi-store Inventory', 'Loyalty Program', 'Sales Analytics', 'Receipt Printing', 'Employee Management', 'Multi-payment Support', 'Returns & Refunds', 'Product Catalog', 'Low Stock Alerts', 'Tablet-optimized UI'],
  results: [
    { value: '50%', label: 'Faster checkout', sub: 'Avg. time reduction' },
    { value: '99.9%', label: 'System uptime', sub: 'With offline fallback' },
    { value: '5K+', label: 'Daily transactions', sub: 'Across 10 stores' },
    { value: '98%', label: 'Inventory accuracy', sub: 'After deployment' },
    { value: '35%', label: 'Higher satisfaction', sub: 'Customer feedback' },
    { value: '60%', label: 'Less training time', sub: 'For new staff' },
  ],
  faqs: [
    { q: 'How does the offline mode actually work?', a: 'The app uses a Service Worker to cache the shell and critical assets, and IndexedDB to queue transactions locally. When connectivity returns, a background sync process replays the queue against Supabase in order.', tag: 'Architecture' },
    { q: 'Why Express.js alongside Supabase?', a: 'Supabase handles the DB and real-time layer, but payment webhook verification and custom business logic (commission splits, tax calculations) needed a thin API layer that\'s easier to secure and test independently.', tag: 'Stack' },
    { q: 'How did you handle multi-store inventory without conflicts?', a: 'Each store writes to its own partition in Supabase. A central reconciliation function runs on commit and resolves any concurrent stock mutations using optimistic locking with version counters.', tag: 'Engineering' },
    { q: 'Was this tested with real stores before launch?', a: 'Yes — five pilot stores ran Kadiz POS in parallel with their existing system for 3 weeks. All discrepancies were caught and resolved before the full rollout.', tag: 'Testing' },
    { q: 'Can I get a similar system built for my business?', a: 'Absolutely. We build custom POS, inventory, and operations systems for retail and hospitality. Reach out and we\'ll scope your project.', tag: 'General' },
  ],
};

const techLogos: Record<string, string> = {
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  Vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  Supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
};

const mqItems = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Supabase', 'PWA', 'IndexedDB', 'Stripe', 'PayPal', 'Git'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.07, ease } }),
};

export default function Kadiz() {
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
    .KZ{font-family:${INTER};background:transparent;color:var(--text);min-height:100vh;font-size:13px;overflow-x:hidden;width:100%}

    /* SCROLLBAR */
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,transparent,#f04444 15%,#ff6b6b 40%,#f04444 60%,#991b1b 85%,transparent);border-radius:999px;box-shadow:0 0 6px rgba(240,68,68,.8)}
    *{scrollbar-width:thin;scrollbar-color:#f04444 transparent}

    /* NAV */
    .kz-nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      padding:18px 32px;
      display:flex;justify-content:center;
      background:transparent;pointer-events:none;
    }
    .kz-nav-i{pointer-events:all;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1100px}
    .kz-back{
      display:inline-flex;align-items:center;gap:6px;
      font-family:${INTER};font-size:11px;font-weight:500;
      color:rgba(255,255,255,.6);background:none;border:none;cursor:pointer;
      padding:0;transition:color .2s;letter-spacing:.01em;
    }
    .kz-back:hover{color:var(--text)}
    .kz-pill{
      display:flex;align-items:center;gap:7px;
      background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
      border-radius:var(--rf);padding:6px 14px;
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 1px 0 rgba(255,255,255,.12) inset;
    }
    .kz-nav-tag{font-size:10px;font-weight:400;letter-spacing:.04em;color:rgba(255,255,255,.5);font-family:${INTER}}
    .live-dot{
      width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;
      animation:livepulse 2.2s ease-in-out infinite;
    }
    @keyframes livepulse{0%,100%{box-shadow:0 0 0 0 rgba(240,68,68,.4)}60%{box-shadow:0 0 0 5px rgba(240,68,68,0)}}

    /* BUTTONS */
    .kz-btn{
      display:inline-flex;align-items:center;gap:7px;
      background:#111;color:#fff;
      font-family:${INTER};font-size:11.5px;font-weight:500;
      border:1px solid rgba(255,255,255,.18);border-radius:var(--rf);
      padding:9px 20px;cursor:pointer;letter-spacing:.01em;
      box-shadow:0 1px 0 rgba(255,255,255,.06) inset;
      transition:background .2s,border-color .2s,transform .15s;
    }
    .kz-btn:hover{background:#1c1c1c;border-color:rgba(255,255,255,.3);transform:translateY(-1px)}
    .kz-btn-cta{
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
    .kz-btn-cta:hover{box-shadow:0 0 36px rgba(200,40,40,.55);transform:translateY(-1px)}
    @keyframes btn-shift{
      0%{background-position:0% 0%}33%{background-position:80% 20%}
      66%{background-position:30% 90%}100%{background-position:100% 100%}
    }

    /* HERO */
    .kz-hero{min-height:100vh;background:transparent;display:flex;flex-direction:column;position:relative;overflow:hidden}
    .kz-hero-inner{
      max-width:1100px;margin:0 auto;width:100%;
      padding:140px 32px 80px;
      display:flex;flex-direction:column;justify-content:space-between;
      flex:1;position:relative;z-index:1;
    }
    .kz-eyebrow-row{
      display:flex;align-items:center;gap:10px;
      font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
      color:var(--muted);font-family:${INTER};margin-bottom:40px;
    }
    .kz-eline{width:20px;height:1px;background:var(--accent);flex-shrink:0}
    .kz-h1{
      font-family:${INTER};font-size:clamp(3.8rem,9vw,9rem);
      font-weight:800;letter-spacing:-.055em;line-height:.92;
      color:var(--text);margin-bottom:10px;
    }
    .kz-tagline{
      font-family:${INTER};font-size:clamp(.95rem,2vw,1.7rem);
      font-weight:300;letter-spacing:-.02em;color:var(--muted);font-style:italic;margin-bottom:52px;
    }
    .kz-hero-bottom{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:end}
    .kz-meta{display:flex;flex-wrap:wrap;gap:28px}
    .kz-meta-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:4px;opacity:.6}
    .kz-meta-val{font-size:12.5px;font-weight:500;color:var(--text);font-family:${INTER}}
    .kz-hero-btns{display:flex;gap:8px;align-items:center;flex-wrap:wrap}

    /* MARQUEE */
    .kz-mq{overflow:hidden;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:transparent;width:100%}
    .kz-mq-outer{display:flex;width:max-content;will-change:transform}
    .kz-mq-track{display:flex;animation:mqs 30s linear infinite;flex-shrink:0}
    @keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
    .kz-mq-item{display:flex;align-items:center;gap:9px;padding:0 20px;white-space:nowrap;font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .kz-mq-dot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}

    /* MOCKUP */
    .kz-mockup{padding:48px 32px;background:transparent;position:relative;z-index:1}
    .kz-mockup-inner{max-width:1100px;margin:0 auto}
    .kz-mockup-frame{
      border-radius:18px;overflow:hidden;
      border:1px solid rgba(255,255,255,.08);
      box-shadow:0 48px 120px rgba(0,0,0,.7),0 8px 28px rgba(0,0,0,.5);
    }
    .kz-mockup-frame img{width:100%;height:auto;display:block}

    /* SECTIONS */
    .kz-S{padding:64px 32px;position:relative;z-index:1;overflow-x:hidden}
    .kz-I{max-width:1100px;margin:0 auto;width:100%}

    /* EYEBROW TAG */
    .kz-etag{display:inline-flex;align-items:center;gap:6px;font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:10px}
    .kz-en{color:var(--accent)}
    .kz-stitle{font-family:${INTER};font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;letter-spacing:-.04em;line-height:1.08;color:var(--text);margin-bottom:8px}
    .kz-ssub{font-size:12px;color:var(--muted);line-height:1.75;font-weight:300;max-width:320px;font-family:${INTER};margin-bottom:28px}
    .kz-shead{margin-bottom:32px}

    /* ghost number */
    .kz-ghost{font-size:4.5rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.18);font-family:${INTER};margin-bottom:2px}

    /* OVERVIEW */
    .kz-ov-grid{display:grid;grid-template-columns:180px 1fr;gap:56px;align-items:start}
    .kz-ov-sticky{position:sticky;top:80px}
    .kz-ov-head{font-family:${INTER};font-size:1.6rem;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:var(--text)}
    .kz-ov-body{font-size:13px;line-height:1.9;color:var(--muted);font-weight:300;margin-bottom:24px;font-family:${INTER}}
    .kz-tech-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:9px;display:block;opacity:.7}
    .kz-tech-list{display:flex;flex-wrap:wrap;gap:6px}
    .kz-tech-pill{
      display:inline-flex;align-items:center;gap:7px;font-size:11px;color:var(--text);
      background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:var(--rsm);
      padding:5px 11px;font-weight:400;font-family:${INTER};transition:border-color .18s,background .18s;
    }
    .kz-tech-pill:hover{border-color:var(--border-s);background:rgba(255,255,255,.08)}
    @media(max-width:800px){.kz-ov-grid{grid-template-columns:1fr;gap:20px}.kz-ov-sticky{position:static}}

    /* SCOPE */
    .kz-scope-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .kz-scope-cell{background:rgba(255,255,255,.03);padding:28px 22px;transition:background .2s}
    .kz-scope-cell:hover{background:rgba(255,255,255,.05)}
    .kz-scope-title{font-family:${INTER};font-size:.9rem;font-weight:600;color:var(--text);margin-bottom:14px;letter-spacing:-.02em}
    .kz-scope-item{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);font-family:${INTER};padding:6px 0;border-bottom:1px solid var(--border);font-weight:300}
    .kz-scope-item:last-child{border-bottom:none}
    .kz-sdot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}
    @media(max-width:640px){.kz-scope-grid{grid-template-columns:1fr}}

    /* CHALLENGES */
    .kz-chal-list{display:flex;flex-direction:column}
    .kz-chal-row{display:grid;grid-template-columns:56px 1fr 1.7fr;gap:28px;padding:26px 0;border-bottom:1px solid var(--border);align-items:start}
    .kz-chal-row:first-child{border-top:1px solid var(--border)}
    .kz-chal-n{font-family:${INTER};font-size:.75rem;font-weight:700;color:var(--accent);letter-spacing:.06em}
    .kz-chal-title{font-family:${INTER};font-size:.92rem;font-weight:600;color:var(--text);line-height:1.25;letter-spacing:-.025em}
    .kz-chal-desc{font-size:12px;line-height:1.8;color:var(--muted);font-weight:300;font-family:${INTER}}
    @media(max-width:640px){
      .kz-chal-row{grid-template-columns:38px 1fr;gap:10px 14px}
      .kz-chal-desc{grid-column:1/-1}
    }

    /* PROCESS */
    .kz-proc{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .kz-pst{background:rgba(255,255,255,.03);padding:24px 20px;transition:background .2s}
    .kz-pst:hover{background:rgba(255,255,255,.05)}
    .kz-pbig{font-size:3.8rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.1);font-family:${INTER};margin-bottom:8px}
    .kz-plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.7;margin-bottom:4px;font-family:${INTER}}
    .kz-pttl{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);margin-bottom:6px;line-height:1.3}
    .kz-pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}
    @media(max-width:900px){.kz-proc{grid-template-columns:repeat(3,1fr)}}
    @media(max-width:560px){.kz-proc{grid-template-columns:1fr 1fr}}

    /* FEATURES */
    .kz-feat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .kz-feat-item{
      background:rgba(255,255,255,.03);padding:14px 18px;
      display:flex;align-items:center;justify-content:space-between;
      font-size:12px;font-weight:400;color:var(--text);font-family:${INTER};
      transition:background .2s;
    }
    .kz-feat-item:hover{background:rgba(255,255,255,.06)}
    .kz-fdot{width:4px;height:4px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-right:10px}
    .kz-fn{font-size:9px;color:rgba(232,232,230,.2);font-weight:500;letter-spacing:.08em;font-family:${INTER}}
    @media(max-width:700px){.kz-feat-grid{grid-template-columns:1fr 1fr}}

    /* RESULTS */
    .kz-res-mosaic{display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:auto auto;gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .kz-res-hero{
      grid-column:1;grid-row:1/3;
      background:rgba(240,68,68,.08);padding:32px 28px;
      display:flex;flex-direction:column;justify-content:space-between;gap:16px;
      border-right:1px solid var(--border);
    }
    .kz-res-hero-ew{font-size:8px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-family:${INTER}}
    .kz-res-hero-val{font-family:${INTER};font-size:4rem;font-weight:900;letter-spacing:-.06em;line-height:1;color:var(--text)}
    .kz-res-hero-lbl{font-size:14px;font-weight:600;color:var(--text);font-family:${INTER};margin-bottom:2px}
    .kz-res-hero-sub{font-size:11px;color:var(--muted);font-weight:300;font-family:${INTER}}
    .kz-res-cell{background:rgba(255,255,255,.03);padding:22px 22px;display:flex;flex-direction:column;gap:4px;transition:background .2s}
    .kz-res-cell:hover{background:rgba(255,255,255,.06)}
    .kz-res-val{font-family:${INTER};font-size:1.9rem;font-weight:800;letter-spacing:-.04em;line-height:1;color:var(--text);margin-bottom:2px}
    .kz-res-lbl{font-size:11px;font-weight:500;color:var(--text);font-family:${INTER}}
    .kz-res-sub{font-size:10px;color:var(--muted);font-weight:300;font-family:${INTER}}
    @media(max-width:700px){.kz-res-mosaic{grid-template-columns:1fr 1fr}.kz-res-hero{grid-column:1/-1;grid-row:auto}}

    /* FAQ */
    .kz-faq{display:grid;grid-template-columns:280px 1fr;gap:2px;background:var(--border);border-radius:var(--rxl);overflow:hidden}
    .kz-faq-ql{background:rgba(255,255,255,.03);padding:24px 20px;display:flex;flex-direction:column;gap:4px}
    .kz-faq-ql-lbl{font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:10px;opacity:.6}
    .kz-faq-btn{
      display:block;width:100%;text-align:left;
      font-family:${INTER};font-size:11px;font-weight:400;color:var(--muted);
      background:none;border:none;cursor:pointer;padding:9px 12px;border-radius:var(--rsm);
      transition:background .18s,color .18s;line-height:1.45;
    }
    .kz-faq-btn:hover{background:rgba(255,255,255,.06);color:var(--text)}
    .kz-faq-btn.active{background:rgba(240,68,68,.1);color:var(--text);font-weight:500}
    .kz-faq-ar{background:rgba(255,255,255,.02);padding:32px 28px;position:relative}
    .kz-faq-num{font-size:5rem;font-weight:900;letter-spacing:-.07em;line-height:1;color:rgba(232,232,230,.07);font-family:${INTER};position:absolute;top:20px;right:24px}
    .kz-faq-anim{animation:faq-in .3s ease}
    @keyframes faq-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .kz-faq-q{font-family:${INTER};font-size:1rem;font-weight:600;color:var(--text);letter-spacing:-.025em;line-height:1.3;margin-bottom:14px}
    .kz-faq-a{font-size:12.5px;line-height:1.85;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:18px;max-width:480px}
    .kz-faq-tag{display:inline-flex;align-items:center;gap:6px;font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .kz-faq-tdot{width:4px;height:4px;border-radius:50%;background:var(--accent);flex-shrink:0}
    @media(max-width:640px){.kz-faq{grid-template-columns:1fr}}

    /* CTA */
    .kz-cta{padding:96px 32px;text-align:center;position:relative;z-index:1}
    .kz-cta-in{max-width:480px;margin:0 auto}
    .kz-cta-badge{
      display:inline-flex;align-items:center;gap:6px;
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
      border-radius:var(--rf);padding:5px 14px;
      font-size:9.5px;font-weight:400;color:var(--muted);letter-spacing:.04em;
      font-family:${INTER};margin-bottom:20px;
    }
    .kz-cta-h{font-family:${INTER};font-size:clamp(1.8rem,4vw,3rem);font-weight:800;letter-spacing:-.05em;line-height:1.08;color:var(--text);margin-bottom:12px}
    .kz-cta-sub{font-size:12px;line-height:1.75;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:28px}
    .kz-cta-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}

    /* FOOTER */
    .kz-foot{padding:16px 32px;border-top:1px solid var(--border);position:relative;z-index:1}
    .kz-foot-i{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
    .kz-logo{display:flex;align-items:center;gap:7px;cursor:pointer}
    .kz-logo-box{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,.08);border:1px solid var(--border-s);display:flex;align-items:center;justify-content:center}
    .kz-logo-text{font-size:11px;font-weight:600;color:rgba(255,255,255,.6);letter-spacing:.02em;font-family:${INTER}}
    .kz-fcopy{font-size:10px;color:rgba(232,232,230,.25);font-family:${INTER}}

    @media(max-width:640px){
      .kz-hero-inner{padding:120px 20px 60px}
      .kz-S{padding:52px 20px}
      .kz-hero-bottom{grid-template-columns:1fr;gap:24px}
      .kz-nav{padding:14px 20px}
    }
  `;

  return (
    <div className="KZ">
      <style>{css}</style>
      <FloatingLinesBg />

      {/* NAV */}
      <nav className="kz-nav">
        <div className="kz-nav-i">
          <button className="kz-back" onClick={() => navigate('/')}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div className="kz-pill">
            <span className="live-dot" />
            <span className="kz-nav-tag">Case Study</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="kz-hero">
        <div className="kz-hero-inner">
          <motion.div className="kz-eyebrow-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="kz-eline" />
            <span>2025</span>
            <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
            <span style={{ color: 'var(--accent)' }}>Kadiz</span>
            <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
            <span>Full Stack Developer</span>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1 className="kz-h1" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
              Kadiz<br />POS
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <motion.p className="kz-tagline" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.07, ease }}>
              Modern Point of Sale System for Retail Excellence
            </motion.p>
          </div>

          <motion.div className="kz-hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.28, ease }}>
            <div className="kz-meta">
              {[
                { label: 'Client', val: 'Kadiz' },
                { label: 'Duration', val: '4 months' },
                { label: 'Role', val: 'Full Stack Developer' },
                { label: 'Status', val: 'Live in Production' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="kz-meta-lbl">{label}</div>
                  <div className="kz-meta-val">{val}</div>
                </div>
              ))}
            </div>
            <div className="kz-hero-btns">
              <button className="kz-btn" onClick={() => navigate('/')}>
                <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2l-6 4 6 4" />
                </svg>
                All work
              </button>
              <button className="kz-btn-cta" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
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
      <div className="kz-mq">
        <div className="kz-mq-outer">
          {[...mqItems, ...mqItems].map((item, i) => (
            <div key={i} className="kz-mq-item">
              <span className="kz-mq-dot" />{item}
            </div>
          ))}
        </div>
      </div>

      {/* MOCKUP */}
      <div className="kz-mockup">
        <div className="kz-mockup-inner">
          <motion.div className="kz-mockup-frame" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease }}>
            <img src={kadizMockup} alt="Kadiz POS Interface" />
          </motion.div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="kz-S" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="kz-I">
          <div className="kz-ov-grid">
            <motion.div className="kz-ov-sticky" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
              <div className="kz-ghost">01</div>
              <div className="kz-ov-head">Project<br />Overview</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease }}>
              <p className="kz-ov-body">{data.overview}</p>
              <span className="kz-tech-lbl">Technologies</span>
              <div className="kz-tech-list">
                {data.technologies.map((t) => (
                  <span key={t} className="kz-tech-pill">
                    {techLogos[t] && (
                      <img src={techLogos[t]} alt={t} width={13} height={13}
                        style={{ objectFit: 'contain', filter: t === 'Express.js' ? 'contrast(0) brightness(3)' : undefined }}
                        loading="lazy" />
                    )}
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="kz-S" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="kz-I">
          <motion.div className="kz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="kz-etag"><span className="kz-en">02</span> Scope</div>
            <div className="kz-stitle">Three modules.<br />One system.</div>
            <p className="kz-ssub">Each module handles a distinct retail workflow, unified through a single Supabase backend.</p>
          </motion.div>
          <motion.div className="kz-scope-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {data.scope.map(({ n, title, items }) => (
              <motion.div key={n} className="kz-scope-cell" variants={fadeUp}>
                <div className="kz-ghost">{n}</div>
                <div className="kz-scope-title">{title}</div>
                {items.map((item) => (
                  <div key={item} className="kz-scope-item"><span className="kz-sdot" />{item}</div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="kz-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="kz-I">
          <motion.div className="kz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="kz-etag"><span className="kz-en">03</span> Challenges</div>
            <div className="kz-stitle">Key challenges<br />& solutions</div>
          </motion.div>
          <div className="kz-chal-list">
            {data.challenges.map(({ n, title, desc }, i) => (
              <motion.div key={n} className="kz-chal-row" custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="kz-chal-n">{n}</div>
                <div className="kz-chal-title">{title}</div>
                <div className="kz-chal-desc">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="kz-S">
        <div className="kz-I">
          <motion.div className="kz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="kz-etag"><span className="kz-en">04</span> Process</div>
            <div className="kz-stitle">16 weeks,<br />5 phases.</div>
            <p className="kz-ssub">Iterative build-and-review cycles from research to production launch.</p>
          </motion.div>
          <motion.div className="kz-proc" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
            {data.process.map(({ n, label, title, desc }) => (
              <motion.div key={n} className="kz-pst" variants={fadeUp}>
                <div className="kz-pbig">{n}</div>
                <div className="kz-plbl">{label}</div>
                <div className="kz-pttl">{title}</div>
                <div className="kz-pdsc">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="kz-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="kz-I">
          <motion.div className="kz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="kz-etag"><span className="kz-en">05</span> Features</div>
            <div className="kz-stitle">What's inside</div>
          </motion.div>
          <motion.div className="kz-feat-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
            {data.features.map((f, i) => (
              <motion.div key={f} className="kz-feat-item" variants={fadeUp}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="kz-fdot" />{f}
                </div>
                <span className="kz-fn">{String(i + 1).padStart(2, '0')}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="kz-S">
        <div className="kz-I">
          <motion.div className="kz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="kz-etag"><span className="kz-en">06</span> Results</div>
            <div className="kz-stitle">Results & Impact</div>
            <p className="kz-ssub">Measured across 10 stores in the first 30 days after launch.</p>
          </motion.div>
          <motion.div className="kz-res-mosaic" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div className="kz-res-hero" variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }}>
              <div className="kz-res-hero-ew">Highlight</div>
              <div className="kz-res-hero-val">99.9%</div>
              <div>
                <div className="kz-res-hero-lbl">System uptime</div>
                <div className="kz-res-hero-sub">With offline fallback since launch</div>
              </div>
            </motion.div>
            {data.results.filter((_, i) => i !== 1).map(({ value, label, sub }, i) => (
              <motion.div key={i} className="kz-res-cell" variants={fadeUp}>
                <div className="kz-res-val">{value}</div>
                <div>
                  <div className="kz-res-lbl">{label}</div>
                  <div className="kz-res-sub">{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="kz-S" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="kz-I">
          <motion.div className="kz-shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="kz-etag"><span className="kz-en">07</span> FAQ</div>
            <div className="kz-stitle">Project questions</div>
            <p className="kz-ssub">Common questions about the build, stack decisions, and delivery.</p>
          </motion.div>
          <motion.div className="kz-faq" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease }}>
            <div className="kz-faq-ql">
              <div className="kz-faq-ql-lbl">Questions</div>
              {data.faqs.map(({ q }, i) => (
                <button key={i} className={`kz-faq-btn${faqActive === i ? ' active' : ''}`} onClick={() => setOpenFaq(i)}>{q}</button>
              ))}
            </div>
            <div className="kz-faq-ar">
              <div className="kz-faq-num">{String(faqActive + 1).padStart(2, '0')}</div>
              <div key={faqActive} className="kz-faq-anim">
                <div className="kz-faq-q">{data.faqs[faqActive].q}</div>
                <div className="kz-faq-a">{data.faqs[faqActive].a}</div>
                <div className="kz-faq-tag"><span className="kz-faq-tdot" />{data.faqs[faqActive].tag}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="kz-cta">
        <motion.div className="kz-cta-in" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, ease }}>
          <div className="kz-cta-badge">
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Open for new projects
          </div>
          <h2 className="kz-cta-h">Have a project<br />in mind?</h2>
          <p className="kz-cta-sub">Let's build something great together — from internal tools to full-scale platforms.</p>
          <div className="kz-cta-btns">
            <button className="kz-btn-cta" onClick={() => navigate('/#contact')}>
              Start a conversation
              <svg width={9} height={9} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </button>
            <button className="kz-btn" onClick={() => navigate('/')}>View all work</button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="kz-foot">
        <div className="kz-foot-i">
          <div className="kz-logo" onClick={() => navigate('/')}>
            <div className="kz-logo-box">
              <img src="/kernlogoblack.png" alt="Kern" style={{ width: 15, height: 15, objectFit: 'contain', filter: 'invert(1) opacity(0.7)' }} />
            </div>
            <span className="kz-logo-text">Kern</span>
          </div>
          <span className="kz-fcopy">
            <span style={{ color: 'var(--text)' }}>Kern</span> is a registered trademark © All rights reserved {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}