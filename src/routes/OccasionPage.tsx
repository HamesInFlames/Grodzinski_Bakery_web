import { useParams, Link } from 'react-router-dom';
import type { OccasionSlug } from '@/data/products';
import { getOccasionBySlug } from '@/data/holidays';

export default function OccasionPage() {
  const { occasion } = useParams<{ occasion: string }>();
  const meta = getOccasionBySlug(occasion || '');

  if (!meta) {
    return (
      <div className="occasion-page__empty">
        <h1>Occasion not found</h1>
        <Link to="/holidays">Back to Holidays</Link>
      </div>
    );
  }

  return (
    <div className="occasion-page">
      <h1>{meta.name}</h1>
      <p>{meta.description}</p>
    </div>
  );
}
