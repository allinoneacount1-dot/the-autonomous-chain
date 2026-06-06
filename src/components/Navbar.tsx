'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from './AnimatedSection';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backgroundColor: `rgba(5, 5, 5, ${bgOpacity.get()})`,
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold gradient-text cursor-pointer"
          >
            ⬡ AUTONOMOUS
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Genesis', href: '/#genesis' },
            { label: 'Architecture', href: '/#architecture' },
            { label: 'Agents', href: '/#agents' },
            { label: 'Economy', href: '/#economy' },
            { label: 'Governance', href: '/#governance' },
            { label: 'Roadmap', href: '/#roadmap' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Sitemap', href: '/sitemap' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Link
                href={item.href}
                className="text-[#B0B0C8] hover:text-[#00F0FF] transition-colors text-sm font-medium tracking-wide"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <Link href="/dashboard">
          <MagneticButton className="px-6 py-2.5 bg-[#00F0FF] text-[#050505] font-bold text-sm rounded-xl tracking-wide">
            Join the Chain
          </MagneticButton>
        </Link>
      </div>
    </motion.nav>
  );
}
