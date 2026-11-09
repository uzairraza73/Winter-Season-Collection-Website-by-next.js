'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  Heart,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VisaBanner from '@/components/VisaBanner';
import ProductCard from '@/components/ProductCard';
import { Product, ProductColor, ProductSize } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore } from '@/store';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find((s) => s.available) || product.sizes[0]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addItem, openCart, openCheckout } = useCart();
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));

  // Determine current image list from selected color
  const allImages = selectedColor.images.length > 0 ? selectedColor.images : ['/project-pic/default.webp'];
  const activeImage = allImages[selectedImageIndex] || allImages[0];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedSize);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, selectedColor, selectedSize);
    openCheckout();
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#0B0D13] text-slate-100 flex flex-col">
      {/* Top Banner */}
      <VisaBanner />

      {/* Main Header */}
      <Header />

      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-white/10 bg-[#0F121C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-slate-400">{product.category}</span>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-slate-200 font-bold truncate max-w-[220px] sm:max-w-md">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0 text-slate-300"
            title="Share this product"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#141824] ${
                      selectedImageIndex === idx
                        ? 'border-[#FF6A00] ring-2 ring-[#FF6A00]/40 scale-105'
                        : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumb ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Active Image with Zoom effect */}
            <div className="relative flex-1 aspect-[4/5] bg-[#141824] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Discount / Sale Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {discountPercent && (
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-[#DC2626] text-white shadow-lg">
                    SAVE {discountPercent}%
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-amber-500 text-black shadow-lg">
                    POPULAR
                  </span>
                )}
              </div>

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:bg-black/90 transition-all z-10"
                aria-label="Wishlist"
              >
                <Heart
                  size={20}
                  className={isWishlisted ? 'fill-[#FF4500] text-[#FF4500]' : 'text-white'}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#1B2133] text-amber-400 border border-amber-500/20">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {product.brand}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-[#141824] border border-white/5">
                <span className="text-3xl sm:text-4xl font-black text-[#FF6A00] tracking-tight">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-500 line-through font-semibold">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  In Stock • Ready to Dispatch
                </span>
              </div>

              {/* Small Description */}
              <div className="mb-6">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Product Overview
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-[#141824]/50 p-4 rounded-2xl border border-white/5">
                  {product.description ||
                    'Premium quality Winter 2026 edition crafted with ultra-comfortable materials, designed for style, durability, and daily elegance.'}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-300 bg-[#141824] px-3 py-2 rounded-xl border border-white/5"
                      >
                        <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection (if multiple) */}
              {product.colors.length > 1 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Color:
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {selectedColor.name}
                    </span>
                  </div>
                  <div className="flex gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColor(c);
                          setSelectedImageIndex(0);
                        }}
                        className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor.name === c.name
                            ? 'border-[#FF6A00] ring-2 ring-[#FF6A00]/40 scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <div
                          className="w-full h-full rounded-full border border-white/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector (If given) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Select Size:
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      {selectedSize.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.label}
                        disabled={!s.available}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                          selectedSize.label === s.label
                            ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-[0_4px_16px_rgba(255,106,0,0.4)]'
                            : s.available
                            ? 'bg-[#141824] text-slate-200 border-white/10 hover:border-white/30 hover:bg-[#1B2133]'
                            : 'bg-[#0F121C] text-slate-600 border-white/5 line-through cursor-not-allowed'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Quantity:
                </span>
                <div className="flex items-center bg-[#141824] border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-extrabold text-white text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS (Add to Cart + Strict Card / Buy Now) */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-[#FF6A00] text-white hover:bg-[#FF7A1A] shadow-[0_8px_24px_rgba(255,106,0,0.4)] transition-all cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  {isAdded ? 'Added to Bag!' : 'Add to Cart'}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:from-blue-600 hover:to-indigo-600 shadow-[0_8px_24px_rgba(26,31,113,0.5)] border border-blue-400/20 transition-all cursor-pointer"
                >
                  <CreditCard size={18} />
                  Instant Card Checkout
                </motion.button>
              </div>

              {/* STRICT CARD PAYMENT ONLY GUARANTEE BOX */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121828] to-[#0E1320] border border-blue-500/20 shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white tracking-wide uppercase">
                      Card Payment Protected Checkout
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Strict encrypted card processing. Fast, verified & 100% secure.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Truck size={14} className="text-amber-400 shrink-0" />
                    <span>Free US FedEx Delivery ($150+)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw size={14} className="text-amber-400 shrink-0" />
                    <span>28-Day Hassle-Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6A00] block mb-1">
                  You May Also Like
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  More From {product.category}
                </h3>
              </div>
              <Link
                href="/#catalog"
                className="text-xs font-extrabold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                View Full Catalog <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

