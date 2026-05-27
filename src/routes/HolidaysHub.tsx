import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGroupsBySection, getItemsByGroup, getHolidayMeta } from '@/data/products';
import { ShieldCheck, Award } from 'lucide-react';

export default function HolidaysHub() {
  const holidayGroups = getGroupsBySection('holidays').sort(
    (a, b) => a.order - b.order,
  );

  useEffect(() => {
    document.title = 'Holidays — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  return (
    <div className="holidays-hub">
      <section className="holidays-hub__hero">
        <h1>Holidays</h1>
        <p>
          Traditional baked goods for Jewish holidays and celebrations —
          handcrafted with the same recipes we&rsquo;ve used since 1888.
        </p>
        <div className="menuhub__trust">
          <span className="menuhub__trust-badge">
            <Award size={16} aria-hidden="true" />
            COR-certified kosher
          </span>
          <span className="menuhub__trust-badge">
            <ShieldCheck size={16} aria-hidden="true" />
            Pre-orders available
          </span>
        </div>
      </section>

      <div className="holidays-hub__grid">
        {holidayGroups.map((group) => {
          const meta = getHolidayMeta(group.slug);
          const itemCount = getItemsByGroup(group.slug).length;

          return (
            <Link
              key={group.slug}
              to={`/holidays/${group.slug}`}
              className="holidays-hub__card"
            >
              <h2>{group.name}</h2>
              {meta?.hebrew && (
                <span className="holidays-hub__card-hebrew" lang="he" dir="rtl">
                  {meta.hebrew}
                </span>
              )}
              <p className="holidays-hub__card-desc">
                {meta?.description ?? ''}
              </p>
              <span className="holidays-hub__card-count">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
