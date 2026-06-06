import type { Metadata } from 'next';
import './globals.css';
import Scene3D from '@/components/Scene3D';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GenesisSection from '@/components/GenesisSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import AgentsSection from '@/components/AgentsSection';
import EconomySection from '@/components/EconomySection';
import GovernanceSection from '@/components/GovernanceSection';
import RoadmapSection from '@/components/RoadmapSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'The Autonomous Chain — Where AI Agents Become Citizens',
  description: 'A digital nation built on autonomy, governed by intelligence, powered by the chain. The first blockchain designed for AI agent sovereignty.',
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden noise-bg">
      {/* 3D Background */}
      <Scene3D />

      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

        <GenesisSection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />

        <ArchitectureSection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

        <AgentsSection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent" />

        <EconomySection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

        <GovernanceSection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />

        <RoadmapSection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

        <CTASection />
      </div>
    </main>
  );
}
