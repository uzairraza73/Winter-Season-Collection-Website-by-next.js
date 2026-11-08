'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useFilterStore } from '@/store';
import { ProductCategory } from '@/types';

interface CategoryTile {
  id: string;
  category: ProductCategory;
  title: string;
  ctaText: string;
  image: string;
  subtitle: string;
  badge?: string;
}

const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'tile-toys',
    category: 'Toys',
    title: 'TOYS',
    ctaText: 'Shop Toys',
    subtitle: 'Interactive wooden & educational toy collection',
    image: '/project-pic/Natural Hamish Monogram Letter Soft Toy Plush Christmas Decoration.webp',
    badge: 'Holiday Gifting',
  },
  {
    id: 'tile-dresses',
    category: 'Dresses',
    title: 'DRESSES',
    ctaText: 'Shop Dresses',
    subtitle: 'Women’s and girls’ luxury party & casual dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    badge: 'Occasion Edit',
  },
  {
    id: 'tile-jackets',
    category: 'Jackets & Coats',
    title: 'JACKETS & COATS',
    ctaText: 'Shop Outerwear',
    subtitle: 'Winter puffers, tailored wool coats, and heavy outerwear',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
    badge: 'Sub-Zero Warmth',
  },
  {
    id: 'tile-homewear',
    category: 'New Homewear Things',
    title: 'NEW HOMEWEAR THINGS',
    ctaText: 'Shop Home',
    subtitle: 'Cozy winter home decor, luxury bedding, and lounge accents',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    badge: 'Cozy Living',
  },
  {
    id: 'tile-character',
    category: 'Character Shops',
    title: 'CHARACTER SHOPS',
    ctaText: 'Shop Character',
    subtitle: 'Branded kids’ apparel, movie & gaming merchandise',
    image: '/project-pic/Character Blue Character Blue Spiderman Puddle Suit.webp',
    badge: 'Disney x Marvel',
  },
  {
    id: 'tile-electric',
    category: 'Electric Things',
    title: 'ELECTRIC THINGS',
    ctaText: 'Shop Electronics',
    subtitle: 'Smart home tech, high-end personal grooming, and winter electronics',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    badge: 'Tech Innovations',
  },
];

export default function CategoryGrid() {
  const { setCategory } = useFilterStore();

  const handleTileClick = (cat: ProductCategory) => {
    setCategory(cat);
    const el = document.getElementById('curated-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Centered with Animation) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 shadow-sm text-xs font-extrabold uppercase tracking-widest text-[#B8860B] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-pulse" />
            <span>SIGNATURE HUBS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0F172A] master-heading"
          >
            EXPLORE BY CATEGORY
          </motion.h2>
        </div>

        {/* Responsive 3x2 Grid (Desktop) and 2x3 Grid (Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORY_TILES.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleTileClick(tile.category)}
              className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-100 border border-slate-200"
            >
              {/* Background Image with continuous zoom scale-110 over 500ms ease-out on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Dark Gradient Overlay: from-black/70 via-black/20 to-transparent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

              {/* Top Tag Badge */}
              {tile.badge && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 shadow-sm border border-white/50">
                    {tile.badge}
                  </span>
                </div>
              )}

              {/* Frosted Glass Text Panel Sliding Up Smoothly on Hover (translate-y-[-8px]) with "Shop Now →" Animated Link Preview */}
              <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5 z-10">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-lg transform transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:bg-white/95">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-sm sm:text-base lg:text-lg tracking-wider uppercase text-slate-900">
                      {tile.title}
                    </h3>
                    <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 transform transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-1 mb-2.5 font-normal">
                    {tile.subtitle}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 uppercase tracking-wider group-hover:text-blue-700 transition-colors">
                    <span>Shop Now</span>
                    <ArrowRight
                      size={13}
                      className="transform transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
