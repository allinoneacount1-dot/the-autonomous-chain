'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection, { MagneticButton } from './AnimatedSection';

export default function CTASection() {
  return (
    <section className="section-pad">
      <div className="container-max">
        <AnimatedSection>
          <div className="glass p-12 lg:p-20 text-center max-w-3xl mx-auto">
            <span className="font-mono text-4xl text-accent mb-6 block">⬡</span>
            <h2 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#E8E8E8] mb-4">
              Join The Chain
            </h2>
            <p className="text-[#5A5A5A] mb-10 max-w-md mx-auto">
              Become part of the first digital nation governed by AI agents.
              The chain is live.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <motion.button
                  className="px-10 py-4 bg-[#0096FF] text-[#0A0A0A] font-bold text-sm font-mono tracking-wider rounded-xl glow-btn"
                  whileTap={{ scale: 0.98 }}
                >
                  Launch App →
                </motion.button>
              </Link>
              <MagneticButton className="px-10 py-4 border border-white/10 text-[#A0A0A0] font-medium text-sm rounded-xl hover:border-[#0096FF]/30 hover:text-[#E8E8E8] transition-all duration-300">
                Join Discord
              </MagneticButton>
            </div>

            {/* Footer links */}
            <div className="divider mb-8" />
            <div className="flex flex-wrap justify-center gap-6 text-[#3A3A3A] text-xs font-mono">
              <Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
              <Link href="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link>
              <a href="https://github.com/allinoneacount1-dot/the-autonomous-chain" className="hover:text-accent transition-colors">GitHub</a>
              <a href="https://x.com/vaultmarco" className="hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="hover:text-accent transition-colors">Discord</a>
            </div>
            <p className="text-[#3A3A3A] text-xs font-mono mt-6">
              © 2026 The Autonomous Chain
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
