import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Artwork } from '@/data/types';
import { formatPrice, getAverageRating, getRatingCount } from '@/lib/artwork';
import StarRating from './StarRating';
import { useApp } from '@/contexts/AppContext';

interface Props {
  artwork: Artwork;
  index?: number;
}

export default function ArtworkCard({ artwork, index = 0 }: Props) {
  const { navigate, viewArtwork, wishlist, toggleWishlist, showToast } = useApp();
  const avg = getAverageRating(artwork.id);
  const count = getRatingCount(artwork.id);
  const inWish = wishlist.includes(artwork.id);

  const open = () => {
    viewArtwork(artwork.id);
    navigate({ name: 'artwork', id: artwork.id });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl border border-sand-200/70 bg-cream-50">
        <button onClick={open} className="block w-full" aria-label={`View ${artwork.title}`}>
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={artwork.image}
              alt={artwork.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06]"
            />
          </div>
        </button>

        {!artwork.available && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream-100">
            Sold
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(artwork.id);
            showToast(inWish ? 'Removed from wishlist' : 'Added to wishlist');
          }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream-100/85 backdrop-blur transition-colors hover:bg-cream-100"
        >
          <Heart size={15} className={inWish ? 'fill-terracotta-500 text-terracotta-500' : 'text-ink'} />
        </button>

        {/* View button slides up on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-smooth group-hover:translate-y-0">
          <button
            onClick={open}
            className="pointer-events-auto flex w-full items-center justify-between rounded-full bg-ink px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-cream-100"
          >
            View
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-medium text-ink">{artwork.title}</h3>
          <p className="mt-0.5 truncate text-sm text-ink-muted">{artwork.artistName}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-sand-600">{artwork.category}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-base font-medium text-ink">{formatPrice(artwork.price)}</p>
          <div className="mt-1 flex items-center justify-end gap-1.5">
            <StarRating rating={avg} size={12} />
            <span className="text-[11px] text-ink-muted">{count}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
