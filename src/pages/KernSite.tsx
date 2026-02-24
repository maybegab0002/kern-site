// KernSite.tsx
// Single-file TSX using the provided v8 design (Inter only)

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import kadizmockup from "@/assets/kadizmockup.webp";
import kernfounder from "@/assets/kernfounder.webp";
import omniportalogin from "@/assets/omniportallogin.webp";
import spendzy from "@/assets/spendzy.webp";


const INTER =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

type SubmitStatus = "idle" | "success" | "error" | "rate_limited";

type WorkItem = {
  title: string;
  period: string;
  client: string;
  tools: string;
  layout: "hero" | "half" | "wide";
  imgs: string[]; // 1 image (single) or 2 images (duo)
};


const KernSite: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqRipples, setFaqRipples] = useState<{ id: number; x: number; y: number; row: number }[]>([]);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [atBottom, setAtBottom] = useState(false);
  const [founderHover, setFounderHover] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [galleryTooltip, setGalleryTooltip] = useState<{ label: string; sub: string } | null>(null);
  const [galleryCursor, setGalleryCursor] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      setAtBottom(scrolled >= total - 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Testimonials — handled by Framer Motion whileInView

  useEffect(() => {
    if (!document.getElementById("kern-inter")) {
      const link = document.createElement("link");
      link.id = "kern-inter";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
    document.body.style.fontFamily = INTER;
    document.body.style.margin = "0";
  }, []);

  // (scroll observer removed — Framer Motion handles scroll-triggered animations)

  const scrollTo = (id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitTime < 60_000) {
      setSubmitStatus("rate_limited");
      window.setTimeout(() => setSubmitStatus("idle"), 5000);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "d6e60692-5318-4b4d-b5ee-7e9e05fa37d8",
          name: formData.name,
          email: formData.email,
          message: `Company: ${formData.company}\nBudget: ${formData.budget}\n\n${formData.message}`,
          subject: "New Project Inquiry — Kern",
        }),
      });
      const data: { success?: boolean } = await res.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          budget: "",
          message: "",
        });
        setLastSubmitTime(now);
      } else setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const wordImages = useMemo(
    () => ({
      Fast: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2Z2Z3N1OGs5NHNrYXRseTAxd2VsOTVmZWEwMmQ3bnI1dWY1MTFxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d4blalI6x2oc4xAA/giphy.gif",
      Precise: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG9qM3A0bnN1NXVibmk1c3pyeGhocnVwOWhzZHoyeGwwNTI5MmZyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/79YlWzPTgj1tK/giphy.gif",
      Reliable: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDBuZzA2Z2d6cWJlM3Rxbnk0MGNtYndkOWtxd2VmZzhteHFyb2xtMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LeV2f9JHCOsjsFekn9/giphy.gif",
    }),
    []
  );



  const workItems: WorkItem[] = [
    {
      title: "Omniportal",
      period: "2024–2024",
      client: "HGC",
      tools: "React · TypeScript · Tailwind · Supabase · Vite",
      layout: "hero",
      imgs: [omniportalogin],
    },
    {
      title: "Spendzy | Financial Tracking App",
      period: "2023–2024",
      client: "Personal Startup (Discontinued)",
      tools: "Flutter · Supabase",
      layout: "half",
      imgs: [spendzy],
    },
    {
      title: "Kadiz POS",
      period: "2024–2025",
      client: "Kadiz",
      tools: "React · TypeScript · Tailwind · Supabase · Vite",
      layout: "wide",
      imgs: [kadizmockup],
    },
  ];

  const css = `
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    h1,h2,h3,h4,h5,h6{margin:0;font-weight:inherit;font-size:inherit;font-family:${INTER}}
    html{scroll-behavior:smooth}
    :root{
      --bg:#f5f5f5;--white:#fff;--text:#1a1a1a;--muted:rgba(26,26,26,.45);
      --accent:#272B30;--border:rgba(0,0,0,.07);--border-s:rgba(0,0,0,.12);
      --pill:#5E5E5E;
      --rsm:8px;--rmd:11px;--rlg:15px;--rxl:17px;--rf:9999px
    }
    .K{font-family:${INTER};background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;min-height:100vh;font-size:13px}
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      padding:18px 32px 56px;
      display:flex;justify-content:center;
      background:linear-gradient(to bottom, rgba(245,245,245,.95) 0%, rgba(245,245,245,.7) 55%, transparent 100%);
      backdrop-filter:blur(6px);
      -webkit-backdrop-filter:blur(6px);
      mask-image:linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
      -webkit-mask-image:linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
      pointer-events:none;
      border:none;
    }
    .nav-i{pointer-events:all;display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1100px}
    .logo{display:flex;align-items:center;gap:7px;cursor:pointer}
    .logo-box{
      display:flex;align-items:center;justify-content:center;
      flex-shrink:0;
    }
    .logo-box-inner{
      display:flex;align-items:center;justify-content:center;
    }
    .logo-mark{font-size:11px;font-weight:700;color:white;font-family:${INTER}}
    .logo-text{font-size:11px;font-weight:600;color:var(--accent);letter-spacing:.02em;font-family:${INTER}}
    .pill{display:flex;align-items:center;gap:4px;background:var(--pill);border-radius:var(--rf);padding:8px 22px;box-shadow:0 -1px 0 #535353,0 1px 0 #535353,0 10px 18px -5px rgba(0,0,0,.25);border:.7px solid rgba(255,255,255,.15)}
    .plink{font-size:11px;font-weight:300;color:rgba(255,255,255,.65);background:none;border:none;cursor:pointer;font-family:${INTER};transition:color .2s;padding:4px 10px}
    .plink:hover{color:white}
    .psep{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.3);flex-shrink:0;margin:0 2px}
    .cta{display:flex;align-items:center;gap:5px;background:var(--accent);color:white;font-family:${INTER};font-size:11px;font-weight:500;border:none;border-radius:var(--rf);padding:6px 14px;cursor:pointer;transition:all .2s;box-shadow:0 2px 9px rgba(0,0,0,.15)}
    .cta:hover{background:#3a3a3a;transform:translateY(-1px)}
    .ndot{width:6px;height:6px;border-radius:50%;background:#82D49F}
    .ndot-ping{position:absolute;width:6px;height:6px;border-radius:50%;background:#82D49F;opacity:.5;animation:ping 1.5s ease-in-out infinite}
    @keyframes ping{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.8);opacity:0}}

    /* Animated rainbow border for CTA */
    .cta-wrap{position:relative;border-radius:var(--rf);padding:2px;background:linear-gradient(90deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff,#c77dff,#ff6b6b);background-size:300% 300%;animation:rainbowBorder 3s linear infinite}
    @keyframes rainbowBorder{0%{background-position:0% 50%}100%{background-position:300% 50%}}
    .cta-inner{display:flex;align-items:center;gap:5px;background:var(--accent);color:white;font-family:${INTER};font-size:11px;font-weight:500;border:none;border-radius:calc(var(--rf) - 2px);padding:6px 14px;cursor:pointer;transition:all .2s;white-space:nowrap}
    .cta-inner:hover{background:#3a3a3a}

    /* Founder tooltip */
    .founder-tooltip{
      position:fixed;pointer-events:none;z-index:9999;
      width:160px;height:160px;border-radius:16px;overflow:hidden;
      box-shadow:0 16px 48px rgba(0,0,0,.28);
      border:2px solid rgba(255,255,255,.85);
      transition:opacity .2s,transform .2s;
      transform:translate(18px,-80px);
    }
    .founder-tooltip img{width:100%;height:100%;object-fit:cover;display:block}

    /* Gallery cursor tooltip */
    .gallery-cursor-tip{
      position:fixed;pointer-events:none;z-index:9999;
      background:rgba(15,15,15,.92);backdrop-filter:blur(8px);
      border-radius:10px;padding:9px 13px;
      transform:translate(14px,-50%);
      border:1px solid rgba(255,255,255,.1);
      box-shadow:0 8px 28px rgba(0,0,0,.3);
      min-width:120px;
    }
    .gct-label{font-size:11.5px;font-weight:600;color:white;font-family:${INTER};margin-bottom:2px}
    .gct-sub{font-size:9.5px;font-weight:300;color:rgba(255,255,255,.55);font-family:${INTER}}

    .hero{position:relative;padding:150px 32px 70px;display:flex;flex-direction:column;align-items:center;text-align:center;overflow:visible}
    .bottom-fog{
      position:fixed;bottom:0;left:0;right:0;height:120px;
      background:linear-gradient(to top, rgba(245,245,245,.85) 0%, rgba(245,245,245,.4) 50%, transparent 100%);
      backdrop-filter:blur(4px);
      -webkit-backdrop-filter:blur(4px);
      pointer-events:none;
      z-index:100;
      mask-image:linear-gradient(to top, black 0%, black 40%, transparent 100%);
      -webkit-mask-image:linear-gradient(to top, black 0%, black 40%, transparent 100%);
      transition:opacity .4s ease;
    }
    .bottom-fog.hidden{opacity:0}
    .av{display:flex;align-items:center;justify-content:center;font-weight:600;color:white;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.14);transition:transform .2s;font-family:${INTER};border-radius:8px}
    .av:hover{transform:translateY(-3px)}
    .eyebrow{font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);display:block;font-family:${INTER}}
    .htw{display:flex;align-items:center;gap:9px;justify-content:center;flex-wrap:wrap;margin-bottom:3px; position:relative;}
    .ht{font-family:${INTER};font-size:clamp(1.75rem,4vw,3.1rem);font-weight:600;line-height:1.1;color:var(--text);letter-spacing:-.025em}
    .hbadge{position:relative;display:inline-block}
    .himg{width:46px;height:35px;border-radius:8px;overflow:hidden;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;box-shadow:rgba(255,255,255,.25) 0 2px 1.5px inset,rgb(186,176,170) 0 .5px 0;flex-shrink:0}
    .htag{position:absolute;top:-11px;right:0; background:var(--pill); ...}
    .hdesc{font-size:12px;line-height:1.7;color:var(--muted);max-width:380px;margin:11px auto 0;font-weight:300;font-family:${INTER}}
    .hact{display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:18px}
    .bp{display:inline-flex;align-items:center;gap:5px;background:var(--accent);color:white;font-family:${INTER};font-size:11.5px;font-weight:500;border:none;border-radius:var(--rf);padding:7px 18px;cursor:pointer;transition:all .2s;box-shadow:0 3px 10px rgba(0,0,0,.18)}
    .bp:hover{background:#3a3a3a;transform:translateY(-1px)}
    .bg{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);color:var(--text);font-family:${INTER};font-size:11.5px;font-weight:500;border:1px solid var(--border-s);border-radius:var(--rf);padding:7px 18px;cursor:pointer;transition:all .2s}
    .bg:hover{background:rgba(201,201,201,.28)}
    .bdot{width:5px;height:5px;border-radius:50%;background:#82D49F;flex-shrink:0}

    .mq{overflow:hidden;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:white}
    .mq-outer{display:flex;width:max-content}
    .mq-track{display:flex;animation:mqs 30s linear infinite;flex-shrink:0}
    .mq-track:hover{animation-play-state:paused}
    @keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
    .mq-item{display:flex;align-items:center;gap:9px;padding:0 20px;white-space:nowrap;font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .mq-dot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}

    .S{padding:52px 32px;position:relative;z-index:1}
    .I{max-width:860px;margin:0 auto}
    .stitle{font-family:${INTER};font-size:clamp(1.35rem,2.6vw,2rem);font-weight:600;letter-spacing:-.025em;line-height:1.15;color:var(--text)}
    .ssub{font-size:12px;color:var(--muted);line-height:1.75;font-weight:300;max-width:280px;font-family:${INTER}}
    .shead{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:26px;gap:1.5rem}

    /* STATS */
    .stats-new{
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:10px;
    }
    .stat-card{
      background:white;
      border-radius:16px;
      padding:20px 18px 16px;
      display:flex;
      flex-direction:column;
      gap:10px;
      transition:transform .25s,box-shadow .25s;
      box-shadow:0 1px 8px rgba(0,0,0,.05);
      border:1px solid var(--border);
    }
    .stat-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.09);border-color:rgba(0,0,0,.1)}
    .stat-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
    .stat-num{
      font-family:${INTER};
      font-size:2.2rem;font-weight:800;
      letter-spacing:-.04em;line-height:1;
      color:var(--text);
    }
    .stat-icon{
      width:32px;height:32px;border-radius:9px;
      background:rgba(39,43,48,.06);
      display:flex;align-items:center;justify-content:center;
      flex-shrink:0;
    }
    .stat-label{
      font-size:11px;font-weight:400;
      color:var(--muted);
      font-family:${INTER};
      line-height:1.45;
    }
    .stat-bar-track{height:2px;background:rgba(0,0,0,.06);border-radius:9px;overflow:hidden;margin-top:auto}
    .stat-bar-fill{height:100%;border-radius:9px;background:var(--accent)}

    .badge{display:inline-flex;align-items:center;gap:5px;background:rgba(201,201,201,.15);border-radius:var(--rf);padding:4px 11px;font-size:9.5px;font-weight:400;color:var(--muted);letter-spacing:.02em;border:1px solid var(--border);font-family:${INTER}}
    .bdg-dot{width:5px;height:5px;border-radius:50%;background:#FF9900;flex-shrink:0}
    .pull-quote{font-size:clamp(.95rem,1.9vw,1.3rem);font-weight:400;line-height:1.55;color:var(--muted);letter-spacing:-.01em;font-family:${INTER};max-width:540px}
    .pull-quote strong{color:var(--text);font-weight:600}
    .section-eyebrow-row{display:flex;align-items:center;gap:10px;margin-bottom:13px}
    .eyebrow-line{flex:1;height:1px;background:var(--border)}

    /* PROCESS */
    .proc{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:white;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .pst{padding:18px 15px;border-right:1px solid var(--border);transition:background .2s}
    .pst:last-child{border-right:none}
    .pst:hover{background:rgba(39,43,48,.02)}
    .pbig{font-family:${INTER};font-size:3.4rem;font-weight:800;color:rgba(0,0,0,.04);letter-spacing:-.04em;line-height:1;margin-bottom:10px}
    .plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.6;margin-bottom:3px;font-family:${INTER}}
    .pttl{font-family:${INTER};font-size:.78rem;font-weight:600;color:var(--text);margin-bottom:5px;line-height:1.3}
    .pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}

    /* ── WORK GRID ── */
    .work2-grid{display:flex;flex-direction:column;gap:32px}
    .work2-row-duo{display:grid;grid-template-columns:1fr 1fr;gap:20px}

    /* Item: card + meta stacked */
    .work2-item{display:flex;flex-direction:column;gap:16px}

    /* Card — image only */
    .work2-card{
      background:#e8e8e8;
      border-radius:20px;
      overflow:hidden;
      transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;
      box-shadow:0 4px 20px rgba(0,0,0,.08);
    }
    .work2-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.14)}

    /* Media — always fills card */
    .work2-media{
      position:relative;
      overflow:hidden;
      width:100%;
    }
    .work2-card--hero .work2-media{ height:500px; }
    .work2-card--half .work2-media{ height:400px; }
    .work2-card--wide .work2-media{ height:420px; }

    /* Images — cover the full card */
    .work2-img{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
      border-radius:0;
      box-shadow:none;
    }

    /* ── Meta row — OUTSIDE the card ── */
    .work2-meta{
      display:grid;
      grid-template-columns:1.4fr 1fr 1.8fr;
      align-items:start;
      padding:0 4px;
    }
    .work2-mcol{
      display:flex;flex-direction:column;gap:3px;
      padding:0 20px;
    }
    .work2-mcol:first-child{padding-left:2px}
    .work2-mcol:last-child{padding-right:2px}
    .work2-mcol+.work2-mcol{border-left:none}
    .work2-mlabel{
      font-size:8px;font-weight:500;letter-spacing:.08em;
      text-transform:uppercase;color:rgba(26,26,26,.35);
      font-family:${INTER};margin-bottom:1px;
    }
    .work2-mvalue{
      font-size:11px;font-weight:500;color:var(--text);
      font-family:${INTER};line-height:1.3;
    }
    .work2-mmuted{
      font-size:9.5px;color:var(--muted);
      font-family:${INTER};font-weight:300;
    }

    /* Overlapping circle avatars */
    .work2-avatars{display:flex;align-items:center;margin-top:3px}
    .work2-av{
      width:26px;height:26px;border-radius:50%;
      border:2.5px solid var(--bg);
      display:flex;align-items:center;justify-content:center;
      font-size:7px;font-weight:700;color:white;
      font-family:${INTER};
      margin-left:-9px;flex-shrink:0;
      box-shadow:0 1px 4px rgba(0,0,0,.15);
    }
    .work2-av:first-child{margin-left:0}

    @media(max-width:820px){
      .work2-row-duo{grid-template-columns:1fr}
      .work2-card--hero .work2-media{ height:380px; }
      .work2-meta{grid-template-columns:1fr 1fr;gap:14px 0}
    }
    @media(max-width:560px){
      .work2-card--hero .work2-media{ height:260px; }
      .work2-card--half .work2-media{ height:300px; }
      .work2-card--wide .work2-media{ height:260px; }
      .work2-meta{grid-template-columns:1fr 1fr}
      .work2-mcol{padding:0 12px}
      .work2-mcol:first-child{padding-left:2px}
    }

    /* SERVICES */
    .svg2{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:white;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .svc{padding:18px 16px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);transition:background .25s;position:relative}
    .svc:nth-child(3n){border-right:none}
    .svc:nth-child(4),.svc:nth-child(5),.svc:nth-child(6){border-bottom:none}
    .svc:hover{background:rgba(39,43,48,.02)}
    .svc-n{position:absolute;top:14px;right:14px;font-size:8.5px;font-weight:500;letter-spacing:.14em;color:rgba(26,26,26,.18);font-family:${INTER}}
    .svc-ic{margin-bottom:12px;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;background:rgba(39,43,48,.06)}
    .svc-ic-01,.svc-ic-02,.svc-ic-03,.svc-ic-04,.svc-ic-05,.svc-ic-06{}
    .svc-t{font-family:${INTER};font-size:.8rem;font-weight:600;color:var(--text);margin-bottom:5px;line-height:1.3}
    .svc-d{font-size:11px;color:var(--muted);line-height:1.7;font-weight:300;font-family:${INTER}}

    /* QUALITY */
    .QS{padding:52px 32px;text-align:center}
    .qhl{font-family:${INTER};font-size:clamp(1.4rem,2.7vw,2.2rem);font-weight:600;letter-spacing:-.025em;line-height:1.15;color:var(--text);max-width:440px;margin:0 auto 11px}
    .qww{position:relative;display:inline-block}
    .qw{color:var(--muted);cursor:pointer;transition:color .2s;font-family:${INTER}}
    .qw:hover{color:var(--text)}
    .qhi{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) scale(.88);width:200px;height:150px;border-radius:12px;overflow:hidden;pointer-events:none;opacity:0;transition:all .28s cubic-bezier(.34,1.56,.64,1);box-shadow:0 12px 40px rgba(0,0,0,.25);z-index:100;border:2.5px solid white}
    .qhi.vis{opacity:1;transform:translateX(-50%) scale(1)}
    .qhi img{width:100%;height:100%;object-fit:cover}
    .qdesc{font-size:12px;color:var(--muted);line-height:1.75;font-weight:300;max-width:380px;margin:0 auto 26px;font-family:${INTER}}
    .qcards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:760px;margin:0 auto;text-align:left}
    .qc{background:white;border:1px solid var(--border);border-radius:var(--rmd);padding:14px;transition:all .25s;box-shadow:0 1px 4px rgba(0,0,0,.03)}
    .qc:hover{box-shadow:0 5px 16px rgba(0,0,0,.07);border-color:rgba(0,0,0,.13)}
    .qci{
      margin-bottom:12px;
      width:40px;height:40px;border-radius:11px;
      display:flex;align-items:center;justify-content:center;
    }
    .qc:nth-child(1) .qci{background:rgba(251,146,60,.15)}
    .qc:nth-child(2) .qci{background:rgba(99,102,241,.12)}
    .qc:nth-child(3) .qci{background:rgba(20,184,166,.12)}
    .qc:nth-child(4) .qci{background:rgba(239,68,68,.12)}
    .qc:nth-child(5) .qci{background:rgba(168,85,247,.12)}
    .qc:nth-child(6) .qci{background:rgba(34,197,94,.12)}
    .qct{font-family:${INTER};font-size:.78rem;font-weight:600;color:var(--text);margin-bottom:3px}
    .qcd{font-size:10.5px;color:var(--muted);line-height:1.6;font-weight:300;font-family:${INTER}}

    /* WHY KERN */
    .pcard{background:white;border:1px solid var(--border);border-radius:var(--rxl);padding:18px 20px;max-width:420px;margin:0 auto;box-shadow:0 5px 16px rgba(220,220,220,.4)}
    .pi{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--rsm);margin-bottom:6px}
    .pbar{width:3px;height:26px;border-radius:9px;flex-shrink:0}
    .pn{font-size:11.5px;font-weight:500;font-family:${INTER}}
    .ps{font-size:10px;opacity:.4;margin-top:1px;font-family:${INTER}}
    .pbest{display:inline-flex;align-items:center;gap:4px;background:white;border-radius:var(--rf);padding:3px 8px;font-size:9.5px;font-weight:500;color:#22c55e;box-shadow:0 2px 5px rgba(0,0,0,.08);font-family:${INTER}}
    .pdash{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--rsm);margin-bottom:6px;opacity:.45;border:1.5px dashed rgba(0,0,0,.12)}

    /* FAQ */
    .faq{border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;background:white;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .fi{border-bottom:1px solid var(--border);position:relative;overflow:hidden}
    .fi:last-child{border-bottom:none}
    .faq-ripple{position:absolute;border-radius:50%;background:rgba(39,43,48,.07);transform:scale(0);animation:faq-ripple-anim .65s cubic-bezier(.22,1,.36,1) forwards;pointer-events:none;z-index:0}
    @keyframes faq-ripple-anim{0%{transform:scale(0);opacity:1}100%{transform:scale(4);opacity:0}}
    .fb{width:100%;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:13px 18px;background:transparent;border:none;cursor:pointer;text-align:left;font-family:${INTER};transition:background .2s;position:relative;z-index:1}
    .fb:hover{background:rgba(39,43,48,.02)}
    .fq{font-family:${INTER};font-size:.8rem;font-weight:500;color:var(--text);line-height:1.4}
    .ficon{width:22px;height:22px;border-radius:50%;flex-shrink:0;border:1px solid var(--border-s);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:13px;transition:all .3s;transform-origin:center}
    .ficon.open{background:var(--accent);border-color:var(--accent);color:white;transform:rotate(45deg)}
    .fbody{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.4,0,.2,1);position:relative;z-index:1}
    .fbody.open{grid-template-rows:1fr}
    .fbi{overflow:hidden}
    .fa{padding:0 18px 13px;font-size:11.5px;color:var(--muted);line-height:1.78;font-weight:300;max-width:520px;font-family:${INTER}}

    /* CONTACT */
    .contact-wrap{max-width:590px;margin:0 auto}
    .contact-card{background:white;border:1px solid var(--border);border-radius:var(--rxl);overflow:hidden;box-shadow:0 7px 26px rgba(0,0,0,.06)}
    .contact-header{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
    .contact-header-left{display:flex;flex-direction:column;gap:3px}
    .contact-header-title{font-size:.85rem;font-weight:600;color:var(--text);font-family:${INTER}}
    .contact-header-sub{font-size:10.5px;color:var(--muted);font-weight:300;font-family:${INTER}}
    .contact-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.2);border-radius:var(--rf);padding:4px 9px;font-size:10px;font-weight:500;color:#16a34a;font-family:${INTER}}
    .contact-body{padding:20px 24px}
    .cf-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
    .cf-field{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
    .cf-label{font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);font-family:${INTER}}
    .cf-input,.cf-textarea,.cf-select{width:100%;padding:7px 11px;background:rgba(94,94,94,.04);border:1px solid var(--border);border-radius:var(--rmd);color:var(--text);font-family:${INTER};font-size:11.5px;font-weight:300;outline:none;transition:border-color .2s,background .2s;appearance:none}
    .cf-textarea{resize:vertical;min-height:84px}
    .cf-input::placeholder,.cf-textarea::placeholder{color:var(--muted);opacity:.5}
    .cf-input:focus,.cf-textarea:focus,.cf-select:focus{border-color:rgba(39,43,48,.3);background:rgba(39,43,48,.02)}
    .cf-select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px;cursor:pointer}
    .cf-checks{display:flex;flex-direction:column;gap:4px}
    .cf-check-label{display:flex;align-items:center;gap:7px;cursor:pointer;padding:7px 9px;border-radius:var(--rsm);border:1px solid var(--border);transition:background .15s,border-color .15s;font-size:11.5px;color:var(--text);font-family:${INTER}}
    .cf-check-label:hover{background:rgba(39,43,48,.02);border-color:rgba(39,43,48,.15)}
    .cf-check-label input{accent-color:var(--accent);width:12px;height:12px;flex-shrink:0}
    .contact-footer{padding:14px 24px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,.015);flex-wrap:wrap;gap:8px}
    .cf-note{font-size:10px;color:var(--muted);font-family:${INTER}}
    .cf-emaillink{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--muted);text-decoration:none;transition:color .2s;font-family:${INTER};margin-top:9px}
    .cf-emaillink:hover{color:var(--accent)}
    .fok{padding:6px 10px;border-radius:var(--rsm);background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.2);font-size:10.5px;color:#16a34a;margin-top:8px;font-family:${INTER}}
    .ferr{padding:6px 10px;border-radius:var(--rsm);background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.15);font-size:10.5px;color:#dc2626;margin-top:8px;font-family:${INTER}}
    .fwrn{padding:6px 10px;border-radius:var(--rsm);background:rgba(234,179,8,.06);border:1px solid rgba(234,179,8,.15);font-size:10.5px;color:#ca8a04;margin-top:8px;font-family:${INTER}}

    /* FOOTER */
    .foot{padding:16px 32px;border-top:1px solid var(--border);background:var(--bg);position:relative;z-index:1}
    .fi2{max-width:860px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
    .flinks{display:flex;align-items:center;gap:15px}
    .flink{font-size:11.5px;color:var(--muted);text-decoration:none;transition:color .2s;font-family:${INTER}}
    .flink:hover{color:var(--text)}
    .fcopy{font-size:10px;color:rgba(26,26,26,.35);font-family:${INTER}}

    /* ── GALLERY ── */
    .gallery-section{
      padding:52px 32px;
      background:var(--bg);
      border-top:1px solid var(--border);
      border-bottom:1px solid var(--border);
    }
    .gallery-inner{max-width:860px;margin:0 auto}
    .gallery-shead{text-align:center;margin-bottom:22px}
    .gallery-grid{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:10px;
    }
    .gallery-item{
      position:relative;
      border-radius:16px;
      overflow:hidden;
      cursor:pointer;
      aspect-ratio:16/10;
      background:#e8e8e8;
      box-shadow:0 2px 12px rgba(0,0,0,.07);
    }
    .gallery-img{
      width:100%;height:100%;
      object-fit:cover;
      display:block;
      transition:transform .5s cubic-bezier(.22,1,.36,1);
    }
    .gallery-item:hover .gallery-img{transform:scale(1.04)}
    .gallery-overlay{
      position:absolute;inset:0;
      background:linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,.1) 50%, transparent 100%);
      opacity:0;
      transition:opacity .3s ease;
      display:flex;align-items:flex-end;
      padding:18px;
    }
    .gallery-item:hover .gallery-overlay{opacity:1}
    .gallery-overlay-inner{display:flex;align-items:center;justify-content:space-between;width:100%}
    .gallery-label{
      font-size:12px;font-weight:600;color:white;font-family:${INTER};
      display:flex;align-items:center;gap:8px;
    }
    .gallery-label-dot{width:5px;height:5px;border-radius:50%;background:#82D49F;flex-shrink:0}
    .gallery-btn{
      display:inline-flex;align-items:center;gap:5px;
      background:white;color:var(--accent);
      font-family:${INTER};font-size:10px;font-weight:600;
      border:none;border-radius:999px;padding:6px 12px;cursor:pointer;
      transition:transform .2s,box-shadow .2s;
      white-space:nowrap;
    }
    .gallery-btn:hover{transform:scale(1.04);box-shadow:0 4px 14px rgba(0,0,0,.18)}
    @media(max-width:640px){
      .gallery-grid{grid-template-columns:1fr 1fr}
    }
    @media(max-width:420px){
      .gallery-grid{grid-template-columns:1fr}
    }

    @media(max-width:820px){
      .pill{display:none}
      .stats-new{grid-template-columns:1fr 1fr}.work-grid{grid-template-columns:1fr 1fr}
      .svg2{grid-template-columns:1fr 1fr}
      .svc:nth-child(2n){border-right:none}
      .proc{grid-template-columns:1fr 1fr}
      .qcards{grid-template-columns:1fr 1fr}
      .cf-row{grid-template-columns:1fr}
      .I>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
    }
    @media(max-width:560px){
      .hero{padding:110px 16px 56px}
      .S,.QS{padding:38px 16px}
      .foot{padding:14px 16px}
      .work-grid,.svg2{grid-template-columns:1fr}
      .svc{border-right:none!important}
      .proc{grid-template-columns:1fr}
      .pst{border-right:none!important;border-bottom:1px solid var(--border)}
      .pst:last-child{border-bottom:none}
      .qcards{grid-template-columns:1fr 1fr}.stats-new{grid-template-columns:1fr 1fr}
      .fi2{flex-direction:column;text-align:center}
      .shead{flex-direction:column;align-items:flex-start}
      .ht{font-size:1.65rem}
      .contact-header,.contact-body,.contact-footer{padding:14px 16px}
    }
  `;

  return (
    <div className="K" style={{ fontFamily: INTER }}>
      <style>{css}</style>

      {/* Bottom scroll fog overlay */}
      <div className={`bottom-fog${atBottom ? " hidden" : ""}`} />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-i">
          <div className="logo" onClick={() => scrollTo("hero")}>
            <div className="logo-box">
              <div className="logo-box-inner">
                <img src="/kernlogoblack.png" alt="Kern" style={{ width: 28, height: 28, objectFit: "contain", display: "block" }} />
              </div>
            </div>
            <span className="logo-text">Kern</span>
          </div>

          <div className="pill">
            {(
              [
                ["hero", "Home"],
                ["services", "Services"],
                ["work", "Projects"],
                ["faq", "FAQ"],
                ["contact", "Contact"],
              ] as const
            ).map(([id, label], i, arr) => (
              <React.Fragment key={id}>
                <button className="plink" onClick={() => scrollTo(id)}>
                  {label}
                </button>
                {i < arr.length - 1 && <span className="psep" />}
              </React.Fragment>
            ))}
          </div>

          <div className="cta-wrap" onClick={() => scrollTo("contact")}>
            <button className="cta-inner">
              <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
                <span className="ndot-ping" style={{ position: "absolute" }} />
                <span className="ndot" style={{ position: "relative" }} />
              </span>
              Open for work
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <svg style={{ position: "absolute", left: 0, top: 72, pointerEvents: "none", opacity: 0.5 }} width="400" height="70" viewBox="0 0 536 89" fill="none">
          <path d="M-29 1h353.5L412 88.5h123.5" stroke="url(#tl)" />
          <defs>
            <linearGradient id="tl" x1="122" y1="44.75" x2="535.5" y2="44.75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#666" stopOpacity="0" />
              <stop offset="1" stopColor="#666" stopOpacity=".12" />
            </linearGradient>
          </defs>
        </svg>
        <svg style={{ position: "absolute", right: 0, top: 72, pointerEvents: "none", opacity: 0.5 }} width="400" height="70" viewBox="0 0 536 89" fill="none">
          <path d="M565 1H211.5L124 88.5H0.5" stroke="url(#tr)" />
          <defs>
            <linearGradient id="tr" x1="414" y1="44.75" x2="0.5" y2="44.75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#666" stopOpacity="0" />
              <stop offset="1" stopColor="#666" stopOpacity=".12" />
            </linearGradient>
          </defs>
        </svg>

        <motion.span className="eyebrow" style={{ marginBottom: 9 }} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}>
          Founder
        </motion.span>
        <motion.div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }} initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.18, ease:[0.22,1,0.36,1] }}>
          <img
            src={kernfounder}
            alt="Founder"
            style={{ width: 44, height: 44, borderRadius: "10px", objectFit: "cover", boxShadow: "0 2px 10px rgba(0,0,0,.15)", border: "2px solid rgba(255,255,255,.8)", cursor: "pointer" }}
            onMouseEnter={() => setFounderHover(true)}
            onMouseLeave={() => setFounderHover(false)}
            onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
          />
        </motion.div>

        <motion.div style={{ marginBottom: 3 }} initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.28, ease:[0.22,1,0.36,1] }}>
          <div className="htw">
            <h3 className="ht">We build software</h3>
            </div>

          <h3 className="ht">that actually works.</h3>
        </motion.div>

        <motion.p className="hdesc" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.38, ease:[0.22,1,0.36,1] }}>
          At Kern, we don't just build software — we craft systems that power your business. Internal tools, portals, web apps, and more.
        </motion.p>

        <motion.div className="hact" initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.48, ease:[0.22,1,0.36,1] }}>
          <button className="bp" onClick={() => scrollTo("contact")}>
            <span className="bdot" />
            Get a project quote
          </button>
          <button className="bg" onClick={() => scrollTo("work")}>
            We've shipped +50 systems
          </button>
        </motion.div>
      </section>


      {/* GALLERY */}
      <section className="gallery-section">
        <div className="gallery-inner">
          <motion.div
            className="gallery-shead"
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.5 }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          >
            <span className="eyebrow">We crafted these masterpieces</span>
          </motion.div>

          <motion.div
            className="gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once:true, amount:0.1 }}
            variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }}
          >
            {[
              { img: kadizmockup,    label: "Kadiz POS",    sub: "React · TypeScript · Supabase", route: "/projects/kadiz" },
              { img: omniportalogin, label: "Omniportal",   sub: "React · Tailwind · Supabase",   route: "/projects/Omniportal" },
              { img: spendzy,        label: "Spendzy",      sub: "Flutter · Supabase",             route: "/projects/Spendzy" },
            ].map(({ img, label, sub, route }) => (
              <motion.div
                key={label}
                className="gallery-item"
                variants={{
                  hidden:{ opacity:0, scale:0.96 },
                  visible:{ opacity:1, scale:1, transition:{ duration:0.6, ease:[0.22,1,0.36,1] } },
                }}
                onClick={() => navigate(route)}
                onMouseEnter={() => setGalleryTooltip({ label, sub })}
                onMouseLeave={() => setGalleryTooltip(null)}
                onMouseMove={(e) => setGalleryCursor({ x: e.clientX, y: e.clientY })}
              >
                <img src={img} alt={label} className="gallery-img" loading="lazy" />

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="S" style={{ background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="I">
          <motion.div className="shead" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.4 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>
                How can we bring your vision to life?
              </span>
              <h2 className="stitle">
                We're precise and reliable
                <br />
                because we never cut corners.
              </h2>
            </div>
            <p className="ssub">Our engineers and designers build with clarity and craft — from first conversation to final deployment.</p>
          </motion.div>

          <motion.div className="proc" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }}>
            {[
              { n: "01", label: "Step 01", title: "Understand the business", desc: "We learn how your team works and where software fits — deeply, not superficially." },
              { n: "02", label: "Step 02", title: "Define the system", desc: "Clear scope and architecture before a single line of code. No surprises." },
              { n: "03", label: "Step 03", title: "Build & iterate", desc: "Development with weekly reviews and real feedback loops. You see progress every step." },
              { n: "04", label: "Step 04", title: "Launch & support", desc: "Deployment, full handoff, and optional ongoing retainer. We don't disappear." },
            ].map(({ n, label, title, desc }) => (
              <motion.div key={n} className="pst" variants={{ hidden:{ opacity:0, y:18 }, visible:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.22,1,0.36,1] } } }}>
                <div className="pbig" >{n}</div>
                <div className="plbl">{label}</div>
                <div className="pttl">{title}</div>
                <div className="pdsc">{desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div style={{ display: "flex", justifyContent: "center", marginTop: 22 }} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}>
            <button className="bp" onClick={() => scrollTo("contact")}>
              <span className="bdot" />
              Let's work
            </button>
          </motion.div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="S">
        <div className="I">
          <motion.div className="shead" style={{ marginBottom: 22 }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.5 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>
                Our latest Masterpieces
              </span>
              <h2 className="stitle">Big work. Clean presentation.</h2>
            </div>
            <p className="ssub">
              Discover the magic we’ve crafted lately — where creativity meets impact.
            </p>
          </motion.div>

          <motion.div className="work2-grid" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.05 }} variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.15 } } }}>
            {/* Row 1: hero — full width */}
            {workItems.filter((w) => w.layout === "hero").map((w) => (
              <motion.div key={w.title} className="work2-item" variants={{ hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }}>
                <div className="work2-card work2-card--hero">
                  <div className="work2-media">
                    {w.imgs.map((src, i) => (
                      <img key={i} src={src} alt={w.title} className="work2-img" loading="lazy" />
                    ))}
                  </div>
                </div>
              <div className="work2-meta">
                <div className="work2-mcol">
                  <div className="work2-mlabel">Project</div>
                  <div className="work2-mvalue">{w.title}</div>
                  <div className="work2-mmuted">{w.period}</div>
                </div>
                <div className="work2-mcol">
                  <div className="work2-mlabel">Client</div>
                  <div className="work2-mvalue">{w.client}</div>
                </div>
                <div className="work2-mcol">
                  <div className="work2-mlabel">Tools</div>
                  <div className="work2-mvalue">{w.tools}</div>
                </div>
              </div>
              </motion.div>
            ))}

            {/* Row 2: half cards */}
            {workItems.filter((w) => w.layout === "half").map((w) => (
              <motion.div key={w.title} className="work2-item" variants={{ hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }}>
                <div className="work2-card work2-card--half">
                  <div className="work2-media">
                    {w.imgs.map((src, i) => (
                      <img key={i} src={src} alt={w.title} className="work2-img" loading="lazy" />
                    ))}
                  </div>
                </div>
              <div className="work2-meta">
                <div className="work2-mcol">
                  <div className="work2-mlabel">Project</div>
                  <div className="work2-mvalue">{w.title}</div>
                  <div className="work2-mmuted">{w.period}</div>
                </div>
                <div className="work2-mcol">
                  <div className="work2-mlabel">Client</div>
                  <div className="work2-mvalue">{w.client}</div>
                </div>
                <div className="work2-mcol">
                  <div className="work2-mlabel">Tools</div>
                  <div className="work2-mvalue">{w.tools}</div>
                </div>
              </div>
              </motion.div>
            ))}

            {/* Row 3: wide — full width */}
            {workItems.filter((w) => w.layout === "wide").map((w) => (
              <motion.div key={w.title} className="work2-item" variants={{ hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }}>
                <div className="work2-card work2-card--wide">
                  <div className="work2-media">
                    {w.imgs.map((src, i) => (
                      <img key={i} src={src} alt={w.title} className="work2-img" loading="lazy" />
                    ))}
                  </div>
                </div>
              <div className="work2-meta">
                <div className="work2-mcol">
                  <div className="work2-mlabel">Project</div>
                  <div className="work2-mvalue">{w.title}</div>
                  <div className="work2-mmuted">{w.period}</div>
                </div>
                <div className="work2-mcol">
                  <div className="work2-mlabel">Client</div>
                  <div className="work2-mvalue">{w.client}</div>
                </div>
                <div className="work2-mcol">
                  <div className="work2-mlabel">Tools</div>
                  <div className="work2-mvalue">{w.tools}</div>
                </div>
              </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div style={{ display: "flex", justifyContent: "center", marginTop: 36 }} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}>
            <button className="bp" onClick={() => scrollTo("contact")}>
              <span className="bdot" />
              I want a System like this!
            </button>
          </motion.div>
        </div>
      </section>

      {/* QUALITY */}
      <div style={{ background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <section className="QS">
          <button className="bg" style={{ marginBottom: 14, fontSize: 10.5 }}>
            Quality
          </button>

          <h2 className="qhl">
            We work hard to make everything{" "}
            {(["Fast", "Precise", "Reliable"] as const).map((word, i) => (
              <span key={word} className="qww" onMouseEnter={() => setHoveredWord(word)} onMouseLeave={() => setHoveredWord(null)}>
                <span className="qw">
                  {word}
                  {i < 2 ? "," : "!"}{" "}
                </span>
                <div className={`qhi${hoveredWord === word ? " vis" : ""}`}>
                  <img
                    src={wordImages[word]}
                    alt={word}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </span>
            ))}
          </h2>

          <p className="qdesc">
            We build with the cleanest architecture, the fastest solutions, and the best developer experience — because mediocre is not a deliverable.
          </p>

          <div className="qcards">
            {[
              {
                shape: (
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <polygon points="14,2 26,26 2,26" fill="#f97316" opacity=".7" />
                    <polygon points="14,6 22,22 6,22" fill="#fb923c" opacity=".9" />
                  </svg>
                ),
                title: "We Ship Fast",
                desc: "On a tight deadline? We move fast without sacrificing quality.",
              },
              {
                shape: (
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <rect x="3" y="3" width="22" height="22" rx="4" fill="#6366f1" opacity=".5" />
                    <rect x="8" y="8" width="12" height="12" rx="2" fill="#818cf8" opacity=".9" />
                  </svg>
                ),
                title: "Easy to Maintain",
                desc: "Clean, documented code your team can own and extend.",
              },
              {
                shape: (
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="11" fill="#14b8a6" opacity=".4" />
                    <circle cx="14" cy="14" r="6" fill="#2dd4bf" opacity=".7" />
                    <circle cx="14" cy="14" r="2.5" fill="#14b8a6" opacity="1" />
                  </svg>
                ),
                title: "Unlimited Revisions",
                desc: "We won't stop until every detail is exactly right.",
              },
              {
                shape: (
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2 L26 9 L26 19 L14 26 L2 19 L2 9 Z" fill="#ef4444" opacity=".4" />
                    <path d="M14 6 L22 11 L22 17 L14 22 L6 17 L6 11 Z" fill="#f87171" opacity=".8" />
                  </svg>
                ),
                title: "Kern Quality",
                desc: "World-class software on every project — that's our track record.",
              },
              {
                shape: (
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                    <rect x="2" y="10" width="24" height="14" rx="3" fill="#a855f7" opacity=".35" />
                    <rect x="9" y="6" width="10" height="6" rx="2" fill="#c084fc" opacity=".6" />
                    <rect x="6" y="14" width="5" height="5" rx="1" fill="#a855f7" opacity=".9" />
                  </svg>
                ),
                title: "Competitive Pricing",
                desc: "Fair, fixed quotes. Quality that costs double elsewhere.",
              },
              {
                shape: (
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2 C7.4 2 2 7.4 2 14 C2 20.6 7.4 26 14 26" stroke="#22c55e" strokeWidth="2" strokeOpacity=".5" fill="none" />
                    <path
                      d="M14 2 C20.6 2 26 7.4 26 14 C26 20.6 20.6 26 14 26"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeOpacity=".9"
                      fill="none"
                      strokeDasharray="4 2"
                    />
                    <circle cx="14" cy="14" r="3" fill="#22c55e" opacity="1" />
                  </svg>
                ),
                title: "24/7 Support",
                desc: "Retainers keep your software running and improving after launch.",
              },
            ].map(({ shape, title, desc }) => (
              <div key={title} className="qc">
                <div className="qci">{shape}</div>
                <div className="qct">{title}</div>
                <div className="qcd">{desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SERVICES */}
      <section id="services" className="S">
        <div className="I">
          <motion.div className="shead" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.5 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>
                What we build
              </span>
              <h2 className="stitle">
                Tailored solutions for
                <br />
                startups & scale-ups
              </h2>
            </div>
            <p className="ssub">Speed, quality, and clarity — software that gives your team an unfair advantage.</p>
          </motion.div>

          <motion.div className="svg2" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.15 }} variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.07 } } }}>
            {[
              { num: "01", title: "Internal Tools & Dashboards", desc: "Admin panels, operations tools, and reporting systems tailored precisely to how your team works." },
              { num: "02", title: "Customer Portals", desc: "Authentication, roles, subscriptions, and business-specific workflows — built for scale from day one." },
              { num: "03", title: "Web Applications", desc: "Custom web apps built around your business logic — not generic templates or off-the-shelf software." },
              { num: "04", title: "Landing Pages", desc: "High-converting, design-led landing pages and marketing websites — fast, polished, and built to perform." },
              { num: "05", title: "Mobile Applications", desc: "Cross-platform iOS and Android apps with native feel, shared codebase, and faster delivery." },
              { num: "06", title: "Desktop Applications", desc: "Cross-platform desktop apps for Windows, Mac, and Linux — powerful native experiences." },
            ].map(({ num, title, desc }) => (
              <motion.div key={num} className="svc" variants={{ hidden:{ opacity:0, y:16 }, visible:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.22,1,0.36,1] } } }}>
                <span className="svc-n">{num}</span>
                <span className="svc-ic svc-ic-01">
                  {num === "01" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  )}
                  {num === "02" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                  {num === "03" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  )}
                  {num === "04" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  )}
                  {num === "05" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  )}
                  {num === "06" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#272B30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M8 2v2M16 2v2M2 10h20" />
                    </svg>
                  )}
                </span>
                <div className="svc-t">{title}</div>
                <div className="svc-d">{desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 11, maxWidth: 540 }} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
            <div className="section-eyebrow-row">
              <span className="eyebrow">The Kern difference</span>
              <span className="eyebrow-line" />
            </div>
            <p className="pull-quote">
              We don't just write code — we <strong>understand your business</strong> first. Every decision is rooted in what will actually move the needle for your team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY KERN*/}
      <section className="S" style={{ background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="I" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
            <span className="eyebrow" style={{ marginBottom: 7 }}>
              Why Kern
            </span>
            <h2 className="stitle" style={{ marginBottom: 11 }}>
              The perfect engineering
              <br />
              partner, right here.
            </h2>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75, fontWeight: 300, marginBottom: 18, fontFamily: INTER }}>
              Your search for the right development team ends here. We build systems that outlast the project and grow with your business — not tools you'll need to replace in two years.
            </p>
            <button className="bp" onClick={() => scrollTo("contact")}>
              <span className="bdot" />
              Let's work
            </button>
          </motion.div>

          <motion.div className="pcard" initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
              <span style={{ fontFamily: INTER, fontSize: ".85rem", fontWeight: 600 }}>Task List</span>
              <span style={{ fontSize: 10, color: "var(--muted)", background: "rgba(0,0,0,.04)", borderRadius: 99, padding: "2px 7px", fontFamily: INTER }}>
                3 Options
              </span>
            </div>

            <div className="pi" style={{ background: "rgba(191,112,20,0.08)" }}>
              <div className="pbar" style={{ background: "rgb(191,112,20)" }} />
              <div style={{ flex: 1 }}>
                <div className="pn" style={{ color: "rgb(191,112,20)" }}>
                  Kern
                </div>
                <div className="ps" style={{ color: "rgb(191,112,20)" }}>
                  Full custom software studio
                </div>
              </div>
              <div className="pbest">
                <svg viewBox="0 0 9 6" width="8" height="6" stroke="#37C390" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1.38 3.12 3.5 5.25 8 .75" />
                </svg>
                Best choice
              </div>
            </div>

            {[{ name: "Generic Agency", sub: "Template-first approach" }, { name: "Freelancer", sub: "Individual developer" }].map(({ name, sub }) => (
              <div key={name} className="pdash">
                <div style={{ width: 3, height: 26, borderRadius: 9, background: "#ccc", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="pn" style={{ color: "#888" }}>
                    {name}
                  </div>
                  <div className="ps" style={{ color: "#888" }}>
                    {sub}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <button className="bg" style={{ fontSize: 10 }}>
                +2 more options
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="S">
        <div className="I">
          <div className="shead">
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>
                FAQ
              </span>
              <h2 className="stitle">Common questions</h2>
            </div>
            <p className="ssub">Everything you need to know before starting a project with Kern. Still curious? Just reach out.</p>
          </div>

          <motion.div className="faq" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }} variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.08 } } }}>
            {[
              {
                q: "What kind of projects do you take on?",
                a: "Internal tools and business systems are our core specialty — admin panels, dashboards, portals, and custom operations software. We also build landing pages, mobile apps, and desktop applications.",
              },
              { q: "How long does a typical project take?", a: "Most projects ship their first version within 4–8 weeks. A focused internal tool may be ready in 3 weeks, while a full-featured platform typically takes 8–12 weeks." },
              { q: "Do you work with early-stage startups?", a: "Both startups and established businesses. We work with funded startups that need to move fast and with companies replacing legacy systems." },
              { q: "What does the process look like?", a: "We start with a scoping call, define the system architecture, then move into weekly build-and-review cycles. You'll always know what's being built and why." },
              { q: "Do you offer support after launch?", a: "80% of our clients stay on for ongoing support post-launch. We offer monthly retainers for continued development, bug fixes, and feature additions." },
              { q: "How do you handle pricing?", a: "Projects are quoted with a fixed price after scoping — no surprises. Ongoing retainers are billed monthly. We don't do hourly billing." },
            ].map(({ q, a }, i) => (
              <motion.div key={i} className="fi" variants={{ hidden:{ opacity:0, y:10 }, visible:{ opacity:1, y:0, transition:{ duration:0.45, ease:[0.22,1,0.36,1] } } }}>
                {faqRipples.filter(r => r.row === i).map(r => (
                  <span
                    key={r.id}
                    className="faq-ripple"
                    style={{ left: r.x, top: r.y, width: 120, height: 120, marginLeft: -60, marginTop: -60 }}
                    onAnimationEnd={() => setFaqRipples(prev => prev.filter(rr => rr.id !== r.id))}
                  />
                ))}
                <button
                  className="fb"
                  onClick={(e) => {
                    setOpenFaq(openFaq === i ? null : i);
                    const rect = (e.currentTarget.closest('.fi') as HTMLElement)?.getBoundingClientRect();
                    if (rect) {
                      const iconEl = e.currentTarget.querySelector('.ficon') as HTMLElement;
                      const iconRect = iconEl?.getBoundingClientRect();
                      const x = iconRect ? iconRect.left + iconRect.width / 2 - rect.left : e.clientX - rect.left;
                      const y = iconRect ? iconRect.top + iconRect.height / 2 - rect.top : e.clientY - rect.top;
                      setFaqRipples(prev => [...prev, { id: Date.now(), x, y, row: i }]);
                    }
                  }}
                >
                  <span className="fq">{q}</span>
                  <span className={`ficon${openFaq === i ? " open" : ""}`}>+</span>
                </button>
                <div className={`fbody${openFaq === i ? " open" : ""}`}>
                  <div className="fbi">
                    <p className="fa">{a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="S" style={{ background: "white", borderTop: "1px solid var(--border)" }}>
        <div className="I">
          <motion.div style={{ textAlign: "center", marginBottom: 28 }} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.4 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 9 }}>
              <div className="badge">
                <span className="bdg-dot" />
                2 free spots this month
              </div>
            </div>
            <h2 className="stitle" style={{ marginBottom: 7 }}>
              Let's make great software
              <br />
              happen together.
            </h2>
            <p className="ssub" style={{ margin: "0 auto" }}>
              Fill out the form — we'll review your project and get back to you within one business day.
            </p>
          </motion.div>

          <motion.div className="contact-wrap" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.7, delay:0.1, ease:[0.22,1,0.36,1] }}>
            <div className="contact-card">
              <div className="contact-header">
                <div className="contact-header-left">
                  <span className="contact-header-title">New Project Inquiry</span>
                  <span className="contact-header-sub">We'll get back to you within 1 business day</span>
                </div>
                <div className="contact-badge">
                  <span style={{ width: 6, height: 6, borderRadius: "10px", background: "#22c55e", display: "inline-block" }} />
                  Open for work
                </div>
              </div>

              <div className="contact-body">
                <form onSubmit={handleSubmit}>
                  <div className="cf-row">
                    <div className="cf-field">
                      <label className="cf-label">Full Name</label>
                      <input
                        className="cf-input"
                        type="text"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-label">Business Email</label>
                      <input
                        className="cf-input"
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="cf-row">
                    <div className="cf-field">
                      <label className="cf-label">Company</label>
                      <input
                        className="cf-input"
                        type="text"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-label">Estimated Budget</label>
                      <select className="cf-select" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}>
                        <option value="">Select range...</option>
                        <option value="<5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 – $15,000</option>
                        <option value="15k-50k">$15,000 – $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label className="cf-label" style={{ display: "block", marginBottom: 6 }}>
                      What do you need help with?
                    </label>
                    <div className="cf-checks">
                      {["Internal Tools & Dashboard", "Web Application", "Mobile App", "Landing Page / Website", "Desktop Application", "Something else"].map((opt) => (
                        <label key={opt} className="cf-check-label">
                          <input type="checkbox" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="cf-field" style={{ marginBottom: 0 }}>
                    <label className="cf-label">Tell us about your project</label>
                    <textarea
                      className="cf-input cf-textarea"
                      rows={4}
                      placeholder="Describe your idea, system, or project. The more detail, the better."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {submitStatus === "success" && <div className="fok">✓ Message received. We'll be in touch shortly.</div>}
                  {submitStatus === "error" && <div className="ferr">Something went wrong. Please try again or email us directly.</div>}
                  {submitStatus === "rate_limited" && <div className="fwrn">Please wait a minute before sending another message.</div>}

                  <div className="contact-footer" style={{ marginLeft: "-24px", marginRight: "-24px", marginBottom: "-20px", marginTop: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <span className="cf-note">By submitting, you agree to our privacy policy.</span>
                      <a href="mailto:hello@kern.it.com" className="cf-emaillink">
                        <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" fill="none" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        hello@kern.it.com
                      </a>
                    </div>

                    <button type="submit" className="bp" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                      <span className="bdot" />
                      {isSubmitting ? "Sending..." : submitStatus === "success" ? "Sent ✓" : "Send message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>


          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="fi2">
          <div className="flinks">
            {(
              [
                ["work", "Our work"],
                ["services", "Services"],
                ["contact", "Contact Us"],
              ] as const
            ).map(([id, label]) => (
              <a
                key={label}
                href="#"
                className="flink"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="logo" onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
            <div className="logo-box">
              <div className="logo-box-inner">
                <img src="/kernlogoblack.png" alt="Kern" style={{ width: 28, height: 28, objectFit: "contain", display: "block" }} />
              </div>
            </div>
            <span className="logo-text">Kern</span>
          </div>

          <div className="fcopy">
            <span style={{ color: "var(--text)" }}>Kern</span> is a registered trademark © All rights reserved {new Date().getFullYear()}
          </div>
        </div>
      </footer>
      {/* Founder hover tooltip */}
      {founderHover && (
        <div
          className="founder-tooltip"
          style={{ left: cursorPos.x, top: cursorPos.y, opacity: founderHover ? 1 : 0 }}
        >
          <img src={kernfounder} alt="Founder" />
        </div>
      )}

      {/* Gallery cursor tooltip */}
      {galleryTooltip && (
        <div
          className="gallery-cursor-tip"
          style={{ left: galleryCursor.x, top: galleryCursor.y }}
        >
          <div className="gct-label">{galleryTooltip.label}</div>
          <div className="gct-sub">{galleryTooltip.sub}</div>
        </div>
      )}
    </div>
  );
};

export default KernSite;