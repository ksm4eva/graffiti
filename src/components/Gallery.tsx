import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/data/types';
import { useApp } from '@/contexts/AppContext';
import CategoryFilter from './CategoryFilter';
import ArtworkGrid from './ArtworkGrid';
import { Reveal } from './SectionTransition';

type Filter = 'All' | Category;

export default function Gallery() {
  const { artworks } = useApp();
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return artworks;
    return artworks.filter((a) => a.category === filter);
  }, [filter, artworks]);

  return (
    <section id="gallery" className="bg-cream-100 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The Collection</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-tight text-ink md:text-6xl">
              The Gallery
            </h2>
            <p className="mt-4 max-w-md text-ink-muted">
              Every piece is original, made by hand, and available to own — unless it has already found a home.
            </p>
          </div>
          <motion.div layout className="md:pb-2">
            <CategoryFilter active={filter} onChange={setFilter} />
          </motion.div>
        </Reveal>

        <div className="mt-12">
          <ArtworkGrid artworks={filtered} />
        </div>
      </div>
    </section>
  );
}
