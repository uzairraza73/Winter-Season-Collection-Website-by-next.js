'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/hero-kids.jpg',
    title: "KIDS' WINTER STYLES",
    subtitle: "Stay Warm. Shop More. Save Big.",
    cta: 'SHOP KIDS',
    href: '/category/toys',
  },
  {
    id: 2,
    image: '/hero-women.jpg',
    title: "WOMEN'S WINTER EDIT",
    subtitle: "Tailored Outerwear, Partywear & Cashmere Knits",
    cta: 'SHOP WOMEN',
    href: '/category/dresses',
  },
  {
    id: 3,
    image: '/hero-men.jpg',
    title: "MEN'S SIGNATURE EDIT",
    subtitle: "Italian Wool Overcoats, Structured Blazers & Knits",
    cta: 'SHOP MEN',
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
            className="object-cover object-center"
          />
          {/* Subtle gradient to preserve full image beauty while ensuring text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent sm:hidden" />
        </motion.div>
      </AnimatePresence>

      {/* Floating text content on right with compact, sleek & attractive card */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-end py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-content'}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-right max-w-xs sm:max-w-sm bg-white/90 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5 rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">
              Autumn / Winter 2026
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug uppercase mb-1.5">
              {slide.title}
            </h1>

            <p className="text-[11px] sm:text-xs text-slate-600 font-medium mb-3.5 leading-relaxed">
              {slide.subtitle}
            </p>

            <Link
              href={slide.href}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-sky-600 transition-all shadow-sm hover:shadow-md hover:shadow-sky-500/20 group"
            >
              <span>{slide.cta}</span>
              <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-4 right-6 sm:right-12 z-20 flex gap-1.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`block transition-all duration-300 rounded-full cursor-pointer ${
              i === activeSlide ? 'w-6 h-1.5 bg-slate-900' : 'w-1.5 h-1.5 bg-slate-400 hover:bg-slate-700'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
