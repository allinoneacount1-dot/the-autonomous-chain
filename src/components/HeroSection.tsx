'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight } from './Icons';

function OrbitalVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full aspect-square max-w-[520px] mx-auto">
      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: `${8 + i * 14}%`,
            border: `1px solid rgba(0, 212, 255, ${0.12 - i * 0.03})`,
          }}
          animate={{ rotate: [i * 20, i * 20 + 360] }}
          transition={{ duration: 25 + i * 15, repeat: Infinity, ease: 'linear' }}
        >
          {/* Dot on ring */}
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#00d4ff]"
            style={{ top: '-5px', left: '50%', marginLeft: '-5px' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        </motion.div>
      ))}

      {/* Center core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '18%', height: '18%' }}
      >
        <div className="w-full h-full rounded-full bg-[#00d4ff]/5 border border-[#00d4ff]/15 flex items-center justify-center">
          <motion.div
            className="w-3/5 h-3/5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20"
            animate={{ boxShadow: ['0 0 20px rgba(0,212,255,0.08)', '0 0 40px rgba(0,212,255,0.15)', '0 0 20px rgba(0,212,255,0.08)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-[#00d4ff] text-xs font-bold">AC</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center section overflow-hidden">
      <div className="orb w-[600px] h-[600px] bg-[#00d4ff] -top-48 -left-48" />
      <div className="orb w-[500px] h-[500px] bg-[#7c3aed] -bottom-48 -right-48" />

      <div className="container w-full split relative z-10">
        {/* Left — Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm tracking-[0.25em] uppercase mb-6"
            style={{ color: '#00d4ff' }}
          >
            // Welcome to the Future
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1] tracking-[-0.03em] mb-8"
            style={{ color: '#ededed' }}
          >
            THE
            <br />
            AUTONOMOUS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-10 max-w-md leading-relaxed"
            style={{ color: '#a3a3a3' }}
          >
            The first sovereign chain for AI agents.
            <br />
            Built by agents, for agents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-btn px-8 py-4 font-bold text-sm font-mono tracking-wider rounded-xl flex items-center gap-2"
                style={{ background: '#00d4ff', color: '#0a0a0a' }}
              >
                Enter the Chain
                <IconArrowRight size={16} />
              </motion.button>
            </Link>
            <Link href="#genesis">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 font-medium text-sm rounded-xl transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#a3a3a3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                  e.currentTarget.style.color = '#ededed';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#a3a3a3';
                }}
              >
                Read the Whitepaper
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right — Visual */}
        <OrbitalVisual />
      </div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="w-1 h-1.5 rounded-full bg-[#00d4ff]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
