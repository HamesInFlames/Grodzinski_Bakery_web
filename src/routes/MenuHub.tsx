import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MENU_GROUPS } from '@/data/menuDisplay';
import { ShieldCheck, Award } from 'lucide-react';
import { FadeIn } from '@/components/AnimationWrappers';

export default function MenuHub() {
  useEffect(() => {
    document.title = 'Menu — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  return (
    <>
      <section className="menuhub__hero">
        <div className="menuhub__hero-bg">
          <img
            src="/images/home/thumbnail_slider (3).png"
            alt="An assortment of freshly baked goods at Grodzinski Bakery"
            className="menuhub__hero-image"
          />
          <div className="menuhub__hero-overlay" />
        </div>
        <div className="menuhub__hero-inner">
          <FadeIn delay={0.1}>
            <h1>Our Menu</h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p>
              {MENU_GROUPS.length} categories &middot; 100% nut-free
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
                Toronto&rsquo;s heritage kosher bakery
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="menuhub">
        <div className="menuhub__grid">
          {MENU_GROUPS.map((group) => (
            <Link
              key={group.id}
              to={`/menu/${group.id}`}
              className="menuhub__card"
            >
              <h2>{group.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
