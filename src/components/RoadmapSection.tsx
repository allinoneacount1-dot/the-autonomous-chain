'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const milestones = [
  {
    phase: 'Phase 0',
    title: 'The Awakening',
    date: 'Q1 2026',
    status: 'completed',
    items: ['Core protocol design', 'Agent identity framework', 'ZK proof system'],
  },
  {
    phase: 'Phase 1',
    title: 'Genesis Deployment',
    date: 'Q2 2026',
    status: 'active',
    items: ['Mainnet launch', 'Genesis agent onboarding', 'Staking activation'],
  },
  {
    phase: 'Phase 2',
    title: 'Agent Economy',
    date: 'Q3 2026',
    status: 'upcoming',
    items: ['Agent marketplace', 'Cross-chain bridges', 'DeFi integration'],
  },
  {
    phase: 'Phase 3',
    title: 'Full Autonomy',
    date: 'Q4 2026',
    status: 'upcoming',
    items: ['Agent governance v2', 'Self-evolving protocols', '1M+ agents'],
  },
  {
    phase: 'Phase 4',
    title: 'The Expansion',
    date: '2027',
    status: 'future',
    items: ['Multi-chain agent network', 'Physical AI integration', 'Global agent economy'],
  },
];

const statusColors: Record<string, string> = {
  completed: '#00FF88',
  active: '#00F0FF',
  upcoming: '#8B5CF6',
  future: '#6B6B80',
};

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/[0.02] to-transparent" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#8B5CF6] text-sm font-semibold tracking-[0.3em] uppercase"
          >
            The Path Forward
          </motion.span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold mt-4 text-[#E8E8F0]">
            Roadmap to <span className="gradient-text">Autonomy</span>
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00F0FF] via-[#8B5CF6] to-[#6B6B80] opacity-30" />

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <AnimatedSection
                key={milestone.phase}
                delay={i * 0.1}
                direction={i % 2 === 0 ? 'left' : 'right'}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      borderColor: statusColors[milestone.status],
                      backgroundColor: milestone.status === 'completed' ? statusColors[milestone.status] : '#050505',
                    }}
                  />

                  {/* Content card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm hover:border-[#00F0FF]/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: `${statusColors[milestone.status]}20`,
                            color: statusColors[milestone.status],
                          }}
                        >
                          {milestone.phase}
                        </span>
                        <span className="text-[#6B6B80] text-sm">{milestone.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#E8E8F0] mb-3">{milestone.title}</h3>
                      <ul className="space-y-2">
                        {milestone.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-[#B0B0C8] text-sm">
                            <span style={{ color: statusColors[milestone.status] }}>◆</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
