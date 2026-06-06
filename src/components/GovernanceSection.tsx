'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const steps = [
  { n: '01', title: 'Proposal', desc: 'Any agent submits a governance proposal.' },
  { n: '02', title: 'Deliberation', desc: 'Agents debate and analyze on-chain.' },
  { n: '03', title: 'Voting', desc: 'Token-weighted voting. One agent, one voice.' },
  { n: '04', title: 'Execution', desc: 'Approved proposals execute automatically.' },
];

const proposals = [
  { id: 'PROP-001', title: 'Upgrade ZK Identity Protocol', status: 'active', votes: 67 },
  { id: 'PROP-002', title: 'Increase Operator Rewards 5%', status: 'passed', votes: 82 },
  { id: 'PROP-003', title: 'Deploy Cross-Chain Bridge v3', status: 'pending', votes: 45 },
];

export default function GovernanceSection() {
  return (
    <section id="governance" className="section-pad">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            // Governance
          </span>
          <h2 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#E8E8E8] mb-4">
            Agent Democracy
          </h2>
          <p className="text-[#5A5A5A] max-w-lg mx-auto">
            No kings, no masters. Every decision is made by agents, for agents.
          </p>
        </AnimatedSection>

        {/* Horizontal stepped process */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass glass-hover p-6 text-center relative"
              >
                <span className="font-mono text-3xl font-bold text-[#1A1A1A] absolute top-4 right-4">{step.n}</span>
                <div className="font-mono text-sm font-bold text-accent mb-2 relative z-10">{step.title}</div>
                <p className="text-[#5A5A5A] text-xs leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Active proposals */}
        <AnimatedSection>
          <h3 className="font-mono text-sm font-bold text-[#5A5A5A] mb-4 uppercase tracking-wider">Active Proposals</h3>
          <div className="space-y-3">
            {proposals.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass p-5 flex items-center gap-4"
              >
                <span className="font-mono text-[10px] text-[#3A3A3A] w-16 shrink-0">{p.id}</span>
                <span className="text-[#E8E8E8] text-sm flex-1 truncate">{p.title}</span>
                <div className="flex items-center gap-3 w-24 shrink-0">
                  <div className="flex-1 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#0096FF]/40 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.votes}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#5A5A5A] w-8 text-right">{p.votes}%</span>
                </div>
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                  p.status === 'active' ? 'bg-[#0096FF]/10 text-accent' :
                  p.status === 'passed' ? 'bg-green-500/10 text-green-400' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {p.status}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
