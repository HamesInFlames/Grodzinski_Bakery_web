import { useReducedMotion } from '@/hooks/useReducedMotion';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  /** 'cover' for landscape containers, 'contain' for portrait/square */
  objectFit?: 'cover' | 'contain';
  /** Render a blurred backdrop behind a contain-fit video to fill the card */
  backdrop?: boolean;
}

export function VideoBackground({
  videoSrc,
  posterSrc,
  alt,
  className = '',
  overlay = false,
  objectFit = 'cover',
  backdrop = false,
}: VideoBackgroundProps) {
  const reducedMotion = useReducedMotion();

  const videoProps = {
    src: videoSrc,
    poster: posterSrc,
    autoPlay: true as const,
    muted: true as const,
    loop: true as const,
    playsInline: true as const,
    preload: 'metadata' as const,
    'aria-hidden': true as const,
  };

  if (backdrop && !reducedMotion) {
    return (
      <div className={`video-bg video-bg--backdrop ${className}`}>
        <video
          {...videoProps}
          className="video-bg__blur-layer"
        />
        <video
          {...videoProps}
          className="video-bg__main-layer"
        />
        {overlay && <div className="video-bg__overlay" aria-hidden="true" />}
      </div>
    );
  }

  if (backdrop && reducedMotion) {
    return (
      <div className={`video-bg video-bg--backdrop ${className}`}>
        <img
          src={posterSrc}
          alt=""
          loading="lazy"
          className="video-bg__blur-layer"
        />
        <img
          src={posterSrc}
          alt={alt}
          loading="lazy"
          className="video-bg__main-layer"
        />
        {overlay && <div className="video-bg__overlay" aria-hidden="true" />}
      </div>
    );
  }

  return (
    <div className={`video-bg ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {reducedMotion ? (
        <img
          src={posterSrc}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit, display: 'block' }}
        />
      ) : (
        <video
          {...videoProps}
          style={{ width: '100%', height: '100%', objectFit, display: 'block' }}
        />
      )}
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35))',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
