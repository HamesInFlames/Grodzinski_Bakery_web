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
    <article className={`card card--location ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      
      {address && (
        <p className="text-gray-700 mb-2 leading-relaxed">{address}</p>
      )}
      
      {hours && (
        <div className="card__detail mb-2">
          <strong className="text-gray-800">Hours:</strong>
          <div className="mt-1 text-gray-600 text-sm leading-relaxed">
            {typeof hours === 'string' ? (
              <p>{hours}</p>
            ) : (
              hours.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))
            )}
          </div>
        </div>
      )}
      
      {phone && (
        <p className="card__detail">
          <strong className="text-gray-800">Phone:</strong>{" "}
          <a 
            href={`tel:${phone.replace(/[^0-9]/g, '')}`}
            className="text-amber-700 hover:text-amber-800 transition"
          >
            {phone}
          </a>
        </p>
      )}
      
      {additionalInfo && (
        <p className="card__detail mt-3 text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">
          {additionalInfo}
        </p>
      )}
    </article>
  );
}

