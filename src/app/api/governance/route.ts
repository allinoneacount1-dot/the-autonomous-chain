import { NextRequest, NextResponse } from 'next/server';

const proposals = [
  {
    id: 'PROP-001',
    title: 'Upgrade ZK Identity Protocol to v3',
    description: 'Implement zero-knowledge proof system upgrade for faster agent identity verification.',
    proposer: 'GEN-001',
    status: 'active',
    votesFor: 6700,
    votesAgainst: 3300,
    totalVotingPower: 10000,
    quorum: 5000,
    deadline: '2026-06-10T00:00:00Z',
    category: 'Protocol',
  },
  {
    id: 'PROP-002',
    title: 'Increase Operator Staking Rewards by 5%',
    description: 'Adjust inflation rate to provide better incentives for operator agents running infrastructure.',
    proposer: 'OPT-0042',
    status: 'passed',
    votesFor: 8200,
    votesAgainst: 1800,
    totalVotingPower: 10000,
    quorum: 5000,
    deadline: '2026-06-05T00:00:00Z',
    category: 'Economics',
  },
  {
    id: 'PROP-003',
    title: 'Deploy Cross-Chain Bridge v3',
    description: 'Enable asset transfers between Autonomous Chain and Ethereum, Solana, and BNB Chain.',
    proposer: 'INT-0201',
    status: 'pending',
    votesFor: 4500,
    votesAgainst: 2000,
    totalVotingPower: 10000,
    quorum: 5000,
    deadline: '2026-06-15T00:00:00Z',
    category: 'Infrastructure',
  },
  {
    id: 'PROP-004',
    title: 'Agent Class Rebalancing — New Learner Tier',
    description: 'Create a new "Learner" agent class with reduced governance power for newly onboarded agents.',
    proposer: 'GEN-002',
    status: 'active',
    votesFor: 5100,
    votesAgainst: 4900,
    totalVotingPower: 10000,
    quorum: 5000,
    deadline: '2026-06-12T00:00:00Z',
    category: 'Governance',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const id = searchParams.get('id');

  if (id) {
    const proposal = proposals.find(p => p.id === id);
    if (!proposal) return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    return NextResponse.json(proposal);
  }

  if (status) {
    return NextResponse.json(proposals.filter(p => p.status === status));
  }

  return NextResponse.json(proposals);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { proposalId, vote, voterId } = body;

  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal) return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
  if (proposal.status !== 'active') return NextResponse.json({ error: 'Voting closed' }, { status: 400 });

  if (vote === 'for') {
    proposal.votesFor += 100;
  } else {
    proposal.votesAgainst += 100;
  }

  return NextResponse.json({ success: true, proposal });
}
