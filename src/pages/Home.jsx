// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import {
  ScrollReveal,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimationWrappers";
// TODO: Re-enable ContactForm once backend endpoint is wired up
// import ContactForm from "../components/ContactForm";
import { Star, ShieldCheck, Wheat, Users, Heart, Baby, Cake, MapPin, Phone, Clock } from "lucide-react";

// TODO(phase-4.2): wire to Resend-backed /api/contact endpoint, then re-enable ContactForm.
const handleHomeContactSubmit = async (_formData) => {
  return;
};

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: <Star size={28} />, title: "100% Kosher", desc: "COR certified kosher bakery" },
    { icon: <ShieldCheck size={28} />, title: "Nut-Free", desc: "Peanut & tree-nut free facility" },
    { icon: <Wheat size={28} />, title: "Fresh Daily", desc: "Baked fresh every morning" },
    { icon: <Users size={28} />, title: "Since 1888", desc: "A baking tradition over a century in the making" },
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

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <StaggerContainer className="grid grid--4" staggerDelay={0.12}>
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="feature-card">
                  <div className="feature-card__icon">{feature.icon}</div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.desc}</p>
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

      {/* ABOUT SNIPPET */}
      <section className="section">
        <div className="container">
          <div className="home-about">
            <ScrollReveal direction="left" className="home-about__content">
              <h2 className="home-about__title">
                A Toronto Tradition Since 1888
              </h2>
              <p className="home-about__text">
                What started as a small neighbourhood bakery has grown into a
                beloved institution across the Greater Toronto Area. From the
                earliest morning hours, our bakers are kneading dough, braiding
                challahs, and hand-rolling pastries — just as the bakery has
                done since 1888.
              </p>
              <p className="home-about__text">
                We believe in simplicity: fresh ingredients, traditional techniques,
                and no artificial preservatives. Every loaf of rye, every round
                challah, and every buttery danish is made by hand using traditional
                recipes rooted in over a century of baking.
              </p>
              <button
                className="btn btn--secondary"
                onClick={() => navigate("/about")}
              >
                Our Story
              </button>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15} className="home-about__image">
              <img
                src="/images/home/thumbnail_slider (3).png"
                alt="Grodzinski Bakery"
                loading="lazy"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CUSTOM ORDERS CTA */}
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

          <StaggerContainer className="home-occasions" staggerDelay={0.1}>
            {[
              { icon: <Heart size={24} />, label: "Weddings" },
              { icon: <Baby size={24} />, label: "Baby Showers" },
              { icon: <Cake size={24} />, label: "Birthdays" },
              { icon: <Star size={24} />, label: "Holidays" },
            ].map((item, i) => (
              <StaggerItem key={i} direction="none">
                <div className="home-occasion">
                  <span className="home-occasion__icon">{item.icon}</span>
                  <span className="home-occasion__label">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <button
                className="btn btn--primary btn--lg"
                onClick={() => navigate("/gallery")}
              >
                View Custom Gallery
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
                      <span>Fri</span><span>6AM – 3PM</span>
                      <span className="contact-card__closed">Sat</span>
                      <span className="contact-card__closed">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          {/* TODO: Re-enable ContactForm once backend endpoint is wired up */}
        </div>
      </section>
    </>
  );
}
