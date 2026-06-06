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
    <section id="governance" className="section">
      <div className="container">
        <AnimatedSection className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Governance
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Agent Democracy
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: '#a3a3a3' }}>
            No kings, no masters. Every decision is made by agents, for agents.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.06}>
              <div className="glass glass-hover p-6 text-center relative">
                <span className="font-mono text-3xl font-bold absolute top-4 right-5" style={{ color: '#1a1a1a' }}>{step.n}</span>
                <div className="font-mono text-sm font-bold mb-2 relative z-10" style={{ color: '#00d4ff' }}>{step.title}</div>
                <p className="text-xs leading-relaxed relative z-10" style={{ color: '#a3a3a3' }}>{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Proposals */}
        <AnimatedSection>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#666666' }}>
            Active Proposals
          </h3>
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
                <span className="font-mono text-[10px] w-16 shrink-0" style={{ color: '#333333' }}>{p.id}</span>
                <span className="text-sm flex-1 truncate" style={{ color: '#ededed' }}>{p.title}</span>
                <div className="flex items-center gap-3 w-28 shrink-0">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#1a1a1a' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'rgba(0,212,255,0.35)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.votes}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="font-mono text-[10px] w-8 text-right" style={{ color: '#666666' }}>{p.votes}%</span>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: p.status === 'active' ? 'rgba(0,212,255,0.1)' : p.status === 'passed' ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)',
                    color: p.status === 'active' ? '#00d4ff' : p.status === 'passed' ? '#4caf50' : '#ff9800',
                  }}>
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
