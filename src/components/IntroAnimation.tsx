'use client';

import { useEffect, useState } from 'react';

export default function IntroAnimation() {
  const [phase, setPhase] = useState<'visible' | 'shrink' | 'gone'>('visible');

  useEffect(() => {
    // After 1.6s start the exit animation
    const t1 = setTimeout(() => setPhase('shrink'), 1600);
    // After exit animation completes, remove from DOM
    const t2 = setTimeout(() => setPhase('gone'), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        transition: 'opacity 0.5s ease, transform 0.9s cubic-bezier(0.76,0,0.24,1)',
        opacity: phase === 'shrink' ? 0 : 1,
        transform: phase === 'shrink' ? 'scale(1.06)' : 'scale(1)',
        pointerEvents: phase === 'shrink' ? 'none' : 'all',
      }}
    >
      {/* Background grid — same as landing page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.18), transparent), radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.18), transparent)',
        }}
      />

      {/* Logo mark */}
      <div className="relative flex flex-col items-center gap-5">
        {/* Animated logo box */}
        <div
          className="relative"
          style={{
            animation: 'introLogoIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* Outer ring pulse */}
          <div
            className="absolute inset-0 rounded-[22px] bg-blue-500/20"
            style={{ animation: 'introPulse 1.2s ease-out 0.3s both' }}
          />
          <div className="w-20 h-20 bg-blue-600 rounded-[22px] flex items-center justify-center shadow-[0_8px_32px_rgba(37,99,235,0.4)]">
            <span className="text-white text-4xl font-black tracking-tighter select-none">F</span>
          </div>
        </div>

        {/* Wordmark */}
        <div
          style={{ animation: 'introWordIn 0.5s ease 0.35s both' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-2xl font-bold tracking-tighter text-zinc-900 select-none">
            Fittly
          </span>
          <span
            className="text-xs font-medium text-zinc-400 tracking-widest uppercase"
            style={{ animation: 'introWordIn 0.5s ease 0.55s both' }}
          >
            Virtual Try-On
          </span>
        </div>

        {/* Loading bar */}
        <div
          className="w-32 h-0.5 bg-zinc-100 rounded-full overflow-hidden mt-2"
          style={{ animation: 'introWordIn 0.4s ease 0.6s both' }}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ animation: 'introBar 1.1s cubic-bezier(0.4,0,0.2,1) 0.65s both' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes introLogoIn {
          from { opacity: 0; transform: scale(0.6) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes introWordIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes introPulse {
          0%   { transform: scale(1);    opacity: 0.8; }
          100% { transform: scale(1.9);  opacity: 0; }
        }
        @keyframes introBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
