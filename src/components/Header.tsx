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
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore, useFilterStore } from '@/store';
import { products } from '@/data/products';
import { ProductCategory } from '@/types';
import AccountPopover from '@/components/AccountPopover';
import WishlistDrawer from '@/components/WishlistDrawer';

const CATEGORIES = [
  { name: 'GIRLS', filter: 'Girls', color: 'default' },
  { name: 'BOYS', filter: 'Boys', color: 'default' },
  { name: 'BABY', filter: 'Baby', color: 'default' },
  { name: 'WOMEN', filter: 'Women', color: 'default' },
  { name: 'MEN', filter: 'Men', color: 'default' },
  { name: 'HOME', filter: 'Home', color: 'default' },
  { name: 'BRANDS', filter: 'Brands', color: 'default' },
  { name: 'CHRISTMAS', filter: 'Christmas', color: 'gold' },
  { name: 'CLEARANCE', filter: 'Clearance', color: 'crimson' },
] as const;

const MEGA_MENU_PREVIEWS: Record<string, { title: string; links: string[]; image: string; tag: string }> = {
  GIRLS: {
    title: 'Girls Autumn/Winter 26',
    links: ['Partywear & Dresses', 'Warm Puffer Coats', 'Knitwear & Cardigans', 'Disney & Character Outfits', 'Boots & Slippers'],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    tag: 'Girls Holiday Edit',
  },
  BOYS: {
    title: 'Boys Seasonal Wardrobe',
    links: ['Heavy Parkas & Jackets', 'Marvel Sweatshirts & Joggers', 'Smart Holiday Shirts', 'Denim & Chinos', 'Winter Footwear'],
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80',
    tag: 'Boys Winter Ready',
  },
  BABY: {
    title: 'Baby Essentials & Gifting',
    links: ['Padded Pramsuits & Snowsuits', '100% Organic Sleepsuits', 'Holiday Knitted Outfits', 'Heirloom Soft Toys', 'First Shoes'],
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
    tag: 'Newborn to 24M',
  },
  WOMEN: {
    title: 'Women’s Signature Edit',
    links: ['Tailored Italian Wool Coats', 'Velvet & Sequin Party Dresses', 'Cashmere Knitwear', 'Winter Boots & Bags', 'Lounge & Sleepwear'],
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80',
    tag: 'The Winter Edit 26',
  },
  MEN: {
    title: 'Men’s Outerwear & Tailoring',
    links: ['Double-Breasted Peacoats', 'Merino Wool Knitwear', 'Casual Jackets & Overshirts', 'Formal Tailored Suits', 'Leather Boots'],
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80',
    tag: 'Heritage Tailoring',
  },
  HOME: {
    title: 'Cozy Living & Holiday Home',
    links: ['Waffle Textured Bedding Sets', 'Throws & Faux Fur Blankets', 'Winter Spice Candles & Diffusers', 'Tableware & Glassware', 'Holiday Decorations'],
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    tag: 'Home Sanctuary',
  },
  BRANDS: {
    title: 'Curated Designer Brands',
    links: ['Barbour', 'Boden', 'Ted Baker', 'Ralph Lauren', 'Lipsy London', 'Pro Tech Electronics'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    tag: 'Over 1,000+ Brands',
  },
  CHRISTMAS: {
    title: 'The Christmas Shop 2026',
    links: ['Matching Family Pajamas', 'Festive Partywear & Sparkle', 'Luxury Gifting for Her & Him', 'Kids Holiday Toys & Games', 'Christmas Tree & Table Decor'],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    tag: 'Metallic Gold Holiday',
  },
  CLEARANCE: {
    title: 'Clearance — Up to 60% Off',
    links: ['Women’s Clearance Coats', 'Men’s Winter Markdown', 'Kids Clearance Multi-Packs', 'Homeware Final Reductions', 'Footwear Clearance'],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    tag: 'Last Chance Deals',
  },
};

export default function Header() {
  const { itemCount, openCart, openCheckout } = useCart();
  const wishlistCount = useWishlistStore((state) => state.count());
  const { filters, setCategory } = useFilterStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.department && p.department.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleCategoryClick = (catName: string) => {
    const matchedCategory = catName === 'CHRISTMAS' ? 'Christmas' : catName === 'CLEARANCE' ? 'Clearance' : catName;
    setCategory(matchedCategory as ProductCategory);
    setIsMobileMenuOpen(false);
    setHoveredCategory(null);

    const el = document.getElementById('curated-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-shadow duration-300">
        {/* ========================================================
            TOP TIER HEADER BAR (2-Tier Grid)
            ======================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Left: Rounded Search Bar with smooth glow-on-focus transition */}
            <div className="flex-1 max-w-sm relative" ref={searchContainerRef}>
              <div
                className={`relative flex items-center w-full rounded-full bg-[#F1F5F9] border transition-all duration-300 ${
                  isSearchFocused
                    ? 'border-slate-900 bg-white shadow-lg ring-4 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for anything here..."
                  className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-transparent rounded-full focus:outline-none text-[#0F172A] placeholder-slate-500 font-medium"
                />
                <button
                  type="button"
                  className="absolute right-3 p-1 text-slate-500 hover:text-slate-900 transition-colors"
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
              </div>

              {/* Real-time Search Autocomplete Popover */}
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
                        <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
                          Popular Winter Searches
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {['Italian Wool Coats', 'Party Dresses', 'Matching Family Pajamas', 'Disney Knitwear', 'Cashmere Beanie', 'Wooden Train Set'].map((tag) => (
                            <button
                              key={tag}
                              onClick={() => {
                                setSearchQuery(tag);
                                const el = document.getElementById('curated-products');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1.5">
                          <Sparkles size={12} className="text-[#B8860B]" />
                          Visa-only payment protection active on all searches
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                          Matching Products ({searchResults.length})
                        </div>
                        {searchResults.length === 0 ? (
                          <p className="text-xs text-slate-500 py-2">
                            No products matching &quot;{searchQuery}&quot;. Try &quot;Coats&quot;, &quot;Dresses&quot;, or &quot;Toys&quot;.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {searchResults.map((product) => (
                              <div
                                key={product.id}
                                onClick={() => {
                                  setIsSearchFocused(false);
                                  const el = document.getElementById('curated-products');
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                              >
                                <div className="relative w-10 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                  <Image
                                    src={product.colors[0]?.images[0] || 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80'}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
                                  <p className="text-[11px] text-slate-500 font-extrabold">${product.price}</p>
                                </div>
                                <ChevronRight size={14} className="text-slate-400" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center: Brand Logo "NEXT" in bold, high-contrast, all-caps luxury typography */}
            <div className="text-center">
              <a
                href="/"
                className="inline-block group"
                aria-label="NEXT Homepage"
              >
                <span className="next-logo text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-[0.24em] transition-transform duration-300 group-hover:scale-[1.02]">
                  NEXT
                </span>
              </a>
            </div>

            {/* Right: Interactive icon buttons for Wishlist, Account, Cart, and uppercase CHECKOUT CTA */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 justify-end">
              {/* Wishlist Icon (Heart) */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-xl text-slate-800 hover:text-black hover:bg-slate-100/70 transition-colors"
                title="Saved Wishlist Items"
                aria-label="Wishlist"
              >
                <Heart size={21} className={wishlistCount > 0 ? 'fill-[#C8102E] text-[#C8102E]' : ''} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C8102E] text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>

              {/* Account Icon (User) */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  className="p-2.5 rounded-xl text-slate-800 hover:text-black hover:bg-slate-100/70 transition-colors"
                  title="My Account"
                  aria-label="Account"
                >
                  <User size={21} />
                </motion.button>
                <AccountPopover isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
              </div>

              {/* Cart Icon (Shopping Bag with active counter badge) */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                onClick={openCart}
                className="relative p-2.5 rounded-xl text-slate-800 hover:text-black hover:bg-slate-100/70 transition-colors"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={21} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </motion.button>

              {/* Main CTA: Prominent uppercase "CHECKOUT" CTA button (bg-slate-900 text-white rounded-lg font-bold) */}
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#000000' }}
                whileTap={{ scale: 0.96 }}
                onClick={openCheckout}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs lg:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md hover:shadow-xl transition-all"
                title="Strictly VISA Cards Only"
              >
                <CreditCard size={15} className="text-[#F7B600]" />
                CHECKOUT
              </motion.button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-2 text-slate-800 hover:text-black sm:hidden"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            CATEGORY NAVIGATION BAR
            ======================================================== */}
        <div className="hidden sm:block border-t border-slate-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center space-x-6 lg:space-x-10 py-3 relative">
              {CATEGORIES.map((cat) => {
                const isActive = filters.category.toUpperCase() === cat.name;
                const isHovered = hoveredCategory === cat.name;

                let textColor = 'text-slate-800 hover:text-black';
                if (cat.color === 'gold') {
                  textColor = 'text-[#B8860B] font-extrabold hover:text-amber-700';
                } else if (cat.color === 'crimson') {
                  textColor = 'text-[#C8102E] font-extrabold hover:text-red-700';
                }

                return (
                  <div
                    key={cat.name}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(cat.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`relative font-semibold text-xs lg:text-sm tracking-wide uppercase transition-colors py-1 ${textColor}`}
                    >
                      {cat.name}

                      {/* Micro-Interaction: Framer Motion animated layout underline sliding dynamically */}
                      {(isActive || isHovered) && (
                        <motion.span
                          layoutId="activeNav"
                          className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full ${
                            cat.color === 'gold'
                              ? 'bg-[#B8860B]'
                              : cat.color === 'crimson'
                              ? 'bg-[#C8102E]'
                              : 'bg-slate-900'
                          }`}
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Interactive Mega-Menu Preview Dropdown */}
          <AnimatePresence>
            {hoveredCategory && MEGA_MENU_PREVIEWS[hoveredCategory] && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xl z-30"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-8 items-center">
                  <div className="col-span-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
                      {MEGA_MENU_PREVIEWS[hoveredCategory].tag}
                    </span>
                    <h3 className="text-2xl font-black text-slate-950 tracking-tight mt-1 mb-4">
                      {MEGA_MENU_PREVIEWS[hoveredCategory].title}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {MEGA_MENU_PREVIEWS[hoveredCategory].links.map((link) => (
                        <button
                          key={link}
                          onClick={() => handleCategoryClick(hoveredCategory)}
                          className="text-left text-sm text-slate-600 hover:text-black hover:font-bold flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100/70 transition-all group"
                        >
                          <span>{link}</span>
                          <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 group-hover:text-black transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="col-span-4 relative h-48 rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-slate-200"
                    onClick={() => handleCategoryClick(hoveredCategory)}
                  >
                    <Image
                      src={MEGA_MENU_PREVIEWS[hoveredCategory].image}
                      alt={MEGA_MENU_PREVIEWS[hoveredCategory].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                      <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        Shop {hoveredCategory} Edit <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCheckout();
                }}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard size={16} className="text-[#F7B600]" />
                CHECKOUT WITH VISA
              </button>

              <div className="space-y-1 pt-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold uppercase tracking-wide flex items-center justify-between ${
                      cat.color === 'gold'
                        ? 'text-[#B8860B] bg-amber-50/70 font-bold'
                        : cat.color === 'crimson'
                        ? 'text-[#C8102E] bg-rose-50/70 font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Wishlist Drawer */}
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
