import { Product } from '@/types';

// ============================================================
// PRODUCT DATA — NEXT US Autumn/Winter 2026 Collection
// ============================================================

export const products: Product[] = [
  // ------------------------------------------------------------
  // JACKETS & COATS / OUTERWEAR
  // ------------------------------------------------------------
  {
    id: 'next-coat-001',
    name: 'Tailored Italian Wool Blend Longline Overcoat',
    brand: 'NEXT SIGNATURE',
    price: 185,
    originalPrice: 240,
    category: 'Jackets & Coats',
    department: 'WOMEN',
    badges: ['Best Seller', 'New Arrival'],
    colors: [
      {
        name: 'Camel Brown',
        hex: '#C19A6B',
        images: [
          'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
        ],
      },
      {
        name: 'Midnight Black',
        hex: '#111111',
        images: [
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'US 4', available: true },
      { label: 'US 6', available: true },
      { label: 'US 8', available: true },
      { label: 'US 10', available: true },
      { label: 'US 12', available: false },
    ],
    rating: 4.9,
    reviewCount: 1420,
    description: 'Crafted from premium Italian wool blend fabric with notched lapels and structured silhouette. Designed for luxury city styling.',
    features: ['Italian Wool Blend', 'Satin Lined', 'Horn Buttons', 'Dry Clean Only'],
    isBestseller: true,
  },
  {
    id: 'next-puffer-002',
    name: 'Thermal Chevron Down Puffer Parka with Faux Fur Hood',
    brand: 'NEXT TECH',
    price: 145,
    originalPrice: 195,
    category: 'Jackets & Coats',
    department: 'WOMEN',
    badges: ['Free US Returns', 'Best Seller'],
    colors: [
      {
        name: 'Winter Ivory',
        hex: '#F8F9FA',
        images: [
          'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
        ],
      },
      {
        name: 'Slate Forest',
        hex: '#2F4F4F',
        images: [
          'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
          'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    rating: 4.8,
    reviewCount: 890,
    description: 'Sub-zero thermal rated insulated jacket with windproof storm cuffs and removable faux-fur trim hood.',
    features: ['Storm Proof Membrane', '700-Fill Power', 'Faux-Fur Trim', 'Fleece Pockets'],
    isBestseller: true,
  },
  {
    id: 'next-mens-coat-003',
    name: 'Men’s Double-Breasted Heavy Peacoat in Shetland Wool',
    brand: 'NEXT MEN',
    price: 168,
    category: 'Jackets & Coats',
    department: 'MEN',
    badges: ['New Arrival'],
    colors: [
      {
        name: 'Charcoal Navy',
        hex: '#1E293B',
        images: [
          'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: '38R', available: true },
      { label: '40R', available: true },
      { label: '42R', available: true },
      { label: '44R', available: true },
    ],
    rating: 4.9,
    reviewCount: 462,
    description: 'Heritage naval inspired double-breasted peacoat tailored in heavyweight brushed wool with quilted insulation.',
    features: ['Shetland Wool', 'Double-Breasted', 'Quilted Inner Lining', 'Deep Welt Pockets'],
  },

  // ------------------------------------------------------------
  // DRESSES
  // ------------------------------------------------------------
  {
    id: 'next-dress-004',
    name: 'Emerald Velvet Wrap Midi Evening Dress',
    brand: 'NEXT OCCASION',
    price: 110,
    originalPrice: 140,
    category: 'Dresses',
    department: 'WOMEN',
    badges: ['Exclusive', 'Sale'],
    colors: [
      {
        name: 'Deep Emerald',
        hex: '#0A5C36',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
        ],
      },
      {
        name: 'Ruby Wine',
        hex: '#7A1C2E',
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'US 2', available: true },
      { label: 'US 4', available: true },
      { label: 'US 6', available: true },
      { label: 'US 8', available: true },
      { label: 'US 10', available: true },
    ],
    rating: 4.9,
    reviewCount: 680,
    description: 'Luxe stretch-velvet midi dress featuring flattering wrap neckline, gathered waist, and gentle tulip hemline.',
    features: ['Lustrous Stretch Velvet', 'Wrap Silhouette', 'Self-Tie Belt', 'Concealed Zip'],
    isBestseller: true,
  },
  {
    id: 'next-dress-005',
    name: 'Champagne Shimmer Sequin Plunge Party Dress',
    brand: 'NEXT PARTY',
    price: 135,
    category: 'Dresses',
    department: 'WOMEN',
    badges: ['New Arrival', 'Limited Drop'],
    colors: [
      {
        name: 'Champagne Gold',
        hex: '#D4AF37',
        images: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80',
          'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'US 4', available: true },
      { label: 'US 6', available: true },
      { label: 'US 8', available: true },
      { label: 'US 10', available: false },
    ],
    rating: 4.7,
    reviewCount: 320,
    description: 'All-over liquid sequins catching the light from every angle with long sleeves and delicate v-neckline.',
    features: ['Micro-Sequins', 'Stretch Mesh Backing', 'Lined Body', 'Party Ready'],
  },

  // ------------------------------------------------------------
  // TOYS
  // ------------------------------------------------------------
  {
    id: 'next-toys-006',
    name: 'Heritage Natural Wooden Town & Train Adventure Set (75 Pcs)',
    brand: 'NEXT KIDS',
    price: 65,
    originalPrice: 85,
    category: 'Toys',
    department: 'BOYS',
    badges: ['Best Seller', 'Sale'],
    colors: [
      {
        name: 'Natural Birch Wood',
        hex: '#EADBB6',
        images: [
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
          'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'One Size', available: true },
    ],
    rating: 4.9,
    reviewCount: 940,
    description: 'Sustainably sourced beechwood train tracks, magnetic engine carriages, bridges, and wooden town pieces for creative play.',
    features: ['FSC Certified Beechwood', 'Non-Toxic Waterborne Paint', 'Magnetic Couplers', 'Ages 3+'],
    isBestseller: true,
  },
  {
    id: 'next-toys-007',
    name: 'Classic Steiff-Style Heirloom Mohair Teddy Bear',
    brand: 'NEXT HEIRLOOM',
    price: 48,
    category: 'Toys',
    department: 'BABY',
    badges: ['Limited Drop'],
    colors: [
      {
        name: 'Honey Amber',
        hex: '#D29034',
        images: [
          'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&q=80',
          'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: '14 inch', available: true },
    ],
    rating: 5.0,
    reviewCount: 512,
    description: 'Artisan hand-stitched teddy bear with ultra-soft faux fur and satin bow. A cherished holiday heirloom for generations.',
    features: ['Hand-Stitched', 'Hypoallergenic Fill', 'Satin Bow', 'Gift Box Included'],
  },

  // ------------------------------------------------------------
  // NEW HOMEWEAR THINGS
  // ------------------------------------------------------------
  {
    id: 'next-home-008',
    name: 'Waffle Textured Heavy Stonewash Duvet & Sham Bedding Set',
    brand: 'NEXT HOME',
    price: 95,
    originalPrice: 130,
    category: 'New Homewear Things',
    department: 'HOME',
    badges: ['Best Seller'],
    colors: [
      {
        name: 'Oatmeal Natural',
        hex: '#E8E1D5',
        images: [
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
        ],
      },
      {
        name: 'Sage Mist',
        hex: '#A3B18A',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'Full/Queen', available: true },
      { label: 'King', available: true },
    ],
    rating: 4.8,
    reviewCount: 780,
    description: '100% long-staple washed cotton featuring breathable honeycomb waffle weave that softens with every wash.',
    features: ['100% Breathable Cotton', 'Pre-Washed Softness', 'Includes 2 Pillow Shams', 'Corner Ties'],
    isBestseller: true,
  },
  {
    id: 'next-home-009',
    name: 'Winter Spice & Amber Hand-Poured Soy Botanical Candle (3-Wick)',
    brand: 'NEXT AROMA',
    price: 36,
    category: 'New Homewear Things',
    department: 'CHRISTMAS',
    badges: ['Christmas Edit'],
    colors: [
      {
        name: 'Frosted Glass Amber',
        hex: '#B8860B',
        images: [
          'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: '16 oz (80hr Burn)', available: true },
    ],
    rating: 4.9,
    reviewCount: 384,
    description: 'Warm notes of clove, cinnamon stick, fir needles, and rich amber resin poured in heavy fluted frosted glass.',
    features: ['100% Natural Soy Wax', '3 Cotton Wicks', '80 Hour Clean Burn', 'Gold Foil Gift Box'],
  },

  // ------------------------------------------------------------
  // CHARACTER SHOPS
  // ------------------------------------------------------------
  {
    id: 'next-character-010',
    name: 'Disney Mickey & Friends Vintage Jacquard Holiday Knit Jumper',
    brand: 'DISNEY x NEXT',
    price: 48,
    originalPrice: 62,
    category: 'Character Shops',
    department: 'GIRLS',
    badges: ['Exclusive', 'Sale'],
    colors: [
      {
        name: 'Festive Scarlet',
        hex: '#C8102E',
        images: [
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
          'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'Age 3-4', available: true },
      { label: 'Age 5-6', available: true },
      { label: 'Age 7-8', available: true },
      { label: 'Age 9-10', available: true },
      { label: 'Age 11-12', available: false },
    ],
    rating: 4.9,
    reviewCount: 1250,
    description: 'Official Disney licensed retro jacquard Christmas sweater with metallic gold thread accents and rib trim.',
    features: ['Official Disney License', 'Ultra Soft Yarn', 'Metallic Thread Highlights', 'Machine Washable'],
    isBestseller: true,
  },
  {
    id: 'next-character-011',
    name: 'Marvel Avengers Polar Fleece Warm-Up Tracksuit Set',
    brand: 'MARVEL x NEXT',
    price: 54,
    category: 'Character Shops',
    department: 'BOYS',
    badges: ['New Arrival'],
    colors: [
      {
        name: 'Comic Charcoal',
        hex: '#27272A',
        images: [
          'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80',
          'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'Age 4-5', available: true },
      { label: 'Age 6-7', available: true },
      { label: 'Age 8-9', available: true },
      { label: 'Age 10-11', available: true },
    ],
    rating: 4.8,
    reviewCount: 640,
    description: 'Cozy brushed polar fleece hoodie and joggers ensemble featuring subtle tonal Marvel character insignias.',
    features: ['Heavyweight Fleece', 'Elasticated Waist & Rib Cuffs', 'Kangaroo Pocket', 'Durable Print'],
  },

  // ------------------------------------------------------------
  // ELECTRIC THINGS
  // ------------------------------------------------------------
  {
    id: 'next-tech-012',
    name: 'High-Velocity Ionic Sensor Hair Dryer & Styling System',
    brand: 'NEXT PRO TECH',
    price: 159,
    originalPrice: 220,
    category: 'Electric Things',
    department: 'BRANDS',
    badges: ['Sale', 'Best Seller'],
    colors: [
      {
        name: 'Matte Titanium & Rose Gold',
        hex: '#4A4A4A',
        images: [
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'Includes 4 Attachments', available: true },
    ],
    rating: 4.9,
    reviewCount: 910,
    description: 'Brushless 110,000 RPM digital motor with smart temperature microprocessors to eliminate heat damage and lock in shine.',
    features: ['110,000 RPM Digital Motor', 'Smart Thermal Sensor', '4 Magnetic Nozzles', 'Quiet Flow System'],
    isBestseller: true,
  },
  {
    id: 'next-tech-013',
    name: 'Artisan Barista Compact Thermal Espresso & Milk Wand Machine',
    brand: 'NEXT KITCHEN',
    price: 189,
    originalPrice: 249,
    category: 'Electric Things',
    department: 'HOME',
    badges: ['Limited Drop'],
    colors: [
      {
        name: 'Brushed Stainless Chrome',
        hex: '#D1D5DB',
        images: [
          'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: '15-Bar Italian Pump', available: true },
    ],
    rating: 4.8,
    reviewCount: 420,
    description: '15-bar high pressure extraction system with thermo-block instant heating and microfoam steam wand for café drinks at home.',
    features: ['15-Bar Italian Pump', '3-Second Instant Heat', 'Commercial Steam Wand', 'Cup Warmer Plate'],
  },

  // ------------------------------------------------------------
  // CLEARANCE & CHRISTMAS
  // ------------------------------------------------------------
  {
    id: 'next-clearance-014',
    name: '100% Mongolian Cashmere Ribbed Fisherman Beanie & Scarf Set',
    brand: 'NEXT CASHMERE',
    price: 68,
    originalPrice: 140,
    category: 'Clearance',
    department: 'CLEARANCE',
    badges: ['Clearance', 'Sale'],
    colors: [
      {
        name: 'Heather Dove Grey',
        hex: '#9CA3AF',
        images: [
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
          'https://images.unsplash.com/photo-1584735174914-9ebe8e2ce7f1?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'One Size', available: true },
    ],
    rating: 4.9,
    reviewCount: 1102,
    description: 'Sumptuous 2-ply pure Grade-A Mongolian cashmere with ribbed structure. An unbelievable 50%+ clearance discount.',
    features: ['100% Grade-A Cashmere', '2-Ply Pure Yarn', 'Ultra-Soft Handfeel', 'Final Clearance'],
    isBestseller: true,
  },
  {
    id: 'next-christmas-015',
    name: 'Festive Matching Family Flannel Holiday Pajama Sleep Set',
    brand: 'NEXT NIGHTWEAR',
    price: 38,
    originalPrice: 52,
    category: 'Christmas',
    department: 'CHRISTMAS',
    badges: ['Christmas Edit', 'Best Seller'],
    colors: [
      {
        name: 'Royal Stewart Tartan',
        hex: '#B8860B',
        images: [
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    rating: 4.9,
    reviewCount: 2310,
    description: 'Brushed 100% flannel cotton pajama set in classic red and gold holiday plaid. Pockets, piped collar, and drawstring pants.',
    features: ['100% Brushed Flannel', 'Matching Family Sizes', 'Piped Trim Lapel', 'Gift Tied with Ribbon'],
    isBestseller: true,
  },
  {
    id: 'next-baby-016',
    name: 'Baby Organic Cotton Quilted Snowsuit with Fleece Lining',
    brand: 'NEXT BABY',
    price: 45,
    originalPrice: 60,
    category: 'Baby',
    department: 'BABY',
    badges: ['New Arrival'],
    colors: [
      {
        name: 'Pebble Grey',
        hex: '#D1D5DB',
        images: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
          'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
        ],
      },
    ],
    sizes: [
      { label: '0-3M', available: true },
      { label: '3-6M', available: true },
      { label: '6-9M', available: true },
      { label: '9-12M', available: true },
    ],
    rating: 4.9,
    reviewCount: 395,
    description: 'Double zip front snowsuit in water-repellent organic cotton with sherpa fleece hood and fold-over mitts.',
    features: ['Organic Cotton Outer', 'Sherpa Lined Hood', 'Double Front Zippers', 'Fold-Over Mitts'],
  },
];
