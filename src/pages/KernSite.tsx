import React, { useState , useEffect } from 'react';
import { motion } from 'framer-motion';

const KernSite = () => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate_limited'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      setSubmitStatus('rate_limited');
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'd6e60692-5318-4b4d-b5ee-7e9e05fa37d8',
          name: formData.name,
          email: formData.email,
          message: `Company: ${formData.company}\n\n${formData.message}`,
          subject: 'New Project Inquiry — Kern'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', company: '', email: '', message: '' });
        setLastSubmitTime(now);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // ── Data ─────────────────────────────────────────────────────────────────

  const services = [
    {
      num: '01',
      title: 'Internal Tools & Dashboards',
      desc: 'Admin panels, operations tools, and reporting systems tailored precisely to how your team works. Our core specialty.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'Customer Portals & Platforms',
      desc: 'Authentication, roles, subscriptions, and business-specific workflows — built for scale from day one.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-4.982-1.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      num: '03',
      title: 'Web Applications',
      desc: 'Custom web apps built around your business logic — not generic templates or off-the-shelf software.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      num: '04',
      title: 'Landing Pages & Marketing Sites',
      desc: 'High-converting, design-led landing pages and marketing websites — fast, polished, and built to perform.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.147 0-6.126-.8-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      num: '05',
      title: 'Mobile Applications',
      desc: 'Cross-platform iOS and Android apps built with React Native — native feel, shared codebase, faster delivery.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      )
    },
    {
      num: '06',
      title: 'Desktop Applications',
      desc: 'Cross-platform desktop apps for Windows, Mac, and Linux — powerful native experiences built with modern tooling.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )
    },
    {
      num: '07',
      title: 'Systems & Integrations',
      desc: 'APIs, automations, and third-party integrations that connect your tools and eliminate manual work at every layer.',
      icon: (
        <svg viewBox="0 0 24 24" width={19} height={19} stroke="#FF853A" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      )
    }
  ];

  const steps = [
    { n: '01', title: 'Understand the business', desc: 'We learn how your team operates and where software fits in the picture.' },
    { n: '02', title: 'Define the system', desc: 'Clear scope, architecture, and priorities — before a single line of code is written.' },
    { n: '03', title: 'Build & iterate', desc: 'Development with regular check-ins and continuous feedback loops throughout.' },
    { n: '04', title: 'Launch & support', desc: 'Deployment, full handoff, and optional ongoing support post-launch.' }
  ];

  const whyItems = [
    {
      title: 'Design-led engineering',
      sub: 'Every system is designed before it is built.',
      icon: (
        <svg viewBox="0 0 24 24" width={14} height={14} stroke="#FF853A" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      )
    },
    {
      title: 'Systems thinking over quick fixes',
      sub: 'We build for scale, not just for today.',
      icon: (
        <svg viewBox="0 0 24 24" width={14} height={14} stroke="#FF853A" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    {
      title: 'Built for scale and maintainability',
      sub: 'Clean, documented code your team can own.',
      icon: (
        <svg viewBox="0 0 24 24" width={14} height={14} stroke="#FF853A" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      title: 'Clear communication without jargon',
      sub: 'You always know where your project stands.',
      icon: (
        <svg viewBox="0 0 24 24" width={14} height={14} stroke="#FF853A" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      )
    }
  ];

  const skills: Record<string, string[]> = {
    Frontend: ['React', 'Vite', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express.js'],
    Database: ['Supabase', 'Firebase', 'MongoDB'],
    DevOps: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Git']
  };

  const techLogos: Record<string, string> = {
    React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    Vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    Supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'CI/CD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
    Kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
    Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  };

  const projects = [
    { title: 'Omniportal', description: 'Client onboarding and secure portal for teams and partners.', tags: ['Portal', 'Auth', 'B2B'], link: '/projects/Omniportal' },
    { title: 'Kadiz POS', description: 'Point-of-sale system with real-time inventory and analytics.', tags: ['POS', 'Inventory', 'Retail'], link: '/projects/kadiz' },
    { title: 'Spendzy', description: 'Personal finance tracking app with budget insights and goals.', tags: ['FinTech', 'Mobile-first'], link: '/projects/spendzy' }
  ];

  const stats = [
    { n: '3', s: '+', label: 'Years building web systems' },
    { n: '10', s: '+', label: 'Systems delivered' },
    { n: '100', s: '%', label: 'Client satisfaction rate' },
    { n: '4', s: 'wk', label: 'Average time to first launch' }
  ];

  const faqs = [
    { q: 'What kind of projects do you take on?', a: 'Internal tools and business systems are our core specialty — admin panels, dashboards, portals, and custom operations software. We also build landing pages and marketing sites, mobile apps (iOS & Android), and desktop applications. If you need software built properly around how your business works, we\'re a good fit.' },
    { q: 'How long does a typical project take?', a: 'Most projects ship their first version within 4–8 weeks. Timeline depends on scope — a focused internal tool may be ready in 3 weeks, while a full-featured platform with auth, roles, and integrations typically takes 8–12 weeks.' },
    { q: 'Do you work with early-stage startups or only established businesses?', a: 'Both. We work with funded startups that need to move fast and with established businesses replacing legacy systems. What matters is that you have a clear problem worth solving with software.' },
    { q: 'What does the process look like from our side?', a: 'We start with a scoping call to understand your business and goals. From there we define the system, agree on scope, and move into weekly build-and-review cycles. You\'ll always know what\'s being built and why.' },
    { q: 'Do you offer support after launch?', a: '80% of our clients stay on for ongoing support post-launch. We offer monthly retainers for continued development, bug fixes, and feature additions — so your system grows alongside your business.' },
    { q: 'How do you handle pricing?', a: 'Projects are quoted with a fixed price after scoping, so there are no surprises. Ongoing retainers are billed monthly. We don\'t do hourly billing — it creates misaligned incentives.' },
  ];

  // ── Shared tokens ────────────────────────────────────────────────────────
  const accent = '#FF853A';
  const displayFont = "'Bricolage Grotesque', sans-serif";

  const badge = (text: string) => (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.68rem',
        fontWeight: 500,
        letterSpacing: '0.13em',
        textTransform: 'uppercase' as const,
        color: accent,
        background: 'rgba(255,133,58,0.07)',
        border: '1px solid rgba(255,133,58,0.14)',
        padding: '0.28rem 0.8rem',
        borderRadius: 999,
        marginBottom: '1.25rem'
      }}
    >
      {text}
    </span>
  );

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    background: '#F7F7F5',
    border: '1px solid #E4E4E0',
    borderRadius: 8,
    color: '#0E0E0E',
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 300,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.18s, background 0.18s, box-shadow 0.18s'
  };

  const onFocusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,133,58,0.4)';
    e.currentTarget.style.background = '#fff';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,133,58,0.06)';
  };

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#E4E4E0';
    e.currentTarget.style.background = '#F7F7F5';
    e.currentTarget.style.boxShadow = 'none';
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#work' || hash === '#contact') {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: '#FFFFFF', color: '#0E0E0E', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Side border lines — visible ≥ 1200px via CSS */}
      <div className="side-frame" style={{ position: 'fixed', top: 0, left: 'calc(50% - 560px)', bottom: 0, width: 1, backgroundColor: '#E4E4E0', zIndex: 50, pointerEvents: 'none' }} />
      <div className="side-frame" style={{ position: 'fixed', top: 0, right: 'calc(50% - 560px)', bottom: 0, width: 1, backgroundColor: '#E4E4E0', zIndex: 50, pointerEvents: 'none' }} />

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, backgroundColor: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E4E4E0' }}>
        <div className="nav-inner" style={{ maxWidth: 1120, margin: '0 auto', padding: '0 3.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo + wordmark */}
          <div
            onClick={() => scrollToSection('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <img
              src="/kernlogo.avif"
              alt="Kern"
              style={{ height: 22, width: 'auto', display: 'block' }}
              draggable={false}
            />
            <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.08em', color: '#0E0E0E', lineHeight: 1 }}>
              KERN<sup style={{ fontSize: '0.45rem', color: accent, verticalAlign: 'super', fontWeight: 600 }}>®</sup>
            </div>
          </div>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            {[['services', 'Services'], ['process', 'Process'], ['why', 'Why Kern'], ['work', 'Work']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                style={{ background: 'none', border: 'none', fontSize: '0.84rem', fontWeight: 400, color: '#6B6B6B', cursor: 'pointer', padding: '0.45rem 0.8rem', borderRadius: 6, transition: 'color 0.15s, background 0.15s', fontFamily: 'inherit' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0E0E0E'; e.currentTarget.style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B6B'; e.currentTarget.style.background = 'none'; }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              style={{ background: accent, border: 'none', fontSize: '0.84rem', fontWeight: 500, color: '#fff', cursor: 'pointer', padding: '0.5rem 1.1rem', borderRadius: 7, transition: 'background 0.15s', fontFamily: 'inherit', marginLeft: '0.25rem' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e86e22'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = accent; }}
            >
              Start a project
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ paddingTop: 64, backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        {/* Added inner padding so the side stroke/lines aren't too close */}
        <div
          className="hero-grid"
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '5.5rem 3.5rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'end',
            position: 'relative'
          }}
        >
          {/* Floating orbs */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ paddingBottom: '5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.73rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: '1.5rem' }}>
              <span style={{ width: 22, height: 1.5, background: accent, display: 'inline-block' }} />
              Web Systems Studio
            </div>

            <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.025em', color: '#0E0E0E', marginBottom: '1.4rem' }}>
              Software built for how your <em style={{ fontStyle: 'normal', color: accent }}>business actually works.</em>
            </h1>

            <p style={{ fontSize: '1rem', lineHeight: 1.72, color: '#6B6B6B', maxWidth: 430, marginBottom: '2.25rem', fontWeight: 300 }}>
              We specialize in internal tools and business systems — and we also build landing pages, mobile apps, and desktop software. Design-led engineering that ships.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollToSection('contact')}
                style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 500, borderRadius: 8, padding: '0.72rem 1.4rem', background: accent, color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.18s ease', letterSpacing: '0.01em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e86e22'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,133,58,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Start a conversation
              </button>
              <button
                onClick={() => scrollToSection('work')}
                style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 500, borderRadius: 8, padding: '0.72rem 1.4rem', background: 'transparent', color: '#0E0E0E', border: '1px solid #E4E4E0', cursor: 'pointer', transition: 'all 0.18s ease', letterSpacing: '0.01em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F7F7F5'; e.currentTarget.style.borderColor = '#ccc'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E4E4E0'; }}
              >
                View work →
              </button>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="hero-card" style={{ alignSelf: 'end', position: 'relative', zIndex: 1 }}>
            <div style={{ background: '#F7F7F5', border: '1px solid #E4E4E0', borderBottom: 'none', borderRadius: '14px 14px 0 0', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', color: accent, background: 'rgba(255,133,58,0.08)', border: '1px solid rgba(255,133,58,0.15)', borderRadius: 999, padding: '0.3rem 0.75rem', width: 'fit-content' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                Open for new projects
              </div>
              <div style={{ fontFamily: displayFont, fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.35, color: '#0E0E0E' }}>
                Taking on new clients in 2026 — a few spots still open this quarter.
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Internal Tools', 'Web & Mobile Apps', 'Landing Pages', 'Desktop Apps'].map((c) => (
                  <span key={c} style={{ fontSize: '0.7rem', fontWeight: 400, color: '#6B6B6B', background: '#fff', border: '1px solid #E4E4E0', padding: '0.28rem 0.7rem', borderRadius: 999 }}>{c}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ width: 28, height: 5, borderRadius: 999, background: i <= 3 ? accent : '#F0F0EE' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#6B6B6B', fontWeight: 300 }}>3 of 5 spots filled</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: '1px solid #E4E4E0', borderBottom: '1px solid #E4E4E0' }}>
        {/* Added padding left/right to increase distance from strokes */}
        <div className="stats-grid" style={{ maxWidth: 1120, margin: '0 auto', padding: '0 3.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {stats.map(({ n, s, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ padding: '2rem 0 2rem 2rem', borderRight: i < 3 ? '1px solid #E4E4E0' : 'none' }} className={i === 0 ? 'stat-first' : ''}>
              <div style={{ fontFamily: displayFont, fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#0E0E0E', lineHeight: 1 }}>
                {n}<span style={{ color: accent }}>{s}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6B6B6B', marginTop: '0.35rem', fontWeight: 300 }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── WHO IT'S FOR ── */}
      <section id="for" style={{ backgroundColor: '#F7F7F5', borderTop: '1px solid #E4E4E0', borderBottom: '1px solid #E4E4E0', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {badge("Who it's for")}
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
              Built for businesses that need<br />software done right.
            </h2>
          </motion.div>

          <div className="for-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '5rem', alignItems: 'center', marginTop: '3rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {['Businesses that need internal tools', 'Teams replacing manual workflows', 'Founders launching a product', 'Companies needing a web or mobile presence', 'B2B platforms and services'].map((label) => (
                  <div
                    key={label}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: '#fff', border: '1px solid #E4E4E0', borderRadius: 10, fontSize: '0.92rem', color: '#0E0E0E', transition: 'border-color 0.18s, box-shadow 0.18s', cursor: 'default' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,133,58,0.22)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(255,133,58,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E4E0'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, opacity: 0.65, flexShrink: 0 }} />
                    {label}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#6B6B6B', marginTop: '1.1rem', fontStyle: 'italic', fontWeight: 300 }}>
                If you need software built properly — whether internal or customer-facing — we can help.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Average efficiency gain', val: '40', unit: '%', sub: 'After replacing manual workflows with custom systems', fill: 40 },
                { label: 'Clients on ongoing support', val: '80', unit: '%', sub: 'Stay with Kern post-launch for continued development', fill: 80 }
              ].map(({ label, val, unit, sub, fill }) => (
                <div key={label} style={{ background: '#fff', border: '1px solid #E4E4E0', borderRadius: 12, padding: '1.5rem 1.75rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B0B0B0', marginBottom: '0.45rem' }}>{label}</div>
                  <div style={{ fontFamily: displayFont, fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#0E0E0E' }}>
                    {val}<span style={{ color: accent }}>{unit}</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#6B6B6B', marginTop: '0.2rem', fontWeight: 300 }}>{sub}</div>
                  <div style={{ height: 4, background: '#F0F0EE', borderRadius: 999, marginTop: '0.9rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: accent, borderRadius: 999, width: `${fill}%` }} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ backgroundColor: '#fff', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '2rem' }}>
            <div>{badge('Services')}<h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>What we build</h2></div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 460, fontWeight: 300 }}>From internal tools — our core specialty — to landing pages, mobile apps, and desktop software. End-to-end across the full product spectrum.</p>
          </motion.div>
          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {services.map(({ num, title, desc, icon }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={i === services.length - 1 && services.length % 3 !== 0 ? 'svc-card svc-card-last' : 'svc-card'}
                style={{
                  background: '#fff',
                  padding: '2.25rem 2.5rem',
                  transition: 'background 0.18s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: '1.25rem' }}>{num}</div>
                  <div style={{ width: 40, height: 40, borderRadius: 9, background: 'rgba(255,133,58,0.07)', border: '1px solid rgba(255,133,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>{icon}</div>
                  <div style={{ fontFamily: displayFont, fontSize: '1.08rem', fontWeight: 600, color: '#0E0E0E', marginBottom: '0.55rem', letterSpacing: '-0.012em' }}>{title}</div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B6B6B', lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ backgroundColor: '#F7F7F5', borderTop: '1px solid #E4E4E0', borderBottom: '1px solid #E4E4E0', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '2rem' }}>
            <div>{badge('How we work')}<h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>Four steps. No surprises.</h2></div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 460, fontWeight: 300 }}>A clear, repeatable process designed to keep projects on track and clients informed at every step.</p>
          </motion.div>
          <div className="proc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {steps.map(({ n, title, desc }, i) => (
              <motion.div key={n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ background: '#fff', padding: '2rem 1.75rem', transition: 'background 0.18s', cursor: 'default' }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,133,58,0.025)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                <div style={{ fontFamily: displayFont, fontSize: '2.8rem', fontWeight: 800, color: 'rgba(255,133,58,0.22)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.5rem' }}>{n}</div>
                <div style={{ fontSize: '0.67rem', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase', color: accent, marginBottom: '0.55rem' }}>Step {i + 1 < 10 ? `0${i + 1}` : i + 1}</div>
                <div style={{ fontFamily: displayFont, fontSize: '1rem', fontWeight: 600, color: '#0E0E0E', marginBottom: '0.55rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{title}</div>
                <div style={{ fontSize: '0.825rem', color: '#6B6B6B', lineHeight: 1.65, fontWeight: 300 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY KERN ── */}
      <section id="why" style={{ backgroundColor: '#fff', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {badge('Why KERN')}
          </motion.div>
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', marginTop: '0.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ border: '1px solid #E4E4E0', borderRadius: 12, overflow: 'hidden' }}>
              {whyItems.map(({ title, sub, icon }, idx) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.2rem 1.5rem', borderBottom: idx < whyItems.length - 1 ? '1px solid #E4E4E0' : 'none', transition: 'background 0.18s', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F7F7F5'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(255,133,58,0.07)', border: '1px solid rgba(255,133,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                  <div style={{ fontSize: '0.89rem', fontWeight: 400, color: '#0E0E0E', lineHeight: 1.5, paddingTop: '0.05rem' }}>
                    {title}
                    <small style={{ display: 'block', fontSize: '0.76rem', color: '#6B6B6B', marginTop: '0.15rem', fontWeight: 300 }}>{sub}</small>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p style={{ fontFamily: displayFont, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.025em', color: '#0E0E0E', marginBottom: '1.5rem' }}>
                We care about how software <em style={{ fontStyle: 'normal', color: accent }}>works long after launch.</em>
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6B6B6B', lineHeight: 1.78, fontWeight: 300, marginBottom: '2rem' }}>
                Most agencies build and move on. At Kern, we treat every project as a long-term system — whether it's an internal tool, a mobile app, or a marketing site. Designed to evolve with your business, maintained with care, and documented for your team to own.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 500, borderRadius: 8, padding: '0.72rem 1.4rem', background: accent, color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.18s ease', letterSpacing: '0.01em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e86e22'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,133,58,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Work with us →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECH ── */}
      <section id="tech" style={{ backgroundColor: '#F7F7F5', borderTop: '1px solid #E4E4E0', borderBottom: '1px solid #E4E4E0', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '2rem' }}>
            <div>{badge('Technology')}<h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>Technologies we work with</h2></div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 460, fontWeight: 300 }}>Modern, battle-tested tools chosen for reliability, performance, and long-term maintainability.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.75rem' }}>
            {Object.entries(skills).map(([category, techs]) => (
              <div key={category}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0E0E0E', marginBottom: '0.75rem' }}>{category}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#6B6B6B', background: '#fff', border: '1px solid #E4E4E0', borderRadius: 6, padding: '0.32rem 0.65rem', fontWeight: 400, letterSpacing: '0.02em', transition: 'border-color 0.18s, color 0.18s, background 0.18s', cursor: 'default' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,133,58,0.35)'; e.currentTarget.style.color = '#0E0E0E'; e.currentTarget.style.background = 'rgba(255,133,58,0.04)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E4E0'; e.currentTarget.style.color = '#6B6B6B'; e.currentTarget.style.background = '#fff'; }}
                    >
                      {techLogos[tech] && <img src={techLogos[tech]} alt={tech} width={16} height={16} style={{ objectFit: 'contain', filter: tech === 'Express.js' ? 'contrast(0) brightness(0.5)' : undefined }} loading="lazy" />}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ backgroundColor: '#fff', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '2rem' }}>
            <div>{badge('Portfolio')}<h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>Selected work</h2></div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 460, fontWeight: 300 }}>A sample of systems and platforms we've designed and built for real businesses.</p>
          </motion.div>
          <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {projects.map(({ title, description, tags, link }, i) => (
              <motion.a key={title} href={link} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ border: '1px solid #E4E4E0', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'box-shadow 0.22s, transform 0.22s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.07)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}>
                <div style={{ padding: '1.25rem 1.4rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.7rem' }}>
                    {tags.map((t) => <span key={t} style={{ fontSize: '0.62rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, background: 'rgba(255,133,58,0.07)', padding: '0.22rem 0.55rem', borderRadius: 999 }}>{t}</span>)}
                  </div>
                  <div style={{ fontFamily: displayFont, fontSize: '1.02rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.01em', marginBottom: '0.35rem' }}>{title}</div>
                  <div style={{ fontSize: '0.81rem', color: '#6B6B6B', lineHeight: 1.6, fontWeight: 300 }}>{description}</div>
                  <div style={{ fontSize: '0.77rem', fontWeight: 500, color: accent, marginTop: '0.8rem' }}>View case study →</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ backgroundColor: accent, padding: '5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.12 }}>
          <div style={{ width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)' }} />
            <div style={{ position: 'absolute', inset: 50, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }} />
          </div>
        </div>
        <div className="cta-grid" style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.15, maxWidth: 580 }}>
              Whatever you're building — we'll build it right.
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.62)', marginTop: '0.65rem', fontWeight: 300 }}>
              Internal tools, landing pages, mobile apps, desktop software — tell us about your project and we'll take it from there.
            </p>
          </div>
          <button onClick={() => scrollToSection('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.85rem 1.75rem', background: '#fff', color: accent, borderRadius: 8, fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s', letterSpacing: '0.01em' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
            Start a conversation →
          </button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ backgroundColor: '#fff', borderTop: '1px solid #E4E4E0', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '2rem' }}>
            <div>{badge('FAQ')}<h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>Common questions</h2></div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 400, fontWeight: 300 }}>Everything you need to know before starting a project with Kern.</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{ borderBottom: i < faqs.length - 1 ? '1px solid #E4E4E0' : 'none' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '1.5rem 2rem', background: openFaq === i ? '#F7F7F5' : '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.22s', fontFamily: 'inherit' }}
                  onMouseEnter={(e) => { if (openFaq !== i) e.currentTarget.style.background = '#FAFAFA'; }}
                  onMouseLeave={(e) => { if (openFaq !== i) e.currentTarget.style.background = '#fff'; }}
                >
                  <span style={{ fontFamily: displayFont, fontSize: '1rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.01em', lineHeight: 1.4 }}>{q}</span>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: openFaq === i ? accent : '#F0F0EE', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.22s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    <svg viewBox="0 0 24 24" width={13} height={13} stroke={openFaq === i ? '#fff' : '#6B6B6B'} fill="none" strokeWidth={2.2} strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div style={{
                  display: 'grid',
                  gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
                  background: '#F7F7F5',
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      padding: '0 2rem 1.6rem',
                      opacity: openFaq === i ? 1 : 0,
                      transform: openFaq === i ? 'translateY(0)' : 'translateY(-6px)',
                      transition: 'opacity 0.25s ease 0.08s, transform 0.25s ease 0.08s',
                    }}>
                      <p style={{ fontSize: '0.9rem', color: '#6B6B6B', lineHeight: 1.78, fontWeight: 300, maxWidth: 680 }}>{a}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ backgroundColor: '#fff', borderTop: '1px solid #E4E4E0', padding: '6rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {badge('Contact')}
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E', marginBottom: '2.5rem' }}>Start a project</h2>
          </motion.div>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h3 style={{ fontFamily: displayFont, fontSize: '1.22rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.015em', marginBottom: '0.7rem', lineHeight: 1.4 }}>Let's talk about what you're building.</h3>
              <p style={{ fontSize: '0.875rem', color: '#6B6B6B', lineHeight: 1.76, fontWeight: 300, marginBottom: '1.75rem' }}>
                Whether you have a detailed spec or just an early idea, we're happy to have a first conversation and see if we're a good fit for each other.
              </p>
              <a href="mailto:hello@kern.studio" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', color: '#3D3D3D', textDecoration: 'none', transition: 'color 0.18s' }} onMouseEnter={(e) => { e.currentTarget.style.color = accent; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#3D3D3D'; }}>
                <svg viewBox="0 0 24 24" width={14} height={14} stroke="#9CA3AF" fill="none" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                hello@kern.it.com
              </a>
            </motion.div>

            <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                {[
                  { key: 'name', label: 'Name', placeholder: 'Your name', type: 'text', required: true },
                  { key: 'company', label: 'Company', placeholder: 'Your company', type: 'text', required: false }
                ].map(({ key, label, placeholder, type, required }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#6B6B6B' }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      required={required}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      style={inputStyle}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#6B6B6B' }}>Email</label>
                <input type="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} onFocus={onFocusInput} onBlur={onBlurInput} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#6B6B6B' }}>Project description</label>
                <textarea rows={5} placeholder="Tell us about your project, system, or idea..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={onFocusInput} onBlur={onBlurInput} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.73rem', color: '#B0B0B0', fontWeight: 300 }}>We typically respond within 1 business day.</span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 500, borderRadius: 8, padding: '0.72rem 1.4rem', background: isSubmitting ? '#ccc' : accent, color: '#fff', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.18s ease', letterSpacing: '0.01em' }}
                  onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.background = '#e86e22'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,133,58,0.22)'; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isSubmitting ? '#ccc' : accent; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent ✓' : 'Send message'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div style={{ padding: '0.8rem 1rem', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 8, fontSize: '0.81rem', color: '#15803d' }}>
                  ✓ Message received. We'll be in touch shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div style={{ padding: '0.8rem 1rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 8, fontSize: '0.81rem', color: '#dc2626' }}>
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
              {submitStatus === 'rate_limited' && (
                <div style={{ padding: '0.8rem 1rem', background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.18)', borderRadius: 8, fontSize: '0.81rem', color: '#a16207' }}>
                  Please wait a minute before sending another message.
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#F7F7F5', borderTop: '1px solid #E4E4E0', padding: '2rem 3.5rem' }}>
        <div className="footer-inner" style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          {/* Footer logo + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img src="/kernlogo.avif" alt="Kern" style={{ height: 26, width: 'auto', display: 'block' }} draggable={false} />
            <div style={{ fontFamily: displayFont, fontSize: '0.88rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '0.06em' }}>
              KERN <span style={{ fontWeight: 300, color: '#6B6B6B', fontSize: '0.78rem', letterSpacing: 0 }}>— Web Systems Studio</span>
            </div>
          </div>

          {/* Social links (text) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.facebook.com/profile.php?id=61588326717886"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.79rem', color: '#6B6B6B', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#0E0E0E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B6B'; }}
            >
              Facebook
            </a>

            <a
              href="https://www.threads.com/@kern.systems"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.79rem', color: '#6B6B6B', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#0E0E0E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B6B'; }}
            >
              Threads
            </a>

            <a
              href="https://www.instagram.com/kern.systems/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.79rem', color: '#6B6B6B', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#0E0E0E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B6B'; }}
            >
              Instagram
            </a>

            <span
              title="LinkedIn (coming soon)"
              style={{ fontSize: '0.79rem', color: '#B0B0B0' }}
            >
              LinkedIn
            </span>
          </div>


          <div style={{ fontSize: '0.73rem', color: '#B0B0B0', fontWeight: 300 }}>© {new Date().getFullYear()} Kern. All rights reserved.</div>
        </div>
      </footer>

      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@300;400;500&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background-color: rgba(255,133,58,0.15); }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F7F7F5; }
        ::-webkit-scrollbar-thumb { background: #E4E4E0; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #B0B0B0; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        .orb { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; }
        .orb-1 { width: 320px; height: 320px; right: -60px; top: 60px; background: radial-gradient(circle at 35% 35%, rgba(255,133,58,0.13), rgba(255,133,58,0.04) 55%, transparent 75%); animation: orbFloat1 9s ease-in-out infinite; }
        .orb-2 { width: 180px; height: 180px; right: 200px; top: 180px; background: radial-gradient(circle at 40% 30%, rgba(255,133,58,0.08), transparent 70%); animation: orbFloat2 7s ease-in-out infinite 1.5s; }
        .orb-3 { width: 100px; height: 100px; right: 80px; top: 320px; background: radial-gradient(circle at 40% 40%, rgba(255,133,58,0.1), transparent 65%); animation: orbFloat3 5s ease-in-out infinite 0.8s; }

        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(-18px,22px) rotate(4deg)} 66%{transform:translate(12px,-14px) rotate(-3deg)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-25px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,18px)} }

        .side-frame { display: none; }
        @media (min-width: 1200px) { .side-frame { display: block; } }

        /* Service card base styles */
        .svc-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .svc-card-last {
          grid-column: span 3;
          flex-direction: row;
          align-items: center;
          gap: 2.5rem;
        }
        .svc-card-last > div:first-child { flex-shrink: 0; }

        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-bottom: 3rem !important; padding-left: 2rem !important; padding-right: 2rem !important; }
          .hero-card { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; padding-left: 2rem !important; padding-right: 2rem !important; }
          .stats-grid > div:nth-child(1) { padding-left: 0 !important; border-right: 1px solid #E4E4E0 !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { padding-left: 0 !important; border-top: 1px solid #E4E4E0; border-right: 1px solid #E4E4E0 !important; }
          .stats-grid > div:nth-child(4) { border-right: none !important; border-top: 1px solid #E4E4E0; }
          .for-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .svc-grid { grid-template-columns: repeat(2,1fr) !important; }
          .svc-card-last { grid-column: span 2 !important; flex-direction: column !important; align-items: flex-start !important; gap: 0 !important; }
          .proc-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .tech-grid { grid-template-columns: repeat(2,1fr) !important; }
          .work-grid { grid-template-columns: repeat(2,1fr) !important; }
          .cta-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .section-hd { flex-direction: column !important; align-items: flex-start !important; }
          .section-hd > p { max-width: 100% !important; }
          section { padding-left: 2rem !important; padding-right: 2rem !important; }
          .nav-inner { padding-left: 2rem !important; padding-right: 2rem !important; }
          footer { padding-left: 2rem !important; padding-right: 2rem !important; }
        }

        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .proc-grid { grid-template-columns: 1fr !important; }
          .svc-grid { grid-template-columns: 1fr !important; }
          .svc-card-last { grid-column: span 1 !important; }
          .svc-card { padding: 1.75rem 1.5rem !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .tech-grid { grid-template-columns: repeat(2,1fr) !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 1.25rem !important; }
          .footer-inner ul { justify-content: center !important; }
          section { padding: 3.5rem 1.25rem !important; }
          footer { padding: 1.5rem 1.25rem !important; }
          .nav-inner { padding: 0 1.25rem !important; }
          #hero > div { padding: 3rem 1.25rem 2.5rem !important; }
        }

        @media (max-width: 425px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .svc-card-last { grid-column: span 1 !important; }
          .svc-card { padding: 1.5rem 1.25rem !important; }
        }

        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-right: none !important; border-top: 1px solid #E4E4E0 !important; padding-left: 0 !important; }
          .stats-grid > div:first-child { border-top: none !important; }
          .tech-grid { grid-template-columns: 1fr !important; }
          section { padding: 2.5rem 1rem !important; }
          #hero > div { padding: 2.5rem 1rem 2rem !important; }
          .svc-card { padding: 1.25rem 1rem !important; }
        }
      `}</style>
    </div>
  );
};

export default KernSite;