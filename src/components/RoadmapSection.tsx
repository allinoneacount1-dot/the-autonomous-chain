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
    <section id="roadmap" className="section-pad">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            // Roadmap
          </span>
          <h2 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#E8E8E8] mb-4">
            Path to Autonomy
          </h2>
        </AnimatedSection>

        {/* Bento box layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {phases.map((p, i) => (
            <AnimatedSection key={p.phase} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`glass glass-hover p-6 h-full flex flex-col ${
                  p.status === 'active' ? 'border-[#0096FF]/20' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-mono text-xs font-bold ${
                    p.status === 'done' ? 'text-[#5A5A5A]' :
                    p.status === 'active' ? 'text-accent' :
                    'text-[#3A3A3A]'
                  }`}>
                    Phase {p.phase}
                  </span>
                  {p.status === 'active' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0096FF] animate-pulse" />
                  )}
                </div>
                <h3 className="font-mono text-sm font-bold text-[#E8E8E8] mb-1">{p.title}</h3>
                <span className="font-mono text-[10px] text-[#3A3A3A] mb-4">{p.date}</span>
                <ul className="space-y-1.5 flex-1">
                  {p.items.map((item) => (
                    <li key={item} className="text-[#5A5A5A] text-xs flex items-start gap-2">
                      <span className="text-[#3A3A3A] mt-0.5">—</span>
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
