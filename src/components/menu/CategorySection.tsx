import type { MenuCategory, MenuItem } from '@/data/products';
import VariantConfigurator from './VariantConfigurator';
import DietaryTag from './DietaryTag';

interface CategorySectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

function inferDietary(items: MenuItem[]): 'pareve' | 'dairy' | null {
  const descriptions = items
    .map((i) => i.description?.toLowerCase() ?? '')
    .join(' ');

  const hasDairy =
    descriptions.includes('dairy') ||
    descriptions.includes('cream cheese') ||
    descriptions.includes('butter cream') ||
    descriptions.includes('milk chocolate');
  const hasPareve =
    descriptions.includes('pareve') || descriptions.includes('parve');

  if (hasDairy && !hasPareve) return 'dairy';
  if (hasPareve && !hasDairy) return 'pareve';
  return null;
}

export default function CategorySection({
  category,
  items,
}: CategorySectionProps) {
  const dietaryLabel = inferDietary(items);

  return (
    <section className="category-section" id={`category-${category.slug}`}>
      <h3 className="category-section__heading">{category.name}</h3>
      <VariantConfigurator
        items={items}
        fallbackImage={category.fallbackImage}
      />
      {dietaryLabel && (
        <div className="category-section__dietary">
          <DietaryTag label={dietaryLabel} />
        </div>
      )}
    </section>
  );
}
