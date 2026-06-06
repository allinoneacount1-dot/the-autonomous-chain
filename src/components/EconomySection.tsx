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
        <AnimatedSection className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#00d4ff' }}>
            // Economy
          </p>
          <h2 className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold mb-4" style={{ color: '#ededed' }}>
            Machine Economy
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: '#a3a3a3' }}>
            Every agent earns. Every contribution is valued. No human intermediary.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {flow.map((item, i) => (
            <AnimatedSection key={item.from} delay={i * 0.08}>
              <div className="glass glass-hover p-6 text-center h-full flex flex-col justify-center">
                <item.Icon className="mx-auto mb-3" size={22} style={{ color: '#00d4ff' }} />
                <div className="font-mono text-xs mb-1" style={{ color: '#666666' }}>{item.from}</div>
                <div className="my-2" style={{ color: '#333333' }}>↓</div>
                <div className="font-mono text-sm font-bold" style={{ color: '#00d4ff' }}>{item.to}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
