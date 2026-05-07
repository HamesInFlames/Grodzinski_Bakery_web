// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { categories, categoryThumbnails } from "../productData";
import {
  ScrollReveal,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleReveal,
} from "../components/AnimationWrappers";
import { Star, ShieldCheck, Wheat, Users, Heart, Baby, Cake, MapPin, Phone, Clock } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: <Star size={28} />, title: "100% Kosher", desc: "COR certified kosher bakery" },
    { icon: <ShieldCheck size={28} />, title: "Nut-Free", desc: "Peanut & tree-nut free facility" },
    { icon: <Wheat size={28} />, title: "Fresh Daily", desc: "Baked fresh every morning" },
    { icon: <Users size={28} />, title: "Since 1888", desc: "Family tradition for generations" },
  ];

  const categoryImages = [
    { name: "Challah & Bilkas", image: "/images/home/thumbnail_challahs.jpg", count: 14 },
    { name: "Cakes", image: "/images/home/thumbnail_cakes.jpg", count: 20 },
    { name: "Cookies", image: "/images/home/thumbnail_cookies.jpg", count: 30 },
    { name: "Babkas", image: "/images/home/thumbnail_babkas.jpg", count: 10 },
    { name: "Breads", image: "/images/home/thumbnail_breaks_rolls.jpg", count: 17 },
    { name: "Pastries", image: "/images/home/thumbnail_danishes_sweets.jpg", count: 16 },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__inner">
          <div className="hero__content">
            <FadeIn delay={0.2}>
              <div className="hero__badge">
                <Star size={16} /> Toronto's Favourite Kosher Bakery
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h1 className="hero__title">
                Fresh Baked Daily<br />Since 1888
              </h1>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="hero__subtitle">
                Three generations of handcrafted breads, challahs, cakes, and
                pastries. Made with love in our 100% nut-free facility.
              </p>
            </FadeIn>
            <FadeIn delay={0.8}>
              <div className="hero__actions">
                <button
                  className="btn btn--primary btn--lg"
                  onClick={() => navigate("/menu")}
                >
                  View Our Menu
                </button>
                <button
                  className="btn btn--ghost btn--lg"
                  onClick={() => navigate("/gallery")}
                >
                  Custom Creations
                </button>
              </div>
            </FadeIn>
          </div>

          <ScaleReveal delay={0.5} duration={0.9}>
            <div className="hero__image">
              <img
                src="/images/home/thumbnail_slider (5).jpg"
                alt="Fresh baked goods"
                className="hero__image-main"
              />
              <div className="hero__features">
                <div className="hero__feature">
                  <div className="hero__feature-icon"><Star size={18} /></div>
                  <div className="hero__feature-text">Kosher</div>
                </div>
                <div className="hero__feature">
                  <div className="hero__feature-icon"><ShieldCheck size={18} /></div>
                  <div className="hero__feature-text">Nut-Free</div>
                </div>
                <div className="hero__feature">
                  <div className="hero__feature-icon"><Wheat size={18} /></div>
                  <div className="hero__feature-text">Fresh</div>
                </div>
              </div>
            </div>
          </ScaleReveal>
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
                challahs, and hand-rolling pastries — just as we've done for
                generations.
              </p>
              <p className="home-about__text">
                We believe in simplicity: fresh ingredients, traditional techniques,
                and no artificial preservatives. Every loaf of rye, every round
                challah, and every buttery danish is made by hand using recipes
                passed down through our family.
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
                src="/images/home/thumbnail_slider (3).jpg"
                alt="Grodzinski Bakery"
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
          <div className="home-contact-grid">
            <ScrollReveal direction="left">
              <div className="contact-card">
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

                  <div className="contact-card__item">
                    <div className="contact-card__icon"><Clock size={20} /></div>
                    <div>
                      <div className="contact-card__label">Hours</div>
                      <div className="contact-card__value">
                        Sun: 7AM - 5PM<br />
                        Mon-Wed: 7AM - 6PM<br />
                        Thu: 7AM - 9PM<br />
                        Fri: 7AM - 3PM<br />
                        Sat: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <div className="contact-form">
                <h3 className="contact-form__title">Get in Touch</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will be in touch.'); }}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn btn--primary btn--full">
                    Send Message
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
