import { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { FadeIn } from '@/components/AnimationWrappers';

export default function MenuHub() {
  useEffect(() => {
    document.title = 'Menu — Grodzinski Bakery, Toronto';
    return () => {
      document.title = "Grodzinski Bakery — Toronto's Heritage Kosher Bakery Since 1888";
    };
  }, []);

  return (
    <section className="coming-soon">
      <div className="coming-soon__inner">
        <FadeIn delay={0.1}>
          <Clock size={48} className="coming-soon__icon" aria-hidden="true" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1>Our Menu</h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p className="coming-soon__message">
            Our full menu is coming soon. In the meantime, please visit us
            in-store or give us a call to ask about our selection.
          </p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <a href="/visit" className="coming-soon__cta">
            Visit Us
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
