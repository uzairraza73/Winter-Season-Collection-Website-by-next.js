'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/hero-kid.jpg',
    title: "KIDS' SEASONAL STYLES",
    subtitle: "Stay Warm. Shop More. Save Big.",
    cta: 'SHOP KIDS COLLECTION',
    href: '/category/dresses',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85',
    title: "PARTY & CASUAL DRESSES",
    subtitle: "Luxury Velvets, Satins, Knitwear & Evening Partywear",
    cta: 'EXPLORE DRESSES',
    href: '/category/dresses',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=1600&q=85',
    title: "SIGNATURE COATS & KNITS",
    subtitle: "Engineered for Style, Warmth & Ultimate Comfort",
    cta: 'SHOP JACKETS & COATS',
    href: '/category/jackets-coats',
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative w-full overflow-hidden bg-slate-100" style={{ minHeight: '380px', maxHeight: '560px', aspectRatio: '21/9' }}>
      {/* Background slide image - High clarity & visibility */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-left md:object-center"
          />
          {/* Subtle gradient so text on right is readable while background image remains vibrant and visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent sm:hidden" />
        </motion.div>
      </AnimatePresence>

      {/* Floating text content on right */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-end py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-content'}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-right max-w-md sm:max-w-lg bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_16px_48px_rgba(15,23,42,0.12)]"
          >
            <span className="inline-block text-[11px] font-black uppercase tracking-widest text-sky-600 mb-2">
              Autumn / Winter 2026
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase mb-3">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6 leading-relaxed">
              {slide.subtitle}
            </p>

            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 group"
            >
              <span>{slide.cta}</span>
              <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-5 right-8 sm:right-16 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`block transition-all duration-300 rounded-full cursor-pointer ${
              i === activeSlide ? 'w-8 h-2 bg-slate-900' : 'w-2 h-2 bg-slate-400 hover:bg-slate-700'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
