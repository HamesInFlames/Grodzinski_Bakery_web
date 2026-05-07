import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getProductsByCategory, getCategoryBySlug } from '@/data/products';
import DietaryBadges from '@/components/catalog/DietaryBadges';
import ProductActions from '@/components/catalog/ProductActions';
import ProductCard from '@/components/catalog/ProductCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="product-page__empty">
        <h1>Product not found</h1>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const allergens: string[] = [];
  if (product.dietary.includes('contains-egg')) allergens.push('Egg');
  if (product.dietary.includes('dairy')) allergens.push('Dairy');
  allergens.push('Wheat');

  return (
    <div className="product-page">
      <Breadcrumb
        items={[
          { label: 'Menu', href: '/menu' },
          { label: category?.name || 'Category', href: `/menu/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="product-page__main">
        <div className="product-page__gallery">
          <div className="product-page__image-container">
            <img
              src={
                product.imageSlug
                  ? `/images/products/${product.imageSlug}.jpg`
                  : '/images/home/thumbnail_slider.jpg'
              }
              alt={product.name}
              className="product-page__image"
            />
          </div>
        </div>

        <div className="product-page__details">
          <h1 className="product-page__title">{product.name}</h1>
          {category && (
            <p className="product-page__heritage">
              From our {category.name} collection · Bakers since 1888
            </p>
          )}

          <p className="product-page__price">
            {product.price !== null ? `$${product.price.toFixed(2)}` : 'Call for pricing'}
            {product.priceUnit && (
              <span className="product-page__price-unit"> / {product.priceUnit}</span>
            )}
          </p>

          <p className="product-page__description">{product.description}</p>

          <DietaryBadges attributes={product.dietary} size="md" />

          <p className="product-page__allergens">
            <strong>Contains:</strong> {allergens.join(', ')}
          </p>

          <ProductActions product={product} size="full" />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="product-page__related">
          <h2>You May Also Like</h2>
          <div className="product-page__related-scroll">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
