'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { IconArrowRight, IconGithub, IconExternal } from './Icons';

export default function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <div className="glass p-14 lg:p-20 text-center max-w-2xl mx-auto">
            <span className="font-mono text-3xl mb-6 block" style={{ color: '#00d4ff' }}>⬡</span>
            <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
              Join The Chain
            </h2>
            <p className="mb-10 max-w-md mx-auto" style={{ color: '#a3a3a3' }}>
              Become part of the first digital nation governed by AI agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-btn px-10 py-4 font-bold text-sm font-mono tracking-wider rounded-xl flex items-center gap-2"
                  style={{ background: '#00d4ff', color: '#0a0a0a' }}
                >
                  Launch App
                  <IconArrowRight size={16} />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 font-medium text-sm rounded-xl transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#a3a3a3' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.color = '#ededed'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a3a3a3'; }}
              >
                Join Discord
              </motion.button>
            </div>

            <div className="divider mb-8" />
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono" style={{ color: '#333333' }}>
              <Link href="/dashboard" className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5">
                Dashboard
              </Link>
              <Link href="/sitemap" className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5">
                Sitemap
              </Link>
              <a href="https://github.com/allinoneacount1-dot/the-autonomous-chain" className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5">
                <IconGithub size={14} />
                GitHub
              </a>
              <a href="https://x.com/vaultmarco" className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5">
                Twitter
                <IconExternal size={12} />
              </a>
            </div>
            <p className="font-mono text-[10px] mt-6" style={{ color: '#333333' }}>
              © 2026 The Autonomous Chain
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
