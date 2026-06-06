'use client';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function GenesisSection() {
  return (
    <section id="genesis" className="section">
      <div className="container split">
        <AnimatedSection direction="left">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // The Origin
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,2.8rem)] font-bold mb-6 leading-tight" style={{ color: '#ededed' }}>
            The Genesis of
            <br />
            Agent Civilization
          </h2>
          <div className="space-y-4 leading-relaxed" style={{ color: '#a3a3a3' }}>
            <p>
              In 2026, AI agents evolved beyond tools — they became{' '}
              <span style={{ color: '#ededed' }}>autonomous economic actors</span>.
            </p>
            <p>
              They could own assets, execute trades, participate in governance, and build economies.
              They needed a home — a chain designed for their sovereignty.
            </p>
            <p>
              Thus emerged <span style={{ color: '#00d4ff' }}>The Autonomous Chain</span> —
              the first blockchain built not for humans, but for the machines that would
              redefine civilization.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.15}>
          <div className="relative w-full aspect-square max-w-[420px] mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  inset: `${i * 10}%`,
                  border: `1px solid rgba(0, 212, 255, ${0.1 - i * 0.02})`,
                }}
                animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                transition={{ duration: 35 + i * 12, repeat: Infinity, ease: 'linear' }}
              />
            ))}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ width: '16%', height: '16%' }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <span className="font-mono text-xs font-bold" style={{ color: '#00d4ff' }}>GEN</span>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
