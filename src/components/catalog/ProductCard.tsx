import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import DietaryBadges from './DietaryBadges';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/menu/p/${product.slug}`} className="pcard">
      <div className="pcard__image-wrapper">
        <img
          src="/images/home/thumbnail_slider.jpg"
          alt={product.name}
          className="pcard__image"
          loading="lazy"
          width={400}
          height={500}
        />
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name">{product.name}</h3>
        <p className="pcard__desc">{product.description}</p>
        <div className="pcard__footer">
          <span className="pcard__price">
            {product.price !== null ? `$${product.price.toFixed(2)}` : 'Call'}
          </span>
          <DietaryBadges attributes={product.dietary} size="sm" />
        </div>
      </div>
    </Link>
  );
}
