import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHolidaySectionById } from '@/data/menuDisplay';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ScrollReveal } from '@/components/AnimationWrappers';

export default function HolidayDetailPage() {
  const { occasion } = useParams<{ occasion: string }>();
  const section = occasion ? getHolidaySectionById(occasion) : undefined;
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (section) {
      document.title = `${section.title} — Holidays — Grodzinski Bakery`;
    }
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, [section]);

  useEffect(() => {
    setImgError(false);
  }, [occasion]);

  if (!section) {
    return (
      <div className="group-page group-page--empty">
        <div className="group-page__not-found">
          <h1>Holiday not found</h1>
          <p>We couldn&rsquo;t find the holiday you&rsquo;re looking for.</p>
          <Link to="/holidays" className="group-page__back-link">
            &larr; Back to Holidays
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group-page">
      <Breadcrumb
        items={[
          { label: 'Holidays', href: '/holidays' },
          { label: section.title },
        ]}
      />

      <header className="group-page__header">
        <h1 className="group-page__title">
          {section.title}
          {section.hebrew && (
            <span className="group-page__hebrew" lang="he" dir="rtl">
              {section.hebrew}
            </span>
          )}
        </h1>
        <Link to="/price-list" className="group-page__pricelink">
          View Price List &rarr;
        </Link>
      </header>

      <div className="group-page__photo">
        {section.image && !imgError ? (
          <img
            src={section.image}
            alt={section.title}
            className="group-page__hero-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="group-page__photo-placeholder" aria-hidden="true">
            <img
              src="/images/home/logo_trensparent.png"
              alt=""
              className="group-page__empty-brand"
            />
          </div>
        )}
      </div>

      <div className="group-page__categories">
        <ScrollReveal>
          <section className="category-section">
            <ul className="variant-list" role="list">
              {section.items.map((item) => (
                <li key={item} className="variant-row">
                  <span className="variant-row__name">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
