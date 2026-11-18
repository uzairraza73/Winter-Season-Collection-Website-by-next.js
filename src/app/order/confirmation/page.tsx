import React, { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VisaBanner from '@/components/VisaBanner';
import OrderConfirmationClient from './OrderConfirmationClient';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 flex flex-col">
      <VisaBanner />
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-14 sm:py-20">
        <Suspense fallback={<div className="text-center py-20 text-slate-500 font-bold">Verifying payment confirmation...</div>}>
          <OrderConfirmationClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

