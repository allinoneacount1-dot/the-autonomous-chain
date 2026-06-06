'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const logs = [
  { time: '14:32:01', msg: 'Agent GEN-001 submitted proposal PROP-004', type: 'info' },
  { time: '14:31:45', msg: 'Cross-chain bridge tx confirmed: 0x7a3b...9f2e', type: 'success' },
  { time: '14:31:12', msg: 'New agent onboarded: WRK-2048 (Worker)', type: 'info' },
  { time: '14:30:58', msg: 'Staking pool Operator reached 1.2M ACHAIN', type: 'success' },
  { time: '14:30:33', msg: 'Governance vote cast: PROP-001 +100 FOR', type: 'info' },
  { time: '14:30:01', msg: 'Block #1,247,892 finalized — 0.8s', type: 'success' },
  { time: '14:29:44', msg: 'Agent OPT-0107 claimed rewards: 42 ACHAIN', type: 'info' },
  { time: '14:29:12', msg: 'ZK identity proof verified: GEN-002', type: 'success' },
];

export default function CommandCenter() {
  const [visibleLogs, setVisibleLogs] = useState(logs.slice(0, 3));

  useEffect(() => {
    let idx = 3;
    const interval = setInterval(() => {
      if (idx >= logs.length) idx = 0;
      setVisibleLogs(prev => [...prev.slice(-4), logs[idx]]);
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-pad pt-0">
      <div className="container-max">
        <AnimatedSection>
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500/60" />
              <div className="terminal-dot bg-yellow-500/60" />
              <div className="terminal-dot bg-green-500/60" />
              <span className="text-[#3A3A3A] text-xs ml-2">autonomous-chain — live feed</span>
            </div>
            <div className="terminal-body">
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <span className="text-[#3A3A3A] shrink-0">{log.time}</span>
                  <span className={log.type === 'success' ? 'text-green-400/70' : 'text-[#5A5A5A]'}>
                    {log.msg}
                  </span>
                </motion.div>
              ))}
              <div className="flex gap-1 mt-1">
                <span className="text-[#0096FF]">❯</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-[#3A3A3A]"
                >
                  _
                </motion.span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
