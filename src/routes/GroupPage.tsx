import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getGroupBySlug,
  getCategoriesByGroup,
  getItemsByCategory,
} from '@/data/products';
import CategorySection from '@/components/menu/CategorySection';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function GroupPage() {
  const { group: groupSlug } = useParams<{ group: string }>();
  const group = groupSlug ? getGroupBySlug(groupSlug) : undefined;
  const categories = group ? getCategoriesByGroup(group.slug) : [];

  useEffect(() => {
    if (group) {
      document.title = `${group.name} — Grodzinski Bakery, Toronto`;
    }
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, [group]);

  if (!group) {
    return (
      <div className="group-page group-page--empty">
        <div className="group-page__not-found">
          <h1>Group not found</h1>
          <p>We couldn&rsquo;t find the menu group you&rsquo;re looking for.</p>
          <Link to="/menu" className="group-page__back-link">
            &larr; Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group-page">
      <Breadcrumb
        items={[
          { label: 'Menu', href: '/menu' },
          { label: group.name },
        ]}
      />

      <header className="group-page__header">
        <h1 className="group-page__title">{group.name}</h1>
        {group.tagline && (
          <p className="group-page__tagline">{group.tagline}</p>
        )}
      </header>

      <div className="group-page__categories">
        {categories.map((cat) => {
          const items = getItemsByCategory(cat.slug, group.slug);
          return (
            <CategorySection key={cat.slug} category={cat} items={items} />
          );
        })}
      </div>
    </div>
  );
}
