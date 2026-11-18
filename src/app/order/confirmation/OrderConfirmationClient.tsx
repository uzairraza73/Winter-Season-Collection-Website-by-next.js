'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight, PackageCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || `NEXT-${Math.floor(100000 + Math.random() * 900000)}`;
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-xs animate-bounce">
        <CheckCircle2 size={36} />
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-black uppercase tracking-widest text-sky-700 mb-3 shadow-xs">
        <Sparkles size={12} /> Payment Confirmed
      </span>

      <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight mb-3">
        Thank You for Your Order!
      </h1>

      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
        Your payment was securely verified and processed. Your package is now being prepped for express US dispatch.
      </p>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 max-w-md mx-auto text-left mb-8 space-y-2.5">
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>Order Confirmation #:</span>
          <strong className="text-slate-900 font-mono text-sm">{orderId}</strong>
        </div>
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>Payment Gateway:</span>
          <strong className="text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck size={14} /> TapTapUp Verified
          </strong>
        </div>
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>Delivery Status:</span>
          <span className="text-sky-700 font-bold flex items-center gap-1">
            <PackageCheck size={14} /> Ready for US Courier Pickup
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2"
        >
          Continue Shopping
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/category/winter-collection"
          className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
        >
          Explore Winter Collection
        </Link>
      </div>
    </div>
  );
}
