'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpDown,
  Sparkles,
  RefreshCw,
  Gift,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { products } from '@/data/products';
import { Product, ProductCategory } from '@/types';
import { useFilterStore } from '@/store';

interface FilterPill {
  label: string;
  value: ProductCategory;
  icon?: React.ReactNode;
  badgeType?: 'gold' | 'crimson' | 'default';
}

const FILTER_PILLS: FilterPill[] = [
  { label: 'ALL PRODUCTS', value: 'All' },
  { label: 'TOYS', value: 'Toys' },
  { label: 'CHARACTER SHOPS', value: 'Character Shops' },
  { label: 'JACKETS & COATS', value: 'Jackets & Coats' },
  { label: 'DRESSES', value: 'Dresses' },
  { label: 'NEW HOMEWEAR', value: 'New Homewear Things' },
  { label: 'ELECTRIC THINGS', value: 'Electric Things' },
  {
    label: 'CHRISTMAS',
    value: 'Christmas',
    icon: <Gift size={13} className="text-amber-400 shrink-0" />,
    badgeType: 'gold',
  },
  { label: 'WOMEN', value: 'Women' },
  { label: 'MEN', value: 'Men' },
  { label: 'GIRLS', value: 'Girls' },
  { label: 'BOYS', value: 'Boys' },
  { label: 'BABY', value: 'Baby' },
];

export default function ProductCatalog() {
  const { filters, setCategory, setSortBy } = useFilterStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic count calculation per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: products.length,
    };

    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
      if (product.department) {
        counts[product.department] = (counts[product.department] || 0) + 1;
      }
      if (product.badges.includes('Christmas Edit')) {
        counts['Christmas'] = (counts['Christmas'] || 0) + 1;
      }
    });

    return counts;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter((product) => {
        if (filters.category === 'Christmas') {
          return product.badges.includes('Christmas Edit') || product.name.toLowerCase().includes('christmas');
        }
        return (
          product.category === filters.category ||
          (product.department as string) === (filters.category as string)
        );
      });
    }

    // Sort order
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters.category, filters.sortBy]);

  // Scroll controls for category dock
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="curated-products" className="py-16 sm:py-24 bg-[#0B0D13] text-white border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            CENTER-ALIGNED MAIN HEADING & BADGES
            ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Shimmering Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141824] border border-[#FF6A00]/25 shadow-sm text-xs font-extrabold uppercase tracking-widest text-[#FF6A00] mb-4"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={14} className="text-[#FF6A00]" />
            </motion.span>
            <span>THE CURATED SELECTION</span>
          </motion.div>

          {/* Centered Main Heading with dynamic switch animation */}
          <div className="relative min-h-[3.5rem] sm:min-h-[4.5rem] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={filters.category}
                initial={{ opacity: 0, y: 15, filter: 'blur(6px)', scale: 0.97 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -15, filter: 'blur(6px)', scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight"
              >
                {filters.category === 'All' ? 'ALL SEASONAL EDITS' : filters.category.toUpperCase()}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================
            SUB HEADING CATEGORIES (ANIMATED DOCK)
            ======================================================== */}
        <div className="relative mb-10">
          {/* Scroll Navigation Buttons (Desktop) */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#141824] border border-white/10 shadow-lg text-slate-300 hover:text-white hover:scale-110 items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll Categories Left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#141824] border border-white/10 shadow-lg text-slate-300 hover:text-white hover:scale-110 items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll Categories Right"
          >
            <ChevronRight size={18} />
          </button>

          {/* Category Flex Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
          >
            {FILTER_PILLS.map((pill) => {
              const isSelected = filters.category === pill.value;
              const count = categoryCounts[pill.value] || 0;

              return (
                <motion.button
                  key={pill.value}
                  onClick={() => setCategory(pill.value)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className={`group relative whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 border select-none cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-[0_4px_16px_rgba(255,106,0,0.4)]'
                      : 'bg-[#141824] text-slate-300 border-white/10 hover:border-white/25 hover:text-white hover:bg-[#1B2133]'
                  }`}
                >
                  {pill.icon && <span>{pill.icon}</span>}
                  <span>{pill.label}</span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full transition-colors ${
                      isSelected
                        ? 'bg-black/30 text-white'
                        : 'bg-white/10 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sort & Status Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#141824] p-3.5 sm:p-4 rounded-2xl border border-white/5">
          <div className="text-xs text-slate-400 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Currently Viewing:</span>
            <span className="font-extrabold text-white uppercase">
              {filters.category === 'All' ? 'All Seasonal Categories' : filters.category}
            </span>
            <span className="text-slate-500">• {filteredProducts.length} items</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#0F121C] px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold">
              <ArrowUpDown size={13} className="text-[#FF6A00]" />
              <span className="text-slate-400">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none text-white font-extrabold cursor-pointer"
              >
                <option value="featured" className="bg-[#141824] text-white">Featured Edits</option>
                <option value="price-asc" className="bg-[#141824] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#141824] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#141824] text-white">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================
            PRODUCT CARDS GRID
            ======================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#141824] rounded-2xl p-12 text-center border border-white/5 my-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-lg font-extrabold text-white mb-1">No products found in this category</h3>
            <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto font-medium">
              We update our inventory daily. Reset the category filter to explore our full winter showcase.
            </p>
            <button
              onClick={() => setCategory('All')}
              className="px-6 py-2.5 bg-[#FF6A00] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#FF7A1A] transition-colors shadow-lg cursor-pointer"
            >
              Reset to All Products
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
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
