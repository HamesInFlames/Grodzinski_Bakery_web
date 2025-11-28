//src/pages/Home.jsx
import React, { useState } from "react";

function Home() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We’ll get back to you soon.");
    setFormState({ name: "", email: "", message: "" });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1>Freshly Crafted. Always Exceptional.</h1>
          <p>
            At Grodzinski Bakery, every loaf, pastry, and cake begins with 
            time-honoured techniques and refined craftsmanship. From golden 
            challahs to artisan breads and delicate desserts, our bakery blends 
            tradition with elevated, modern flavours.
          </p>
          <div className="hero__actions">
            <button
              className="btn btn--primary"
              onClick={() => scrollToSection("menu-preview")}
            >
              View Our Menu
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => scrollToSection("visit-us")}
            >
              Find a Location
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section section--light">
        <div className="section__inner">
          <h2>Our Story</h2>
          <p className="section__text">
            For over a century, Grodzinski Bakery has been a cornerstone of 
            tradition — handcrafting breads and pastries with precision, care, 
            and unmistakable quality. What began as a neighbourhood bakery has 
            evolved into Toronto’s trusted destination for artisanal challah, 
            premium cakes, and beautifully prepared baked goods.
          </p>
          <p className="section__text">
            We remain committed to small-batch baking, natural ingredients, and 
            recipes perfected across generations. Each morning, our bakers arrive 
            before dawn to mix, shape, and bake so that every item that leaves 
            our ovens carries the warmth of craftsmanship and the flavour of 
            heritage.
          </p>
          <p className="section__text">
            Our Toronto facility is peanut- and tree-nut-free, providing peace of 
            mind for families while never compromising on taste, texture, or 
            tradition.
          </p>
        </div>
      </section>

      {/* MENU PREVIEW / BREADS */}
      <section id="menu-preview" className="section">
        <div className="section__inner">
          <h2>Signature Breads</h2>
          <p className="section__subtitle">
            Discover our collection of handcrafted loaves — made fresh daily, 
            shaped by expert hands, and baked to perfection.
          </p>
          <div className="cards-grid">
            <article className="card">
              <h3>Challah</h3>
              <p>
                Soft, golden, and expertly braided — the iconic loaf for 
                Shabbat, holidays, or elevating any table.
              </p>
              <ul className="card__tags">
                <li>Traditional</li>
                <li>Hand-braided</li>
              </ul>
            </article>

            <article className="card">
              <h3>Rye Bread</h3>
              <p>
                A rich, hearty loaf with depth and character. Ideal for 
                sandwiches, savoury dishes, and everyday enjoyment.
              </p>
              <ul className="card__tags">
                <li>Hearty</li>
                <li>Everyday</li>
              </ul>
            </article>

            <article className="card">
              <h3>Sourdough</h3>
              <p>
                Naturally leavened and slow-fermented for exceptional flavour, 
                a crisp crust, and airy crumb. A modern artisan favourite.
              </p>
              <ul className="card__tags">
                <li>Artisan</li>
                <li>Slow-fermented</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section id="specials" className="section section--light">
        <div className="section__inner">
          <h2>Pastries & Specialties</h2>
          <p className="section__subtitle">
            A refined selection of pastries, cookies, and celebration-worthy 
            desserts — each made with premium ingredients and meticulous 
            technique.
          </p>
          <div className="cards-grid">
            <article className="card card--soft">
              <h3>Pastries & Cookies</h3>
              <p>
                Flaky pastries, classic cookies, and sweet treats that pair 
                perfectly with coffee or an afternoon break.
              </p>
            </article>

            <article className="card card--soft">
              <h3>Cakes & Desserts</h3>
              <p>
                Elegantly crafted cakes and plated desserts designed for 
                birthdays, simchas, and every milestone worth celebrating.
              </p>
            </article>

            <article className="card card--soft">
              <h3>Catering & Platters</h3>
              <p>
                Beautifully arranged platters for gatherings, holidays, and 
                corporate events. Always fresh, always kosher.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="visit-us" className="section">
        <div className="section__inner">
          <h2>Visit Us</h2>
          <p className="section__subtitle">
            Experience Grodzinski Bakery in person and enjoy our breads and 
            pastries at their freshest.
          </p>

          <div className="cards-grid cards-grid--locations">
            <article className="card card--location">
              <h3>Toronto</h3>
              <p>3437 Bathurst St, North York, ON</p>
              <p className="card__detail">
                Sun 6am–3pm · Mon–Tue 6am–4pm · Wed 6am–4pm · Thu 6am–6pm · 
                Fri (seasonal hours)
              </p>
            </article>

            <article className="card card--location">
              <h3>Thornhill</h3>
              <p>Available at select supermarkets and cafés in the Bathurst & Centre area.</p>
              <p className="card__detail">
                Hours vary by location. See full list on our Locations page.
              </p>
            </article>

            <article className="card card--location">
              <h3>GTA Partners</h3>
              <p>
                Find Grodzinski breads and pastries at independent markets and 
                cafés throughout the Greater Toronto Area.
              </p>
              <p className="card__detail">Look for Grodzinski products near you.</p>
            </article>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--light">
        <div className="section__inner">
          <h2>What Our Customers Say</h2>

          <div className="testimonials">
            <blockquote className="testimonial">
              “A perfect challah — rich, soft, and beautifully braided. 
              Grodzinski has become a part of our family traditions.”
              <span>— Sarah L.</span>
            </blockquote>

            <blockquote className="testimonial">
              “Their pastries are always fresh and the staff treats you like 
              family. A true neighborhood gem.”
              <span>— Daniel K.</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section id="contact" className="section">
        <div className="section__inner section__inner--split">
          <div>
            <h2>Get in Touch</h2>
            <p className="section__text">
              Whether you're planning a celebration, preparing for Shabbat, or 
              have a question about our products, our team is here to help.
            </p>
            <ul className="contact-details">
              <li>Email: info@grodzinskibakery.com</li>
              <li>Phone: (416) 789-0785 (Toronto)</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows="4"
                value={formState.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="btn btn--primary btn--full">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;
