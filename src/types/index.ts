// ============================================================
// TYPES & INTERFACES — NEXT US E-Commerce Platform
// ============================================================

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductSize {
  label: string;
  available: boolean;
}

export type ProductBadge =
  | 'Best Seller'
  | 'Limited Drop'
  | 'Free US Returns'
  | 'New Arrival'
  | 'Sale'
  | 'Clearance'
  | 'Exclusive'
  | 'Christmas Edit';

export type ProductCategory =
  | 'All'
  | 'Girls'
  | 'Boys'
  | 'Baby'
  | 'Women'
  | 'Men'
  | 'Home'
  | 'Brands'
  | 'Christmas'
  | 'Clearance'
  | 'Toys'
  | 'Dresses'
  | 'Jackets & Coats'
  | 'New Homewear Things'
  | 'Character Shops'
  | 'Electric Things';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: Exclude<ProductCategory, 'All'>;
  department?: 'GIRLS' | 'BOYS' | 'BABY' | 'WOMEN' | 'MEN' | 'HOME' | 'BRANDS' | 'CHRISTMAS' | 'CLEARANCE';
  badges: ProductBadge[];
  colors: ProductColor[];
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  cartItemId: string; // unique: productId + color + size
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}

// Framer Motion Variants
export type MotionVariants = {
  hidden: object;
  visible: object;
  exit?: object;
};

export interface FilterState {
  category: ProductCategory;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}
