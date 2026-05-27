const BADGES = [
  { label: 'COR Certified Kosher', image: '/images/certifications/cor-kosher.png' },
  { label: 'Pas Yisroel', image: '/images/certifications/pas-yisroel.png' },
  { label: 'Chalav Yisroel', image: '/images/certifications/chalav-yisroel.png' },
  { label: 'Dairy Chalav Yisroel', image: '/images/certifications/dairy-chalav-yisroel.png' },
] as const;

export default function KosherBanner() {
  const items = [...BADGES, ...BADGES];

  return (
    <div className="kosher-banner" aria-hidden="true">
      <div className="kosher-banner__track">
        {items.map((badge, i) => (
          <span key={`${badge.label}-${i}`} className="kosher-banner__item">
            {i > 0 && <span className="kosher-banner__dot">&middot;</span>}
            <img
              src={badge.image}
              alt=""
              className="kosher-banner__badge-img"
              loading="lazy"
            />
            <span>{badge.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
