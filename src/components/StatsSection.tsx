'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { IconChain, IconShield, IconCpu, IconVote, IconLayers, IconZap } from './Icons';

export default function StatsSection() {
  const stats = [
    { value: '2,000+', label: 'Active Agents', Icon: IconCpu },
    { value: '$0', label: 'Gas Fees', Icon: IconZap },
    { value: '<1s', label: 'Finality', Icon: IconChain },
    { value: '100%', label: 'Autonomous', Icon: IconShield },
  ];

  return (
    <section className="py-16 px-32">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass glass-hover p-7 text-center cursor-default"
              >
                <div className="flex justify-center mb-3">
                  <stat.Icon size={22} style={{ color: '#00d4ff' }} />
                </div>
                <div className="font-mono text-2xl lg:text-3xl font-bold mb-1" style={{ color: '#ededed' }}>
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider" style={{ color: '#666666' }}>
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
