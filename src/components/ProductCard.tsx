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

  const primaryImage = product.colors[0]?.images[0] || '/project-pic/default.webp';
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
        className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Box */}
        <div className="relative aspect-[4/5] w-full bg-slate-50 overflow-hidden">
          <Image
            src={imgError ? '/project-pic/default.webp' : displayImage}
            alt={product.name}
            fill
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-600 ease-out group-hover:scale-106"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {discountPercent ? (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                SALE
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
                NEW
              </span>
            )}
          </div>

          {discountPercent && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider bg-red-600 text-white shadow-xs">
                -{discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {product.category || 'Winter Collection'}
            </span>

            {/* Item Name */}
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-sky-600 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5 truncate">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleQuickAdd}
              aria-label="Add to cart"
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 text-white hover:bg-sky-600 shadow-sm'
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
