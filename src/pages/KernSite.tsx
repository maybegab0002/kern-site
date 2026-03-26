import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import LogoLoop from "../components/LogoLoop";
import omniportalImg from "../assets/omniportalbrowser.avif";
import kadizImg from "../assets/kadizbrowser.avif";
import bgVideo from "../assets/bg-video.webm";
import { CircleDollarSignIcon } from "@/components/ui/circle-dollar-sign";
import { ClockIcon } from "@/components/ui/clock";
import { EarthIcon } from "@/components/ui/earth";
import { RefreshCWIcon } from "@/components/ui/refresh-cw";
import { RocketIcon } from "@/components/ui/rocket";
import BorderGlow from '@/components/BorderGlow';


/* ─────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────── */
function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(375);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setW(entry.contentRect.width));
    ro.observe(ref.current);
    setW(ref.current.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);
  return { ref, w };
}

/* ─────────────────────────────────────────
   DARK THEME TOKENS
───────────────────────────────────────── */
const D = {
  bg: "#0a0a0a",
  surface: "#111111",
  surfaceHover: "#181818",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.14)",
  text: "#f0f0f0",
  textMuted: "rgba(255,255,255,0.38)",
  textFaint: "rgba(255,255,255,0.18)",
  accent: "#4d9fff",
  accentDim: "rgba(77,159,255,0.12)",
  accentBorder: "rgba(77,159,255,0.25)",
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
};

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Services", href: "#services", dropdown: null },
  { label: "Work",     href: "#work",     dropdown: null },
  { label: "Studio",   href: "#studio",   dropdown: null },
  { label: "I'm Interested", href: "#contact", dropdown: null },
];

function DropdownItem({ item }: { item: { label: string; desc: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "8px 10px", borderRadius: "8px",
        textDecoration: "none",
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        transition: "background 0.1s ease",
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: "7px", flexShrink: 0,
        background: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s ease",
      }}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="12" height="9" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <path d="M1 5.5h12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M1 5.5V4.5a1 1 0 011-1h3l1.5 1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <span style={{ fontSize: "12px", color: hovered ? "#f0f0f0" : "rgba(255,255,255,0.7)", fontWeight: 400, letterSpacing: "-0.02em", transition: "color 0.1s" }}>{item.label}</span>
        <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.3)", fontWeight: 300, letterSpacing: "-0.005em" }}>{item.desc}</span>
      </div>
    </a>
  );
}

function DropdownMenu({ groups, visible }: { groups: { group: string; items: { label: string; desc: string }[] }[]; visible: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: "50%",
      transform: visible ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-6px) scale(0.98)",
      background: "#161616",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(255,255,255,0.09)", borderRadius: "14px",
      padding: "8px", minWidth: "300px",
      opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none",
      transition: "opacity 0.18s ease, transform 0.18s cubic-bezier(0.16,1,0.3,1)",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.5), 0 12px 28px -4px rgba(0,0,0,0.7)",
      zIndex: 100,
    }}>
      <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "9px", height: "9px", background: "#161616", border: "1px solid rgba(255,255,255,0.09)", borderBottom: "none", borderRight: "none" }} />
      {groups.map((group, gi) => (
        <div key={group.group}>
          <div style={{ padding: "6px 10px 4px", fontSize: "9px", fontWeight: 500, letterSpacing: "0.09em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginTop: gi > 0 ? 4 : 0 }}>
            {group.group}
          </div>
          {group.items.map(item => <DropdownItem key={item.label} item={item} />)}
          {gi < groups.length - 1 && <div style={{ margin: "6px 10px", height: "1px", background: "rgba(255,255,255,0.06)" }} />}
        </div>
      ))}
    </div>
  );
}

function NavItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }}
      onMouseLeave={() => { timeout.current = setTimeout(() => setOpen(false), 120); }}
    >
      <a
        href={item.href ?? "#"}
        style={{
          display: "flex", alignItems: "center", gap: "4px",
          fontSize: "12px",
          color: open ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.62)",
          textDecoration: "none", fontWeight: 400,
          letterSpacing: "-0.01em", padding: "6px 11px",
          borderRadius: "980px",
          background: open ? "rgba(255,255,255,0.08)" : "transparent",
          transition: "color 0.15s, background 0.15s", whiteSpace: "nowrap",
        }}
      >
        {item.label}
      </a>
      {item.dropdown && <DropdownMenu groups={item.dropdown} visible={open} />}
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVICES — BORDERGLOW BENTO GRID
───────────────────────────────────────── */
const SERVICES_DATA = [
  {
    id: "web-app",
    index: "01",
    title: "Web Application",
    desc: "Full-stack products built to scale — from architecture to deployment.",
    tag: "Development",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 9h24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="6" cy="6.5" r="1" fill="currentColor" />
        <circle cx="9.5" cy="6.5" r="1" fill="currentColor" />
        <circle cx="13" cy="6.5" r="1" fill="currentColor" />
        <path d="M8 15l3 3 7-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "web-design",
    index: "02",
    title: "Web & Mobile",
    desc: "Transforming ideas into exceptional web and mobile app experiences that convert.",
    tag: "Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="2" width="14" height="24" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <rect x="19" y="6" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="22" r="1" fill="currentColor" />
        <circle cx="23" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "ui",
    index: "03",
    title: "UI Design",
    desc: "Interfaces that feel inevitable. Components, systems, and interactions that just work.",
    tag: "Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="15" y="2" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="15" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="15" y="15" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "product-dev",
    index: "04",
    title: "Product Development",
    desc: "From zero to launch. We plan, build, and ship complete digital products end to end.",
    tag: "Development",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 9v10l-11 6L3 19V9l11-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 9l11 6m0 0v10m0-10l11-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "product-design",
    index: "05",
    title: "Product Design",
    desc: "Strategy meets craft. We shape product vision, flows, and systems that users actually love.",
    tag: "Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 3v22M3 14h22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

function ServiceCard({
  service,
  delay,
  visible,
  large = false,
}: {
  service: (typeof SERVICES_DATA)[0];
  delay: number;
  visible: boolean;
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ height: "100%" }}
    >
      <BorderGlow
        edgeSensitivity={0}
        glowColor="40 80 80"
        backgroundColor="#0e0e0e"
        borderRadius={large ? 20 : 18}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated
        colors={['#c084fc', '#f472b6', '#38bdf8']}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: large ? "30px 28px" : "24px 22px",
            cursor: "default",
          }}
        >
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: large ? 24 : 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "11px",
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.09)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", flexShrink: 0,
            }}>
              {service.icon}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, paddingTop: 2 }}>
              <span style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "0.09em", textTransform: "uppercase" as const, color: D.textFaint }}>{service.tag}</span>
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.1)", fontWeight: 300 }}>{service.index}</span>
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: large ? "24px" : "16px",
            fontWeight: 600, color: D.text,
            letterSpacing: "-0.03em", lineHeight: 1.15,
            margin: "0 0 10px", fontFamily: "'DM Sans', sans-serif",
          }}>
            {service.title}
          </h3>

          {/* Desc */}
          <p style={{
            fontSize: "12px", fontWeight: 300,
            color: D.textMuted, lineHeight: 1.72,
            letterSpacing: "-0.01em", margin: 0, flex: 1,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {service.desc}
          </p>

          {/* CTA */}
          <div style={{ marginTop: 20 }}>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: "10.5px", fontWeight: 400,
                color: hovered ? D.accent : "rgba(255,255,255,0.2)",
                letterSpacing: "-0.01em", transition: "color 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Get a quote
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────── */
function ServicesSection({ isMobile }: { isMobile: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = headerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ padding: isMobile ? "64px 0 72px" : "88px 0 96px" }}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={vis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginBottom: 36,
          display: "flex",
          flexDirection: isMobile ? "column" as const : "row" as const,
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 8 }}>What we do</div>
          <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>Five ways we can help.</h2>
        </div>
        <a href="#contact"
          style={{ fontSize: "11px", fontWeight: 400, color: D.textMuted, letterSpacing: "-0.01em", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, flexShrink: 0, transition: "color 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.color = D.text)}
          onMouseLeave={e => (e.currentTarget.style.color = D.textMuted)}
        >
          Get a quote
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </motion.div>

      {isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SERVICES_DATA.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 0.07} visible={vis} />
          ))}
        </div>
      )}

      {!isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, height: 260 }}>
            {SERVICES_DATA.slice(0, 3).map((service, i) => (
              <ServiceCard key={service.id} service={service} delay={i * 0.08} visible={vis} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, height: 220 }}>
            {SERVICES_DATA.slice(3, 5).map((service, i) => (
              <ServiceCard key={service.id} service={service} delay={0.24 + i * 0.08} visible={vis} large={i === 0} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


/* ─────────────────────────────────────────
   WORK SECTION
───────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1, index: "01", client: "Henceforth Group of Companies",
    slug: "Document intelligence for legal teams",
    services: ["UI Design", "Web App"], year: "2025",
    desc: "Zero to launch. We designed the full system — identity, onboarding, and a dashboard that turns 80-page contracts into a single answer.",
    stat: { value: "3×", label: "faster contract review" },
    thumbnail: omniportalImg, projectName: "Omniportal Web Application",
    tools: "Figma  |  UI Design",
    development: "React · TypeScript · Tailwind CSS · Lucide Icons · Supabase · Node.js",
  },
  {
    id: 2, index: "02", client: "Kadiz",
    slug: "Point of Sale system for retail",
    services: ["UI Design", "Web App"], year: "2025",
    desc: "A full-featured POS system built for modern retail. We designed and developed the entire product from the ground up.",
    stat: { value: "4.8★", label: "App Store rating" },
    thumbnail: kadizImg, projectName: "Kadiz POS",
    tools: "Figma  |  UI Design",
    development: "React · TypeScript · Tailwind CSS · Supabase",
  },
];

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}>
      <div style={{ background: D.surface, borderRadius: "20px", overflow: "hidden", height: "520px", position: "relative", border: `1px solid ${D.border}` }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.client} style={{ width: "85%", height: "85%", objectFit: "contain", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 41 }).map((_, i) => <line key={"v"+i} x1={i*20} y1="0" x2={i*20} y2="520" stroke="#fff" strokeWidth="0.5" />)}
                {Array.from({ length: 27 }).map((_, i) => <line key={"h"+i} x1="0" y1={i*20} x2="800" y2={i*20} stroke="#fff" strokeWidth="0.5" />)}
              </svg>
              <span style={{ fontSize: "140px", fontWeight: 700, color: "#fff", opacity: 0.04, letterSpacing: "-0.04em", userSelect: "none" as const }}>{project.index}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "12px 2px 0", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 2fr", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div style={{ fontSize: "10.5px", fontWeight: 500, color: D.text, letterSpacing: "-0.02em", marginBottom: 2 }}>{project.projectName}</div>
          <div style={{ fontSize: "9.5px", fontWeight: 300, color: D.textMuted, letterSpacing: "-0.01em" }}>{project.year}</div>
        </div>
        <div>
          <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.07em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 4 }}>Client</div>
          <div style={{ fontSize: "10px", fontWeight: 400, color: D.text, letterSpacing: "-0.02em", lineHeight: 1.4 }}>{project.client}</div>
        </div>
        <div>
          <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.07em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 4 }}>Tools</div>
          <div style={{ fontSize: "10px", fontWeight: 400, color: D.text, letterSpacing: "-0.02em" }}>{project.tools}</div>
        </div>
        {project.development && (
          <div>
            <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.07em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 4 }}>Development</div>
            <div style={{ fontSize: "9.5px", fontWeight: 300, color: D.textMuted, letterSpacing: "-0.01em", lineHeight: 1.5 }}>{project.development}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function WorkSection({ isMobile }: { isMobile: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = headerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="work" style={{ paddingTop: isMobile ? 64 : 88, paddingBottom: isMobile ? 60 : 88 }}>
      {/* Selected work header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={vis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: isMobile ? 36 : 48, textAlign: "center" as const }}
      >
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 8 }}>Selected work</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif" }}>What we've shipped.</h2>
        <p style={{ fontSize: "12.5px", fontWeight: 300, color: D.textMuted, lineHeight: 1.75, letterSpacing: "-0.01em", maxWidth: 420, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
          A handful of the products, brands, and experiences we've designed and built from the ground up.
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: "48px" }}>
        {PROJECTS.map((p, idx) => (
          <ProjectCard key={p.id} project={p} delay={idx * 0.08} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CLIENT LOGOS
───────────────────────────────────────── */
const LOGO_STYLE = { padding: "0 15px", height: 28, width: "auto", opacity: 0.35, filter: "grayscale(100%) invert(1)" };
const CLIENT_LOGOS = [
  { node: <img src="/logos/anthropic_white.svg"    alt="Anthropic"   style={LOGO_STYLE} />, title: "Anthropic" },
  { node: <img src="/logos/chartjs.svg"            alt="Chart.js"    style={LOGO_STYLE} />, title: "Chart.js" },
  { node: <img src="/logos/claude-ai-icon.svg"     alt="Claude"      style={LOGO_STYLE} />, title: "Claude" },
  { node: <img src="/logos/cursor_light.svg"       alt="Cursor"      style={LOGO_STYLE} />, title: "Cursor" },
  { node: <img src="/logos/electron.svg"           alt="Electron"    style={LOGO_STYLE} />, title: "Electron" },
  { node: <img src="/logos/expressjs.svg"          alt="Express.js"  style={LOGO_STYLE} />, title: "Express.js" },
  { node: <img src="/logos/figma.svg"              alt="Figma"       style={LOGO_STYLE} />, title: "Figma" },
  { node: <img src="/logos/firebase.svg"           alt="Firebase"    style={LOGO_STYLE} />, title: "Firebase" },
  { node: <img src="/logos/flutter.svg"            alt="Flutter"     style={LOGO_STYLE} />, title: "Flutter" },
  { node: <img src="/logos/framer.svg"             alt="Framer"      style={LOGO_STYLE} />, title: "Framer" },
  { node: <img src="/logos/github_light.svg"       alt="GitHub"      style={LOGO_STYLE} />, title: "GitHub" },
  { node: <img src="/logos/godaddy.svg"            alt="GoDaddy"     style={LOGO_STYLE} />, title: "GoDaddy" },
  { node: <img src="/logos/html5.svg"              alt="HTML5"       style={LOGO_STYLE} />, title: "HTML5" },
  { node: <img src="/logos/kubernetes.svg"         alt="Kubernetes"  style={LOGO_STYLE} />, title: "Kubernetes" },
  { node: <img src="/logos/nextjs_icon_dark.svg"   alt="Next.js"     style={LOGO_STYLE} />, title: "Next.js" },
  { node: <img src="/logos/nodejs.svg"             alt="Node.js"     style={LOGO_STYLE} />, title: "Node.js" },
  { node: <img src="/logos/openai.svg"             alt="OpenAI"      style={LOGO_STYLE} />, title: "OpenAI" },
  { node: <img src="/logos/python.svg"             alt="Python"      style={LOGO_STYLE} />, title: "Python" },
  { node: <img src="/logos/react_light.svg"        alt="React"       style={LOGO_STYLE} />, title: "React" },
  { node: <img src="/logos/resend-icon-black.svg"  alt="Resend"      style={LOGO_STYLE} />, title: "Resend" },
  { node: <img src="/logos/shadcn-ui.svg"          alt="shadcn/ui"   style={LOGO_STYLE} />, title: "shadcn/ui" },
  { node: <img src="/logos/supabase.svg"           alt="Supabase"    style={LOGO_STYLE} />, title: "Supabase" },
  { node: <img src="/logos/tailwindcss.svg"        alt="Tailwind CSS" style={LOGO_STYLE} />, title: "Tailwind CSS" },
  { node: <img src="/logos/typescript.svg"         alt="TypeScript"  style={LOGO_STYLE} />, title: "TypeScript" },
  { node: <img src="/logos/vite.svg"               alt="Vite"        style={LOGO_STYLE} />, title: "Vite" },
];

function ClientLogos() {
  return (
    <section style={{ padding: "64px 0" }}>
      <div style={{ padding: "0 48px", marginBottom: "40px", textAlign: "center" as const }}>
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 8 }}>Tech Stack We Use</div>
      </div>
      <div style={{ height: 48, position: "relative", overflow: "hidden" }}>
        <LogoLoop logos={CLIENT_LOGOS} speed={80} direction="left" gap={100} hoverSpeed={0} scaleOnHover={false} fadeOut fadeOutColor="#0a0a0a" ariaLabel="Clients and partners" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROCESS
───────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Brief",   desc: "We align on goals, scope, and what success actually looks like — whether it's a brand, a product, or anything in between." },
  { num: "02", title: "Concept", desc: "Ideas become tangible fast. You see early directions — moodboards, wireframes, or identity explorations — before we go deep." },
  { num: "03", title: "Craft",   desc: "This is where the real work happens. Design and execution in one continuous loop, refined until every detail is right." },
  { num: "04", title: "Deliver", desc: "Handed over complete — live, print-ready, or fully documented. Ready to use from day one, built to last beyond it." },
];

function ProcessSection({ isMobile }: { isMobile: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const el = headerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const id = setInterval(() => setActiveStep(i => (i + 1) % STEPS.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <section style={{ padding: isMobile ? "64px 0" : "88px 0" }}>
      <motion.div ref={headerRef} initial={{ opacity: 0, y: 12 }} animate={headerVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: isMobile ? 48 : 72 }}>
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 8 }}>How we work</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>From brief to launch.</h2>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column" as const }}>
        {STEPS.map((step, i) => {
          const active = activeStep === i;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 10 }} animate={headerVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              onClick={() => setActiveStep(i)}
              style={{ display: "grid", gridTemplateColumns: isMobile ? "32px 1fr" : "52px 1fr 1fr", gap: isMobile ? "0 16px" : "0 32px", padding: isMobile ? "24px 0" : "32px 0", cursor: "pointer", borderTop: `1px solid ${D.border}`, alignItems: "start" }}
            >
              <motion.span animate={{ color: active ? D.text : D.textFaint }} transition={{ duration: 0.4 }} style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.04em", paddingTop: isMobile ? 3 : 4, fontVariantNumeric: "tabular-nums" as any }}>{step.num}</motion.span>
              <motion.h3 animate={{ color: active ? D.text : "rgba(255,255,255,0.2)" }} transition={{ duration: 0.4 }} style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>{step.title}</motion.h3>
              <motion.p animate={{ color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }} transition={{ duration: 0.4 }} style={{ fontSize: "12.5px", fontWeight: 300, lineHeight: 1.75, letterSpacing: "-0.01em", margin: 0, gridColumn: isMobile ? "2 / 3" : "auto", marginTop: isMobile ? 8 : 0, paddingTop: isMobile ? 0 : 3 }}>{step.desc}</motion.p>
            </motion.div>
          );
        })}
        <div style={{ borderTop: `1px solid ${D.border}` }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
const TESTIMONIALS = [
  { id: 1, quote: "Working with Kern was the first time I felt like a designer actually understood what we were building — not just what it should look like.", highlight: ["actually understood what we were building"], name: "Marcus T.", role: "Co-founder, Arcvault", initials: "MT" },
  { id: 2, quote: "We came in with a vague idea and left with a product we're genuinely proud of. The speed without compromising quality was unreal.", highlight: ["speed without compromising quality"], name: "Priya S.", role: "CEO, Dew Health", initials: "PS" },
  { id: 3, quote: "Our old brand was invisible. Now every touchpoint feels intentional. It's the kind of work that makes you wonder why you waited so long.", highlight: ["every touchpoint feels intentional"], name: "Leo R.", role: "Principal, Palma Studio", initials: "LR" },
];

function highlightQuote(quote: string, highlights: string[]) {
  let parts: { text: string; highlight: boolean }[] = [{ text: quote, highlight: false }];
  highlights.forEach(h => {
    parts = parts.flatMap(part => {
      if (part.highlight) return [part];
      const idx = part.text.indexOf(h);
      if (idx === -1) return [part];
      return [
        { text: part.text.slice(0, idx), highlight: false },
        { text: h, highlight: true },
        { text: part.text.slice(idx + h.length), highlight: false },
      ].filter(p => p.text);
    });
  });
  return parts;
}

function TestimonialsSection({ isMobile }: { isMobile: boolean }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const id = setInterval(() => { setDir(1); setActive(i => (i + 1) % TESTIMONIALS.length); }, 4000);
    return () => clearInterval(id);
  }, [active]);
  const goTo = (i: number) => { setDir(i > active ? 1 : -1); setActive(i); };
  const t = TESTIMONIALS[active];
  const parts = highlightQuote(t.quote, t.highlight);
  return (
    <section id="testimonials" style={{ padding: isMobile ? "64px 4px" : "88px 48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center" as const, marginBottom: 52 }}>
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 8 }}>Kind words</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>What clients say.</h2>
      </div>
      <div style={{ maxWidth: 580, width: "100%", position: "relative", height: isMobile ? 220 : 180 }}>
        <AnimatePresence mode="wait">
          <motion.p key={active} initial={{ opacity: 0, y: dir * 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: dir * -16 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", inset: 0, fontSize: isMobile ? "16px" : "20px", fontWeight: 400, color: D.text, lineHeight: 1.65, letterSpacing: "-0.025em", textAlign: "center" as const, margin: 0 }}>
            {parts.map((p, i) => p.highlight
              ? <span key={i} style={{ color: D.accent, fontStyle: "italic" }}>{p.text}</span>
              : <React.Fragment key={i}>{p.text}</React.Fragment>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
      <div style={{ position: "relative", height: 56, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12, marginBottom: 28 }}>
        <AnimatePresence mode="wait">
          <motion.div key={"attr-" + active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ position: "absolute", textAlign: "center" as const }}>
            <div style={{ fontSize: "12px", fontWeight: 500, color: D.text, letterSpacing: "-0.02em" }}>{t.name}</div>
            <div style={{ fontSize: "10.5px", fontWeight: 300, color: D.textMuted, marginTop: 3 }}>{t.role}</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {TESTIMONIALS.map((tes, i) => (
          <button key={tes.id} onClick={() => goTo(i)} style={{ width: i === active ? 44 : 32, height: i === active ? 44 : 32, borderRadius: "10px", border: i === active ? `2px solid ${D.text}` : `2px solid ${D.border}`, background: i === active ? D.text : D.glass, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0, opacity: Math.abs(i - active) > 1 ? 0.4 : 1, fontSize: i === active ? "11px" : "9px", fontWeight: 600, color: i === active ? "#0a0a0a" : D.textMuted, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>
            {tes.initials}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 24, width: 48, height: 2, background: D.border, borderRadius: 2, overflow: "hidden" }}>
        <motion.div key={active} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} style={{ height: "100%", background: D.text, borderRadius: 2 }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   STUDIO
───────────────────────────────────────── */
function StudioSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const stats   = [{ value: "4+", label: "Years of practice" }, { value: "30+", label: "Projects shipped" }, { value: "3", label: "Continents served" }];
  const socials = [{ label: "Instagram", href: "https://www.instagram.com/kern.systems/" }, { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61588326717886" }, { label: "Threads", href: "https://www.threads.com/@kern.systems" }];
  return (
    <section id="studio" style={{ padding: isMobile ? "64px 4px" : "88px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" as const }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 16 }}>The studio</motion.div>
      <motion.h2 initial={{ opacity: 0, y: 14 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }} style={{ fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", lineHeight: 1.08, margin: "0 0 20px", maxWidth: 520 }}>
        One person.<br /><span style={{ color: D.accent }}>Full-studio</span> output.
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.13 }} style={{ fontSize: "13px", fontWeight: 300, color: D.textMuted, lineHeight: 1.8, letterSpacing: "-0.01em", maxWidth: 440, margin: "0 0 48px" }}>
        Kern is a solo design and development studio operating remotely. I work with founders and teams who need the full picture — strategy, design, and engineering handled by one person who actually cares about the outcome.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }} style={{ display: "flex", gap: isMobile ? 32 : 56, marginBottom: 48, flexWrap: "wrap" as const, justifyContent: "center" }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.07 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: D.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: "10px", fontWeight: 300, color: D.textMuted, letterSpacing: "-0.01em" }}>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.32 }} style={{ display: "flex", gap: 6 }}>
        {socials.map(s => (
          <a key={s.label} href={s.href}
            style={{ fontSize: "10.5px", fontWeight: 400, color: D.textMuted, textDecoration: "none", letterSpacing: "-0.01em", border: `1px solid ${D.border}`, borderRadius: "980px", padding: "5px 14px", transition: "all 0.15s ease" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.background = D.text; e.currentTarget.style.borderColor = D.text; }}
            onMouseLeave={e => { e.currentTarget.style.color = D.textMuted; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = D.border; }}
          >
            {s.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
const FAQ_CATEGORIES = ["All", "General", "Pricing", "Process", "Design"];
const ICON_COMPONENTS = { Clock: ClockIcon, CircleDollarSign: CircleDollarSignIcon, Rocket: RocketIcon, RefreshCw: RefreshCWIcon, Earth: EarthIcon } as const;
type IconKey = keyof typeof ICON_COMPONENTS;
const FAQS: { q: string; a: string; category: string; icon: IconKey }[] = [
  { q: "How long does a typical project take?",    a: "Depends on scope — a brand identity usually takes 2–3 weeks, a web design 3–4 weeks, and a full product build 6–12 weeks. We scope everything before we start so there are no surprises.", category: "Process",  icon: "Clock" },
  { q: "What does it cost to work with Kern?",     a: "Projects are priced per scope, not per hour. Most engagements start at $2,000 for design work and $5,000+ for full-stack builds. Get a quote and you'll have a number within 24 hours.",           category: "Pricing",  icon: "CircleDollarSign" },
  { q: "Do you work with early-stage startups?",   a: "Yes — a lot of the best work happens at the zero-to-one stage. If you have a clear problem and a real budget, we'll make it work.",                                                               category: "General",  icon: "Rocket" },
  { q: "Do you take on ongoing / retainer work?",  a: "Yes. After a project wraps, some clients stay on a monthly retainer for design, development, or both. Slots are limited but worth asking about.",                                                    category: "Pricing",  icon: "RefreshCw" },
  { q: "What if I only need design — no development?", a: "That's fine. Design-only engagements are a big part of what we do — UI, branding, graphic design, motion. You don't need the full stack to work together.",                                    category: "Design",   icon: "Earth" },
  { q: "How does the process work across time zones?", a: "Async-first. You'll get updates, files, and questions without needing to be online at the same time. For calls, we find an overlap that works — UTC+8 is surprisingly flexible.",              category: "Process",  icon: "Clock" },
];

function FAQItem({ item, index, visible }: { item: typeof FAQS[0]; index: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_COMPONENTS[item.icon];
  const iconRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (iconRef.current) iconRef.current.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    }, 2500 + index * 400);
    return () => clearInterval(interval);
  }, [index]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      style={{ borderTop: `1px solid ${D.border}` }}
    >
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const, fontFamily: "'DM Sans', sans-serif" }}>
        <div ref={iconRef} style={{ width: 34, height: 34, borderRadius: "9px", flexShrink: 0, background: open ? D.text : "transparent", border: `1px solid ${open ? D.text : D.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.22s ease, border-color 0.22s ease", color: open ? "#0a0a0a" : D.textMuted }}>
          <Icon size={15} />
        </div>
        <span style={{ flex: 1, fontSize: "13px", fontWeight: 500, color: open ? D.text : D.textMuted, letterSpacing: "-0.02em", lineHeight: 1.4, transition: "color 0.2s" }}>{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ flexShrink: 0, color: open ? D.accent : D.textFaint, display: "flex" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "12.5px", fontWeight: 300, color: D.textMuted, lineHeight: 1.8, letterSpacing: "-0.01em", padding: "0 0 20px 48px", margin: 0 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const filtered = activeCategory === "All" ? FAQS : FAQS.filter(f => f.category === activeCategory);
  return (
    <section id="journal" style={{ padding: isMobile ? "64px 4px" : "88px 48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: "center" as const, marginBottom: 36, maxWidth: 520 }}>
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 10 }}>FAQ</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 12px" }}>Frequently asked questions</h2>
        <p style={{ fontSize: "12.5px", fontWeight: 300, color: D.textMuted, lineHeight: 1.75, margin: 0 }}>
          Can't find what you're looking for?{" "}
          <a href="#contact" style={{ color: D.accent, textDecoration: "none", fontWeight: 400, borderBottom: `1px solid ${D.accentBorder}` }}>Send us a message.</a>
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, justifyContent: "center", marginBottom: 32 }}>
        {FAQ_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ fontSize: "11px", fontWeight: cat === activeCategory ? 500 : 400, color: cat === activeCategory ? "#0a0a0a" : D.textMuted, background: cat === activeCategory ? D.text : "transparent", border: `1px solid ${cat === activeCategory ? D.text : D.border}`, borderRadius: "980px", padding: "5px 14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", transition: "all 0.2s ease" }}>{cat}</button>
        ))}
      </motion.div>
      <div style={{ width: "100%", maxWidth: 640 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {filtered.map((item, i) => <FAQItem key={item.q} item={item} index={i} visible={vis} />)}
            <div style={{ borderTop: `1px solid ${D.border}` }} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────── */
function CTASection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaLoading, setCtaLoading] = useState(false);
  const [ctaStatus, setCtaStatus] = useState<"idle" | "success" | "error">("idle");
  const [ctaError, setCtaError] = useState("");
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  async function handleCtaSubmit() {
    if (!ctaEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaEmail)) { setCtaError("Please enter a valid email address."); return; }
    setCtaLoading(true); setCtaError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: "d6e60692-5318-4b4d-b5ee-7e9e05fa37d8", name: ctaEmail, email: ctaEmail, subject: `New project interest from ${ctaEmail}`, message: `Someone wants to start a project.\n\nTheir email: ${ctaEmail}\n\nSource: CTA hero section` }) });
      const data = await res.json();
      if (data.success) { setCtaStatus("success"); setCtaEmail(""); } else { setCtaError("Something went wrong. Try again."); }
    } catch { setCtaError("Network error. Try again."); } finally { setCtaLoading(false); }
  }
  return (
    <section id="contact" ref={ref} style={{ width: "100%", padding: "0 0" }}>
      <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ position: "relative", width: "100%", minHeight: isMobile ? 340 : 420, borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
            <source src={bgVideo} type="video/webm" />
          </video>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: isMobile ? "56px 24px" : "72px 40px" }}>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }} style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 4.5vw, 58px)", fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.06, margin: "0 0 14px", maxWidth: 680 }}>
              Ready to start<br />your next project?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }} style={{ fontSize: isMobile ? "12px" : "13px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, letterSpacing: "-0.01em", maxWidth: 380, margin: "0 0 36px" }}>
              Free scoping call — we'll figure out exactly what you need and how we can help.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }} style={{ width: "100%", maxWidth: 420 }}>
              {ctaStatus === "success" ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: "980px", padding: "13px 24px", backdropFilter: "blur(8px)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#4ade80" strokeWidth="1.2" /><path d="M4 7l2 2 4-4" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span style={{ color: "#fff", fontSize: "12px", fontWeight: 400, letterSpacing: "-0.01em" }}>Got it — we'll be in touch soon!</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "980px", padding: "5px 5px 5px 20px", backdropFilter: "blur(12px)", gap: 8 }}>
                  <input type="email" placeholder="your@email.com" value={ctaEmail} onChange={e => { setCtaEmail(e.target.value); setCtaError(""); }} style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "12px", fontWeight: 300, color: "#fff", letterSpacing: "-0.01em", fontFamily: "'DM Sans', sans-serif", minWidth: 0 }} onKeyDown={e => e.key === "Enter" && handleCtaSubmit()} />
                  <button onClick={handleCtaSubmit} disabled={ctaLoading} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, background: ctaLoading ? "rgba(255,255,255,0.7)" : "#fff", color: "#0a0f1e", border: "none", borderRadius: "980px", padding: "9px 18px", fontSize: "12px", fontWeight: 500, letterSpacing: "-0.01em", cursor: ctaLoading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.18s", whiteSpace: "nowrap" as const }}>
                    {ctaLoading ? "Sending…" : (<>Start a project <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></>)}
                  </button>
                </div>
              )}
              {ctaError && <p style={{ color: "rgba(255,120,120,0.9)", fontSize: "11px", marginTop: 8, letterSpacing: "-0.01em", textAlign: "center" }}>{ctaError}</p>}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT DETAILS STRIP
───────────────────────────────────────── */
function ContactDetailsStrip({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const items = [
    { label: "Instagram", value: "@kern.systems", href: "https://www.instagram.com/kern.systems/" },
    { label: "Facebook",  value: "Kern Systems",  href: "https://www.facebook.com/profile.php?id=61588326717886" },
    { label: "Threads",   value: "@kern.systems", href: "https://www.threads.com/@kern.systems" },
    { label: "Based in",  value: "Manila, PH — Remote worldwide", href: null },
  ];
  return (
    <div ref={ref} style={{ padding: isMobile ? "0 4px 40px" : "0 0 48px" }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "14px", border: `1px solid ${D.border}`, overflow: "hidden" }}
      >
        {items.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            style={{ padding: isMobile ? "18px 16px" : "20px 22px", background: D.surface, borderRight: i % 2 === 0 ? `1px solid ${D.border}` : "none", borderBottom: i < 2 ? `1px solid ${D.border}` : "none" }}
          >
            <div style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 8 }}>{item.label}</div>
            {item.href ? (
              <a href={item.href} style={{ fontSize: isMobile ? "11.5px" : "12.5px", fontWeight: 400, color: D.text, textDecoration: "none", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = D.accent)} onMouseLeave={e => (e.currentTarget.style.color = D.text)}>
                {item.value}
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}><path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            ) : (
              <span style={{ fontSize: isMobile ? "11.5px" : "12.5px", fontWeight: 400, color: D.text, letterSpacing: "-0.02em" }}>{item.value}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   BUDGET DROPDOWN
───────────────────────────────────────── */
function BudgetDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = [
    { label: "Under $2k",   sub: "Small tasks & quick wins" },
    { label: "$2k – $5k",   sub: "MVP or focused scope" },
    { label: "$5k – $15k",  sub: "Full project delivery" },
    { label: "$15k+",       sub: "Ongoing or complex work" },
    { label: "Let's talk",  sub: "Not sure yet — that's fine" },
  ];
  useEffect(() => {
    function onClick(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: open ? D.surfaceHover : D.surface, border: `1px solid ${open ? D.borderHover : D.border}`, boxShadow: open ? `0 0 0 3px ${D.accentDim}` : "none", borderRadius: "8px", padding: "10px 13px", cursor: "pointer", fontSize: "12.5px", fontWeight: 300, color: value ? D.text : D.textMuted, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", transition: "all 0.15s", textAlign: "left" as const }}>
        <span>{value || "Select range..."}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", flexShrink: 0, color: D.textFaint }}>
          <svg width="10" height="10" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.98 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 100, background: "#161616", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${D.border}`, borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", overflow: "hidden", padding: "5px" }}
          >
            {options.map((opt) => {
              const selected = value === opt.label;
              return (
                <button key={opt.label} type="button" onClick={() => { onChange(opt.label); setOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: "8px", border: "none", cursor: "pointer", background: selected ? D.accentDim : "transparent", fontFamily: "'DM Sans', sans-serif", textAlign: "left" as const, transition: "background 0.12s" }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.background = D.glass; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                >
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: selected ? 500 : 400, color: selected ? D.accent : D.text, letterSpacing: "-0.02em" }}>{opt.label}</div>
                    <div style={{ fontSize: "10.5px", fontWeight: 300, color: D.textMuted, marginTop: 1, letterSpacing: "-0.01em" }}>{opt.sub}</div>
                  </div>
                  {selected && <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}><path d="M2.5 6.5l3 3 5-5" stroke={D.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function ContactFormSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", services: [] as string[], message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const serviceOptions = ["Web Application", "Web Design", "UI Design", "Product Development", "Product Design"];
  const toggleService = (s: string) => setForm(f => ({ ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s] }));
  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError("Please fill in your name and email."); return; }
    setError(null); setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: "d6e60692-5318-4b4d-b5ee-7e9e05fa37d8", name: form.name, email: form.email, company: form.company, budget: form.budget, services: form.services.join(", "), message: form.message, subject: `New Project Inquiry from ${form.name}` }) });
      const data = await res.json();
      if (data.success) { setSubmitted(true); } else { setError("Something went wrong. Please try again or email us directly."); }
    } catch { setError("Network error. Please try again or email us directly."); } finally { setLoading(false); }
  };
  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: focused === name ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === name ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
    boxShadow: focused === name ? `0 0 0 3px ${D.accentDim}` : "none",
    borderRadius: "8px", outline: "none", padding: "10px 13px",
    fontSize: "12.5px", fontWeight: 300, color: D.text,
    fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em",
    transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
    boxSizing: "border-box" as const,
  });
  const labelStyle: React.CSSProperties = { fontSize: "9px", fontWeight: 500, letterSpacing: "0.08em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 5, display: "block" };

  if (submitted) {
    return (
      <section ref={ref} style={{ padding: isMobile ? "40px 4px 80px" : "40px 0 100px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: D.surface, borderRadius: "16px", border: `1px solid ${D.border}`, padding: isMobile ? "48px 24px" : "64px 48px", display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" as const }}
        >
          <div style={{ width: 44, height: 44, borderRadius: "12px", background: D.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4.5 4.5L16 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", margin: "0 0 10px" }}>Message sent.</h3>
          <p style={{ fontSize: "12.5px", fontWeight: 300, color: D.textMuted, lineHeight: 1.75, margin: 0, maxWidth: 300 }}>Thanks for reaching out — I'll get back within 24 hours.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ padding: isMobile ? "40px 4px 80px" : "40px 0 100px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={vis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: "0 8px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.35) 70%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "1px", background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ padding: isMobile ? "18px 20px" : "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <div>
            <div style={{ fontSize: "12.5px", fontWeight: 500, color: D.text, letterSpacing: "-0.02em" }}>New Project Inquiry</div>
            <div style={{ fontSize: "11px", fontWeight: 300, color: D.textMuted, marginTop: 2, letterSpacing: "-0.01em" }}>I'll get back to you within 1 business day</div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(130,212,159,0.08)", border: "1px solid rgba(130,212,159,0.2)", borderRadius: "980px", padding: "4px 11px", flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            <span style={{ fontSize: "10px", fontWeight: 400, color: D.textMuted, letterSpacing: "-0.01em" }}>Open for work</span>
          </div>
        </div>

        <div style={{ padding: isMobile ? "20px 20px 24px" : "24px 28px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              <div><label style={labelStyle}>Full name *</label><input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={inputStyle("name")} /></div>
              <div><label style={labelStyle}>Business email *</label><input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={inputStyle("email")} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              <div><label style={labelStyle}>Company</label><input type="text" placeholder="Your company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} style={inputStyle("company")} /></div>
              <div><label style={labelStyle}>Estimated budget</label><BudgetDropdown value={form.budget} onChange={v => setForm(f => ({ ...f, budget: v }))} /></div>
            </div>
            <div>
              <label style={labelStyle}>What do you need help with?</label>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, marginTop: 2 }}>
                {serviceOptions.map(s => {
                  const checked = form.services.includes(s);
                  return (
                    <label key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", background: checked ? D.accentDim : D.glass, border: `1px solid ${checked ? D.accentBorder : D.border}`, borderRadius: "8px", cursor: "pointer", transition: "all 0.15s ease" }}
                      onMouseEnter={e => { if (!checked) e.currentTarget.style.background = D.surfaceHover; }}
                      onMouseLeave={e => { if (!checked) e.currentTarget.style.background = D.glass; }}
                    >
                      <div onClick={() => toggleService(s)} style={{ width: 14, height: 14, borderRadius: "4px", flexShrink: 0, border: `1.5px solid ${checked ? D.accent : D.border}`, background: checked ? D.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}>
                        {checked && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#0a0a0a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span onClick={() => toggleService(s)} style={{ fontSize: "12px", fontWeight: checked ? 400 : 300, color: checked ? D.text : D.textMuted, letterSpacing: "-0.01em", flex: 1, transition: "color 0.15s" }}>{s}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Tell us about your project</label>
              <textarea rows={3} placeholder="Describe your idea, timeline, or project. The more detail, the better." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} style={{ ...inputStyle("message"), resize: "none" as const, lineHeight: 1.6, display: "block", minHeight: 88 }} />
            </div>
          </div>
          {error && <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "8px", fontSize: "11.5px", fontWeight: 300, color: "rgba(255,120,120,0.9)", letterSpacing: "-0.01em" }}>{error}</div>}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", gap: 12, marginTop: 20, paddingTop: 16 }}>
            <span style={{ fontSize: "10.5px", fontWeight: 300, color: D.textFaint, letterSpacing: "-0.01em" }}>By submitting, you agree to our privacy policy.</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <a href="mailto:hello@kern.studio" style={{ fontSize: "10.5px", fontWeight: 300, color: D.textMuted, textDecoration: "none", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = D.text)} onMouseLeave={e => (e.currentTarget.style.color = D.textMuted)}>
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11v8h-11v-8zm0 0l5.5 4.5 5.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                hello@kern.studio
              </a>
              <button onClick={handleSubmit} disabled={loading}
                style={{ display: "inline-flex", alignItems: "center", gap: 7, background: loading ? D.surfaceHover : D.text, color: loading ? D.textMuted : "#0a0a0a", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "12px", fontWeight: 500, letterSpacing: "-0.01em", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.18s", whiteSpace: "nowrap" as const, opacity: loading ? 0.7 : 1 }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "rgba(240,240,240,0.85)"; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = D.text; }}
              >
                {loading ? (<><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.7s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>Sending…</>) : "→ Send message"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function KernSite() {
  const { ref: rootRef, w } = useContainerWidth();
  const isMobile = w < 640;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); lenisRef.current = null; };
  }, []);

  useEffect(() => {
    function handleAnchorClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      setMobileMenuOpen(false);
      if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { offset: -64, duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { offset: -64, duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={rootRef} style={{ minHeight: "100vh", background: D.bg, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-font-smoothing: antialiased; }
        body { background: #0a0a0a; }
        ::selection { background: rgba(77,159,255,0.15); }
        input::placeholder  { color: rgba(255,255,255,0.22); }
        textarea::placeholder { color: rgba(255,255,255,0.22); }
        @keyframes ofw-ping    { 75%, 100% { transform: scale(2); opacity: 0; } }
        @property --angle      { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes spin-border { 0% { --angle: 0deg; } 100% { --angle: 360deg; } }
        @keyframes spin        { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        *::-webkit-scrollbar { display: none; width: 0; height: 0; }
        * { scrollbar-width: none; }
      `}</style>

      {/* ══════ STICKY TOP NAVBAR ══════ */}
      <header style={{ position: "sticky", top: 0, zIndex: 999, background: "transparent", borderBottom: "none", transition: "background 0.3s ease, border-color 0.3s ease" }}>
        <div style={{ padding: "0 32px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "normal", fontSize: "16px", fontWeight: 600, color: D.text, textDecoration: "none", letterSpacing: "-0.02em", flexShrink: 0 }}>
            Kern
          </a>
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
              {NAV_ITEMS.map(item => <NavItem key={item.label} item={item} />)}
            </nav>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {!isMobile && (
              <button onClick={scrollToContact}
                style={{ fontSize: "11.5px", fontWeight: 500, color: "#0a0a0a", background: D.text, border: "none", borderRadius: "9999px", padding: "8px 18px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(240,240,240,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.background = D.text)}>
                Start a project
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
            {isMobile && (
              <button onClick={() => setMobileMenuOpen(o => !o)}
                style={{ width: 36, height: 36, background: "rgba(255,255,255,0.06)", border: `1px solid ${D.border}`, borderRadius: "10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", alignItems: "center", justifyContent: "center" }}>
                <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }} style={{ display: "block", height: "1.5px", background: "rgba(255,255,255,0.8)", borderRadius: "2px", transformOrigin: "center", width: 14 }} />
                <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1, scaleX: mobileMenuOpen ? 0 : 1 }} style={{ display: "block", height: "1.5px", background: "rgba(255,255,255,0.8)", borderRadius: "2px", width: 10 }} />
                <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }} style={{ display: "block", height: "1.5px", background: "rgba(255,255,255,0.8)", borderRadius: "2px", transformOrigin: "center", width: 14 }} />
              </button>
            )}
          </div>
        </div>
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", borderTop: `1px solid ${D.border}` }}>
              <div style={{ padding: "12px 20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV_ITEMS.map(item => (
                  <a key={item.label} href={item.href ?? "#"}
                    style={{ fontSize: "14px", fontWeight: 400, color: D.textMuted, textDecoration: "none", letterSpacing: "-0.02em", padding: "10px 12px", borderRadius: "10px", transition: "all 0.15s", display: "block" }}
                    onMouseEnter={e => { e.currentTarget.style.color = D.text; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = D.textMuted; e.currentTarget.style.background = "transparent"; }}
                    onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <button onClick={scrollToContact}
                  style={{ marginTop: 8, fontSize: "13px", fontWeight: 500, color: "#0a0a0a", background: D.text, border: "none", borderRadius: "10px", padding: "12px 16px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", textAlign: "center" as const }}>
                  Start a project →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════ HERO ══════ */}
      <section style={{ padding: isMobile ? "12px 12px 0" : "12px 20px 0", maxWidth: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: isMobile ? "100vw" : "calc(100vh - 82px)", borderRadius: isMobile ? "16px" : "20px", overflow: "hidden", background: "#000" }}>
          <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }}>
            <source src={bgVideo} type="video/webm" />
          </video>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
        </div>
      </section>

      {/* ══════ PAGE CONTENT ══════ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>
          <ServicesSection isMobile={isMobile} />
          <ClientLogos />
          <WorkSection isMobile={isMobile} />
          <ProcessSection isMobile={isMobile} />
          <TestimonialsSection isMobile={isMobile} />
          <StudioSection isMobile={isMobile} />
          <FAQSection isMobile={isMobile} />
        </div>

        <CTASection isMobile={isMobile} />

        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ marginTop: isMobile ? "40px" : "56px" }}>
            <ContactDetailsStrip isMobile={isMobile} />
          </div>
          <ContactFormSection isMobile={isMobile} />
        </div>

        {/* ══════ FOOTER ══════ */}
        <footer style={{ background: "#070707", borderTop: `1px solid ${D.border}` }}>
          <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr", gap: isMobile ? "48px" : "0", padding: isMobile ? "56px 0 48px" : "72px 0 64px" }}>
              <div style={{ gridColumn: isMobile ? "1" : "1 / 2", paddingRight: isMobile ? 0 : 40 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "22px", fontWeight: 600, color: D.text, letterSpacing: "-0.04em", marginBottom: 14 }}>Kern</div>
                <p style={{ fontSize: "12px", fontWeight: 300, color: D.textMuted, lineHeight: 1.75, letterSpacing: "-0.01em", margin: "0 0 28px", maxWidth: 220 }}>
                  One-person design & development studio building digital products that last.
                </p>
                <div style={{ position: "relative", display: "inline-flex", padding: "1.5px", borderRadius: "980px", background: "conic-gradient(from var(--angle, 0deg), #f97316, #ec4899, #8b5cf6, #06b6d4, #f97316)", boxShadow: "0 0 14px rgba(139,92,246,0.3)", animation: "spin-border 3s linear infinite" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#070707", borderRadius: "980px", padding: "5px 12px" }}>
                    <span style={{ position: "relative", display: "flex", width: 6, height: 6 }}>
                      <span style={{ position: "absolute", display: "inline-flex", width: "100%", height: "100%", borderRadius: "50%", background: "#82D49F", opacity: 0.5, animation: "ofw-ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }} />
                      <span style={{ position: "relative", display: "inline-flex", borderRadius: "50%", width: 6, height: 6, background: "#82D49F" }} />
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: 400, color: D.textMuted, letterSpacing: "0.02em" }}>Open for work</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 20 }}>Services</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                  {["Web Application", "Web Design", "UI Design", "Product Development", "Product Design"].map(s => (
                    <a key={s} href="#" style={{ fontSize: "12px", fontWeight: 300, color: D.textMuted, textDecoration: "none", letterSpacing: "-0.01em", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = D.text)} onMouseLeave={e => (e.currentTarget.style.color = D.textMuted)}>{s}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 20 }}>Navigate</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                  {[{ label: "Work", href: "#work" }, { label: "Studio", href: "#studio" }, { label: "FAQ", href: "#faq" }, { label: "Contact", href: "#contact" }].map(l => (
                    <a key={l.label} href={l.href} style={{ fontSize: "12px", fontWeight: 300, color: D.textMuted, textDecoration: "none", letterSpacing: "-0.01em", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = D.text)} onMouseLeave={e => (e.currentTarget.style.color = D.textMuted)}>{l.label}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", color: D.textFaint, textTransform: "uppercase" as const, marginBottom: 20 }}>Connect</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                  {[
                    { label: "hello@kern.studio", href: "mailto:hello@kern.studio" },
                    { label: "Instagram", href: "https://www.instagram.com/kern.systems/" },
                    { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61588326717886" },
                    { label: "Threads",   href: "https://www.threads.com/@kern.systems" },
                  ].map(s => (
                    <a key={s.label} href={s.href} style={{ fontSize: "12px", fontWeight: 300, color: D.textMuted, textDecoration: "none", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = D.text)} onMouseLeave={e => (e.currentTarget.style.color = D.textMuted)}>{s.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: isMobile ? "40px 0 0" : "56px 0 0", overflow: "hidden" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: isMobile ? "clamp(80px, 22vw, 130px)" : "clamp(100px, 14vw, 180px)", fontWeight: 600, color: "rgba(255,255,255,0.03)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none" as const, whiteSpace: "nowrap" as const, marginLeft: "-0.02em" }}>
                Kern Studio
              </div>
            </div>
          </div>
          <div>
            <div style={{ maxWidth: "1020px", margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 12 : 0, padding: "20px 20px", borderTop: `1px solid ${D.border}` }}>
              <span style={{ fontSize: "10.5px", color: D.textFaint, fontWeight: 300, letterSpacing: "-0.01em" }}>© 2025 Kern Studio. All rights reserved.</span>
              <div style={{ display: "flex", gap: 20 }}>
                {["Privacy Policy", "Terms of Use"].map(l => (
                  <a key={l} href="#" style={{ fontSize: "10.5px", color: D.textFaint, fontWeight: 300, letterSpacing: "-0.01em", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = D.textMuted)} onMouseLeave={e => (e.currentTarget.style.color = D.textFaint)}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}