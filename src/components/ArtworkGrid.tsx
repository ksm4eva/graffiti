import { AnimatePresence, motion } from 'framer-motion';
import type { Artwork } from '@/data/types';
import ArtworkCard from './ArtworkCard';

interface Props {
  artworks: Artwork[];
}

// Pinterest-style masonry: CSS columns with break-inside avoid so cards of
// varying heights form a staggered wall of images.
export default function ArtworkGrid({ artworks }: Props) {
  return (
    <motion.div
      layout
      className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5 [&>*]:mb-4 [&>*]:break-inside-avoid"
    >
      <AnimatePresence mode="popLayout">
        {artworks.map((a, i) => (
          <ArtworkCard key={a.id} artwork={a} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
