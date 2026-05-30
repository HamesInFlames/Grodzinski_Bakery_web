interface Badge {
  label: string;
  image?: string;
}

const BADGES: Badge[] = [
  { label: 'COR Certified', image: '/images/certifications/cor-kosher.png' },
  { label: 'Nut Free' },
  { label: 'Pas Yisroel' },
  { label: 'Chalav Yisroel' },
];

// Repeat enough times so each half overflows the widest viewport.
const REPEAT = 6;

export default function KosherBanner() {
  const half = Array.from({ length: REPEAT }, () => BADGES).flat();

  return (
    <div className="kosher-banner" aria-hidden="true">
      <div className="kosher-banner__track">
        {/* Two identical halves — animation scrolls -50% then resets seamlessly */}
        {[half, half].flat().map((badge, i) => (
          <span key={i} className="kosher-banner__item">
            {badge.image && (
              <img
                src={badge.image}
                alt=""
                className="kosher-banner__badge-img"
                loading="lazy"
              />
            )}
            <span>{badge.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
