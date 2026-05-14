// src/pages/Gallery.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryCategories } from '../data/galleryCategories';
import { ScrollReveal, FadeIn } from '../components/AnimationWrappers';
import {
  LayoutGrid, Heart, Baby, Cake, Apple, Flame, Sparkles,
  Flower2, Gift, Ghost, TreePine, Search, Camera, Drama
} from "lucide-react";

const categoryIcons = {
  'all': <LayoutGrid size={18} />,
  'wedding': <Heart size={18} />,
  'baby': <Baby size={18} />,
  'birthday': <Cake size={18} />,
  'rosh-hashanah': <Apple size={18} />,
  'chanukah': <Flame size={18} />,
  'purim': <Drama size={18} />,
  'shavuot': <Flower2 size={18} />,
  'fathers-day': <Gift size={18} />,
  'mothers-day': <Flower2 size={18} />,
  'halloween': <Ghost size={18} />,
  'valentines': <Heart size={18} />,
  'christmas': <TreePine size={18} />,
  'custom': <Sparkles size={18} />,
};

const getGalleryImages = (categoryId) => {
  const weddingImages = Array.from({ length: 10 }, (_, i) =>
    `/images/baked_goods/Cookies/Engagement & Wedding Cookies/imgi_${14 + i}_products_thumbnail_TlFBsNuSug.jpg`
  );
  const babyImages = Array.from({ length: 8 }, (_, i) =>
    `/images/baked_goods/Cookies/Baby Cookies/imgi_${14 + i}_products_thumbnail_I1D0S8y0ti.jpg`
  );
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
    case 'wedding': return weddingImages;
    case 'baby': return babyImages;
    case 'all':
    default: return allImages;
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
          <FadeIn delay={0.2}>
            <h1>Custom Creations Gallery</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="gallery-hero__subtitle">
              Browse our beautiful collection of custom cookies and cakes for every
              occasion — weddings, baby showers, holidays, and more.
            </p>
          </FadeIn>
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
              <span className="gallery-filter-btn__icon">{categoryIcons[cat.id]}</span>
              <span className="gallery-filter-btn__label">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="gallery-content__inner">
          {images.length > 0 ? (
            <motion.div
              className="gallery-grid"
              layout
            >
              <AnimatePresence mode="popLayout">
                {images.map((src, i) => (
                  <motion.div
                    key={`${activeFilter}-${src}`}
                    className="gallery-item"
                    onClick={() => openLightbox(src)}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
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
                      <span className="gallery-item__zoom"><Search size={20} /></span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="gallery-empty">
              <span className="gallery-empty__icon"><Camera size={32} /></span>
              <h3>Coming Soon</h3>
              <p>We're adding more images to this category. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="gallery-cta">
          <div className="gallery-cta__inner">
            <h2>Ready to Order?</h2>
            <p>
              Contact us to discuss your custom cookie or cake order.
              We'll bring your vision to life!
            </p>
            <div className="gallery-cta__actions">
              <a href="/visit" className="btn btn--primary">Contact Us</a>
              <a href="tel:9058821350" className="btn btn--secondary">Call (905) 882-1350</a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="lightbox__close" onClick={closeLightbox}>×</button>
            <motion.div
              className="lightbox__content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={selectedImage}
                alt="Gallery preview"
                className="lightbox__image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
