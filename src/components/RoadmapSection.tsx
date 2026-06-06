'use client';

import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00f2ff' }}>
            // Roadmap
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold text-gradient" style={{ color: '#e8e8e8' }}>
            Path to Autonomy
          </h2>
        </motion.div>

        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-[1px]" style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.08), rgba(188,77,255,0.08), transparent)',
          }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {phases.map((p, i) => (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="glass hover-lift p-6 h-full flex flex-col cursor-default relative"
                style={{
                  borderColor: p.status === 'active' ? 'rgba(0,242,255,0.12)' : undefined,
                }}
              >
                {/* Timeline dot */}
                <div className="w-3.5 h-3.5 rounded-full mx-auto mb-5 relative z-10" style={{
                  background: p.status === 'done' ? '#444' : p.status === 'active' ? '#00f2ff' : '#222',
                  boxShadow: p.status === 'active' ? '0 0 16px rgba(0,242,255,0.3)' : 'none',
                }} />

                <div className="text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{
                    color: p.status === 'done' ? '#444' : p.status === 'active' ? '#00f2ff' : '#333'
                  }}>
                    Phase {p.phase}
                  </span>
                  <h3 className="font-mono text-sm font-bold mt-1.5 mb-0.5" style={{ color: '#e8e8e8' }}>{p.title}</h3>
                  <span className="font-mono text-[10px]" style={{ color: '#444' }}>{p.date}</span>
                </div>

                <ul className="mt-4 space-y-1.5 flex-1">
                  {p.items.map((item) => (
                    <li key={item} className="text-[11px] flex items-start gap-2" style={{ color: '#666' }}>
                      <span style={{ color: '#333' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {p.status === 'active' && (
                  <div className="mt-4 text-center">
                    <span className="badge badge-active">In Progress</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
