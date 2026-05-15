import { Link } from 'react-router-dom';
import { HOLIDAY_OCCASIONS, PRODUCTS } from '@/data/products';
import { HOLIDAY_OCCASION_META, productsForOccasion } from '@/data/holidays';
import { ShieldCheck, Award } from 'lucide-react';

export default function HolidaysHub() {
  const occasions = [...HOLIDAY_OCCASIONS]
    .sort((a, b) => a.order - b.order);

  return (
    <div className="holidays-hub">
      <title>Holidays — Grodzinski Bakery, Toronto</title>
      <meta name="description" content="Traditional baked goods for Jewish holidays and celebrations. Round challah, honey cakes, sufganiyot, hamantaschen, and more — baked fresh at Grodzinski Bakery." />

      <section className="holidays-hub__hero">
        <div className="holidays-hub__hero-bg">
          <img
            src="/images/coming-soon.png"
            alt=""
            className="holidays-hub__hero-image"
          />
          <div className="holidays-hub__hero-overlay" />
        </div>
        <div className="holidays-hub__hero-inner">
          <h1 className="holidays-hub__title">Holidays</h1>
          <p className="holidays-hub__subtitle">
            Traditional baked goods for Jewish holidays and celebrations —
            handcrafted with the same recipes we&rsquo;ve used since 1888.
          </p>
          <div className="holidays-hub__trust">
            <span className="holidays-hub__trust-item">
              <Award size={16} /> COR-certified kosher
            </span>
            <span className="holidays-hub__trust-item">
              <ShieldCheck size={16} /> Pre-orders available
            </span>
          </div>
        </div>
      </section>

      <section className="holidays-hub__grid-section">
        {/* TODO: Carolina's review will populate occasion→product mappings.
            Until then, some cards may show 0 products. */}
        <div className="holidays-hub__grid">
          {occasions.map((occ) => {
            const meta = HOLIDAY_OCCASION_META[occ.slug];
            const productCount = productsForOccasion(occ.slug, PRODUCTS).length;

            return (
              <Link
                key={occ.slug}
                to={`/holidays/${occ.slug}`}
                className="holidays-hub__card"
              >
                <div className="holidays-hub__card-content">
                  <h2 className="holidays-hub__card-name">{occ.name}</h2>
                  {occ.hebrew && (
                    <span className="holidays-hub__card-hebrew" lang="he" dir="rtl">
                      {occ.hebrew}
                    </span>
                  )}
                  <p className="holidays-hub__card-desc">{meta.description}</p>
                  <span className="holidays-hub__card-count">
                    {productCount} {productCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
