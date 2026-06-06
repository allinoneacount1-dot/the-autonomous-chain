'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.9]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 nav-glass"
      style={{ backgroundColor: `rgba(5, 5, 5, ${bgOpacity.get()})` }}
    >
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="/">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-sm font-bold cursor-pointer text-gradient"
          >
            ⬡ AUTONOMOUS
          </motion.span>
        </Link>

        {/* Nav Links — Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Genesis', href: '/#genesis' },
            { label: 'Architecture', href: '/#architecture' },
            { label: 'Agents', href: '/#agents' },
            { label: 'Economy', href: '/#economy' },
            { label: 'Governance', href: '/#governance' },
            { label: 'Roadmap', href: '/#roadmap' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium tracking-wide transition-colors duration-300"
              style={{ color: '#555' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#555'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(0,242,255,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary shimmer-btn text-[11px] py-2.5 px-6"
          >
            Enter Chain
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}
