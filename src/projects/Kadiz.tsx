import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import kadizMockup from '../assets/kadizmockup.webp';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const ease = [0.22, 1, 0.36, 1] as const;

const projectDetails = {
  title: 'Kadiz POS',
  tagline: 'Modern Point of Sale System for Retail Excellence',
  duration: '4 months',
  role: 'Full Stack Developer',
  client: 'Kadiz',
  year: '2025',
  technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Supabase', 'Git'],
  overview: 'Kadiz POS is a modern, cloud-based point of sale system designed for retail businesses. It offers seamless transaction processing, inventory management, and real-time sales analytics — all wrapped in an intuitive interface that works across devices, even offline.',
  challenges: [
    { title: 'Offline Functionality', description: 'Implemented PWA features with IndexedDB to ensure the system works seamlessly without internet, syncing data automatically when the connection is restored.' },
    { title: 'Payment Integration', description: 'Integrated multiple payment gateways (Stripe, PayPal) with robust error handling and transaction reconciliation to ensure secure and reliable payment processing.' },
    { title: 'Real-time Inventory Sync', description: 'Developed real-time inventory synchronization across multiple store locations using Supabase subscriptions, preventing overselling and stock discrepancies.' }
  ],
  process: [
    { n: '01', label: '1 week', title: 'Research & Analysis', desc: 'Interviewed retail owners, analyzed competitor POS systems, created user stories and defined success KPIs.' },
    { n: '02', label: '2 weeks', title: 'UI/UX Design', desc: 'Wireframes, high-fidelity Figma designs, interactive prototype for cashier flow, and usability testing with retail staff.' },
    { n: '03', label: '4 weeks', title: 'Backend Development', desc: 'Supabase DB setup, RESTful API with Express.js, auth system, Stripe integration, and automated backup pipeline.' },
    { n: '04', label: '6 weeks', title: 'Frontend Development', desc: 'Responsive React UI, Zustand state management, offline-first Service Workers, barcode scanning, and receipt printing.' },
    { n: '05', label: '3 weeks', title: 'Testing & Launch', desc: 'End-to-end and load testing, beta with 5 pilot stores, production deployment, and training documentation.' },
  ],
  features: [
    { title: 'Barcode Scanning', desc: 'Lightning-fast checkout with hardware scanner support.' },
    { title: 'Offline Mode', desc: 'Full functionality without internet, auto-syncs on reconnect.' },
    { title: 'Multi-store Inventory', desc: 'Real-time stock tracking across all locations.' },
    { title: 'Loyalty Program', desc: 'Built-in customer loyalty and rewards integration.' },
    { title: 'Sales Analytics', desc: 'Detailed reports, trends, and revenue insights.' },
    { title: 'Receipt Printing', desc: 'Physical and email receipts out of the box.' },
    { title: 'Employee Management', desc: 'Shift tracking, roles, and permissions per user.' },
    { title: 'Multi-payment Support', desc: 'Cash, card, Stripe, PayPal, and more.' },
    { title: 'Returns & Refunds', desc: 'Streamlined return and refund processing.' },
    { title: 'Product Catalog', desc: 'Full catalog with categories, tags, and variants.' },
    { title: 'Low Stock Alerts', desc: 'Reorder notifications before you run out.' },
    { title: 'Tablet-optimized UI', desc: 'Touch-first interface designed for the counter.' },
  ],
  results: [
    { value: '50%', label: 'Faster checkout', sub: 'Avg. time reduction', bar: 50 },
    { value: '99.9%', label: 'System uptime', sub: 'With offline fallback', bar: 99 },
    { value: '5K+', label: 'Daily transactions', sub: 'Across 10 stores', bar: 85 },
    { value: '98%', label: 'Inventory accuracy', sub: 'After deployment', bar: 98 },
    { value: '35%', label: 'Higher satisfaction', sub: 'Customer feedback', bar: 35 },
    { value: '60%', label: 'Less training time', sub: 'For new staff', bar: 60 },
  ]
};

