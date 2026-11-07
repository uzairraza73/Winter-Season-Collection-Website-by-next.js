import VisaBanner from '@/components/VisaBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCatalog from '@/components/ProductCatalog';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0F0F0F] relative">
      {/* Sticky Top Tier Alert Bar */}
      <VisaBanner />

      {/* Main Two-Tier Header Navigation */}
      <Header />

      {/* Hero Section — The Winter Edit '26 */}
      <HeroSection />

      {/* Category Grid Boxes (6 Custom Tiles Matching UI Mockup) */}
      <CategoryGrid />

      {/* Curated Product Showcase with Quick-Add & Sizing */}
      <ProductCatalog />

      {/* NEXT US Dark Theme Footer */}
      <Footer />
    </main>
  );
}
