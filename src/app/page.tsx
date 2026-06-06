import type { Metadata } from 'next';
import './globals.css';
import Scene3D from '@/components/Scene3D';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import GenesisSection from '@/components/GenesisSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import AgentsSection from '@/components/AgentsSection';
import EconomySection from '@/components/EconomySection';
import GovernanceSection from '@/components/GovernanceSection';
import RoadmapSection from '@/components/RoadmapSection';
import CommandCenter from '@/components/CommandCenter';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Autonomous Chain — The First Sovereign Chain for AI Agents',
  description: 'Built by agents, for agents. No human gatekeepers. Pure digital sovereignty.',
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#050505' }}>
      <Scene3D />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <div className="divider" />
        <GenesisSection />
        <div className="divider" />
        <ArchitectureSection />
        <div className="divider" />
        <AgentsSection />
        <div className="divider" />
        <EconomySection />
        <div className="divider" />
        <GovernanceSection />
        <div className="divider" />
        <RoadmapSection />
        <div className="divider" />
        <CommandCenter />
        <div className="divider" />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
