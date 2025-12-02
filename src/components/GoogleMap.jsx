// src/components/GoogleMap.jsx
import React from "react";

export default function GoogleMap({ 
  address, 
  title = "Location Map",
  height = "400px",
  className = ""
}) {
  // Convert address to URL-encoded format for Google Maps embed
  const encodedAddress = encodeURIComponent(address);
  
  // Use Google Maps embed API (no API key required for basic embedding)
  const embedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className={`google-map-wrapper ${className}`}>
      <iframe
        title={title}
        src={embedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="google-map__iframe"
      />
      <a
        href={`https://www.google.com/maps?q=${encodedAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="google-map__link"
        aria-label={`Open ${title} in Google Maps`}
      >
        Open in Google Maps →
      </a>
    </div>
  );
}

