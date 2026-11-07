'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, Snowflake, ArrowRight } from 'lucide-react';

function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-600 text-white shadow-2xl shadow-emerald-900/40 border border-emerald-500 max-w-sm w-full mx-4"
        >
          <CheckCircle size={20} className="flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">Welcome to the USA VIP Winter Club!</p>
            <p className="text-xs text-emerald-100 mt-0.5">Check your inbox for 15% off your first order.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <>
      <section className="relative py-28 overflow-hidden bg-slate-950">
        {/* Background Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-slate-950 to-slate-950" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }}
          />
        </div>

        {/* Snow particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-300/10"
              style={{ left: `${(i * 9 + 2) % 100}%`, top: '-5%' }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{
                duration: 10 + (i % 4) * 3,
                repeat: Infinity,
                delay: (i * 0.9) % 10,
                ease: 'linear',
              }}
            >
              <Snowflake size={10 + (i % 4) * 8} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6"
          >
            <Snowflake size={11} />
            VIP Winter Club
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4"
          >
            Get 15% Off
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Your First Order
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-10 max-w-xl mx-auto"
          >
            Join 150,000+ members of the USA VIP Winter Club. Early access to new drops, member-only
            pricing, and exclusive events.
          </motion.p>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="your@email.com"
                    className={`w-full pl-10 pr-4 py-4 rounded-xl bg-slate-900/80 border ${
                      error ? 'border-rose-500' : 'border-white/15'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors text-sm`}
                  />
                  {error && (
                    <p className="absolute -bottom-5 left-0 text-xs text-rose-400">{error}</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors whitespace-nowrap shadow-lg shadow-blue-600/30"
                >
                  Join VIP Club
                  <ArrowRight size={15} />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-400/30 flex items-center justify-center">
                  <CheckCircle size={30} className="text-emerald-400" />
                </div>
                <p className="text-white font-bold text-xl">You&apos;re in! Welcome to the Club.</p>
                <p className="text-slate-400 text-sm">Check your inbox — your 15% code is on the way.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600"
          >
            {['No spam, ever', 'Unsubscribe anytime', '150K+ members', 'US Only exclusive drops'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Toast visible={showToast} />
    </>
  );
}

