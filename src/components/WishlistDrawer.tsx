'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useWishlistStore } from '@/store';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const { addItem, openCart } = useCart();

  const wishlistedProducts = products.filter((p) =>
    wishlistItems.some((w) => w.productId === p.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={20} className="fill-[#C8102E] text-[#C8102E]" />
                <h2 className="text-lg font-bold tracking-tight text-[#0F0F0F]">
                  Saved Items ({wishlistedProducts.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {wishlistedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                    <Heart size={28} />
                  </div>
                  <h3 className="font-bold text-base text-[#0F0F0F] mb-1">Your wishlist is empty</h3>
                  <p className="text-xs text-zinc-500 max-w-xs mb-6">
                    Tap the heart icon on any product to save your favorite seasonal pieces for later.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#0F0F0F] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                  >
                    Explore New In
                  </button>
                </div>
              ) : (
                wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200/70 hover:border-zinc-300 transition-all"
                  >
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-zinc-200">
                      <Image
                        src={product.colors[0]?.images[0] || 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                            {product.brand}
                          </span>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                            title="Remove from saved"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <h4 className="font-semibold text-xs text-[#0F0F0F] line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-sm text-[#0F0F0F]">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-zinc-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addItem(product);
                          onClose();
                          openCart();
                        }}
                        className="w-full mt-2 py-1.5 bg-[#0F0F0F] hover:bg-zinc-800 text-white rounded text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag size={12} />
                        Move to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistedProducts.length > 0 && (
              <div className="p-6 border-t border-zinc-200 bg-zinc-50/50">
                <button
                  onClick={() => {
                    wishlistedProducts.forEach((p) => addItem(p));
                    onClose();
                    openCart();
                  }}
                  className="w-full py-3 bg-[#0F0F0F] hover:bg-zinc-800 text-white rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  Move All to Bag
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

