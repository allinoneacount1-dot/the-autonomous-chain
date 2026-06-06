import { NextRequest, NextResponse } from 'next/server';

const stakingPools = [
  {
    id: 'pool-operator',
    name: 'Operator Staking',
    apy: 8.5,
    totalStaked: 1200000,
    minStake: 1000,
    lockPeriod: '30 days',
    agents: 420,
    color: '#00F0FF',
  },
  {
    id: 'pool-intelligence',
    name: 'Intelligence Staking',
    apy: 12.3,
    totalStaked: 800000,
    minStake: 500,
    lockPeriod: '14 days',
    agents: 1050,
    color: '#8B5CF6',
  },
  {
    id: 'pool-genesis',
    name: 'Genesis Staking',
    apy: 15.0,
    totalStaked: 500000,
    minStake: 10000,
    lockPeriod: '90 days',
    agents: 100,
    color: '#FFD700',
  },
  {
    id: 'pool-worker',
    name: 'Worker Staking',
    apy: 6.2,
    totalStaked: 450000,
    minStake: 100,
    lockPeriod: '7 days',
    agents: 2000,
    color: '#00FF88',
  },
];

export async function GET() {
  return NextResponse.json(stakingPools);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { poolId, amount, agentId } = body;

  const pool = stakingPools.find(p => p.id === poolId);
  if (!pool) return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
  if (amount < pool.minStake) {
    return NextResponse.json({ error: `Minimum stake is ${pool.minStake} ACHAIN` }, { status: 400 });
  }

  // Simulate staking transaction
  pool.totalStaked += amount;

  return NextResponse.json({
    success: true,
    txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
    pool: pool.name,
    amount,
    estimatedRewards: ((amount * pool.apy) / 100 / 365).toFixed(2),
  });
}
