import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMenuGroupById } from '@/data/menuDisplay';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ScrollReveal } from '@/components/AnimationWrappers';

export default function GroupPage() {
  const { group: groupId } = useParams<{ group: string }>();
  const group = groupId ? getMenuGroupById(groupId) : undefined;
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (group) {
      document.title = `${group.title} — Grodzinski Bakery, Toronto`;
    }
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, [group]);

  useEffect(() => {
    setImgError(false);
  }, [groupId]);

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
          { label: group.title },
        ]}
      />

      <header className="group-page__header">
        <h1 className="group-page__title">{group.title}</h1>
      </header>

      <div className="group-page__photo">
        {!imgError ? (
          <img
            src={`/images/menu/${group.photo}`}
            alt={group.title}
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
        {group.sections.map((section, i) => (
          <ScrollReveal key={section.heading} delay={i * 0.05}>
            <section className="category-section">
              {group.sections.length > 1 && (
                <h3 className="category-section__heading">{section.heading}</h3>
              )}
              <ul className="variant-list" role="list">
                {section.items.map((item) => (
                  <li key={item} className="variant-row">
                    <span className="variant-row__name">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
