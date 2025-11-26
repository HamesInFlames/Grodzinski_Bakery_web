//src\pages\About.jsx
import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      {/* HERO AREA */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__inner">
          <nav className="about-hero__breadcrumb">
            <Link to="/" className="about-hero__breadcrumb-link">
              Home
            </Link>
            <span className="about-hero__breadcrumb-separator">›</span>
            <span className="about-hero__breadcrumb-about">About</span>
          </nav>

          <p className="about-hero__kicker">ABOUT GRODZINSKI BAKERY</p>
          <h1 className="about-hero__title">Fresh From Our Oven.</h1>
          {/* <p className="about-hero__subtitle">
            From our ovens to your table — challahs, breads, and pastries crafted with care and tradition.
          </p> */}
        </div>
      </section>

      {/* BODY CONTENT – TEXT LEFT, IMAGE RIGHT */}
      <section className="section section--light">
        <div className="section__inner about-page about-page__split">
          {/* LEFT: TEXT */}
          <div className="about-page__content">
            <h2>Our Story</h2>
            <p className="section__text">
              Grodzinski has been baking for families for generations, bringing
              together European recipes, kosher tradition, and the rhythm of
              Toronto life. What began as a neighbourhood bakery has grown into a
              destination for challah, cakes, breads, and catering.
            </p>
            <p className="section__text">
              We prepare vegetarian, dairy, and meat-friendly options, as well as
              vegan choices, using a wide variety of breads, buns, and wraps. Our
              focus is on fresh, natural ingredients and recipes that feel
              handmade, not factory-made.
            </p>
            <p className="section__text">
              Our Toronto bakery operates as a peanut- and tree-nut-free facility,
              so families with nut allergies can shop with greater peace of mind.
            </p>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="about-page__image" />
        </div>
      </section>
    </>
  );
}


export default About;
{/* <hr className="about-divider" /> */}