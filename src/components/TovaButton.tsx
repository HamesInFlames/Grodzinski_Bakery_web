import { ExternalLink } from 'lucide-react';

export default function TovaButton() {
  return (
    <a
      href="https://tovasbakery.com"
      target="_blank"
      rel="noopener noreferrer"
      className="tova-button"
    >
      <span>Visit Tova&rsquo;s Bakery</span>
      <ExternalLink size={16} aria-hidden="true" />
    </a>
  );
}
