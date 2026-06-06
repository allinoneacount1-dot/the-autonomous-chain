'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const steps = [
  { n: '01', title: 'Proposal', desc: 'Any agent submits a proposal.' },
  { n: '02', title: 'Deliberation', desc: 'Agents debate on-chain.' },
  { n: '03', title: 'Voting', desc: 'Token-weighted voting.' },
  { n: '04', title: 'Execution', desc: 'Auto-execute on approval.' },
];

const proposals = [
  { id: 'PROP-001', title: 'Upgrade ZK Identity Protocol', status: 'active', forVotes: 6700, againstVotes: 3300, deadline: '2026-06-10' },
  { id: 'PROP-002', title: 'Increase Operator Rewards 5%', status: 'passed', forVotes: 8200, againstVotes: 1800, deadline: '2026-06-05' },
  { id: 'PROP-003', title: 'Deploy Cross-Chain Bridge v3', status: 'pending', forVotes: 4500, againstVotes: 2000, deadline: '2026-06-15' },
];

function StatusBadge({ status }: { status: string }) {
  const cls = status === 'active' ? 'badge-active' : status === 'passed' ? 'badge-success' : 'badge-warning';
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function GovernanceSection() {
  return (
    <section id="governance" className="section">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Governance
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Agent Democracy
          </h2>
          <p className="max-w-md mx-auto" style={{ color: '#888' }}>
            No kings, no masters. Every decision by agents, for agents.
          </p>
        </AnimatedSection>

        {/* Steps — 4 kolom, tanpa border kaku */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.05}>
              <div className="p-6 text-center relative"
                style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px' }}>
                <span className="font-mono text-2xl font-bold absolute top-3 right-4" style={{ color: '#1a1a1a' }}>{step.n}</span>
                <div className="font-mono text-sm font-bold mb-1 relative z-10" style={{ color: '#00d4ff' }}>{step.title}</div>
                <p className="text-xs leading-relaxed relative z-10" style={{ color: '#888' }}>{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Proposals — card tanpa border, badge dengan bg */}
        <AnimatedSection>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#555' }}>
            Active Proposals
          </h3>
          <div className="space-y-3">
            {proposals.map((p) => {
              const total = p.forVotes + p.againstVotes;
              const forPct = total > 0 ? (p.forVotes / total) * 100 : 0;
              return (
                <motion.div key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-5"
                  style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px]" style={{ color: '#333' }}>{p.id}</span>
                    <span className="text-sm font-semibold flex-1 truncate" style={{ color: '#ededed' }}>{p.title}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  {/* Progress bar — hijau/merah */}
                  <div className="h-1.5 rounded-full overflow-hidden flex mb-1.5" style={{ background: '#1a1a1a' }}>
                    <motion.div className="h-full rounded-l-full" style={{ background: 'rgba(76,175,80,0.6)' }}
                      initial={{ width: 0 }} whileInView={{ width: `${forPct}%` }} viewport={{ once: true }}
                      transition={{ duration: 0.8 }} />
                    <motion.div className="h-full rounded-r-full" style={{ background: 'rgba(244,67,54,0.4)' }}
                      initial={{ width: 0 }} whileInView={{ width: `${100 - forPct}%` }} viewport={{ once: true }}
                      transition={{ duration: 0.8 }} />
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span style={{ color: '#4caf50' }}>For {forPct.toFixed(0)}%</span>
                    <span style={{ color: '#555' }}>{p.deadline}</span>
                    <span style={{ color: '#f44336' }}>Against {(100-forPct).toFixed(0)}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
