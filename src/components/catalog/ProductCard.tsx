import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import DietaryBadges from './DietaryBadges';

interface Props {
  product: Product;
  linkPrefix?: string;
}

export default function ProductCard({ product, linkPrefix = '/menu/p' }: Props) {
  return (
    <Link to={`${linkPrefix}/${product.slug}`} className="pcard">
      <div className="pcard__image-wrapper">
        <img
          src="/images/coming-soon.png"
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
