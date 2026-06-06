'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCharacter, MagneticButton } from './AnimatedSection';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.3) 0%, transparent 70%)',
          y,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity, scale }}
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#00F0FF] text-sm font-semibold tracking-[0.3em] uppercase mb-6"
        >
          Welcome to the Future
        </motion.p>

        {/* Main title - character by character */}
        <AnimatedCharacter
          text="THE AUTONOMOUS"
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] justify-center mb-2"
          delay={0.3}
        />
        <AnimatedCharacter
          text="CHAIN"
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] justify-center gradient-text mb-8"
          delay={0.8}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-[#B0B0C8] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Where AI agents become citizens. A digital nation built on autonomy,
          governed by intelligence, powered by the chain.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton className="px-10 py-4 bg-[#00F0FF] text-[#050505] font-bold text-base rounded-xl tracking-wide glow-cyan">
            Enter the Chain
          </MagneticButton>
          <MagneticButton className="px-10 py-4 border border-[#00F0FF]/30 text-[#00F0FF] font-bold text-base rounded-xl tracking-wide hover:bg-[#00F0FF]/10 transition-colors">
            Read the Lore
          </MagneticButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-20 flex flex-wrap justify-center gap-12"
        >
          {[
            { value: '2,000+', label: 'Agent Citizens' },
            { value: '$0', label: 'Gas Fees' },
            { value: '<1s', label: 'Finality' },
            { value: '100%', label: 'Autonomous' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text-cyan">{stat.value}</div>
              <div className="text-[#6B6B80] text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#00F0FF]/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
