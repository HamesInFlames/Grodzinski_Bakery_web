import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHolidaySectionById } from '@/data/menuDisplay';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ScrollReveal } from '@/components/AnimationWrappers';
import ProductShowcase from '@/components/menu/ProductShowcase';

export default function HolidayDetailPage() {
  const { occasion } = useParams<{ occasion: string }>();
  const section = occasion ? getHolidaySectionById(occasion) : undefined;

  useEffect(() => {
    if (section) {
      document.title = `${section.title} — Holidays — Grodzinski Bakery`;
    }
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, [section]);

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

      <div className="group-page__showcases">
        <ScrollReveal>
          <ProductShowcase
            heading="Our Selection"
            flavours={section.items}
            groupId={section.id}
            assortedImage={section.image}
            imageBase="/images/holidays"
            flavourNoun="specialty"
          />
        </ScrollReveal>
      </div>
    </div>
  );
}
