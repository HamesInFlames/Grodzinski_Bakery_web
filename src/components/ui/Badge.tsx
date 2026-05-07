interface BadgeProps {
  variant: 'pareve' | 'dairy' | 'egg' | 'neutral';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

const VARIANT_CLASSES: Record<BadgeProps['variant'], string> = {
  pareve: 'badge--pareve',
  dairy: 'badge--dairy',
  egg: 'badge--egg',
  neutral: 'badge--neutral',
};

export default function Badge({ variant, children, size = 'sm' }: BadgeProps) {
  return (
    <span className={`badge badge--${size} ${VARIANT_CLASSES[variant]}`}>
      {children}
    </span>
  );
}
