// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import {
  ScrollReveal,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimationWrappers";
import { PhotoSlideshow } from "../components/PhotoSlideshow";
import { SHOWCASE_PHOTOS } from "../data/slideshowPhotos";
import { MENU_GROUPS } from "../data/menuDisplay";
import { GalleryCarousel } from "../components/gallery/GalleryCarousel";
import GoogleMap from "../components/GoogleMap";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  BAKERY_GOOGLE_MAPS_URL,
  BAKERY_PLACE_ID,
  BAKERY_COORDINATES,
  BAKERY_ADDRESS,
  BAKERY_NAME,
} from "../data/bakeryLocation";

export default function Home() {
  const navigate = useNavigate();
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const hours = [
    { day: "Sunday", time: "6:00 AM – 3:00 PM" },
    { day: "Monday", time: "6:00 AM – 4:00 PM" },
    { day: "Tuesday", time: "6:00 AM – 4:00 PM" },
    { day: "Wednesday", time: "6:00 AM – 4:00 PM" },
    { day: "Thursday", time: "6:00 AM – 5:00 PM" },
    { day: "Friday", time: "6:00 AM – 4:00 PM" },
    { day: "Saturday", time: "Closed" },
  ];

  const certifications = [
    { image: "/images/certifications/cor-kosher.png", title: "COR Kosher" },
    { lines: ["Pas Yisroel", "Chalav Yisroel"] },
    { image: "/images/certifications/nut-free-black.png", title: "Nut Free" },
  ];

  // Mirror the menu category selection so the titles always correspond.
  const categoryImages = MENU_GROUPS.map((group) => ({
    name: group.title,
    image: group.image || "/images/home/logo_trensparent.png",
    count: group.sections.reduce((sum, s) => sum + s.items.length, 0),
    href: `/menu/${group.id}`,
  }));

  return (
    <>
      {/* HERO */}
      <section className="hero hero--heritage" aria-labelledby="hero-tagline">
        <div className="hero__inner hero__inner--heritage">
          <FadeIn delay={0.1}>
            <h1 className="hero__logo-wrap">
              <img
                src="/images/home/logo.png"
                alt="Grodzinski Bakery"
                className="hero__logo-img"
              />
              <span id="hero-tagline" className="hero__tagline">
                A Toronto Heritage Bakery &mdash; Since 1888
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="hero__subtitle hero__subtitle--heritage">
              Handcrafted breads, challahs, cakes, and pastries &mdash; baked
              daily in our 100% nut-free facility.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="hero__actions hero__actions--heritage">
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => navigate("/menu")}
              >
                View Our Menu
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CERTIFICATIONS + STOCKISTS \u2014 combined trust band */}
      <section className="section certifications-section">
        <div className="container">
          <StaggerContainer className="certifications-strip" staggerDelay={0.1}>
            {certifications.map((cert, i) => (
              <StaggerItem key={i}>
                <div className="cert-badge">
                  {cert.image ? (
                    <div className="cert-badge__image-wrap">
                      <img
                        src={cert.image}
                        alt={cert.title || ""}
                        className="cert-badge__image"
                      />
                    </div>
                  ) : (
                    <div className="cert-badge__lines">
                      {cert.lines.map((line, j) => (
                        <span key={j} className="cert-badge__line">{line}</span>
                      ))}
                    </div>
                  )}
                  {cert.title && <span className="cert-badge__title">{cert.title}</span>}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="stockists-inline">
            <p className="stockists-eyebrow">Also Available At</p>
            <p className="stockists-list">
              Longo&rsquo;s &middot; Pusateri&rsquo;s &middot; Vince&rsquo;s Market
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section__header">
              <h2 className="section__title">Browse Our Selection</h2>
              <p className="section__subtitle">
                From traditional challahs to custom celebration cakes, explore
                our full range of handcrafted baked goods.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid--3" staggerDelay={0.1}>
            {categoryImages.map((cat, i) => (
              <StaggerItem key={i}>
                <div
                  className="category-card"
                  onClick={() => navigate(cat.href)}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="category-card__image"
                  />
                  <div className="category-card__overlay">
                    <h3 className="category-card__name">{cat.name}</h3>
                    <span className="category-card__count">{cat.count} varieties</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
            <div className="text-center mt-8">
              <button
                className="btn btn--primary btn--lg"
                onClick={() => navigate("/menu")}
              >
                View Full Menu
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CUSTOM ORDERS CTA + GALLERY */}
      <section className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <div className="section__header">
              <h2 className="section__title">Custom Cakes & Cookies</h2>
              <p className="section__subtitle">
                Planning a wedding, bar mitzvah, baby shower, or special celebration?
                Our custom creations are made to order and designed to delight.
              </p>
            </div>
          </ScrollReveal>

          <div className="gallery-carousel-shell">
            <GalleryCarousel />
          </div>

          <ScrollReveal delay={0.2}>
            <div className="gallery-cta gallery-cta--embedded">
              <div className="gallery-cta__inner">
                <h2>Ready to Order?</h2>
                <p>
                  Contact us to discuss your custom cookie or cake order.
                  We'll bring your vision to life!
                </p>
                <div className="gallery-cta__actions">
                  <a href="/visit" className="btn btn--primary">Contact Us</a>
                  <a href="tel:9058821350" className="btn btn--secondary">Call (905) 882-1350</a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="about-story about-story--reverse">
        <div className="about-story__inner">
          <ScrollReveal direction="right">
            <div className="about-story__media">
              <PhotoSlideshow photos={SHOWCASE_PHOTOS} interval={5000} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <div className="about-story__body">
              <h2>A Toronto Tradition Since 1888</h2>
              <p>
                What started as a small neighbourhood bakery has grown into a
                beloved institution across the Greater Toronto Area. From the
                earliest morning hours, our bakers are kneading dough, braiding
                challahs, and hand-rolling pastries — just as the bakery has
                done since 1888.
              </p>
              <p>
                We believe in simplicity: fresh ingredients, traditional techniques,
                and no artificial preservatives. Every loaf of rye, every round
                challah, and every buttery danish is made by hand using traditional
                recipes rooted in over a century of baking.
              </p>
              <button
                className="btn btn--secondary"
                onClick={() => navigate("/about")}
                style={{ marginTop: '8px' }}
              >
                Our Story
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal direction="up">
            <div className="contact-card contact-card--horizontal">
              <div className="contact-card__content">
                <h3 className="contact-card__title">Visit Our Bakery</h3>
                <p className="contact-card__subtitle">
                  Stop by for fresh bread, cakes, and pastries — or call ahead
                  for custom orders.
                </p>

                <div className="visit-details visit-details--stacked">
                  <div className="visit-details__card">
                    <div className="visit-details__icon"><MapPin size={22} /></div>
                    <strong>Address</strong>
                    <p>1118 Centre St #3, Thornhill, ON L4J 7R9</p>
                  </div>

                  <div className="visit-details__card">
                    <div className="visit-details__icon"><Phone size={22} /></div>
                    <strong>Phone</strong>
                    <p><a href="tel:9058821350" className="visit-link">(905) 882-1350</a></p>
                  </div>

                  <div className="visit-details__card visit-details__card--hours">
                    <div className="visit-hours-head">
                      <div className="visit-details__icon"><Clock size={22} /></div>
                      <strong>Hours</strong>
                    </div>
                    <div className="visit-hours-grid">
                      {hours.map(({ day, time }) => {
                        const isClosed = time.toLowerCase() === 'closed';
                        const isToday = day === todayName;
                        return (
                          <div
                            key={day}
                            className={`visit-hours-row ${isClosed ? 'visit-hours-row--closed' : ''} ${isToday ? 'visit-hours-row--today' : ''}`}
                          >
                            <span className="visit-hours-day">
                              {day}
                              {isToday && <span className="visit-hours-today-tag">Today</span>}
                            </span>
                            <span className="visit-hours-time">{time}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <a
                  href={BAKERY_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card__cta"
                >
                  <Navigation size={16} /> Get Directions
                </a>
              </div>
              <div className="contact-card__map">
                <GoogleMap
                  address={BAKERY_ADDRESS}
                  title={`${BAKERY_NAME} Location`}
                  height="100%"
                  placeId={BAKERY_PLACE_ID}
                  coordinates={BAKERY_COORDINATES}
                  placeName={BAKERY_NAME}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
