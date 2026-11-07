'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Zap, Shield, Leaf } from 'lucide-react';
import { staggerContainerVariants, fadeUpVariants } from '@/lib/motionVariants';

const FEATURES = [
  {
    icon: Zap,
    title: 'Smart Heat Retaining',
    description:
      'Our proprietary HeatLock™ technology uses directional micro-channels to redistribute body heat 3x more efficiently than conventional insulation.',
    stat: '3×',
    statLabel: 'Heat Efficiency',
    gradient: 'from-amber-500/15 to-orange-500/5',
    iconColor: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.2)',
  },
  {
    icon: Shield,
    title: 'Zero-Permeability Shell',
    description:
      'Molecularly bonded Gore-Tex® membrane with 100% zero wind permeability — tested in Alaskan Tundra conditions down to -40°F.',
    stat: '0%',
    statLabel: 'Wind Penetration',
    gradient: 'from-blue-500/15 to-cyan-500/5',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.2)',
  },
  {
    icon: Leaf,
    title: 'Ethically Sourced Down',
    description:
      'RDS (Responsible Down Standard) certified 800-fill power down, traceable from farm to finished garment. Zero live-plucking, 100% ethical.',
    stat: '800',
    statLabel: 'Fill Power',
    gradient: 'from-emerald-500/15 to-green-500/5',
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.2)',
  },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUpVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-7 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/8 overflow-hidden group cursor-default`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow follow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${feature.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${feature.glowColor}` }} />

      {/* Icon */}
      <div className="mb-5 inline-flex">
        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon size={26} className={feature.iconColor} />
        </div>
      </div>

      {/* Stat */}
      <div className="mb-3">
        <span className={`text-4xl font-black ${feature.iconColor}`}>{feature.stat}</span>
        <span className="ml-2 text-xs text-slate-500 uppercase tracking-wider font-medium">{feature.statLabel}</span>
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-xl mb-3 leading-tight">{feature.title}</h3>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>

      {/* Index decoration */}
      <div className="absolute top-6 right-6 text-7xl font-black text-white/[0.03] pointer-events-none select-none">
        0{index + 1}
      </div>
    </motion.div>
  );
}

export default function FeatureShowcase() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-blue-500/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-blue-500/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs text-blue-400 font-semibold tracking-[0.3em] uppercase">
            Winter Tech
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Built Different
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Three pillars of engineering excellence that define every FROST USA garment.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900/60 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-bold text-lg">All materials independently tested & certified</p>
            <p className="text-slate-400 text-sm mt-1">bluesign® · RDS · Fair Trade · B Corp Member · 1% for the Planet</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {['bluesign®', 'RDS', 'Fair Trade', '1% Planet'].map((cert) => (
              <span key={cert} className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

