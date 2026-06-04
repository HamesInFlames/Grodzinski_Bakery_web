import { useEffect } from 'react';
import { FadeIn } from '@/components/AnimationWrappers';
import {
  PRICE_GROUPS,
  PRICE_HOLIDAY_SECTIONS,
  type PriceItem,
} from '@/data/priceList';

interface PriceCard {
  key: string;
  eyebrow: string;
  heading: string;
  note?: string;
  items: PriceItem[];
}

function buildCards(): PriceCard[] {
  const cards: PriceCard[] = [];
  for (const group of PRICE_GROUPS) {
    for (const section of group.sections) {
      cards.push({
        key: `${group.id}-${section.heading}`,
        eyebrow: group.title,
        heading: section.heading,
        note: section.note,
        items: section.items,
      });
    }
  }
  for (const section of PRICE_HOLIDAY_SECTIONS) {
    cards.push({
      key: `holiday-${section.id}`,
      eyebrow: 'Holidays',
      heading: section.title,
      note: section.note,
      items: section.items,
    });
  }
  return cards;
}

export default function PriceList() {
  useEffect(() => {
    document.title = 'Price List — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  const cards = buildCards();

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

      <div className="price-board">
        {cards.map((card) => (
          <section key={card.key} className="price-card">
            <p className="price-card__eyebrow">{card.eyebrow}</p>
            <h3 className="price-card__heading">{card.heading}</h3>
            {card.note && <p className="price-card__note">{card.note}</p>}
            <ul className="variant-list" role="list">
              {card.items.map((item) => (
                <li key={item.name} className="variant-row">
                  <span className="variant-row__name">{item.name}</span>
                  <span className="variant-row__dots" aria-hidden="true" />
                  <span className="variant-row__price">{item.price}</span>
                  {item.note && <span className="price-list__note">{item.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
