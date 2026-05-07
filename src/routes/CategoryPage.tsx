import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { getCategoryBySlug, getProductsByCategory, CATEGORIES } from '@/data/products';
import type { Product } from '@/data/products';
import { useFilterStore } from '@/stores/filterStore';
import ProductGrid from '@/components/catalog/ProductGrid';
import FilterChipBar from '@/components/filters/FilterChipBar';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ShieldCheck } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'challah-bilkas': '/images/home/thumbnail_challahs.jpg',
  'bread-rolls': '/images/home/thumbnail_breaks_rolls.jpg',
  babkas: '/images/home/thumbnail_babkas.jpg',
  cakes: '/images/home/thumbnail_cakes.jpg',
  'bundt-cakes': '/images/home/thumbnail_cakes.jpg',
  'loaf-cakes': '/images/home/thumbnail_loafcakes.jpg',
  cookies: '/images/home/thumbnail_cookies.jpg',
  'danishes-sweets': '/images/home/thumbnail_danishes_sweets.jpg',
  'desserts-petits-fours': '/images/home/thumbnail_personal_desserts.jpg',
  pies: '/images/home/thumbnail_pies.jpg',
  'gifts-baskets': '/images/home/thumbnail_gift_basket.jpg',
  'holiday-seasonal': '/images/home/thumbnail_slider.jpg',
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const cat = getCategoryBySlug(category || '');
  const allProducts = getProductsByCategory((category || '') as any);
  const { activeFilters, searchQuery } = useFilterStore();

  const fuse = useMemo(
    () =>
      new Fuse(allProducts, {
        keys: ['name', 'description', 'tags'],
        threshold: 0.35,
      }),
    [allProducts],
  );

  const filtered = useMemo(() => {
    let result: Product[] = allProducts;

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (activeFilters.length > 0) {
      result = result.filter((p) =>
        activeFilters.every((f) => p.dietary.includes(f)),
      );
    }

    return result;
  }, [allProducts, activeFilters, searchQuery, fuse]);

  if (!cat) {
    return (
      <div className="category-page__empty">
        <h1>Category not found</h1>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  const otherCategories = CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 3);

  return (
    <div className="category-page">
      <Breadcrumb
        items={[
          { label: 'Menu', href: '/menu' },
          { label: cat.name },
        ]}
      />

      <section className="category-page__hero">
        <div className="category-page__hero-image">
          <img
            src={CATEGORY_IMAGES[cat.slug] || '/images/home/thumbnail_slider.jpg'}
            alt={cat.name}
          />
          <div className="category-page__hero-overlay" />
        </div>
        <div className="category-page__hero-content">
          <h1>{cat.name}</h1>
          <p>{cat.shortDescription}</p>
          <span className="category-page__guarantee">
            <ShieldCheck size={16} /> 100% Nut-Free Facility
          </span>
        </div>
      </section>

      <FilterChipBar />

      <section className="category-page__products">
        <ProductGrid
          products={filtered}
          categoryName={cat.name}
        />
      </section>

      <section className="category-page__related">
        <h2>Browse Other Categories</h2>
        <div className="category-page__related-grid">
          {otherCategories.map((c) => (
            <Link
              key={c.slug}
              to={`/menu/${c.slug}`}
              className="category-page__related-card"
            >
              <img
                src={CATEGORY_IMAGES[c.slug] || '/images/home/thumbnail_slider.jpg'}
                alt={c.name}
                loading="lazy"
              />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
