'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROTATING_LINES = [
  { icon: '🚚', label: 'Free US Delivery on Orders Over', highlight: '$150' },
  { icon: '💳', label: 'Exclusive US Delivery: We strictly accept', highlight: 'VISA Cards', suffix: ' for all orders' },
  { icon: '🛡️', label: 'Verified by Visa ·', highlight: '256-Bit SSL', suffix: ' Secured Checkout' },
];

export default function VisaBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ROTATING_LINES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const line = ROTATING_LINES[current];

  return (
    <div className="bg-[#0F172A] text-white text-xs border-b border-slate-800 relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-4">
        {/* Left dot indicators */}
        <div className="flex gap-1.5">
          {ROTATING_LINES.map((_, i) => (
            <span
              key={i}
              className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-emerald-400 scale-125' : 'bg-white/25'
              }`}
            />
          ))}
        </div>

        {/* Rotating message */}
        <div className="relative h-5 flex items-center justify-center overflow-hidden min-w-[18rem] sm:min-w-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1.5 text-slate-200 tracking-wide whitespace-nowrap absolute"
            >
              <span className="text-sm">{line.icon}</span>
              <span>{line.label}</span>
              <strong className="text-white font-bold underline decoration-emerald-400 underline-offset-2">
                {line.highlight}
              </strong>
              {line.suffix && <span>{line.suffix}</span>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right dot indicators (mirror for balance) */}
        <div className="flex gap-1.5 opacity-0 pointer-events-none" aria-hidden>
          {ROTATING_LINES.map((_, i) => (
            <span key={i} className="block w-1.5 h-1.5 rounded-full bg-white/25" />
          ))}
        </div>
      </div>
    </div>
  );
}
