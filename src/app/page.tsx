import VisaBanner from '@/components/VisaBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCatalog from '@/components/ProductCatalog';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0D13] text-white relative">
      {/* Sticky Top Tier Alert Bar */}
      <VisaBanner />

      {/* Main Two-Tier Header Navigation */}
      <Header />

      {/* Hero Section — The Winter Edit '26 */}
      <HeroSection />

      {/* Category Grid Boxes (Compact Sleek Tiles) */}
      <CategoryGrid />

      {/* Curated Product Showcase with Quick-Add & Sizing */}
      <ProductCatalog />

      {/* NEXT US Dark Theme Footer */}
      <Footer />
    </main>
  );
}
