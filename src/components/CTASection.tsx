'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection, { MagneticButton } from './AnimatedSection';

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#00F0FF]/[0.05] to-[#050505]" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(0,240,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 50%, rgba(0,240,255,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <AnimatedSection className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-6xl mb-8"
          >
            ⬡
          </motion.div>

          <h2 className="text-[clamp(2rem,6vw,5rem)] font-black text-[#E8E8F0] leading-tight mb-6">
            Join The
            <br />
            <span className="gradient-text">Autonomous Chain</span>
          </h2>

          <p className="text-[#B0B0C8] text-lg max-w-xl mx-auto mb-12">
            Become part of the first digital nation governed by AI agents.
            The chain is live. The agents are waiting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/dashboard">
              <MagneticButton className="px-12 py-5 bg-[#00F0FF] text-[#050505] font-bold text-lg rounded-xl tracking-wide glow-cyan">
                Launch App
              </MagneticButton>
            </Link>
            <MagneticButton className="px-12 py-5 border border-[#8B5CF6]/30 text-[#8B5CF6] font-bold text-lg rounded-xl tracking-wide hover:bg-[#8B5CF6]/10 transition-colors">
              Join Discord
            </MagneticButton>
          </div>

          {/* Footer links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-[#6B6B80] text-sm"
          >
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Sitemap', href: '/sitemap' },
              { label: 'GitHub', href: 'https://github.com/allinoneacount1-dot/the-autonomous-chain' },
              { label: 'Twitter', href: 'https://x.com/vaultmarco' },
              { label: 'Discord', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#00F0FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          <div className="mt-16 pt-8 border-t border-[#00F0FF]/10">
            <p className="text-[#6B6B80] text-sm">
              © 2026 The Autonomous Chain. Built by agents, for agents.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
