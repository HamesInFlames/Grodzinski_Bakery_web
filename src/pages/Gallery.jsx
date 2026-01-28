// src/pages/Gallery.jsx
import { useState, useEffect } from 'react';
import { galleryCategories } from '../productData';

// Sample gallery images - these would be dynamically loaded in production
const getGalleryImages = (categoryId) => {
  // Wedding images
  const weddingImages = Array.from({ length: 10 }, (_, i) => 
    `/images/baked_goods/Cookies/Engagement & Wedding Cookies/imgi_${14 + i}_products_thumbnail_TlFBsNuSug.jpg`
  );
  
  // Baby shower images  
  const babyImages = Array.from({ length: 8 }, (_, i) => 
    `/images/baked_goods/Cookies/Baby Cookies/imgi_${14 + i}_products_thumbnail_I1D0S8y0ti.jpg`
  );
  
  // Default/all images
  const allImages = [
    '/images/home/thumbnail_cookies.jpg',
    '/images/home/thumbnail_cakes.jpg',
    '/images/home/thumbnail_challahs.jpg',
    '/images/home/thumbnail_babkas.jpg',
    '/images/home/thumbnail_danishes_sweets.jpg',
    '/images/home/thumbnail_loafcakes.jpg',
    '/images/home/thumbnail_pies.jpg',
    '/images/home/thumbnail_gift_basket.jpg',
    '/images/home/thumbnail_large_cookie_platter.jpg',
    '/images/home/thumbnail_assorted_danishes_muffin_tray.jpg',
    '/images/home/thumbnail_slider (2).jpg',
    '/images/home/thumbnail_slider (3).jpg',
  ];

  switch (categoryId) {
    case 'wedding':
      return weddingImages;
    case 'baby':
      return babyImages;
    case 'all':
    default:
      return allImages;
  }
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(getGalleryImages(activeFilter));
  }, [activeFilter]);

  const openLightbox = (src) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero__inner">
          <h1>Custom Creations Gallery</h1>
          <p className="gallery-hero__subtitle">
            Browse our beautiful collection of custom cookies and cakes for every 
            occasion — weddings, baby showers, holidays, and more.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="gallery-filters">
        <div className="gallery-filters__inner">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              className={`gallery-filter-btn ${activeFilter === cat.id ? 'gallery-filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              <span className="gallery-filter-btn__icon">{cat.icon}</span>
              <span className="gallery-filter-btn__label">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="gallery-content__inner">
          {images.length > 0 ? (
            <div className="gallery-grid">
              {images.map((src, i) => (
                <div 
                  key={i}
                  className="gallery-item"
                  onClick={() => openLightbox(src)}
                >
                  <img 
                    src={src} 
                    alt={`Custom creation ${i + 1}`}
                    className="gallery-item__image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/home/thumbnail_cookies.jpg';
                    }}
                  />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__zoom">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <span className="gallery-empty__icon">📷</span>
              <h3>Coming Soon</h3>
              <p>We're adding more images to this category. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="gallery-cta">
        <div className="gallery-cta__inner">
          <h2>Ready to Order?</h2>
          <p>
            Contact us to discuss your custom cookie or cake order. 
            We'll bring your vision to life!
          </p>
          <div className="gallery-cta__actions">
            <a href="/contact" className="btn btn--primary">Contact Us</a>
            <a href="tel:4167890785" className="btn btn--secondary">Call (416) 789-0785</a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox}>×</button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Gallery preview" 
              className="lightbox__image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
