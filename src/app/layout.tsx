import type { Metadata, Viewport } from 'next';
import './globals.css';
import CartDrawer from '@/components/CartDrawer';
import VisaCheckoutModal from '@/components/VisaCheckoutModal';

export const metadata: Metadata = {
  title: 'NEXT US — Official Online Shop | The Winter Edit ’26',
  description:
    'Shop the latest fashion, footwear, beauty, home decor, and toys from NEXT US. Exclusive Visa checkout protection with free US standard shipping on orders over $150.',
  keywords: [
    'NEXT US',
    'next.us',
    'winter coats',
    'party dresses',
    'wooden toys',
    'homewear',
    'character shops',
    'holiday knitwear',
    'Visa checkout',
  ],
  openGraph: {
    title: 'NEXT US — Official Online Shop | The Winter Edit ’26',
    description:
      'Discover signature tailored coats, cozy knitwear, and seasonal essentials engineered for style and warmth.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F0F0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#0F0F0F] antialiased min-h-screen selection:bg-zinc-900 selection:text-white">
        {children}

        {/* Global Slide-over Shopping Bag */}
        <CartDrawer />

        {/* Global Strict Visa-Only Payment Modal */}
        <VisaCheckoutModal />
      </body>
    </html>
  );
}
