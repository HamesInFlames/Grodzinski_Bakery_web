import { useEffect } from 'react';
import { FadeIn, ScrollReveal } from '@/components/AnimationWrappers';
import {
  PRICE_GROUPS,
  PRICE_HOLIDAY_SECTIONS,
  type PriceItem,
} from '@/data/priceList';

function PriceRows({ items }: { items: PriceItem[] }) {
  return (
    <ul className="variant-list" role="list">
      {items.map((item) => (
        <li key={item.name} className="variant-row">
          <span className="variant-row__name">{item.name}</span>
          <span className="variant-row__dots" aria-hidden="true" />
          <span className="variant-row__price">{item.price}</span>
          {item.note && (
            <span className="price-list__note">{item.note}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function PriceList() {
  useEffect(() => {
    document.title = 'Price List — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  return (
    <div className="group-page">
      <header className="group-page__header">
        <FadeIn delay={0.1}>
          <h1 className="group-page__title">Price List</h1>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="group-page__tagline">
            Pricing for our menu and holiday favourites. Prices are per item unless
            noted; custom and made-to-order items are quoted on request.
          </p>
        </FadeIn>
      </header>

      <div className="group-page__categories">
        {PRICE_GROUPS.map((group, gi) => (
          <ScrollReveal key={group.id} delay={gi * 0.05}>
            <section className="price-list__group">
              <h2 className="price-list__group-title">{group.title}</h2>
              {group.sections.map((section) => (
                <div key={section.heading} className="category-section">
                  <h3 className="category-section__heading">{section.heading}</h3>
                  {section.note && (
                    <p className="price-list__section-note">{section.note}</p>
                  )}
                  <PriceRows items={section.items} />
                </div>
              ))}
            </section>
          </ScrollReveal>
        ))}

        <ScrollReveal delay={0.05}>
          <section className="price-list__group">
            <h2 className="price-list__group-title">Holidays</h2>
            {PRICE_HOLIDAY_SECTIONS.map((section) => (
              <div key={section.id} className="category-section">
                <h3 className="category-section__heading">{section.title}</h3>
                {section.note && (
                  <p className="price-list__section-note">{section.note}</p>
                )}
                <PriceRows items={section.items} />
              </div>
            ))}
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
