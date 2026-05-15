export type DietaryAttribute = 'pareve' | 'dairy' | 'contains-egg';

// Extended dietary tags — Carolina will confirm these per-product via the review document.
// Defaults to empty array, which means "no tags assigned yet" (NOT "contains nothing").
export const DIETARY_TAGS = [
  'pareve',
  'dairy',
  'eggs',
  'nuts',
  'sesame',
  'sugar-free',
  'gluten-free',
] as const;
export type DietaryTag = typeof DIETARY_TAGS[number];

// Holiday occasions — these become /holidays/:occasion routes.
export const HOLIDAY_OCCASIONS = [
  { slug: 'rosh-hashanah',  name: 'Rosh Hashanah',              hebrew: 'ראש השנה',  order: 1 },
  { slug: 'sukkot',         name: 'Sukkot',                     hebrew: 'סוכות',     order: 2 },
  { slug: 'chanukah',       name: 'Chanukah',                   hebrew: 'חנוכה',     order: 3 },
  { slug: 'purim',          name: 'Purim',                      hebrew: 'פורים',     order: 4 },
  { slug: 'pesach',         name: 'Pesach',                     hebrew: 'פסח',       order: 5 },
  { slug: 'shavuot',        name: 'Shavuot',                    hebrew: 'שבועות',    order: 6 },
  { slug: 'simchas',        name: 'Simchas & Celebrations',     hebrew: null,        order: 7 },
  { slug: 'fathers-day',    name: "Father's Day",               hebrew: null,        order: 8 },
  { slug: 'mothers-day',    name: "Mother's Day",               hebrew: null,        order: 9 },
  { slug: 'valentines',     name: "Valentine's Day",            hebrew: null,        order: 10 },
  { slug: 'graduation',     name: 'Graduation',                 hebrew: null,        order: 11 },
] as const;
export type OccasionSlug = typeof HOLIDAY_OCCASIONS[number]['slug'];

export type ProductCategory =
  | 'challah-bilkas'
  | 'bread-rolls'
  | 'babkas'
  | 'cakes'
  | 'bundt-cakes'
  | 'loaf-cakes'
  | 'cookies'
  | 'danishes-sweets'
  | 'desserts-petits-fours'
  | 'pies'
  | 'gifts-baskets'
  | 'holiday-seasonal';

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  priceUnit?: string;
  dietary: DietaryAttribute[];
  tags?: string[];
  inStock: boolean;
  sku?: string;
  weight_g?: number;
  dietaryTags?: DietaryTag[];
  occasion?: OccasionSlug;
  hebrew?: string | null;
  isSeasonal?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  slug: ProductCategory;
  name: string;
  shortDescription: string;
  longDescription?: string;
  heroImageSlug?: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'challah-bilkas',
    name: 'Challah & Bilkas',
    shortDescription: 'Braided breads for every Shabbat table',
    heroImageSlug: 'thumbnail_challahs',
    itemCount: 0, // computed at bottom
  },
  {
    slug: 'bread-rolls',
    name: 'Bread & Rolls',
    shortDescription: 'Artisan breads, baked daily',
    heroImageSlug: 'thumbnail_breaks_rolls',
    itemCount: 0,
  },
  {
    slug: 'babkas',
    name: 'Babkas',
    shortDescription: 'Rich, swirled Eastern European sweet breads',
    heroImageSlug: 'thumbnail_babkas',
    itemCount: 0,
  },
  {
    slug: 'cakes',
    name: 'Cakes',
    shortDescription: 'Celebration cakes for every simcha',
    heroImageSlug: 'thumbnail_cakes',
    itemCount: 0,
  },
  {
    slug: 'bundt-cakes',
    name: 'Bundt Cakes',
    shortDescription: 'Classic ring cakes, moist and tender',
    heroImageSlug: 'thumbnail_cakes',
    itemCount: 0,
  },
  {
    slug: 'loaf-cakes',
    name: 'Loaf Cakes',
    shortDescription: 'Sliceable loaves, perfect with coffee',
    heroImageSlug: 'thumbnail_loafcakes',
    itemCount: 0,
  },
  {
    slug: 'cookies',
    name: 'Cookies',
    shortDescription: 'From everyday favourites to decorated treats',
    heroImageSlug: 'thumbnail_cookies',
    itemCount: 0,
  },
  {
    slug: 'danishes-sweets',
    name: 'Danishes & Sweets',
    shortDescription: 'Flaky pastries, baked fresh daily',
    heroImageSlug: 'thumbnail_danishes_sweets',
    itemCount: 0,
  },
  {
    slug: 'desserts-petits-fours',
    name: 'Desserts & Petit Fours',
    shortDescription: 'Bite-sized treats and plated desserts',
    heroImageSlug: 'thumbnail_personal_desserts',
    itemCount: 0,
  },
  {
    slug: 'pies',
    name: 'Pies',
    shortDescription: 'Family-size pies for Shabbat and holidays',
    heroImageSlug: 'thumbnail_pies',
    itemCount: 0,
  },
  {
    slug: 'gifts-baskets',
    name: 'Gifts & Baskets',
    shortDescription: 'Curated bakery gifts for every occasion',
    heroImageSlug: 'thumbnail_gift_basket',
    itemCount: 0,
  },
  {
    slug: 'holiday-seasonal',
    name: 'Holiday & Seasonal Specials',
    shortDescription: 'Traditional treats for Jewish holidays',
    heroImageSlug: 'thumbnail_slider',
    itemCount: 0,
  },
];

// Import generated product data
import { GENERATED_PRODUCTS } from './products.generated';

export const PRODUCTS: Product[] = GENERATED_PRODUCTS;

// Compute item counts
CATEGORIES.forEach((cat) => {
  cat.itemCount = PRODUCTS.filter((p) => p.category === cat.slug).length;
});

// Helpers
export const getProductsByCategory = (cat: ProductCategory) =>
  PRODUCTS.filter((p) => p.category === cat);

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

export const getProductsByOccasion = (occasion: OccasionSlug) =>
  PRODUCTS.filter((p) => p.occasion === occasion);

export const getOccasionBySlug = (slug: string) =>
  HOLIDAY_OCCASIONS.find((o) => o.slug === slug);
