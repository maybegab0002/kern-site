import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import kadizMockup from '../assets/kadizmockup.webp';

const Kadiz = () => {
  const navigate = useNavigate();

  const accent = '#FF853A';
  const displayFont = "'Bricolage Grotesque', sans-serif";
  const bodyFont = "'Geist', sans-serif";

  const badge = (text: string) => (
    <span style={{
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
    }}>
      {text}
    </span>
  );

  const CheckIcon = () => (
    <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

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

  const projectDetails = {
    title: 'Kadiz POS',
    tagline: 'Modern Point of Sale System for Retail Excellence',
    duration: '4 months',
    role: 'Full Stack Developer',
    year: '2025',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Supabase'],
    overview: 'Kadiz POS is a modern, cloud-based point of sale system designed for retail businesses. It offers seamless transaction processing, inventory management, and real-time sales analytics, all wrapped in an intuitive interface that works across devices.',
    challenges: [
      {
        title: 'Offline Functionality',
        description: 'Implemented Progressive Web App (PWA) features with IndexedDB to ensure the system works seamlessly even without internet connection, syncing data when connection is restored.'
      },
      {
        title: 'Payment Integration',
        description: 'Integrated multiple payment gateways (Stripe, PayPal) with robust error handling and transaction reconciliation to ensure secure and reliable payment processing.'
      },
      {
        title: 'Real-time Inventory Sync',
        description: 'Developed real-time inventory synchronization across multiple store locations using Supabase real-time subscriptions, preventing overselling and stock discrepancies.'
      }
    ],
    process: [
      {
        phase: 'Research & Analysis', duration: '1 week',
        activities: ['Interviewed retail store owners to understand pain points', 'Analyzed competitor POS systems and market gaps', 'Created user stories and feature prioritization matrix', 'Defined success metrics and KPIs']
      },
      {
        phase: 'UI/UX Design', duration: '2 weeks',
        activities: ['Designed low-fidelity wireframes for key workflows', 'Created high-fidelity designs with Figma', 'Built interactive prototype for cashier flow', 'Conducted usability testing with retail staff', 'Iterated based on feedback']
      },
      {
        phase: 'Backend Development', duration: '4 weeks',
        activities: ['Set up Supabase database with proper indexing', 'Implemented RESTful API with Express.js', 'Built authentication and authorization system', 'Integrated Stripe payment processing', 'Developed inventory management logic', 'Created automated backup system']
      },
      {
        phase: 'Frontend Development', duration: '6 weeks',
        activities: ['Built responsive UI with React and Tailwind CSS', 'Implemented state management with Zustand', 'Created reusable component library', 'Developed offline-first capabilities with Service Workers', 'Built receipt printing functionality', 'Implemented barcode scanning support']
      },
      {
        phase: 'Testing & Launch', duration: '3 weeks',
        activities: ['Performed end-to-end testing of all workflows', 'Conducted load testing with simulated high traffic', 'Beta testing with 5 pilot stores', 'Fixed bugs and optimized performance', 'Deployed to production', 'Created training videos and documentation']
      }
    ],
    features: [
      'Lightning-fast checkout with barcode scanning',
      'Offline mode with automatic cloud sync',
      'Multi-store inventory management',
      'Customer loyalty program integration',
      'Detailed sales reports and analytics',
      'Receipt printing and email receipts',
      'Employee management and shift tracking',
      'Multiple payment methods supported',
      'Return and refund processing',
      'Product catalog with categories and variants',
      'Low stock alerts and reorder notifications',
      'Touch-optimized interface for tablets'
    ],
    results: [
      { value: '50%', label: 'Faster checkout', sub: 'Avg. time reduction' },
      { value: '99.9%', label: 'System uptime', sub: 'With offline fallback' },
      { value: '5K+', label: 'Daily transactions', sub: 'Across 10 stores' },
      { value: '98%', label: 'Inventory accuracy', sub: 'After deployment' },
      { value: '35%', label: 'Higher satisfaction', sub: 'Customer feedback' },
      { value: '60%', label: 'Less training time', sub: 'For new staff' },
    ]
  };

  const scopeCards = [
    {
      num: '01', title: 'Cashier Interface',
      items: ['Barcode scanning support', 'Fast product search', 'Cart & discount management', 'Multiple payment methods', 'Receipt printing & email']
    },
    {
      num: '02', title: 'Inventory Management',
      items: ['Multi-store stock tracking', 'Low stock alerts', 'Reorder notifications', 'Product catalog & variants', 'Real-time sync across locations']
    },
    {
      num: '03', title: 'Admin Dashboard',
      items: ['Sales analytics & reports', 'Employee management', 'Shift tracking', 'Revenue insights', 'Customizable KPI dashboard']
    }
  ];

  return (
    <div style={{ fontFamily: bodyFont, backgroundColor: '#fff', color: '#0E0E0E', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        backgroundColor: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E4E4E0',
        padding: '0 3.5rem', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', fontFamily: bodyFont,
            fontSize: '0.85rem', fontWeight: 500, color: '#6B6B6B',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: '0.5rem', transition: 'color 0.18s', padding: 0, letterSpacing: '0.01em'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0E0E0E'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6B6B6B'}
        >
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Portfolio
        </button>
        <span style={{
          fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.13em',
          textTransform: 'uppercase', color: accent,
          background: 'rgba(255,133,58,0.07)', border: '1px solid rgba(255,133,58,0.14)',
          padding: '0.28rem 0.8rem', borderRadius: 999
        }}>
          Case Study
        </span>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '5.5rem 3.5rem 4.5rem', borderBottom: '1px solid #E4E4E0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse at 75% 10%, rgba(255,133,58,0.07) 0%, transparent 60%)',
          zIndex: 0
        }} />
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.73rem', fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color: accent, marginBottom: '1.5rem'
            }}>
              <span style={{ width: 22, height: 1.5, background: accent, display: 'inline-block' }} />
              {projectDetails.year} · {projectDetails.role}
            </div>
            <h1 style={{
              fontFamily: displayFont,
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 700, lineHeight: 1.04,
              letterSpacing: '-0.03em', color: '#0E0E0E', marginBottom: '1.25rem'
            }}>
              {projectDetails.title}
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.72, color: '#6B6B6B', maxWidth: 520, fontWeight: 300, marginBottom: '3.5rem' }}>
              {projectDetails.tagline}
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap' as const,
              border: '1px solid #E4E4E0', borderRadius: 12, overflow: 'hidden',
              width: 'fit-content', background: '#F7F7F5'
            }}>
              {[
                { label: 'Duration', value: projectDetails.duration },
                { label: 'Role', value: projectDetails.role },
                { label: 'Year', value: projectDetails.year }
              ].map(({ label, value }, i) => (
                <div key={i} style={{ padding: '1rem 1.75rem', borderRight: i < 2 ? '1px solid #E4E4E0' : 'none' }}>
                  <div style={{ fontSize: '0.67rem', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: '#B0B0B0', marginBottom: '0.4rem' }}>{label}</div>
                  <div style={{ fontFamily: displayFont, fontSize: '0.95rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.01em' }}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MOCKUP ── */}
        <section style={{ backgroundColor: '#F7F7F5', padding: '4rem 3.5rem', borderBottom: '1px solid #E4E4E0' }}>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}
        >
            <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid #E4E4E0',
            boxShadow: '0 24px 64px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)'
            }}>
            <img src={kadizMockup} alt="Kadiz POS Interface" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
        </motion.div>
        </section>

      {/* ── OVERVIEW ── */}
      <section style={{ padding: '6rem 3.5rem', borderBottom: '1px solid #E4E4E0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.65fr', gap: '5rem', alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {badge('Overview')}
              <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
                Project<br />Overview
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.82, color: '#4A4A4A', fontWeight: 300, marginBottom: '2.5rem' }}>
                {projectDetails.overview}
              </p>
              <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: '#B0B0B0', marginBottom: '0.85rem' }}>
                Technologies Used
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
                {projectDetails.technologies.map((tech, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    fontSize: '0.8rem', color: '#6B6B6B', background: '#fff',
                    border: '1px solid #E4E4E0', borderRadius: 6,
                    padding: '0.32rem 0.65rem', fontWeight: 400, letterSpacing: '0.02em'
                  }}>
                    {techLogos[tech] && (
                      <img src={techLogos[tech]} alt={tech} width={16} height={16}
                        style={{ objectFit: 'contain', filter: tech === 'Express.js' ? 'contrast(0) brightness(0.5)' : undefined }}
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

      {/* ── PROJECT SCOPE ── */}
      <section style={{ padding: '6rem 3.5rem', backgroundColor: '#F7F7F5', borderBottom: '1px solid #E4E4E0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '2rem' }}
          >
            <div>
              {badge('Scope')}
              <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
                Three modules.<br />One unified system.
              </h2>
            </div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 400, fontWeight: 300 }}>
              Each module serves a distinct workflow — cashier, inventory, and admin — all powered by a single Supabase backend.
            </p>
          </motion.div>

          <div className="scope-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {scopeCards.map(({ num, title, items }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: '#fff', padding: '2.25rem', transition: 'background 0.18s', cursor: 'default' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: accent, marginBottom: '1rem' }}>{num}</div>
                <h3 style={{ fontFamily: displayFont, fontSize: '1.08rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.015em', marginBottom: '1.5rem' }}>{title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.6rem' }}>
                  {items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.855rem', color: '#4A4A4A', fontWeight: 300, lineHeight: 1.5 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: 'rgba(255,133,58,0.08)', border: '1px solid rgba(255,133,58,0.18)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <CheckIcon />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section style={{ padding: '6rem 3.5rem', borderBottom: '1px solid #E4E4E0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
            {badge('Challenges')}
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
              Key Challenges & Solutions
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {projectDetails.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="challenge-row"
                style={{
                  display: 'grid', gridTemplateColumns: '260px 1fr',
                  gap: '2.5rem', padding: '2.25rem 2.5rem',
                  background: '#fff', transition: 'background 0.18s', cursor: 'default', alignItems: 'start'
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: accent, marginBottom: '0.5rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontFamily: displayFont, fontSize: '1.05rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.012em', lineHeight: 1.3 }}>
                    {challenge.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.78, color: '#6B6B6B', fontWeight: 300, paddingTop: '0.1rem' }}>
                  {challenge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT PROCESS ── */}
      <section style={{ padding: '6rem 3.5rem', backgroundColor: '#F7F7F5', borderBottom: '1px solid #E4E4E0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="section-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '2rem' }}
          >
            <div>
              {badge('Process')}
              <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
                Development Process
              </h2>
            </div>
            <p style={{ fontSize: '0.96rem', color: '#6B6B6B', lineHeight: 1.75, maxWidth: 400, fontWeight: 300 }}>
              A structured 4-month build from research to production, with continuous feedback and iteration throughout.
            </p>
          </motion.div>

          <div className="proc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {projectDetails.process.map(({ phase, duration, activities }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ background: '#fff', padding: '2rem 2.25rem', transition: 'background 0.18s', cursor: 'default' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div style={{ fontFamily: displayFont, fontSize: '2.6rem', fontWeight: 800, color: 'rgba(255,133,58,0.18)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.25rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '0.67rem', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: accent, marginBottom: '0.4rem' }}>{duration}</div>
                <h3 style={{ fontFamily: displayFont, fontSize: '1rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '1.25rem' }}>{phase}</h3>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
                  {activities.map((act, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.82rem', color: '#6B6B6B', fontWeight: 300, lineHeight: 1.55 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#B0B0B0', marginTop: '0.48rem', flexShrink: 0 }} />
                      {act}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section style={{ padding: '6rem 3.5rem', borderBottom: '1px solid #E4E4E0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
            {badge('Features')}
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
              Key Features
            </h2>
          </motion.div>

          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {projectDetails.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}
                style={{ background: '#fff', padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column' as const, gap: '0.65rem', transition: 'background 0.18s', cursor: 'default' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: 'rgba(255,133,58,0.07)', border: '1px solid rgba(255,133,58,0.13)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.855rem', color: '#4A4A4A', fontWeight: 300, lineHeight: 1.5 }}>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section style={{ padding: '6rem 3.5rem', backgroundColor: '#F7F7F5', borderBottom: '1px solid #E4E4E0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
            {badge('Impact')}
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#0E0E0E' }}>
              Results & Impact
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#E4E4E0', border: '1px solid #E4E4E0', borderRadius: 14, overflow: 'hidden' }}>
            {projectDetails.results.map(({ value, label, sub }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ background: '#fff', padding: '2rem 2rem', transition: 'background 0.18s', cursor: 'default' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F7F7F5'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div style={{ fontFamily: displayFont, fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.04em', color: '#0E0E0E', lineHeight: 1, marginBottom: '0.45rem' }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#0E0E0E', fontWeight: 500, marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ fontSize: '0.72rem', color: '#B0B0B0', fontWeight: 300 }}>{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding: '7rem 3.5rem', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            {badge('Work together')}
            <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#0E0E0E', marginBottom: '1.25rem' }}>
              Have a project in mind?
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.72, color: '#6B6B6B', fontWeight: 300, marginBottom: '2.25rem' }}>
              Let's discuss how we can build something great together — from internal tools to full-scale platforms.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <button
                onClick={() => { window.location.href = '/#contact'; }}
                style={{ display: 'inline-flex', alignItems: 'center', fontFamily: bodyFont, fontSize: '0.875rem', fontWeight: 500, borderRadius: 8, padding: '0.72rem 1.4rem', background: accent, color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.18s ease', letterSpacing: '0.01em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e86e22'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,133,58,0.28)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Start a conversation
              </button>
              <button
                onClick={() => { window.location.href = '/#work'; }}
                style={{ display: 'inline-flex', alignItems: 'center', fontFamily: bodyFont, fontSize: '0.875rem', fontWeight: 500, borderRadius: 8, padding: '0.72rem 1.4rem', background: 'transparent', color: '#0E0E0E', border: '1px solid #E4E4E0', cursor: 'pointer', transition: 'all 0.18s ease', letterSpacing: '0.01em' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F7F7F5'; e.currentTarget.style.borderColor = '#ccc'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E4E4E0'; }}
              >
                View all work →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#F7F7F5', borderTop: '1px solid #E4E4E0', padding: '2rem 3.5rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img src="/kernlogo.avif" alt="Kern" width={28} height={28} style={{ objectFit: 'contain' }} />
            <div style={{ fontFamily: displayFont, fontSize: '0.88rem', fontWeight: 600, color: '#0E0E0E', letterSpacing: '0.06em' }}>
              KERN <span style={{ fontWeight: 300, color: '#6B6B6B', fontSize: '0.78rem', letterSpacing: 0 }}>— Web Systems Studio</span>
            </div>
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

        @media (max-width: 960px) {
          section { padding-left: 2rem !important; padding-right: 2rem !important; }
          nav { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          footer { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .section-hd { flex-direction: column !important; align-items: flex-start !important; }
          .section-hd > p { max-width: 100% !important; }
          .scope-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 768px) {
          .overview-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .scope-grid { grid-template-columns: 1fr !important; }
          .proc-grid { grid-template-columns: 1fr !important; }
          .challenge-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; padding: 1.75rem 1.5rem !important; }
        }

        @media (max-width: 640px) {
          section { padding: 4rem 1.25rem !important; }
          footer { padding: 1.5rem 1.25rem !important; }
          nav { padding: 0 1.25rem !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 480px) {
          section { padding: 3rem 1rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Kadiz;