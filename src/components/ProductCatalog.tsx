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
  { label: 'JACKETS & COATS', value: 'Jackets & Coats' },
  { label: 'DRESSES', value: 'Dresses' },
  { label: 'TOYS', value: 'Toys' },
  { label: 'NEW HOMEWEAR', value: 'New Homewear Things' },
  { label: 'CHARACTER SHOPS', value: 'Character Shops' },
  { label: 'ELECTRIC THINGS', value: 'Electric Things' },
  {
    label: 'CHRISTMAS',
    value: 'Christmas',
    icon: <Gift size={13} className="text-[#B8860B] shrink-0" />,
    badgeType: 'gold',
  },
  {
    label: 'CLEARANCE',
    value: 'Clearance',
    icon: <Flame size={13} className="text-[#C8102E] shrink-0" />,
    badgeType: 'crimson',
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
    const counts: Record<string, number> = { All: products.length };
    FILTER_PILLS.forEach((pill) => {
      if (pill.value === 'All') return;
      const activeCat = pill.value.toLowerCase();
      counts[pill.value] = products.filter(
        (p) =>
          p.category.toLowerCase() === activeCat ||
          (p.department && p.department.toLowerCase() === activeCat)
      ).length;
    });
    return counts;
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== 'All') {
      const activeCat = filters.category.toLowerCase();
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === activeCat ||
          (p.department && p.department.toLowerCase() === activeCat)
      );
    }

    // Sort
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
    <section id="curated-products" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#0F172A] border-t border-slate-200 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-blue-100/40 via-amber-100/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            CENTER-ALIGNED MAIN HEADING & BADGES (ATTRACTIVE & ANIMATED)
            ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Shimmering Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-sm text-xs font-extrabold uppercase tracking-widest text-[#B8860B] mb-5"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={14} className="text-[#B8860B]" />
            </motion.span>
            <span>THE CURATED SELECTION</span>
          </motion.div>

          {/* Centered Main Heading with dynamic switch animation */}
          <div className="relative min-h-[4rem] sm:min-h-[5.5rem] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={filters.category}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.97 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)', scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 master-heading leading-tight"
              >
                {filters.category === 'All' ? 'ALL SEASONAL EDITS' : filters.category.toUpperCase()}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================
            SUB HEADING CATEGORIES (ANIMATED, ATTRACTIVE DOCK)
            ======================================================== */}
        <div className="relative mb-12">
          {/* Scroll Navigation Buttons (Desktop) */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-slate-700 hover:text-black hover:scale-110 items-center justify-center transition-all"
            aria-label="Scroll Categories Left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-slate-700 hover:text-black hover:scale-110 items-center justify-center transition-all"
            aria-label="Scroll Categories Right"
          >
            <ChevronRight size={18} />
          </button>

          {/* Gradient Edge Masks for Smooth Overflow Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none md:block hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none md:block hidden" />

          {/* Category Pill Dock Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 sm:px-4 no-scrollbar scroll-smooth"
          >
            {FILTER_PILLS.map((pill) => {
              const isSelected = filters.category === pill.value;
              const count = categoryCounts[pill.value] ?? 0;

              // Color styles
              let activeBadgeColor = 'bg-slate-800 text-white';
              let activePillStyle = 'bg-slate-900 text-white shadow-xl shadow-slate-900/20';

              if (pill.badgeType === 'gold') {
                activeBadgeColor = 'bg-amber-900 text-amber-200';
                activePillStyle = 'bg-gradient-to-r from-[#B8860B] to-amber-700 text-white shadow-xl shadow-amber-900/25 border-amber-500';
              } else if (pill.badgeType === 'crimson') {
                activeBadgeColor = 'bg-rose-900 text-rose-200';
                activePillStyle = 'bg-gradient-to-r from-[#C8102E] to-rose-700 text-white shadow-xl shadow-rose-900/25 border-rose-500';
              }

              return (
                <motion.button
                  key={pill.value}
                  onClick={() => setCategory(pill.value)}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className={`group relative whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 border select-none ${
                    isSelected
                      ? activePillStyle
                      : pill.badgeType === 'gold'
                      ? 'bg-amber-50/80 text-[#B8860B] border-amber-200 hover:bg-amber-100 hover:border-amber-300 shadow-sm'
                      : pill.badgeType === 'crimson'
                      ? 'bg-rose-50/80 text-[#C8102E] border-rose-200 hover:bg-rose-100 hover:border-rose-300 shadow-sm'
                      : 'bg-white/90 backdrop-blur-md text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-white hover:text-slate-950 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Icon if provided */}
                  {pill.icon && <span>{pill.icon}</span>}

                  {/* Label */}
                  <span>{pill.label}</span>

                  {/* Animated Count Badge */}
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full transition-colors ${
                      isSelected
                        ? activeBadgeColor
                        : 'bg-slate-100 group-hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>

                  {/* Smooth Active Indicator Glow */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sort & Quick Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-600 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <span>Currently Viewing:</span>
            <span className="font-extrabold text-slate-900 uppercase">
              {filters.category === 'All' ? 'All Seasonal Categories' : filters.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
              <ArrowUpDown size={13} className="text-slate-500" />
              <span className="text-slate-500">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none text-[#0F172A] font-extrabold cursor-pointer"
              >
                <option value="featured">Featured Edits</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================
            PRODUCT CARDS GRID
            ======================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-1">No products found in this category</h3>
            <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto font-medium">
              We update our inventory daily. Reset the category filter to explore our full winter showcase.
            </p>
            <button
              onClick={() => setCategory('All')}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors shadow-sm"
            >
              Reset to All Products
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
