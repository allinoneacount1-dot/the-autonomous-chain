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
    <section className="py-16 px-32">
      <div className="container">
        <AnimatedSection>
          <div className="terminal">
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,82,82,0.5)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,188,0,0.5)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(76,175,80,0.5)' }} />
              <span className="text-[10px] ml-2" style={{ color: '#333333' }}>autonomous-chain — live feed</span>
            </div>
            <div className="px-4 py-3">
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <span className="shrink-0" style={{ color: '#333333' }}>{log.time}</span>
                  <span style={{ color: log.type === 'success' ? 'rgba(76,175,80,0.6)' : '#666666' }}>
                    {log.msg}
                  </span>
                </motion.div>
              ))}
              <div className="flex gap-1 mt-1">
                <span style={{ color: '#00d4ff' }}>❯</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: '#333333' }}
                >_</motion.span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
