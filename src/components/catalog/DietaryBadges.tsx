import type { DietaryAttribute } from '@/data/products';
import Badge from '@/components/ui/Badge';
import { Leaf, Milk, Egg } from 'lucide-react';

interface Props {
  attributes: DietaryAttribute[];
  size?: 'sm' | 'md';
}

const BADGE_CONFIG: Record<
  DietaryAttribute,
  { variant: 'pareve' | 'dairy' | 'egg'; icon: typeof Leaf; label: string }
> = {
  pareve: { variant: 'pareve', icon: Leaf, label: 'P' },
  dairy: { variant: 'dairy', icon: Milk, label: 'D' },
  'contains-egg': { variant: 'egg', icon: Egg, label: 'E' },
};

export default function DietaryBadges({ attributes, size = 'sm' }: Props) {
  if (!attributes.length) return null;

  return (
    <div className="dietary-badges">
      {attributes.map((attr) => {
        const config = BADGE_CONFIG[attr];
        if (!config) return null;
        const Icon = config.icon;
        return (
          <Badge key={attr} variant={config.variant} size={size}>
            <Icon size={size === 'sm' ? 12 : 14} />
            {config.label}
          </Badge>
        );
      })}
    </div>
  );
}
