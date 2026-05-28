interface Badge {
  label: string;
  // Only genuine transparent PNGs belong here; the other certs ship as
  // opaque JPEGs that render as solid white blocks under the banner filter.
  image?: string;
}

const BADGES: Badge[] = [
  { label: 'COR Certified Kosher', image: '/images/certifications/cor-kosher.png' },
  { label: 'Nut Free' },
  { label: 'Pas Yisroel' },
  { label: 'Chalav Yisroel' },
  { label: 'Dairy Chalav Yisroel' },
];

export default function KosherBanner() {
  const items = [...BADGES, ...BADGES];

  return (
    <div className="kosher-banner" aria-hidden="true">
      <div className="kosher-banner__track">
        {items.map((badge, i) => (
          <span key={`${badge.label}-${i}`} className="kosher-banner__item">
            {i > 0 && <span className="kosher-banner__dot">&middot;</span>}
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
