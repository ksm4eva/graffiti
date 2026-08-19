import { AnimatePresence, motion } from 'framer-motion';
import type { Artwork } from '@/data/types';
import ArtworkCard from './ArtworkCard';

interface Props {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: Props) {
  return (
    <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {artworks.map((a, i) => (
          <ArtworkCard key={a.id} artwork={a} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
