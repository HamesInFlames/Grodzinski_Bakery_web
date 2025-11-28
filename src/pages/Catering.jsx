//src\pages\Catering.jsx
import React from "react";

export default function Catering() {
  const cateringOptions = [
    {
      title: "Breakfast & Brunch Platters",
      description: "Start your morning event with our fresh breakfast selection: assorted bagels with cream cheese and spreads, danishes, muffins, croissants, and fresh fruit platters. Add yogurt parfaits or mini quiches for a complete spread.",
      idealFor: "morning meetings, brunch events, office gatherings",
      image: "/images/home/thumbnail_assorted_bagles_creamcheese.jpg"
    },
    {
      title: "Sandwich & Wrap Platters",
      description: "Freshly prepared sandwiches and wraps made with our signature breads. Choose from a variety of fillings: deli meats, vegetarian, dairy, or vegan options. All sandwiches include fresh vegetables and are cut for easy serving.",
      idealFor: "lunch meetings, picnics, casual events",
      image: "/images/home/thumbnail_assorted_wraps.jpg"
    },
    {
      title: "Baked Goods & Cookie Trays",
      description: "Impress your guests with beautifully arranged trays of our finest cookies, rugelach, brownies, and mini pastries. Perfect for dessert tables, afternoon gatherings, or as a sweet finish to any meal.",
      idealFor: "dessert tables, celebrations, office parties",
      image: "/images/home/thumbnail_large_cookie_platter.jpg"
    },
    {
      title: "Challah & Bread Baskets",
      description: "Beautifully arranged baskets featuring our famous challahs, specialty loaves, dinner rolls, and artisan breads. Perfect for Shabbat dinners, holiday meals, or any gathering where fresh bread is a must.",
      idealFor: "Shabbat dinners, holiday tables, family gatherings",
      image: "/images/home/thumbnail_challahs.jpg"
    },
    {
      title: "Fruit & Vegetable Platters",
      description: "Fresh, colorful fruit platters and vegetable crudité arrangements with dips. A healthy and refreshing addition to any event, beautifully presented and ready to serve.",
      idealFor: "health-conscious events, buffets, summer gatherings",
      image: "/images/home/thumbnail_fruit_platter.jpg"
    },
    {
      title: "Custom Event Packages",
      description: "Planning a large event or need something specific? We'll work with you to create a custom catering package that fits your needs, budget, and dietary requirements. Just give us a call to discuss the details.",
      idealFor: "weddings, bar/bat mitzvahs, corporate events",
      image: "/images/home/thumbnail_gift_basket.jpg"
    }
  ];

  return (
    <div className="catering-page">
      {/* HERO */}
      <section className="catering-hero">
        <div className="catering-hero__image-wrapper">
          <img 
            src="/images/home/thumbnail_large_danish_platter.jpg" 
            alt="Catering platters at Grodzinski Bakery"
            className="catering-hero__image"
          />
          <div className="catering-hero__overlay"></div>
        </div>
        <div className="catering-hero__content">
          <h1>Catering & Event Platters</h1>
          <p className="catering-hero__subtitle">
            From intimate family gatherings to large corporate events, Grodzinski Bakery 
            brings fresh, beautifully presented baked goods and catering platters to your 
            table. Every item is prepared fresh, arranged with care, and delivered with 
            the same quality and tradition we've maintained for generations.
          </p>
        </div>
      </section>

      {/* CATERING OPTIONS */}
      <section className="section">
        <div className="section__inner">
          <h2>Our Catering Options</h2>
          <p className="section__subtitle">
            All platters are available in various sizes to accommodate gatherings from 
            10 to 100+ guests. Perfect for business meetings, family celebrations, holiday 
            tables, shivas, and community events. We're happy to customize any order to 
            meet your dietary needs and preferences.
          </p>

          <div className="catering-grid">
            {cateringOptions.map((option, index) => (
              <div key={index} className="catering-card">
                <div className="catering-card__image">
                  <img 
                    src={option.image} 
                    alt={option.title}
                    className="catering-card__img"
                  />
                </div>
                <div className="catering-card__content">
                  <h3>{option.title}</h3>
                  <p className="catering-card__description">
                    {option.description}
                  </p>
                  <p className="catering-card__ideal">
                    <strong>Ideal for:</strong> {option.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="section section--light">
        <div className="section__inner">
          <div className="catering-order-info">
            <div className="catering-order-info__content">
              <h2>How to Order</h2>
              <div className="catering-order-steps">
                <div className="catering-order-step">
                  <div className="catering-order-step__number">1</div>
                  <div className="catering-order-step__content">
                    <h3>Contact Us</h3>
                    <p>
                      Call us at <a href="tel:4167890785" className="catering-link">(416) 789-0785</a> or 
                      email <a href="mailto:info@grodzinskibakery.com" className="catering-link">info@grodzinskibakery.com</a> to 
                      discuss your event needs.
                    </p>
                  </div>
                </div>

                <div className="catering-order-step">
                  <div className="catering-order-step__number">2</div>
                  <div className="catering-order-step__content">
                    <h3>Plan Ahead</h3>
                    <p>
                      We recommend ordering at least 48-72 hours in advance for catering orders. 
                      For large events or custom requests, more notice is appreciated.
                    </p>
                  </div>
                </div>

                <div className="catering-order-step">
                  <div className="catering-order-step__number">3</div>
                  <div className="catering-order-step__content">
                    <h3>Pickup or Delivery</h3>
                    <p>
                      Choose pickup from our Thornhill location or inquire about delivery options 
                      for your area. Delivery fees may apply based on distance and order size.
                    </p>
                  </div>
                </div>

                <div className="catering-order-step">
                  <div className="catering-order-step__number">4</div>
                  <div className="catering-order-step__content">
                    <h3>Dietary Needs</h3>
                    <p>
                      Let us know about any dietary restrictions or preferences. We offer dairy, 
                      pareve, vegetarian, and vegan options, and everything is baked in our 100% 
                      nut-free facility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="catering-order-info__image">
              <img 
                src="/images/home/thumbnail_large_cookie_danish_platter.jpg" 
                alt="Beautiful catering platter"
                className="catering-order-info__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section">
        <div className="section__inner">
          <div className="catering-cta">
            <h2>Ready to Plan Your Event?</h2>
            <p className="catering-cta__text">
              Our team will respond within 24 hours to discuss your needs and provide a custom quote.
            </p>
            <div className="catering-cta__actions">
              <a
                href="/contact"
                className="btn btn--primary"
              >
                Request Catering Quote
              </a>
              <a
                href="tel:4167890785"
                className="btn btn--ghost"
              >
                Call (416) 789-0785
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
