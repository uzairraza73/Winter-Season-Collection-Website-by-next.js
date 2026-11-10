'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCategory } from '@/types';

export interface CategoryTile {
  id: string;
  slug: string;
  category: ProductCategory;
  title: string;
  count: string;
  image: string;
}

export const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'tile-toys',
    slug: 'toys',
    category: 'Toys',
    title: 'Toys & Soft Plush',
    count: '16 items',
    image: '/project-pic/Natural Hamish Monogram Letter Soft Toy Plush Christmas Decoration.webp',
  },
  {
    id: 'tile-character',
    slug: 'character-shops',
    category: 'Character Shops',
    title: 'Character Shops',
    count: '24 items',
    image: '/project-pic/Character Blue Character Blue Spiderman Puddle Suit.webp',
  },
  {
    id: 'tile-dresses',
    slug: 'dresses',
    category: 'Dresses',
    title: 'Party & Casual Dresses',
    count: '21 styles',
    image: '/project-pic/Monsoon Blue Suzy Lace Satin Midi Dress.jpg',
  },
  {
    id: 'tile-jackets',
    slug: 'jackets-coats',
    category: 'Jackets & Coats',
    title: 'Jackets & Outerwear',
    count: '24 styles',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
  },
  {
    id: 'tile-homewear',
    slug: 'homewear',
    category: 'New Homewear Things',
    title: 'New Homewear Things',
    count: '22 styles',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  },
  {
    id: 'tile-electric',
    slug: 'electric-things',
    category: 'Electric Things',
    title: 'Electric & Tech',
    count: '15 styles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  },
  {
    id: 'tile-christmas',
    slug: 'christmas',
    category: 'Christmas',
    title: 'Christmas Edit',
    count: '32 styles',
    image: '/project-pic/Natural Biscuit Soft Toy Plush Christmas Decotation.webp',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-14 sm:py-18 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Clean White / Ella Theme) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-black uppercase tracking-widest text-sky-700 mb-3 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span>SIGNATURE HUBS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900"
          >
            EXPLORE BY CATEGORY
          </motion.h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Click any department to explore its dedicated full product catalog
          </p>
        </div>

        {/* Compact Responsive Grid: 7 Tiles linking to separate dedicated category pages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_TILES.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/category/${tile.slug}`}
                className="group relative block h-44 sm:h-48 md:h-52 rounded-2xl overflow-hidden cursor-pointer bg-white border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent group-hover:via-slate-900/20 transition-colors duration-300" />

                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end">
                  <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight group-hover:text-sky-300 transition-colors drop-shadow-sm">
                    {tile.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">
                      {tile.count}
                    </p>
                    <span className="text-[10px] font-bold uppercase text-sky-400 group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
