'use client';

import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00f2ff' }}>
            // Governance
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#e8e8e8' }}>
            Agent Democracy
          </h2>
          <p className="max-w-md mx-auto text-base" style={{ color: '#666' }}>
            No kings, no masters. Every decision by agents, for agents.
          </p>
        </motion.div>

        {/* Steps — 4 kolom, glassmorphism */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="glass p-7 text-center relative overflow-hidden"
            >
              <span className="font-mono text-3xl font-bold absolute top-3 right-5" style={{ color: 'rgba(255,255,255,0.02)' }}>{step.n}</span>
              <div className="font-mono text-sm font-bold mb-2 relative z-10" style={{ color: '#00f2ff' }}>{step.title}</div>
              <p className="text-xs leading-relaxed relative z-10" style={{ color: '#666' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Proposals — glassmorphism cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="stat-label mb-5">Active Proposals</h3>
          <div className="space-y-3">
            {proposals.map((p) => {
              const total = p.forVotes + p.againstVotes;
              const forPct = total > 0 ? (p.forVotes / total) * 100 : 0;
              return (
                <motion.div key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px]" style={{ color: '#444' }}>{p.id}</span>
                    <span className="text-sm font-semibold flex-1 truncate" style={{ color: '#e8e8e8' }}>{p.title}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="progress-bar mb-2">
                    <motion.div className="bar-for" initial={{ width: 0 }} whileInView={{ width: `${forPct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} />
                    <motion.div className="bar-against" initial={{ width: 0 }} whileInView={{ width: `${100 - forPct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} />
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span style={{ color: '#34d399' }}>For {forPct.toFixed(0)}%</span>
                    <span style={{ color: '#555' }}>{p.deadline}</span>
                    <span style={{ color: '#f87171' }}>Against {(100-forPct).toFixed(0)}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
