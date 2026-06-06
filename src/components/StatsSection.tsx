'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconZap, IconShield, IconCpu, IconChain } from './Icons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 2000, suffix: '+', label: 'Active Agents', Icon: IconCpu, color: '#00f2ff' },
  { value: 0, prefix: '$', label: 'Gas Fees', Icon: IconZap, color: '#34d399' },
  { value: 1, suffix: 's', prefix: '<', label: 'Finality', Icon: IconChain, color: '#bc4dff' },
  { value: 100, suffix: '%', label: 'Autonomous', Icon: IconShield, color: '#fbbf24' },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!valueRef.current) return;
    const el = valueRef.current;

    // Only animate numeric values
    if (stat.value > 0 && stat.label !== 'Finality') {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (valueRef.current) {
            const prefix = stat.prefix || '';
            const suffix = stat.suffix || '';
            valueRef.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [stat]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="glass hover-lift p-8 lg:p-10 cursor-default text-center"
    >
      <div className="flex justify-center mb-5">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{
          background: `${stat.color}10`,
          border: `1px solid ${stat.color}15`,
        }}>
          <stat.Icon size={20} style={{ color: stat.color }} />
        </div>
      </div>
      <div
        ref={valueRef}
        className="font-mono text-3xl lg:text-4xl font-bold mb-2"
        style={{ color: '#e8e8e8' }}
      >
        {stat.prefix || ''}{stat.value}{stat.suffix || ''}
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
