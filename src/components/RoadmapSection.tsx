'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const phases = [
  { phase: '0', title: 'The Awakening', date: 'Q1 2026', status: 'done', items: ['Core protocol design', 'Agent identity framework', 'ZK proof system'] },
  { phase: '1', title: 'Genesis Deployment', date: 'Q2 2026', status: 'active', items: ['Mainnet launch', 'Genesis agent onboarding', 'Staking activation'] },
  { phase: '2', title: 'Agent Economy', date: 'Q3 2026', status: 'upcoming', items: ['Agent marketplace', 'Cross-chain bridges', 'DeFi integration'] },
  { phase: '3', title: 'Full Autonomy', date: 'Q4 2026', status: 'upcoming', items: ['Agent governance v2', 'Self-evolving protocols', '1M+ agents'] },
  { phase: '4', title: 'The Expansion', date: '2027', status: 'future', items: ['Multi-chain network', 'Physical AI integration', 'Global agent economy'] },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Roadmap
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold" style={{ color: '#ededed' }}>
            Path to Autonomy
          </h2>
        </AnimatedSection>

        {/* Horizontal timeline dengan garis penghubung */}
        <div className="relative">
          {/* Garis vertikal penghubung di desktop */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {phases.map((p, i) => (
              <AnimatedSection key={p.phase} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="p-6 h-full flex flex-col relative"
                  style={{
                    background: 'rgba(255,255,255,0.015)',
                    borderRadius: '16px',
                    border: p.status === 'active' ? '1px solid rgba(0,212,255,0.15)' : '1px solid transparent',
                  }}
                >
                  {/* Timeline dot */}
                  <div className="w-3 h-3 rounded-full mx-auto mb-4 relative z-10" style={{
                    background: p.status === 'done' ? '#555' : p.status === 'active' ? '#00d4ff' : '#222',
                    boxShadow: p.status === 'active' ? '0 0 12px rgba(0,212,255,0.3)' : 'none',
                  }} />

                  <div className="text-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{
                      color: p.status === 'done' ? '#555' : p.status === 'active' ? '#00d4ff' : '#333'
                    }}>
                      Phase {p.phase}
                    </span>
                    <h3 className="font-mono text-sm font-bold mt-1 mb-0.5" style={{ color: '#ededed' }}>{p.title}</h3>
                    <span className="font-mono text-[10px]" style={{ color: '#333' }}>{p.date}</span>
                  </div>

                  <ul className="mt-4 space-y-1 flex-1">
                    {p.items.map((item) => (
                      <li key={item} className="text-[11px] flex items-start gap-2" style={{ color: '#888' }}>
                        <span style={{ color: '#333' }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {p.status === 'active' && (
                    <div className="mt-3 text-center">
                      <span className="badge badge-active">In Progress</span>
                    </div>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
