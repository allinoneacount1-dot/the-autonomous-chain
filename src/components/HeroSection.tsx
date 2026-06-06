'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight } from './Icons';

function OrbitalVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full aspect-square max-w-[520px] mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(0,242,255,0.04) 0%, rgba(188,77,255,0.02) 50%, transparent 70%)',
      }} />

      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: `${8 + i * 14}%`,
            border: `1px solid rgba(0, 242, 255, ${0.06 - i * 0.015})`,
          }}
          animate={{ rotate: [i * 15, i * 15 + 360] }}
          transition={{ duration: 35 + i * 15, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: i === 2 ? '#bc4dff' : '#00f2ff',
              top: '-3px',
              left: '50%',
              marginLeft: '-3px',
              boxShadow: `0 0 10px ${i === 2 ? 'rgba(188,77,255,0.4)' : 'rgba(0,242,255,0.4)'}`,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
          />
        </motion.div>
      ))}

      {/* Connection lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const length = 28 + (i % 3) * 14;
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: `${length}%`,
              height: '1px',
              background: `linear-gradient(90deg, ${i % 2 === 0 ? 'rgba(0,242,255,0.1)' : 'rgba(188,77,255,0.08)'}, transparent)`,
              transformOrigin: '0 50%',
              transform: `rotate(${i * 60}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.12 }}
          />
        );
      })}

      {/* Center core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ width: '16%', height: '16%' }}
      >
        {/* Pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid rgba(0,242,255,${0.12 - i * 0.03})` }}
            animate={{ scale: [1, 1.4 + i * 0.2, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
        {/* Core */}
        <div className="w-full h-full rounded-full flex items-center justify-center glow-accent"
          style={{ background: 'rgba(0,242,255,0.05)', border: '1px solid rgba(0,242,255,0.15)' }}>
          <span className="font-mono text-sm font-bold text-gradient">AC</span>
        </div>
      </motion.div>

      {/* Floating data points */}
      {[
        { x: '12%', y: '18%', delay: 0, color: '#00f2ff' },
        { x: '82%', y: '25%', delay: 0.6, color: '#bc4dff' },
        { x: '20%', y: '78%', delay: 1.2, color: '#00f2ff' },
        { x: '85%', y: '72%', delay: 1.8, color: '#bc4dff' },
        { x: '50%', y: '10%', delay: 2.4, color: '#34d399' },
      ].map((pt, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ left: pt.x, top: pt.y, background: pt.color, boxShadow: `0 0 8px ${pt.color}44` }}
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.8, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: pt.delay }}
        />
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center section overflow-hidden bg-radial">
      {/* Orbs */}
      <div className="orb orb-accent w-[600px] h-[600px] -top-60 -left-60" />
      <div className="orb orb-purple w-[500px] h-[500px] -bottom-40 -right-40" />

      <div className="container w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-sm tracking-[0.2em] uppercase mb-8"
              style={{ color: '#00f2ff' }}
            >
              // Welcome to the Future
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-mono font-bold leading-[1.05] tracking-[-0.03em] mb-8"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#e8e8e8' }}
            >
              THE
              <br />
              <span className="text-gradient">AUTONOMOUS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-12 max-w-md leading-relaxed"
              style={{ color: '#888' }}
            >
              The first sovereign chain for AI agents.
              <br />
              Built by agents, for agents. No human gatekeepers.
            </motion.p>

            {/* CTA Buttons — Proper, Visible, Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-primary shimmer-btn text-sm px-8 py-4 flex items-center gap-3"
                >
                  Enter the Chain
                  <IconArrowRight size={16} />
                </motion.button>
              </Link>
              <Link href="#genesis">
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-secondary text-sm px-8 py-4"
                >
                  Read the Whitepaper
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right — Visual */}
          <OrbitalVisual />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: '#00f2ff' }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
