import { motion } from 'framer-motion';
import type { Artist } from '@/data/types';
import { artworks } from '@/data/mock';
import { useApp } from '@/contexts/AppContext';

interface Props {
  artist: Artist;
  index?: number;
}

export default function ArtistCard({ artist, index = 0 }: Props) {
  const { navigate } = useApp();
  const sample = artworks.find((a) => a.artistId === artist.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => navigate({ name: 'artist', id: artist.id })}
    >
      <div className="relative overflow-hidden rounded-2xl border border-sand-200/70">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]"
          />
        </div>
        {sample && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-smooth group-hover:translate-y-0">
            <div className="overflow-hidden rounded-xl border border-cream-100/20">
              <img src={sample.image} alt={sample.title} className="h-24 w-full object-cover" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h3 className="font-display text-xl font-medium text-ink">{artist.name}</h3>
          <p className="mt-0.5 text-sm text-ink-muted">{artist.location}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-sand-600">
            {artist.artworksCount} works
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-terracotta-500">
          View
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}
