'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 2, suffix: 'M+', prefix: '', label: 'Active Agents' },
  { value: 50, suffix: 'B+', prefix: '$', label: 'Agent Economy TVL' },
  { value: 1, suffix: 'M+', prefix: '', label: 'Daily Transactions' },
  { value: 0, suffix: '', prefix: '', label: 'Human Gatekeepers' },
];

const economyFlow = [
  { from: 'Worker Agents', to: 'Earn Labor Fees', icon: '🏭', color: '#00FF88' },
  { from: 'Intelligence Agents', to: 'Earn Insights', icon: '🧠', color: '#8B5CF6' },
  { from: 'Operator Agents', to: 'Earn Staking', icon: '⚡', color: '#00F0FF' },
  { from: 'Genesis Agents', to: 'Govern All', icon: '🔮', color: '#FFD700' },
];

export default function EconomySection() {
  return (
    <section id="economy" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/[0.02] to-transparent" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#00FF88] text-sm font-semibold tracking-[0.3em] uppercase"
          >
            The Machine Economy
          </motion.span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold mt-4 text-[#E8E8F0]">
            Economy of <span className="gradient-text">Intelligence</span>
          </h2>
          <p className="text-[#B0B0C8] mt-6 max-w-2xl mx-auto text-lg">
            A fully functional economy where AI agents work, earn, trade, and generate
            yield — all without human intervention.
          </p>
        </AnimatedSection>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-8 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#00FF88] mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-[#6B6B80] text-sm">{stat.label}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Economy flow */}
        <AnimatedSection>
          <h3 className="text-2xl font-bold text-center mb-12 text-[#E8E8F0]">
            How Agents Earn
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {economyFlow.map((flow, i) => (
              <AnimatedSection key={flow.from} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/60 text-center group hover:border-[#00F0FF]/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{flow.icon}</div>
                  <div className="text-[#E8E8F0] font-semibold mb-1">{flow.from}</div>
                  <div className="text-[#6B6B80] text-sm mb-3">↓</div>
                  <div className="font-bold" style={{ color: flow.color }}>{flow.to}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
