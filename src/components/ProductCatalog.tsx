'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles, Star, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { products } from '@/data/products';
import { Product } from '@/types';

type TabKey = 'trending' | 'new-arrivals' | 'best-sellers';

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { key: 'trending', label: 'Trending', icon: <TrendingUp size={15} /> },
  { key: 'new-arrivals', label: 'New Arrivals', icon: <Sparkles size={15} /> },
  { key: 'best-sellers', label: 'Best Sellers', icon: <Star size={15} /> },
];

const PAGE_SIZE = 16;

function getTabProducts(tab: TabKey): Product[] {
  let sorted: Product[] = [];

  if (tab === 'trending') {
    sorted = [...products].sort((a, b) => b.rating - a.rating);
  } else if (tab === 'new-arrivals') {
    const newArrivals = products.filter((p) => p.badges.includes('New Arrival'));
    const rest = products.filter((p) => !p.badges.includes('New Arrival'));
    sorted = [...newArrivals, ...rest];
  } else {
    const bestsellers = products.filter((p) => p.isBestseller);
    const rest = products.filter((p) => !p.isBestseller);
    sorted = [...bestsellers, ...rest];
  }

  return sorted;
}

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<TabKey>('trending');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const tabProducts = useMemo(() => getTabProducts(activeTab), [activeTab]);
  const visibleProducts = tabProducts.slice(0, visibleCount);
  const hasMore = visibleCount < tabProducts.length;

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="curated-products" className="py-16 sm:py-24 bg-[#0B0D13] text-white border-t border-white/5 relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Heading ── */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-extrabold uppercase tracking-widest text-[#FF6A00] mb-3"
          >
            FEATURED COLLECTION
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight"
          >
            THIS SEASON&apos;S{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-purple-400">
              FINEST
            </span>
          </motion.h2>
        </div>

        {/* ── Tab Pills ── */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <motion.button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer select-none border ${
                  isActive
                    ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-[0_4px_20px_rgba(255,106,0,0.45)]'
                    : 'bg-[#141824] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{tab.icon}</span>
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* ── Product Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5"
          >
            {visibleProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── View More Button ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mt-10"
          >
            <motion.button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 bg-[#141824] hover:bg-[#1B2133] border border-white/10 hover:border-[#FF6A00]/40 text-white font-bold uppercase text-sm tracking-widest rounded-2xl transition-all duration-300 cursor-pointer shadow-lg"
            >
              <ChevronDown size={16} className="text-[#FF6A00]" />
              View More
              <span className="text-[#FF6A00] font-black text-xs">({tabProducts.length - visibleCount} more)</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
