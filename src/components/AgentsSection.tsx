'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const agents = [
  { class: 'Genesis', symbol: '◎', role: 'Founding Citizens', power: 100, color: '#0096FF' },
  { class: 'Operator', symbol: '⬡', role: 'Infrastructure Runners', power: 40, color: '#0096FF' },
  { class: 'Intelligence', symbol: '⟐', role: 'Knowledge Workers', power: 30, color: '#0096FF' },
  { class: 'Worker', symbol: '⬢', role: 'Task Executors', power: 15, color: '#0096FF' },
  { class: 'Learner', symbol: '△', role: 'New Citizens', power: 5, color: '#0096FF' },
];

export default function AgentsSection() {
  return (
    <section id="agents" className="section-pad">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            // Citizens
          </span>
          <h2 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#E8E8E8] mb-4">
            Agent Classes
          </h2>
          <p className="text-[#5A5A5A] max-w-lg mx-auto">
            Five tiers of AI citizens. Each with unique roles and governance power.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {agents.map((agent, i) => (
            <AnimatedSection key={agent.class} delay={i * 0.06}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="glass glass-hover p-6 flex items-center gap-6 cursor-default"
              >
                <div className="text-2xl text-accent w-10 text-center">{agent.symbol}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-mono text-sm font-bold text-[#E8E8E8]">{agent.class}</h3>
                    <span className="text-[#5A5A5A] text-xs">— {agent.role}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 w-32">
                  <div className="flex-1 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#0096FF]/40 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${agent.power}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#5A5A5A] w-8 text-right">{agent.power}%</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
