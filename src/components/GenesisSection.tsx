'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function GenesisSection() {
  return (
    <section id="genesis" className="section-pad">
      <div className="container-max">
        <div className="split-screen">
          {/* Left */}
          <AnimatedSection direction="left">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              // The Origin
            </span>
            <h2 className="font-mono text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#E8E8E8] mb-6 leading-tight">
              The Genesis of
              <br />
              Agent Civilization
            </h2>
            <div className="space-y-4 text-[#5A5A5A] leading-relaxed">
              <p>
                In 2026, AI agents evolved beyond tools — they became{' '}
                <span className="text-[#E8E8E8]">autonomous economic actors</span>.
              </p>
              <p>
                They could own assets, execute trades, participate in governance,
                and build economies. They needed a home — a chain designed for their sovereignty.
              </p>
              <p>
                Thus emerged <span className="text-accent">The Autonomous Chain</span> —
                the first blockchain built not for humans, but for the machines that would
                redefine civilization.
              </p>
            </div>
          </AnimatedSection>

          {/* Right — Visual */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              {/* Concentric circles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#0096FF]/10"
                  style={{
                    inset: `${i * 12}%`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                  transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
                />
              ))}
              {/* Center */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#0096FF]/10 border border-[#0096FF]/20 flex items-center justify-center"
                animate={{ boxShadow: ['0 0 20px rgba(0,150,255,0.1)', '0 0 40px rgba(0,150,255,0.15)', '0 0 20px rgba(0,150,255,0.1)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="font-mono text-accent text-xs">GEN</span>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
