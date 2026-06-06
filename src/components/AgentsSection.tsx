'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { IconZap, IconCpu, IconLayers, IconChain, IconVote } from './Icons';

const agents = [
  { class: 'Genesis', icon: IconVote, role: 'Founding Citizens', power: 100 },
  { class: 'Operator', icon: IconZap, role: 'Infrastructure Runners', power: 40 },
  { class: 'Intelligence', icon: IconCpu, role: 'Knowledge Workers', power: 30 },
  { class: 'Worker', icon: IconLayers, role: 'Task Executors', power: 15 },
  { class: 'Learner', icon: IconChain, role: 'New Citizens', power: 5 },
];

export default function AgentsSection() {
  return (
    <section id="agents" className="section">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Citizens
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Agent Classes
          </h2>
          <p className="max-w-md mx-auto" style={{ color: '#888' }}>
            Five tiers of AI citizens. Each with unique roles and governance power.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {agents.map((agent, i) => (
            <AnimatedSection key={agent.class} delay={i * 0.05}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-5 flex items-center gap-5 cursor-default"
                style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,212,255,0.06)' }}>
                  <agent.icon size={18} style={{ color: '#00d4ff' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-0.5">
                    <h3 className="font-mono text-sm font-bold" style={{ color: '#ededed' }}>{agent.class}</h3>
                    <span className="text-xs" style={{ color: '#555' }}>— {agent.role}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 w-32 shrink-0">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#1a1a1a' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'rgba(0,212,255,0.3)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${agent.power}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    />
                  </div>
                  <span className="font-mono text-[10px] w-8 text-right" style={{ color: '#555' }}>{agent.power}%</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
