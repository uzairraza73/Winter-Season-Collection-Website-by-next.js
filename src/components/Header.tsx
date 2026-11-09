'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  CreditCard,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore } from '@/store';
import { products } from '@/data/products';
import AccountPopover from '@/components/AccountPopover';
import WishlistDrawer from '@/components/WishlistDrawer';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'TOYS & PLUSH', href: '/category/toys' },
  { name: 'CHARACTER SHOPS', href: '/category/character-shops' },
  { name: 'JACKETS & COATS', href: '/category/jackets-coats' },
  { name: 'DRESSES', href: '/category/dresses' },
  { name: 'HOMEWEAR', href: '/category/homewear' },
  { name: 'ELECTRIC', href: '/category/electric-things' },
  { name: 'CHRISTMAS', href: '/category/christmas', color: 'gold' },
];

export default function Header() {
  const { itemCount, openCart, openCheckout } = useCart();
  const wishlistCount = useWishlistStore((state) => state.count());

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-300 shadow-xs">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-sm relative" ref={searchContainerRef}>
              <div
                className={`relative flex items-center w-full rounded-full bg-slate-100 border transition-all duration-200 ${
                  isSearchFocused
                    ? 'border-slate-900 bg-white shadow-md ring-2 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search winter coats, backpacks, toys..."
                  className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-transparent rounded-full focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                />
                <button
                  type="button"
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 right-0 top-full mt-2.5 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 overflow-hidden"
                  >
                    {searchQuery.trim() === '' ? (
                      <div>
                        <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2.5">
                          Trending Searches
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {['Backpack', 'PAW Patrol', 'Minecraft', 'Toys', 'Bomber Jacket', 'Highland Cow'].map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-medium cursor-pointer"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1.5">
                          <Sparkles size={12} className="text-sky-600" />
                          Card payment protected checkout active
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                          Matching Products ({searchResults.length})
                        </div>
                        {searchResults.length === 0 ? (
                          <p className="text-xs text-slate-500 py-2">
                            No products matching &quot;{searchQuery}&quot;. Try &quot;Backpack&quot; or &quot;Hoodie&quot;.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {searchResults.map((product) => (
                              <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                onClick={() => setIsSearchFocused(false)}
                                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                              >
                                <div className="relative w-10 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                  <Image
                                    src={product.colors[0]?.images[0] || '/project-pic/default.webp'}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
                                  <p className="text-[11px] text-slate-900 font-extrabold">${product.price}</p>
                                </div>
                                <ChevronRight size={14} className="text-slate-400" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block group" aria-label="WinterStore Homepage">
                <span className="next-logo text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-[0.24em] transition-transform duration-200 group-hover:scale-102">
                  NEXT
                </span>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-end">
              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart size={20} className={wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>

              {/* Account */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  className="p-2.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Account"
                >
                  <User size={20} />
                </motion.button>
                <AccountPopover isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
              </div>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                onClick={openCart}
                className="relative p-2.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Shopping Bag"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </motion.button>

              {/* Checkout CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={openCheckout}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs lg:text-sm font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-slate-800 transition-all cursor-pointer"
              >
                <CreditCard size={15} />
                CHECKOUT
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-2 text-slate-700 hover:text-slate-950 sm:hidden cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="hidden sm:block border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center space-x-6 lg:space-x-8 py-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 ${
                    link.color === 'gold'
                      ? 'text-amber-700 hover:text-amber-600'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-bold uppercase text-slate-800 hover:text-sky-600"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
