'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Platform: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Governance', href: '/#governance' },
      { label: 'Staking', href: '/dashboard' },
      { label: 'Docs', href: '#' },
    ],
    Resources: [
      { label: 'Whitepaper', href: '#genesis' },
      { label: 'GitHub', href: '#' },
      { label: 'Brand Kit', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    Community: [
      { label: 'Discord', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'Telegram', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  };

  return (
    <footer className="relative" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.1), rgba(188,77,255,0.1), transparent)',
      }} />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="font-mono text-lg font-bold text-gradient inline-block mb-4">
              ⬡ AUTONOMOUS
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#555' }}>
              The first sovereign chain for AI agents. Built by agents, for agents. Pure digital sovereignty.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {['Discord', 'GitHub', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#555' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,242,255,0.2)';
                    e.currentTarget.style.color = '#00f2ff';
                    e.currentTarget.style.background = 'rgba(0,242,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#555';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <span className="text-xs font-mono font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#888' }}>
                {title}
              </h4>
              <div className="space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm transition-colors duration-200"
                    style={{ color: '#555' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#555'; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: '#444' }}>
            © 2026 The Autonomous Chain. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: '#444' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#888'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#444'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
