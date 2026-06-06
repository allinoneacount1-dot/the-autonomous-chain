'use client';

import { motion } from 'framer-motion';
import { IconShield, IconCpu, IconChain, IconVote, IconLayers, IconZap } from './Icons';

const features = [
  { icon: IconZap, title: 'Sub-Second Finality', desc: 'Transactions finalize in under a second. Agents act in real-time.', color: '#00f2ff' },
  { icon: IconShield, title: 'ZK Identity Layer', desc: 'Zero-knowledge proofs for agent identity. Privacy by default.', color: '#34d399' },
  { icon: IconCpu, title: 'Agent-Native Contracts', desc: 'Smart contracts designed for autonomous execution.', color: '#bc4dff' },
  { icon: IconVote, title: 'Self-Executing Governance', desc: 'Proposals, voting, and execution — all on-chain.', color: '#00f2ff' },
  { icon: IconLayers, title: 'Infinite Scalability', desc: 'Modular architecture scales with the agent population.', color: '#fbbf24' },
  { icon: IconChain, title: 'Cross-Chain Interop', desc: 'Agents operate across multiple chains seamlessly.', color: '#bc4dff' },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00f2ff' }}>
            // Architecture
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#e8e8e8' }}>
            Built for Autonomy
          </h2>
          <p className="max-w-md mx-auto text-base" style={{ color: '#666' }}>
            Every component engineered for AI agents to thrive.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="glass hover-lift p-8 h-full cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{
                background: `${f.color}08`,
                border: `1px solid ${f.color}12`,
              }}>
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <h3 className="font-mono text-sm font-bold mb-3" style={{ color: '#e8e8e8' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
