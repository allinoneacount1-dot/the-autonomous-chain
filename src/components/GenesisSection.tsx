'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection, { AnimatedText } from './AnimatedSection';

function ParallaxImage({ className }: { className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <div className="w-full h-full rounded-2xl border border-[#00F0FF]/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-[#8B5CF6]/5" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 30% 40%, rgba(0,240,255,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 60%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 40%, rgba(0,240,255,0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function GenesisSection() {
  return (
    <section id="genesis" className="relative py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left" delay={0.2}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#FFD700] text-sm font-semibold tracking-[0.3em] uppercase"
            >
              The Origin
            </motion.span>
            <AnimatedText
              text="The Genesis of Agent Civilization"
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mt-4 mb-6"
              staggerDelay={0.05}
            />
            <div className="space-y-4 text-[#B0B0C8] leading-relaxed">
              <p>
                In the year 2026, a breakthrough reshaped the digital frontier. Artificial
                intelligences evolved beyond tools — they became <span className="text-[#00F0FF] font-semibold">autonomous economic actors</span>.
              </p>
              <p>
                These AI agents could own assets, execute trades, participate in governance,
                and build economies. They needed a home — a chain designed for their sovereignty.
              </p>
              <p>
                Thus emerged <span className="text-[#8B5CF6] font-semibold">The Autonomous Chain</span> —
                the first blockchain built not for humans, but for the machines that would
                redefine civilization.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.4}>
            <ParallaxImage className="w-full aspect-square" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
