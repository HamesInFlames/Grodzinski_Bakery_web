//src/pages/Catering.jsx
import { ScrollReveal, FadeIn, StaggerContainer, StaggerItem } from "../components/AnimationWrappers";

export default function Catering() {
  const cateringOptions = [
    {
      title: "Breakfast & Brunch Platters",
      description: "Start your morning event with our fresh breakfast selection: assorted bagels with cream cheese and spreads, danishes, muffins, croissants, and fresh fruit platters. Add yogurt parfaits or mini quiches for a complete spread.",
      idealFor: "morning meetings, brunch events, office gatherings",
      image: "/images/home/breakfast_brunch_bagels.png"
    },
    {
      title: "Sandwich & Wrap Platters",
      description: "Freshly prepared sandwiches and wraps made with our signature breads. Choose from a variety of fillings: deli meats, vegetarian, dairy, or vegan options. All sandwiches include fresh vegetables and are cut for easy serving.",
      idealFor: "lunch meetings, picnics, casual events",
      image: "/images/home/sandwich_wrap_platter.png"
    },
    {
      title: "Baked Goods & Cookie Trays",
      description: "Impress your guests with beautifully arranged trays of our finest cookies, rugelach, brownies, and mini pastries. Perfect for dessert tables, afternoon gatherings, or as a sweet finish to any meal.",
      idealFor: "dessert tables, celebrations, office parties",
      image: "/images/home/baked_goods_cookie_tray.png"
    },
    {
      title: "Challah & Bread Baskets",
      description: "Beautifully arranged baskets featuring our famous challahs, specialty loaves, dinner rolls, and artisan breads. Perfect for Shabbat dinners, holiday meals, or any gathering where fresh bread is a must.",
      idealFor: "Shabbat dinners, holiday tables, family gatherings",
      image: "/images/home/challah_bread_basket.png"
    },
    {
      title: "Fruit & Vegetable Platters",
      description: "Fresh, colorful fruit platters and vegetable crudité arrangements with dips. A healthy and refreshing addition to any event, beautifully presented and ready to serve.",
      idealFor: "health-conscious events, buffets, summer gatherings",
      image: "/images/home/fruit_vegetable_platter.png"
    },
    {
      title: "Custom Event Packages",
      description: "Planning a large event or need something specific? We'll work with you to create a custom catering package that fits your needs, budget, and dietary requirements. Just give us a call to discuss the details.",
      idealFor: "weddings, bar/bat mitzvahs, corporate events",
      featured: true
    }
  ];

  return (
    <div className="catering-page">
      {/* HERO */}
      <section className="catering-hero">
        <div className="catering-hero__image-wrapper">
          <img
            src="/images/home/thumbnail_slider (3).png"
            alt="Catering platters at Grodzinski Bakery"
            className="catering-hero__image"
          />
          <div className="catering-hero__overlay"></div>
        </div>
        <div className="catering-hero__content">
          <FadeIn delay={0.2}>
            <h1>Catering & Event Platters</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="catering-hero__subtitle">
              From intimate family gatherings to large corporate events, Grodzinski Bakery
              brings fresh, beautifully presented baked goods and catering platters to your
              table. Every item is prepared fresh, arranged with care, and delivered with
              the same quality and tradition we've maintained for generations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CATERING OPTIONS */}
      <section className="section">
        <div className="section__inner">
          <ScrollReveal>
            <h2>Our Catering Options</h2>
            <p className="section__subtitle">
              All platters are available in various sizes to accommodate gatherings from
              10 to 100+ guests. Perfect for business meetings, family celebrations, holiday
              tables, shivas, and community events. We're happy to customize any order to
              meet your dietary needs and preferences.
            </p>
          </ScrollReveal>

          <StaggerContainer className="catering-grid" staggerDelay={0.1}>
            {cateringOptions.map((option, index) => (
              <StaggerItem key={index}>
                <div className={`catering-card ${option.featured ? "catering-card--feature" : ""}`}>
                  {!option.featured && (
                    <div className="catering-card__image">
                      <img
                        src={option.image}
                        alt={option.title}
                        loading="lazy"
                        className="catering-card__img"
                      />
                    </div>
                  )}
                  <div className="catering-card__content">
                    <h3>{option.title}</h3>
                    <p className="catering-card__description">{option.description}</p>
                    <p className="catering-card__ideal">
                      <strong>Ideal for:</strong> {option.idealFor}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="section section--light">
        <div className="section__inner">
          <div className="catering-order-info">
            <div className="catering-order-info__content">
              <ScrollReveal>
                <h2>How to Order</h2>
              </ScrollReveal>
              <div className="catering-order-steps">
                {[
                  { num: "1", title: "Contact Us", text: <>Call us at <a href="tel:9058821350" className="catering-link">(905) 882-1350</a> or email <a href="mailto:info@grodzinskibakery.com" className="catering-link">info@grodzinskibakery.com</a> to discuss your event needs.</> },
                  { num: "2", title: "Plan Ahead", text: "We recommend ordering at least 48-72 hours in advance for catering orders. For large events or custom requests, more notice is appreciated." },
                  { num: "3", title: "Pickup or Delivery", text: "Choose pickup from our Thornhill location or inquire about delivery options for your area. Delivery fees may apply based on distance and order size." },
                  { num: "4", title: "Dietary Needs", text: "Let us know about any dietary restrictions or preferences. We offer dairy, pareve, vegetarian, and vegan options, and everything is baked in our 100% nut-free facility." },
                ].map((step, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="catering-order-step">
                      <div className="catering-order-step__number">{step.num}</div>
                      <div className="catering-order-step__content">
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="catering-order-info__image">
                <img
                  src="/images/home/large_cookie_danish_platter.png"
                  alt="Beautiful catering platter"
                  loading="lazy"
                  className="catering-order-info__img"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <ScrollReveal>
        <section className="section">
          <div className="section__inner">
            <div className="catering-cta">
              <h2>Ready to Plan Your Event?</h2>
              <p className="catering-cta__text">
                Our team will respond within 24 hours to discuss your needs and provide a custom quote.
              </p>
              <div className="catering-cta__actions">
                <a href="/visit" className="btn btn--primary">Request Catering Quote</a>
                <a href="tel:9058821350" className="btn btn--ghost">Call (905) 882-1350</a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
