'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const ROLES = [
  { id: 'shopper', label: 'Fashion Shopper', icon: 'solar:bag-heart-bold-duotone', desc: 'I want to try clothes before buying' },
  { id: 'merchant', label: 'Merchant / Brand', icon: 'solar:shop-bold-duotone', desc: 'I want to add virtual try-on to my store' },
  { id: 'developer', label: 'Developer', icon: 'solar:code-bold-duotone', desc: 'I want to integrate via API' },
];

const PLATFORMS = ['Shopify', 'WooCommerce', 'Tokopedia', 'Shopee', 'Custom API', 'Other'];

const REFERRAL_SOURCES = [
  { id: 'instagram',  label: 'Instagram',  icon: 'skill-icons:instagram',           color: '#E1306C' },
  { id: 'tiktok',     label: 'TikTok',     icon: 'logos:tiktok-icon',               color: '#010101' },
  { id: 'twitter',    label: 'X / Twitter',icon: 'skill-icons:twitter',             color: '#1DA1F2' },
  { id: 'youtube',    label: 'YouTube',    icon: 'logos:youtube-icon',              color: '#FF0000' },
  { id: 'facebook',   label: 'Facebook',   icon: 'logos:facebook',                  color: '#1877F2' },
  { id: 'linkedin',   label: 'LinkedIn',   icon: 'skill-icons:linkedin',            color: '#0A66C2' },
  { id: 'google',     label: 'Google',     icon: 'logos:google-icon',               color: '#4285F4' },
  { id: 'friend',     label: 'A Friend',   icon: 'solar:users-group-rounded-bold-duotone', color: '#8B5CF6' },
];

type Step = 'role' | 'details' | 'success';

