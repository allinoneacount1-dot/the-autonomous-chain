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
        <AnimatedSection className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Roadmap
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold" style={{ color: '#ededed' }}>
            Path to Autonomy
          </h2>
        </AnimatedSection>

        <div className="bento-grid">
          {phases.map((p, i) => (
            <AnimatedSection key={p.phase} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`glass glass-hover p-6 h-full flex flex-col ${
                  p.status === 'active' ? '' : ''
                }`}
                style={p.status === 'active' ? { borderColor: 'rgba(0,212,255,0.2)' } : {}}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold" style={{
                    color: p.status === 'done' ? '#666666' : p.status === 'active' ? '#00d4ff' : '#333333'
                  }}>
                    Phase {p.phase}
                  </span>
                  {p.status === 'active' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                  )}
                </div>
                <h3 className="font-mono text-sm font-bold mb-1" style={{ color: '#ededed' }}>{p.title}</h3>
                <span className="font-mono text-[10px] mb-4" style={{ color: '#333333' }}>{p.date}</span>
                <ul className="space-y-1.5 flex-1">
                  {p.items.map((item) => (
                    <li key={item} className="text-xs flex items-start gap-2" style={{ color: '#a3a3a3' }}>
                      <span style={{ color: '#333333' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
