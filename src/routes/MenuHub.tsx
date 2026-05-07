import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/products';
import { ShieldCheck, Award } from 'lucide-react';

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

export default function MenuHub() {
  const totalItems = CATEGORIES.reduce((sum, c) => sum + c.itemCount, 0);

  return (
    <div className="menuhub">
      <section className="menuhub__hero">
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
              <ShieldCheck size={16} /> Family bakers since 1888
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
                  src={CATEGORY_IMAGES[cat.slug] || '/images/home/thumbnail_slider.jpg'}
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
