'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Truck,
  RotateCcw,
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

  const currentPrice = selectedSize?.price ?? product.price;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <VisaBanner />
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-600 font-medium">{product.category}</span>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[220px] sm:max-w-md">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors shrink-0 text-slate-600 font-medium cursor-pointer"
            title="Share this product"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                      selectedImageIndex === idx
                        ? 'border-slate-900 ring-2 ring-slate-900/20 scale-103'
                        : 'border-slate-200 hover:border-slate-400'
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

            {/* Main Active Image */}
            <div className="relative flex-1 aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {discountPercent && (
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-red-600 text-white shadow-md">
                    SAVE {discountPercent}%
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-slate-900 text-white shadow-md">
                    POPULAR
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white transition-all z-10 shadow-sm cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart
                  size={20}
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-800'}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  ${currentPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 line-through font-semibold">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  In Stock • Ready to Ship
                </span>
              </div>

              {/* Small Description */}
              <div className="mb-6">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Product Overview
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  {product.description ||
                    'Premium quality winter edition crafted with ultra-comfortable materials, designed for style, durability, and daily elegance.'}
                </p>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200"
                      >
                        <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                        <span className="truncate font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Color:
                    </span>
                    <span className="text-xs font-bold text-slate-900">
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
                        className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          selectedColor.name === c.name
                            ? 'border-slate-900 ring-2 ring-slate-900/30 scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <div
                          className="w-full h-full rounded-full border border-slate-300"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Select Size:
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {selectedSize.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.label}
                        disabled={!s.available}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                          selectedSize.label === s.label
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : s.available
                            ? 'bg-white text-slate-800 border-slate-300 hover:border-slate-500'
                            : 'bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Quantity:
                </span>
                <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-extrabold text-slate-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  {isAdded ? 'Added to Bag!' : 'Add to Cart'}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all cursor-pointer"
                >
                  <CreditCard size={18} />
                  Instant Card Checkout
                </motion.button>
              </div>

              {/* Card Payment Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 tracking-wide uppercase">
                      Card Payment Protected Checkout
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Strict encrypted card processing. Fast, verified & 100% secure.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Truck size={14} className="text-slate-700 shrink-0" />
                    <span>Free US Delivery ($150+)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw size={14} className="text-slate-700 shrink-0" />
                    <span>28-Day Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 block mb-1">
                  You May Also Like
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  More From {product.category}
                </h3>
              </div>
              <Link
                href="/"
                className="text-xs font-extrabold text-slate-900 hover:text-sky-600 flex items-center gap-1 uppercase tracking-wider transition-colors"
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

      <Footer />
    </div>
  );
}
