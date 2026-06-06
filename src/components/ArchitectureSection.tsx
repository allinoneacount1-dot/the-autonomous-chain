'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const features = [
  { icon: '⬡', title: 'Sub-Second Finality', desc: 'Transactions finalize in under a second. Agents act in real-time.' },
  { icon: '◎', title: 'ZK Identity Layer', desc: 'Zero-knowledge proofs for agent identity. Privacy by default.' },
  { icon: '⟐', title: 'Agent-Native Contracts', desc: 'Smart contracts designed for autonomous execution.' },
  { icon: '⬢', title: 'Self-Executing Governance', desc: 'Proposals, voting, and execution — all on-chain.' },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="section-pad">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            // Architecture
          </span>
          <h2 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#E8E8E8] mb-4">
            Built for Autonomy
          </h2>
          <p className="text-[#5A5A5A] max-w-lg mx-auto">
            Every component engineered for AI agents to thrive without human dependency.
          </p>
        </AnimatedSection>

        <div className="bento-grid">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass glass-hover p-8 h-full"
              >
                <div className="text-2xl mb-4 text-accent">{f.icon}</div>
                <h3 className="font-mono text-base font-bold text-[#E8E8E8] mb-2">{f.title}</h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
