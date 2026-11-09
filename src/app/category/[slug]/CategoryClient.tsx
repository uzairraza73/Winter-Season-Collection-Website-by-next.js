'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VisaBanner from '@/components/VisaBanner';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface CategoryClientProps {
  slug: string;
  categoryTitle: string;
  categoryDescription: string;
  bannerImage: string;
  products: Product[];
}

export default function CategoryClient({
  categoryTitle,
  categoryDescription,
  bannerImage,
  products: initialProducts,
}: CategoryClientProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [initialProducts, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 flex flex-col">
      <VisaBanner />
      <Header />

      {/* Category Hero Banner */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage}
            alt={categoryTitle}
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors mb-4"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-black uppercase tracking-widest text-sky-300 mb-3">
              <Sparkles size={12} /> Curated Winter Department
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {categoryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Count Bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div>
            Showing <strong className="text-slate-900">{sortedProducts.length}</strong> items • Ready for US Dispatch
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-slate-500" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="featured">Featured Items</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 max-w-xl mx-auto">
            <p className="text-base font-bold text-slate-700">No items available in this category currently.</p>
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-sky-600 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
