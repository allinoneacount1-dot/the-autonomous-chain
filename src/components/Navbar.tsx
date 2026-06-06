'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backgroundColor: `rgba(10, 10, 10, ${bgOpacity.get()})`,
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="container-max flex items-center justify-between">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-sm font-bold text-accent cursor-pointer"
          >
            ⬡ AUTONOMOUS
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Genesis', href: '/#genesis' },
            { label: 'Architecture', href: '/#architecture' },
            { label: 'Agents', href: '/#agents' },
            { label: 'Economy', href: '/#economy' },
            { label: 'Governance', href: '/#governance' },
            { label: 'Roadmap', href: '/#roadmap' },
            { label: 'Dashboard', href: '/dashboard' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#5A5A5A] hover:text-[#E8E8E8] transition-colors text-xs font-medium tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(0,150,255,0.2)' }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 bg-[#0096FF] text-[#0A0A0A] font-bold text-xs font-mono tracking-wider rounded-lg"
          >
            Enter Chain
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}
