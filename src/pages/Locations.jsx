//src\pages\Locations.jsx
import React from "react";

function Locations() {
  return (
    <section className="section">
      <div className="section__inner locations-page">
        <h1>Locations & Hours</h1>
        <p className="section__subtitle">
          Visit us at our main bakery or find our products at partner stores
          across the GTA.
        </p>

        <div className="cards-grid cards-grid--locations">
          <article className="card card--location">
            <h3>Toronto Bakery</h3>
            <p>3437 Bathurst St, North York, ON M6A 2C3</p>
            <p className="card__detail">
              Sun: 6:00am–3:00pm · Mon–Tue: 6:00am–4:00pm · Wed: 6:00am–4:00pm ·
              Thu: 6:00am–6:00pm · Fri: seasonal hours.
            </p>
            <p className="card__detail">Phone: (416) 789-0785</p>
          </article>

          <article className="card card--location">
            <h3>Thornhill Area</h3>
            <p>
              Grodzinski products available at select supermarkets and cafés in
              the Bathurst & Centre area of Thornhill.
            </p>
            <p className="card__detail">
              Check in-store signage or ask staff for Grodzinski breads and
              pastries.
            </p>
          </article>

          <article className="card card--location">
            <h3>GTA Partner Stores</h3>
            <p>
              Our challahs, breads, and baked goods can be found at a number of
              independent markets and cafés throughout the GTA.
            </p>
            <p className="card__detail">
              Availability varies — contact us if you’re looking for a specific
              product in your neighbourhood.
            </p>
          </article>
        </div>

        <p className="locations-page__note">
          Hours and availability may change for holidays and special occasions.
          Please call the bakery for the most up-to-date information.
        </p>
      </div>
    </section>
  );
}

export default Locations;
