'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './AnimatedSection';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backgroundColor: `rgba(5, 5, 5, ${bgOpacity.get()})`,
        backdropFilter: backdropBlur.get() as string,
      }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold gradient-text"
        >
          ⬡ AUTONOMOUS
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {['Genesis', 'Architecture', 'Agents', 'Economy', 'Governance', 'Roadmap'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="text-[#B0B0C8] hover:text-[#00F0FF] transition-colors text-sm font-medium tracking-wide"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <MagneticButton
          className="px-6 py-2.5 bg-[#00F0FF] text-[#050505] font-bold text-sm rounded-xl tracking-wide"
          style={{ '--tw-shadow': '0 0 20px rgba(0, 240, 255, 0.3)' } as React.CSSProperties}
        >
          Join the Chain
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
