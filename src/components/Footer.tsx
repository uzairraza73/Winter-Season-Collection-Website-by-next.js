'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function Footer() {
  const { openCheckout } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-200">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-950/40 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
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
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <ShieldCheck size={14} className="text-emerald-600" />
              Test Visa Payment Engine
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Row */}
      <div className="border-b border-slate-800 py-12 sm:py-14 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles size={12} /> Winter VIP Club
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
                GET 15% OFF YOUR FIRST WINTER ORDER
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Be the first to know about new arrivals, private seasonal sales, and exclusive Visa cardholder perks.
              </p>
            </div>

            {/* Right */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300">
                  <Check size={20} className="text-emerald-400" />
                  <p className="text-xs font-bold">
                    Welcome! Use code <strong className="text-white">NEXT15-WINTER</strong> at checkout for 15% off.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-black text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-extrabold text-sm uppercase text-white mb-4">Help</h4>
            <ul className="space-y-2.5 text-slate-400">
              {['Returns Information', 'Delivery Information', 'Contact Us', 'Product Recall', 'Size Guide', 'Track My Package'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm uppercase text-white mb-4">Privacy & Legal</h4>
            <ul className="space-y-2.5 text-slate-400">
              {['Privacy & Cookie Policy', 'Terms & Conditions', 'Accessibility Statement', 'US State Privacy Rights'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm uppercase text-white mb-4">Departments</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/category/toys" className="hover:text-white transition-colors">Toys & Soft Plush</Link></li>
              <li><Link href="/category/character-shops" className="hover:text-white transition-colors">Character Shops</Link></li>
              <li><Link href="/category/jackets-coats" className="hover:text-white transition-colors">Jackets & Coats</Link></li>
              <li><Link href="/category/dresses" className="hover:text-white transition-colors">Dresses</Link></li>
              <li><Link href="/category/homewear" className="hover:text-white transition-colors">Homewear</Link></li>
              <li><Link href="/category/electric-things" className="hover:text-white transition-colors">Electric & Tech</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm uppercase text-white mb-4">Services</h4>
            <ul className="space-y-2.5 text-slate-400">
              {['Corporate Responsibility', 'Media & Press', 'Careers', 'Investor Relations', 'Wholesale Inquiries'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Base */}
      <div className="border-t border-slate-800 bg-slate-950 py-5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="next-logo text-sm font-black text-white tracking-[0.2em]">NEXT</span>
            <span>• © 2026 NEXT US LLC. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">🇺🇸 United States (USD $)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
