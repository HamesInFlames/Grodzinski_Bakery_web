import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getGroupBySlug,
  getCategoriesByGroup,
  getItemsByCategory,
  getHolidayMeta,
} from '@/data/products';
import CategorySection from '@/components/menu/CategorySection';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function HolidayGroupPage() {
  const { occasion } = useParams<{ occasion: string }>();
  const group = occasion ? getGroupBySlug(occasion) : undefined;
  const meta = occasion ? getHolidayMeta(occasion) : undefined;
  const categories = group ? getCategoriesByGroup(group.slug) : [];

  useEffect(() => {
    if (group) {
      document.title = `${group.name} — Holidays — Grodzinski Bakery`;
    }
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, [group]);

  if (!group) {
    return (
      <div className="group-page group-page--empty">
        <div className="group-page__not-found">
          <h1>Holiday not found</h1>
          <p>We couldn&rsquo;t find the holiday you&rsquo;re looking for.</p>
          <Link to="/holidays" className="btn btn--secondary">
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
          { label: group.name },
        ]}
      />

      <header className="group-page__header">
        <h1 className="group-page__title">
          {group.name}
          {meta?.hebrew && (
            <span className="group-page__hebrew" lang="he" dir="rtl">
              {meta.hebrew}
            </span>
          )}
        </h1>
        {meta?.description && (
          <p className="group-page__tagline">{meta.description}</p>
        )}
        {meta?.preOrderNotice && (
          <div className="group-page__pre-order">{meta.preOrderNotice}</div>
        )}
      </header>

      {categories.length === 0 ? (
        <div className="group-page__empty">
          <p>Items for {group.name} will be available closer to the holiday.</p>
          <p>Please call us at <a href="tel:9058821350">(905) 882-1350</a> for pre-orders.</p>
        </div>
      ) : (
        <div className="group-page__categories">
          {categories.map((cat) => {
            const items = getItemsByCategory(cat.slug, group.slug);
            return (
              <CategorySection key={cat.slug} category={cat} items={items} />
            );
          })}
        </div>
      )}
    </div>
  );
}
