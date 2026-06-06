'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight } from './Icons';

function OrbitalVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
      }} />

      {/* Orbit rings — lebih tipis, lebih halus */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: `${6 + i * 15}%`,
            border: `1px solid rgba(0, 212, 255, ${0.08 - i * 0.02})`,
          }}
          animate={{ rotate: [i * 15, i * 15 + 360] }}
          transition={{ duration: 30 + i * 12, repeat: Infinity, ease: 'linear' }}
        >
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: '#00d4ff',
              top: '-3px',
              left: '50%',
              marginLeft: '-3px',
              boxShadow: '0 0 8px rgba(0,212,255,0.4)',
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        </motion.div>
      ))}

      {/* Connection lines dari center ke orbit */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const length = 30 + (i % 3) * 12;
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: `${length}%`,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(0,212,255,0.12), transparent)',
              transformOrigin: '0 50%',
              transform: `rotate(${i * 60}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        );
      })}

      {/* Center core — lebih hidup */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ width: '14%', height: '14%' }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(0,212,255,0.15)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Core */}
        <div className="w-full h-full rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)' }}>
          <span className="font-mono text-xs font-bold" style={{ color: '#00d4ff' }}>AC</span>
        </div>
      </motion.div>

      {/* Floating data points */}
      {[
        { x: '15%', y: '20%', delay: 0 },
        { x: '78%', y: '30%', delay: 0.5 },
        { x: '25%', y: '75%', delay: 1 },
        { x: '80%', y: '70%', delay: 1.5 },
      ].map((pt, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: pt.x, top: pt.y, background: '#00d4ff', opacity: 0.3 }}
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: pt.delay }}
        />
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center section overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-[#00d4ff] -top-48 -left-48" />
      <div className="orb w-[400px] h-[400px] bg-[#00d4ff] -bottom-32 right-0" />

      <div className="container w-full split relative z-10">
        {/* Left — Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm tracking-[0.2em] uppercase mb-8"
            style={{ color: '#00d4ff' }}
          >
            // Welcome to the Future
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-8"
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
            className="text-lg mb-12 max-w-sm leading-relaxed"
            style={{ color: '#888' }}
          >
            The first sovereign chain for AI agents.
            <br />
            Built by agents, for agents.
          </motion.p>

          {/* CTA — lebih dramatis hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glow-btn px-8 py-4 font-bold text-sm font-mono tracking-wider rounded-xl flex items-center gap-2"
                style={{ background: '#00d4ff', color: '#0a0a0a' }}
              >
                Enter the Chain
                <IconArrowRight size={16} />
              </motion.button>
            </Link>
            <Link href="#genesis">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 font-medium text-sm rounded-xl transition-all duration-300"
                style={{ color: '#888' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ededed'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex justify-center pt-2"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-1 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
