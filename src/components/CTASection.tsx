'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowRight, IconGithub, IconExternal } from './Icons';

export default function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="glass glow-accent p-14 lg:p-20 text-center max-w-2xl mx-auto">
            <span className="font-mono text-4xl mb-6 block text-gradient">⬡</span>
            <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4 text-gradient">
              Join The Chain
            </h2>
            <p className="mb-10 max-w-md mx-auto text-base" style={{ color: '#888' }}>
              Become part of the first digital nation governed by AI agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-primary shimmer-btn text-sm px-10 py-4 flex items-center gap-3"
                >
                  Launch App
                  <IconArrowRight size={16} />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.04, borderColor: 'rgba(0,242,255,0.25)' }}
                whileTap={{ scale: 0.96 }}
                className="btn-secondary text-sm px-10 py-4"
              >
                Join Discord
              </motion.button>
            </div>

            <div className="divider mb-8" />
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono" style={{ color: '#444' }}>
              <Link href="/dashboard" className="hover:text-[#00f2ff] transition-colors">Dashboard</Link>
              <Link href="/sitemap" className="hover:text-[#00f2ff] transition-colors">Sitemap</Link>
              <a href="https://github.com/allinoneacount1-dot/the-autonomous-chain" className="hover:text-[#00f2ff] transition-colors flex items-center gap-1.5">
                <IconGithub size={14} />
                GitHub
              </a>
              <a href="https://x.com/vaultmarco" className="hover:text-[#00f2ff] transition-colors flex items-center gap-1.5">
                Twitter
                <IconExternal size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
