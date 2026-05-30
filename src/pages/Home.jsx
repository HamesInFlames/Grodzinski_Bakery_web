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
import { GalleryCarousel } from "../components/gallery/GalleryCarousel";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const certifications = [
    { image: "/images/certifications/cor-kosher.png", title: "COR Kosher" },
    { lines: ["Pas Yisroel", "Chalav Yisroel"] },
    { image: "/images/certifications/nut-free-black.png", title: "Nut Free" },
  ];

  const categoryImages = [
    { name: "Challah & Bilkas", image: "/images/home/thumbnail_challahs.png", count: 14 },
    { name: "Cakes", image: "/images/home/thumbnail_cakes.png", count: 20 },
    { name: "Cookies", image: "/images/home/thumbnail_cookies.png", count: 30 },
    { name: "Babkas", image: "/images/home/thumbnail_babkas.png", count: 10 },
    { name: "Breads", image: "/images/home/thumbnail_breaks_rolls.png", count: 17 },
    { name: "Pastries", image: "/images/home/thumbnail_danishes_sweets.png", count: 16 },
  ];

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

      {/* CERTIFICATIONS */}
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
                  onClick={() => navigate("/menu")}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="category-card__image"
                  />
                  <div className="category-card__overlay">
                    <h3 className="category-card__name">{cat.name}</h3>
                    <span className="category-card__count">{cat.count}+ items</span>
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

                <div className="contact-card__row">
                  <div className="contact-card__item">
                    <div className="contact-card__icon"><MapPin size={20} /></div>
                    <div>
                      <div className="contact-card__label">Address</div>
                      <div className="contact-card__value">
                        1118 Centre St #3<br />
                        Thornhill, ON L4J 7R9
                      </div>
                    </div>
                  </div>

                  <div className="contact-card__item">
                    <div className="contact-card__icon"><Phone size={20} /></div>
                    <div>
                      <div className="contact-card__label">Phone</div>
                      <div className="contact-card__value">
                        <a href="tel:9058821350">(905) 882-1350</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card__item contact-card__item--hours">
                  <div className="contact-card__icon"><Clock size={20} /></div>
                  <div>
                    <div className="contact-card__label">Hours</div>
                    <div className="contact-card__hours-grid">
                      <span>Sun</span><span>6AM – 3PM</span>
                      <span>Mon</span><span>6AM – 4PM</span>
                      <span>Tue</span><span>6AM – 4PM</span>
                      <span>Wed</span><span>6AM – 4PM</span>
                      <span>Thu</span><span>6AM – 5PM</span>
                      <span>Fri</span><span>6AM – 4PM</span>
                      <span className="contact-card__closed">Sat</span>
                      <span className="contact-card__closed">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-card__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.0!2d-79.4631!3d43.8175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2c5a53c8f8e9%3A0x1234567890abcdef!2s1118%20Centre%20St%2C%20Thornhill%2C%20ON!5e0!3m2!1sen!2sca!4v1234567890"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  title="Grodzinski Bakery Location"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
