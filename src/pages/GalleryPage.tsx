import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/data/types';
import { useApp } from '@/contexts/AppContext';
import CategoryFilter from '@/components/CategoryFilter';
import ArtworkGrid from '@/components/ArtworkGrid';
import CutoutText from '@/components/CutoutText';
import { Reveal } from '@/components/SectionTransition';

type Filter = 'All' | Category;

export default function GalleryPage() {
  const { artworks } = useApp();
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return artworks;
    return artworks.filter((a) => a.category === filter);
  }, [filter, artworks]);

  return (
    <main className="bg-white pt-28 md:pt-36">
      <section className="container-x pb-10 md:pb-14">
        <Reveal>
          <p className="eyebrow">The Collection</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <CutoutText text="THE COLLECTION" ariaLabel="The Collection" className="text-4xl sm:text-6xl lg:text-7xl" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
            Every piece is original, made by hand, and available to own — unless it has already found a home.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <motion.div layout className="mb-10 flex flex-wrap gap-2">
          <CategoryFilter active={filter} onChange={setFilter} />
        </motion.div>
        <ArtworkGrid artworks={filtered} />
      </section>
    </main>
  );
}
