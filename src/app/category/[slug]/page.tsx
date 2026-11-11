import React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import CategoryClient from './CategoryClient';

interface CategoryMeta {
  title: string;
  description: string;
  bannerImage: string;
  filter: (product: any) => boolean;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  'toys': {
    title: 'Toys & Soft Plush',
    description: 'Heirloom wooden toys, festive Highland Cow plushies, holiday gonks, and backpacks crafted for imagination and playtime cheer.',
    bannerImage: '/project-pic/toy box.jfif',
    filter: (p) => p.category === 'Toys',
  },
  'character-shops': {
    title: 'Character Shops',
    description: 'Official Disney, Marvel, LEGO Ninjago, Minecraft, Pokémon, PAW Patrol, Sonic, and Bluey backpacks, hoodies, tees, and outfits.',
    bannerImage: '/project-pic/charater box.jfif',
    filter: (p) => p.category === 'Character Shops',
  },
  'dresses': {
    title: 'Party & Casual Dresses',
    description: 'Designer velvet wraps, party knitted mini dresses, luxury satin midi gowns, tailored blazer dresses, and festive occasion wear.',
    bannerImage: '/project-pic/party box.jfif',
    filter: (p) => p.category === 'Dresses',
  },
  'jackets-coats': {
    title: 'Jackets & Outerwear',
    description: 'Italian tailored wool overcoats, character varsity bombers, heavy winter parkas, and cosy fleece hoodies.',
    bannerImage: '/project-pic/jacket box.jfif',
    filter: (p) => p.category === 'Jackets & Coats',
  },
  'homewear': {
    title: 'New Homewear Things',
    description: 'Textured waffle bedding, holiday throws, candle sets, and snug winter accessories for the warmest home sanctuary.',
    bannerImage: '/project-pic/homethings box.jfif',
    filter: (p) => p.category === 'New Homewear Things',
  },
  'electric-things': {
    title: 'Electric & Tech',
    description: 'Smart grooming electronics, high-velocity ionic hair systems, and personal care accessories.',
    bannerImage: '/project-pic/electric box.jfif',
    filter: (p) => p.category === 'Electric Things',
  },
  'christmas': {
    title: 'Christmas Edit',
    description: 'Seasonal festive jumpers, monogram letter plush decorations, family pyjamas, cushions, and gifting essentials.',
    bannerImage: '/project-pic/christmas box.jfif',
    filter: (p) => p.badges.includes('Christmas Edit') || p.name.toLowerCase().includes('christmas'),
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORY_MAP[slug];

  if (!meta) {
    notFound();
  }

  const categoryProducts = products.filter(meta.filter);

  return (
    <CategoryClient
      slug={slug}
      categoryTitle={meta.title}
      categoryDescription={meta.description}
      bannerImage={meta.bannerImage}
      products={categoryProducts}
    />
  );
}

