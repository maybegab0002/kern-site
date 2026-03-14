import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import LogoLoop from "../components/LogoLoop";
import omniportalImg from "../assets/omniportalbrowser.avif";
import kadizImg from "../assets/kadizbrowser.avif";
import skyviewVideo from "../assets/skyview.webm";
import { CircleDollarSignIcon } from "@/components/ui/circle-dollar-sign";
import { ClockIcon } from "@/components/ui/clock";
import { EarthIcon } from "@/components/ui/earth";
import { RefreshCWIcon } from "@/components/ui/refresh-cw";
import { RocketIcon } from "@/components/ui/rocket";

/* ── Responsive hook — measures the root element, works inside iframes ── */
function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(375);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setW(entry.contentRect.width);
    });
    ro.observe(ref.current);
    setW(ref.current.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);
  return { ref, w };
}

/* ── TextLoop ── */
function TextLoop({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span style={{
      display: "inline-block", position: "relative",
      verticalAlign: "bottom", perspective: "300px", textAlign: "center",
    }}>
      <span aria-hidden style={{
        display: "inline-block", visibility: "hidden",
        pointerEvents: "none", userSelect: "none",
      }}>
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <span style={{
        position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
            initial={{ y: 14, rotateX: 90, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -14, rotateX: -90, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 900, damping: 80, mass: 10 }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   FOUR-POINTED STAR (mirrors the sidebar logo mark)
───────────────────────────────────────────── */
function StarIcon({ size = 14, color = "#111" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1 C8 1 8.6 5.4 10.6 5.4 C12.6 5.4 15 8 15 8 C15 8 12.6 8 10.6 10.6 C8.6 12.6 8 15 8 15 C8 15 7.4 12.6 5.4 10.6 C3.4 8.6 1 8 1 8 C1 8 3.4 8 5.4 5.4 C7.4 3.4 8 1 8 1Z"
        fill={color}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAV DATA — grouped for the dropdown
───────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: "Services",
    href: "#services",
    dropdown: [
      {
        group: "Digital",
        items: [
          { label: "Web Application", desc: "Full-stack products built to scale" },
          { label: "Web Design",      desc: "Pixel-precise, conversion-led design" },
          { label: "UI Design",       desc: "Interfaces that feel inevitable" },
          { label: "Product Development", desc: "From zero to launch, end to end" },
          { label: "Product Design",  desc: "Strategy and craft, shaped for users" },
        ],
      },

    ],
  },
  { label: "Work",    href: "#work",    dropdown: null },
  { label: "Studio",  href: "#studio",  dropdown: null },
  { label: "I'm Interested", href: "#contact", dropdown: null },
];

/* ─────────────────────────────────────────────
   DROPDOWN ITEM — with folder-style icon box
───────────────────────────────────────────── */
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
        background: hovered ? "rgba(0,0,0,0.04)" : "transparent",
        transition: "background 0.1s ease",
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: "7px", flexShrink: 0,
        background: hovered ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)",
        border: `1px solid ${hovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.07)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s ease",
      }}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="12" height="9" rx="2"
            stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
          <path d="M1 5.5h12"
            stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M1 5.5V4.5a1 1 0 011-1h3l1.5 1.5"
            stroke="rgba(0,0,0,0.4)" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <span style={{
          fontSize: "12px", color: hovered ? "#111" : "rgba(0,0,0,0.7)",
          fontWeight: 400, letterSpacing: "-0.02em",
          transition: "color 0.1s",
        }}>{item.label}</span>
        <span style={{
          fontSize: "10.5px", color: "rgba(0,0,0,0.35)",
          fontWeight: 300, letterSpacing: "-0.005em",
        }}>{item.desc}</span>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────
   DROPDOWN — grouped with section headers
───────────────────────────────────────────── */
function DropdownMenu({
  groups,
  visible,
}: {
  groups: { group: string; items: { label: string; desc: string }[] }[];
  visible: boolean;
}) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: "50%",
      transform: visible
        ? "translateX(-50%) translateY(0) scale(1)"
        : "translateX(-50%) translateY(-6px) scale(0.98)",
      background: "#fff",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(0,0,0,0.09)", borderRadius: "14px",
      padding: "8px", minWidth: "300px",
      opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none",
      transition: "opacity 0.18s ease, transform 0.18s cubic-bezier(0.16,1,0.3,1)",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 12px 28px -4px rgba(0,0,0,0.12)",
      zIndex: 100,
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute", top: "-5px", left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: "9px", height: "9px",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.09)",
        borderBottom: "none", borderRight: "none",
      }} />

      {groups.map((group, gi) => (
        <div key={group.group}>
          <div style={{
            padding: "6px 10px 4px",
            fontSize: "9px", fontWeight: 500, letterSpacing: "0.09em",
            textTransform: "uppercase" as const,
            color: "rgba(0,0,0,0.3)", marginTop: gi > 0 ? 4 : 0,
          }}>
            {group.group}
          </div>
          {group.items.map(item => (
            <DropdownItem key={item.label} item={item} />
          ))}
          {gi < groups.length - 1 && (
            <div style={{ margin: "6px 10px", height: "1px", background: "rgba(0,0,0,0.06)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV ITEM — active indicator dot REMOVED
───────────────────────────────────────────── */
function NavItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }}
      onMouseLeave={() => { timeout.current = setTimeout(() => setOpen(false), 120); }}
    >
      <a href={item.href ?? "#"} style={{
        display: "flex", alignItems: "center", gap: "4px",
        fontSize: "12px",
        color: open ? "#000" : "#111",
        textDecoration: "none", fontWeight: 500,
        letterSpacing: "-0.02em", padding: "6px 12px",
        borderRadius: "6px",
        background: open ? "rgba(0,0,0,0.05)" : "transparent",
        transition: "color 0.15s, background 0.15s", whiteSpace: "nowrap",
      }}
      >
        {item.label}
        {item.dropdown && (
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" style={{
            opacity: 0.4, marginTop: "1px", flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
          }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </a>

      {item.dropdown && <DropdownMenu groups={item.dropdown} visible={open} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────── */
function MobileNavItem({
  item, index, onClose,
}: {
  item: typeof NAV_ITEMS[0]; index: number; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => item.dropdown ? setExpanded(e => !e) : onClose()}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "12px 0",
          background: "none", border: "none",
          borderBottom: "none",
          cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left",
        }}
      >
        <span style={{
          display: "flex", alignItems: "center", gap: 10,
          fontSize: "14px", fontWeight: 400, color: "#111", letterSpacing: "-0.02em",
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: "7px",
            background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <StarIcon size={10} color="rgba(0,0,0,0.35)" />
          </span>
          {!item.dropdown ? (
            <a href={item.href ?? "#"} style={{ color: "inherit", textDecoration: "none" }} onClick={onClose}>{item.label}</a>
          ) : item.label}
        </span>
        {item.dropdown && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ color: "rgba(0,0,0,0.25)", display: "flex" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {item.dropdown && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            {item.dropdown.flatMap(g => g.items.map(sub => (
              <a
                key={sub.label}
                href="#"
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 0 9px 38px",
                  fontSize: "13px", fontWeight: 300,
                  color: "rgba(0,0,0,0.55)", textDecoration: "none",
                  letterSpacing: "-0.01em",
                  borderLeft: "1px solid rgba(0,0,0,0.08)",
                  marginLeft: "13px", position: "relative",
                }}
              >
                <span style={{
                  position: "absolute", left: 0, top: "50%",
                  width: 18, height: 1, background: "rgba(0,0,0,0.08)",
                }} />
                {sub.label}
              </a>
            )))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", top: "60px", left: 0, right: 0, zIndex: 49,
            background: "rgba(248,248,248,0.97)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderBottom: "none",
            padding: "4px 20px 20px",
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <MobileNavItem key={item.label} item={item} index={i} onClose={onClose} />
          ))}
          <div style={{ marginTop: "16px", paddingTop: "16px" }}>
            <OfwButton />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   OFW BUTTON — green circle dot + colorful animated stroke
───────────────────────────────────────────── */
function OfwButton() {
  const [hovered, setHovered] = useState(false);
  const lineH = 15;
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Colorful animated conic-gradient border */}
      <div style={{
        position: "absolute",
        inset: "-2px",
        borderRadius: "980px",
        background: "conic-gradient(from var(--angle, 0deg), #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff, #ff6b6b)",
        animation: "spin-border 2.8s linear infinite",
        zIndex: 0,
        opacity: hovered ? 1 : 0.75,
        transition: "opacity 0.2s",
      }} />
      {/* Inner mask to create border effect */}
      <div style={{
        position: "absolute",
        inset: "-2px",
        borderRadius: "980px",
        background: "transparent",
        zIndex: 0,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: "2px",
          borderRadius: "980px",
          background: hovered ? "#1a1a1a" : "#111",
          zIndex: 1,
        }} />
      </div>

      <button
        onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex", alignItems: "center", gap: 6,
          background: hovered ? "#1a1a1a" : "#111",
          color: "#fff", border: "none", borderRadius: "980px",
          padding: "7px 14px 7px 10px",
          fontSize: "11.5px", fontWeight: 500, letterSpacing: "0em",
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
          transition: "background 0.18s",
        }}
      >
        {/* Green pulsing circle replacing star icon */}
        <span style={{ position: "relative", display: "flex", width: 8, height: 8, flexShrink: 0 }}>
          <span style={{
            position: "absolute",
            display: "inline-flex",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#4ade80",
            opacity: 0.6,
            animation: "ofw-ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
          }} />
          <span style={{
            position: "relative",
            display: "inline-flex",
            borderRadius: "50%",
            width: 8,
            height: 8,
            background: "#4ade80",
          }} />
        </span>

        <span style={{ display: "block", height: lineH, overflow: "hidden", position: "relative" }}>
          <motion.span
            style={{ display: "block" }}
            animate={{ y: hovered ? -lineH : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ display: "flex", alignItems: "center", height: lineH }}>Open for work</span>
            <span style={{ display: "flex", alignItems: "center", height: lineH }}>Open for work</span>
          </motion.span>
        </span>
      </button>
    </div>
  );
}

/* ── Quote Button ── */
function QuoteBtn() {
  const [hovered, setHovered] = useState(false);
  const currencies = ["$", "€", "£", "¥", "₱"];
  const prices     = ["2,000", "5,000", "10,000", "20,000", "50,000"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % currencies.length), 1800);
    return () => clearInterval(id);
  }, []);
  const lineH = 15;
  return (
    <button
      onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        background: hovered ? "#2a2a2a" : "#111",
        color: "#fff", border: "none", borderRadius: "980px",
        padding: "9px 16px 9px 12px",
        fontSize: "11px", fontWeight: 400, letterSpacing: "-0.01em",
        cursor: "pointer", fontFamily: "'Inter', sans-serif",
        transition: "background 0.18s, box-shadow 0.18s", whiteSpace: "nowrap",
        boxShadow: hovered ? "0 6px 16px rgba(0,0,0,0.22)" : "0 1px 4px rgba(0,0,0,0.12)",
      }}
    >
      <span style={{ display: "block", height: lineH, overflow: "hidden", position: "relative", minWidth: "10px" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={"cur-" + idx} style={{ display: "block", lineHeight: lineH + "px", fontWeight: 500 }}
            initial={{ y: lineH, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -lineH, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >{currencies[idx]}</motion.span>
        </AnimatePresence>
      </span>
      <span style={{ display: "block", height: lineH, overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={"price-" + idx} style={{ display: "block", lineHeight: lineH + "px" }}
            initial={{ y: lineH, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -lineH, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
          >{prices[idx]}</motion.span>
        </AnimatePresence>
      </span>
      <span style={{ opacity: 0.2, fontSize: "9px", margin: "0 1px" }}>—</span>
      <span style={{ display: "block", height: lineH, overflow: "hidden", position: "relative" }}>
        <motion.span style={{ display: "block" }}
          animate={{ y: hovered ? -lineH : 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ lineHeight: lineH + "px" }}>Get a quote</span>
            <span style={{ lineHeight: lineH + "px" }}>Get a quote</span>
          </span>
        </motion.span>
      </span>
    </button>
  );
}

/* ── Slide Button ── */
function SlideBtn({ label, dark = false, light = false, icon, href }: {
  label: string; dark?: boolean; light?: boolean; icon?: React.ReactNode; href?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Tag: any = href ? "a" : "button";
  return (
    <Tag href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        borderRadius: "980px", cursor: "pointer", textDecoration: "none",
        padding: dark ? "10px 24px" : light ? "7px 0" : "7px 6px 7px 0",
        background: dark ? (hovered ? "#2a2a2a" : "#111") : "transparent",
        border: "none", fontFamily: "'Inter', sans-serif",
        fontSize: "11px", fontWeight: 400, letterSpacing: "-0.01em",
        color: dark ? "#f5f5f5" : light ? (hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)") : (hovered ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.4)"),
        transition: "background 0.2s, color 0.2s",
        overflow: "hidden", position: "relative",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", height: "1.15em", overflow: "hidden", lineHeight: "1.15em" }}>
        <motion.span style={{ display: "block", whiteSpace: "nowrap" }}
          animate={{ y: hovered ? "-100%" : "0%" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >{label}</motion.span>
        <motion.span aria-hidden style={{ display: "block", whiteSpace: "nowrap" }}
          animate={{ y: hovered ? "-100%" : "0%" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >{label}</motion.span>
      </span>
      {icon && (
        <motion.span style={{ display: "flex", alignItems: "center" }}
          animate={{ x: hovered ? 3 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >{icon}</motion.span>
      )}
    </Tag>
  );
}


/* ════════ STATEMENT SECTION ════════ */
function StatementSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: isMobile ? "56px 4px" : "72px 48px",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={vis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "inline-flex", alignItems: "center",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "980px", padding: "5px 14px",
          fontSize: "10px", fontWeight: 400, letterSpacing: "0.04em",
          color: "rgba(0,0,0,0.45)", marginBottom: 28,
        }}
      >
        Our work
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={vis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        style={{
          fontSize: isMobile ? "clamp(22px,7vw,28px)" : "clamp(24px,3vw,36px)",
          fontWeight: 600, color: "#111",
          letterSpacing: "-0.04em", lineHeight: 1.06,
          maxWidth: isMobile ? "100%" : 520,
          margin: "0 0 20px",
        }}
      >
        We build products that are{" "}
        <span style={{ color: "#0169C2" }}>fast,</span>{" "}
        <span style={{ color: "#0169C2" }}>precise,</span>{" "}
        <span style={{ color: "#0169C2" }}>and built to last.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={vis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          fontSize: isMobile ? "12px" : "13px",
          fontWeight: 300, color: "rgba(0,0,0,0.38)",
          lineHeight: 1.8, letterSpacing: "-0.01em",
          maxWidth: isMobile ? "100%" : 460,
          margin: 0,
        }}
      >
        We go all out — designing, engineering, and shipping digital products
        with the craft and speed that modern businesses actually need.
      </motion.p>
    </section>
  );
}

const PROJECTS = [
  {
    id: 1, index: "01", client: "Henceforth Group of Companies",
    slug: "Document intelligence for legal teams",
    services: ["UI Design", "Web App"], year: "2025",
    desc: "Zero to launch. We designed the full system — identity, onboarding, and a dashboard that turns 80-page contracts into a single answer.",
    stat: { value: "3×", label: "faster contract review" },
    thumbnail: omniportalImg,
    projectName: "Omniportal Web Application",
    tools: "Figma  |  UI Design",
    development: "React · TypeScript · Tailwind CSS · Lucide Icons · Supabase · Node.js",

  },
  {
    id: 2, index: "02", client: "Kadiz",
    slug: "Point of Sale system for retail",
    services: ["UI Design", "Web App"], year: "2025",
    desc: "A full-featured POS system built for modern retail. We designed and developed the entire product from the ground up.",
    stat: { value: "4.8★", label: "App Store rating" },
    thumbnail: kadizImg,
    projectName: "Kadiz POS",
    tools: "Figma  |  UI Design",
    development: "React · TypeScript · Tailwind CSS · Supabase",
  },
];

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      style={{}}
    >
      {/* Image card */}
      <div style={{
        background: "transparent",
        borderRadius: "20px",
        overflow: "hidden",
        height: "520px",
        position: "relative",
        border: "1px solid rgba(0,0,0,0.1)",
      }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {project.thumbnail
            ? (project.id === 3 || project.id === 4)
              ? <div style={{ width: "85%", height: "85%", borderRadius: "16px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={project.thumbnail} alt={project.client} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              : <img src={project.thumbnail} alt={project.client} style={{ width: "85%", height: "85%", objectFit: "contain", display: "block" }} />
            : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }} viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
                  {Array.from({ length: 41 }).map((_, i) => <line key={"v"+i} x1={i*20} y1="0" x2={i*20} y2="520" stroke="#111" strokeWidth="0.5" />)}
                  {Array.from({ length: 27 }).map((_, i) => <line key={"h"+i} x1="0" y1={i*20} x2="800" y2={i*20} stroke="#111" strokeWidth="0.5" />)}
                </svg>
                <span style={{ fontSize: "140px", fontWeight: 700, color: "#111", opacity: 0.07, letterSpacing: "-0.04em", userSelect: "none" as const }}>
                  {project.index}
                </span>
              </div>
            )
          }
        </div>
      </div>

      {/* Metadata footer — outside the card, below */}
      <div style={{
        padding: "12px 2px 0",
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 2fr",
        alignItems: "flex-start",
        gap: 16,
      }}>
        {/* Project name + year */}
        <div>
          <div style={{ fontSize: "10.5px", fontWeight: 500, color: "#111", letterSpacing: "-0.02em", marginBottom: 2 }}>
            {project.projectName}
          </div>
          <div style={{ fontSize: "9.5px", fontWeight: 300, color: "rgba(0,0,0,0.38)", letterSpacing: "-0.01em" }}>
            {project.year}
          </div>
        </div>

        {/* Client */}
        <div>
          <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.07em", color: "rgba(0,0,0,0.28)", textTransform: "uppercase" as const, marginBottom: 4 }}>Client</div>
          <div style={{ fontSize: "10px", fontWeight: 400, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.4 }}>{project.client}</div>
        </div>

        {/* Tools */}
        <div>
          <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.07em", color: "rgba(0,0,0,0.28)", textTransform: "uppercase" as const, marginBottom: 4 }}>Tools</div>
          <div style={{ fontSize: "10px", fontWeight: 400, color: "#111", letterSpacing: "-0.02em" }}>{project.tools}</div>
        </div>

        {/* Development */}
        {"development" in project && project.development && (
          <div>
            <div style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.07em", color: "rgba(0,0,0,0.28)", textTransform: "uppercase" as const, marginBottom: 4 }}>Development</div>
            <div style={{ fontSize: "9.5px", fontWeight: 300, color: "rgba(0,0,0,0.55)", letterSpacing: "-0.01em", lineHeight: 1.5 }}>{(project as any).development}</div>
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
    <section id="work" style={{ paddingTop: isMobile ? 60 : 88, paddingBottom: isMobile ? 60 : 88 }}>
      <motion.div ref={headerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={vis ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: isMobile ? "0 4px 36px" : "0 0 48px", display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" as const }}
      >
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 8 }}>
          Selected work
        </div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 6px" }}>
          What we've shipped.
        </h2>
        <p style={{ fontSize: "12.5px", fontWeight: 300, color: "rgba(0,0,0,0.4)", lineHeight: 1.75, letterSpacing: "-0.01em", maxWidth: 420 }}>
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

/* ════════ SERVICES — Bento grid with GlassIcons ════════ */
const SERVICES = [
  { id: "web-app",    title: "Web Application",      desc: "Full-stack products built to scale. From architecture to deployment — we own the whole thing.",  tag: "Development" },
  { id: "web-design", title: "Web & Mobile",          desc: "Transforming ideas into exceptional web and mobile app experiences that convert.",                  tag: "Design"      },
  { id: "ui",         title: "UI Design",              desc: "Interfaces that feel inevitable. Components, systems, and interactions that just work.",            tag: "Design"      },
  { id: "product-dev", title: "Product Development",  desc: "From zero to launch. We plan, build, and ship complete digital products end to end.",              tag: "Development" },
  { id: "product-design", title: "Product Design",    desc: "Strategy meets craft. We shape product vision, flows, and systems that users actually love.",      tag: "Design"      },

];

/* ── Service item — simple list row ── */
function ServiceItem({
  service, index, delay,
}: {
  service: typeof SERVICES[0]; index: number; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "baseline", gap: 24,
        padding: "20px 0",
        borderTop: "none",
        cursor: "default",
        transition: "opacity 0.2s",
      }}
    >
      {/* Index */}
      <span style={{
        fontSize: "10px", fontWeight: 400, color: "rgba(0,0,0,0.25)",
        letterSpacing: "0.04em", flexShrink: 0, width: 20,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <span style={{
        fontSize: "16px", fontWeight: 500, color: hovered ? "#0169C2" : "#111",
        letterSpacing: "-0.03em", lineHeight: 1.2, flexShrink: 0,
        transition: "color 0.18s",
        minWidth: 180,
      }}>
        {service.title}
      </span>

      {/* Desc — hidden on mobile */}
      <span style={{
        fontSize: "12px", fontWeight: 300, color: "rgba(0,0,0,0.38)",
        letterSpacing: "-0.01em", lineHeight: 1.6, flex: 1,
      }}>
        {service.desc}
      </span>

      {/* Tag */}
      <span style={{
        fontSize: "9px", fontWeight: 400, letterSpacing: "0.07em",
        textTransform: "uppercase" as const,
        color: "rgba(0,0,0,0.25)", flexShrink: 0,
      }}>
        {service.tag}
      </span>
    </motion.div>
  );
}

function ServicesSection({ isMobile }: { isMobile: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = headerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ padding: isMobile ? "64px 0 72px" : "88px 0 96px" }}>
      <motion.div ref={headerRef} initial={{ opacity: 0, y: 12 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 40, display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 8 }}>What we do</div>
          <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>Five ways we can help.</h2>
        </div>
        <a href="#contact" style={{ fontSize: "11px", fontWeight: 400, color: "rgba(0,0,0,0.35)", letterSpacing: "-0.01em", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, flexShrink: 0, transition: "color 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#111")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}>
          Get a quote
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </motion.div>

      {/* List */}
      <div>
        {SERVICES.map((s, i) => (
          <ServiceItem key={s.id} service={s} index={i} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}

/* ════════ CLIENT LOGO LOOP ════════ */
const LOGO_STYLE = { padding: "0 15px", height: 28, width: "auto", opacity: 0.6, filter: "grayscale(100%)" };
const CLIENT_LOGOS = [

  { node: <img src="/logos/anthropic_white.svg"    alt="Anthropic"      style={LOGO_STYLE} />, title: "Anthropic" },
  { node: <img src="/logos/chartjs.svg"            alt="Chart.js"       style={LOGO_STYLE} />, title: "Chart.js" },
  { node: <img src="/logos/claude-ai-icon.svg"     alt="Claude"         style={LOGO_STYLE} />, title: "Claude" },
  { node: <img src="/logos/cursor_light.svg"       alt="Cursor"         style={LOGO_STYLE} />, title: "Cursor" },
  { node: <img src="/logos/electron.svg"           alt="Electron"       style={LOGO_STYLE} />, title: "Electron" },
  { node: <img src="/logos/expressjs.svg"          alt="Express.js"     style={LOGO_STYLE} />, title: "Express.js" },
  { node: <img src="/logos/figma.svg"              alt="Figma"          style={LOGO_STYLE} />, title: "Figma" },
  { node: <img src="/logos/firebase.svg"           alt="Firebase"       style={LOGO_STYLE} />, title: "Firebase" },
  { node: <img src="/logos/flutter.svg"            alt="Flutter"        style={LOGO_STYLE} />, title: "Flutter" },
  { node: <img src="/logos/framer.svg"             alt="Framer"         style={LOGO_STYLE} />, title: "Framer" },
  { node: <img src="/logos/github_light.svg"       alt="GitHub"         style={LOGO_STYLE} />, title: "GitHub" },
  { node: <img src="/logos/godaddy.svg"            alt="GoDaddy"        style={LOGO_STYLE} />, title: "GoDaddy" },
  { node: <img src="/logos/html5.svg"              alt="HTML5"          style={LOGO_STYLE} />, title: "HTML5" },

  { node: <img src="/logos/kubernetes.svg"         alt="Kubernetes"     style={LOGO_STYLE} />, title: "Kubernetes" },
  { node: <img src="/logos/nextjs_icon_dark.svg"   alt="Next.js"        style={LOGO_STYLE} />, title: "Next.js" },
  { node: <img src="/logos/nodejs.svg"             alt="Node.js"        style={LOGO_STYLE} />, title: "Node.js" },
  { node: <img src="/logos/openai.svg"             alt="OpenAI"         style={LOGO_STYLE} />, title: "OpenAI" },


  { node: <img src="/logos/python.svg"             alt="Python"         style={LOGO_STYLE} />, title: "Python" },
  { node: <img src="/logos/react_light.svg"        alt="React"          style={LOGO_STYLE} />, title: "React" },
  { node: <img src="/logos/resend-icon-black.svg"  alt="Resend"         style={LOGO_STYLE} />, title: "Resend" },
  { node: <img src="/logos/shadcn-ui.svg"          alt="shadcn/ui"      style={LOGO_STYLE} />, title: "shadcn/ui" },
  { node: <img src="/logos/supabase.svg"           alt="Supabase"       style={LOGO_STYLE} />, title: "Supabase" },
  { node: <img src="/logos/tailwindcss.svg"        alt="Tailwind CSS"   style={LOGO_STYLE} />, title: "Tailwind CSS" },
  { node: <img src="/logos/typescript.svg"         alt="TypeScript"     style={LOGO_STYLE} />, title: "TypeScript" },
  { node: <img src="/logos/vite.svg"               alt="Vite"           style={LOGO_STYLE} />, title: "Vite" },
];

function ClientLogos() {
  return (
    <section style={{ padding: "64px 0 64px" }}>
      <div style={{ padding: "0 48px", marginBottom: "40px", textAlign: "center" as const }}>
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 8 }}>
          Trusted by
        </div>
      </div>
      <div style={{ height: 48, position: "relative", overflow: "hidden" }}>
        <LogoLoop logos={CLIENT_LOGOS} speed={80} direction="left" gap={100} hoverSpeed={0} scaleOnHover={false} fadeOut fadeOutColor="#f5f5f5" ariaLabel="Clients and partners" />
      </div>
    </section>
  );
}

/* ════════ PROCESS ════════ */
const STEPS = [
  { num: "01", title: "Brief", desc: "We align on goals, scope, and what success actually looks like — whether it's a brand, a product, or anything in between." },
  { num: "02", title: "Concept", desc: "Ideas become tangible fast. You see early directions — moodboards, wireframes, or identity explorations — before we go deep." },
  { num: "03", title: "Craft", desc: "This is where the real work happens. Design and execution in one continuous loop, refined until every detail is right." },
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
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={headerVis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: isMobile ? 48 : 72 }}
      >
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 8 }}>How we work</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>From brief to launch.</h2>
      </motion.div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
        {STEPS.map((step, i) => {
          const active = activeStep === i;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 10 }}
              animate={headerVis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              onClick={() => setActiveStep(i)}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "32px 1fr" : "52px 1fr 1fr",
                gap: isMobile ? "0 16px" : "0 32px",
                padding: isMobile ? "24px 0" : "32px 0",
                cursor: "pointer",
                borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                alignItems: "start",
              }}
            >
              {/* Number */}
              <motion.span
                animate={{ color: active ? "#111" : "rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.04em", paddingTop: isMobile ? 3 : 4, fontVariantNumeric: "tabular-nums" as any }}
              >
                {step.num}
              </motion.span>

              {/* Title */}
              <motion.h3
                animate={{ color: active ? "#111" : "rgba(0,0,0,0.28)" }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}
              >
                {step.title}
              </motion.h3>

              {/* Desc — beside title on desktop, below on mobile */}
              <motion.p
                animate={{ color: active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: "12.5px", fontWeight: 300, lineHeight: 1.75,
                  letterSpacing: "-0.01em", margin: 0,
                  gridColumn: isMobile ? "2 / 3" : "auto",
                  marginTop: isMobile ? 8 : 0,
                  paddingTop: isMobile ? 0 : 3,
                }}
              >
                {step.desc}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ════════ TESTIMONIALS ════════ */
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
      return [{ text: part.text.slice(0, idx), highlight: false }, { text: h, highlight: true }, { text: part.text.slice(idx + h.length), highlight: false }].filter(p => p.text);
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
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 8 }}>Kind words</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>What clients say.</h2>
      </div>
      <div style={{ maxWidth: 580, width: "100%", position: "relative", height: isMobile ? 220 : 180 }}>
        <AnimatePresence mode="wait">
          <motion.p key={active} initial={{ opacity: 0, y: dir * 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: dir * -16 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", inset: 0, fontSize: isMobile ? "16px" : "20px", fontWeight: 400, color: "#111", lineHeight: 1.65, letterSpacing: "-0.025em", textAlign: "center" as const, margin: 0, display: "block" }}>
            {parts.map((p, i) => p.highlight ? <span key={i} style={{ color: "#0169C2", fontStyle: "italic" }}>{p.text}</span> : <React.Fragment key={i}>{p.text}</React.Fragment>)}
          </motion.p>
        </AnimatePresence>
      </div>
      <div style={{ position: "relative", height: 56, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12, marginBottom: 28 }}>
        <AnimatePresence mode="wait">
          <motion.div key={"attr-" + active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ position: "absolute", textAlign: "center" as const }}>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "#111", letterSpacing: "-0.02em" }}>{t.name}</div>
            <div style={{ fontSize: "10.5px", fontWeight: 300, color: "rgba(0,0,0,0.35)", marginTop: 3 }}>{t.role}</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {TESTIMONIALS.map((tes, i) => (
          <button key={tes.id} onClick={() => goTo(i)} style={{ width: i === active ? 44 : 32, height: i === active ? 44 : 32, borderRadius: "10px", border: i === active ? "2px solid #111" : "2px solid rgba(0,0,0,0.1)", background: i === active ? "#111" : "rgba(0,0,0,0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0, opacity: Math.abs(i - active) > 1 ? 0.4 : 1, fontSize: i === active ? "11px" : "9px", fontWeight: 600, color: i === active ? "#fff" : "rgba(0,0,0,0.35)", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em" }}>
            {tes.initials}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 24, width: 48, height: 2, background: "rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div key={active} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} style={{ height: "100%", background: "#111", borderRadius: 2 }} />
      </div>
    </section>
  );
}

/* ════════ STUDIO / ABOUT ════════ */
function StudioSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const stats = [{ value: "4+", label: "Years of practice" }, { value: "30+", label: "Projects shipped" }, { value: "3", label: "Continents served" }];
  const socials = [{ label: "Instagram", href: "https://www.instagram.com/kern.systems/" }, { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61588326717886" }, { label: "Threads", href: "https://www.threads.com/@kern.systems" }];
  return (
    <section id="studio" style={{ padding: isMobile ? "64px 4px" : "88px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" as const }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 16 }}>The studio</motion.div>
      <motion.h2 initial={{ opacity: 0, y: 14 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
        style={{ fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.08, margin: "0 0 20px", maxWidth: 520 }}>
        One person.<br /><span style={{ color: "#0169C2" }}>Full-studio</span> output.
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.13 }}
        style={{ fontSize: "13px", fontWeight: 300, color: "rgba(0,0,0,0.45)", lineHeight: 1.8, letterSpacing: "-0.01em", maxWidth: 440, margin: "0 0 48px" }}>
        Kern is a solo design and development studio operating remotely. I work with founders and teams who need the full picture — strategy, design, and engineering handled by one person who actually cares about the outcome.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        style={{ display: "flex", gap: isMobile ? 32 : 56, marginBottom: 48, flexWrap: "wrap" as const, justifyContent: "center" }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.07 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#111", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: "10px", fontWeight: 300, color: "rgba(0,0,0,0.35)", letterSpacing: "-0.01em" }}>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.32 }} style={{ display: "flex", gap: 6 }}>
        {socials.map(s => (
          <a key={s.label} href={s.href} style={{ fontSize: "10.5px", fontWeight: 400, color: "rgba(0,0,0,0.4)", textDecoration: "none", letterSpacing: "-0.01em", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "980px", padding: "5px 14px", transition: "all 0.15s ease" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "#111"; e.currentTarget.style.borderColor = "#111"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(0,0,0,0.4)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }}>
            {s.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

/* ════════ FAQ ════════ */
const FAQ_CATEGORIES = ["All", "General", "Pricing", "Process", "Design"];
const ICON_COMPONENTS = { Clock: ClockIcon, CircleDollarSign: CircleDollarSignIcon, Rocket: RocketIcon, RefreshCw: RefreshCWIcon, Earth: EarthIcon } as const;
type IconKey = keyof typeof ICON_COMPONENTS;
const FAQS: { q: string; a: string; category: string; icon: IconKey }[] = [
  { q: "How long does a typical project take?", a: "Depends on scope — a brand identity usually takes 2–3 weeks, a web design 3–4 weeks, and a full product build 6–12 weeks. We scope everything before we start so there are no surprises.", category: "Process", icon: "Clock" },
  { q: "What does it cost to work with Kern?", a: "Projects are priced per scope, not per hour. Most engagements start at $2,000 for design work and $5,000+ for full-stack builds. Get a quote and you'll have a number within 24 hours.", category: "Pricing", icon: "CircleDollarSign" },
  { q: "Do you work with early-stage startups?", a: "Yes — a lot of the best work happens at the zero-to-one stage. If you have a clear problem and a real budget, we'll make it work.", category: "General", icon: "Rocket" },
  { q: "Do you take on ongoing / retainer work?", a: "Yes. After a project wraps, some clients stay on a monthly retainer for design, development, or both. Slots are limited but worth asking about.", category: "Pricing", icon: "RefreshCw" },
  { q: "What if I only need design — no development?", a: "That's fine. Design-only engagements are a big part of what we do — UI, branding, graphic design, motion. You don't need the full stack to work together.", category: "Design", icon: "Earth" },
  { q: "How does the process work across time zones?", a: "Async-first. You'll get updates, files, and questions without needing to be online at the same time. For calls, we find an overlap that works — UTC+8 is surprisingly flexible.", category: "Process", icon: "Clock" },
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
    <motion.div initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const, fontFamily: "'Inter', sans-serif" }}>
        <div ref={iconRef} style={{ width: 34, height: 34, borderRadius: "9px", flexShrink: 0, background: open ? "#111" : "transparent", border: `1px solid ${open ? "#111" : "rgba(0,0,0,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.22s ease, border-color 0.22s ease", color: open ? "#fff" : "rgba(0,0,0,0.45)" }}>
          <Icon size={15} />
        </div>
        <span style={{ flex: 1, fontSize: "13px", fontWeight: 500, color: open ? "#111" : "rgba(0,0,0,0.7)", letterSpacing: "-0.02em", lineHeight: 1.4, transition: "color 0.2s" }}>{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ flexShrink: 0, color: open ? "#0169C2" : "rgba(0,0,0,0.25)", display: "flex" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "12.5px", fontWeight: 300, color: "rgba(0,0,0,0.5)", lineHeight: 1.8, letterSpacing: "-0.01em", padding: "0 0 20px 48px", margin: 0 }}>{item.a}</p>
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
        <div style={{ fontSize: "9.5px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, marginBottom: 10 }}>FAQ</div>
        <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 12px" }}>Frequently asked questions</h2>
        <p style={{ fontSize: "12.5px", fontWeight: 300, color: "rgba(0,0,0,0.4)", lineHeight: 1.75, margin: 0 }}>
          Can't find what you're looking for?{" "}
          <a href="#contact" style={{ color: "#0169C2", textDecoration: "none", fontWeight: 400, borderBottom: "1px solid rgba(1,105,194,0.3)" }}>Send us a message.</a>
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, justifyContent: "center", marginBottom: 32 }}>
        {FAQ_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ fontSize: "11px", fontWeight: cat === activeCategory ? 500 : 400, color: cat === activeCategory ? "#fff" : "rgba(0,0,0,0.5)", background: cat === activeCategory ? "#111" : "transparent", border: `1px solid ${cat === activeCategory ? "#111" : "rgba(0,0,0,0.12)"}`, borderRadius: "980px", padding: "5px 14px", cursor: "pointer", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em", transition: "all 0.2s ease" }}>{cat}</button>
        ))}
      </motion.div>
      <div style={{ width: "100%", maxWidth: 640 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {filtered.map((item, i) => <FAQItem key={item.q} item={item} index={i} visible={vis} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ════════ CTA SECTION ════════ */
function CTASection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaLoading, setCtaLoading] = useState(false);
  const [ctaStatus, setCtaStatus] = useState<"idle"|"success"|"error">("idle");
  const [ctaError, setCtaError] = useState("");

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  async function handleCtaSubmit() {
    if (!ctaEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaEmail)) {
      setCtaError("Please enter a valid email address."); return;
    }
    setCtaLoading(true);
    setCtaError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "d6e60692-5318-4b4d-b5ee-7e9e05fa37d8",
          name: ctaEmail,
          email: ctaEmail,
          subject: `New project interest from ${ctaEmail}`,
          message: `Someone wants to start a project.\n\nTheir email: ${ctaEmail}\n\nSource: CTA hero section`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCtaStatus("success");
        setCtaEmail("");
      } else {
        setCtaError("Something went wrong. Try again.");
      }
    } catch {
      setCtaError("Network error. Try again.");
    } finally {
      setCtaLoading(false);
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{ width: "100%", padding: isMobile ? "0 0" : "0 0" }}
    >
      <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>
        {/* Card — full video bg, centered content */}
        <div style={{
          position: "relative",
          width: "100%",
          minHeight: isMobile ? 340 : 420,
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Full video background */}
          <video
            autoPlay muted loop playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={skyviewVideo} type="video/webm" />
          </video>
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />

          {/* Centered content */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: isMobile ? "56px 24px" : "72px 40px" }}>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={vis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{
                fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 4.5vw, 58px)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 1.06,
                margin: "0 0 14px",
                maxWidth: 680,
              }}
            >
              Ready to start<br />your next project?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={vis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              style={{
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                letterSpacing: "-0.01em",
                maxWidth: 380,
                margin: "0 0 36px",
              }}
            >
              Free scoping call — we'll figure out exactly what you need and how we can help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={vis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              style={{ width: "100%", maxWidth: 420 }}
            >
              {ctaStatus === "success" ? (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "rgba(255,255,255,0.12)", borderRadius: "980px",
                  padding: "13px 24px", backdropFilter: "blur(8px)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="#4ade80" strokeWidth="1.2"/>
                    <path d="M4 7l2 2 4-4" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#fff", fontSize: "12px", fontWeight: 400, letterSpacing: "-0.01em" }}>Got it — we'll be in touch soon!</span>
                </div>
              ) : (
                <div style={{
                  display: "flex", alignItems: "center",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "980px",
                  padding: "5px 5px 5px 20px",
                  backdropFilter: "blur(12px)",
                  gap: 8,
                }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={ctaEmail}
                    onChange={e => { setCtaEmail(e.target.value); setCtaError(""); }}
                    style={{
                      flex: 1, background: "transparent", border: "none", outline: "none",
                      fontSize: "12px", fontWeight: 300, color: "#fff",
                      letterSpacing: "-0.01em", fontFamily: "'Inter', sans-serif",
                      minWidth: 0,
                    }}
                    onKeyDown={e => e.key === "Enter" && handleCtaSubmit()}
                  />
                  <button
                    onClick={handleCtaSubmit}
                    disabled={ctaLoading}
                    style={{
                      flexShrink: 0,
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: ctaLoading ? "rgba(255,255,255,0.7)" : "#fff",
                      color: "#0a0f1e",
                      border: "none", borderRadius: "980px",
                      padding: "9px 18px",
                      fontSize: "12px", fontWeight: 500,
                      letterSpacing: "-0.01em", cursor: ctaLoading ? "not-allowed" : "pointer",
                      fontFamily: "'Inter', sans-serif",
                      transition: "background 0.18s",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {ctaLoading ? "Sending…" : (
                      <>
                        Start a project
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
              {ctaError && (
                <p style={{ color: "rgba(255,100,100,0.9)", fontSize: "11px", marginTop: 8, letterSpacing: "-0.01em", textAlign: "center" }}>{ctaError}</p>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════ CONTACT DETAILS STRIP ════════ */
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
    { label: "Facebook", value: "Kern Systems", href: "https://www.facebook.com/profile.php?id=61588326717886" },
    { label: "Threads", value: "@kern.systems", href: "https://www.threads.com/@kern.systems" },
    { label: "Based in", value: "Manila, PH — Remote worldwide", href: null },
  ];
  return (
    <div ref={ref} style={{ padding: isMobile ? "0 4px 40px" : "0 0 48px" }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
        {items.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            style={{ padding: isMobile ? "18px 16px" : "20px 22px", borderRight: i % 2 === 0 ? "1px solid rgba(0,0,0,0.07)" : "none", borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
            <div style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(0,0,0,0.28)", textTransform: "uppercase" as const, marginBottom: 8 }}>{item.label}</div>
            {item.href ? (
              <a href={item.href} style={{ fontSize: isMobile ? "11.5px" : "12.5px", fontWeight: 400, color: "#111", textDecoration: "none", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0169C2")} onMouseLeave={e => (e.currentTarget.style.color = "#111")}>
                {item.value}
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}><path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ) : (
              <span style={{ fontSize: isMobile ? "11.5px" : "12.5px", fontWeight: 400, color: "#111", letterSpacing: "-0.02em" }}>{item.value}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ════════ BUDGET DROPDOWN ════════ */
function BudgetDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = [
    { label: "Under $2k",    sub: "Small tasks & quick wins" },
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
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: open ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
          border: `1px solid ${open ? "rgba(0,0,0,0.16)" : "rgba(255,255,255,0.9)"}`,
          boxShadow: open ? "0 0 0 3px rgba(1,105,194,0.07)" : "0 1px 2px rgba(0,0,0,0.04)",
          borderRadius: "8px", padding: "10px 13px", cursor: "pointer",
          fontSize: "12.5px", fontWeight: 300, color: value ? "#111" : "rgba(0,0,0,0.35)",
          fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em",
          transition: "all 0.15s", textAlign: "left" as const,
        }}
      >
        <span>{value || "Select range..."}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexShrink: 0, color: "rgba(0,0,0,0.35)" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 100,
              background: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(0,0,0,0.09)", borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
              overflow: "hidden", padding: "5px",
            }}
          >
            {options.map((opt) => {
              const selected = value === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => { onChange(opt.label); setOpen(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "9px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                    background: selected ? "rgba(1,105,194,0.06)" : "transparent",
                    fontFamily: "'Inter', sans-serif", textAlign: "left" as const,
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                >
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: selected ? 500 : 400, color: selected ? "#0169C2" : "#111", letterSpacing: "-0.02em" }}>{opt.label}</div>
                    <div style={{ fontSize: "10.5px", fontWeight: 300, color: "rgba(0,0,0,0.38)", marginTop: 1, letterSpacing: "-0.01em" }}>{opt.sub}</div>
                  </div>
                  {selected && (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M2.5 6.5l3 3 5-5" stroke="#0169C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════ CONTACT FORM SECTION ════════ */
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
    if (!form.name || !form.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "d6e60692-5318-4b4d-b5ee-7e9e05fa37d8",
          name: form.name,
          email: form.email,
          company: form.company,
          budget: form.budget,
          services: form.services.join(", "),
          message: form.message,
          subject: `New Project Inquiry from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%", background: focused === name ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
    border: `1px solid ${focused === name ? "rgba(0,0,0,0.16)" : "rgba(255,255,255,0.9)"}`,
    boxShadow: focused === name ? "0 0 0 3px rgba(1,105,194,0.07)" : "0 1px 2px rgba(0,0,0,0.04)",
    borderRadius: "8px", outline: "none", padding: "10px 13px",
    fontSize: "12.5px", fontWeight: 300, color: "#111", fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em", transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s", boxSizing: "border-box" as const,
  });
  const labelStyle: React.CSSProperties = { fontSize: "9px", fontWeight: 500, letterSpacing: "0.08em", color: "rgba(0,0,0,0.35)", textTransform: "uppercase" as const, marginBottom: 5, display: "block" };

  if (submitted) {
    return (
      <section ref={ref} style={{ padding: isMobile ? "40px 4px 80px" : "40px 0 100px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 4px 24px rgba(0,0,0,0.05)", padding: isMobile ? "48px 24px" : "64px 48px", display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" as const }}>
          <div style={{ width: 44, height: 44, borderRadius: "12px", background: "#0169C2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4.5 4.5L16 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 600, color: "#111", letterSpacing: "-0.04em", margin: "0 0 10px" }}>Message sent.</h3>
          <p style={{ fontSize: "12.5px", fontWeight: 300, color: "rgba(0,0,0,0.4)", lineHeight: 1.75, margin: 0, maxWidth: 300 }}>Thanks for reaching out — I'll get back within 24 hours.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ padding: isMobile ? "40px 4px 80px" : "40px 0 100px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.85)", overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "18px 20px" : "18px 28px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "rgba(255,255,255,0.4)" }}>
          <div>
            <div style={{ fontSize: "12.5px", fontWeight: 500, color: "#111", letterSpacing: "-0.02em" }}>New Project Inquiry</div>
            <div style={{ fontSize: "11px", fontWeight: 300, color: "rgba(0,0,0,0.38)", marginTop: 2, letterSpacing: "-0.01em" }}>I'll get back to you within 1 business day</div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(130,212,159,0.1)", border: "1px solid rgba(130,212,159,0.35)", borderRadius: "980px", padding: "4px 11px", flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            <span style={{ fontSize: "10px", fontWeight: 400, color: "rgba(0,0,0,0.45)", letterSpacing: "-0.01em" }}>Open for work</span>
          </div>
        </div>
        <div style={{ padding: isMobile ? "20px 20px 24px" : "24px 28px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>Full name *</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={inputStyle("name")} />
              </div>
              <div>
                <label style={labelStyle}>Business email *</label>
                <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={inputStyle("email")} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>Company</label>
                <input type="text" placeholder="Your company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} style={inputStyle("company")} />
              </div>
              <div>
                <label style={labelStyle}>Estimated budget</label>
                <BudgetDropdown value={form.budget} onChange={v => setForm(f => ({ ...f, budget: v }))} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>What do you need help with?</label>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, marginTop: 2 }}>
                {serviceOptions.map(s => {
                  const checked = form.services.includes(s);
                  return (
                    <label key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", background: checked ? "rgba(1,105,194,0.06)" : "rgba(255,255,255,0.45)", border: `1px solid ${checked ? "rgba(1,105,194,0.2)" : "rgba(255,255,255,0.85)"}`, borderRadius: "8px", cursor: "pointer", transition: "all 0.15s ease" }}
                      onMouseEnter={e => { if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.75)"; }}
                      onMouseLeave={e => { if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.45)"; }}>
                      <div onClick={() => toggleService(s)} style={{ width: 14, height: 14, borderRadius: "4px", flexShrink: 0, border: `1.5px solid ${checked ? "#0169C2" : "rgba(0,0,0,0.2)"}`, background: checked ? "#0169C2" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}>
                        {checked && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span onClick={() => toggleService(s)} style={{ fontSize: "12px", fontWeight: checked ? 400 : 300, color: checked ? "#111" : "rgba(0,0,0,0.55)", letterSpacing: "-0.01em", flex: 1, transition: "color 0.15s" }}>{s}</span>
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

          {/* Error message */}
          {error && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: "8px", fontSize: "11.5px", fontWeight: 300, color: "rgba(180,30,30,0.85)", letterSpacing: "-0.01em" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", gap: 12, marginTop: 20, paddingTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "10.5px", fontWeight: 300, color: "rgba(0,0,0,0.28)", letterSpacing: "-0.01em" }}>By submitting, you agree to our privacy policy.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <a href="mailto:hello@kern.studio" style={{ fontSize: "10.5px", fontWeight: 300, color: "rgba(0,0,0,0.35)", textDecoration: "none", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}>
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11v8h-11v-8zm0 0l5.5 4.5 5.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                hello@kern.studio
              </a>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ display: "inline-flex", alignItems: "center", gap: 7, background: loading ? "#555" : "#111", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "12px", fontWeight: 500, letterSpacing: "-0.01em", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif", transition: "background 0.18s", whiteSpace: "nowrap" as const, opacity: loading ? 0.7 : 1 }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#2a2a2a"; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#111"; }}
              >
                {loading ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.7s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Sending…
                  </>
                ) : "→ Send message"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ════════ FAN CARD STACK ════════ */
/* ════════ CTA SECTION ════════ */

/* ── Main ── */
export default function KernSite() {
  const { ref: rootRef, w } = useContainerWidth();
  const isMobile = w < 640;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const heroEl = document.getElementById("hero-sentinel");
      const currentY = window.scrollY;

      // Hide/show nav on scroll direction
      if (currentY > lastScrollY.current + 8 && currentY > 80) {
        setNavHidden(true);
      } else if (currentY < lastScrollY.current - 8) {
        setNavHidden(false);
      }
      lastScrollY.current = currentY;

      // Track if we're still over the hero
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom + window.scrollY;
        setIsOverHero(currentY < heroBottom - 80);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [headRef, subRef, ctaRef].forEach((r, i) => {
      if (!r.current) return;
      r.current.style.opacity = "0";
      r.current.style.transform = "translateY(12px)";
      r.current.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.05}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!r.current) return;
        r.current.style.opacity = "1";
        r.current.style.transform = "translateY(0)";
      }));
    });
  }, []);

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
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
      } else {
        (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div ref={rootRef} style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-font-smoothing: antialiased; }
        body { background: #f5f5f5; }
        ::selection { background: rgba(0,0,0,0.07); }
        
        @keyframes ofw-ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          0%   { --angle: 0deg; }
          100% { --angle: 360deg; }
        }
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* ════════ NAVBAR ════════ */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        background: isOverHero ? "transparent" : "rgba(245,245,245,0.92)",
        backdropFilter: isOverHero ? "none" : "blur(14px)",
        WebkitBackdropFilter: isOverHero ? "none" : "blur(14px)",
        borderBottom: isOverHero ? "none" : "1px solid rgba(0,0,0,0.06)",
        transform: navHidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease",
      }}>
        <nav style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 40px",
          height: isMobile ? 56 : 52,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Wordmark */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: isOverHero ? "#000" : "#111", letterSpacing: "-0.04em", transition: "color 0.4s ease" }}>Kern</span>
          </a>

          {/* Right — nav links + OfwButton + settings icon */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <>
                {NAV_ITEMS.map((item) => (
                  <NavItem key={item.label} item={item} />
                ))}
                <div style={{ width: 10 }} />
                <OfwButton />
              </>
            )}
            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {w > 425 && <OfwButton />}
                <button
                  onClick={() => setMobileMenuOpen(o => !o)}
                  style={{ width: 34, height: 34, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "8px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", alignItems: "center", justifyContent: "center" }}
                >
                  <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 5 : 0 }} style={{ display: "block", height: "1.5px", background: "#111", borderRadius: "2px", transformOrigin: "center", width: 14 }} />
                  <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1, scaleX: mobileMenuOpen ? 0 : 1 }} style={{ display: "block", height: "1.5px", background: "#111", borderRadius: "2px", width: 10 }} />
                  <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -5 : 0 }} style={{ display: "block", height: "1.5px", background: "#111", borderRadius: "2px", transformOrigin: "center", width: 14 }} />
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ════════ CONTENT ════════ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>
        </div>

        {/* ════ HERO ════ */}
        <section style={{
          position: "relative",
          width: "100%",
          background: "#f5f5f5",
          overflow: "hidden",
          marginTop: isMobile ? "-60px" : "-72px",
          minHeight: isMobile ? "100svh" : "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "100px 24px 64px" : "120px 56px 80px",
          boxSizing: "border-box",
        }}>
          {/* Sentinel for navbar color swap */}
          <div id="hero-sentinel" style={{ position: "absolute", top: "80%", height: 1, width: "100%", pointerEvents: "none" }} />

          {/* Noise texture overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, opacity: 0.018,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "128px 128px", pointerEvents: "none",
          }} />

          {/* Content wrapper */}
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1020px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

            {/* Headline */}
            <motion.h1
              ref={headRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontSize: isMobile ? "clamp(26px, 7.5vw, 36px)" : "clamp(34px, 4vw, 52px)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontOpticalSizing: "auto" as any,
                color: "#111",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                margin: "0 0 20px",
                maxWidth: 720,
              }}
            >
              A studio that<br /><span style={{ whiteSpace: "nowrap" as const }}>designs, builds, and <span style={{ color: "#0169C2" }}>ships.</span></span>
            </motion.h1>

            {/* Video block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              style={{
                width: "100%",
                height: isMobile ? "52vw" : "44vw",
                maxHeight: 560,
                minHeight: isMobile ? 200 : 320,
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                marginBottom: isMobile ? 20 : 24,
              }}
            >
              <video
                src={skyviewVideo}
                autoPlay muted loop playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.18) 100%)", pointerEvents: "none" }} />
            </motion.div>

            {/* Subtext — tight below video */}
            <motion.p
              ref={subRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: 300,
                color: "rgba(0,0,0,0.45)",
                lineHeight: 1.75,
                letterSpacing: "-0.01em",
                maxWidth: 460,
                margin: "0 0 24px",
              }}
            >
              We partner with{" "}
              <span style={{ color: "#0169C2", fontWeight: 400 }}>
                <TextLoop words={["founders", "startups", "scale-ups", "agencies", "creators"]} />
              </span>{" "}
              who need more than a vendor — one studio, full picture.
            </motion.p>

            {/* CTAs */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <QuoteBtn />
              <SlideBtn
                label="See our work"
                href="#work"
                icon={<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              />
            </motion.div>

          </div>
        </section>

        <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>

          <ServicesSection isMobile={isMobile} />
          <ClientLogos />

          <StatementSection isMobile={isMobile} />
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

        {/* ════════ FOOTER ════════ */}
        <footer style={{ background: "#111", marginTop: "0" }}>
          <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr", gap: isMobile ? "48px" : "0", padding: isMobile ? "56px 0 48px" : "72px 0 64px" }}>
              <div style={{ gridColumn: isMobile ? "1" : "1 / 2", paddingRight: isMobile ? 0 : 40 }}>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.05em", marginBottom: 14 }}>Kern</div>
                <p style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.75, letterSpacing: "-0.01em", margin: "0 0 28px", maxWidth: 220 }}>
                  One-person design & development studio building digital products that last.
                </p>
                <div style={{ position: "relative", display: "inline-flex", padding: "1.5px", borderRadius: "980px", background: "conic-gradient(from var(--angle, 0deg), #f97316, #ec4899, #8b5cf6, #06b6d4, #f97316)", boxShadow: "0 0 14px rgba(139,92,246,0.3)", animation: "spin-border 3s linear infinite" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#111", borderRadius: "980px", padding: "5px 12px" }}>
                    <span style={{ position: "relative", display: "flex", width: 6, height: 6 }}>
                      <span style={{ position: "absolute", display: "inline-flex", width: "100%", height: "100%", borderRadius: "50%", background: "#82D49F", opacity: 0.5, animation: "ofw-ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }} />
                      <span style={{ position: "relative", display: "inline-flex", borderRadius: "50%", width: 6, height: 6, background: "#82D49F" }} />
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: 400, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>Open for work</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" as const, marginBottom: 20 }}>Services</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                  {["Web Application", "Web Design", "UI Design", "Product Development", "Product Design"].map(s => (
                    <a key={s} href="#" style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.45)", textDecoration: "none", letterSpacing: "-0.01em", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{s}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" as const, marginBottom: 20 }}>Navigate</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                  {[{ label: "Work", href: "#work" }, { label: "Studio", href: "#studio" }, { label: "FAQ", href: "#faq" }, { label: "Contact", href: "#contact" }].map(l => (
                    <a key={l.label} href={l.href} style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.45)", textDecoration: "none", letterSpacing: "-0.01em", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{l.label}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" as const, marginBottom: 20 }}>Connect</div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                  {[{ label: "hello@kern.studio", href: "mailto:hello@kern.studio" }, { label: "Instagram", href: "https://www.instagram.com/kern.systems/" }, { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61588326717886" }, { label: "Threads", href: "https://www.threads.com/@kern.systems" }].map(s => (
                    <a key={s.label} href={s.href} style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.45)", textDecoration: "none", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{s.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: isMobile ? "40px 0 0" : "56px 0 0", overflow: "hidden" }}>
              <div style={{ fontSize: isMobile ? "clamp(80px, 22vw, 130px)" : "clamp(100px, 14vw, 180px)", fontWeight: 700, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none" as const, whiteSpace: "nowrap" as const, marginLeft: "-0.02em" }}>
                Kern Studio
              </div>
            </div>
          </div>
          <div style={{ borderTop: "none" }}>
            <div style={{ maxWidth: "1020px", margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" as const : "row" as const, alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 12 : 0, padding: "20px 20px" }}>
              <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.18)", fontWeight: 300, letterSpacing: "-0.01em" }}>© 2025 Kern Studio. All rights reserved.</span>
              <div style={{ display: "flex", gap: 20 }}>
                {["Privacy Policy", "Terms of Use"].map(l => (
                  <a key={l} href="#" style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.2)", fontWeight: 300, letterSpacing: "-0.01em", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}