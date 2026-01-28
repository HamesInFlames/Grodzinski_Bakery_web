// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img 
              src="/images/home/logo.png" 
              alt="Grodzinski Bakery" 
              className="footer__logo"
            />
            <p className="footer__desc">
              Toronto's favourite kosher bakery since 1888. Fresh baked challah, 
              breads, cakes, and pastries made daily in our nut-free facility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/menu" className="footer__link">Menu</Link></li>
              <li><Link to="/gallery" className="footer__link">Gallery</Link></li>
              <li><Link to="/catering" className="footer__link">Catering</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="footer__title">Information</h4>
            <ul className="footer__links">
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/locations" className="footer__link">Locations</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__title">Contact</h4>
            <ul className="footer__links">
              <li><a href="tel:4167890785" className="footer__link">(416) 789-0785</a></li>
              <li><a href="mailto:info@grodzinskibakery.com" className="footer__link">info@grodzinskibakery.com</a></li>
              <li><span className="footer__link">1118 Centre St #3</span></li>
              <li><span className="footer__link">Thornhill, ON L4J 7R9</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {currentYear} Grodzinski Bakery. All rights reserved.
          </p>
          <div className="footer__badges">
            <img 
              src="/images/home/cor_logo.png" 
              alt="COR Kosher" 
              className="footer__badge"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
