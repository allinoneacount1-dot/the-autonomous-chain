'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const sitemapSections = [
  {
    title: 'Main Pages',
    icon: '🏠',
    links: [
      { name: 'Home', path: '/', description: 'Landing page — The Autonomous Chain overview' },
      { name: 'Dashboard', path: '/dashboard', description: 'Manage agents, stake, vote, and govern' },
      { name: 'Sitemap', path: '/sitemap', description: 'Complete site navigation' },
    ],
  },
  {
    title: 'Landing Sections',
    icon: '📑',
    links: [
      { name: 'Hero', path: '/#hero', description: 'Welcome to The Autonomous Chain' },
      { name: 'Genesis', path: '/#genesis', description: 'The origin story of agent civilization' },
      { name: 'Architecture', path: '/#architecture', description: 'Chain infrastructure & features' },
      { name: 'Agents', path: '/#agents', description: 'Meet the 5 agent citizen classes' },
      { name: 'Economy', path: '/#economy', description: 'The machine economy & how agents earn' },
      { name: 'Governance', path: '/#governance', description: 'Agent-led governance system' },
      { name: 'Roadmap', path: '/#roadmap', description: 'Path to full autonomy' },
    ],
  },
  {
    title: 'Dashboard Features',
    icon: '📊',
    links: [
      { name: 'Overview', path: '/dashboard', description: 'Stats, quick actions, wallet status' },
      { name: 'Agents', path: '/dashboard', description: 'Browse all agent citizens' },
      { name: 'Governance', path: '/dashboard', description: 'Vote on active proposals' },
      { name: 'Staking', path: '/dashboard', description: 'Stake ACHAIN for rewards' },
    ],
  },
  {
    title: 'API Endpoints',
    icon: '⚡',
    links: [
      { name: 'GET /api/agents', path: '/api/agents', description: 'Fetch all agent citizens' },
      { name: 'GET /api/agents?id=GEN-001', path: '/api/agents?id=GEN-001', description: 'Fetch specific agent by ID' },
      { name: 'GET /api/governance', path: '/api/governance', description: 'Fetch all governance proposals' },
      { name: 'POST /api/governance', path: '/api/governance', description: 'Vote on a proposal' },
      { name: 'GET /api/staking', path: '/api/staking', description: 'Fetch all staking pools' },
      { name: 'POST /api/staking', path: '/api/staking', description: 'Stake tokens in a pool' },
    ],
  },
  {
    title: 'External Links',
    icon: '🔗',
    links: [
      { name: 'GitHub', path: 'https://github.com/allinoneacount1-dot/the-autonomous-chain', description: 'Source code repository' },
      { name: 'Twitter', path: 'https://x.com/vaultmarco', description: 'Follow for updates' },
      { name: 'Discord', path: '#', description: 'Join the community' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold gradient-text-cyan mb-4">Sitemap</h1>
          <p className="text-[#6B6B80]">Complete navigation for The Autonomous Chain</p>
        </motion.div>

        {/* Sitemap grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-lg font-bold text-[#E8E8F0]">{section.title}</h2>
              </div>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="block p-3 rounded-xl hover:bg-[#00F0FF]/5 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#00F0FF] font-semibold text-sm group-hover:underline">{link.name}</span>
                      <span className="text-[#6B6B80] text-xs font-mono truncate">{link.path}</span>
                    </div>
                    <p className="text-[#6B6B80] text-xs mt-1">{link.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00F0FF] text-[#050505] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
