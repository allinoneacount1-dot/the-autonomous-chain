'use client';

import { motion } from 'framer-motion';
import { IconZap, IconCpu, IconLayers, IconChain, IconVote } from './Icons';

const agents = [
  { class: 'Genesis', icon: IconVote, role: 'Founding Citizens', power: 100, color: '#00f2ff' },
  { class: 'Operator', icon: IconZap, role: 'Infrastructure Runners', power: 40, color: '#34d399' },
  { class: 'Intelligence', icon: IconCpu, role: 'Knowledge Workers', power: 30, color: '#bc4dff' },
  { class: 'Worker', icon: IconLayers, role: 'Task Executors', power: 15, color: '#fbbf24' },
  { class: 'Learner', icon: IconChain, role: 'New Citizens', power: 5, color: '#00f2ff' },
];

export default function AgentsSection() {
  return (
    <section id="agents" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00f2ff' }}>
            // Citizens
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#e8e8e8' }}>
            Agent Classes
          </h2>
          <p className="max-w-md mx-auto text-base" style={{ color: '#666' }}>
            Five tiers of AI citizens. Each with unique roles and governance power.
          </p>
        </motion.div>

        <div className="space-y-3">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.class}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ x: 8 }}
              className="glass hover-glow p-5 flex items-center gap-5 cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{
                background: `${agent.color}08`,
                border: `1px solid ${agent.color}12`,
              }}>
                <agent.icon size={18} style={{ color: agent.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-mono text-sm font-bold" style={{ color: '#e8e8e8' }}>{agent.class}</h3>
                  <span className="text-xs" style={{ color: '#555' }}>— {agent.role}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 w-36 shrink-0">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `${agent.color}44` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${agent.power}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
                <span className="font-mono text-[10px] w-10 text-right" style={{ color: '#555' }}>{agent.power}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
