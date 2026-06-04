import { useEffect, useState } from 'react';
import { HOLIDAY_SECTIONS } from '@/data/menuDisplay';
import { ShieldCheck, Award } from 'lucide-react';
import { FadeIn, ScrollReveal } from '@/components/AnimationWrappers';

function HolidaySectionCard({ section }: { section: typeof HOLIDAY_SECTIONS[number] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="holidays-hub__section" id={`holiday-${section.id}`}>
      <h2 className="holidays-hub__section-title">{section.title}</h2>
      <div className="holidays-hub__section-body">
        <div className="holidays-hub__section-photo">
          {!imgError ? (
            <img
              src={`/images/holidays/${section.photo}`}
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
        <ul className="variant-list" role="list">
          {section.items.map((item) => (
            <li key={item} className="variant-row">
              <span className="variant-row__name">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HolidaysHub() {
  useEffect(() => {
    document.title = 'Holidays — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  return (
    <>
      <section className="holidays-hub__hero">
        <div className="holidays-hub__hero-bg">
          <img
            src="/images/home/thumbnail_slider (3).png"
            alt="Freshly baked goods and platters at Grodzinski Bakery"
            className="holidays-hub__hero-image"
          />
          <div className="holidays-hub__hero-overlay" />
        </div>
        <div className="holidays-hub__hero-inner">
          <FadeIn delay={0.1}>
            <h1>Holidays</h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p>
              Traditional baked goods for Jewish holidays and celebrations &mdash;
              handcrafted with the same recipes we&rsquo;ve used since 1888.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
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
          </FadeIn>
        </div>
      </section>

      <div className="holidays-hub">
        {HOLIDAY_SECTIONS.map((section, i) => (
          <ScrollReveal key={section.id} delay={i * 0.05}>
            <HolidaySectionCard section={section} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
