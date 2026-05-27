type DietaryLabel = 'pareve' | 'dairy';

interface DietaryTagProps {
  label: DietaryLabel;
}

export default function DietaryTag({ label }: DietaryTagProps) {
  return (
    <span className={`dietary-tag dietary-tag--${label}`}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}
