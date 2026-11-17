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
  'kids': {
    title: "Kids' Collection",
    description: 'Explore the full kids, baby, and youth collection — cozy knit jumpers, Christmas sets, character favorites, and everyday warm cotton staples.',
    bannerImage: '/hero-kids.jpg',
    filter: (p) => p.department === 'GIRLS' || p.department === 'BOYS' || p.department === 'BABY' || p.category === 'Toys' || p.category === 'Character Shops' || p.badges.includes('Kids Session'),
  },
  'boys': {
    title: "Boys' Collection",
    description: 'Warm sweatshirts, hoodies, character graphics, holiday co-ord sets, and crew neck jumpers tailored for boys.',
    bannerImage: '/project-pic/jacket box.png',
    filter: (p) => p.department === 'BOYS' || (p.category === 'Character Shops' && !p.name.toLowerCase().includes('dress')),
  },
  'girls': {
    title: "Girls' Collection",
    description: 'Festive dresses, sequin tops, velvet occasionwear, cozy sets, and character favorites for girls of all ages.',
    bannerImage: '/project-pic/party box.png',
    filter: (p) => p.department === 'GIRLS' || p.department === 'BABY' || p.category === 'Dresses',
  },
  'women': {
    title: "Women's Collection",
    description: 'Designer velvet gowns, knitted midi dresses, tailored wool overcoats, and winter party essentials for women.',
    bannerImage: '/hero-women.jpg',
    filter: (p) => p.department === 'WOMEN',
  },
  'men': {
    title: "Men's Collection",
    description: 'Premium winter coats, knitwear, tailored jackets, and warm essentials for men.',
    bannerImage: '/hero-men.jpg',
    filter: (p) => p.department === 'MEN',
  },
  'christmas': {
    title: 'Christmas Edit',
    description: 'Seasonal festive jumpers, monogram letter plush decorations, family pyjamas, cushions, and holiday gifting essentials.',
    bannerImage: '/project-pic/christmas box.png',
    filter: (p) => p.badges.includes('Christmas Edit') || p.name.toLowerCase().includes('christmas') || p.department === 'CHRISTMAS',
  },
  'winter-collection': {
    title: 'The Winter Collection',
    description: 'Explore our complete seasonal catalog across Kids, Boys, Girls, Women, Men, Outerwear, Knitwear, and Holiday Essentials.',
    bannerImage: '/hero-women.jpg',
    filter: () => true,
  },
  'toys': {
    title: 'Toys & Soft Plush',
    description: 'Heirloom wooden toys, festive Highland Cow plushies, holiday gonks, and backpacks crafted for imagination and playtime cheer.',
    bannerImage: '/project-pic/toy box.png',
    filter: (p) => p.category === 'Toys',
  },
  'character-shops': {
    title: 'Character Shops',
    description: 'Official Disney, Marvel, LEGO Ninjago, Minecraft, Pokémon, PAW Patrol, Sonic, and Bluey backpacks, hoodies, tees, and outfits.',
    bannerImage: '/project-pic/charater box.png',
    filter: (p) => p.category === 'Character Shops',
  },
  'dresses': {
    title: 'Party & Casual Dresses',
    description: 'Designer velvet wraps, party knitted mini dresses, luxury satin midi gowns, tailored blazer dresses, and festive occasion wear.',
    bannerImage: '/project-pic/party box.png',
    filter: (p) => p.category === 'Dresses',
  },
  'jackets-coats': {
    title: 'Jackets & Outerwear',
    description: 'Italian tailored wool overcoats, character varsity bombers, heavy winter parkas, and cosy fleece hoodies.',
    bannerImage: '/project-pic/jacket box.png',
    filter: (p) => p.category === 'Jackets & Coats',
  },
  'homewear': {
    title: 'New Homewear Things',
    description: 'Textured waffle bedding, holiday throws, candle sets, and snug winter accessories for the warmest home sanctuary.',
    bannerImage: '/project-pic/homethings box.png',
    filter: (p) => p.category === 'New Homewear Things',
  },
  'electric-things': {
    title: 'Electric & Tech',
    description: 'Smart grooming electronics, high-velocity ionic hair systems, and personal care accessories.',
    bannerImage: '/project-pic/electric box.png',
    filter: (p) => p.category === 'Electric Things',
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

