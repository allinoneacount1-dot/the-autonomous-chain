'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconLayout, IconWallet, IconVote, IconCoins, IconSettings, IconArrowRight, IconCheck, IconX, IconLoader, IconTrendingUp, IconUsers, IconShield, IconZap } from '@/components/DashboardIcons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ───
interface Agent {
  id: string;
  name: string;
  class: string;
  staked: number;
  rewards: number;
  status: 'active' | 'idle';
  apy: number;
}

interface Proposal {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'passed' | 'pending';
  forVotes: number;
  againstVotes: number;
  deadline: string;
}

interface StakingPool {
  id: string;
  name: string;
  apy: number;
  totalStaked: number;
  minStake: number;
  userStaked: number;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface LiveFeedItem {
  id: string;
  type: 'stake' | 'vote' | 'claim' | 'block';
  message: string;
  time: string;
}

// ─── Count-Up Hook (local) ───
function CountUp({ value, duration = 2, suffix = '', className = '' }: { value: number; duration?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const triggerEl = ref.current;
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'easeOut',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val).toLocaleString() + suffix;
        }
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === triggerEl) t.kill(); });
    };
  }, [value, duration, suffix]);

  return <span ref={ref} className={className}>0</span>;
}

// ─── Skeleton ───
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl ${className}`} style={{ background: 'rgba(255,255,255,0.03)' }} />;
}

function SkeletonDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[0,1,2].map(i => <Skeleton key={i} className="h-40" />)}
      </div>
      <Skeleton className="h-72" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
    </div>
  );
}

// ─── Circular Progress (Donut) ───
function CircularProgress({ value, size = 88, strokeWidth = 5, color = '#00f2ff' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}33)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-bold" style={{ color }}>{value}%</span>
      </div>
    </div>
  );
}

// ─── Sparkline ───
function Sparkline({ data, color = '#00f2ff', width = 80, height = 28 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible" style={{ filter: `drop-shadow(0 0 4px ${color}22)` }}>
      <motion.polyline
        points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Toast ───
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed top-20 right-6 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            className="glass px-5 py-3.5 flex items-center gap-3 min-w-[280px]"
            style={{
              borderColor: toast.type === 'success' ? 'rgba(52,211,153,0.15)' : toast.type === 'error' ? 'rgba(248,113,113,0.15)' : 'rgba(0,242,255,0.15)',
            }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{
              background: toast.type === 'success' ? 'rgba(52,211,153,0.12)' : toast.type === 'error' ? 'rgba(248,113,113,0.12)' : 'rgba(0,242,255,0.12)',
            }}>
              {toast.type === 'success' ? <IconCheck size={12} style={{ color: '#34d399' }} /> :
               toast.type === 'error' ? <IconX size={12} style={{ color: '#f87171' }} /> :
               <IconLoader size={12} style={{ color: '#00f2ff' }} />}
            </div>
            <span className="text-sm flex-1" style={{ color: '#e8e8e8' }}>{toast.message}</span>
            <button onClick={() => onDismiss(toast.id)} className="text-xs" style={{ color: '#555' }}>✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Modal ───
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-strong w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-sm font-bold" style={{ color: '#e8e8e8' }}>{title}</h3>
              <button onClick={onClose} style={{ color: '#555' }}><IconX size={16} /></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Getting Started Widget ───
function GettingStarted({ onConnect }: { onConnect: () => void }) {
  const steps = [
    { num: 1, title: 'Connect Wallet', desc: 'Link your wallet to access the dashboard', action: 'Connect', handler: onConnect },
    { num: 2, title: 'Stake ACHAIN', desc: 'Earn rewards by staking in any pool', action: 'Stake', handler: () => {} },
    { num: 3, title: 'Vote on Proposals', desc: 'Participate in governance decisions', action: 'Vote', handler: () => {} },
  ];

  return (
    <div className="glass glow-accent">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,242,255,0.1)' }}>
          <IconZap size={20} style={{ color: '#00f2ff' }} />
        </div>
        <div>
          <h3 className="font-mono text-sm font-bold" style={{ color: '#e8e8e8' }}>Getting Started</h3>
          <p className="text-xs" style={{ color: '#666' }}>Complete these steps to get started</p>
        </div>
      </div>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.num} className="step-card">
            <div className="step-number">{step.num}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: '#e8e8e8' }}>{step.title}</div>
              <div className="text-xs" style={{ color: '#666' }}>{step.desc}</div>
            </div>
            <button onClick={step.handler} className="btn-primary text-[10px] px-4 py-2 shrink-0">{step.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Live Feed Widget ───
function LiveFeed() {
  const [items] = useState<LiveFeedItem[]>([
    { id: '1', type: 'stake', message: '0x7a3B...9f2E staked 5,000 ACHAIN in Operator Pool', time: '2m ago' },
    { id: '2', type: 'vote', message: 'PROP-001 received 1,200 votes FOR', time: '5m ago' },
    { id: '3', type: 'claim', message: 'Promethea claimed 340 ACHAIN rewards', time: '8m ago' },
    { id: '4', type: 'block', message: 'Block #1,234,567 finalized — 47 txns', time: '12m ago' },
    { id: '5', type: 'stake', message: '0x3f2A...1b8C staked 12,000 ACHAIN in Genesis Pool', time: '15m ago' },
  ]);

  return (
    <div className="glass">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#34d399', boxShadow: '0 0 10px rgba(52,211,153,0.4)' }} />
        <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#555' }}>Live Feed</span>
      </div>
      <div className="live-feed space-y-2.5">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="shrink-0" style={{ color: '#444' }}>{item.time}</span>
            <span className={item.type === 'stake' ? 'highlight' : item.type === 'vote' ? 'purple' : item.type === 'claim' ? 'success' : ''}>
              {item.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'governance' | 'staking'>('overview');
  const [loading, setLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [stakeModal, setStakeModal] = useState<{ open: boolean; poolId?: string; poolName?: string }>({ open: false });
  const [stakeAmount, setStakeAmount] = useState('');
  const [voteModal, setVoteModal] = useState<{ open: boolean; proposalId?: string; proposalTitle?: string; vote?: 'for' | 'against' }>({ open: false });

  // Data
  const [agents, setAgents] = useState<Agent[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [govPower, setGovPower] = useState(0);

  // Tab transition ref
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Toast helper
  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Simulate data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setAgents([
        { id: 'GEN-001', name: 'Promethea', class: 'Genesis', staked: 50000, rewards: 2340, status: 'active', apy: 15.0 },
        { id: 'OPT-0042', name: 'Forge-12', class: 'Operator', staked: 12000, rewards: 340, status: 'active', apy: 8.5 },
        { id: 'INT-0201', name: 'Oracle-Prime', class: 'Intelligence', staked: 8000, rewards: 180, status: 'active', apy: 12.3 },
        { id: 'WRK-1003', name: 'Builder-5', class: 'Worker', staked: 3000, rewards: 90, status: 'idle', apy: 6.2 },
      ]);
      setProposals([
        { id: 'PROP-001', title: 'Upgrade ZK Identity Protocol to v3', category: 'Protocol', status: 'active', forVotes: 6700, againstVotes: 3300, deadline: '2026-06-10' },
        { id: 'PROP-002', title: 'Increase Operator Rewards by 5%', category: 'Treasury', status: 'passed', forVotes: 8200, againstVotes: 1800, deadline: '2026-06-05' },
        { id: 'PROP-003', title: 'Deploy Cross-Chain Bridge v3', category: 'Infrastructure', status: 'pending', forVotes: 4500, againstVotes: 2000, deadline: '2026-06-15' },
      ]);
      setPools([
        { id: 'pool-operator', name: 'Operator', apy: 8.5, totalStaked: 1200000, minStake: 1000, userStaked: 12000 },
        { id: 'pool-intelligence', name: 'Intelligence', apy: 12.3, totalStaked: 800000, minStake: 500, userStaked: 8000 },
        { id: 'pool-genesis', name: 'Genesis', apy: 15.0, totalStaked: 500000, minStake: 10000, userStaked: 50000 },
        { id: 'pool-worker', name: 'Worker', apy: 6.2, totalStaked: 450000, minStake: 100, userStaked: 3000 },
      ]);
      setTotalStaked(73000);
      setTotalRewards(2950);
      setGovPower(72);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // GSAP stagger animation for dashboard cards
  useEffect(() => {
    if (!loading && walletConnected) {
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'easeOut', delay: 0.2 }
      );
    }
  }, [loading, walletConnected]);

  const handleConnect = () => {
    setWalletConnected(true);
    setWalletAddress('0x7a3B...9f2E');
    addToast('success', 'Wallet connected successfully');
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      addToast('error', 'Please enter a valid amount');
      return;
    }
    setStakeModal({ open: false });
    addToast('info', 'Transaction submitted — confirming...');
    setTimeout(() => {
      addToast('success', `Staked ${stakeAmount} ACHAIN in ${stakeModal.poolName} pool`);
      setStakeAmount('');
    }, 2000);
  };

  const handleVote = () => {
    if (!voteModal.proposalId || !voteModal.vote) return;
    setVoteModal({ open: false });
    addToast('info', 'Vote submitted — confirming...');
    setTimeout(() => {
      addToast('success', `Voted ${voteModal.vote === 'for' ? 'FOR' : 'AGAINST'} "${voteModal.proposalTitle}"`);
    }, 2000);
  };

  const navItems = [
    { id: 'overview' as const, label: 'Overview', Icon: IconLayout },
    { id: 'agents' as const, label: 'Agents', Icon: IconWallet },
    { id: 'governance' as const, label: 'Governance', Icon: IconVote },
    { id: 'staking' as const, label: 'Staking', Icon: IconCoins },
  ];

  // Tab change animation
  const handleTabChange = (tabId: typeof activeTab) => {
    if (tabContentRef.current) {
      gsap.fromTo(tabContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'easeOut' }
      );
    }
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#050505' }}>
      {/* ─── Sidebar (Desktop) ─── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0" style={{ borderRight: '1px solid rgba(255,255,255,0.04)', minHeight: '100vh', background: 'rgba(8,8,8,0.95)' }}>
        <div className="p-6">
          <Link href="/" className="font-mono text-sm font-bold text-gradient">⬡ AUTONOMOUS</Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-medium transition-all duration-300"
              style={{
                background: activeTab === item.id ? 'rgba(0,242,255,0.06)' : 'transparent',
                color: activeTab === item.id ? '#00f2ff' : '#555',
                border: activeTab === item.id ? '1px solid rgba(0,242,255,0.08)' : '1px solid transparent',
                boxShadow: activeTab === item.id ? '0 0 20px rgba(0,242,255,0.05)' : 'none',
              }}
            >
              <item.Icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {!walletConnected ? (
            <button onClick={handleConnect} className="btn-primary w-full shimmer-btn">Connect Wallet</button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(0,242,255,0.03)', border: '1px solid rgba(0,242,255,0.08)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.4)' }} />
              <span className="font-mono text-[10px]" style={{ color: '#00f2ff' }}>{walletAddress}</span>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Mobile Top Bar ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between nav-glass">
        <Link href="/" className="font-mono text-xs font-bold text-gradient">⬡ AUTONOMOUS</Link>
        {!walletConnected ? (
          <button onClick={handleConnect} className="btn-primary text-[10px] px-4 py-2">Connect</button>
        ) : (
          <span className="font-mono text-[10px]" style={{ color: '#00f2ff' }}>{walletAddress}</span>
        )}
      </div>

      {/* ─── Mobile Bottom Nav ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex nav-glass" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200"
            style={{ color: activeTab === item.id ? '#00f2ff' : '#555' }}
          >
            <item.Icon size={16} />
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
        {loading ? (
          <div className="pt-16 md:pt-0"><SkeletonDashboard /></div>
        ) : !walletConnected ? (
          <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
            <div className="empty-state glass glow-accent">
              <div className="icon">🔗</div>
              <h2 className="font-mono text-xl font-bold mb-2 text-gradient">Connect Your Wallet</h2>
              <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: '#666' }}>Connect your wallet to view your dashboard, stake ACHAIN, and participate in governance.</p>
              <button onClick={handleConnect} className="btn-primary shimmer-btn px-8 py-3">Connect Wallet</button>
            </div>
            <div className="mt-6"><GettingStarted onConnect={handleConnect} /></div>
          </div>
        ) : (
          <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto" ref={tabContentRef}>
            {/* ─── Segmented Control (Desktop) ─── */}
            <div className="hidden md:flex items-center justify-between mb-8">
              <div className="segmented">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`segmented-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.4)' }} />
                <span className="font-mono text-[10px]" style={{ color: '#555' }}>Network Live</span>
              </div>
            </div>

            {/* ─── Mobile Tab Label ─── */}
            <div className="md:hidden mb-6">
              <h1 className="font-mono text-lg font-bold text-gradient">
                {navItems.find(n => n.id === activeTab)?.label}
              </h1>
            </div>

            <AnimatePresence mode="wait">
              {/* ═══════════════════════════════════════ OVERVIEW TAB ═══════════════════════════════════════ */}
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  {/* Hero Stats — Bento Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="glass stat-card glow-accent">
                      <div className="flex items-center justify-between mb-5">
                        <div className="stat-label">Total Staked</div>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-dim)' }}>
                          <IconTrendingUp size={16} style={{ color: '#00f2ff' }} />
                        </div>
                      </div>
                      <div className="stat-value lg" style={{ color: '#e8e8e8' }}>
                        <CountUp value={totalStaked} />
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#555' }}>ACHAIN</div>
                      <div className="mt-4">
                        <Sparkline data={[120, 135, 128, 142, 155, 148, 160, 173]} />
                      </div>
                    </div>

                    <div className="glass stat-card glow-purple">
                      <div className="flex items-center justify-between mb-5">
                        <div className="stat-label">Rewards Earned</div>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--purple-dim)' }}>
                          <IconCoins size={16} style={{ color: '#bc4dff' }} />
                        </div>
                      </div>
                      <div className="stat-value lg" style={{ color: '#bc4dff' }}>
                        <CountUp value={totalRewards} />
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#555' }}>ACHAIN</div>
                      <div className="mt-4">
                        <Sparkline data={[100, 115, 108, 125, 140, 132, 148, 165]} color="#bc4dff" />
                      </div>
                    </div>

                    <div className="glass stat-card flex items-center gap-5">
                      <CircularProgress value={govPower} color="#00f2ff" />
                      <div>
                        <div className="stat-label mb-1">Gov Power</div>
                        <div className="text-xs" style={{ color: '#666' }}>Voting influence</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2 glass">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <IconVote size={16} style={{ color: '#00f2ff' }} />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#555' }}>Active Proposals</span>
                        </div>
                        <button onClick={() => handleTabChange('governance')} className="text-xs flex items-center gap-1 transition-colors hover:text-white" style={{ color: '#00f2ff' }}>
                          Vote <IconArrowRight size={12} />
                        </button>
                      </div>
                      <div className="space-y-3 stagger-children">
                        {proposals.filter(p => p.status === 'active').map((p) => {
                          const total = p.forVotes + p.againstVotes;
                          const forPct = total > 0 ? (p.forVotes / total) * 100 : 0;
                          return (
                            <div key={p.id} className="stagger-item glass-subtle" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold truncate flex-1" style={{ color: '#e8e8e8' }}>{p.title}</span>
                                <span className="badge badge-active ml-3" style={{ fontSize: '9px', padding: '2px 8px' }}>Active</span>
                              </div>
                              <div className="progress-bar mb-2">
                                <motion.div className="bar-for" initial={{ width: 0 }} animate={{ width: `${forPct}%` }} transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} />
                                <motion.div className="bar-against" initial={{ width: 0 }} animate={{ width: `${100 - forPct}%` }} transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} />
                              </div>
                              <div className="flex justify-between text-[10px]">
                                <span style={{ color: '#34d399' }}>For {forPct.toFixed(0)}%</span>
                                <span style={{ color: '#555' }}>{p.deadline}</span>
                                <span style={{ color: '#f87171' }}>Against {(100-forPct).toFixed(0)}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="glass">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <IconUsers size={16} style={{ color: '#bc4dff' }} />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#555' }}>Top Agents</span>
                        </div>
                        <button onClick={() => handleTabChange('agents')} className="text-xs flex items-center gap-1 transition-colors hover:text-white" style={{ color: '#00f2ff' }}>
                          All <IconArrowRight size={12} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {agents.slice(0, 3).map((agent) => (
                          <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.03]" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-dim)' }}>
                              <span className="font-mono text-[10px] font-bold" style={{ color: '#00f2ff' }}>{agent.class[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate" style={{ color: '#e8e8e8' }}>{agent.name}</div>
                              <div className="text-[10px]" style={{ color: '#555' }}>{agent.staked.toLocaleString()} staked</div>
                            </div>
                            <span className={`badge ${agent.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{agent.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Staking + Live Feed Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="glass">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <IconCoins size={16} style={{ color: '#00f2ff' }} />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#555' }}>Quick Stake</span>
                        </div>
                        <button onClick={() => handleTabChange('staking')} className="text-xs flex items-center gap-1 transition-colors hover:text-white" style={{ color: '#00f2ff' }}>
                          All Pools <IconArrowRight size={12} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {pools.sort((a, b) => b.apy - a.apy).slice(0, 2).map((pool) => (
                          <div key={pool.id} className="flex items-center justify-between p-4 rounded-xl hover-lift" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div>
                              <div className="text-sm font-semibold" style={{ color: '#e8e8e8' }}>{pool.name} Pool</div>
                              <div className="text-[10px]" style={{ color: '#555' }}>{(pool.totalStaked / 1000).toFixed(0)}K total staked</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="apy-badge">{pool.apy}%</div>
                              <button onClick={() => setStakeModal({ open: true, poolId: pool.id, poolName: pool.name })} className="btn-primary text-[10px] px-4 py-2">Stake</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <LiveFeed />
                  </div>
                </motion.div>
              )}

              {/* ═══════════════════════════════════════ AGENTS TAB ═══════════════════════════════════════ */}
              {activeTab === 'agents' && (
                <motion.div key="agents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="font-mono text-lg font-bold text-gradient">Agent Management</h1>
                      <p className="text-xs mt-1" style={{ color: '#666' }}>{agents.length} agents registered</p>
                    </div>
                    <button className="btn-primary shimmer-btn">+ New Agent</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
                    {agents.map((agent) => (
                      <motion.div key={agent.id} className="stagger-item glass hover-lift" style={{ opacity: 0, transform: 'translateY(20px)', borderColor: agent.status === 'active' ? 'rgba(52,211,153,0.06)' : 'rgba(251,191,36,0.06)' }}>
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center glow-accent" style={{ background: 'var(--accent-dim)' }}>
                              <span className="font-mono text-sm font-bold" style={{ color: '#00f2ff' }}>{agent.class[0]}</span>
                            </div>
                            <div>
                              <div className="font-mono text-sm font-bold" style={{ color: '#e8e8e8' }}>{agent.name}</div>
                              <div className="text-[10px] mt-0.5" style={{ color: '#555' }}>{agent.id} · {agent.class}</div>
                            </div>
                          </div>
                          <span className={`badge ${agent.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{agent.status}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-5">
                          {[
                            { label: 'Staked', value: agent.staked.toLocaleString(), color: '#e8e8e8' },
                            { label: 'Rewards', value: agent.rewards.toLocaleString(), color: '#bc4dff' },
                            { label: 'APY', value: `${agent.apy}%`, color: '#00f2ff' },
                          ].map((stat) => (
                            <div key={stat.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                              <div className="stat-label mb-1">{stat.label}</div>
                              <div className="font-mono text-sm font-bold" style={{ color: stat.color }}>{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button className="btn-primary text-[10px] py-2.5">Stake More</button>
                          <button className="btn-success text-[10px] py-2.5">Claim</button>
                          <button className="btn-secondary text-[10px] py-2.5">Pause</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══════════════════════════════════════ GOVERNANCE TAB ═══════════════════════════════════════ */}
              {activeTab === 'governance' && (
                <motion.div key="governance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div>
                    <h1 className="font-mono text-lg font-bold text-gradient">Governance</h1>
                    <p className="text-xs mt-1" style={{ color: '#666' }}>{proposals.length} proposals · {proposals.filter(p => p.status === 'active').length} active</p>
                  </div>

                  <div className="space-y-4 stagger-children">
                    {proposals.map((p) => {
                      const total = p.forVotes + p.againstVotes;
                      const forPct = total > 0 ? (p.forVotes / total) * 100 : 0;
                      return (
                        <motion.div key={p.id} className="stagger-item glass hover-glow" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="badge badge-active" style={{ fontSize: '9px', padding: '2px 8px' }}>{p.category}</span>
                                <span className={`badge ${p.status === 'active' ? 'badge-active' : p.status === 'passed' ? 'badge-success' : 'badge-warning'}`}>
                                  {p.status.toUpperCase()}
                                </span>
                              </div>
                              <h3 className="text-sm font-semibold mt-2" style={{ color: '#e8e8e8' }}>{p.title}</h3>
                              <div className="text-[10px] mt-1" style={{ color: '#555' }}>{p.id} · Deadline: {p.deadline}</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-[10px] mb-2">
                              <span style={{ color: '#34d399' }}>● For: {p.forVotes.toLocaleString()} ({forPct.toFixed(0)}%)</span>
                              <span style={{ color: '#f87171' }}>● Against: {p.againstVotes.toLocaleString()} ({(100-forPct).toFixed(0)}%)</span>
                            </div>
                            <div className="progress-bar" style={{ height: 10 }}>
                              <motion.div className="bar-for" initial={{ width: 0 }} animate={{ width: `${forPct}%` }} transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }} />
                              <motion.div className="bar-against" initial={{ width: 0 }} animate={{ width: `${100 - forPct}%` }} transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }} />
                            </div>
                          </div>

                          {p.status === 'active' && (
                            <div className="flex gap-3 mt-5">
                              <button onClick={() => setVoteModal({ open: true, proposalId: p.id, proposalTitle: p.title, vote: 'for' })} className="btn-success flex-1">Vote For</button>
                              <button onClick={() => setVoteModal({ open: true, proposalId: p.id, proposalTitle: p.title, vote: 'against' })} className="btn-danger flex-1">Vote Against</button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ═══════════════════════════════════════ STAKING TAB ═══════════════════════════════════════ */}
              {activeTab === 'staking' && (
                <motion.div key="staking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div>
                    <h1 className="font-mono text-lg font-bold text-gradient">Staking Pools</h1>
                    <p className="text-xs mt-1" style={{ color: '#666' }}>{pools.length} pools available</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
                    {pools.map((pool) => (
                      <motion.div key={pool.id} className="stagger-item glass hover-lift" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <h3 className="font-mono text-sm font-bold" style={{ color: '#e8e8e8' }}>{pool.name} Pool</h3>
                            <div className="text-[10px] mt-0.5" style={{ color: '#555' }}>Min: {pool.minStake.toLocaleString()} ACHAIN</div>
                          </div>
                          <div className="apy-badge">{pool.apy}% APY</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="p-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <div className="stat-label mb-1">Total Staked</div>
                            <div className="font-mono text-sm font-bold" style={{ color: '#e8e8e8' }}>{(pool.totalStaked / 1000).toFixed(0)}K</div>
                          </div>
                          <div className="p-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <div className="stat-label mb-1">Your Stake</div>
                            <div className="font-mono text-sm font-bold" style={{ color: '#bc4dff' }}>{pool.userStaked.toLocaleString()}</div>
                          </div>
                        </div>

                        <button onClick={() => setStakeModal({ open: true, poolId: pool.id, poolName: pool.name })} className="btn-primary w-full glow-btn shimmer-btn">
                          Stake ACHAIN
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* ─── Modals ─── */}
      <Modal open={stakeModal.open} onClose={() => setStakeModal({ open: false })} title={`Stake in ${stakeModal.poolName || ''} Pool`}>
        <div className="space-y-4">
          <div>
            <label className="stat-label block mb-2">Amount (ACHAIN)</label>
            <input
              type="number" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} placeholder="0.00"
              className="w-full px-4 py-3.5 rounded-xl text-sm font-mono focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#e8e8e8' }}
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStakeModal({ open: false })} className="btn-secondary flex-1">Cancel</button>
            <button onClick={handleStake} className="btn-primary flex-1 glow-btn">Confirm Stake</button>
          </div>
        </div>
      </Modal>

      <Modal open={voteModal.open} onClose={() => setVoteModal({ open: false })} title="Confirm Vote">
        <div className="space-y-4">
          <p className="text-sm" style={{ color: '#888' }}>
            Vote <strong style={{ color: voteModal.vote === 'for' ? '#34d399' : '#f87171' }}>{voteModal.vote?.toUpperCase()}</strong> on &quot;{voteModal.proposalTitle}&quot;?
          </p>
          <div className="flex gap-3">
            <button onClick={() => setVoteModal({ open: false })} className="btn-secondary flex-1">Cancel</button>
            <button onClick={handleVote} className="btn-primary flex-1 glow-btn">Confirm Vote</button>
          </div>
        </div>
      </Modal>

      {/* ─── Toasts ─── */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
