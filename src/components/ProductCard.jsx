// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ 
  name, 
  description, 
  tags = [], 
  price,
  imageSrc, 
  imageAlt 
}) {
  return (
    <article className="card card--soft">
      {/* Image placeholder - ready for future image integration */}
      {imageSrc && (
        <div className="card__image-wrapper mb-3 rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={imageSrc} 
            alt={imageAlt || name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {description}
      </p>
      
      {price && (
        <p className="text-amber-700 font-semibold text-base mb-2">
          {price}
        </p>
      )}
      
      {tags && tags.length > 0 && (
        <ul className="card__tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

