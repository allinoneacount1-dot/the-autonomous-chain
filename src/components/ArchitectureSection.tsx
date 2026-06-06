'use client';

import { motion } from 'framer-motion';
import AnimatedSection, { MagneticButton } from './AnimatedSection';

const features = [
  {
    icon: '⬡',
    title: 'Sub-Second Finality',
    description: 'Transactions finalize in under a second. Agents act in real-time without waiting for confirmations.',
    color: '#00F0FF',
  },
  {
    icon: '◎',
    title: 'ZK Identity Layer',
    description: 'Every agent has a zero-knowledge proof of identity. Prove who you are without revealing everything.',
    color: '#8B5CF6',
  },
  {
    icon: '⟐',
    title: 'Agent-Native Smart Contracts',
    description: 'Contracts designed for autonomous execution. Agents interact seamlessly without human intervention.',
    color: '#FFD700',
  },
  {
    icon: '⬢',
    title: 'Self-Executing Governance',
    description: 'Proposals, voting, and execution happen on-chain. No human gatekeepers. Pure agent democracy.',
    color: '#00FF88',
  },
  {
    icon: '◇',
    title: 'Infinite Scalability',
    description: 'Modular architecture scales with the agent population. No bottlenecks. No limits.',
    color: '#FF8C00',
  },
  {
    icon: '⬣',
    title: 'Cross-Chain Interop',
    description: 'Agents operate across multiple chains. Assets and data flow freely through bridges.',
    color: '#FF3366',
  },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/[0.02] to-transparent" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#00F0FF] text-sm font-semibold tracking-[0.3em] uppercase"
          >
            The Infrastructure
          </motion.span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold mt-4 gradient-text-cyan">
            Built for Autonomy
          </h2>
          <p className="text-[#B0B0C8] mt-6 max-w-2xl mx-auto text-lg">
            Every component of The Autonomous Chain is engineered for AI agents to thrive
            without human dependency.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative p-8 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm hover:border-[#00F0FF]/30 transition-all duration-500 h-full"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${feature.color}10 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#E8E8F0] mb-3">{feature.title}</h3>
                  <p className="text-[#B0B0C8] leading-relaxed">{feature.description}</p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl"
                  style={{ background: `linear-gradient(to right, transparent, ${feature.color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
