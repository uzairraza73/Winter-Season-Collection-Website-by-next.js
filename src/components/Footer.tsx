'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function Footer() {
  const { openCheckout } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isMobileSite, setIsMobileSite] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner: Exclusive VISA Protection Guarantee */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F7B600]">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>Exclusive VISA-Only US Checkout</span>
                  <span className="text-[10px] bg-[#1A1F71] text-white font-black px-2 py-0.5 rounded tracking-widest">
                    VISA
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Every order is protected by Verified by Visa 3-D Secure real-time cryptographic tokenization.
                </p>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 border border-white/15 shadow-sm"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              Test Visa Payment Engine
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Row (Ultra-Attractive & Animated) */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0A0F1D] to-slate-950 py-14 sm:py-16 relative overflow-hidden">
        {/* Ambient glow mesh */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Perks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-[#B8860B]/30 text-xs font-extrabold text-[#B8860B] uppercase tracking-widest mb-3.5 shadow-sm">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles size={13} className="text-[#B8860B]" />
                </motion.span>
                <span>NEXT US VIP INSIDER</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2 leading-tight">
                GET 15% OFF YOUR <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400">
                  FIRST WINTER ORDER
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-4">
                Be the first to know about new arrivals, private seasonal sales, and exclusive Visa cardholder perks.
              </p>

              {/* Floating micro perk chips */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Instant 15% Voucher Code
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Early VIP Access
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 font-medium">
                  <CreditCard size={12} className="text-[#F7B600]" />
                  Visa Cardholder Rewards
                </span>
              </div>
            </motion.div>

            {/* Right Column: Interactive Animated Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-6"
            >
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 rounded-2xl shadow-xl flex items-center gap-3.5 text-emerald-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-400">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-emerald-200">
                      Welcome to the VIP Club!
                    </p>
                    <p className="text-xs text-emerald-400 mt-0.5">
                      Use code <strong className="font-mono text-white bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/30">NEXT15-WINTER</strong> at checkout for 15% off.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <div className="flex flex-col sm:flex-row gap-2.5 bg-slate-900/70 p-2 sm:p-2.5 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md focus-within:border-white focus-within:ring-4 focus-within:ring-white/10 transition-all duration-300">
                    <div className="relative flex-1 flex items-center">
                      <Mail size={16} className="absolute left-3.5 text-slate-400 shrink-0" />
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="group px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-md hover:shadow-xl hover:shadow-white/10 cursor-pointer"
                    >
                      <span>SUBSCRIBE</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2.5 pl-1 flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={12} className="text-slate-400" />
                    Strict privacy. Unsubscribe anytime with 1 click.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main 4 Columns (Matching NEXT US Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 text-xs">
          {/* Column 1: Help */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-5">
              Help
            </h4>
            <ul className="space-y-3 text-slate-400">
              {['Returns Information', 'Delivery Information', 'Contact Us', 'Product Recall', 'Size Guide', 'Track My Package'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Privacy & Legal */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-5">
              Privacy & Legal
            </h4>
            <ul className="space-y-3 text-slate-400">
              {['Privacy & Cookie Policy', 'Terms & Conditions', 'Manually Manage Cookies', 'Accessibility Statement', 'US State Privacy Rights'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Departments */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-5">
              Departments
            </h4>
            <ul className="space-y-3 text-slate-400">
              {['Womens', 'Mens', 'Boys', 'Girls', 'Home', 'Baby', 'Brands', 'Christmas Shop', 'Clearance'].map((item) => (
                <li key={item}>
                  <a href="#curated-products" className="hover:text-white transition-colors hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Other Services */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-5">
              Other Services
            </h4>
            <ul className="space-y-3 text-slate-400">
              {['Media & Press', 'The Company', 'NEXT Careers', 'Investor Relations', 'Corporate Responsibility', 'Wholesale Inquiries'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Base Ticker: "View mobile site" toggle + Copyright notice (© 2026 NEXT US LLC) */}
      <div className="border-t border-slate-900 bg-black py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="next-logo text-base font-black text-white tracking-[0.2em]">
              NEXT
            </span>
            <span className="text-slate-700">•</span>
            <span>© 2026 NEXT US LLC. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileSite((prev) => !prev)}
              className="hover:text-white transition-colors underline font-medium"
            >
              {isMobileSite ? 'View desktop site' : 'View mobile site'}
            </button>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <span className="text-sm">🇺🇸</span> United States (USD $)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
