'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1543087903-1ac2364bda90?w=1400&q=85',
    tag: "KIDS' SEASONAL STYLES",
    cta: 'SHOP KIDS',
    href: '#curated-products',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85',
    tag: "WOMEN'S WINTER EDIT",
    cta: 'SHOP WOMEN',
    href: '#curated-products',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=1400&q=85',
    tag: "MEN'S OUTERWEAR",
    cta: 'SHOP MEN',
    href: '#curated-products',
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  const scrollToProducts = () => {
    const el = document.getElementById('curated-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0D13]" style={{ aspectRatio: '3/1', minHeight: '320px', maxHeight: '540px' }}>
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.tag}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Soft right-side fade so text is legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text — right side, vertically centered */}
      <div className="relative z-10 h-full flex items-center justify-end px-8 sm:px-14 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-text'}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-right max-w-xs sm:max-w-sm"
          >
            {/* Headline — 3 word-wrapped lines */}
            <h1 className="text-white font-light text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-wide uppercase mb-5">
              {slide.tag.split(' ').reduce<string[][]>((acc, word, i) => {
                const lineIndex = Math.floor(i / Math.ceil(slide.tag.split(' ').length / 3));
                if (!acc[lineIndex]) acc[lineIndex] = [];
                acc[lineIndex].push(word);
                return acc;
              }, []).map((words, i) => (
                <span key={i} className="block">{words.join(' ')}</span>
              ))}
            </h1>

            {/* CTA */}
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-0.5 hover:text-white/70 hover:border-white/70 transition-colors group"
            >
              {slide.cta}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-4 right-8 sm:right-14 lg:right-24 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`block transition-all duration-300 rounded-full cursor-pointer ${
              i === activeSlide ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
