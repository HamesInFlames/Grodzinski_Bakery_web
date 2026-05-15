import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__inner">
        <p className="not-found__eyebrow">404</p>
        <h1 className="not-found__title">This page got eaten</h1>
        <p className="not-found__copy">
          We couldn't find the page you're after — maybe it was a particularly
          good challah. Let's get you back to the fresh bread.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary btn--lg">
            Back to home
          </Link>
          <Link to="/menu" className="btn btn--ghost btn--lg">
            Browse the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
