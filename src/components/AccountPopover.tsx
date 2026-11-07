'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, ShieldCheck, ArrowRight, Package, CreditCard, X } from 'lucide-react';

interface AccountPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountPopover({ isOpen, onClose }: AccountPopoverProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setUserName(email.split('@')[0]);
      setIsLoggedIn(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Popover */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-zinc-200 z-50 p-6 text-[#0F0F0F]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700">
                  <User size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">
                    {isLoggedIn ? `Welcome, ${userName}` : 'Sign In to NEXT US'}
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    {isLoggedIn ? 'Next VIP Member' : 'Access orders, wishlist & Visa fast pay'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {isLoggedIn ? (
              <div className="py-4 space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-emerald-900">Visa One-Touch Enabled</p>
                    <p className="text-emerald-700 text-[11px]">Default checkout card ending in 8234</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <a href="#orders" onClick={onClose} className="flex items-center justify-between p-2.5 hover:bg-zinc-50 rounded-lg transition-colors font-medium">
                    <span className="flex items-center gap-2">
                      <Package size={14} className="text-zinc-500" />
                      Recent US Orders & Returns
                    </span>
                    <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full font-bold">1 Active</span>
                  </a>
                  <a href="#payment-methods" onClick={onClose} className="flex items-center justify-between p-2.5 hover:bg-zinc-50 rounded-lg transition-colors font-medium">
                    <span className="flex items-center gap-2">
                      <CreditCard size={14} className="text-[#1A1F71]" />
                      Saved VISA Cards
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">Verified</span>
                  </a>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full mt-2 py-2 text-xs text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="py-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <label className="flex items-center gap-1.5 text-zinc-600 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-zinc-300 accent-zinc-900" />
                    Remember me
                  </label>
                  <a href="#" className="text-zinc-500 hover:text-zinc-900 underline">
                    Forgot?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0F0F0F] hover:bg-zinc-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  Sign In to Account
                  <ArrowRight size={13} />
                </button>

                <div className="pt-2 text-center border-t border-zinc-100">
                  <p className="text-[11px] text-zinc-500">
                    New to NEXT US?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('sarah.new@next.us');
                        setPassword('password123');
                      }}
                      className="font-bold text-zinc-900 hover:underline"
                    >
                      Fill Demo Credentials
                    </button>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

