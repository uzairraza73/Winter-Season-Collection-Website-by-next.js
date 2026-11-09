import type { Metadata, Viewport } from 'next';
import './globals.css';
import CartDrawer from '@/components/CartDrawer';
import VisaCheckoutModal from '@/components/VisaCheckoutModal';

export const metadata: Metadata = {
  title: 'WinterWear — Official Online Shop | The Winter Collection',
  description:
    'Cozy, stylish, and premium winter essentials. Winter coats, character backpacks, soft toys, homewear, and dresses with secure card checkout.',
  keywords: [
    'WinterWear',
    'NEXT US',
    'winter coats',
    'party dresses',
    'backpacks',
    'soft toys',
    'character shops',
    'holiday knitwear',
    'Visa checkout',
  ],
  openGraph: {
    title: 'WinterWear — Official Online Shop | The Winter Collection',
    description:
      'Cozy, stylish, and premium winter essentials. Stay warm, shop more, save big.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="bg-white text-slate-900 antialiased min-h-screen selection:bg-slate-900 selection:text-white">
        {children}

        {/* Global Slide-over Shopping Bag */}
        <CartDrawer />

        {/* Global Strict Visa-Only Payment Modal */}
        <VisaCheckoutModal />
      </body>
    </html>
  );
}
