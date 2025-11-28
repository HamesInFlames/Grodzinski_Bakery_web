// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Grodzinski Bakery. All rights reserved.</p>
      <p className="footer__note">
        Fresh bread, family traditions, and warm hospitality — every day.
      </p>
    </footer>
  );
}
