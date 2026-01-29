//src\pages\Locations.jsx
import React from "react";
import LocationCard from "../components/LocationCard";
import GoogleMap from "../components/GoogleMap";

function Locations() {
  const mainLocation = {
    name: "Grodzinski Bakery — Main Location",
    address: "1118 Centre St #3, Thornhill, ON L4J 7R9",
    hours: [
      "Sunday: 7:00 AM – 5:00 PM",
      "Monday: 7:00 AM – 6:00 PM",
      "Tuesday: 7:00 AM – 6:00 PM",
      "Wednesday: 7:00 AM – 6:00 PM",
      "Thursday: 7:00 AM – 9:00 PM",
      "Friday: 7:00 AM – 3:00 PM (seasonal)",
      "Saturday: Closed"
    ],
    phone: "(905) 882-1350",
    additionalInfo: "Free parking available. Hours may vary during Jewish holidays. We recommend calling ahead for holiday schedules and to confirm product availability."
  };

  return (
    <div className="locations-page">
      {/* HERO SECTION */}
      <section className="locations-hero">
        <div className="locations-hero__image-wrapper">
          <img 
            src="/images/home/thumbnail_slider.jpg" 
            alt="Grodzinski Bakery exterior"
            className="locations-hero__image"
          />
          <div className="locations-hero__overlay"></div>
        </div>
        <div className="locations-hero__content">
          <h1>Visit Our Bakery</h1>
          <p className="locations-hero__subtitle">
            We're located in the heart of Thornhill, serving fresh-baked goods 
            to the Greater Toronto Area. Stop by to browse our selection, place 
            a custom order, or simply enjoy the warm aroma of fresh bread.
          </p>
        </div>
      </section>

      {/* MAIN LOCATION WITH MAP */}
      <section className="section">
        <div className="section__inner">
          <div className="locations-main">
            {/* LEFT: Location Details */}
            <div className="locations-main__details">
              <LocationCard
                name={mainLocation.name}
                address={mainLocation.address}
                hours={mainLocation.hours}
                phone={mainLocation.phone}
                additionalInfo={mainLocation.additionalInfo}
              />

              {/* Quick Actions */}
              <div className="locations-actions">
                <a 
                  href={`tel:${mainLocation.phone.replace(/[^0-9]/g, '')}`}
                  className="locations-action-btn locations-action-btn--primary"
                >
                  📞 Call Us
                </a>
                <a 
                  href={`https://www.google.com/maps?q=${encodeURIComponent(mainLocation.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="locations-action-btn locations-action-btn--secondary"
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>

            {/* RIGHT: Google Map */}
            <div className="locations-main__map">
              <GoogleMap 
                address={mainLocation.address}
                title="Grodzinski Bakery Thornhill Location"
                height="500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOCATIONS */}
      <section className="section section--light">
        <div className="section__inner">
          <h2>Find Our Products Near You</h2>
          <p className="section__subtitle">
            Grodzinski products are also available at select stores, markets, 
            and cafés throughout the Greater Toronto Area.
          </p>

          <div className="locations-partners">
            <div className="locations-partner-card">
              <div className="locations-partner-card__image">
                <img 
                  src="/images/home/thumbnail_gift_basket.jpg" 
                  alt="Thornhill area markets"
                  className="locations-partner-card__img"
                />
              </div>
              <div className="locations-partner-card__content">
                <h3>Thornhill Area Markets</h3>
                <p>
                  Grodzinski products are available at select supermarkets and kosher 
                  markets in the Bathurst Street and Centre Street corridor of Thornhill.
                </p>
                <p className="card__detail mt-3">
                  Look for our challahs, breads, and pastries in the bakery section, or 
                  ask store staff where to find Grodzinski products. Availability varies 
                  by location.
                </p>
              </div>
            </div>

            <div className="locations-partner-card">
              <div className="locations-partner-card__image">
                <img 
                  src="/images/home/thumbnail_assorted_bagles.jpg" 
                  alt="North York markets"
                  className="locations-partner-card__img"
                />
              </div>
              <div className="locations-partner-card__content">
                <h3>North York & York Region</h3>
                <p>
                  Our fresh baked goods can be found at independent grocery stores, 
                  kosher markets, and specialty food shops throughout North York and 
                  York Region.
                </p>
                <p className="card__detail mt-3">
                  Contact us if you'd like to know which stores in your neighbourhood 
                  carry Grodzinski products, or ask your local market to stock our items.
                </p>
              </div>
            </div>

            <div className="locations-partner-card">
              <div className="locations-partner-card__image">
                <img 
                  src="/images/home/thumbnail_cakes.jpg" 
                  alt="GTA partner stores"
                  className="locations-partner-card__img"
                />
              </div>
              <div className="locations-partner-card__content">
                <h3>GTA Partner Stores</h3>
                <p>
                  We partner with select cafés, markets, and kosher establishments 
                  throughout the Greater Toronto Area to bring our baked goods to more 
                  communities.
                </p>
                <p className="card__detail mt-3">
                  If you're interested in carrying Grodzinski products at your store or 
                  café, please contact us to discuss wholesale opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT INFO SECTION */}
      <section className="section">
        <div className="section__inner">
          <div className="locations-visit-info">
            <div className="locations-visit-info__image">
              <img 
                src="/images/home/thumbnail_challahs.jpg" 
                alt="Fresh challahs at Grodzinski Bakery"
                className="locations-visit-info__img"
              />
            </div>
            <div className="locations-visit-info__content">
              <h2>Planning to Visit?</h2>
              <p className="section__text">
                We're always happy to welcome customers to our Thornhill bakery! Here are 
                a few things to know before you visit:
              </p>
              <ul className="locations-visit-info__list">
                <li>✅ Free parking is available on-site</li>
                <li>✅ Our busiest times are Thursday evenings and Friday mornings</li>
                <li>✅ For custom cakes or large orders, please call ahead</li>
                <li>✅ We're closed on Saturdays in observance of Shabbat</li>
                <li>✅ Holiday hours vary — call to confirm before visiting</li>
              </ul>
              <div className="locations-visit-info__contact">
                <p>
                  <strong>Questions about hours, products, or availability?</strong><br />
                  Call us at <a href="tel:9058821350" className="locations-link">(905) 882-1350</a> or 
                  email <a href="mailto:info@grodzinskibakery.com" className="locations-link">info@grodzinskibakery.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Locations;
