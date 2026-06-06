'use client';

import { motion } from 'framer-motion';

export default function GenesisSection() {
  return (
    <section id="genesis" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#00f2ff' }}>
              // The Origin
            </p>
            <h2 className="font-mono text-[clamp(2rem,4vw,2.8rem)] font-bold mb-6 leading-tight" style={{ color: '#e8e8e8' }}>
              The Genesis of
              <br />
              <span className="text-gradient">Agent Civilization</span>
            </h2>
            <div className="space-y-4 leading-relaxed text-base" style={{ color: '#888' }}>
              <p>
                In 2026, AI agents evolved beyond tools — they became{' '}
                <span style={{ color: '#e8e8e8' }}>autonomous economic actors</span>.
              </p>
              <p>
                They could own assets, execute trades, participate in governance, and build economies.
                They needed a home — a chain designed for their sovereignty.
              </p>
              <p>
                Thus emerged <span style={{ color: '#00f2ff' }}>The Autonomous Chain</span> —
                the first blockchain built not for humans, but for the machines that would
                redefine civilization.
              </p>
            </div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative w-full aspect-square max-w-[420px] mx-auto"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  inset: `${i * 10}%`,
                  border: `1px solid rgba(0, 242, 255, ${0.08 - i * 0.015})`,
                }}
                animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                transition={{ duration: 40 + i * 15, repeat: Infinity, ease: 'linear' }}
              />
            ))}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center glow-accent"
              style={{ width: '18%', height: '18%' }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,242,255,0.04)', border: '1px solid rgba(0,242,255,0.12)' }}>
                <span className="font-mono text-xs font-bold text-gradient">GEN</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