export default function WaitlistPage() {
  const [step, setStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', brand: '', platform: '', referral: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [position, setPosition] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setPosition(Math.floor(Math.random() * 400) + 800);
    setIsSubmitting(false);
    setStep('success');
  };

  const isMerchant = selectedRole === 'merchant';

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white text-zinc-900 font-sans px-4 py-16" style={{ overflowX: 'hidden' }}>

      {/* Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.6) 1px, transparent 1px),
            radial-gradient(circle 600px at 10% 90%, rgba(139,92,246,0.2), transparent),
            radial-gradient(circle 600px at 90% 10%, rgba(59,130,246,0.2), transparent)
          `,
          backgroundSize: '48px 48px, 48px 48px, 100% 100%, 100% 100%',
        }}
      />

      {/* Back to home */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-md border border-zinc-200 px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-sm"
      >
        <Icon icon="solar:arrow-left-linear" className="text-base" />
        Back
      </Link>

      {/* Logo */}
      <Link href="/" className="relative z-10 flex items-center gap-2 mb-10">
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-black">F</span>
        </div>
        <span className="text-xl font-bold tracking-tighter text-zinc-900">Fittly</span>
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg">

        {/* ── STEP 1: Choose Role ── */}
        {step === 'role' && (
          <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-[2rem] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600 mb-4">
                <Icon icon="solar:hourglass-bold-duotone" className="text-base" />
                Early Access
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 mb-2">Join the Waitlist</h1>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Be among the first to experience AI-powered virtual try-on. Tell us who you are to get started.
              </p>
            </div>

            {/* Role Cards */}
            <div className="flex flex-col gap-3 mb-8">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 group ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 shadow-[0_0_0_4px_rgba(59,130,246,0.08)]'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    selectedRole === role.id ? 'bg-blue-100 text-blue-600' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
                  }`}>
                    <Icon icon={role.icon} className="text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-zinc-900 text-sm">{role.label}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{role.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    selectedRole === role.id ? 'border-blue-500 bg-blue-500' : 'border-zinc-300'
                  }`}>
                    {selectedRole === role.id && (
                      <Icon icon="solar:check-bold" className="text-white text-xs" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedRole && setStep('details')}
              disabled={!selectedRole}
              className="w-full py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-black transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              Continue
              <Icon icon="solar:arrow-right-linear" className="text-base" />
            </button>

            {/* Social proof */}
            <p className="text-center text-xs text-zinc-400 mt-5">
              <span className="font-semibold text-zinc-600">1,200+</span> people already on the waitlist
            </p>
          </div>
        )}

        {/* ── STEP 2: Details Form ── */}
        {step === 'details' && (
          <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-[2rem] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Back */}
            <button
              onClick={() => setStep('role')}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 text-sm font-medium mb-6 transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" className="text-base" />
              Back
            </button>

            {/* Header */}
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Icon icon={ROLES.find(r => r.id === selectedRole)?.icon ?? 'solar:user-bold-duotone'} className="text-xl" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Joining as</div>
                  <div className="font-bold text-zinc-900 text-sm">{ROLES.find(r => r.id === selectedRole)?.label}</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Almost there</h2>
              <p className="text-zinc-500 text-sm mt-1">Fill in your details and we'll notify you when your spot is ready.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">
                  {isMerchant ? 'Your Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={isMerchant ? 'Jane Doe' : 'Jane Doe'}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder-zinc-400 shadow-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={isMerchant ? 'founder@brand.com' : 'you@email.com'}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder-zinc-400 shadow-sm"
                />
              </div>

              {/* Merchant-only fields */}
              {isMerchant && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">Brand / Store Name</label>
                    <input
                      type="text"
                      required
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      placeholder="Your Fashion Brand"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder-zinc-400 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">E-commerce Platform</label>
                    <div className="grid grid-cols-3 gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setForm({ ...form, platform: p })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                            form.platform === p
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Referral */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
                  How did you hear about us? <span className="normal-case text-zinc-400 font-normal">(optional)</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {REFERRAL_SOURCES.map((src) => (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => setForm({ ...form, referral: form.referral === src.id ? '' : src.id })}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-200 group ${
                        form.referral === src.id
                          ? `border-[${src.color}] bg-[${src.color}]/10 shadow-[0_0_0_3px_${src.color}20]`
                          : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                      }`}
                      style={form.referral === src.id ? { borderColor: src.color, backgroundColor: src.color + '15' } : {}}
                    >
                      <Icon
                        icon={src.icon}
                        className="text-2xl transition-transform group-hover:scale-110"
                        style={{ color: form.referral === src.id ? src.color : '#71717a' }}
                      />
                      <span className={`text-[10px] font-semibold leading-none transition-colors ${
                        form.referral === src.id ? 'text-zinc-900' : 'text-zinc-400'
                      }`}>
                        {src.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy note */}
              <p className="text-xs text-zinc-400 flex items-start gap-2 pt-1">
                <Icon icon="solar:shield-check-bold-duotone" className="text-emerald-500 text-base shrink-0 mt-0.5" />
                Your data is safe. We'll only use your email to notify you about your waitlist status.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-black transition-all shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="solar:refresh-bold-duotone" className="text-lg animate-spin" />
                    Securing your spot...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:rocket-bold-duotone" className="text-lg" />
                    Join the Waitlist
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === 'success' && (
          <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-[2rem] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] animate-in fade-in zoom-in-95 duration-500 text-center">
            {/* Confetti icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-white">
              <Icon icon="solar:confetti-bold-duotone" className="text-4xl text-blue-600" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-600 mb-4">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              You're on the list!
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Welcome aboard 🎉</h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Thanks, <span className="font-semibold text-zinc-800">{form.name.split(' ')[0]}</span>! We've saved your spot. We'll send an invite to <span className="font-semibold text-zinc-800">{form.email}</span> when Fittly is ready for you.
            </p>

            {/* Position card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 mb-8">
              <div className="text-4xl font-black text-zinc-900 tracking-tighter mb-1">#{position.toLocaleString()}</div>
              <div className="text-sm text-zinc-500 font-medium">Your position on the waitlist</div>
              <div className="mt-4 w-full bg-white/60 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (1200 / (position + 1200)) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium mt-1.5">
                <span>1,200+ already joined</span>
                <span>Early access</span>
              </div>
            </div>

            {/* Share nudge */}
            <p className="text-xs text-zinc-500 mb-4 font-medium">Move up the list — share Fittly with friends</p>
            <div className="flex gap-3 justify-center mb-8">
              <a
                href={`https://twitter.com/intent/tweet?text=I just joined the waitlist for @FittlyApp — AI virtual try-on for fashion! Join me: https://fittly.app/waitlist`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <Icon icon="simple-icons:x" className="text-sm" />
                Share on X
              </a>
              <button
                onClick={() => { navigator.clipboard.writeText('https://fittly.app/waitlist'); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <Icon icon="solar:copy-bold-duotone" className="text-sm" />
                Copy Link
              </button>
            </div>

            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors font-medium"
            >
              ← Back to homepage
            </Link>
          </div>
        )}

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {(['role', 'details'] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === s ? 'w-6 bg-zinc-900' : step === 'details' && s === 'role' ? 'w-3 bg-zinc-300' : 'w-3 bg-zinc-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
