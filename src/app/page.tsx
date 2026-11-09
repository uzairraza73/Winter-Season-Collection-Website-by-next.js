import VisaBanner from '@/components/VisaBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCatalog from '@/components/ProductCatalog';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 relative">
      {/* Sticky Top Tier Alert Bar */}
      <VisaBanner />

      {/* Main Header Navigation */}
      <Header />

      {/* Hero Section — Ella Winter Theme with Kid image */}
      <HeroSection />

      {/* Category Grid Boxes (Separate pages on click) */}
      <CategoryGrid />

      {/* Curated Product Showcase with 3 Tabs */}
      <ProductCatalog />

      {/* Clean White Theme Footer */}
      <Footer />
    </main>
  );
}
