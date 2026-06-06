import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOLIDAY_SECTIONS } from '@/data/menuDisplay';
import { ShieldCheck, Award } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/AnimationWrappers';

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

      <div className="holidays-hub holidays-hub__grid-section">
        <StaggerContainer className="holidays-hub__grid" staggerDelay={0.08}>
          {HOLIDAY_SECTIONS.map((section) => (
            <StaggerItem key={section.id}>
              <Link to={`/holidays/${section.id}`} className="holidays-hub__card">
                <div className="holidays-hub__card-image">
                  <img
                    src={section.image || '/images/home/logo_trensparent.png'}
                    alt={section.title}
                    loading="lazy"
                  />
                </div>
                <div className="holidays-hub__card-content">
                  <h2 className="holidays-hub__card-name">{section.title}</h2>
                  {section.hebrew && (
                    <span className="holidays-hub__card-hebrew" lang="he" dir="rtl">
                      {section.hebrew}
                    </span>
                  )}
                  <span className="holidays-hub__card-count">
                    {section.items.length}{' '}
                    {section.items.length === 1 ? 'specialty' : 'specialties'}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </>
  );
}
