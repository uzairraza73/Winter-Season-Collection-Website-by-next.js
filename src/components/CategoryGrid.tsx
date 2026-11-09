'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useFilterStore } from '@/store';
import { ProductCategory } from '@/types';

interface CategoryTile {
  id: string;
  category: ProductCategory;
  title: string;
  count: string;
  image: string;
}

const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'tile-toys',
    category: 'Toys',
    title: 'Toys & Soft Plush',
    count: '11 items',
    image: '/project-pic/Natural Hamish Monogram Letter Soft Toy Plush Christmas Decoration.webp',
  },
  {
    id: 'tile-character',
    category: 'Character Shops',
    title: 'Character Shops',
    count: '19 items',
    image: '/project-pic/Character Blue Character Blue Spiderman Puddle Suit.webp',
  },
  {
    id: 'tile-dresses',
    category: 'Dresses',
    title: 'Party & Casual Dresses',
    count: '18 styles',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
  },
  {
    id: 'tile-jackets',
    category: 'Jackets & Coats',
    title: 'Jackets & Outerwear',
    count: '24 styles',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
  },
  {
    id: 'tile-homewear',
    category: 'New Homewear Things',
    title: 'New Homewear Things',
    count: '22 styles',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  },
  {
    id: 'tile-electric',
    category: 'Electric Things',
    title: 'Electric & Tech',
    count: '15 styles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  },
  {
    id: 'tile-christmas',
    category: 'Christmas',
    title: 'Christmas Edit',
    count: '32 styles',
    image: '/project-pic/Natural Biscuit Soft Toy Plush Christmas Decotation.webp',
  },
  {
    id: 'tile-clearance',
    category: 'Clearance',
    title: 'Winter Clearance',
    count: 'Up to 50% Off',
    image: '/project-pic/Character Red Disney Cars Lightning McQueen 100% Cotton Sweatshirt.webp',
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
    <section className="py-12 sm:py-16 bg-[#0B0D13] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161B26] border border-amber-500/20 text-[11px] font-extrabold uppercase tracking-widest text-[#FF6A00] mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
            <span>SIGNATURE HUBS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white"
          >
            EXPLORE BY CATEGORY
          </motion.h2>
        </div>

        {/* Compact 4-Column Grid on Desktop, 2-Column on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORY_TILES.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTileClick(tile.category)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTileClick(tile.category);
                }
              }}
              className="group relative h-40 sm:h-44 md:h-48 rounded-2xl overflow-hidden cursor-pointer bg-[#141824] border border-white/5 hover:border-[#FF6A00]/50 shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_28px_rgba(255,106,0,0.25)] transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Dark Gradient Overlay for optimal legibility matching reference */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13]/95 via-[#0B0D13]/40 to-black/20 group-hover:via-[#0B0D13]/25 transition-colors duration-300" />

              {/* Glowing active border ring indicator on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#FF6A00]/60 transition-all duration-300" />

              {/* Text overlay strictly positioned at bottom-left */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10 flex flex-col justify-end">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight group-hover:text-[#FF6A00] transition-colors drop-shadow-md">
                  {tile.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                  {tile.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
