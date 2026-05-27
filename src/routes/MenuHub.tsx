import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGroupsBySection, getItemsByGroup } from '@/data/products';
import { ShieldCheck, Award } from 'lucide-react';

export default function MenuHub() {
  const regularGroups = getGroupsBySection('regular').sort((a, b) => a.order - b.order);
  const fridayGroups = getGroupsBySection('friday');
  const allGroups = [...regularGroups, ...fridayGroups];

  const totalItems = allGroups.reduce(
    (sum, g) => sum + getItemsByGroup(g.slug).length,
    0,
  );

  useEffect(() => {
    document.title = 'Menu — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  return (
    <div className="menuhub">
      <section className="menuhub__hero">
        <h1>Our Menu</h1>
        <p>
          {allGroups.length} categories &middot; {totalItems}+ items &middot; 100% nut-free
        </p>
        <div className="menuhub__trust">
          <span className="menuhub__trust-badge">
            <Award size={16} aria-hidden="true" />
            COR-certified kosher
          </span>
          <span className="menuhub__trust-badge">
            <ShieldCheck size={16} aria-hidden="true" />
            Toronto&rsquo;s heritage kosher bakery
          </span>
        </div>
      </section>

      <div className="menuhub__grid">
        {regularGroups.map((group) => {
          const itemCount = getItemsByGroup(group.slug).length;
          return (
            <Link
              key={group.slug}
              to={`/menu/${group.slug}`}
              className="menuhub__card"
            >
              <h2>{group.name}</h2>
              <span className="menuhub__card-count">{itemCount} items</span>
            </Link>
          );
        })}

        {fridayGroups.map((group) => {
          const itemCount = getItemsByGroup(group.slug).length;
          return (
            <Link
              key={group.slug}
              to={`/menu/${group.slug}`}
              className="menuhub__card menuhub__card--shabbat"
            >
              <h2>{group.name}</h2>
              <span className="menuhub__card-count">{itemCount} items</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
