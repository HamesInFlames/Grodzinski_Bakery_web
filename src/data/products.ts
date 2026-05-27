// ─── New data model types ────────────────────────────────────────────────────

export type DietaryLabel = 'pareve' | 'dairy';

export type MenuSection = 'regular' | 'friday' | 'holidays';

export interface MenuGroup {
  slug: string;
  name: string;
  section: MenuSection;
  tagline?: string;
  hebrew?: string;
  order: number;
  heroImage?: string;
}

export interface MenuCategory {
  slug: string;
  name: string;
  groupSlug: string;
  order: number;
  fallbackImage?: string;
}

export interface MenuItem {
  slug: string;
  name: string;
  categorySlug: string;
  groupSlug: string;
  section: MenuSection;
  price: number | null;
  priceUnit?: string;
  taxable: boolean;
  description?: string;
  squareToken: string;
  image?: string;
  hasPhoto: boolean;
}

export interface HolidayMeta {
  slug: string;
  name: string;
  hebrew: string;
  order: number;
  description: string;
  preOrderNotice?: string;
}

// ─── Generated data imports ──────────────────────────────────────────────────

import { GENERATED_GROUPS, GENERATED_CATEGORIES, GENERATED_ITEMS } from './products.generated';

// ─── Runtime exports ─────────────────────────────────────────────────────────

export const MENU_GROUPS: MenuGroup[] = GENERATED_GROUPS;
export const MENU_CATEGORIES: MenuCategory[] = GENERATED_CATEGORIES;
export const MENU_ITEMS: MenuItem[] = GENERATED_ITEMS;

// ─── Helper functions ────────────────────────────────────────────────────────

export const getGroupBySlug = (slug: string) =>
  MENU_GROUPS.find(g => g.slug === slug);

export const getGroupsBySection = (section: MenuSection) =>
  MENU_GROUPS.filter(g => g.section === section);

export const getCategoriesByGroup = (groupSlug: string) =>
  MENU_CATEGORIES.filter(c => c.groupSlug === groupSlug).sort((a, b) => a.order - b.order);

export const getItemsByCategory = (categorySlug: string, groupSlug: string) =>
  MENU_ITEMS.filter(i => i.categorySlug === categorySlug && i.groupSlug === groupSlug);

export const getItemsByGroup = (groupSlug: string) =>
  MENU_ITEMS.filter(i => i.groupSlug === groupSlug);

export const getItemBySlug = (slug: string) =>
  MENU_ITEMS.find(i => i.slug === slug);

// ─── Holiday metadata ────────────────────────────────────────────────────────

export const HOLIDAY_META: Record<string, HolidayMeta> = {
  'rosh-hashanah': {
    slug: 'rosh-hashanah',
    name: 'Rosh Hashanah',
    hebrew: 'ראש השנה',
    order: 1,
    description: 'Round challah, honey cakes, and traditional sweets for the Jewish New Year.',
    preOrderNotice: 'Pre-orders close 48 hours before erev Rosh Hashanah.',
  },
  sukkot: {
    slug: 'sukkot',
    name: 'Sukkot',
    hebrew: 'סוכות',
    order: 2,
    description: 'Festive baked goods to enjoy in the sukkah with family and friends.',
    preOrderNotice: 'Pre-orders close 48 hours before erev Sukkot.',
  },
  'yom-kippur': {
    slug: 'yom-kippur',
    name: 'Yom Kippur',
    hebrew: 'יום כיפור',
    order: 3,
    description: 'Traditional baked goods to break the fast and celebrate the holiest day of the year.',
    preOrderNotice: 'Pre-orders close 48 hours before erev Yom Kippur.',
  },
  'simchat-torah': {
    slug: 'simchat-torah',
    name: 'Simchat Torah',
    hebrew: 'שמחת תורה',
    order: 4,
    description: 'Festive treats and baked goods to celebrate the completion of the Torah reading cycle.',
  },
  hanukkah: {
    slug: 'hanukkah',
    name: 'Hanukkah',
    hebrew: 'חנוכה',
    order: 5,
    description: 'Sufganiyot, decorated cookies, and festive treats for the Festival of Lights.',
  },
  purim: {
    slug: 'purim',
    name: 'Purim',
    hebrew: 'פורים',
    order: 6,
    description: 'Hamantaschen, mishloach manot, and themed treats for Purim celebrations.',
  },
  shavuot: {
    slug: 'shavuot',
    name: 'Shavuot',
    hebrew: 'שבועות',
    order: 7,
    description: 'Traditional cheesecakes and dairy treats for the Festival of Weeks.',
  },
  celebrations: {
    slug: 'celebrations',
    name: 'Celebrations',
    hebrew: '',
    order: 8,
    description: 'Decorated cookies and treats for Valentine\'s Day, Mother\'s Day, Father\'s Day, and more.',
  },
};

export const getHolidayMeta = (slug: string): HolidayMeta | undefined =>
  HOLIDAY_META[slug];

// ─── Backward compatibility (deprecated — will be removed after component migration) ───

export type DietaryAttribute = 'pareve' | 'dairy';

export const DIETARY_TAGS = ['pareve', 'dairy'] as const;
export type DietaryTag = (typeof DIETARY_TAGS)[number];

export type OccasionSlug = string;
export const HOLIDAY_OCCASIONS = Object.values(HOLIDAY_META).map(h => ({
  slug: h.slug,
  name: h.name,
  hebrew: h.hebrew,
  order: h.order,
}));

export type ProductCategory = string;

export type Product = MenuItem & {
  category: string;
  dietary: DietaryAttribute[];
  tags?: string[];
  inStock: boolean;
  occasion?: string;
  isSeasonal?: boolean;
};

export interface Category {
  slug: string;
  name: string;
  shortDescription: string;
  heroImageSlug?: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = MENU_GROUPS
  .filter(g => g.section === 'regular')
  .map(g => ({
    slug: g.slug,
    name: g.name,
    shortDescription: g.tagline || '',
    itemCount: MENU_ITEMS.filter(i => i.groupSlug === g.slug).length,
  }));

export const PRODUCTS: Product[] = MENU_ITEMS.map(item => ({
  ...item,
  category: item.groupSlug,
  dietary: [] as DietaryAttribute[],
  tags: [],
  inStock: true,
}));

export const getProductsByCategory = (cat: string) =>
  PRODUCTS.filter(p => p.category === cat);

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find(p => p.slug === slug);

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find(c => c.slug === slug);

export const getProductsByOccasion = (occasion: string) =>
  PRODUCTS.filter(p => p.groupSlug === occasion);

export const getOccasionBySlug = (slug: string) =>
  HOLIDAY_OCCASIONS.find(o => o.slug === slug);

export const CATEGORY_VIDEO_MAP: Record<string, string> = {};
export function getVideoForCategory(_slug: string): null { return null; }
