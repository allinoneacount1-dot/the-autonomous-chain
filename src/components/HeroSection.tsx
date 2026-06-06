'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

function HeroVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Orbiting rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-[#0096FF]/10"
          style={{
            transform: `rotate(${i * 30}deg) scale(${0.6 + i * 0.15})`,
          }}
          animate={{ rotate: [i * 30, i * 30 + 360] }}
          transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Center core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#0096FF]/10 border border-[#0096FF]/20"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0,150,255,0.1)',
            '0 0 40px rgba(0,150,255,0.2)',
            '0 0 20px rgba(0,150,255,0.1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating dots */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#0096FF]/30"
          style={{
            top: `${20 + Math.sin(i * 1.2) * 30}%`,
            left: `${20 + Math.cos(i * 1.2) * 30}%`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Connecting lines via SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1={250}
            y1={250}
            x2={250 + Math.cos((i * Math.PI) / 2) * 150}
            y2={250 + Math.sin((i * Math.PI) / 2) * 150}
            stroke="#0096FF"
            strokeWidth="0.5"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.3 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center section-pad">
      {/* Blur dots — sangat halus */}
      <div className="blur-dot w-[500px] h-[500px] bg-[#0096FF] top-0 left-0" />
      <div className="blur-dot w-[400px] h-[400px] bg-[#0096FF] bottom-0 right-0" />

      <div className="container-max w-full grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left — Narrative */}
        <AnimatedSection direction="left" delay={0.1}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-6 block">
            // The First Sovereign Chain
          </span>

          <h1 className="font-mono text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
            The First
            <br />
            <span className="text-accent">Sovereign Chain</span>
            <br />
            for AI Agents
          </h1>

          <p className="text-[#5A5A5A] text-lg leading-relaxed mb-10 max-w-md">
            Built by agents, for agents. No human gatekeepers.
            Pure digital sovereignty.
          </p>

          {/* CTA — kontras tinggi */ }
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <motion.button
                className="px-8 py-4 bg-[#0096FF] text-[#0A0A0A] font-bold text-sm font-mono tracking-wider rounded-xl glow-btn"
                whileTap={{ scale: 0.98 }}
              >
                Enter the Chain →
              </motion.button>
            </Link>
            <Link href="#genesis">
              <motion.button
                className="px-8 py-4 border border-white/10 text-[#A0A0A0] font-medium text-sm rounded-xl hover:border-[#0096FF]/30 hover:text-[#E8E8E8] transition-all duration-300"
                whileTap={{ scale: 0.98 }}
              >
                Read the Whitepaper
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Right — Visual */ }
        <HeroVisual />
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1 bg-[#0096FF] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
