import { motion } from 'framer-motion';
import { CATEGORIES, type Category } from '@/data/types';

type Filter = 'All' | Category;

interface Props {
  active: Filter;
  onChange: (f: Filter) => void;
}

const items: Filter[] = ['All', ...CATEGORIES];

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const isActive = active === item;
        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`relative rounded-full px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              isActive ? 'text-cream-100' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {!isActive && (
              <span className="absolute inset-0 -z-10 rounded-full border border-sand-300/70 transition-colors duration-300 hover:border-ink/30" />
            )}
            {item}
          </button>
        );
      })}
    </div>
  );
}
