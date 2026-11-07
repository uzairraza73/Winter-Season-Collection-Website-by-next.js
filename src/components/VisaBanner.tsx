'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function VisaBanner() {
  const { openCheckout, freeShippingRemaining, isFreeShipping } = useCart();

  return (
    <div className="bg-[#0F172A] text-white text-xs border-b border-slate-800 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left: Free delivery status */}
          <div className="flex items-center gap-2 text-slate-300">
            <Truck size={14} className="text-[#B8860B]" />
            <span>
              {isFreeShipping ? (
                <strong className="text-white">🎉 Free US Standard Delivery Qualified!</strong>
              ) : (
                <>
                  Free US Delivery on Orders Over $150 —{' '}
                  <span className="text-[#B8860B] font-bold">
                    ${freeShippingRemaining.toFixed(2)} away
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Center: Top Promotion Ticker Matching Exact Prompt Requirement */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3.5 py-1 rounded-full cursor-pointer transition-colors shadow-sm"
            onClick={openCheckout}
            title="Click to preview Visa-Only Checkout engine"
          >
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <CreditCard size={13} className="text-[#1A1F71] bg-white rounded-[3px] p-[1px]" />
              <span className="text-slate-100 text-xs tracking-wide">
                Exclusive US Delivery: We strictly accept <strong className="text-white underline decoration-emerald-400 font-bold">VISA Cards</strong> for all orders 💳
              </span>
            </div>
            <ChevronRight size={12} className="text-slate-400" />
          </motion.div>

          {/* Right: Currency & Security */}
          <div className="hidden lg:flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={13} className="text-emerald-400" />
              Verified by Visa • 256-Bit SSL
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-200 font-semibold">
              <span>🇺🇸</span> USD ($)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
