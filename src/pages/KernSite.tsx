// KernSite.tsx
// Single-file TSX using the provided v8 design (Inter only)

import React, { useEffect, useMemo, useState } from "react";
import FloatingLines from "@/components/FloatingLines";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import kadizmockup from "@/assets/kadizmockup.webp";
import kernfounder from "@/assets/kernfounder.webp";
import omniportalogin from "@/assets/omniportallogin.webp";
import spendzy from "@/assets/spendzy.webp";


const INTER =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

type SubmitStatus = "idle" | "success" | "error" | "rate_limited";

const FloatingLinesBg = React.memo(() => (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    zIndex: 0, pointerEvents: "none", overflow: "hidden",
    opacity: 0.35, mixBlendMode: "screen" as const,
  }}>
    <FloatingLines
      linesGradient={["#b30000", "#f53232", "#ffffff"]}
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
  const [budgetOpen, setBudgetOpen] = useState(false);

  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const navigate = useNavigate();
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
    document.body.style.background = "#000";
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

  const css = `
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    h1,h2,h3,h4,h5,h6{margin:0;font-weight:inherit;font-size:inherit;font-family:${INTER}}
    html{scroll-behavior:smooth;overflow-x:hidden;width:100%}
    body{overflow-x:hidden;width:100%;position:relative}
    :root{
      --bg:#000000;--white:#000000;--text:#f0f0ee;--muted:rgba(232,232,230,.72);
      --accent:#f04444;--border:rgba(232,232,230,.08);--border-s:rgba(232,232,230,.14);
      --pill:#1a1d22;
      --rsm:8px;--rmd:11px;--rlg:15px;--rxl:17px;--rf:9999px
    }
    .K{font-family:${INTER};background:transparent;color:var(--text);-webkit-font-smoothing:antialiased;min-height:100vh;font-size:13px;overflow-x:hidden;width:100%}
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      padding:18px 32px;
      display:flex;justify-content:center;
      background:transparent;
      pointer-events:none;
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
    .logo-text{font-size:11px;font-weight:600;color:var(--text);letter-spacing:.02em;font-family:${INTER}}
    .pill{display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:var(--rf);padding:8px 22px;box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 8px 24px rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.12)}
    .plink{font-size:11px;font-weight:300;color:rgba(255,255,255,.65);background:none;border:none;cursor:pointer;font-family:${INTER};transition:color .2s;padding:4px 10px}
    .plink:hover{color:white}
    .psep{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.3);flex-shrink:0;margin:0 2px}
    /* ── FREEFORM GRADIENT BUTTONS ── */
    /* Shared gradient for nav buttons only: 4 radial blobs — deep navy, electric blue, sky blue, near-black */
    .cta,.cta-inner{
      --btn-bg:
        radial-gradient(ellipse 80% 60% at 20% 30%, #7a0a0a 0%, transparent 65%),
        radial-gradient(ellipse 60% 80% at 80% 20%, #c01818 0%, transparent 60%),
        radial-gradient(ellipse 70% 50% at 60% 90%, #e8430a 0%, transparent 55%),
        radial-gradient(ellipse 90% 70% at 10% 80%, #1a0505 0%, transparent 70%),
        #1c0606;
      background: var(--btn-bg);
      background-size: 200% 200%;
      animation: btn-shift 6s ease infinite alternate;
    }

    @keyframes btn-shift {
      0%   { background-position: 0% 0% }
      33%  { background-position: 80% 20% }
      66%  { background-position: 30% 90% }
      100% { background-position: 100% 100% }
    }

    /* Nav "Open for work" — most prominent, glows harder */
    .cta{
      display:inline-flex;align-items:center;gap:5px;
      color:#fff;font-family:${INTER};font-size:11px;font-weight:600;
      border:1px solid rgba(220,60,60,.5);border-radius:var(--rf);padding:6px 14px;
      cursor:pointer;position:relative;overflow:hidden;white-space:nowrap;
      box-shadow:0 0 20px rgba(180,30,30,.35),0 1px 0 rgba(255,120,80,.18) inset;
      transition:box-shadow .25s,transform .15s;
    }
    .cta:hover{box-shadow:0 0 36px rgba(200,40,40,.55),0 1px 0 rgba(255,120,80,.22) inset;transform:translateY(-1px)}
    .cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(255,180,100,.12),transparent);pointer-events:none}

    .cta-inner{
      display:inline-flex;align-items:center;gap:6px;
      color:#fff;font-family:${INTER};font-size:11px;font-weight:600;
      border:1px solid rgba(220,60,60,.5);border-radius:var(--rf);padding:7px 16px;
      cursor:pointer;white-space:nowrap;letter-spacing:.01em;
      box-shadow:0 0 20px rgba(180,30,30,.35),0 1px 0 rgba(255,120,80,.18) inset;
      transition:box-shadow .25s,transform .15s;
    }
    .cta-inner:hover{box-shadow:0 0 36px rgba(200,40,40,.55),0 1px 0 rgba(255,120,80,.22) inset;transform:translateY(-1px)}

    /* Uniform section buttons — clean dark pill */
    .bp{
      display:inline-flex;align-items:center;gap:7px;
      background:#111111;
      color:#fff;font-family:${INTER};font-size:11.5px;font-weight:500;
      border:1px solid rgba(255,255,255,.18);
      border-radius:var(--rf);padding:9px 20px;
      cursor:pointer;position:relative;
      letter-spacing:.01em;
      box-shadow:0 1px 0 rgba(255,255,255,.06) inset;
      transition:background .2s,border-color .2s,transform .15s;
    }
    .bp:hover{background:#1c1c1c;border-color:rgba(255,255,255,.3);transform:translateY(-1px)}
    .bp-icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}

    /* ── FLOATING LINES BACKGROUND — handled by FloatingLinesBg memo component ── */
    .K > *:not(.lines-bg){position:relative;z-index:1}

    /* ── NEW MINI ANIMATIONS ── */

    /* Floating hero particles */
    .hero-particle{
      position:absolute;pointer-events:none;border-radius:50%;
      animation:float-particle var(--dur,8s) ease-in-out infinite;
      animation-delay:var(--delay,0s);
      opacity:0;
    }
    @keyframes float-particle{
      0%{transform:translate(0,0) scale(1);opacity:0}
      15%{opacity:var(--op,.25)}
      85%{opacity:var(--op,.25)}
      100%{transform:translate(var(--tx,20px),var(--ty,-60px)) scale(.6);opacity:0}
    }

    /* Logo — animation removed */
    .logo-box-inner img{
      animation:none;
    }

    /* Marquee dots — continuous slow pulse */
    .mq-dot{
      animation:dot-pop 2.4s ease-in-out infinite;
    }
    @keyframes dot-pop{
      0%,100%{transform:scale(1);opacity:1}
      50%{transform:scale(1.8);opacity:.5}
    }

    /* Service card icons — continuous gentle float */
    .svc-ic{
      animation:icon-float 3s ease-in-out infinite;
    }
    .svc:nth-child(2) .svc-ic{animation-delay:.4s}
    .svc:nth-child(3) .svc-ic{animation-delay:.8s}
    .svc:nth-child(4) .svc-ic{animation-delay:1.2s}
    .svc:nth-child(5) .svc-ic{animation-delay:1.6s}
    .svc:nth-child(6) .svc-ic{animation-delay:2s}
    @keyframes icon-float{
      0%,100%{transform:translateY(0)}
      50%{transform:translateY(-4px)}
    }

    /* Process step numbers — continuous shimmer */
    .pbig{
      animation:num-shimmer 3.5s ease-in-out infinite;
    }
    .pst:nth-child(2) .pbig{animation-delay:.5s}
    .pst:nth-child(3) .pbig{animation-delay:1s}
    .pst:nth-child(4) .pbig{animation-delay:1.5s}
    @keyframes num-shimmer{
      0%,100%{color:rgba(232,232,230,.04)}
      50%{color:rgba(232,232,230,.18)}
    }

    /* Work card — shine removed */
    .work2-card{position:relative;overflow:hidden}

    /* Contact form input — glow ring on focus */
    .cf-input:focus,.cf-textarea:focus,.cf-select:focus{
      border-color:rgba(240,68,68,.4);
      background:rgba(240,68,68,.04);
      box-shadow:0 0 0 3px rgba(240,68,68,.08);
    }

    /* Kern pcard bar pulse */
    .pi .pbar{
      animation:bar-pulse 2.4s ease-in-out infinite;
    }
    @keyframes bar-pulse{
      0%,100%{opacity:1}
      50%{opacity:.5}
    }

    /* "Best choice" badge bounce */
    .pbest{
      animation:best-bounce 3s ease-in-out infinite;
    }
    @keyframes best-bounce{
      0%,100%{transform:translateY(0)}
      50%{transform:translateY(-3px)}
    }

    /* Footer links — keep hover underline (intentional interaction) */
    .flink{position:relative}
    .flink::after{content:'';position:absolute;left:0;bottom:-1px;width:0;height:1px;background:var(--text);transition:width .22s ease}
    .flink:hover::after{width:100%}

    /* Nav pill link underline — keep hover (intentional interaction) */
    .plink{position:relative}
    .plink::after{content:'';position:absolute;left:50%;bottom:0px;width:0;height:1.5px;background:rgba(255,255,255,.5);border-radius:9px;transform:translateX(-50%);transition:width .2s ease}
    .plink:hover::after{width:60%}

    /* Gallery item — continuous border glow breathe */
    .gallery-item{
      animation:gallery-breathe 4s ease-in-out infinite;
    }
    .gallery-item:nth-child(2){animation-delay:1.3s}
    .gallery-item:nth-child(3){animation-delay:2.6s}
    @keyframes gallery-breathe{
      0%,100%{box-shadow:0 2px 12px rgba(0,0,0,.3)}
      50%{box-shadow:0 8px 32px rgba(0,0,0,.6)}
    }

    /* Quality cards — continuous gentle float staggered */
    .qc{
      animation:qc-float 3.5s ease-in-out infinite;
    }
    .qc:nth-child(2){animation-delay:.5s}
    .qc:nth-child(3){animation-delay:1s}
    .qc:nth-child(4){animation-delay:1.5s}
    .qc:nth-child(5){animation-delay:2s}
    .qc:nth-child(6){animation-delay:2.5s}
    @keyframes qc-float{
      0%,100%{transform:translateY(0)}
      50%{transform:translateY(-4px)}
    }

    /* Quality card icons — continuous spin-rock */
    .qci{
      animation:qci-rock 4s ease-in-out infinite;
    }
    .qc:nth-child(2) .qci{animation-delay:.6s}
    .qc:nth-child(3) .qci{animation-delay:1.2s}
    .qc:nth-child(4) .qci{animation-delay:1.8s}
    .qc:nth-child(5) .qci{animation-delay:2.4s}
    .qc:nth-child(6) .qci{animation-delay:3s}
    @keyframes qci-rock{
      0%,100%{transform:rotate(0deg) scale(1)}
      25%{transform:rotate(-8deg) scale(1.05)}
      75%{transform:rotate(8deg) scale(1.05)}
    }


    /* Status dot glow pulse */
    .ndot{
      animation:dot-shadow-pulse 2s ease-in-out infinite;
    }
    @keyframes dot-shadow-pulse{
      0%,100%{box-shadow:0 0 0 0 rgba(240,68,68,.0)}
      50%{box-shadow:0 0 6px 3px rgba(240,68,68,.4)}
    }

    /* Founder tooltip */
    .founder-tooltip{
      position:fixed;pointer-events:none;z-index:9999;
      width:160px;border-radius:16px;overflow:hidden;
      box-shadow:0 16px 48px rgba(0,0,0,.6);
      border:1px solid rgba(255,255,255,.1);
      transition:opacity .2s,transform .2s;
      transform:translate(18px,-80px);
      background:#111;
    }
    .founder-tooltip img{width:100%;height:160px;object-fit:cover;display:block}
    .founder-tooltip-name{
      padding:8px 10px 9px;
      text-align:center;
      font-family:${INTER};
      font-size:11px;
      font-weight:600;
      color:#e8e8e6;
      letter-spacing:.01em;
      background:#111;
    }
    .founder-tooltip-role{
      display:block;
      font-size:9.5px;
      font-weight:300;
      color:rgba(232,232,230,.5);
      margin-top:1px;
    }

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
      background:linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.4) 50%, transparent 100%);
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
    .bg{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.05);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:rgba(255,255,255,.65);font-family:${INTER};font-size:11.5px;font-weight:500;border:1px solid rgba(255,255,255,.1);border-radius:var(--rf);padding:9px 22px;cursor:pointer;transition:all .2s}
    .bg:hover{background:rgba(255,255,255,.09);color:rgba(255,255,255,.9);border-color:rgba(255,255,255,.18)}
    .bdot{width:5px;height:5px;border-radius:50%;background:#000;flex-shrink:0}

    .mq{overflow:hidden;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:transparent;width:100%}
    .mq-outer{display:flex;width:max-content;will-change:transform}
    .mq-track{display:flex;animation:mqs 30s linear infinite;flex-shrink:0}
    .mq-track:hover{animation-play-state:paused}
    @keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
    .mq-item{display:flex;align-items:center;gap:9px;padding:0 20px;white-space:nowrap;font-size:9px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-family:${INTER}}
    .mq-dot{width:3px;height:3px;border-radius:50%;background:var(--accent);flex-shrink:0}

    .S{padding:52px 32px;position:relative;z-index:1;overflow-x:hidden}
    .I{max-width:860px;margin:0 auto;width:100%}
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
      background:linear-gradient(145deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,.02) 50%, rgba(255,255,255,.05) 100%);
      border-radius:16px;
      padding:20px 18px 16px;
      display:flex;
      flex-direction:column;
      gap:10px;
      transition:transform .25s,box-shadow .25s;
      box-shadow:0 1px 0 rgba(255,255,255,.08) inset, 0 -1px 0 rgba(0,0,0,.5) inset, 0 8px 32px rgba(0,0,0,.4), 0 2px 8px rgba(0,0,0,.3);
      border:1px solid rgba(255,255,255,.1);
      position:relative;
    }
    .stat-card::before{content:'';position:absolute;inset:0;border-radius:16px;background:linear-gradient(135deg,rgba(255,255,255,.06) 0%,transparent 50%);pointer-events:none}
    .stat-card:hover{transform:translateY(-3px);box-shadow:0 1px 0 rgba(255,255,255,.1) inset, 0 -1px 0 rgba(0,0,0,.6) inset, 0 20px 48px rgba(0,0,0,.55), 0 4px 12px rgba(0,0,0,.4);border-color:rgba(255,255,255,.15)}
    .stat-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
    .stat-num{
      font-family:${INTER};
      font-size:2.2rem;font-weight:800;
      letter-spacing:-.04em;line-height:1;
      color:var(--text);
    }
    .stat-icon{
      width:32px;height:32px;border-radius:9px;
      background:rgba(232,232,230,.07);
      display:flex;align-items:center;justify-content:center;
      flex-shrink:0;
    }
    .stat-label{
      font-size:11px;font-weight:400;
      color:var(--muted);
      font-family:${INTER};
      line-height:1.45;
    }
    .stat-bar-track{height:2px;background:rgba(232,232,230,.08);border-radius:9px;overflow:hidden;margin-top:auto}
    .stat-bar-fill{height:100%;border-radius:9px;background:var(--accent)}

    .badge{display:inline-flex;align-items:center;gap:5px;background:rgba(232,232,230,.07);border-radius:var(--rf);padding:4px 11px;font-size:9.5px;font-weight:400;color:var(--muted);letter-spacing:.02em;border:1px solid var(--border);font-family:${INTER}}
    .bdg-dot{width:5px;height:5px;border-radius:50%;background:#FF9900;flex-shrink:0}
    .pull-quote{font-size:clamp(.95rem,1.9vw,1.3rem);font-weight:400;line-height:1.55;color:var(--muted);letter-spacing:-.01em;font-family:${INTER};max-width:540px}
    .pull-quote strong{color:var(--text);font-weight:600}
    .section-eyebrow-row{display:flex;align-items:center;gap:10px;margin-bottom:13px}
    .eyebrow-line{flex:1;height:1px;background:var(--border)}

    /* PROCESS */
    .proc{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(255,255,255,.1);border-radius:var(--rxl);overflow:hidden;background:linear-gradient(145deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.01) 100%);box-shadow:0 1px 0 rgba(255,255,255,.07) inset,0 8px 32px rgba(0,0,0,.4)}
    .pst{padding:18px 15px;border-right:1px solid rgba(255,255,255,.06);transition:background .2s;position:relative}
    .pst:last-child{border-right:none}
    .pst:hover{background:rgba(255,255,255,.04)}
    .pbig{font-family:${INTER};font-size:3.4rem;font-weight:800;color:rgba(232,232,230,.04);letter-spacing:-.04em;line-height:1;margin-bottom:10px}
    .plbl{font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);opacity:.7;margin-bottom:3px;font-family:${INTER}}
    .pttl{font-family:${INTER};font-size:.78rem;font-weight:600;color:var(--text);margin-bottom:5px;line-height:1.3}
    .pdsc{font-size:10.5px;color:var(--muted);line-height:1.65;font-weight:300;font-family:${INTER}}

    /* ── WORK GRID ── */
    .work2-grid{display:flex;flex-direction:column;gap:32px}
    .work2-row-duo{display:grid;grid-template-columns:1fr 1fr;gap:20px}

    /* Item: card + meta stacked */
    .work2-item{display:flex;flex-direction:column;gap:16px}

    /* Card — image only */
    .work2-card{
      background:#111;
      border-radius:20px;
      overflow:hidden;
      box-shadow:0 4px 20px rgba(0,0,0,.4);
    }

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
      text-transform:uppercase;color:rgba(232,232,230,.3);
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
      border:2.5px solid #000;
      display:flex;align-items:center;justify-content:center;
      font-size:7px;font-weight:700;color:white;
      font-family:${INTER};
      margin-left:-9px;flex-shrink:0;
      box-shadow:0 1px 4px rgba(0,0,0,.3);
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
    .svg2{display:grid;grid-template-columns:repeat(3,1fr);border:none;border-radius:0;overflow:visible;background:transparent;box-shadow:none}
    .svc{padding:22px 20px;border:none;border-bottom:1px solid rgba(255,255,255,.06);transition:background .25s;position:relative}
    .svc:nth-child(3n){border-right:none}
    .svc:nth-child(4),.svc:nth-child(5),.svc:nth-child(6){border-bottom:none}
    .svc:hover{}
    .svc-n{position:absolute;top:18px;right:18px;font-size:8.5px;font-weight:500;letter-spacing:.14em;color:rgba(232,232,230,.15);font-family:${INTER}}
    .svc-ic{margin-bottom:14px;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;background:transparent}
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
    .qc{background:linear-gradient(145deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 50%,rgba(255,255,255,.05) 100%);border:1px solid rgba(255,255,255,.1);border-radius:var(--rmd);padding:14px;transition:all .25s;box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 -1px 0 rgba(0,0,0,.4) inset,0 4px 16px rgba(0,0,0,.3);position:relative;overflow:hidden}
    .qc::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(to bottom,rgba(255,255,255,.05),transparent);pointer-events:none;border-radius:var(--rmd) var(--rmd) 0 0}
    .qc:hover{box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 -1px 0 rgba(0,0,0,.5) inset,0 12px 32px rgba(0,0,0,.45);border-color:rgba(255,255,255,.18);transform:translateY(-2px)}
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
    .why-kern-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
    @media(max-width:820px){.why-kern-grid{grid-template-columns:1fr;gap:2rem}}linear-gradient(145deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 60%,rgba(255,255,255,.06) 100%);border:1px solid rgba(255,255,255,.12);border-radius:var(--rxl);padding:18px 20px;max-width:420px;margin:0 auto;box-shadow:0 1px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.5) inset,0 12px 40px rgba(0,0,0,.45);position:relative;overflow:hidden}
    .pcard::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(to bottom,rgba(255,255,255,.06),transparent);pointer-events:none}
    .pi{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--rsm);margin-bottom:6px}
    .pbar{width:3px;height:26px;border-radius:9px;flex-shrink:0}
    .pn{font-size:11.5px;font-weight:500;font-family:${INTER}}
    .ps{font-size:10px;opacity:.4;margin-top:1px;font-family:${INTER}}
    /* Replace your .pbest rule with this */
    .pbest{
      display:inline-flex;align-items:center;gap:4px;
      background:rgba(240,68,68,.12);
      border-radius:var(--rf);
      padding:3px 8px;
      font-size:9.5px;
      font-weight:600;
      color:#f04444;
      border:1px solid rgba(240,68,68,.35);
      box-shadow:0 2px 5px rgba(0,0,0,.3);
      font-family:${INTER};
    }
    .pdash{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--rsm);margin-bottom:6px;opacity:.45;border:1.5px dashed rgba(232,232,230,.12)}

    /* ── FAQ — chat/messenger style ── */
    .faq-chat{
      display:grid;grid-template-columns:1fr 1fr;gap:0;
      border-radius:var(--rxl);overflow:hidden;
      border:1px solid rgba(255,255,255,.1);
      box-shadow:0 1px 0 rgba(255,255,255,.07) inset,0 12px 40px rgba(0,0,0,.45);
      min-height:400px;
    }

    /* Left panel — question list */
    .faq-ql{
      background:linear-gradient(160deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 100%);
      padding:22px 16px;
      display:flex;flex-direction:column;gap:6px;
      overflow:hidden;
      border-right:1px solid rgba(255,255,255,.07);
    }
    .faq-ql-label{
      font-size:8.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
      color:rgba(255,255,255,.35);font-family:${INTER};
      padding:0 8px;margin-bottom:6px;
    }
    .faq-qbtn{
      width:100%;background:none;border:none;cursor:pointer;
      padding:10px 12px;border-radius:10px;
      text-align:left;font-family:${INTER};
      font-size:11.5px;font-weight:400;color:rgba(255,255,255,.55);
      line-height:1.4;
      transition:background .2s,color .2s,transform .18s;
      position:relative;display:flex;align-items:center;gap:8px;
    }
    .faq-qbtn::before{
      content:'';flex-shrink:0;
      width:4px;height:4px;border-radius:50%;
      background:rgba(255,255,255,.25);
      transition:background .2s,transform .2s;
    }
    .faq-qbtn:hover{
      background:rgba(255,255,255,.07);
      color:rgba(255,255,255,.8);
      transform:translateX(2px);
    }
    .faq-qbtn.faq-active{
      background:rgba(240,68,68,.15);
      color:white;font-weight:500;
    }
    .faq-qbtn.faq-active::before{
      background:#f04444;
      transform:scale(1.4);
      box-shadow:0 0 6px rgba(240,68,68,.5);
    }

    /* Right panel — answer display */
    .faq-ar{
      background:linear-gradient(145deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.01) 60%,rgba(255,255,255,.04) 100%);
      padding:28px 28px;
      display:flex;flex-direction:column;
      justify-content:center;
      position:relative;
      overflow:hidden;
    }
    .faq-ar::before{
      content:'';position:absolute;top:0;left:0;right:0;bottom:0;
      background:radial-gradient(ellipse at 80% 20%, rgba(240,68,68,.05) 0%, transparent 65%);
      pointer-events:none;
    }
    .faq-num{
      font-size:5rem;font-weight:800;letter-spacing:-.06em;line-height:1;
      color:rgba(232,232,230,.04);font-family:${INTER};
      position:absolute;bottom:16px;right:22px;
      pointer-events:none;
      transition:color .3s;
    }
    .faq-a-q{
      font-size:.78rem;font-weight:600;color:var(--text);
      font-family:${INTER};line-height:1.4;margin-bottom:12px;
      position:relative;z-index:1;
    }
    .faq-a-q::before{
      content:'"';font-size:1.8rem;line-height:.8;
      color:rgba(232,232,230,.1);font-weight:800;
      display:block;margin-bottom:4px;
      font-family:Georgia,serif;
    }
    .faq-a-body{
      font-size:12px;color:var(--muted);line-height:1.8;font-weight:300;
      font-family:${INTER};position:relative;z-index:1;
    }
    .faq-a-tag{
      display:inline-flex;align-items:center;gap:4px;
      margin-top:14px;
      background:rgba(232,232,230,.04);border-radius:99px;
      padding:4px 10px;font-size:9.5px;font-weight:500;
      color:var(--muted);font-family:${INTER};
      border:1px solid var(--border);
      position:relative;z-index:1;
    }
    .faq-a-dot{width:5px;height:5px;border-radius:50%;background:#f04444}
    .faq-empty-icon{
      width:36px;height:36px;border-radius:50%;
      border:1.5px dashed rgba(232,232,230,.15);
      display:flex;align-items:center;justify-content:center;
    }
    .faq-empty-txt{font-size:10.5px;color:var(--muted);font-family:${INTER}}

    @keyframes faq-answer-in{
      0%{opacity:0;transform:translateY(10px)}
      100%{opacity:1;transform:translateY(0)}
    }
    .faq-answer-animate{
      animation:faq-answer-in .35s cubic-bezier(.22,1,.36,1) forwards;
    }

    @media(max-width:640px){
      .faq-chat{grid-template-columns:1fr;min-height:auto}
      .faq-ar{min-height:200px}
    }

    /* CONTACT */
    .contact-wrap{max-width:590px;margin:0 auto}
    .contact-card{background:linear-gradient(145deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 60%,rgba(255,255,255,.06) 100%);border:1px solid rgba(255,255,255,.12);border-radius:var(--rxl);overflow:hidden;box-shadow:0 1px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.5) inset,0 16px 48px rgba(0,0,0,.5);position:relative}
    .contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:40%;background:linear-gradient(to bottom,rgba(255,255,255,.05),transparent);pointer-events:none;z-index:0}
    .contact-header,.contact-body,.contact-footer{position:relative;z-index:1}
    .contact-header{padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between}
    .contact-header-left{display:flex;flex-direction:column;gap:3px}
    .contact-header-title{font-size:.85rem;font-weight:600;color:var(--text);font-family:${INTER}}
    .contact-header-sub{font-size:10.5px;color:var(--muted);font-weight:300;font-family:${INTER}}
    .contact-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.2);border-radius:var(--rf);padding:4px 9px;font-size:10px;font-weight:500;color:#16a34a;font-family:${INTER}}
    .contact-body{padding:20px 24px}
    .cf-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
    .cf-field{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
    .cf-label{font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);font-family:${INTER}}
    .cf-input,.cf-textarea,.cf-select{width:100%;padding:7px 11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:var(--rmd);color:var(--text);font-family:${INTER};font-size:11.5px;font-weight:300;outline:none;transition:border-color .2s,background .2s;appearance:none;box-shadow:0 1px 0 rgba(255,255,255,.06) inset}
    .cf-textarea{resize:vertical;min-height:84px}
    .cf-input::placeholder,.cf-textarea::placeholder{color:var(--muted);opacity:.5}
    .cf-input:focus,.cf-textarea:focus{border-color:rgba(240,68,68,.4);background:rgba(240,68,68,.04);box-shadow:0 0 0 3px rgba(240,68,68,.08)}
    /* Custom budget dropdown */
    .cf-dropdown{position:relative;width:100%}
    .cf-dropdown-trigger{
      width:100%;padding:7px 11px;
      background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
      border-radius:var(--rmd);color:var(--text);font-family:${INTER};
      font-size:11.5px;font-weight:300;outline:none;cursor:pointer;
      display:flex;align-items:center;justify-content:space-between;
      transition:border-color .2s,background .2s;
      box-shadow:0 1px 0 rgba(255,255,255,.06) inset;
      user-select:none;
    }
    .cf-dropdown-trigger.open{border-color:rgba(240,68,68,.4);background:rgba(240,68,68,.04);box-shadow:0 0 0 3px rgba(240,68,68,.08)}
    .cf-dropdown-trigger svg{flex-shrink:0;transition:transform .2s}
    .cf-dropdown-trigger.open svg{transform:rotate(180deg)}
    .cf-dropdown-placeholder{color:rgba(232,232,230,.35)}
    .cf-dropdown-menu{
      position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:100;
      background:#141414;border:1px solid rgba(255,255,255,.12);
      border-radius:var(--rmd);overflow:hidden;
      box-shadow:0 8px 32px rgba(0,0,0,.6);
    }
    .cf-dropdown-option{
      padding:8px 11px;font-family:${INTER};font-size:11.5px;font-weight:300;
      color:rgba(232,232,230,.75);cursor:pointer;transition:background .15s,color .15s;
    }
    .cf-dropdown-option:hover{background:rgba(240,68,68,.12);color:#fff}
    .cf-dropdown-option.selected{background:rgba(240,68,68,.08);color:#fff}
    .cf-checks{display:flex;flex-direction:column;gap:4px}
    .cf-check-label{display:flex;align-items:center;gap:7px;cursor:pointer;padding:7px 9px;border-radius:var(--rsm);border:1px solid rgba(255,255,255,.08);transition:background .15s,border-color .15s;font-size:11.5px;color:var(--text);font-family:${INTER}}
    .cf-check-label:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.15)}
    .cf-check-label input{accent-color:var(--accent);width:12px;height:12px;flex-shrink:0}
    .contact-footer{padding:14px 24px;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.02);flex-wrap:wrap;gap:8px}
    .cf-note{font-size:10px;color:var(--muted);font-family:${INTER}}
    .cf-emaillink{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--muted);text-decoration:none;transition:color .2s;font-family:${INTER};margin-top:9px}
    .cf-emaillink:hover{color:var(--accent)}
    .fok{padding:6px 10px;border-radius:var(--rsm);background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.2);font-size:10.5px;color:#16a34a;margin-top:8px;font-family:${INTER}}
    .ferr{padding:6px 10px;border-radius:var(--rsm);background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.15);font-size:10.5px;color:#dc2626;margin-top:8px;font-family:${INTER}}
    .fwrn{padding:6px 10px;border-radius:var(--rsm);background:rgba(234,179,8,.06);border:1px solid rgba(234,179,8,.15);font-size:10.5px;color:#ca8a04;margin-top:8px;font-family:${INTER}}

    /* FOOTER */
    .foot{padding:16px 32px;border-top:1px solid var(--border);background:transparent;position:relative;z-index:1}
    .fi2{max-width:860px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
    .flinks{display:flex;align-items:center;gap:15px}
    .flink{font-size:11.5px;color:var(--muted);text-decoration:none;transition:color .2s;font-family:${INTER}}
    .flink:hover{color:var(--text)}
    .fcopy{font-size:10px;color:rgba(232,232,230,.3);font-family:${INTER}}

    /* SCROLLBAR */
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:#000}
    ::-webkit-scrollbar-thumb{background:#f04444;border-radius:999px;box-shadow:0 0 8px rgba(240,68,68,.4)}
    ::-webkit-scrollbar-thumb:hover{background:#f87171}
    *{scrollbar-width:thin;scrollbar-color:#f04444 #000}

    /* ── GALLERY ── */
    .gallery-section{
      padding:52px 32px;
      background:transparent;
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
      background:#111;
      box-shadow:0 2px 12px rgba(0,0,0,.3);
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
    .gallery-label-dot{width:5px;height:5px;border-radius:50%;background:#f04444;flex-shrink:0}
    .gallery-btn{
      display:inline-flex;align-items:center;gap:5px;
      background:rgba(0,0,0,.7);color:white;
      font-family:${INTER};font-size:10px;font-weight:600;
      border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:6px 12px;cursor:pointer;
      transition:transform .2s,box-shadow .2s;
      white-space:nowrap;
    }
    .gallery-btn:hover{transform:scale(1.04);box-shadow:0 4px 14px rgba(0,0,0,.4)}
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
      .nav{padding:14px 16px}
      .hero-deco-svg{display:none}
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
      .faq-chat{grid-template-columns:1fr}
      .gallery-grid{grid-template-columns:1fr 1fr}
    }
    @media(max-width:425px){
      .nav{padding:12px 14px}
      .hero{padding:90px 14px 48px}
      .S,.QS{padding:32px 14px}
      .ht{font-size:1.45rem}
      .hdesc{font-size:11px}
      .hact{flex-direction:column;align-items:stretch}
      .hact .bp,.hact .bg{width:100%;justify-content:center}
      .qcards{grid-template-columns:1fr}
      .gallery-grid{grid-template-columns:1fr}
      .stats-new{grid-template-columns:1fr 1fr}
      .svg2{grid-template-columns:1fr}
      .proc{grid-template-columns:1fr}
      .cf-row{grid-template-columns:1fr}
      .I>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
      .faq-chat{grid-template-columns:1fr}
      .work2-row-duo{grid-template-columns:1fr}
      .pcard{max-width:100%}
      .contact-wrap{padding:0 2px}
    }
  `;

  return (
    <div className="K" style={{ fontFamily: INTER }}>
      <style>{css}</style>

      {/* FLOATING LINES BACKGROUND */}
      <FloatingLinesBg />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-i">
          <div className="logo" onClick={() => scrollTo("hero")}>
            <div className="logo-box">
              <div className="logo-box-inner">
                <img src="/kernlogoblack.png" alt="Kern" style={{ width: 28, height: 28, objectFit: "contain", display: "block", filter: "invert(1)" }} />
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
              Open for work
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        {/* Floating ambient particles */}
        {[
          { left:"12%", top:"30%", size:5, dur:"7s", delay:"0s",  tx:"30px",  ty:"-80px", op:".18" },
          { left:"80%", top:"55%", size:4, dur:"9s", delay:"1.2s",tx:"-20px", ty:"-70px", op:".14" },
          { left:"55%", top:"70%", size:6, dur:"8s", delay:"2.5s",tx:"15px",  ty:"-90px", op:".12" },
          { left:"25%", top:"60%", size:3, dur:"10s",delay:"0.7s",tx:"-30px", ty:"-60px", op:".16" },
          { left:"70%", top:"35%", size:5, dur:"6s", delay:"3.1s",tx:"25px",  ty:"-75px", op:".13" },
          { left:"40%", top:"80%", size:4, dur:"11s",delay:"1.8s",tx:"-15px", ty:"-85px", op:".1"  },
        ].map((p, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              background: "var(--accent)",
              "--dur": p.dur, "--delay": p.delay,
              "--tx": p.tx, "--ty": p.ty, "--op": p.op,
            } as React.CSSProperties}
          />
        ))}
        <svg style={{ position: "absolute", left: 0, top: 72, pointerEvents: "none", opacity: 0.5 }} className="hero-deco-svg" width="400" height="70" viewBox="0 0 536 89" fill="none">
          <path d="M-29 1h353.5L412 88.5h123.5" stroke="url(#tl)" />
          <defs>
            <linearGradient id="tl" x1="122" y1="44.75" x2="535.5" y2="44.75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#666" stopOpacity="0" />
              <stop offset="1" stopColor="#666" stopOpacity=".12" />
            </linearGradient>
          </defs>
        </svg>
        <svg style={{ position: "absolute", right: 0, top: 72, pointerEvents: "none", opacity: 0.5 }} className="hero-deco-svg" width="400" height="70" viewBox="0 0 536 89" fill="none">
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
            <span className="bp-icon">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 1v10M1 6h10" />
              </svg>
            </span>
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
            ].map(({ img, label, route }) => (
              <motion.div
                key={label}
                className="gallery-item"
                variants={{
                  hidden:{ opacity:0, scale:0.96 },
                  visible:{ opacity:1, scale:1, transition:{ duration:0.6, ease:[0.22,1,0.36,1] } },
                }}
                onClick={() => navigate(route)}
              >
                <img src={img} alt={label} className="gallery-img" loading="lazy" />

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="S" style={{ background: "transparent", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
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
              <span className="bp-icon">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
              Let's work
            </button>
          </motion.div>
        </div>
      </section>

      {/* QUALITY */}
      <div style={{ background: "transparent", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
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
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  )}
                  {num === "02" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                  {num === "03" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  )}
                  {num === "04" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  )}
                  {num === "05" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  )}
                  {num === "06" && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
      <section className="S" style={{ background: "transparent", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="I why-kern-grid">
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
              <span className="bp-icon">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
              Let's work
            </button>
          </motion.div>

          <motion.div className="pcard" initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
              <span style={{ fontFamily: INTER, fontSize: ".85rem", fontWeight: 600 }}>Task List</span>
              <span style={{ fontSize: 10, color: "var(--muted)", background: "rgba(255, 255, 255, 0.04)", borderRadius: 99, padding: "2px 7px", fontFamily: INTER }}>
                3 Options
              </span>
            </div>

            <div className="pi" style={{ background: "rgba(255, 0, 0, 0.23)" }}>
              <div className="pbar" style={{ background: "rgb(255, 255, 255)" }} />
              <div style={{ flex: 1 }}>
                <div className="pn" style={{ color: "rgb(255, 255, 255)" }}>
                  Kern
                </div>
                <div className="ps" style={{ color: "rgb(255, 255, 255)" }}>
                  Full custom software studio
                </div>
              </div>
              <div className="pbest">
                <svg viewBox="0 0 9 6" width="8" height="6" stroke="#FF0000" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
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
          <motion.div className="shead" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.5 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 7 }}>FAQ</span>
              <h2 className="stitle">Common questions</h2>
            </div>
            <p className="ssub">Everything you need to know before starting a project with Kern. Still curious? Just reach out.</p>
          </motion.div>

          {(() => {
            const faqs = [
              { q: "What kind of projects do you take on?", a: "Internal tools and business systems are our core specialty — admin panels, dashboards, portals, and custom operations software. We also build landing pages, mobile apps, and desktop applications.", tag: "Scope" },
              { q: "How long does a typical project take?", a: "Most projects ship their first version within 4–8 weeks. A focused internal tool may be ready in 3 weeks, while a full-featured platform typically takes 8–12 weeks.", tag: "Timeline" },
              { q: "Do you work with early-stage startups?", a: "Both startups and established businesses. We work with funded startups that need to move fast and with companies replacing legacy systems.", tag: "Clients" },
              { q: "What does the process look like?", a: "We start with a scoping call, define the system architecture, then move into weekly build-and-review cycles. You'll always know what's being built and why.", tag: "Process" },
              { q: "Do you offer support after launch?", a: "80% of our clients stay on for ongoing support post-launch. We offer monthly retainers for continued development, bug fixes, and feature additions.", tag: "Support" },
              { q: "How do you handle pricing?", a: "Projects are quoted with a fixed price after scoping — no surprises. Ongoing retainers are billed monthly. We don't do hourly billing.", tag: "Pricing" },
            ];
            const active = openFaq ?? 0;
            return (
              <motion.div
                className="faq-chat"
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
              >
                {/* Left — question list */}
                <div className="faq-ql">
                  <div className="faq-ql-label">Questions</div>
                  {faqs.map(({ q }, i) => (
                    <button
                      key={i}
                      className={`faq-qbtn${active === i ? " faq-active" : ""}`}
                      onClick={() => setOpenFaq(i)}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Right — answer */}
                <div className="faq-ar">
                  <div className="faq-num">{String(active + 1).padStart(2, "0")}</div>
                  <div key={active} className="faq-answer-animate">
                    <div className="faq-a-q">{faqs[active].q}</div>
                    <div className="faq-a-body">{faqs[active].a}</div>
                    <div className="faq-a-tag">
                      <span className="faq-a-dot" />
                      {faqs[active].tag}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="S" style={{ background: "transparent", borderTop: "1px solid var(--border)" }}>
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
                      <div className="cf-dropdown">
                        <div
                          className={`cf-dropdown-trigger${budgetOpen ? " open" : ""}`}
                          onClick={() => setBudgetOpen(o => !o)}
                        >
                          {formData.budget ? (
                            { "<5k": "Under $5,000", "5k-15k": "$5,000 – $15,000", "15k-50k": "$15,000 – $50,000", "50k+": "$50,000+" }[formData.budget]
                          ) : (
                            <span className="cf-dropdown-placeholder">Select range...</span>
                          )}
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {budgetOpen && (
                          <div className="cf-dropdown-menu">
                            {[
                              { value: "<5k",    label: "Under $5,000" },
                              { value: "5k-15k", label: "$5,000 – $15,000" },
                              { value: "15k-50k",label: "$15,000 – $50,000" },
                              { value: "50k+",   label: "$50,000+" },
                            ].map(opt => (
                              <div
                                key={opt.value}
                                className={`cf-dropdown-option${formData.budget === opt.value ? " selected" : ""}`}
                                onClick={() => { setFormData({ ...formData, budget: opt.value }); setBudgetOpen(false); }}
                              >
                                {opt.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
                        hi@kern.it.com
                      </a>
                    </div>

                    <button type="submit" className="bp" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                      <span className="bp-icon">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                      </span>
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
                <img src="/kernlogoblack.png" alt="Kern" style={{ width: 28, height: 28, objectFit: "contain", display: "block", filter: "invert(1)" }} />
              </div>
            </div>
            <span className="logo-text">Kern</span>
          </div>

          <div className="fcopy">
            <span style={{ color: "var(--text)" }}>Kern</span> is a registered trademark © All rights reserved {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KernSite;