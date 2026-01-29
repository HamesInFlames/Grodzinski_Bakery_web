// src/components/GoogleMap.jsx
import React from "react";

export default function GoogleMap({ 
  address, 
  title = "Location Map",
  height = "400px",
  className = "",
  placeId = null,
  coordinates = null,
  placeName = null
}) {
  // Build the embed URL - prefer placeId, then coordinates, then address
  let embedUrl;
  let mapsLink;

  if (placeId) {
    // Use Place ID for most accurate location
    embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${coordinates?.lng || -79.4622583}!3d${coordinates?.lat || 43.8089597}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${placeId}!2s${encodeURIComponent(placeName || address)}!5e0!3m2!1sen!2sca!4v1706000000000!5m2!1sen!2sca`;
    mapsLink = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  } else if (coordinates) {
    // Use coordinates
    embedUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`;
    mapsLink = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  } else {
    // Fallback to address search
    const encodedAddress = encodeURIComponent(address);
    embedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    mapsLink = `https://www.google.com/maps?q=${encodedAddress}`;
  }

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
        href={mapsLink}
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

