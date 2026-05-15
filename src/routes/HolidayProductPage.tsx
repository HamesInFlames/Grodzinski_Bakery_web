import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '@/data/products';
import { getOccasionBySlug } from '@/data/holidays';

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

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
