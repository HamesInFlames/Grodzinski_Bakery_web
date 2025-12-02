// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import LocationCard from "../components/LocationCard";
import ContactForm from "../components/ContactForm";
import GoogleMap from "../components/GoogleMap";

function Home() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = async (formData) => {
    // TODO: When backend is implemented, replace with actual API call
    console.log('Contact form submitted:', formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  const bakeryAddress = "1118 Centre St #3, Thornhill, ON L4J 7R9";

  return (
    <>
      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1>Fresh, Handcrafted Baking — Every Single Day</h1>
          <p>
            For over three generations, Grodzinski Bakery has been a cherished part 
            of Toronto's Jewish community. We bake traditional European-style breads, 
            challahs, cakes, and pastries using time-honoured recipes and the finest 
            ingredients. Our facility is 100% peanut- and tree-nut-free, so every 
            family can enjoy our baked goods with complete peace of mind.
          </p>

          <div className="hero__actions">
            <button
              className="btn btn--primary"
              onClick={() => scrollToSection("menu-preview")}
            >
              Explore Our Menu
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => scrollToSection("visit-us")}
            >
              Find Our Bakery
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT / STORY */}
      <section id="about" className="section section--light">
        <div className="section__inner">
          <div className="home-about">
            <div className="home-about__content">
              <h2>Baked With Care, Rooted in Tradition</h2>
              <p className="section__text">
                What started as a small neighbourhood bakery has grown into a beloved 
                institution across the Greater Toronto Area. From the earliest morning hours, 
                our bakers are kneading dough, braiding challahs, and hand-rolling pastries — 
                just as we've done for generations.
              </p>

              <p className="section__text">
                We believe in simplicity: fresh ingredients, traditional techniques, and no 
                artificial preservatives. Every loaf of rye, every round challah, and every 
                buttery danish is made by hand using recipes passed down through our family. 
                Whether you're preparing for Shabbat, hosting a celebration, or simply picking 
                up lunch, our bakery is here to serve you with warmth and quality.
              </p>

              <p className="section__text">
                As a fully certified nut-free facility, we take allergen safety seriously. 
                Our bakery contains no peanuts or tree nuts — ensuring that children, families, 
                schools, and anyone with allergies can enjoy our products with confidence. 
                It's a commitment we're proud to uphold every single day.
              </p>
            </div>

            <div className="home-about__image">
              <img 
                src="/images/home/thumbnail_slider (5).jpg" 
                alt="Traditional baking at Grodzinski Bakery"
                className="home-about__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW / SIGNATURE BREADS */}
      <section id="menu-preview" className="section">
        <div className="section__inner">
          <h2
            className="section__heading-link"
            onClick={() => navigate("/menu")}
          >
            Signature Breads & Challahs
          </h2>
          <p className="section__subtitle">
            From classic braided challahs to hearty rye loaves, every bread is baked 
            fresh in-house daily. These are the staples that have made Grodzinski a 
            household name across Toronto.
          </p>

          <div className="cards-grid">
            <ProductCard
              name="Plain Challah (Large)"
              description="Our most popular item — a beautifully braided loaf with a soft, slightly sweet crumb and golden crust. Perfect for Shabbat tables and holiday gatherings."
              price="$8.13"
              tags={["Nut-Free", "Dairy-Free", "Contains Egg", "Kosher"]}
              imageSrc="/images/home/thumbnail_challahs.jpg"
              imageAlt="Plain Challah"
            />
            
            <ProductCard
              name="Whole Wheat Challah"
              description="A wholesome twist on tradition — braided with whole wheat flour for added nutrition and a heartier texture, while maintaining that signature challah softness."
              price="$8.50"
              tags={["Nut-Free", "Contains Egg", "Kosher"]}
              imageSrc="/images/home/thumbnail_challahs.jpg"
              imageAlt="Whole Wheat Challah"
            />
            
            <ProductCard
              name="Sandwich Rye Loaf"
              description="A classic deli-style rye bread with authentic European flavour. Ideal for sandwiches, toasting, or serving alongside soups and salads."
              price="$6.50"
              tags={["Nut-Free", "Dairy-Free", "Contains Gluten", "Kosher"]}
              imageSrc="/images/home/thumbnail_breaks_rolls.jpg"
              imageAlt="Sandwich Rye Loaf"
            />
            
            <ProductCard
              name="Round Challah"
              description="The traditional round challah for Rosh Hashanah and other holidays — symbolizing continuity and the cycle of the year. Baked fresh and beautiful."
              price="$9.00"
              tags={["Nut-Free", "Contains Egg", "Kosher"]}
              imageSrc="/images/home/thumbnail_challahs.jpg"
              imageAlt="Round Challah"
            />
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => navigate("/menu")}
              className="btn btn--primary"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* PASTRIES & SPECIALTIES */}
      <section id="specials" className="section section--light">
        <div className="section__inner">
          <h2
            className="section__heading-link"
            onClick={() => navigate("/menu")}
          >
            Pastries, Cakes & Sweet Treats
          </h2>
          <p className="section__subtitle">
            From morning danishes to celebration cakes, our pastry selection combines 
            European elegance with the comfort of homemade baking. Each item is crafted 
            with care, patience, and a touch of sweetness.
          </p>

          <div className="cards-grid">
            <ProductCard
              name="7-Layer Cake"
              description="A show-stopping dessert featuring thin layers of delicate sponge cake alternating with rich cream, topped with glossy chocolate. A customer favourite for decades."
              price="$34.00"
              tags={["Nut-Free", "Dairy", "Contains Egg", "Kosher"]}
              imageSrc="/images/home/thumbnail_cakes.jpg"
              imageAlt="7-Layer Cake"
            />
            
            <ProductCard
              name="Cheese Danish"
              description="Flaky, buttery pastry filled with sweet cream cheese — a timeless breakfast or afternoon treat that pairs perfectly with coffee or tea."
              price="$3.95"
              tags={["Nut-Free", "Dairy", "Contains Gluten"]}
              imageSrc="/images/home/thumbnail_danishes_sweets.jpg"
              imageAlt="Cheese Danish"
            />
            
            <ProductCard
              name="Assorted Fancy Cookies (Box)"
              description="An elegant assortment of our finest cookies — beautifully decorated and perfect for serving at events, holiday tables, or as a thoughtful gift."
              price="$22.00"
              tags={["Nut-Free", "Dairy", "Contains Egg"]}
              imageSrc="/images/home/thumbnail_cookies.jpg"
              imageAlt="Assorted Fancy Cookies"
            />
            
            <ProductCard
              name="Chocolate Mousse Cake"
              description="Light-as-air chocolate mousse layered on a delicate cake base. Decadent yet airy, it's the perfect finish to any special meal or celebration."
              price="$38.00"
              tags={["Nut-Free", "Dairy", "Contains Egg"]}
              imageSrc="/images/home/thumbnail_cakes.jpg"
              imageAlt="Chocolate Mousse Cake"
            />
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => navigate("/menu")}
              className="btn btn--primary"
            >
              Browse All Pastries & Cakes
            </button>
          </div>
        </div>
      </section>

      {/* CATERING & PLATTERS */}
      <section id="catering" className="section">
        <div className="section__inner">
          <h2
            className="section__heading-link"
            onClick={() => navigate("/catering")}
          >
            Catering & Platters
          </h2>
          <p className="section__subtitle">
            Whether you're hosting a corporate breakfast, planning a family simcha, or 
            organizing a community event, Grodzinski makes catering simple, elegant, and 
            delicious. All platters are available in multiple sizes and can be customized 
            to your needs.
          </p>

          <div className="home-catering-grid">
            <article className="home-catering-card">
              <div className="home-catering-card__image">
                <img 
                  src="/images/home/thumbnail_assorted_bagles_creamcheese.jpg" 
                  alt="Breakfast & Brunch Platters"
                  className="home-catering-card__img"
                />
              </div>
              <div className="home-catering-card__content">
                <h3>Breakfast & Brunch Platters</h3>
                <p>
                  Start the day right with our morning selection: fresh bagels with spreads, 
                  assorted danishes, muffins, croissants, and fruit platters. Add yogurt 
                  parfaits or quiches for a complete breakfast spread.
                </p>
              </div>
            </article>

            <article className="home-catering-card">
              <div className="home-catering-card__image">
                <img 
                  src="/images/home/thumbnail_assorted_wraps.jpg" 
                  alt="Sandwich & Wrap Platters"
                  className="home-catering-card__img"
                />
              </div>
              <div className="home-catering-card__content">
                <h3>Sandwich & Wrap Platters</h3>
                <p>
                  Freshly prepared sandwiches and wraps on our signature breads and wraps. 
                  Choose from deli, vegetarian, dairy, or vegan fillings — all made to order 
                  with crisp vegetables and quality ingredients.
                </p>
              </div>
            </article>

            <article className="home-catering-card">
              <div className="home-catering-card__image">
                <img 
                  src="/images/home/thumbnail_large_cookie_platter.jpg" 
                  alt="Dessert & Cookie Trays"
                  className="home-catering-card__img"
                />
              </div>
              <div className="home-catering-card__content">
                <h3>Dessert & Cookie Trays</h3>
                <p>
                  Impress your guests with beautifully arranged trays of rugelach, fancy 
                  cookies, brownies, and mini pastries. Perfect for dessert tables, 
                  office parties, and celebrations of all kinds.
                </p>
              </div>
            </article>

            <article className="home-catering-card">
              <div className="home-catering-card__image">
                <img 
                  src="/images/home/thumbnail_challahs.jpg" 
                  alt="Challah & Bread Baskets"
                  className="home-catering-card__img"
                />
              </div>
              <div className="home-catering-card__content">
                <h3>Challah & Bread Baskets</h3>
                <p>
                  Elevate any meal with a basket of our freshest breads: challahs, specialty 
                  loaves, dinner rolls, and artisan breads arranged and ready to serve. 
                  Ideal for holiday dinners and large gatherings.
                </p>
              </div>
            </article>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => navigate("/catering")}
              className="btn btn--primary"
            >
              Explore Catering Options
            </button>
          </div>
        </div>
      </section>

      {/* VISIT US / LOCATIONS */}
      <section id="visit-us" className="section section--light">
        <div className="section__inner">
          <h2>Visit Our Bakery</h2>
          <p className="section__subtitle">
            We're located in Thornhill, serving the Greater Toronto Area with fresh baked 
            goods every day. Stop by to browse our selection, place a custom order, or 
            simply enjoy the warm aroma of fresh bread.
          </p>

          <div className="visit-layout">
            {/* LEFT: LOCATION DETAILS */}
            <div className="visit-details">
              <LocationCard
                name="Grodzinski Bakery — Thornhill"
                address={bakeryAddress}
                hours={[
                  "Sunday: 7:00 AM – 5:00 PM",
                  "Monday: 7:00 AM – 6:00 PM",
                  "Tuesday: 7:00 AM – 6:00 PM",
                  "Wednesday: 7:00 AM – 6:00 PM",
                  "Thursday: 7:00 AM – 9:00 PM",
                  "Friday: 7:00 AM – 3:00 PM (or earlier, seasonal)",
                  "Saturday: Closed"
                ]}
                phone="(416) 789-0785"
                additionalInfo="Hours may vary during Jewish holidays and special occasions. We recommend calling ahead for holiday schedules, large orders, or specific product availability. Free parking available on-site."
              />

              <div className="visit-actions">
                <a 
                  href="tel:4167890785"
                  className="visit-action-btn visit-action-btn--primary"
                >
                  📞 Call Us
                </a>
                <a 
                  href={`https://www.google.com/maps?q=${encodeURIComponent(bakeryAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-action-btn visit-action-btn--secondary"
                >
                  🗺️ Get Directions
                </a>
              </div>

              <p className="section__text mt-6">
                Grodzinski products are also available at select supermarkets, kosher 
                markets, and cafés throughout the GTA. Look for our challahs, breads, 
                and pastries at your local store — or ask them to carry Grodzinski!
              </p>
            </div>

            {/* RIGHT: EMBEDDED MAP */}
            <div className="visit-map">
              <GoogleMap 
                address={bakeryAddress}
                title="Grodzinski Bakery Thornhill Location"
                height="500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH / CONTACT FORM */}
      <section id="contact" className="section">
        <div className="section__inner section__inner--split">
          <div>
            <h2>Get in Touch</h2>
            <p className="section__text">
              Have questions about our products, need help with a custom cake order, 
              or want to discuss catering for your event? We're here to help. Reach 
              out by phone, email, or using the form — we'll respond promptly.
            </p>

            <ul className="contact-details">
              <li><strong>Phone:</strong> <a href="tel:4167890785" className="contact-link">(416) 789-0785</a></li>
              <li><strong>Email:</strong> <a href="mailto:info@grodzinskibakery.com" className="contact-link">info@grodzinskibakery.com</a></li>
            </ul>

            <div className="home-contact-info">
              <div className="home-contact-info__box">
                <h3>📋 For Catering Orders</h3>
                <p>
                  Please include your event date, number of guests, and dietary requirements 
                  when contacting us about catering.
                </p>
              </div>

              <div className="home-contact-info__box">
                <h3>🎂 Custom Cakes</h3>
                <p>
                  Call us directly to discuss custom cake designs, flavors, and decorations 
                  for your special celebration.
                </p>
              </div>
            </div>
          </div>

          <ContactForm
            onSubmit={handleContactSubmit}
            showExtendedFields={false}
            submitButtonText="Send Message"
            successMessage="Thank you for reaching out! We'll get back to you soon."
          />
        </div>
      </section>
    </>
  );
}

export default Home;
