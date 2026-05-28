import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface VariantImageProps {
  src?: string;
  alt: string;
  isPlaceholder: boolean;
  placeholderText?: string;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function VariantImage({
  src,
  alt,
  isPlaceholder,
  placeholderText,
}: VariantImageProps) {
  const reducedMotion = useReducedMotion();

  const fadeVariants = reducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  const key = isPlaceholder ? `placeholder-${placeholderText}` : `image-${src}`;

  return (
    <div className="variant-image" aria-live="polite">
      <AnimatePresence mode="wait">
        {isPlaceholder ? (
          <motion.div
            key={key}
            className="variant-image__placeholder"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <img
              src="/images/home/logo_trensparent.png"
              alt=""
              aria-hidden="true"
              className="variant-image__brand"
              draggable={false}
            />
            <span>{placeholderText ?? alt}</span>
          </motion.div>
        ) : (
          <motion.img
            key={key}
            src={src}
            alt={alt}
            className="variant-image__img"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            draggable={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
