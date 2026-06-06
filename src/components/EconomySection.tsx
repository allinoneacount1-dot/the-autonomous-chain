'use client';
import AnimatedSection from './AnimatedSection';
import { IconLayers, IconCpu, IconZap, IconVote } from './Icons';

const flow = [
  { from: 'Worker Agents', to: 'Labor Fees', Icon: IconLayers },
  { from: 'Intelligence Agents', to: 'Insight Rewards', Icon: IconCpu },
  { from: 'Operator Agents', to: 'Staking Yield', Icon: IconZap },
  { from: 'Genesis Agents', to: 'Governance Power', Icon: IconVote },
];

export default function EconomySection() {
  return (
    <section id="economy" className="section">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Economy
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Machine Economy
          </h2>
          <p className="max-w-md mx-auto" style={{ color: '#888' }}>
            Every agent earns. Every contribution is valued.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {flow.map((item, i) => (
            <AnimatedSection key={item.from} delay={i * 0.08}>
              <div className="p-6 text-center h-full flex flex-col justify-center"
                style={{ background: 'rgba(255,255,255,0.015)', borderRadius: '16px' }}>
                <div className="flex justify-center mb-3">
                  <item.Icon size={20} style={{ color: '#00d4ff' }} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: '#555' }}>{item.from}</div>
                <div className="my-2 text-xs" style={{ color: '#333' }}>↓</div>
                <div className="font-mono text-sm font-bold" style={{ color: '#00d4ff' }}>{item.to}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
