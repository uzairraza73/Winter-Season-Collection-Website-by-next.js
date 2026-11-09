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
    <section id="curated-products" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2"
          >
            FEATURED COLLECTION
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight"
          >
            THIS SEASON&apos;S{' '}
            <span className="text-slate-500 font-extrabold">
              FINEST
            </span>
          </motion.h2>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <motion.button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold uppercase text-xs tracking-widest rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              <ChevronDown size={16} className="text-slate-600" />
              View More
              <span className="text-sky-600 font-black">({tabProducts.length - visibleCount} more)</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
