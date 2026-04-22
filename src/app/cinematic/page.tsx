import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function CinematicHero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-black text-white selection:bg-white/20 selection:text-white font-sans">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-black/30 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-black/60"></div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/80"></div>

      {/* Navigation */}
      <header className="relative z-20 w-full px-6 py-8 md:px-12 flex justify-between items-center">
        {/* Logo (Letters only, tight tracking) */}
        <div className="text-lg font-medium tracking-tighter select-none">
          AURA
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-white/60">
          <Link href="#" className="hover:text-white transition-colors duration-300">Platform</Link>
          <Link href="#" className="hover:text-white transition-colors duration-300">Solutions</Link>
          <Link href="#" className="hover:text-white transition-colors duration-300">Customers</Link>
          <Link href="#" className="hover:text-white transition-colors duration-300">Pricing</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link href="#" className="hidden sm:block text-sm font-normal text-white/60 hover:text-white transition-colors duration-300">Sign in</Link>
          <Link href="#" className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white hover:bg-white hover:text-black transition-all duration-300">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 text-center mt-[-5%]">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-xs font-medium text-white/80 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Icon icon="solar:star-fall-linear" width="20" height="20" strokeWidth="1.5" />
          <span>Aura Engine 4.0 is now live</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 max-w-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 leading-[1.1]">
          Visualize the unseen.<br className="hidden md:block" /> Master the light.
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mb-12 leading-relaxed">
          Harness the power of real-time volumetric rendering. Build breathtaking immersive worlds with absolute precision and cinematic quality directly in your browser.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="#" className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Start creating
            <Icon icon="solar:arrow-right-linear" width="20" height="20" strokeWidth="1.5" className="text-lg" />
          </Link>
          <Link href="#" className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
            <Icon icon="solar:play-circle-linear" width="20" height="20" strokeWidth="1.5" className="text-lg text-white/70" />
            Watch showreel
          </Link>
        </div>
      </div>

      {/* Footer / Minimal Info */}
      <div className="relative z-20 w-full px-6 py-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-white/40">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
          Systems operational
        </div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white/80 transition-colors duration-300">Twitter</Link>
          <Link href="#" className="hover:text-white/80 transition-colors duration-300">GitHub</Link>
          <Link href="#" className="hover:text-white/80 transition-colors duration-300">Discord</Link>
        </div>
      </div>

    </main>
  );
}
