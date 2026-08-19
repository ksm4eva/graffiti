import { Star } from 'lucide-react';

interface Props {
  rating: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, size = 14, className = '' }: Props) {
  return (
    <div className={`stars inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-sand-300" strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="text-gold-500 fill-gold-500" strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
