'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    grandTotal,
    freeShippingRemaining,
    isFreeShipping,
    freeShippingProgress,
    isOpen,
    closeCart,
    openCheckout,
    removeItem,
    incrementItem,
    decrementItem,
  } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50 text-[#0F0F0F]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#0F0F0F]" />
              <h2 className="text-lg font-bold tracking-tight text-[#0F0F0F]">
                Shopping Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-zinc-50 border-b border-zinc-200/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-zinc-700">
                <Truck size={14} className="text-[#B8860B]" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold">You qualify for FREE US Standard Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-zinc-900">${freeShippingRemaining.toFixed(2)}</strong> for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-zinc-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0F0F0F] rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Strict Visa Acceptance Pill */}
          <div className="px-6 py-2 bg-[#1A1F71] text-white text-[11px] font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CreditCard size={13} className="text-[#F7B600]" />
              US Orders: Strictly VISA Cards Accepted
            </span>
            <span className="text-zinc-300">Verified by Visa</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-bold text-base text-[#0F0F0F] mb-1">Your bag is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Explore our seasonal winter edit, dresses, toys, and luxury outerwear to fill your bag.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-[#0F0F0F] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3 bg-zinc-50/70 rounded-2xl border border-zinc-200/80"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-zinc-200">
                    <Image
                      src={item.selectedColor.images[0] || 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <h4 className="font-semibold text-xs text-[#0F0F0F] line-clamp-1">
                        {item.product.name}
                      </h4>

                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {item.selectedColor.name} • {item.selectedSize.label}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200/60">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => decrementItem(item.cartItemId)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item.cartItemId)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#0F0F0F]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50/60 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>US Standard Delivery</span>
                  <span className="font-bold text-zinc-900">
                    {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-zinc-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0F0F0F] pt-2 border-t border-zinc-200">
                  <span>Estimated Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* CHECKOUT WITH VISA BUTTON */}
              <button
                onClick={() => {
                  closeCart();
                  openCheckout();
                }}
                className="w-full py-3.5 bg-[#4A4A4A] hover:bg-zinc-900 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <CreditCard size={16} className="text-[#F7B600]" />
                CHECKOUT WITH VISA
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>Strictly VISA Only • 256-Bit SSL Encryption</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
