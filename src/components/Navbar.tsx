'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 nav-glass"
      style={{ backgroundColor: `rgba(10, 10, 10, ${bgOpacity.get()})` }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-sm font-bold cursor-pointer"
            style={{ color: '#00d4ff' }}
          >
            ⬡ AUTONOMOUS
          </motion.span>
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
              className="text-xs font-medium tracking-wide transition-colors duration-200"
              style={{ color: '#666666' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ededed'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#666666'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(0,212,255,0.2)' }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 font-bold text-xs font-mono tracking-wider rounded-lg"
            style={{ background: '#00d4ff', color: '#0a0a0a' }}
          >
            Enter Chain
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}
