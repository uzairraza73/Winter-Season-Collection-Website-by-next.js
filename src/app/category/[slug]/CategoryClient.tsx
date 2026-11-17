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
  slug,
  categoryTitle,
  categoryDescription,
  bannerImage,
  products: initialProducts,
}: CategoryClientProps) {
  const [activeSub, setActiveSub] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Dynamic sub-category pills tailored to the current category/button
  const subCategoryTabs = useMemo(() => {
    if (slug === 'winter-collection') {
      return [
        { label: 'All Winter Items', value: 'ALL' },
        { label: "Women's Session", value: 'WOMEN' },
        { label: "Men's Session", value: 'MEN' },
        { label: "Kids' Session", value: 'KIDS' },
        { label: "Boys' Session", value: 'BOYS' },
        { label: "Girls' Session", value: 'GIRLS' },
        { label: 'Jackets & Outerwear', value: 'JACKETS' },
        { label: 'Knitwear & Jumpers', value: 'KNITWEAR' },
        { label: 'Cozy Homewear & Tech', value: 'HOME' },
      ];
    }
    if (slug === 'christmas') {
      return [
        { label: 'All Christmas Edits', value: 'ALL' },
        { label: 'Kids & Baby Holiday', value: 'KIDS' },
        { label: 'Festive Knitted Jumpers', value: 'JUMPERS' },
        { label: 'Holiday Dresses & Party', value: 'DRESSES' },
        { label: 'Holiday Bedding & Throws', value: 'BEDDING' },
        { label: 'Plush & Ornaments', value: 'PLUSH' },
        { label: 'Mugs, Decor & Lights', value: 'MUGS' },
      ];
    }
    if (slug === 'kids') {
      return [
        { label: 'All Kids Items', value: 'ALL' },
        { label: 'Baby & Toddlers (0-2y)', value: 'BABY' },
        { label: "Boys' Clothing", value: 'BOYS' },
        { label: "Girls' Outfits & Dresses", value: 'GIRLS' },
        { label: 'Sweatshirts & Jumpers', value: 'SWEATS' },
        { label: 'Character Shops', value: 'CHARACTER' },
        { label: 'Toys & Backpacks', value: 'TOYS' },
      ];
    }
    if (slug === 'boys') {
      return [
        { label: 'All Boys Items', value: 'ALL' },
        { label: 'Co-ord & Jogger Sets', value: 'SETS' },
        { label: 'Crew Neck Jumpers', value: 'JUMPERS' },
        { label: 'Sweatshirts & Hoodies', value: 'HOODIES' },
        { label: 'Character & Gaming', value: 'CHARACTER' },
        { label: 'Winter Jackets', value: 'JACKETS' },
      ];
    }
    if (slug === 'girls') {
      return [
        { label: 'All Girls Items', value: 'ALL' },
        { label: 'Holiday & Party Dresses', value: 'DRESSES' },
        { label: 'Sweatshirt & Leggings Sets', value: 'SETS' },
        { label: 'Sequin Tops & Tees', value: 'TOPS' },
        { label: 'Knitwear & Jumpers', value: 'KNITWEAR' },
        { label: 'Character Bags & Bluey', value: 'CHARACTER' },
      ];
    }
    if (slug === 'women') {
      return [
        { label: 'All Women Items', value: 'ALL' },
        { label: 'Party & Velvet Dresses', value: 'DRESSES' },
        { label: 'Knitted Midi & Maxi Gowns', value: 'KNIT_DRESSES' },
        { label: 'Tailored Wool Overcoats', value: 'COATS' },
      ];
    }
    if (slug === 'men') {
      return [
        { label: 'All Men Items', value: 'ALL' },
        { label: 'Tailored Overcoats', value: 'OVERCOATS' },
        { label: 'Heavy Winter Parkas', value: 'PARKAS' },
        { label: 'Casual Jackets & Bombers', value: 'BOMBERS' },
      ];
    }
    // Generic fallback for other categories
    return [
      { label: 'All Items', value: 'ALL' },
      { label: 'Featured', value: 'FEATURED' },
      { label: 'Best Sellers', value: 'BESTSELLER' },
    ];
  }, [slug]);

  // Filtering based on active subcategory
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];
    if (activeSub === 'ALL') return list;

    // Winter Collection sub-categories
    if (slug === 'winter-collection') {
      if (activeSub === 'WOMEN') return list.filter((p) => p.department === 'WOMEN');
      if (activeSub === 'MEN') return list.filter((p) => p.department === 'MEN');
      if (activeSub === 'KIDS') return list.filter((p) => p.department === 'GIRLS' || p.department === 'BOYS' || p.department === 'BABY' || p.badges.includes('Kids Session'));
      if (activeSub === 'BOYS') return list.filter((p) => p.department === 'BOYS');
      if (activeSub === 'GIRLS') return list.filter((p) => p.department === 'GIRLS' || p.category === 'Dresses');
      if (activeSub === 'JACKETS') return list.filter((p) => p.category === 'Jackets & Coats' || p.name.toLowerCase().includes('coat') || p.name.toLowerCase().includes('jacket'));
      if (activeSub === 'KNITWEAR') return list.filter((p) => p.name.toLowerCase().includes('jumper') || p.name.toLowerCase().includes('knit') || p.name.toLowerCase().includes('sweat'));
      if (activeSub === 'HOME') return list.filter((p) => p.department === 'HOME' || p.category === 'New Homewear Things' || p.category === 'Electric Things');
    }

    // Christmas sub-categories
    if (slug === 'christmas') {
      if (activeSub === 'KIDS') return list.filter((p) => p.department === 'GIRLS' || p.department === 'BOYS' || p.department === 'BABY' || p.badges.includes('Kids Session'));
      if (activeSub === 'JUMPERS') return list.filter((p) => p.name.toLowerCase().includes('jumper') || p.name.toLowerCase().includes('sweat'));
      if (activeSub === 'DRESSES') return list.filter((p) => p.name.toLowerCase().includes('dress'));
      if (activeSub === 'BEDDING') return list.filter((p) => p.name.toLowerCase().includes('bed') || p.name.toLowerCase().includes('duvet') || p.name.toLowerCase().includes('cushion'));
      if (activeSub === 'PLUSH') return list.filter((p) => p.name.toLowerCase().includes('plush') || p.name.toLowerCase().includes('ornament') || p.category === 'Toys');
      if (activeSub === 'MUGS') return list.filter((p) => p.name.toLowerCase().includes('mug') || p.name.toLowerCase().includes('light') || p.name.toLowerCase().includes('lamp') || p.name.toLowerCase().includes('tree'));
    }

    // Kids sub-categories
    if (slug === 'kids') {
      if (activeSub === 'BABY') return list.filter((p) => p.department === 'BABY' || p.name.toLowerCase().includes('baby') || p.name.toLowerCase().includes('0mths'));
      if (activeSub === 'BOYS') return list.filter((p) => p.department === 'BOYS');
      if (activeSub === 'GIRLS') return list.filter((p) => p.department === 'GIRLS' || p.name.toLowerCase().includes('dress'));
      if (activeSub === 'SWEATS') return list.filter((p) => p.name.toLowerCase().includes('sweat') || p.name.toLowerCase().includes('jumper') || p.name.toLowerCase().includes('hoodie'));
      if (activeSub === 'CHARACTER') return list.filter((p) => p.category === 'Character Shops' || p.name.toLowerCase().includes('character') || p.name.toLowerCase().includes('paw patrol') || p.name.toLowerCase().includes('disney') || p.name.toLowerCase().includes('lego') || p.name.toLowerCase().includes('spidey'));
      if (activeSub === 'TOYS') return list.filter((p) => p.category === 'Toys' || p.name.toLowerCase().includes('backpack') || p.name.toLowerCase().includes('toy'));
    }

    // Boys sub-categories
    if (slug === 'boys') {
      if (activeSub === 'SETS') return list.filter((p) => p.name.toLowerCase().includes('set') || p.name.toLowerCase().includes('jogger'));
      if (activeSub === 'JUMPERS') return list.filter((p) => p.name.toLowerCase().includes('jumper'));
      if (activeSub === 'HOODIES') return list.filter((p) => p.name.toLowerCase().includes('hoodie') || p.name.toLowerCase().includes('sweat'));
      if (activeSub === 'CHARACTER') return list.filter((p) => p.category === 'Character Shops' || p.name.toLowerCase().includes('star wars') || p.name.toLowerCase().includes('minecraft') || p.name.toLowerCase().includes('ninjago') || p.name.toLowerCase().includes('spidey') || p.name.toLowerCase().includes('pokemon'));
      if (activeSub === 'JACKETS') return list.filter((p) => p.category === 'Jackets & Coats' || p.name.toLowerCase().includes('jacket'));
    }

    // Girls sub-categories
    if (slug === 'girls') {
      if (activeSub === 'DRESSES') return list.filter((p) => p.name.toLowerCase().includes('dress'));
      if (activeSub === 'SETS') return list.filter((p) => p.name.toLowerCase().includes('set') || p.name.toLowerCase().includes('legging') || p.name.toLowerCase().includes('trousers'));
      if (activeSub === 'TOPS') return list.filter((p) => p.name.toLowerCase().includes('top') || p.name.toLowerCase().includes('t-shirt') || p.name.toLowerCase().includes('sequin'));
      if (activeSub === 'KNITWEAR') return list.filter((p) => p.name.toLowerCase().includes('jumper') || p.name.toLowerCase().includes('fleece'));
      if (activeSub === 'CHARACTER') return list.filter((p) => p.name.toLowerCase().includes('bluey') || p.name.toLowerCase().includes('disney') || p.category === 'Character Shops');
    }

    // Women sub-categories
    if (slug === 'women') {
      if (activeSub === 'DRESSES') return list.filter((p) => p.name.toLowerCase().includes('dress') && (p.name.toLowerCase().includes('velvet') || p.name.toLowerCase().includes('party') || p.name.toLowerCase().includes('mini')));
      if (activeSub === 'KNIT_DRESSES') return list.filter((p) => p.name.toLowerCase().includes('midi') || p.name.toLowerCase().includes('maxi') || p.name.toLowerCase().includes('knitted'));
      if (activeSub === 'COATS') return list.filter((p) => p.category === 'Jackets & Coats' || p.name.toLowerCase().includes('coat') || p.name.toLowerCase().includes('jacket'));
    }

    // Men sub-categories
    if (slug === 'men') {
      if (activeSub === 'OVERCOATS') return list.filter((p) => p.name.toLowerCase().includes('overcoat') || p.name.toLowerCase().includes('wool'));
      if (activeSub === 'PARKAS') return list.filter((p) => p.name.toLowerCase().includes('parka') || p.name.toLowerCase().includes('down'));
      if (activeSub === 'BOMBERS') return list.filter((p) => p.name.toLowerCase().includes('bomber') || p.name.toLowerCase().includes('jacket'));
    }

    if (activeSub === 'BESTSELLER') return list.filter((p) => p.isBestseller);
    if (activeSub === 'FEATURED') return list.slice(0, 16);

    return list;
  }, [initialProducts, activeSub, slug]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filteredProducts, sortBy]);

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

      {/* Sub-Category Filter Pills */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {subCategoryTabs.map((tab) => {
              const isActive = activeSub === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveSub(tab.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter and Count Bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-600">
          <div>
            Showing <strong className="text-slate-900">{sortedProducts.length}</strong> items in this category • Ready for US Dispatch
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
            <p className="text-base font-bold text-slate-700">No items available in this category view currently.</p>
            <button
              onClick={() => setActiveSub('ALL')}
              className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-sky-600 transition-colors cursor-pointer"
            >
              View All Items
            </button>
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
