//src\pages\VisitUs.jsx
import React from "react";
import ContactForm from "../components/ContactForm";
import GoogleMap from "../components/GoogleMap";

function VisitUs() {
  const handleContactSubmit = async (formData) => {
    console.log('Contact form submitted:', formData);
    alert("Thank you for contacting us. A team member will follow up shortly.");
  };

  const bakeryInfo = {
    name: "Grodzinski North",
    address: "1118 Centre St #3, Thornhill, ON L4J 7R9",
    phone: "(416) 789-0785",
    email: "info@grodzinskibakery.com",
    // Google Maps specific location data
    placeId: "0x882b2c25a865754b:0xdd3938687e717ea9",
    coordinates: { lat: 43.8089597, lng: -79.4622583 },
    mapsUrl: "https://www.google.com/maps/place/Grodzinski+North/@43.8091451,-79.4624408,165m",
    hours: [
      { day: "Sunday", time: "7:00 AM – 5:00 PM" },
      { day: "Monday", time: "7:00 AM – 6:00 PM" },
      { day: "Tuesday", time: "7:00 AM – 6:00 PM" },
      { day: "Wednesday", time: "7:00 AM – 6:00 PM" },
      { day: "Thursday", time: "7:00 AM – 9:00 PM" },
      { day: "Friday", time: "7:00 AM – 3:00 PM" },
      { day: "Saturday", time: "Closed" }
    ]
  };

  return (
    <div className="visit-page">
      {/* HERO SECTION */}
      <section className="visit-hero">
        <div className="visit-hero__image-wrapper">
          <img 
            src="/images/home/thumbnail_slider.jpg" 
            alt="Grodzinski Bakery"
            className="visit-hero__image"
          />
          <div className="visit-hero__overlay"></div>
        </div>
        <div className="visit-hero__content">
          <h1>Visit Us</h1>
          <p className="visit-hero__subtitle">
            Stop by our Thornhill bakery to browse our selection, place a custom order, 
            or simply enjoy the warm aroma of fresh bread. We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* MAIN CONTENT - Location + Contact Form Side by Side */}
      <section className="section">
        <div className="section__inner">
          <div className="visit-main">
            {/* LEFT COLUMN: Location Info */}
            <div className="visit-main__location">
              {/* Map */}
              <div className="visit-map">
              <GoogleMap 
                address={bakeryInfo.address}
                title="Grodzinski North Location"
                height="350px"
                placeId={bakeryInfo.placeId}
                coordinates={bakeryInfo.coordinates}
                placeName={bakeryInfo.name}
              />
              </div>

              {/* Location Details Card */}
              <div className="visit-info-card">
                <h2 className="visit-info-card__title">{bakeryInfo.name}</h2>
                
                {/* Address */}
                <div className="visit-info-item">
                  <div className="visit-info-item__icon">📍</div>
                  <div className="visit-info-item__content">
                    <strong>Address</strong>
                    <p>{bakeryInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="visit-info-item">
                  <div className="visit-info-item__icon">📞</div>
                  <div className="visit-info-item__content">
                    <strong>Phone</strong>
                    <p>
                      <a 
                        href={`tel:${bakeryInfo.phone.replace(/[^0-9]/g, '')}`} 
                        className="visit-link"
                      >
                        {bakeryInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="visit-info-item">
                  <div className="visit-info-item__icon">✉️</div>
                  <div className="visit-info-item__content">
                    <strong>Email</strong>
                    <p>
                      <a 
                        href={`mailto:${bakeryInfo.email}`} 
                        className="visit-link"
                      >
                        {bakeryInfo.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="visit-info-item visit-info-item--hours">
                  <div className="visit-info-item__icon">🕐</div>
                  <div className="visit-info-item__content">
                    <strong>Hours</strong>
                    <div className="visit-hours-grid">
                      {bakeryInfo.hours.map(({ day, time }) => (
                        <div 
                          key={day} 
                          className={`visit-hours-row ${day === 'Saturday' ? 'visit-hours-row--closed' : ''}`}
                        >
                          <span className="visit-hours-day">{day}</span>
                          <span className="visit-hours-time">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="visit-actions">
                <a 
                  href={`tel:${bakeryInfo.phone.replace(/[^0-9]/g, '')}`}
                  className="visit-action-btn visit-action-btn--primary"
                >
                  📞 Call Now
                </a>
                <a 
                  href={`https://www.google.com/maps/place/?q=place_id:${bakeryInfo.placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-action-btn visit-action-btn--secondary"
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="visit-main__form">
              <ContactForm
                onSubmit={handleContactSubmit}
                showExtendedFields={true}
                submitButtonText="Send Message"
                successMessage="Thank you for contacting us. A team member will follow up shortly."
                title="Send Us a Message"
              />

              {/* Quick Info Boxes */}
              <div className="visit-info-boxes">
                <div className="visit-info-box visit-info-box--catering">
                  <h3>🎉 Catering & Large Orders</h3>
                  <p>
                    Include your event date, guest count, and preferred products. 
                    We recommend 48-72 hours advance notice for catering orders.
                  </p>
                </div>

                <div className="visit-info-box visit-info-box--cakes">
                  <h3>🎂 Custom Cakes</h3>
                  <p>
                    For custom cake designs, call us directly to discuss flavours, 
                    sizes, and decorations for your special celebration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANNING YOUR VISIT */}
      <section className="section section--alt">
        <div className="section__inner">
          <div className="visit-planning">
            <div className="visit-planning__content">
              <h2>Planning Your Visit</h2>
              <p className="visit-planning__intro">
                We're always happy to welcome customers to our Thornhill bakery! 
                Here's what you should know:
              </p>
              <ul className="visit-planning__list">
                <li>
                  <span className="visit-planning__icon">🅿️</span>
                  <span>Free parking available on-site</span>
                </li>
                <li>
                  <span className="visit-planning__icon">⏰</span>
                  <span>Busiest times: Thursday evenings & Friday mornings</span>
                </li>
                <li>
                  <span className="visit-planning__icon">📞</span>
                  <span>For custom cakes or large orders, please call ahead</span>
                </li>
                <li>
                  <span className="visit-planning__icon">✡️</span>
                  <span>Closed Saturdays in observance of Shabbat</span>
                </li>
                <li>
                  <span className="visit-planning__icon">📅</span>
                  <span>Holiday hours vary — call to confirm before visiting</span>
                </li>
              </ul>
            </div>
            <div className="visit-planning__image">
              <img 
                src="/images/home/thumbnail_challahs.jpg" 
                alt="Fresh challahs at Grodzinski Bakery"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FIND OUR PRODUCTS NEARBY */}
      <section className="section">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">Find Our Products Near You</h2>
            <p className="section__subtitle">
              Grodzinski products are also available at select stores, markets, 
              and cafés throughout the Greater Toronto Area.
            </p>
          </div>

          <div className="visit-partners">
            <div className="visit-partner-card">
              <div className="visit-partner-card__icon">🏪</div>
              <h3>Thornhill Area Markets</h3>
              <p>
                Find our challahs, breads, and pastries at select supermarkets and 
                kosher markets along Bathurst and Centre Street.
              </p>
            </div>

            <div className="visit-partner-card">
              <div className="visit-partner-card__icon">🛒</div>
              <h3>North York & York Region</h3>
              <p>
                Our fresh baked goods are available at independent grocery stores 
                and specialty food shops throughout North York.
              </p>
            </div>

            <div className="visit-partner-card">
              <div className="visit-partner-card__icon">🤝</div>
              <h3>Become a Partner</h3>
              <p>
                Interested in carrying Grodzinski products at your store? 
                Contact us to discuss wholesale opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VisitUs;
