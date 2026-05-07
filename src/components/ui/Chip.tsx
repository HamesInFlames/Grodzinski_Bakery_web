interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

export default function Chip({ label, active, onClick, onRemove }: ChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      className={`chip ${active ? 'chip--active' : ''}`}
      onClick={onClick}
    >
      <span className="chip__label">{label}</span>
      {active && onRemove && (
        <span
          className="chip__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${label} filter`}
        >
          ×
        </span>
      )}
    </button>
  );
}
