import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import type { OccasionSlug } from '@/data/products';
import { getOccasionBySlug, productsForOccasion } from '@/data/holidays';
import { useFilterStore } from '@/stores/filterStore';
import ProductGrid from '@/components/catalog/ProductGrid';
import FilterChipBar from '@/components/filters/FilterChipBar';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ShieldCheck } from 'lucide-react';

export default function OccasionPage() {
  const { occasion } = useParams<{ occasion: string }>();
  const meta = getOccasionBySlug(occasion || '');
  const allProducts = useMemo(
    () => productsForOccasion((occasion || '') as OccasionSlug, PRODUCTS),
    [occasion],
  );
  const { activeFilters } = useFilterStore();

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return allProducts;
    return allProducts.filter((p) =>
      activeFilters.every((f) => p.dietary.includes(f)),
    );
  }, [allProducts, activeFilters]);

  if (!meta) {
    return (
      <div className="category-page__empty">
        <h1>Occasion not found</h1>
        <Link to="/holidays">Back to Holidays</Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      <title>{meta.name} — Grodzinski Bakery, Toronto</title>
      <meta name="description" content={meta.description} />

      <Breadcrumb
        items={[
          { label: 'Holidays', href: '/holidays' },
          { label: meta.name },
        ]}
      />

      <section className="category-page__hero">
        <div className="category-page__hero-image">
          <img
            src="/images/coming-soon.png"
            alt={meta.name}
          />
          <div className="category-page__hero-overlay" />
        </div>
        <div className="category-page__hero-content">
          <h1>
            {meta.name}
            {meta.hebrew && (
              <>
                {' '}
                <span lang="he" dir="rtl" className="occasion-page__hebrew">
                  {meta.hebrew}
                </span>
              </>
            )}
          </h1>
          <p>{meta.description}</p>
          {meta.preOrderNotice && (
            <p className="occasion-page__notice">{meta.preOrderNotice}</p>
          )}
          <span className="category-page__guarantee">
            <ShieldCheck size={16} /> 100% Nut-Free Facility
          </span>
        </div>
      </section>

      <FilterChipBar />

      <section className="category-page__products">
        <ProductGrid
          products={filtered}
          categoryName={meta.name}
          linkPrefix={`/holidays/${occasion}/p`}
        />
      </section>
    </div>
  );
}
