import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/products';
import { ShieldCheck, Award } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'challah-bilkas': '/images/coming-soon.png',
  'bread-rolls': '/images/coming-soon.png',
  babkas: '/images/coming-soon.png',
  cakes: '/images/coming-soon.png',
  'bundt-cakes': '/images/coming-soon.png',
  'loaf-cakes': '/images/coming-soon.png',
  cookies: '/images/coming-soon.png',
  'danishes-sweets': '/images/coming-soon.png',
  'desserts-petits-fours': '/images/coming-soon.png',
  pies: '/images/coming-soon.png',
  'gifts-baskets': '/images/coming-soon.png',
  'holiday-seasonal': '/images/coming-soon.png',
};

export default function MenuHub() {
  const totalItems = CATEGORIES.reduce((sum, c) => sum + c.itemCount, 0);

  return (
    <div className="menuhub">
      <section className="menuhub__hero">
        <div className="menuhub__hero-bg">
          <img
            src="/images/home/thumbnail_slider (4).png"
            alt=""
            className="menuhub__hero-image"
          />
          <div className="menuhub__hero-overlay" />
        </div>
        <div className="menuhub__hero-inner">
          <h1 className="menuhub__title">Our Menu</h1>
          <p className="menuhub__subtitle">
            {CATEGORIES.length} categories · {totalItems}+ items · 100% nut-free
          </p>
          <div className="menuhub__trust">
            <span className="menuhub__trust-item">
              <Award size={16} /> COR-certified kosher
            </span>
            <span className="menuhub__trust-item">
              <ShieldCheck size={16} /> Toronto's heritage kosher bakery
            </span>
          </div>
        </div>
      </section>

      <section className="menuhub__grid-section">
        <div className="menuhub__grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/menu/${cat.slug}`}
              className="menuhub__card"
            >
              <div className="menuhub__card-image">
                <img
                  src={CATEGORY_IMAGES[cat.slug] || '/images/coming-soon.png'}
                  alt={cat.name}
                  loading="lazy"
                />
              </div>
              <div className="menuhub__card-content">
                <h2 className="menuhub__card-name">{cat.name}</h2>
                <p className="menuhub__card-count">{cat.itemCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
