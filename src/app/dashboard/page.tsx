'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Agent {
  id: string;
  class: string;
  name: string;
  role: string;
  staked: number;
  rewards: number;
  status: string;
  governancePower: number;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: string;
  votesFor: number;
  votesAgainst: number;
  totalVotingPower: number;
  deadline: string;
  category: string;
}

interface StakingPool {
  id: string;
  name: string;
  apy: number;
  totalStaked: number;
  minStake: number;
  lockPeriod: string;
  agents: number;
  color: string;
}

export default function DashboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'governance' | 'staking'>('overview');
  const [walletConnected, setWalletConnected] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeResult, setStakeResult] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [agentsRes, proposalsRes, poolsRes] = await Promise.all([
          fetch('/api/agents'),
          fetch('/api/governance'),
          fetch('/api/staking'),
        ]);
        const [agentsData, proposalsData, poolsData] = await Promise.all([
          agentsRes.json(),
          proposalsRes.json(),
          poolsRes.json(),
        ]);
        setAgents(agentsData);
        setProposals(proposalsData);
        setPools(poolsData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleStake = async (poolId: string) => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setStakeResult('Please enter a valid amount');
      return;
    }
    try {
      const res = await fetch('/api/staking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poolId, amount: parseFloat(stakeAmount), agentId: 'GEN-001' }),
      });
      const data = await res.json();
      if (data.success) {
        setStakeResult(`Success! TX: ${data.txHash.slice(0, 20)}... Est. daily rewards: ${data.estimatedRewards} ACHAIN`);
        setStakeAmount('');
        setSelectedPool(null);
      } else {
        setStakeResult(`Error: ${data.error}`);
      }
    } catch {
      setStakeResult('Transaction failed. Please try again.');
    }
  };

  const handleVote = async (proposalId: string, vote: 'for' | 'against') => {
    try {
      const res = await fetch('/api/governance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId, vote, voterId: 'GEN-001' }),
      });
      const data = await res.json();
      if (data.success) {
        setProposals(prev => prev.map(p => p.id === proposalId ? data.proposal : p));
      }
    } catch {
      console.error('Vote failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          ⬡
        </motion.div>
      </div>
    );
  }

  const totalStaked = agents.reduce((sum, a) => sum + a.staked, 0);
  const totalRewards = agents.reduce((sum, a) => sum + a.rewards, 0);

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text-cyan mb-2">Dashboard</h1>
            <p className="text-[#6B6B80]">Manage your agents, stake, vote, and govern</p>
          </div>
          {!walletConnected ? (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 240, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnectWallet}
              className="px-8 py-3 bg-[#00F0FF] text-[#050505] font-bold rounded-xl"
            >
              Connect Wallet
            </motion.button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-[#00F0FF]/20 bg-[#00F0FF]/5">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-[#00F0FF] font-mono text-sm">0x7a3B...9f2E</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#00F0FF]/10 pb-4">
          {(['overview', 'agents', 'governance', 'staking'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-[#00F0FF] text-[#050505]'
                  : 'text-[#6B6B80] hover:text-[#00F0FF] hover:bg-[#00F0FF]/5'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.section
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Agents', value: agents.length.toString(), icon: '🤖', color: '#00F0FF' },
                  { label: 'Total Staked', value: `${(totalStaked / 1000).toFixed(1)}K ACHAIN`, icon: '💰', color: '#00FF88' },
                  { label: 'Active Proposals', value: proposals.filter(p => p.status === 'active').length.toString(), icon: '🏛️', color: '#8B5CF6' },
                  { label: 'Total Rewards', value: `${(totalRewards / 1000).toFixed(1)}K`, icon: '🎁', color: '#FFD700' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[#6B6B80] text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'View Agents', desc: 'Browse all agent citizens on the chain', action: () => setActiveTab('agents'), icon: '🤖' },
                  { title: 'Vote on Proposals', desc: 'Participate in agent governance', action: () => setActiveTab('governance'), icon: '🏛️' },
                  { title: 'Stake & Earn', desc: 'Stake ACHAIN tokens for rewards', action: () => setActiveTab('staking'), icon: '💰' },
                ].map((item, i) => (
                  <motion.button
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    onClick={item.action}
                    className="text-left p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 hover:border-[#00F0FF]/30 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-[#E8E8F0] font-bold mb-2">{item.title}</h3>
                    <p className="text-[#6B6B80] text-sm">{item.desc}</p>
                  </motion.button>
                ))}
              </div>

              {/* Back to landing */}
              <div className="mt-8 text-center">
                <Link href="/" className="text-[#00F0FF] hover:underline text-sm">
                  ← Back to Home
                </Link>
              </div>
            </motion.section>
          )}

          {activeTab === 'agents' && (
            <motion.section
              key="agents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#6B6B80]">{agent.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        agent.status === 'active' ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-[#FF3366]/10 text-[#FF3366]'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="text-2xl mb-2">
                      {agent.class === 'Genesis' ? '🔮' : agent.class === 'Operator' ? '⚡' : agent.class === 'Intelligence' ? '🧠' : '🏭'}
                    </div>
                    <h3 className="text-lg font-bold text-[#E8E8F0] mb-1">{agent.name}</h3>
                    <p className="text-[#6B6B80] text-sm mb-4">{agent.role}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Staked</span>
                        <span className="text-[#00F0FF] font-semibold">{agent.staked.toLocaleString()} ACHAIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Rewards</span>
                        <span className="text-[#00FF88] font-semibold">{agent.rewards.toLocaleString()} ACHAIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Gov Power</span>
                        <span className="text-[#8B5CF6] font-semibold">{agent.governancePower}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/" className="text-[#00F0FF] hover:underline text-sm">← Back to Home</Link>
              </div>
            </motion.section>
          )}

          {activeTab === 'governance' && (
            <motion.section
              key="governance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {proposals.map((proposal, i) => {
                  const totalVotes = proposal.votesFor + proposal.votesAgainst;
                  const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
                  const againstPercent = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

                  return (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono text-[#6B6B80]">{proposal.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              proposal.status === 'active' ? 'bg-[#00F0FF]/10 text-[#00F0FF]' :
                              proposal.status === 'passed' ? 'bg-[#00FF88]/10 text-[#00FF88]' :
                              'bg-[#FF8C00]/10 text-[#FF8C00]'
                            }`}>
                              {proposal.status.toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-[#8B5CF6]/10 text-[#8B5CF6]">
                              {proposal.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#E8E8F0] mb-2">{proposal.title}</h3>
                          <p className="text-[#B0B0C8] text-sm">{proposal.description}</p>
                        </div>
                      </div>

                      {/* Vote bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#00FF88]">For: {forPercent.toFixed(1)}%</span>
                          <span className="text-[#FF3366]">Against: {againstPercent.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-[#111118] rounded-full overflow-hidden flex">
                          <motion.div
                            className="h-full bg-[#00FF88]"
                            initial={{ width: 0 }}
                            animate={{ width: `${forPercent}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                          <motion.div
                            className="h-full bg-[#FF3366]"
                            initial={{ width: 0 }}
                            animate={{ width: `${againstPercent}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Vote buttons */}
                      {proposal.status === 'active' && walletConnected && (
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVote(proposal.id, 'for')}
                            className="flex-1 py-2.5 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] font-semibold rounded-xl hover:bg-[#00FF88]/20 transition-colors"
                          >
                            Vote For
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVote(proposal.id, 'against')}
                            className="flex-1 py-2.5 bg-[#FF3366]/10 border border-[#FF3366]/30 text-[#FF3366] font-semibold rounded-xl hover:bg-[#FF3366]/20 transition-colors"
                          >
                            Vote Against
                          </motion.button>
                        </div>
                      )}
                      {proposal.status === 'active' && !walletConnected && (
                        <p className="text-[#6B6B80] text-sm text-center">Connect wallet to vote</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <Link href="/" className="text-[#00F0FF] hover:underline text-sm">← Back to Home</Link>
              </div>
            </motion.section>
          )}

          {activeTab === 'staking' && (
            <motion.section
              key="staking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {pools.map((pool, i) => (
                  <motion.div
                    key={pool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl border border-[#00F0FF]/10 bg-[#0A0A0F]/80 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#E8E8F0]">{pool.name}</h3>
                      <span className="text-2xl font-bold" style={{ color: pool.color }}>{pool.apy}% APY</span>
                    </div>

                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Total Staked</span>
                        <span className="text-[#E8E8F0] font-semibold">{(pool.totalStaked / 1000).toFixed(0)}K ACHAIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Min Stake</span>
                        <span className="text-[#E8E8F0] font-semibold">{pool.minStake} ACHAIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Lock Period</span>
                        <span className="text-[#E8E8F0] font-semibold">{pool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B80]">Stakers</span>
                        <span className="text-[#E8E8F0] font-semibold">{pool.agents}</span>
                      </div>
                    </div>

                    {walletConnected ? (
                      <>
                        {selectedPool === pool.id ? (
                          <div className="space-y-3">
                            <input
                              type="number"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                              placeholder={`Min ${pool.minStake} ACHAIN`}
                              className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-[#00F0FF]/20 text-[#E8E8F0] placeholder-[#6B6B80] focus:border-[#00F0FF]/50 focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleStake(pool.id)}
                                className="flex-1 py-3 font-bold rounded-xl text-[#050505]"
                                style={{ backgroundColor: pool.color }}
                              >
                                Confirm Stake
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setSelectedPool(null); setStakeAmount(''); }}
                                className="px-4 py-3 border border-[#6B6B80]/30 text-[#6B6B80] rounded-xl hover:border-[#6B6B80]/50"
                              >
                                Cancel
                              </motion.button>
                            </div>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedPool(pool.id)}
                            className="w-full py-3 font-bold rounded-xl text-[#050505]"
                            style={{ backgroundColor: pool.color }}
                          >
                            Stake Now
                          </motion.button>
                        )}
                      </>
                    ) : (
                      <p className="text-[#6B6B80] text-sm text-center">Connect wallet to stake</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Stake result */}
              <AnimatePresence>
                {stakeResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-4 rounded-xl text-center text-sm font-semibold ${
                      stakeResult.startsWith('Success')
                        ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20'
                        : 'bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/20'
                    }`}
                  >
                    {stakeResult}
                    <button onClick={() => setStakeResult(null)} className="ml-2 text-xs opacity-60 hover:opacity-100">✕</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 text-center">
                <Link href="/" className="text-[#00F0FF] hover:underline text-sm">← Back to Home</Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
