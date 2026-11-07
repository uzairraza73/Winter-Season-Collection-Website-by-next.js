'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost' | 'visa';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  showArrow?: boolean;
  magnetic?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  showArrow = false,
  magnetic = false,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  title,
}: AnimatedButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Magnetic spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });
  const moveX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;
    const xPct = mouseClientX / width - 0.5;
    const yPct = mouseClientY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    x.set(0);
    y.set(0);
  };

  // Variant styling
  const variantStyles = {
    primary:
      'bg-slate-900 text-white hover:bg-black border border-white/20 shadow-lg hover:shadow-2xl focus:ring-2 focus:ring-slate-900/40 focus:border-white/60',
    secondary:
      'bg-white/75 backdrop-blur-md text-slate-900 border border-slate-200/80 hover:bg-white/95 hover:border-slate-300 shadow-md hover:shadow-xl focus:ring-2 focus:ring-slate-300',
    dark:
      'bg-[#0F172A] text-white hover:bg-slate-900 border border-slate-800 shadow-md hover:shadow-xl focus:ring-2 focus:ring-slate-700',
    ghost:
      'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/40 shadow-sm',
    visa:
      'bg-[#1A1F71] text-white hover:bg-[#121652] border border-blue-400/30 shadow-lg hover:shadow-blue-900/30 focus:ring-2 focus:ring-[#1A1F71]/50',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-xl tracking-wider',
    md: 'px-6 py-3.5 text-xs sm:text-sm rounded-xl tracking-widest',
    lg: 'px-8 py-4 text-sm sm:text-base rounded-2xl tracking-widest',
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magnetic ? { x: moveX, y: moveY } : undefined}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group relative inline-flex items-center justify-center font-extrabold uppercase transition-all duration-300 select-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {/* Ambient glow sweep */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
        <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {showArrow && (
          <ArrowRight
            size={16}
            className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          />
        )}
      </span>
    </motion.button>
  );
}

