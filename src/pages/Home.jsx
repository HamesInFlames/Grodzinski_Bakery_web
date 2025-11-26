//src\pages\Home.jsx
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
          <h1>Fresh From Our Oven.</h1>
          <p>
            Traditional recipes, handcrafted loaves, and warm hospitality —
            Grodzinski Bakery has been part of your family table for generations.
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
            Grodzinski Bakery is built on a heritage of family, tradition, and
            care. From our very first loaf to the pastries you enjoy today, we
            focus on quality ingredients and time-honoured methods.
          </p>
          <p className="section__text">
            We rise early every morning to knead, shape, and bake — so that when
            you step into our bakery, you’re greeted by the smell of fresh
            bread, the comfort of familiar recipes, and the joy of discovering
            something new.
          </p>
        </div>
      </section>

      {/* MENU PREVIEW / BREADS */}
      <section id="menu-preview" className="section">
        <div className="section__inner">
          <h2>Signature Breads</h2>
          <p className="section__subtitle">
            From classic loaves to specialty breads, everything is baked fresh
            in-house.
          </p>
          <div className="cards-grid">
            <article className="card">
              <h3>Challah</h3>
              <p>
                Soft, braided, and golden — perfect for Shabbat, holidays, or a
                special weekend breakfast.
              </p>
              <ul className="card__tags">
                <li>Traditional</li>
                <li>Hand-braided</li>
              </ul>
            </article>
            <article className="card">
              <h3>Rye Bread</h3>
              <p>
                A hearty loaf with a rich crumb, ideal for sandwiches and
                everyday dinners.
              </p>
              <ul className="card__tags">
                <li>Hearty</li>
                <li>Everyday</li>
              </ul>
            </article>
            <article className="card">
              <h3>Sourdough</h3>
              <p>
                Naturally leavened with a crisp crust and airy interior. A
                modern classic.
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
            Sweet treats, savoury bites, and holiday favourites — crafted with
            care.
          </p>
          <div className="cards-grid">
            <article className="card card--soft">
              <h3>Pastries & Cookies</h3>
              <p>
                Rugelach, cookies, and flaky pastries that pair perfectly with a
                warm drink or a shared dessert table.
              </p>
            </article>
            <article className="card card--soft">
              <h3>Cakes & Desserts</h3>
              <p>
                Celebrate every occasion with our layered cakes, tarts, and
                specialty desserts.
              </p>
            </article>
            <article className="card card--soft">
              <h3>Catering & Platters</h3>
              <p>
                From brunch platters to celebration trays, we make it easy to
                host family, friends, or colleagues.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* LOCATIONS PREVIEW */}
      <section id="visit-us" className="section">
        <div className="section__inner">
          <h2>Visit Us</h2>
          <p className="section__subtitle">
            Find a Grodzinski Bakery near you and experience our breads fresh
            from the oven.
          </p>
          <div className="cards-grid cards-grid--locations">
            <article className="card card--location">
              <h3>Toronto</h3>
              <p>3437 Bathurst St, North York, ON</p>
              <p className="card__detail">
                Sun: 6am–3pm · Mon–Tue: 6am–4pm · Wed: 6am–4pm · Thu: 6am–6pm ·
                Fri: seasonal hours
              </p>
            </article>
            <article className="card card--location">
              <h3>Thornhill</h3>
              <p>Bathurst & Centre Area, Thornhill, ON</p>
              <p className="card__detail">
                Hours vary by location. See full locations list on our Locations
                page.
              </p>
            </article>
            <article className="card card--location">
              <h3>GTA Partners</h3>
              <p>
                Selected supermarkets and cafés carry our breads, pastries, and
                challah across the GTA.
              </p>
              <p className="card__detail">
                Look for Grodzinski products at local markets and cafés.
              </p>
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
              “The challah tastes just like the one my grandmother used to make.
              Grodzinski is part of our family traditions now.”
              <span>— Sarah L.</span>
            </blockquote>
            <blockquote className="testimonial">
              “Every Friday, I pick up a fresh loaf and pastries for the
              weekend. The staff are always warm and welcoming.”
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
              Have a question about catering, special orders, or dietary
              options? Send us a message and our team will be happy to help.
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
