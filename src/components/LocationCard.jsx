// src/components/LocationCard.jsx
import React from "react";

export default function LocationCard({ 
  name, 
  address, 
  hours, 
  phone, 
  additionalInfo,
  className = ""
}) {
  return (
    <article className={`location-card ${className}`}>
      <h3 className="location-card__name">{name}</h3>
      
      {address && (
        <div className="location-card__item">
          <span className="location-card__icon">📍</span>
          <div className="location-card__content">
            <strong>Address</strong>
            <p>{address}</p>
          </div>
        </div>
      )}
      
      {phone && (
        <div className="location-card__item">
          <span className="location-card__icon">📞</span>
          <div className="location-card__content">
            <strong>Phone</strong>
            <p>
              <a 
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="location-card__link"
              >
                {phone}
              </a>
            </p>
          </div>
        </div>
      )}
      
      {hours && (
        <div className="location-card__item">
          <span className="location-card__icon">🕐</span>
          <div className="location-card__content">
            <strong>Hours</strong>
            <div className="location-card__hours">
              {typeof hours === 'string' ? (
                <p>{hours}</p>
              ) : (
                hours.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      
      {additionalInfo && (
        <div className="location-card__note">
          {additionalInfo}
        </div>
      )}
    </article>
  );
}

