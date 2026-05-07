import type { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { useFilterStore } from '@/stores/filterStore';

interface Props {
  products: Product[];
  categoryName?: string;
}

export default function ProductGrid({ products, categoryName }: Props) {
  const { clearFilters } = useFilterStore();

  if (products.length === 0) {
    return (
      <div className="pgrid__empty">
        <p>
          No {categoryName ? categoryName.toLowerCase() : 'products'} match
          these filters.
        </p>
        <button onClick={clearFilters} className="pgrid__clear-btn">
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="pgrid">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