const scopeCards = [
  { num: '01', title: 'Cashier Interface', items: ['Barcode scanning support', 'Fast product search', 'Cart & discount management', 'Multiple payment methods', 'Receipt printing & email'] },
  { num: '02', title: 'Inventory Management', items: ['Multi-store stock tracking', 'Low stock alerts', 'Reorder notifications', 'Product catalog & variants', 'Real-time sync across locations'] },
  { num: '03', title: 'Admin Dashboard', items: ['Sales analytics & reports', 'Employee management', 'Shift tracking', 'Revenue insights', 'Customizable KPI dashboard'] }
];

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

const featureIcons = [
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="15" rx="2"/><path d="M1 10h22"/><path d="M7 15h.01M11 15h2"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6l4.5 6L1 18"/><path d="M8 6l4.5 6L8 18"/><path d="M15 6h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
];

export default function Kadiz() {
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
      --rsm:8px;--rmd:11px;--rlg:15px;--rxl:17px;--rf:9999px
    }
    .KZ{font-family:${INTER};background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;min-height:100vh;font-size:13px}

    /* NAV */
    .kz-nav{position:sticky;top:0;z-index:200;padding:0 32px;height:56px;display:flex;align-items:center;background:rgba(245,245,245,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
    .kz-nav-i{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1100px;margin:0 auto}
    .kz-back{display:inline-flex;align-items:center;gap:6px;font-family:${INTER};font-size:11.5px;font-weight:500;color:var(--muted);background:none;border:none;cursor:pointer;padding:0;transition:color .2s}
    .kz-back:hover{color:var(--text)}
    .kz-nav-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);border:1px solid var(--border-s);border-radius:var(--rf);padding:4px 11px;font-size:9.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .kz-ndot{width:5px;height:5px;border-radius:50%;background:#82D49F;flex-shrink:0}

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
    .kz-hero{padding:90px 32px 64px;border-bottom:1px solid var(--border);position:relative;overflow:hidden}
    .kz-hero-inner{max-width:1100px;margin:0 auto}
    .kz-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
    .kz-h1{font-family:${INTER};font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.04;letter-spacing:-.04em;color:var(--text);margin-bottom:14px}
    .kz-tagline{font-size:13px;line-height:1.78;color:var(--muted);font-weight:300;font-family:${INTER};max-width:340px;margin-bottom:28px}
    .kz-hero-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}

    /* BUTTONS */
    .bp{display:inline-flex;align-items:center;gap:5px;background:var(--accent);color:white;font-family:${INTER};font-size:11.5px;font-weight:500;border:none;border-radius:var(--rf);padding:7px 18px;cursor:pointer;transition:all .2s;box-shadow:0 3px 10px rgba(0,0,0,.18)}
    .bp:hover{background:#3a3a3a;transform:translateY(-1px)}
    .bg{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);color:var(--text);font-family:${INTER};font-size:11.5px;font-weight:500;border:1px solid var(--border-s);border-radius:var(--rf);padding:7px 18px;cursor:pointer;transition:all .2s}
    .bg:hover{background:rgba(201,201,201,.28)}
    .bdot{width:5px;height:5px;border-radius:50%;background:#82D49F;flex-shrink:0}

    /* META STRIP */
    .kz-meta-strip{display:flex;flex-wrap:wrap;border:1px solid var(--border);border-radius:var(--rmd);overflow:hidden;background:var(--white);width:fit-content;margin-bottom:16px}
    .kz-meta-item{padding:12px 18px;border-right:1px solid var(--border)}
    .kz-meta-item:last-child{border-right:none}
    .kz-meta-label{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:4px}
    .kz-meta-value{font-size:12px;font-weight:600;color:var(--text);font-family:${INTER}}

    /* MINI STATS */
    .kz-mini-stats{display:flex;gap:8px}
    .kz-mini-stat{flex:1;background:var(--white);border:1px solid var(--border);border-radius:var(--rmd);padding:13px 14px}
    .kz-mini-val{font-family:${INTER};font-size:1.5rem;font-weight:800;letter-spacing:-.04em;color:var(--text);line-height:1}
    .kz-mini-lbl{font-size:10px;color:var(--muted);font-weight:300;margin-top:3px;font-family:${INTER};line-height:1.4}

    /* MOCKUP */
    .kz-mockup{border-radius:var(--rxl);overflow:hidden;border:1px solid var(--border);box-shadow:0 24px 64px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.04)}
    .kz-mockup img{width:100%;height:auto;display:block}

    /* OVERVIEW */
    .kz-overview-grid{display:grid;grid-template-columns:1fr 1.65fr;gap:56px;align-items:start}
    .kz-overview-body{font-size:12px;line-height:1.82;color:var(--muted);font-weight:300;margin-bottom:24px;font-family:${INTER}}
    .kz-tech-label{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:9px;display:block}
    .kz-tech-list{display:flex;flex-wrap:wrap;gap:6px}
    .kz-tech-pill{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--text);background:var(--white);border:1px solid var(--border);border-radius:var(--rmd);padding:5px 10px;font-weight:400;font-family:${INTER};transition:border-color .2s,box-shadow .2s}
    .kz-tech-pill:hover{border-color:var(--border-s);box-shadow:0 2px 8px rgba(0,0,0,.06)}

    /* PROC GRID */
    .proc{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:var(--white);box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .proc.cols-5{grid-template-columns:repeat(5,1fr)}
    .pst{padding:22px 20px;border-right:1px solid var(--border);transition:background .2s}
    .pst:last-child{border-right:none}
    .pst:hover{background:rgba(39,43,48,.02)}
    .pbig{font-family:${INTER};font-size:3.2rem;font-weight:800;color:rgba(0,0,0,.04);letter-spacing:-.04em;line-height:1;margin-bottom:10px}
    .plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.6;margin-bottom:3px;font-family:${INTER}}
    .pttl{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);margin-bottom:8px;line-height:1.3}
    .pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}
    .pcheck{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:5px;line-height:1.5}
    .pcheck-dot{width:14px;height:14px;border-radius:50%;background:rgba(39,43,48,.06);border:1px solid var(--border-s);display:flex;align-items:center;justify-content:center;flex-shrink:0}

    /* CHALLENGES */
    .kz-chal-list{display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden}
    .kz-chal-row{display:grid;grid-template-columns:220px 1fr;gap:28px;padding:22px 26px;background:var(--white);transition:background .2s;align-items:start}
    .kz-chal-row:hover{background:rgba(39,43,48,.015)}
    .kz-chal-num{font-size:9px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:${INTER};margin-bottom:5px;display:block}
    .kz-chal-title{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);line-height:1.3}
    .kz-chal-desc{font-size:12px;line-height:1.78;color:var(--muted);font-weight:300;font-family:${INTER}}

    /* FEATURES — 4-col svc grid */
    .svg2{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:var(--white);box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .svc{padding:18px 16px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);transition:background .25s;position:relative}
    .svc:nth-child(4n){border-right:none}
    .svc:nth-child(n+9){border-bottom:none}
    .svc:hover{background:rgba(39,43,48,.02)}
    .svc-n{position:absolute;top:14px;right:14px;font-size:8.5px;font-weight:500;letter-spacing:.14em;color:rgba(26,26,26,.18);font-family:${INTER}}
    .svc-ic{margin-bottom:12px;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:rgba(39,43,48,.06)}
    .svc-t{font-family:${INTER};font-size:.78rem;font-weight:600;color:var(--text);margin-bottom:4px;line-height:1.3}
    .svc-d{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}

    /* STAT CARDS */
    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .stat-card{background:var(--white);border-radius:var(--rlg);padding:20px 18px 16px;display:flex;flex-direction:column;gap:4px;transition:transform .25s,box-shadow .25s;box-shadow:0 1px 8px rgba(0,0,0,.05);border:1px solid var(--border)}
    .stat-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.09);border-color:rgba(0,0,0,.1)}
    .stat-num{font-family:${INTER};font-size:2.2rem;font-weight:800;letter-spacing:-.04em;line-height:1;color:var(--text)}
    .stat-label{font-size:11px;font-weight:500;color:var(--text);font-family:${INTER}}
    .stat-sub{font-size:10px;color:var(--muted);font-weight:300;font-family:${INTER}}
    .stat-bar-track{height:2px;background:rgba(0,0,0,.06);border-radius:9px;overflow:hidden;margin-top:8px}
    .stat-bar-fill{height:100%;border-radius:9px;background:var(--accent)}

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

    /* PULL QUOTE */
    .pull-quote{font-size:clamp(.95rem,1.9vw,1.3rem);font-weight:400;line-height:1.55;color:var(--muted);letter-spacing:-.01em;font-family:${INTER};max-width:540px}
    .pull-quote strong{color:var(--text);font-weight:600}

    /* BADGE */
    .badge{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);border-radius:var(--rf);padding:4px 11px;font-size:9.5px;font-weight:400;color:var(--muted);letter-spacing:.02em;border:1px solid var(--border);font-family:${INTER}}
    .bdg-dot{width:5px;height:5px;border-radius:50%;background:#FF9900;flex-shrink:0}

    /* CTA + FOOTER */
    .kz-cta-section{padding:72px 32px;text-align:center;border-top:1px solid var(--border)}
    .kz-cta-inner{max-width:480px;margin:0 auto}
    .kz-cta-title{font-family:${INTER};font-size:clamp(1.5rem,3vw,2.2rem);font-weight:600;letter-spacing:-.025em;line-height:1.12;color:var(--text);margin-bottom:10px}
    .kz-cta-sub{font-size:12px;line-height:1.75;color:var(--muted);font-weight:300;font-family:${INTER};margin-bottom:24px}
    .kz-cta-actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
    .foot{padding:16px 32px;border-top:1px solid var(--border);background:var(--bg)}
    .fi2{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
    .logo{display:flex;align-items:center;gap:7px;cursor:pointer}
    .logo-box{width:28px;height:28px;border-radius:7px;background:var(--accent);display:flex;align-items:center;justify-content:center}
    .logo-text{font-size:11px;font-weight:600;color:var(--accent);letter-spacing:.02em;font-family:${INTER}}
    .fcopy{font-size:10px;color:rgba(26,26,26,.35);font-family:${INTER}}

    /* RESPONSIVE */
    @media(max-width:960px){
      .kz-hero-grid{grid-template-columns:1fr!important;gap:32px!important}
      .kz-overview-grid{grid-template-columns:1fr!important;gap:28px!important}
      .proc.cols-5{grid-template-columns:1fr 1fr 1fr}
      .proc{grid-template-columns:1fr 1fr}
      .pst:nth-child(2n){border-right:none!important}
      .svg2{grid-template-columns:1fr 1fr}
      .svg2 .svc:nth-child(2n){border-right:none!important}
      .stats-grid{grid-template-columns:1fr 1fr 1fr}
      .shead{flex-direction:column;align-items:flex-start}
      .ssub{max-width:100%}
      .kz-chal-row{grid-template-columns:1fr!important;gap:6px!important;padding:16px 18px!important}
    }
    @media(max-width:640px){
      .S{padding:44px 16px}
      .kz-hero{padding:68px 16px 48px}
      .foot,.kz-cta-section{padding-left:16px;padding-right:16px}
      .kz-nav{padding:0 16px}
      .proc.cols-5{grid-template-columns:1fr 1fr}
      .proc{grid-template-columns:1fr}
      .pst{border-right:none!important;border-bottom:1px solid var(--border)}
      .pst:last-child{border-bottom:none}
      .svg2{grid-template-columns:1fr 1fr}
      .svg2 .svc{border-right:none!important}
      .stats-grid{grid-template-columns:1fr 1fr}
      .kz-mini-stats{flex-direction:column}
      .kz-meta-strip{flex-direction:column;width:100%}
      .kz-meta-item{border-right:none!important;border-bottom:1px solid var(--border)}
      .kz-meta-item:last-child{border-bottom:none}
    }
  `;

  return (
    <div className="KZ">
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className="kz-nav">
        <div className="kz-nav-i">
          <button className="kz-back" onClick={() => navigate('/')}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </button>
          <span className="kz-nav-badge">
            <span className="kz-ndot" />
            Case Study
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="kz-hero">
        <div className="kz-hero-inner">
          <div className="kz-hero-grid">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <span className="eyebrow" style={{ marginBottom: 10 }}>{projectDetails.year} · {projectDetails.role}</span>
              <h1 className="kz-h1">{projectDetails.title}</h1>
              <p className="kz-tagline">{projectDetails.tagline}</p>
              <div className="kz-hero-actions">
                <button className="bp" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span className="bdot" />
                  Read case study
                </button>
                <button className="bg" onClick={() => navigate('/')}>← Back to work</button>
              </div>
            </motion.div>

            {/* Right: meta strip + mini stats */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
              <div className="kz-meta-strip">
                {[
                  { label: 'Client', value: projectDetails.client },
                  { label: 'Duration', value: projectDetails.duration },
                  { label: 'Year', value: projectDetails.year },
                ].map(({ label, value }, i) => (
                  <div key={i} className="kz-meta-item">
                    <div className="kz-meta-label">{label}</div>
                    <div className="kz-meta-value">{value}</div>
                  </div>
                ))}
              </div>
              <div className="kz-mini-stats">
                {projectDetails.results.slice(0, 3).map(({ value, label }, i) => (
                  <div key={i} className="kz-mini-stat">
                    <div className="kz-mini-val">{value}</div>
                    <div className="kz-mini-lbl">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOCKUP ── */}
      <section className="S white">
        <div className="I">
          <motion.div
            className="kz-mockup"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}
          >
            <img src={kadizMockup} alt="Kadiz POS Interface" />
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section id="overview" className="S">
        <div className="I">
          <div className="kz-overview-grid">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              <div className="section-eyebrow-row">
                <span className="eyebrow">Overview</span>
                <span className="eyebrow-line" />
              </div>
              <h2 className="stitle">Project<br />Overview</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}>
              <p className="kz-overview-body">{projectDetails.overview}</p>
              <span className="kz-tech-label">Technologies Used</span>
              <div className="kz-tech-list">
                {projectDetails.technologies.map((tech, i) => (
                  <span key={i} className="kz-tech-pill">
                    {techLogos[tech] && (
                      <img src={techLogos[tech]} alt={tech} width={13} height={13}
                        style={{ objectFit: 'contain', filter: tech === 'Express.js' ? 'contrast(0) brightness(0.4)' : undefined }}
                        loading="lazy" />
                    )}
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECT SCOPE (proc-style 3-col) ── */}
      <section className="S white">
        <div className="I">
          <motion.div className="shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>Scope</span>
              <h2 className="stitle">Three modules.<br />One seamless system.</h2>
            </div>
            <p className="ssub">Each module handles a distinct retail workflow, unified through a single Supabase backend.</p>
          </motion.div>

          <motion.div className="proc" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {scopeCards.map(({ num, title, items }) => (
              <motion.div key={num} className="pst" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}>
                <div className="pbig">{num}</div>
                <div className="plbl">{num}</div>
                <div className="pttl">{title}</div>
                {items.map((item, j) => (
                  <div key={j} className="pcheck">
                    <div className="pcheck-dot">
                      <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="S">
        <div className="I">
          <motion.div style={{ marginBottom: 26 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">Challenges</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="stitle">Key challenges & solutions</h2>
          </motion.div>

          <div className="kz-chal-list">
            {projectDetails.challenges.map((c, i) => (
              <motion.div
                key={i} className="kz-chal-row"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <div>
                  <span className="kz-chal-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="kz-chal-title">{c.title}</div>
                </div>
                <p className="kz-chal-desc">{c.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div style={{ marginTop: 32, display: 'flex', flexDirection: 'column' as const, gap: 11, maxWidth: 540 }} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">The outcome</span>
              <span className="eyebrow-line" />
            </div>
            <p className="pull-quote">
              Solving offline-first at the <strong>architecture level</strong> — not as an afterthought — is what made Kadiz POS <strong>reliable enough for production retail</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DEVELOPMENT PROCESS (proc 5-step) ── */}
      <section className="S white">
        <div className="I">
          <motion.div className="shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>Process</span>
              <h2 className="stitle">4 months,<br />5 focused phases.</h2>
            </div>
            <p className="ssub">From user research to beta stores — a structured build with real feedback throughout.</p>
          </motion.div>

          <motion.div
            className="proc cols-5"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
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

          <motion.div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button className="bp" onClick={() => navigate('/#contact')}>
              <span className="bdot" />
              Start your project
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES (svc 4-col grid) ── */}
      <section className="S">
        <div className="I">
          <motion.div style={{ marginBottom: 26 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">Features</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="stitle">What's inside</h2>
          </motion.div>

          <motion.div className="svg2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
            {projectDetails.features.map(({ title, desc }, i) => (
              <motion.div key={i} className="svc" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } }}>
                <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-ic">{featureIcons[i % featureIcons.length]}</span>
                <div className="svc-t">{title}</div>
                <div className="svc-d">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RESULTS (stat cards 3-col) ── */}
      <section className="S white">
        <div className="I">
          <motion.div className="shead" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>Results</span>
              <h2 className="stitle">Results & Impact</h2>
            </div>
            <p className="ssub">Measured across 10 stores in the first 30 days after launch.</p>
          </motion.div>

          <motion.div className="stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {projectDetails.results.map(({ value, label, sub, bar }, i) => (
              <motion.div key={i} className="stat-card" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                <div className="stat-num">{value}</div>
                <div className="stat-label">{label}</div>
                <div className="stat-sub">{sub}</div>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${bar}%` }} />
                </div>
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
              <h2 className="stitle">Project questions</h2>
            </div>
            <p className="ssub">Common questions about the Kadiz POS build, stack decisions, and delivery.</p>
          </div>

          <motion.div className="faq" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {[
              { q: 'How does the offline mode actually work?', a: 'The app uses a Service Worker to cache the shell and critical assets, and IndexedDB to queue transactions locally. When connectivity returns, a background sync process replays the queue against Supabase in order.' },
              { q: 'Why Express.js alongside Supabase?', a: 'Supabase handles the DB and real-time layer, but payment webhook verification and custom business logic (commission splits, tax calculations) needed a thin API layer that\'s easier to secure and test independently.' },
              { q: 'How did you handle multi-store inventory without conflicts?', a: 'Each store writes to its own partition in Supabase. A central reconciliation function runs on commit and resolves any concurrent stock mutations using optimistic locking with version counters.' },
              { q: 'Was this tested with real stores before launch?', a: 'Yes — five pilot stores ran Kadiz POS in parallel with their existing system for 3 weeks. All discrepancies were caught and resolved before the full rollout.' },
              { q: 'Can I get a similar system built for my business?', a: 'Absolutely. We build custom POS, inventory, and operations systems for retail and hospitality. Reach out and we\'ll scope your project.' },
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
      <section className="kz-cta-section">
        <div className="kz-cta-inner">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <div className="badge"><span className="bdg-dot" />Open for new projects</div>
            </div>
            <h2 className="kz-cta-title">Have a project<br />in mind?</h2>
            <p className="kz-cta-sub">Let's discuss how we can build something great together — from internal tools to full-scale platforms.</p>
            <div className="kz-cta-actions">
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