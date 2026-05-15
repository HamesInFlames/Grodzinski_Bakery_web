//src/pages/VisitUs.jsx
// TODO: Re-enable ContactForm once backend endpoint is wired up
// import ContactForm from "../components/ContactForm";
import GoogleMap from "../components/GoogleMap";
import { ScrollReveal, FadeIn, StaggerContainer, StaggerItem } from "../components/AnimationWrappers";
import { MapPin, Phone, Mail, Clock, Map, Sparkles, Cake, Car, Star, Calendar, Store, ShoppingCart, Handshake } from "lucide-react";

function VisitUs() {
  const bakeryInfo = {
    name: "Grodzinski North",
    address: "1118 Centre St #3, Thornhill, ON L4J 7R9",
    phone: "(905) 882-1350",
    email: "info@grodzinskibakery.com",
    placeId: "0x882b2c25a865754b:0xdd3938687e717ea9",
    coordinates: { lat: 43.8089597, lng: -79.4622583 },
    hours: [
      { day: "Sunday", time: "6:00 AM – 3:00 PM" },
      { day: "Monday", time: "6:00 AM – 4:00 PM" },
      { day: "Tuesday", time: "6:00 AM – 4:00 PM" },
      { day: "Wednesday", time: "6:00 AM – 4:00 PM" },
      { day: "Thursday", time: "6:00 AM – 5:00 PM" },
      { day: "Friday", time: "6:00 AM – 3:00 PM" },
      { day: "Saturday", time: "Closed" }
    ]
  };

  return (
    <div className="visit-page">
      {/* HERO */}
      <section className="visit-hero">
        <div className="visit-hero__image-wrapper">
          <img
            src="/images/home/thumbnail_slider.png"
            alt="Grodzinski Bakery"
            className="visit-hero__image"
          />
          <div className="visit-hero__overlay"></div>
        </div>
        <div className="visit-hero__content">
          <FadeIn delay={0.2}>
            <h1>Visit Us</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="visit-hero__subtitle">
              Stop by our Thornhill bakery to browse our selection, place a custom order,
              or simply enjoy the warm aroma of fresh bread.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* MAP + INFO */}
      <section className="section">
        <div className="section__inner">
          <ScrollReveal>
            <div className="visit-map visit-map--full">
              <GoogleMap
                address={bakeryInfo.address}
                title="Grodzinski North Location"
                height="400px"
                placeId={bakeryInfo.placeId}
                coordinates={bakeryInfo.coordinates}
                placeName={bakeryInfo.name}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="visit-details">
              <div className="visit-details__card">
                <div className="visit-details__icon"><MapPin size={22} /></div>
                <strong>Address</strong>
                <p>{bakeryInfo.address}</p>
              </div>

              <div className="visit-details__card">
                <div className="visit-details__icon"><Phone size={22} /></div>
                <strong>Phone</strong>
                <p>
                  <a href={`tel:${bakeryInfo.phone.replace(/[^0-9]/g, '')}`} className="visit-link">
                    {bakeryInfo.phone}
                  </a>
                </p>
              </div>

              <div className="visit-details__card">
                <div className="visit-details__icon"><Mail size={22} /></div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${bakeryInfo.email}`} className="visit-link">
                    {bakeryInfo.email}
                  </a>
                </p>
              </div>

              <div className="visit-details__card visit-details__card--hours">
                <div className="visit-details__icon"><Clock size={22} /></div>
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
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="visit-actions visit-actions--centered">
              <a
                href={`tel:${bakeryInfo.phone.replace(/[^0-9]/g, '')}`}
                className="visit-action-btn visit-action-btn--primary"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${bakeryInfo.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-action-btn visit-action-btn--secondary"
              >
                <Map size={16} /> Get Directions
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SPECIAL ORDERS & PLANNING */}
      <section className="section section--alt">
        <div className="section__inner">
          <ScrollReveal>
            <div className="section__header">
              <h2 className="section__title">Special Orders</h2>
              <p className="section__subtitle">
                From celebration cakes to event catering, we're here to help make
                your occasion memorable.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="visit-info-boxes visit-info-boxes--grid">
              <div className="visit-info-box">
                <h3><Sparkles size={20} /> Catering & Large Orders</h3>
                <p>
                  Hosting an event? We offer platters, breads, and pastries for
                  gatherings of any size. Call us at least 48–72 hours in advance
                  so we can prepare everything fresh.
                </p>
                <a
                  href={`tel:${bakeryInfo.phone.replace(/[^0-9]/g, '')}`}
                  className="visit-link"
                >
                  <Phone size={14} /> {bakeryInfo.phone}
                </a>
              </div>
              <div className="visit-info-box">
                <h3><Cake size={20} /> Custom Cakes</h3>
                <p>
                  Celebrating a birthday, anniversary, or milestone? Call us to
                  discuss flavours, sizes, and decorations — we'll create
                  something special for your occasion.
                </p>
                <a
                  href={`tel:${bakeryInfo.phone.replace(/[^0-9]/g, '')}`}
                  className="visit-link"
                >
                  <Phone size={14} /> {bakeryInfo.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <div className="visit-planning">
            <ScrollReveal direction="left" className="visit-planning__content">
              <h2>Before You Visit</h2>
              <p className="visit-planning__intro">
                A few things to know before stopping by:
              </p>
              <ul className="visit-planning__list">
                {[
                  { icon: <Car size={20} />, text: "Free parking available on-site" },
                  { icon: <Clock size={20} />, text: "Busiest times: Thursday evenings & Friday mornings" },
                  { icon: <Phone size={20} />, text: "Custom cakes and large orders require a phone call ahead" },
                  { icon: <Star size={20} />, text: "Closed Saturdays in observance of Shabbat" },
                  { icon: <Calendar size={20} />, text: "Holiday hours may differ — give us a call to confirm" },
                ].map((item, i) => (
                  <li key={i}>
                    <span className="visit-planning__icon">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FIND OUR PRODUCTS NEARBY */}
      <section className="section">
        <div className="section__inner">
          <ScrollReveal>
            <div className="section__header">
              <h2 className="section__title">Find Our Products Near You</h2>
              <p className="section__subtitle">
                Grodzinski products are also available at select stores, markets,
                and cafés throughout the Greater Toronto Area.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="visit-partners" staggerDelay={0.12}>
            {[
              { icon: <Store size={28} />, title: "Thornhill Area Markets", desc: "Find our challahs, breads, and pastries at select supermarkets and kosher markets along Bathurst and Centre Street." },
              { icon: <ShoppingCart size={28} />, title: "North York & York Region", desc: "Our fresh baked goods are available at independent grocery stores and specialty food shops throughout North York." },
              { icon: <Handshake size={28} />, title: "Become a Partner", desc: "Interested in carrying Grodzinski products at your store? Contact us to discuss wholesale opportunities." },
            ].map((partner, i) => (
              <StaggerItem key={i}>
                <div className="visit-partner-card">
                  <div className="visit-partner-card__icon">{partner.icon}</div>
                  <h3>{partner.title}</h3>
                  <p>{partner.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* TODO: Re-enable ContactForm section once backend endpoint is wired up */}
    </div>
  );
}

export default VisitUs;
