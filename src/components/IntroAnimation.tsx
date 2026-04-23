'use client';

import { useEffect, useState } from 'react';

export default function IntroAnimation() {
  const [phase, setPhase] = useState<'visible' | 'shrink' | 'gone'>('visible');

  useEffect(() => {
    // After 3.5s start the exit animation
    const t1 = setTimeout(() => setPhase('shrink'), 3500);
    // After exit animation completes, remove from DOM
    const t2 = setTimeout(() => setPhase('gone'), 4500);
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

      {/* Video & Text Content */}
      <div className="relative flex flex-col items-center gap-8 max-w-md px-6 text-center">
        {/* Video Container */}
        <div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white bg-zinc-50"
          style={{
            animation: 'introLogoIn 0.8s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/loading-boy.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h2 
            className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900"
            style={{ animation: 'introWordIn 0.6s ease 0.4s both' }}
          >
            Fittly Studio
          </h2>
          <p 
            className="text-zinc-500 font-medium text-sm md:text-base leading-relaxed"
            style={{ animation: 'introWordIn 0.6s ease 0.6s both' }}
          >
            Menyiapkan ruang kreatif virtual Anda.<br />
            Hampir sampai di tujuan.
          </p>
        </div>

        {/* Progress Bar */}
        <div
          className="w-48 h-1 bg-zinc-100 rounded-full overflow-hidden mt-2"
          style={{ animation: 'introWordIn 0.4s ease 0.8s both' }}
        >
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ animation: 'introBar 1.5s cubic-bezier(0.4,0,0.2,1) 0.8s both' }}
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
