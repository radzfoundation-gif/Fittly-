'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SeamlessVideo from '@/components/SeamlessVideo';

// Scroll reveal wrapper
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function CinematicHero() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const closeModal = () => setActiveModal(null);

  const renderModalContent = () => {
    switch (activeModal) {
      case 'Features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Card 1 */}
            <div className="group bg-white/80 backdrop-blur-md hover:bg-white transition-all p-7 rounded-[24px] border border-zinc-200 hover:border-zinc-300 shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full text-zinc-900 shadow-sm group-hover:scale-110 transition-transform shrink-0 border border-zinc-200">
                  <Icon icon="solar:camera-linear" className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">Virtual Try-On Engine</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Upload a single selfie. Our AI detects body shapes and applies realistic cloth rendering in under 5 seconds, ensuring accurate drape and fit visualization.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white/80 backdrop-blur-md hover:bg-white transition-all p-7 rounded-[24px] border border-zinc-200 hover:border-zinc-300 shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full text-zinc-900 shadow-sm group-hover:scale-110 transition-transform shrink-0 border border-zinc-200">
                  <Icon icon="solar:ruler-linear" className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">Size Recommendation</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Automatically estimates body measurements from the user's photo and compares them with merchant size charts to recommend the perfect fit.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/80 backdrop-blur-md hover:bg-white transition-all p-7 rounded-[24px] border border-zinc-200 hover:border-zinc-300 shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full text-zinc-900 shadow-sm group-hover:scale-110 transition-transform shrink-0 border border-zinc-200">
                  <Icon icon="solar:code-scan-linear" className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">Seamless Integration</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Implement virtual try-on with a 1-line JavaScript SDK, plug-and-play plugins for Shopify & WooCommerce, or build custom flows via REST API.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-white/80 backdrop-blur-md hover:bg-white transition-all p-7 rounded-[24px] border border-zinc-200 hover:border-zinc-300 shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full text-zinc-900 shadow-sm group-hover:scale-110 transition-transform shrink-0 border border-zinc-200">
                  <Icon icon="solar:chart-square-linear" className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">Merchant Analytics</h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Access a comprehensive dashboard to track usage, monitor conversion lifts, and analyze reduction in return rates directly from user engagement data.
              </p>
            </div>
          </div>
        );
      case 'How It Works':
        return (
          <div className="space-y-4 text-zinc-800 text-sm font-light py-2">
            <ol className="relative border-l border-zinc-300 ml-4 space-y-8">
              <li className="pl-8 relative group">
                <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-zinc-900 rounded-full border border-white text-white text-xs font-medium group-hover:bg-zinc-700 transition-colors shadow-sm">1</span>
                <h3 className="font-medium text-zinc-900 mb-1">Click "Try Virtual"</h3>
                <p className="text-zinc-500">On the merchant's product page.</p>
              </li>
              <li className="pl-8 relative group">
                <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-zinc-900 rounded-full border border-white text-white text-xs font-medium group-hover:bg-zinc-700 transition-colors shadow-sm">2</span>
                <h3 className="font-medium text-zinc-900 mb-1">Upload Selfie</h3>
                <p className="text-zinc-500">Real-time pose and lighting validation.</p>
              </li>
              <li className="pl-8 relative group">
                <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-zinc-900 rounded-full border border-white text-white text-xs font-medium group-hover:bg-zinc-700 transition-colors shadow-sm">3</span>
                <h3 className="font-medium text-zinc-900 mb-1">See the Results</h3>
                <p className="text-zinc-500">View the realistic rendering and get size recommendations.</p>
              </li>
              <li className="pl-8 relative group">
                <span className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-zinc-900 rounded-full border border-white text-white text-xs font-medium group-hover:bg-zinc-700 transition-colors shadow-sm">4</span>
                <h3 className="font-medium text-zinc-900 mb-1">Add to Cart</h3>
                <p className="text-zinc-500">Checkout with confidence.</p>
              </li>
            </ol>
          </div>
        );
      case 'Merchants':
        return (
          <div className="space-y-6 text-zinc-900 text-sm font-light">
            <p className="text-zinc-600">Empower your fashion brand by solving the biggest e-commerce challenge.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-zinc-200 text-center hover:bg-white transition-all relative overflow-hidden shadow-sm">
                <div className="text-3xl font-medium text-zinc-900 mb-1">30-40%</div>
                <div className="text-xs text-zinc-500">Current Return Rate</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-zinc-200 text-center hover:bg-white transition-all relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none"></div>
                <div className="text-3xl font-medium text-green-600 mb-1">-35%</div>
                <div className="text-xs text-zinc-500">Return Reduction Goal</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-200 text-center col-span-2 hover:bg-white transition-all relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
                <div className="text-4xl font-medium text-blue-600 mb-1">+20%</div>
                <div className="text-sm text-zinc-500">Expected Conversion Lift</div>
              </div>
            </div>
          </div>
        );
      case 'Pricing':
        return (
          <div className="w-full">
            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-zinc-900' : 'text-zinc-500'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative w-14 h-8 rounded-full bg-zinc-200 border border-zinc-300 p-1 transition-colors hover:bg-zinc-300"
              >
                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-zinc-900' : 'text-zinc-500'}`}>Annual</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-700 text-[10px] font-bold uppercase tracking-wider">Save 17%</span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Starter Plan */}
              <div className="relative flex flex-col p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-all group shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-xs font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors bg-white">01</span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 mb-1">Starter</h3>
                <p className="text-zinc-500 text-sm mb-6 h-10">Essential features for small fashion brands.</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-zinc-900 tracking-tight">{billingCycle === 'monthly' ? 'Rp 299k' : 'Rp 249k'}</span>
                  <span className="text-zinc-500 text-sm">/mo</span>
                  {billingCycle === 'annual' && <div className="text-zinc-400 text-xs mt-1">Billed annually</div>}
                  {billingCycle === 'monthly' && <div className="text-zinc-400 text-xs mt-1">Billed monthly</div>}
                </div>
                
                <button className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-all mb-8 shadow-sm">
                  Get Started <Icon icon="solar:arrow-right-up-linear" className="inline ml-1 text-lg align-text-bottom"/>
                </button>
                
                <div className="text-xs font-medium text-zinc-400 mb-4 uppercase tracking-wider">Includes:</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>500 monthly AI sessions</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>Basic virtual try-on engine</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>Standard size recommendations</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>Standard email support</span>
                  </li>
                </ul>
              </div>

              {/* Growth Plan */}
              <div className="relative flex flex-col p-6 bg-white rounded-3xl border border-blue-500/30 shadow-[0_8px_30px_rgba(59,130,246,0.15)] transform md:-translate-y-4 transition-all group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent rounded-3xl pointer-events-none"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-200 text-xs font-medium text-blue-700 group-hover:text-blue-900 transition-colors bg-white">02</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-medium shadow-sm">
                    <Icon icon="solar:stars-minimalistic-bold" /> Most popular
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 mb-1 relative z-10">Growth</h3>
                <p className="text-zinc-600 text-sm mb-6 h-10 relative z-10">Higher limits & premium features for growing stores.</p>
                
                <div className="mb-6 relative z-10">
                  <span className="text-4xl font-bold text-zinc-900 tracking-tight">{billingCycle === 'monthly' ? 'Rp 799k' : 'Rp 659k'}</span>
                  <span className="text-zinc-500 text-sm">/mo</span>
                  {billingCycle === 'annual' && <div className="text-zinc-400 text-xs mt-1">Billed annually</div>}
                  {billingCycle === 'monthly' && <div className="text-zinc-400 text-xs mt-1">Billed monthly</div>}
                </div>
                
                <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all mb-8 shadow-sm relative z-10">
                  Subscribe <Icon icon="solar:bolt-linear" className="inline ml-1 text-lg align-text-bottom"/>
                </button>
                
                <div className="text-xs font-medium text-zinc-500 mb-4 uppercase tracking-wider relative z-10">Everything in Starter, plus:</div>
                <ul className="space-y-3 relative z-10">
                  <li className="flex items-start gap-3 text-zinc-900 text-sm font-medium">
                    <Icon icon="solar:check-circle-bold" className="text-blue-500 mt-0.5 text-lg shrink-0" />
                    <span>5,000 monthly AI sessions</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-blue-400 mt-0.5 text-lg shrink-0" />
                    <span>Advanced rendering engine</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-blue-400 mt-0.5 text-lg shrink-0" />
                    <span>Full e-commerce CMS integration</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-blue-400 mt-0.5 text-lg shrink-0" />
                    <span>Priority support access</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-blue-400 mt-0.5 text-lg shrink-0" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
              </div>

              {/* Scale Plan */}
              <div className="relative flex flex-col p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-all group shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-xs font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors bg-white">03</span>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 mb-1">Scale</h3>
                <p className="text-zinc-500 text-sm mb-6 h-10">Maximum performance for enterprise users.</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-zinc-900 tracking-tight">{billingCycle === 'monthly' ? 'Rp 1.99M' : 'Rp 1.65M'}</span>
                  <span className="text-zinc-500 text-sm">/mo</span>
                  {billingCycle === 'annual' && <div className="text-zinc-400 text-xs mt-1">Billed annually</div>}
                  {billingCycle === 'monthly' && <div className="text-zinc-400 text-xs mt-1">Billed monthly</div>}
                </div>
                
                <button className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-all mb-8 shadow-sm">
                  Subscribe <Icon icon="solar:rocket-linear" className="inline ml-1 text-lg align-text-bottom"/>
                </button>
                
                <div className="text-xs font-medium text-zinc-400 mb-4 uppercase tracking-wider">Everything in Growth, plus:</div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>20,000 monthly AI sessions</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>Custom API integration limits</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>White-label capabilities</span>
                  </li>
                  <li className="flex items-start gap-3 text-zinc-700 text-sm">
                    <Icon icon="solar:check-circle-bold" className="text-zinc-400 mt-0.5 text-lg shrink-0" />
                    <span>24/7 premium phone support</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        );
      case 'Sign In':
        return (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input type="email" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="you@company.com" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">Password</label>
                <button type="button" onClick={() => setActiveModal('Forgot Password')} className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-bold">Forgot Password?</button>
              </div>
              <input type="password" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="••••••••" />
            </div>
            <button className="w-full py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-4 flex items-center justify-center gap-2 active:scale-95">
              Log In
            </button>

            <div className="relative py-2 flex items-center gap-3">
              <div className="h-px bg-zinc-200/50 flex-1" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">or</span>
              <div className="h-px bg-zinc-200/50 flex-1" />
            </div>

            <button type="button" className="w-full py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl flex items-center justify-center gap-2 hover:bg-white/80 transition-all shadow-sm active:scale-95">
              <Icon icon="logos:google-icon" width="18" />
              <span className="text-sm font-bold text-zinc-700">Sign in with Google</span>
            </button>
            <p className="text-center text-zinc-600 text-xs font-medium pt-2">
              Don't have an account?{' '}
              <button type="button" onClick={() => setActiveModal('Register')} className="text-blue-600 hover:text-blue-700 font-bold decoration-2 underline-offset-4 hover:underline">
                Create one
              </button>
            </p>
          </form>
        );
      case 'Register':
        return (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input type="text" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Brand Name</label>
                <input type="text" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="Fashion Brand" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input type="email" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="john@brand.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Password</label>
              <input type="password" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="••••••••" />
            </div>
            <button className="w-full py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-4 active:scale-95">
              Get Started
            </button>

            <div className="relative py-2 flex items-center gap-3">
              <div className="h-px bg-zinc-200/50 flex-1" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">or</span>
              <div className="h-px bg-zinc-200/50 flex-1" />
            </div>

            <button type="button" className="w-full py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl flex items-center justify-center gap-2 hover:bg-white/80 transition-all shadow-sm active:scale-95">
              <Icon icon="logos:google-icon" width="18" />
              <span className="text-sm font-bold text-zinc-700">Continue with Google</span>
            </button>
            <p className="text-center text-zinc-600 text-xs font-medium pt-2">
              Already have an account?{' '}
              <button type="button" onClick={() => setActiveModal('Sign In')} className="text-blue-600 hover:text-blue-700 font-bold decoration-2 underline-offset-4 hover:underline">
                Log In
              </button>
            </p>
          </form>
        );
      case 'Forgot Password':
        return (
          <div className="space-y-6">
            <p className="text-zinc-600 text-sm font-medium">Enter your email and we'll send you instructions to reset your password.</p>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setActiveModal('Reset Sent'); }}>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input type="email" required className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-500 shadow-sm" placeholder="you@company.com" />
              </div>
              <button className="w-full py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Reset Password
              </button>
              <button type="button" onClick={() => setActiveModal('Sign In')} className="w-full text-center text-zinc-600 hover:text-zinc-900 text-xs font-bold transition-colors">
                Back to Log In
              </button>
            </form>
          </div>
        );
      case 'Reset Sent':
        return (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100">
              <Icon icon="solar:check-read-linear" className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Check your email</h2>
            <p className="text-zinc-600 text-sm font-medium mb-8">We've sent a password reset link to your email address.</p>
            <button 
              onClick={() => setActiveModal('Sign In')}
              className="w-full py-3.5 bg-white border border-zinc-200 text-zinc-900 text-sm font-bold rounded-xl hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
            >
              Back to Log In
            </button>
          </div>
        );
      case 'Become a Merchant':
        return (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Brand Name</label>
              <input type="text" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-400 shadow-sm" placeholder="Your Fashion Brand" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">E-commerce Platform</label>
              <div className="relative">
                <select className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none shadow-sm">
                  <option value="shopify" className="bg-white">Shopify</option>
                  <option value="woocommerce" className="bg-white">WooCommerce</option>
                  <option value="custom" className="bg-white">Custom API</option>
                </select>
                <Icon icon="solar:alt-arrow-down-linear" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Work Email</label>
              <input type="email" className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-zinc-400 shadow-sm" placeholder="founder@brand.com" />
            </div>
            <button className="w-full py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-4 active:scale-95">
              Start Free Trial
            </button>
          </form>
        );
      default:
        return (
          <div className="bg-zinc-50 rounded-[2rem] p-12 flex flex-col items-center justify-center border border-zinc-200 text-center">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden mb-6 shadow-sm border border-white">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/loading-boy.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="text-zinc-500 text-sm font-medium animate-pulse">Menyiapkan pengalaman interaktif...</p>
          </div>
        );
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between bg-white text-zinc-900 selection:bg-blue-500/20 selection:text-blue-900 font-sans" style={{ overflowX: 'hidden' }}>
      {/* Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-zinc-100 overflow-hidden">
        <SeamlessVideo 
          src="/children-camping-bg.mp4" 
          className="scale-110"
          style={{ filter: 'blur(80px) brightness(1.1)' }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-40 w-full pt-8 px-6 flex justify-center">
        <div className="flex items-center justify-between w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-zinc-200/80 rounded-[2rem] px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tighter select-none text-zinc-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">F</span>
            </div>
            Fittly
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <button type="button" onClick={() => setActiveModal('Features')} className="hover:text-zinc-900 transition-colors duration-300">Features</button>
            <button type="button" onClick={() => setActiveModal('How It Works')} className="hover:text-zinc-900 transition-colors duration-300">How It Works</button>
            <button type="button" onClick={() => setActiveModal('Merchants')} className="hover:text-zinc-900 transition-colors duration-300">Merchants</button>
            <button type="button" onClick={() => setActiveModal('Pricing')} className="hover:text-zinc-900 transition-colors duration-300">Pricing</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => setActiveModal('Sign In')} className="hidden sm:block text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-300">Sign In</button>
            <Link href="/waitlist" className="px-5 py-2.5 rounded-full bg-zinc-900 text-xs font-medium text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md">
              Join Waitlist
            </Link>
          </div>
        </div>
      </header>

      {/* Floating Mascot Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatMascot {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* Hero Content */}
      <div className="relative z-20 flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 max-w-7xl mx-auto w-full gap-12 lg:gap-24 py-12 md:py-0 min-h-[calc(100vh-120px)]">
        
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 mb-8 text-xs font-medium text-zinc-600 shadow-sm" style={{animation:'heroFadeUp 0.6s ease 0.2s both'}}>
            <Icon icon="solar:star-fall-bold" width="16" height="16" className="text-blue-500" />
            <span>#1 Virtual Fitting Room in Southeast Asia</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter mb-6 text-zinc-900 leading-[1.1]" style={{animation:'heroFadeUp 0.7s ease 0.35s both'}}>
            Try Before You Buy.<br /> Shop with Confidence.
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-zinc-500 font-light max-w-xl mb-10 leading-relaxed" style={{animation:'heroFadeUp 0.7s ease 0.5s both'}}>
            Reduce hesitation in online fashion shopping. Fittly uses AI to provide realistic visualization of clothing on your body with just one selfie. Increase conversions and lower return rates.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-30" style={{animation:'heroFadeUp 0.7s ease 0.65s both'}}>
            <Link href="/workspace" className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)]">
              Try Virtual Try-On
              <Icon icon="solar:arrow-right-linear" width="20" height="20" strokeWidth="1.5" className="text-lg" />
            </Link>
            <button type="button" onClick={() => setActiveModal('How It Works Video')} className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-zinc-200 text-zinc-800 text-sm font-medium hover:bg-zinc-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              <Icon icon="solar:play-circle-bold" width="20" height="20" className="text-lg text-zinc-400" />
              See How It Works
            </button>
          </div>
        </div>

        {/* Right: Mascot Video */}
        <div className="flex-1 flex justify-center md:justify-end w-full max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto md:mx-0" style={{animation:'heroFadeUp 0.8s ease 0.5s both'}}>
          <div 
            className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white/50 bg-white/40 backdrop-blur-md p-2"
            style={{ animation: 'floatMascot 6s ease-in-out infinite' }}
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover rounded-[2.5rem] opacity-90">
              <source src="/mascot.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Footer / Minimal Info */}
      <div className="relative z-20 w-full px-6 py-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-500">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
          AI Engine Ready
        </div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-zinc-900 transition-colors duration-300">Instagram</Link>
          <Link href="#" className="hover:text-zinc-900 transition-colors duration-300">TikTok</Link>
          <Link href="#" className="hover:text-zinc-900 transition-colors duration-300">LinkedIn</Link>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md transition-all duration-300" onClick={closeModal}>

          <div 
            className={`relative w-full ${activeModal === 'Pricing' ? 'max-w-6xl' : activeModal === 'Features' ? 'max-w-5xl' : 'max-w-lg'} bg-white/30 backdrop-blur-[40px] border border-white/40 rounded-[40px] p-10 shadow-[0_32px_64px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-500 transition-all overflow-y-auto max-h-[90vh]`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 hover:scale-110 transition-all duration-200 border border-zinc-200"
            >
              <Icon icon="solar:close-circle-linear" width="20" height="20" />
            </button>
            
            <div className={`mb-8 pr-8 ${activeModal === 'Pricing' || activeModal === 'Features' ? 'text-center pr-0' : ''}`}>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">{activeModal}</h2>
              {/* Optional subheadline depending on the modal */}
              {activeModal === 'Sign In' && <p className="text-zinc-600 text-sm font-medium">Welcome back to Fittly.</p>}
              {activeModal === 'Become a Merchant' && <p className="text-zinc-600 text-sm font-medium">Join 500+ stores using virtual try-on.</p>}
              {activeModal === 'Features' && <p className="text-zinc-600 text-sm font-medium">Core technology powering the experience.</p>}
              {activeModal === 'Pricing' && <p className="text-zinc-600 text-sm font-medium">Choose the perfect plan for your fashion brand.</p>}
            </div>

            {/* Dynamic Modal Content */}
            <div className="mt-2">
              {renderModalContent()}
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
