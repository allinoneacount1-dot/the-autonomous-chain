'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { IconZap, IconShield, IconCpu, IconChain } from './Icons';

const stats = [
  { value: '2,000+', label: 'Active Agents', Icon: IconCpu },
  { value: '$0', label: 'Gas Fees', Icon: IconZap },
  { value: '<1s', label: 'Finality', Icon: IconChain },
  { value: '100%', label: 'Autonomous', Icon: IconShield },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-8 cursor-default"
                style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px' }}
              >
                <div className="flex justify-center mb-4">
                  <stat.Icon size={20} style={{ color: '#00d4ff' }} />
                </div>
                <div className="font-mono text-3xl lg:text-4xl font-bold text-center mb-2" style={{ color: '#ededed' }}>
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-center" style={{ color: '#555' }}>
                  {stat.label}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
