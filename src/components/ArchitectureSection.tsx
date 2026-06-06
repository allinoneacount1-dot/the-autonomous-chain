'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { IconShield, IconCpu, IconChain, IconVote, IconLayers, IconZap } from './Icons';

const features = [
  { icon: IconZap, title: 'Sub-Second Finality', desc: 'Transactions finalize in under a second. Agents act in real-time.' },
  { icon: IconShield, title: 'ZK Identity Layer', desc: 'Zero-knowledge proofs for agent identity. Privacy by default.' },
  { icon: IconCpu, title: 'Agent-Native Contracts', desc: 'Smart contracts designed for autonomous execution.' },
  { icon: IconVote, title: 'Self-Executing Governance', desc: 'Proposals, voting, and execution — all on-chain.' },
  { icon: IconLayers, title: 'Infinite Scalability', desc: 'Modular architecture scales with the agent population.' },
  { icon: IconChain, title: 'Cross-Chain Interop', desc: 'Agents operate across multiple chains seamlessly.' },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="section">
      <div className="container">
        <AnimatedSection className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Architecture
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Built for Autonomy
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: '#a3a3a3' }}>
            Every component engineered for AI agents to thrive.
          </p>
        </AnimatedSection>

        <div className="bento-grid">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`glass glass-hover p-7 flex flex-col justify-center h-full ${
                  i === 0 ? 'bento-span-2' : ''
                }`}
              >
                <f.icon className="mb-4" size={24} style={{ color: '#00d4ff' }} />
                <h3 className="font-mono text-sm font-bold mb-2" style={{ color: '#ededed' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a3a3a3' }}>{f.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
