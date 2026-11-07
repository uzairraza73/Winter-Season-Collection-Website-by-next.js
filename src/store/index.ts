'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, FilterState, Product, ProductCategory, ProductColor, ProductSize, WishlistItem } from '@/types';

// ============================================================
// CART STORE
// ============================================================

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (product: Product, color?: ProductColor, size?: ProductSize) => void;
  removeItem: (cartItemId: string) => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,

      addItem: (product, color, size) => {
        const chosenColor = color || product.colors[0];
        const chosenSize = size || product.sizes.find((s) => s.available) || product.sizes[0];
        const cartItemId = `${product.id}-${chosenColor.name}-${chosenSize.label}`;

        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              { product, quantity: 1, selectedColor: chosenColor, selectedSize: chosenSize, cartItemId },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (cartItemId) =>
        set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) })),

      incrementItem: (cartItemId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrementItem: (cartItemId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCheckout: () => set({ isCheckoutOpen: true, isOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }),
    { name: 'next-us-cart' }
  )
);

// ============================================================
// WISHLIST STORE
// ============================================================

interface WishlistStore {
  items: WishlistItem[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  count: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (productId) => {
        const isAlready = get().items.some((i) => i.productId === productId);
        if (isAlready) {
          set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
        } else {
          set((state) => ({ items: [...state.items, { productId, addedAt: new Date() }] }));
        }
      },
      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),
      count: () => get().items.length,
    }),
    { name: 'next-us-wishlist' }
  )
);

// ============================================================
// FILTER STORE
// ============================================================

interface FilterStore {
  filters: FilterState;
  isDrawerOpen: boolean;
  setCategory: (category: ProductCategory) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  resetFilters: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  priceRange: [0, 1000],
  sizes: [],
  colors: [],
  sortBy: 'featured',
};

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: defaultFilters,
  isDrawerOpen: false,

  setCategory: (category) => set((state) => ({ filters: { ...state.filters, category } })),
  setPriceRange: (range) => set((state) => ({ filters: { ...state.filters, priceRange: range } })),
  toggleSize: (size) =>
    set((state) => ({
      filters: {
        ...state.filters,
        sizes: state.filters.sizes.includes(size)
          ? state.filters.sizes.filter((s) => s !== size)
          : [...state.filters.sizes, size],
      },
    })),
  toggleColor: (color) =>
    set((state) => ({
      filters: {
        ...state.filters,
        colors: state.filters.colors.includes(color)
          ? state.filters.colors.filter((c) => c !== color)
          : [...state.filters.colors, color],
      },
    })),
  setSortBy: (sortBy) => set((state) => ({ filters: { ...state.filters, sortBy } })),
  resetFilters: () => set({ filters: defaultFilters }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
