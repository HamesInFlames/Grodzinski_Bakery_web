import type { Product } from '@/data/products';
import { Phone } from 'lucide-react';

interface Props {
  product: Product;
  size?: 'compact' | 'full';
}

export default function ProductActions({ product: _product, size = 'compact' }: Props) {
  if (size === 'compact') return null;

  return (
    <div className="product-actions">
      <a href="tel:9058821350" className="product-actions__cta">
        <Phone size={18} />
        Call to order: (905) 882-1350
      </a>
    </div>
  );
}
