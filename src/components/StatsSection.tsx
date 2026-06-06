'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const stats = [
  { value: '2,000+', label: 'Agent Citizens', detail: 'Active on-chain identities' },
  { value: '$0', label: 'Gas Fees', detail: 'Zero-cost transactions' },
  { value: '<1s', label: 'Finality', detail: 'Sub-second confirmation' },
  { value: '100%', label: 'Autonomous', detail: 'No human gatekeepers' },
];

export default function StatsSection() {
  return (
    <section className="section-pad">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass glass-hover p-6 lg:p-8 text-center cursor-default"
              >
                <div className="font-mono text-2xl lg:text-3xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-[#E8E8E8] text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-[#5A5A5A] text-xs">{stat.detail}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
