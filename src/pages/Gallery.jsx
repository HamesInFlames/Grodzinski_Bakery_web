// src/pages/Gallery.jsx
import { ScrollReveal, FadeIn } from '../components/AnimationWrappers';
import { Camera } from "lucide-react";

// TODO: Re-enable these imports when photos are added
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { galleryCategories } from '../data/galleryCategories';

export default function Gallery() {

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero__image-wrapper">
          <img
            src="/images/home/thumbnail_slider (1).png"
            alt="Grodzinski Bakery gallery"
            className="gallery-hero__image"
          />
          <div className="gallery-hero__overlay"></div>
        </div>
        <div className="gallery-hero__content">
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

      {/* TODO: Re-enable gallery filters and image grid once photos are added */}

      {/* Coming Soon Placeholder */}
      <section className="gallery-content">
        <div className="gallery-content__inner">
          <div className="gallery-empty">
            <img
              src="/images/coming-soon.png"
              alt="Coming Soon"
              className="gallery-empty__image"
            />
            <h3>Coming Soon</h3>
            <p>
              We're curating a beautiful collection of our custom creations —
              cakes, cookies, platters, and more. Check back soon!
            </p>
          </div>
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

      {/* TODO: Re-enable lightbox when photos are added */}
    </div>
  );
}
