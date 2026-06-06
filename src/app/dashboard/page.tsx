'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IconLayout, IconWallet, IconVote, IconCoins, IconSettings, IconArrowRight, IconCheck, IconX, IconLoader } from '@/components/DashboardIcons';

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

// ─── Skeleton ───
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg ${className}`} style={{ background: 'rgba(255,255,255,0.04)' }} />
  );
}

function SkeletonDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0,1,2].map(i => <Skeleton key={i} className="h-32" />)}
      </div>
      <Skeleton className="h-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}

// ─── Circular Progress ───
function CircularProgress({ value, size = 64, strokeWidth = 4, color = '#00d4ff' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size/2} cy={size/2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Sparkline ───
function Sparkline({ data, color = '#00d4ff', width = 80, height = 28 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
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
              borderColor: toast.type === 'success' ? 'rgba(76,175,80,0.2)' : toast.type === 'error' ? 'rgba(244,67,54,0.2)' : 'rgba(0,212,255,0.2)',
            }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{
              background: toast.type === 'success' ? 'rgba(76,175,80,0.15)' : toast.type === 'error' ? 'rgba(244,67,54,0.15)' : 'rgba(0,212,255,0.15)',
            }}>
              {toast.type === 'success' ? <IconCheck size={12} style={{ color: '#4caf50' }} /> :
               toast.type === 'error' ? <IconX size={12} style={{ color: '#f44336' }} /> :
               <IconLoader size={12} style={{ color: '#00d4ff' }} />}
            </div>
            <span className="text-sm flex-1" style={{ color: '#ededed' }}>{toast.message}</span>
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
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-sm font-bold" style={{ color: '#ededed' }}>{title}</h3>
              <button onClick={onClose} style={{ color: '#555' }}><IconX size={16} /></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        { id: 'PROP-001', title: 'Upgrade ZK Identity Protocol', status: 'active', forVotes: 6700, againstVotes: 3300, deadline: '2026-06-10' },
        { id: 'PROP-002', title: 'Increase Operator Rewards 5%', status: 'passed', forVotes: 8200, againstVotes: 1800, deadline: '2026-06-05' },
        { id: 'PROP-003', title: 'Deploy Cross-Chain Bridge v3', status: 'pending', forVotes: 4500, againstVotes: 2000, deadline: '2026-06-15' },
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

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0a' }}>
      {/* ─── Sidebar ─── */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r" style={{ borderColor: 'rgba(255,255,255,0.04)', minHeight: '100vh' }}>
        <div className="p-6">
          <Link href="/" className="font-mono text-sm font-bold" style={{ color: '#00d4ff' }}>⬡ AUTONOMOUS</Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200"
              style={{
                background: activeTab === item.id ? 'rgba(0,212,255,0.08)' : 'transparent',
                color: activeTab === item.id ? '#00d4ff' : '#555',
              }}
            >
              <item.Icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {!walletConnected ? (
            <button onClick={handleConnect} className="w-full py-2.5 text-xs font-bold font-mono rounded-lg" style={{ background: '#00d4ff', color: '#0a0a0a' }}>
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(0,212,255,0.05)' }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px]" style={{ color: '#00d4ff' }}>{walletAddress}</span>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Mobile Top Bar ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Link href="/" className="font-mono text-xs font-bold" style={{ color: '#00d4ff' }}>⬡ AUTONOMOUS</Link>
        {!walletConnected ? (
          <button onClick={handleConnect} className="px-4 py-1.5 text-[10px] font-bold font-mono rounded-lg" style={{ background: '#00d4ff', color: '#0a0a0a' }}>Connect</button>
        ) : (
          <span className="font-mono text-[10px]" style={{ color: '#00d4ff' }}>{walletAddress}</span>
        )}
      </div>

      {/* ─── Mobile Nav ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex-1 flex flex-col items-center gap-1 py-3"
            style={{ color: activeTab === item.id ? '#00d4ff' : '#555' }}
          >
            <item.Icon size={16} />
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
        {loading ? (
          <div className="md:ml-0 ml-0 pt-16 md:pt-0">
            <SkeletonDashboard />
          </div>
        ) : (
          <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h1 className="font-mono text-lg font-bold" style={{ color: '#ededed' }}>Overview</h1>

                  {/* Status Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#555' }}>Total Staked</span>
                        <Sparkline data={[120, 135, 128, 142, 155, 148, 160, 173]} />
                      </div>
                      <div className="font-mono text-2xl font-bold" style={{ color: '#ededed' }}>{totalStaked.toLocaleString()} <span className="text-sm" style={{ color: '#555' }}>ACHAIN</span></div>
                    </div>

                    <div className="glass p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#555' }}>Rewards Earned</span>
                        <Sparkline data={[100, 115, 108, 125, 140, 132, 148, 165]} color="#7c3aed" />
                      </div>
                      <div className="font-mono text-2xl font-bold" style={{ color: '#7c3aed' }}>{totalRewards.toLocaleString()} <span className="text-sm" style={{ color: '#555' }}>ACHAIN</span></div>
                    </div>

                    <div className="glass p-6 flex items-center gap-5">
                      <CircularProgress value={govPower} />
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: '#555' }}>Gov Power</div>
                        <div className="font-mono text-xl font-bold" style={{ color: '#ededed' }}>{govPower}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Agents */}
                  <div className="glass p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#555' }}>Top Agents</span>
                      <button onClick={() => setActiveTab('agents')} className="text-xs flex items-center gap-1" style={{ color: '#00d4ff' }}>
                        View All <IconArrowRight size={12} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {agents.slice(0, 3).map((agent) => (
                        <div key={agent.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)' }}>
                            <span className="font-mono text-[10px] font-bold" style={{ color: '#00d4ff' }}>{agent.class[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate" style={{ color: '#ededed' }}>{agent.name}</div>
                            <div className="text-[10px]" style={{ color: '#555' }}>{agent.class} · {agent.staked.toLocaleString()} staked</div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono" style={{
                            background: agent.status === 'active' ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)',
                            color: agent.status === 'active' ? '#4caf50' : '#ff9800',
                          }}>
                            {agent.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Proposals */}
                  <div className="glass p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color: '#555' }}>Active Proposals</span>
                      <button onClick={() => setActiveTab('governance')} className="text-xs flex items-center gap-1" style={{ color: '#00d4ff' }}>
                        Vote <IconArrowRight size={12} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {proposals.filter(p => p.status === 'active').map((p) => {
                        const total = p.forVotes + p.againstVotes;
                        const forPct = total > 0 ? (p.forVotes / total) * 100 : 0;
                        return (
                          <div key={p.id} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold truncate flex-1" style={{ color: '#ededed' }}>{p.title}</span>
                              <span className="text-[10px] font-mono ml-3" style={{ color: '#555' }}>{p.deadline}</span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden flex" style={{ background: '#1a1a1a' }}>
                              <motion.div className="h-full bg-green-500/60" initial={{ width: 0 }} animate={{ width: `${forPct}%` }} transition={{ duration: 0.8 }} />
                              <motion.div className="h-full bg-red-500/40" initial={{ width: 0 }} animate={{ width: `${100 - forPct}%` }} transition={{ duration: 0.8 }} />
                            </div>
                            <div className="flex justify-between mt-1.5">
                              <span className="text-[10px]" style={{ color: '#4caf50' }}>For {forPct.toFixed(0)}%</span>
                              <span className="text-[10px]" style={{ color: '#f44336' }}>Against {(100-forPct).toFixed(0)}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'agents' && (
                <motion.div key="agents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="font-mono text-lg font-bold" style={{ color: '#ededed' }}>Agent Management</h1>
                    <button className="px-4 py-2 text-xs font-bold font-mono rounded-lg" style={{ background: '#00d4ff', color: '#0a0a0a' }}>+ New Agent</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agents.map((agent) => (
                      <motion.div key={agent.id} whileHover={{ y: -3 }} className="glass glass-hover p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)' }}>
                              <span className="font-mono text-xs font-bold" style={{ color: '#00d4ff' }}>{agent.class[0]}</span>
                            </div>
                            <div>
                              <div className="font-mono text-sm font-bold" style={{ color: '#ededed' }}>{agent.name}</div>
                              <div className="text-[10px]" style={{ color: '#555' }}>{agent.id} · {agent.class}</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono" style={{
                            background: agent.status === 'active' ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)',
                            color: agent.status === 'active' ? '#4caf50' : '#ff9800',
                          }}>{agent.status}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div>
                            <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#555' }}>Staked</div>
                            <div className="font-mono text-sm font-bold" style={{ color: '#ededed' }}>{agent.staked.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#555' }}>Rewards</div>
                            <div className="font-mono text-sm font-bold" style={{ color: '#7c3aed' }}>{agent.rewards.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#555' }}>APY</div>
                            <div className="font-mono text-sm font-bold" style={{ color: '#00d4ff' }}>{agent.apy}%</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 text-[10px] font-semibold rounded-lg" style={{ background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>Stake More</button>
                          <button className="flex-1 py-2 text-[10px] font-semibold rounded-lg" style={{ background: 'rgba(76,175,80,0.08)', color: '#4caf50' }}>Claim</button>
                          <button className="flex-1 py-2 text-[10px] font-semibold rounded-lg" style={{ background: 'rgba(255,152,0,0.08)', color: '#ff9800' }}>Pause</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'governance' && (
                <motion.div key="governance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h1 className="font-mono text-lg font-bold" style={{ color: '#ededed' }}>Governance</h1>
                  <div className="space-y-4">
                    {proposals.map((p) => {
                      const total = p.forVotes + p.againstVotes;
                      const forPct = total > 0 ? (p.forVotes / total) * 100 : 0;
                      return (
                        <motion.div key={p.id} whileHover={{ y: -3 }} className="glass glass-hover p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-sm font-semibold mb-1" style={{ color: '#ededed' }}>{p.title}</h3>
                              <div className="text-[10px]" style={{ color: '#555' }}>{p.id} · Deadline: {p.deadline}</div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[9px] font-mono" style={{
                              background: p.status === 'active' ? 'rgba(0,212,255,0.1)' : p.status === 'passed' ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)',
                              color: p.status === 'active' ? '#00d4ff' : p.status === 'passed' ? '#4caf50' : '#ff9800',
                            }}>{p.status.toUpperCase()}</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden flex mb-2" style={{ background: '#1a1a1a' }}>
                            <motion.div className="h-full bg-green-500/60 rounded-l-full" initial={{ width: 0 }} animate={{ width: `${forPct}%` }} transition={{ duration: 0.8 }} />
                            <motion.div className="h-full bg-red-500/40 rounded-r-full" initial={{ width: 0 }} animate={{ width: `${100 - forPct}%` }} transition={{ duration: 0.8 }} />
                          </div>
                          <div className="flex justify-between text-[10px]" style={{ color: '#555' }}>
                            <span style={{ color: '#4caf50' }}>For: {p.forVotes.toLocaleString()} ({forPct.toFixed(0)}%)</span>
                            <span style={{ color: '#f44336' }}>Against: {p.againstVotes.toLocaleString()} ({(100-forPct).toFixed(0)}%)</span>
                          </div>
                          {p.status === 'active' && (
                            <div className="flex gap-3 mt-4">
                              <button onClick={() => setVoteModal({ open: true, proposalId: p.id, proposalTitle: p.title, vote: 'for' })} className="flex-1 py-2.5 text-xs font-bold rounded-lg" style={{ background: 'rgba(76,175,80,0.1)', color: '#4caf50' }}>Vote For</button>
                              <button onClick={() => setVoteModal({ open: true, proposalId: p.id, proposalTitle: p.title, vote: 'against' })} className="flex-1 py-2.5 text-xs font-bold rounded-lg" style={{ background: 'rgba(244,67,54,0.1)', color: '#f44336' }}>Vote Against</button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'staking' && (
                <motion.div key="staking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h1 className="font-mono text-lg font-bold" style={{ color: '#ededed' }}>Staking</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pools.map((pool) => (
                      <motion.div key={pool.id} whileHover={{ y: -3 }} className="glass glass-hover p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-mono text-sm font-bold" style={{ color: '#ededed' }}>{pool.name} Pool</h3>
                            <div className="text-[10px] mt-0.5" style={{ color: '#555' }}>Min: {pool.minStake} ACHAIN</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xl font-bold" style={{ color: '#00d4ff' }}>{pool.apy}%</div>
                            <div className="text-[9px] uppercase tracking-wider" style={{ color: '#555' }}>APY</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#555' }}>Total Staked</div>
                            <div className="font-mono text-sm font-semibold" style={{ color: '#ededed' }}>{(pool.totalStaked / 1000).toFixed(0)}K</div>
                          </div>
                          <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#555' }}>Your Stake</div>
                            <div className="font-mono text-sm font-semibold" style={{ color: '#7c3aed' }}>{pool.userStaked.toLocaleString()}</div>
                          </div>
                        </div>
                        <button onClick={() => setStakeModal({ open: true, poolId: pool.id, poolName: pool.name })} className="w-full py-2.5 text-xs font-bold font-mono rounded-lg glow-btn" style={{ background: '#00d4ff', color: '#0a0a0a' }}>
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
            <label className="text-xs font-mono uppercase tracking-wider block mb-2" style={{ color: '#555' }}>Amount (ACHAIN)</label>
            <input
              type="number" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl text-sm font-mono focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ededed' }}
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStakeModal({ open: false })} className="flex-1 py-3 text-xs font-semibold rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#555' }}>Cancel</button>
            <button onClick={handleStake} className="flex-1 py-3 text-xs font-bold font-mono rounded-xl glow-btn" style={{ background: '#00d4ff', color: '#0a0a0a' }}>Confirm Stake</button>
          </div>
        </div>
      </Modal>

      <Modal open={voteModal.open} onClose={() => setVoteModal({ open: false })} title="Confirm Vote">
        <div className="space-y-4">
          <p className="text-sm" style={{ color: '#a3a3a3' }}>
            Vote <strong style={{ color: voteModal.vote === 'for' ? '#4caf50' : '#f44336' }}>{voteModal.vote?.toUpperCase()}</strong> on "{voteModal.proposalTitle}"?
          </p>
          <div className="flex gap-3">
            <button onClick={() => setVoteModal({ open: false })} className="flex-1 py-3 text-xs font-semibold rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#555' }}>Cancel</button>
            <button onClick={handleVote} className="flex-1 py-3 text-xs font-bold font-mono rounded-xl glow-btn" style={{ background: '#00d4ff', color: '#0a0a0a' }}>Confirm Vote</button>
          </div>
        </div>
      </Modal>

      {/* ─── Toasts ─── */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
