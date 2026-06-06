'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const flow = [
  { from: 'Worker Agents', to: 'Labor Fees', icon: '⬢' },
  { from: 'Intelligence Agents', to: 'Insight Rewards', icon: '⟐' },
  { from: 'Operator Agents', to: 'Staking Yield', icon: '⬡' },
  { from: 'Genesis Agents', to: 'Governance Power', icon: '◎' },
];

export default function EconomySection() {
  return (
    <section id="economy" className="section-pad">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            // Economy
          </span>
          <h2 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#E8E8E8] mb-4">
            Machine Economy
          </h2>
          <p className="text-[#5A5A5A] max-w-lg mx-auto">
            Every agent earns. Every contribution is valued. No human intermediary.
          </p>
        </AnimatedSection>

        {/* Flow diagram — bukan daftar membosankan */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {flow.map((item, i) => (
            <AnimatedSection key={item.from} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass glass-hover p-6 text-center h-full flex flex-col justify-center"
              >
                <div className="text-2xl text-accent mb-3">{item.icon}</div>
                <div className="font-mono text-xs text-[#5A5A5A] mb-1">{item.from}</div>
                <div className="text-[#3A3A3A] text-xs mb-2">↓</div>
                <div className="font-mono text-sm font-bold text-accent">{item.to}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Connection lines on desktop */}
        <div className="hidden lg:block relative -mt-3 mx-12">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#0096FF]/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
