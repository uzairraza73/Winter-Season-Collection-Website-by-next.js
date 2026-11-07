'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, Check, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import Image from 'next/image';
import { Product, ProductColor, ProductSize } from '@/types';
import { useCart } from '@/hooks/useCart';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem, openCheckout } = useCart();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product ? product.sizes.find((s) => s.available) || product.sizes[0] : null
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes.find((s) => s.available) || product.sizes[0]);
      setActiveImageIdx(0);
      setIsAdded(false);
    }
  }, [product]);

  if (!product || !selectedColor) return null;

  const currentImages = selectedColor.images;

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-50 max-h-[90vh] flex flex-col md:flex-row text-[#0F0F0F]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-black shadow transition-colors"
          >
            <X size={18} />
          </button>

          {/* Left: Image Carousel */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto bg-zinc-100 flex items-center justify-center">
            <Image
              src={currentImages[activeImageIdx] || currentImages[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {currentImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-800 shadow transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-800 shadow transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* Right: Product Details & Size selection */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-xs text-zinc-600">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#0F0F0F] tracking-tight mb-3">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-black text-[#0F0F0F]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  In Stock • US Standard
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-zinc-700">Color:</span>
                  <span className="text-zinc-900 font-bold">{selectedColor.name}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        setActiveImageIdx(0);
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-zinc-900 ring-2 ring-zinc-900/30 scale-110'
                          : 'border-zinc-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-zinc-700">Select US Size:</span>
                  <a href="#sizing" className="text-zinc-500 hover:text-black underline text-[11px]">
                    Size Guide
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      disabled={!size.available}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedSize?.label === size.label
                          ? 'bg-[#0F0F0F] text-white shadow'
                          : size.available
                          ? 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                          : 'bg-zinc-100 text-zinc-300 line-through cursor-not-allowed'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={!selectedSize?.available}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0F0F0F] hover:bg-zinc-800 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      Added to Bag!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add to Shopping Bag
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (selectedSize) {
                      addItem(product, selectedColor, selectedSize);
                    }
                    onClose();
                    openCheckout();
                  }}
                  className="px-4 py-3 bg-[#4A4A4A] hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  title="Buy Now with Visa"
                >
                  Buy with VISA
                </button>
              </div>

              {/* Shipping info */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Truck size={13} className="text-[#B8860B]" />
                  Free delivery over $150
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  VISA Verified Protection
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
