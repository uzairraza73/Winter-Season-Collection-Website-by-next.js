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
  themeColor: '#0B0D13',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0D13] text-white antialiased min-h-screen selection:bg-[#FF6A00] selection:text-white">
        {children}

        {/* Global Slide-over Shopping Bag */}
        <CartDrawer />

        {/* Global Strict Visa-Only Payment Modal */}
        <VisaCheckoutModal />
      </body>
    </html>
  );
}
