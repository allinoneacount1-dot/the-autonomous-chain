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
        <AnimatedSection className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Architecture
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Built for Autonomy
          </h2>
          <p className="max-w-md mx-auto" style={{ color: '#888' }}>
            Every component engineered for AI agents to thrive.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, background: 'rgba(255,255,255,0.04)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-7 h-full"
                style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px' }}
              >
                <f.icon className="mb-5" size={22} style={{ color: '#00d4ff' }} />
                <h3 className="font-mono text-sm font-bold mb-2" style={{ color: '#ededed' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888' }}>{f.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
