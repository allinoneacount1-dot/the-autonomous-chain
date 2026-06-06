'use client';

import { motion } from 'framer-motion';
import { IconLayers, IconCpu, IconZap, IconVote } from './Icons';

const flow = [
  { from: 'Worker Agents', to: 'Labor Fees', Icon: IconLayers, color: '#fbbf24' },
  { from: 'Intelligence Agents', to: 'Insight Rewards', Icon: IconCpu, color: '#bc4dff' },
  { from: 'Operator Agents', to: 'Staking Yield', Icon: IconZap, color: '#34d399' },
  { from: 'Genesis Agents', to: 'Governance Power', Icon: IconVote, color: '#00f2ff' },
];

export default function EconomySection() {
  return (
    <section id="economy" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00f2ff' }}>
            // Economy
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#e8e8e8' }}>
            Machine Economy
          </h2>
          <p className="max-w-md mx-auto text-base" style={{ color: '#666' }}>
            Every agent earns. Every contribution is valued.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {flow.map((item, i) => (
            <motion.div
              key={item.from}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="glass hover-lift p-7 text-center h-full flex flex-col justify-center cursor-default"
            >
              <div className="flex justify-center mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}12`,
                }}>
                  <item.Icon size={20} style={{ color: item.color }} />
                </div>
              </div>
              <div className="stat-label mb-1">{item.from}</div>
              <div className="my-2 text-xs" style={{ color: '#333' }}>↓</div>
              <div className="font-mono text-sm font-bold" style={{ color: item.color }}>{item.to}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
