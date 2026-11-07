'use client';

import { useCartStore } from '@/store';
import { Product, ProductColor, ProductSize } from '@/types';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const isCheckoutOpen = useCartStore((state) => state.isCheckoutOpen);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const openCheckout = useCartStore((state) => state.openCheckout);
  const closeCheckout = useCartStore((state) => state.closeCheckout);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : 9.99;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const tax = Math.round(subtotal * 0.0825 * 100) / 100;
  const grandTotal = Math.round((subtotal + shipping + tax) * 100) / 100;

  // Quick Add function: automatically selects available size and primary color
  const quickAddToCart = (product: Product, color?: ProductColor, size?: ProductSize) => {
    addItem(product, color, size);
  };

  return {
    items,
    itemCount: totalItems,
    subtotal,
    shipping,
    tax,
    grandTotal,
    freeShippingThreshold,
    isFreeShipping,
    freeShippingRemaining,
    freeShippingProgress,
    isOpen,
    isCheckoutOpen,
    openCart,
    closeCart,
    toggleCart,
    openCheckout,
    closeCheckout,
    addItem: quickAddToCart,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
  };
}

