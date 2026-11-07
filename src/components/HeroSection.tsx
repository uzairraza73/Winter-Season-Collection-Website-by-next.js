'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Sparkles, ChevronRight, Thermometer, Shield } from 'lucide-react';
import Image from 'next/image';
import AnimatedButton from '@/components/AnimatedButton';

export default function HeroSection() {
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  const scrollToProducts = () => {
    const el = document.getElementById('curated-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#0F172A] text-white">
        {/* Full-width responsive banner showcase with sub-zero visual depth */}
        <div className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] flex items-center">
          {/* Background Editorial Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=85"
              alt="NEXT US Winter Edit 2026 Editorial"
              fill
              priority
              className="object-cover object-center lg:object-[center_30%] opacity-65 scale-[1.02] transform transition-transform duration-1000"
            />
            {/* Sub-Zero Visual Depth Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/70 to-[#0F172A]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30" />
          </div>

          {/* Floating Spec Badges with Continuous Smooth Float (y: [-6, 6]) */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute top-28 right-24 z-20 items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white pointer-events-none"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Thermometer size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-white">-20°F Thermal Rated</p>
              <p className="text-[10px] text-slate-300">Extreme Winter Insulation</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute bottom-28 right-40 z-20 items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white pointer-events-none"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-white">Waterproof Tech</p>
              <p className="text-[10px] text-slate-300">Sealed Storm Membrane</p>
            </div>
          </motion.div>

          {/* Banner Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
            <div className="max-w-2xl">
              {/* Season Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-slate-200 uppercase tracking-widest mb-6 shadow-sm"
              >
                <Sparkles size={13} className="text-[#B8860B]" />
                AUTUMN / WINTER 2026 EDITORIAL
              </motion.div>

              {/* Main Headline with entrance stagger animation (opacity: [0, 1], y: [20, 0]) */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6 master-heading"
              >
                THE WINTER EDIT &apos;26 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-serif italic font-normal tracking-normal">
                  — New Arrivals
                </span>
              </motion.h1>

              {/* Subheading: "Engineered for style, warmth, and ultimate comfort. Explore high-performance outerwear and festive collections." */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-xl"
              >
                Engineered for style, warmth, and ultimate comfort. Explore high-performance outerwear and festive collections.
              </motion.p>

              {/* Interactive Animated Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                {/* Primary Button ("SHOP NEW IN"): Magnetic hover effect, subtle glow border on focus, with animated right-arrow shift */}
                <AnimatedButton
                  variant="primary"
                  size="md"
                  magnetic
                  showArrow
                  onClick={scrollToProducts}
                  className="bg-black hover:bg-slate-900 border-white/30"
                >
                  SHOP NEW IN
                </AnimatedButton>

                {/* Secondary Button ("EXPLORE LOOKBOOK"): Frosted glass backdrop, subtle scale pop on hover, opening lookbook preview modal */}
                <AnimatedButton
                  variant="ghost"
                  size="md"
                  icon={<Play size={14} className="fill-white" />}
                  onClick={() => setIsLookbookOpen(true)}
                  className="bg-white/10 hover:bg-white/20 border-white/20"
                >
                  EXPLORE LOOKBOOK
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Visual Preview Modal */}
      <AnimatePresence>
        {isLookbookOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLookbookOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0F172A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-50 text-white"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest">
                    NEXT US Editorial Lookbook
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight">The Winter 2026 Runway & Street Edit</h3>
                </div>
                <button
                  onClick={() => setIsLookbookOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                {/* Look 1 */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
                    alt="Look 01 - Tailored City Chic"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs text-[#B8860B] font-bold uppercase tracking-wider">Look 01</span>
                    <h4 className="text-lg font-bold text-white mb-2">Tailored Wool Camel Overcoat & Cashmere Knit</h4>
                    <p className="text-xs text-slate-300 mb-3">Structured silhouette paired with relaxed monochrome layering.</p>
                    <button
                      onClick={() => {
                        setIsLookbookOpen(false);
                        scrollToProducts();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl transition-colors w-fit"
                    >
                      Shop Look 01 <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Look 2 */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"
                    alt="Look 02 - Evening Elegance"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs text-[#B8860B] font-bold uppercase tracking-wider">Look 02</span>
                    <h4 className="text-lg font-bold text-white mb-2">Emerald Velvet Wrap Evening Gown</h4>
                    <p className="text-xs text-slate-300 mb-3">Holiday soiree glamour with jewel tone luster and delicate draping.</p>
                    <button
                      onClick={() => {
                        setIsLookbookOpen(false);
                        scrollToProducts();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl transition-colors w-fit"
                    >
                      Shop Look 02 <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
