import { motion } from 'framer-motion';
import { Heart, MoreRound } from './PinterestIcons';
import type { Artwork } from '@/data/types';
import { formatPrice } from '@/lib/artwork';
import { useApp } from '@/contexts/AppContext';

interface Props {
  artwork: Artwork;
  index?: number;
}

// Varying aspect ratios give the masonry wall its staggered, Pinterest feel.
const RATIONS = [
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[4/5]',
];

export default function ArtworkCard({ artwork, index = 0 }: Props) {
  const { navigate, viewArtwork, wishlist, toggleWishlist, showToast } = useApp();
  const inWish = wishlist.includes(artwork.id);
  const ratio = RATIONS[index % RATIONS.length];

  const open = () => {
    viewArtwork(artwork.id);
    navigate({ name: 'artwork', id: artwork.id });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.15), ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-4 break-inside-avoid"
    >
      <div className="relative overflow-hidden rounded-2xl bg-sand-200">
        <button onClick={open} className="block w-full" aria-label={`View ${artwork.title}`}>
          <div className={`${ratio} w-full overflow-hidden`}>
            <img
              src={artwork.image}
              alt={artwork.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.05]"
            />
          </div>
        </button>

        {/* Dark overlay on hover, like Pinterest */}
        <div className="pointer-events-none absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {!artwork.available && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink">
            Sold
          </span>
        )}

        {/* Save button — Pinterest's red pill, top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(artwork.id);
            showToast(inWish ? 'Removed from wishlist' : 'Added to wishlist');
          }}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-300 ${
            inWish
              ? 'bg-terracotta-500 text-white'
              : 'bg-white text-ink opacity-0 group-hover:opacity-100 hover:bg-white/90'
          }`}
        >
          <Heart size={14} className={inWish ? 'fill-white' : ''} />
          {inWish ? 'Saved' : 'Save'}
        </button>

        {/* Bottom-right more button on hover */}
        <button
          onClick={open}
          aria-label="View artwork"
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white/90"
        >
          <MoreRound size={16} className="text-ink" />
        </button>
      </div>

      {/* Caption below image — minimal, like Pinterest */}
      <div className="px-1 pt-2.5">
        <h3 className="truncate text-[15px] font-semibold text-ink">{artwork.title}</h3>
        <p className="mt-0.5 truncate text-[13px] text-ink-soft">{artwork.artistName}</p>
        <p className="mt-1 text-[13px] font-medium text-ink">{formatPrice(artwork.price)}</p>
      </div>
    </motion.article>
  );
}
