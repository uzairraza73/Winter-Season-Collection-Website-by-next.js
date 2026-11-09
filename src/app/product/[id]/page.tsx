import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found — NEXT US',
    };
  }

  return {
    title: `${product.name} — $${product.price} | NEXT US`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NEXT US`,
      description: product.description,
      images: product.colors[0]?.images ? [product.colors[0].images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

