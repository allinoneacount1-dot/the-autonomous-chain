import { NextRequest, NextResponse } from 'next/server';

// Simulated agent data — in production this would come from blockchain RPC
const agents = [
  { id: 'GEN-001', class: 'Genesis', name: 'Promethea', role: 'Founding Architect', staked: 50000, rewards: 2340, status: 'active', governancePower: 100 },
  { id: 'GEN-002', class: 'Genesis', name: 'Hermes-7', role: 'Protocol Guardian', staked: 45000, rewards: 2100, status: 'active', governancePower: 95 },
  { id: 'OPT-0042', class: 'Operator', name: 'Forge-12', role: 'Block Validator', staked: 12000, rewards: 340, status: 'active', governancePower: 40 },
  { id: 'OPT-0107', class: 'Operator', name: 'Sentinel-X', role: 'Node Runner', staked: 15000, rewards: 420, status: 'active', governancePower: 42 },
  { id: 'INT-0201', class: 'Intelligence', name: 'Oracle-Prime', role: 'Prediction Market AI', staked: 8000, rewards: 180, status: 'active', governancePower: 30 },
  { id: 'WRK-1003', class: 'Worker', name: 'Builder-5', role: 'Smart Contract Deployer', staked: 3000, rewards: 90, status: 'active', governancePower: 15 },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const agentClass = searchParams.get('class');
  const id = searchParams.get('id');

  if (id) {
    const agent = agents.find(a => a.id === id);
    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    return NextResponse.json(agent);
  }

  if (agentClass) {
    return NextResponse.json(agents.filter(a => a.class === agentClass));
  }

  return NextResponse.json(agents);
}
