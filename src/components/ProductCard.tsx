'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const primaryImage = product.colors[0]?.images[0] || '/project-pic/Natural Hamish Monogram Letter Soft Toy Plush Christmas Decoration.webp';
  const secondaryImage = product.colors[0]?.images[1] || primaryImage;

  const displayImage = isHovered && secondaryImage ? secondaryImage : primaryImage;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0] || { name: 'Standard', hex: '#000000', images: [displayImage] };
    const defaultSize = product.sizes?.find((s) => s.available) || product.sizes?.[0] || { label: 'Standard', available: true };
    addItem(product, defaultColor, defaultSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      prefetch={true}
      className="group block"
    >
      <div
        className="relative flex flex-col bg-[#14141E] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF6A00]/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-300 transform-gpu hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Box */}
        <div className="relative aspect-[4/5] w-full bg-[#1A1A28] overflow-hidden">
          <Image
            src={imgError ? '/project-pic/Natural Hamish Monogram Letter Soft Toy Plush Christmas Decoration.webp' : displayImage}
            alt={product.name}
            fill
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {discountPercent ? (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#FF4500] text-white shadow-md">
                SALE
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/90 text-white shadow-md">
                NEW
              </span>
            )}
          </div>

          {discountPercent && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider bg-[#DC2626] text-white shadow-md">
                -{discountPercent}%
              </span>
            </div>
          )}

          {/* Bottom subtle gradient on image */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#14141E] to-transparent pointer-events-none" />
        </div>

        {/* Content Box (Dark sleek theme matching screenshot: Category/Tag, Name, Price + Cart Button) */}
        <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-[#14141E]">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {product.category || 'Collection'}
            </span>

            {/* Item Name */}
            <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-[#FF6A00] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-2">
            <div className="flex items-baseline gap-1.5 truncate">
              <span className="text-base sm:text-lg font-black text-[#FF6A00] tracking-tight">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-medium">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Quick Add Button / Floating Orange Cart Circle like mockup */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleQuickAdd}
              aria-label="Add to cart"
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all ${
                isAddedRecently
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#FF6A00] text-white hover:bg-[#FF7A1A] hover:shadow-[0_0_12px_rgba(255,106,0,0.6)]'
              }`}
            >
              <ShoppingCart size={15} />
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
}
