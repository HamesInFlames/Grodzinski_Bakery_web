//src\pages\Contact.jsx
import React from "react";
import ContactForm from "../components/ContactForm";
import GoogleMap from "../components/GoogleMap";

function Contact() {
  const handleContactSubmit = async (formData) => {
    // TODO: When backend is implemented, replace with actual API call
    console.log('Contact form submitted:', formData);
    alert("Thank you for contacting us. A team member will follow up shortly.");
  };

  const bakeryAddress = "1118 Centre St #3, Thornhill, ON L4J 7R9";
  const bakeryPhone = "(905) 882-1350";
  const bakeryEmail = "info@grodzinskibakery.com";

  return (
    <div className="contact-page-wrapper">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-hero__image-wrapper">
          <img 
            src="/images/home/thumbnail_slider (3).jpg" 
            alt="Contact Grodzinski Bakery"
            className="contact-hero__image"
          />
          <div className="contact-hero__overlay"></div>
        </div>
        <div className="contact-hero__content">
          <h1>Contact Us</h1>
          <p className="contact-hero__subtitle">
            We'd love to hear from you! Whether you have questions about our products, 
            need assistance with a custom order, or want to discuss catering options, 
            our team is here to help.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="section__inner">
          <div className="contact-main">
            {/* LEFT: Contact Info & Map */}
            <div className="contact-main__info">
              <div className="contact-info-card">
                <h2>Grodzinski Bakery — Thornhill</h2>
                <div className="contact-info-item">
                  <div className="contact-info-item__icon">📍</div>
                  <div className="contact-info-item__content">
                    <strong>Address:</strong>
                    <p>{bakeryAddress}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-item__icon">📞</div>
                  <div className="contact-info-item__content">
                    <strong>Phone:</strong>
                    <p><a href={`tel:${bakeryPhone.replace(/[^0-9]/g, '')}`} className="contact-link">{bakeryPhone}</a></p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-item__icon">✉️</div>
                  <div className="contact-info-item__content">
                    <strong>Email:</strong>
                    <p><a href={`mailto:${bakeryEmail}`} className="contact-link">{bakeryEmail}</a></p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map-wrapper">
                <GoogleMap 
                  address={bakeryAddress}
                  title="Grodzinski Bakery Location"
                  height="300px"
                />
              </div>

              {/* Quick Info Boxes */}
              <div className="contact-info-boxes">
                <div className="contact-info-box contact-info-box--catering">
                  <h3>For Catering & Large Orders</h3>
                  <p>
                    Please include your event date, approximate number of guests, 
                    preferred products, and whether you need pickup or delivery. 
                    We recommend placing catering orders at least 48-72 hours in advance.
                  </p>
                </div>

                <div className="contact-info-box contact-info-box--cakes">
                  <h3>Custom Cakes</h3>
                  <p>
                    For custom cake designs, please call us directly to discuss flavours, 
                    sizes, decorations, and dietary requirements. We're happy to work 
                    with you to create the perfect cake for your celebration.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="contact-main__form">
              <ContactForm
                onSubmit={handleContactSubmit}
                showExtendedFields={true}
                submitButtonText="Send Message"
                successMessage="Thank you for contacting us. A team member will follow up shortly."
                title="Send Us a Message"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL INFO */}
      <section className="section section--light">
        <div className="section__inner">
          <div className="contact-additional">
            <div className="contact-additional__image">
              <img 
                src="/images/home/thumbnail_slider (4).jpg" 
                alt="Visit Grodzinski Bakery"
                className="contact-additional__img"
              />
            </div>
            <div className="contact-additional__content">
              <h2>Visit Us in Person</h2>
              <p className="section__text">
                We're always happy to welcome customers to our Thornhill bakery! Stop by 
                to browse our selection, place a custom order, or simply enjoy the warm 
                aroma of fresh bread.
              </p>
              <ul className="contact-additional__list">
                <li>✅ Free parking available on-site</li>
                <li>✅ Our busiest times are Thursday evenings and Friday mornings</li>
                <li>✅ For custom cakes or large orders, please call ahead</li>
                <li>✅ We're closed on Saturdays in observance of Shabbat</li>
                <li>✅ Holiday hours vary — call to confirm before visiting</li>
              </ul>
              <div className="contact-additional__actions">
                <a href="/locations" className="btn btn--primary">
                  View Location Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
