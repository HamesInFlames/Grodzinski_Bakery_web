import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductBySlug, getProductsByOccasion } from '@/data/products';
import type { OccasionSlug } from '@/data/products';
import { getOccasionBySlug } from '@/data/holidays';
import DietaryBadges from '@/components/catalog/DietaryBadges';
import ProductActions from '@/components/catalog/ProductActions';
import ProductCard from '@/components/catalog/ProductCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function HolidayProductPage() {
  const { occasion, slug } = useParams<{ occasion: string; slug: string }>();
  const product = getProductBySlug(slug || '');
  const meta = getOccasionBySlug(occasion || '');

  if (!product || !meta) {
    return (
      <div className="product-page__empty">
        <h1>Product not found</h1>
        <Link to="/holidays">Back to Holidays</Link>
      </div>
    );
  }

  const relatedProducts = getProductsByOccasion(occasion as OccasionSlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const allergens: string[] = [];
  if (product.dietary.includes('contains-egg')) allergens.push('Egg');
  if (product.dietary.includes('dairy')) allergens.push('Dairy');
  allergens.push('Wheat');

  const description = product.description || '';
  const sentenceBreak = description.search(/[.!?](\s|$)/);
  const lede = sentenceBreak >= 0 ? description.slice(0, sentenceBreak + 1).trim() : description.trim();
  const body = sentenceBreak >= 0 ? description.slice(sentenceBreak + 1).trim() : '';

  useEffect(() => {
    document.title = `${product.name} — ${meta.name} — Grodzinski Bakery`;
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, [product.name, meta.name]);

  return (
    <div className="product-page">

      <Breadcrumb
        items={[
          { label: 'Holidays', href: '/holidays' },
          { label: meta.name, href: `/holidays/${occasion}` },
          { label: product.name },
        ]}
      />

      <div className="product-page__main">
        <div className="product-page__gallery">
          <div className="product-page__image-container">
            <img
              src="/images/coming-soon.png"
              alt={product.name}
              className="product-page__image"
            />
          </div>
        </div>

        <div className="product-page__details">
          <h1 className="product-page__title">{product.name}</h1>
          <p className="product-page__heritage">
            {meta.name} · Bakers since 1888
          </p>

          <p className="product-page__price">
            {product.price !== null ? `$${product.price.toFixed(2)}` : 'Call for pricing'}
            {product.priceUnit && (
              <span className="product-page__price-unit"> / {product.priceUnit}</span>
            )}
          </p>

          {lede && <p className="product-page__description-lede">{lede}</p>}
          {body && <p className="product-page__description">{body}</p>}

          <DietaryBadges attributes={product.dietary} size="md" />

          {allergens.length > 0 && (
            <p className="product-page__allergens">
              <strong>Contains:</strong> {allergens.join(', ')}
            </p>
          )}

          <ProductActions product={product} size="full" />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="product-page__related">
          <h2>More for {meta.name}</h2>
          <div className="product-page__related-scroll">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                linkPrefix={`/holidays/${occasion}/p`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
