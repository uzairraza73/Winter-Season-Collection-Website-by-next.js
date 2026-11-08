'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import Image from 'next/image';
import { Product, ProductColor, ProductSize } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore } from '@/store';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find((s) => s.available) || product.sizes[0]
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const { addItem } = useCart();
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));

  const displayImage =
    isHovered && selectedColor.images.length > 1
      ? selectedColor.images[1]
      : selectedColor.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedColor, selectedSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with aspect-[3/4] */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badges.map((badge) => {
            let badgeClass = 'bg-slate-900 text-white';
            if (badge === 'Sale' || badge === 'Clearance') {
              badgeClass = 'bg-[#C8102E] text-white';
            } else if (badge === 'Christmas Edit') {
              badgeClass = 'bg-[#B8860B] text-white';
            } else if (badge === 'Best Seller') {
              badgeClass = 'bg-slate-950 text-white';
            } else if (badge === 'New Arrival') {
              badgeClass = 'bg-white text-slate-900 border border-slate-200';
            }

            return (
              <span
                key={badge}
                className={`text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm ${badgeClass}`}
              >
                {badge}
              </span>
            );
          })}
          {discountPercent && (
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C8102E] text-white shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors z-10 text-slate-700"
          title="Save to Wishlist"
        >
          <Heart
            size={16}
            className={isWishlisted ? 'fill-[#C8102E] text-[#C8102E]' : 'hover:text-[#C8102E]'}
          />
        </motion.button>

        {/* Quick View & Quick Add Overlay Bar */}
        <div className="absolute inset-x-2 bottom-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 py-2 px-2 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md hover:bg-white transition-colors"
            >
              <Eye size={13} />
              Quick View
            </button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickAdd}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md transition-all ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white hover:bg-black'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check size={13} />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                Add to Bag
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-600 shrink-0">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-slate-900 ring-offset-1 scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-1 font-medium">+{product.colors.length}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
            <span className="text-sm sm:text-base font-black text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-normal">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Choose Size row for apparel & suits */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0].label !== 'One Size' && (
            <div className="mt-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Choose Size:
                </span>
                <span className="text-[10px] font-extrabold text-[#1A1F71] bg-blue-50 px-1.5 py-0.5 rounded">
                  {selectedSize.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    disabled={!size.available}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                      selectedSize.label === size.label
                        ? 'bg-slate-900 text-white shadow-sm'
                        : size.available
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-50 text-slate-300 line-through cursor-not-allowed'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
