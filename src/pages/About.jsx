import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page-wrapper">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero__image-wrapper">
          <img 
            src="/images/home/thumbnail_slider (2).jpg" 
            alt="Grodzinski Bakery - Traditional baking"
            className="about-hero__image"
          />
          <div className="about-hero__overlay"></div>
        </div>
        <div className="about-hero__content">
          <h1>About Grodzinski Bakery</h1>
          <p className="about-hero__subtitle">
            Three generations of tradition, quality, and community — baked fresh every day.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="section__inner about-page">
          <div className="about-content">
            {/* LEFT: Text Content */}
            <div className="about-content__text">
              <p className="section__text">
                For over three generations, Grodzinski Bakery has been a cornerstone of 
                Toronto's Jewish community — a place where tradition meets quality, and 
                where every loaf, challah, and pastry is baked with pride and care.
              </p>

              <p className="section__text">
                What began as a small neighbourhood bakery has grown into a beloved institution 
                across the Greater Toronto Area. From the earliest morning hours, our bakers 
                arrive to knead dough, braid challahs, and hand-roll pastries using recipes 
                that have been passed down through our family for generations. We believe in 
                doing things the right way: fresh ingredients, traditional European techniques, 
                and absolutely no artificial preservatives.
              </p>

              <p className="section__text">
                Our commitment to quality extends beyond our recipes. Grodzinski Bakery is 
                proudly certified as a 100% peanut- and tree-nut-free facility. We understand 
                how important allergen safety is for families, schools, and community events — 
                which is why we've made this commitment a foundational part of who we are. 
                Every product we bake is safe for those with nut allergies, giving families 
                complete peace of mind.
              </p>

              <p className="section__text">
                We specialize in traditional Jewish baking: from fresh Shabbat challahs to 
                holiday round challahs, from seven-layer cakes for simchas to everyday breads 
                for your table. Our selection includes dairy, pareve, vegetarian, and vegan 
                options, ensuring that everyone can find something delicious. Whether you're 
                preparing for a milestone celebration, hosting a community event, or simply 
                picking up your weekly challah, we're honoured to be part of your tradition.
              </p>

              <p className="section__text">
                At Grodzinski, we don't just bake bread — we bake memories. Every braided 
                challah reminds families of Shabbat dinners together. Every birthday cake 
                marks a milestone. Every rugelach brings back the flavours of childhood. 
                We're grateful to serve this community, and we look forward to being part 
                of your family's table for generations to come.
              </p>
            </div>

            {/* RIGHT: Image Gallery */}
            <div className="about-content__images">
              <div className="about-image-card">
                <img 
                  src="/images/home/thumbnail_challahs.jpg" 
                  alt="Fresh challahs at Grodzinski Bakery"
                  className="about-image-card__img"
                />
                <p className="about-image-card__caption">Fresh challahs, baked daily</p>
              </div>
              
              <div className="about-image-card">
                <img 
                  src="/images/home/thumbnail_cakes.jpg" 
                  alt="Celebration cakes"
                  className="about-image-card__img"
                />
                <p className="about-image-card__caption">Celebration cakes for every occasion</p>
              </div>

              <div className="about-image-card">
                <img 
                  src="/images/home/thumbnail_cookies.jpg" 
                  alt="Handcrafted cookies"
                  className="about-image-card__img"
                />
                <p className="about-image-card__caption">Handcrafted cookies and pastries</p>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE US SECTION */}
          <div className="about-features">
            <h2>Why Choose Grodzinski?</h2>
            <div className="about-features__grid">
              <div className="about-feature-card">
                <div className="about-feature-card__icon">🥜</div>
                <h3>100% Nut-Free Facility</h3>
                <p>Complete allergen safety for families, schools, and anyone with nut allergies.</p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-card__icon">👨‍🍳</div>
                <h3>Traditional Recipes</h3>
                <p>European recipes passed down through generations, made with care and expertise.</p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-card__icon">🌾</div>
                <h3>Fresh Daily</h3>
                <p>No artificial preservatives — everything is baked fresh every single day.</p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-card__icon">🥖</div>
                <h3>Dietary Options</h3>
                <p>Full range of options: dairy, pareve, vegetarian, and vegan products available.</p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-card__icon">🎂</div>
                <h3>Custom Orders</h3>
                <p>Custom cakes and catering for events of all sizes — from intimate to grand.</p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-card__icon">❤️</div>
                <h3>Community Focus</h3>
                <p>Serving the Toronto Jewish community with warmth and dedication since day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default About;
{/* <hr className="about-divider" /> */}