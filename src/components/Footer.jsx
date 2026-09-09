// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { BAKERY_EMAIL } from "@/data/bakeryLocation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img
              src="/images/home/logo_white.png"
              alt="Grodzinski Bakery"
              className="footer__wordmark-img"
              loading="lazy"
            />
            <p className="footer__desc">
              Toronto&rsquo;s favourite kosher bakery since 1888. Fresh-baked
              challah, breads, cakes, and pastries made daily in our nut-free
              facility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__title">Visit</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/menu" className="footer__link">Menu</Link></li>
              <li><Link to="/holidays" className="footer__link">Holidays</Link></li>
              <li><Link to="/catering" className="footer__link">Catering</Link></li>
              <li><Link to="/about" className="footer__link">About</Link></li>
              <li><Link to="/visit" className="footer__link">Visit Us</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="footer__title">Hours</h4>
            <ul className="footer__links footer__links--hours">
              <li>Sun 6&ndash;3</li>
              <li>Mon&ndash;Wed 6&ndash;4</li>
              <li>Thu 6&ndash;5</li>
              <li>Fri 6&ndash;4</li>
              <li>Sat Closed</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__title">Contact</h4>
            <ul className="footer__links">
              <li><a href="tel:9058821350" className="footer__link">(905) 882-1350</a></li>
              <li><a href={`mailto:${BAKERY_EMAIL}`} className="footer__link">{BAKERY_EMAIL}</a></li>
              <li><span className="footer__link">1118 Centre St #3</span></li>
              <li><span className="footer__link">Thornhill, ON L4J 7R9</span></li>
            </ul>
          </div>
        </div>

        <hr className="footer__rule" />

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} Grodzinski Bakery. All rights reserved.
          </p>
          <div className="footer__badges">
            <img
              src="/images/home/cor_logo.png"
              alt="COR Kosher Certified"
              className="footer__badge"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
