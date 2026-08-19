import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Reveal, TextReveal } from './SectionTransition';
import { formatPrice, getAverageRating } from '@/lib/artwork';
import StarRating from './StarRating';
import { galleryImages } from '@/data/mock';

export default function Featured() {
  const { artworks, navigate, viewArtwork } = useApp();
  const featured = artworks.filter((a) => a.featured).slice(0, 4);

  return (
    <section id="featured" className="relative overflow-hidden bg-ink py-20 text-cream-100 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-20">
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-terracotta-500 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-sand-600 blur-3xl" />
      </div>

      <div className="container-x relative z-10">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow text-cream-200/60">Handpicked</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-tight md:text-6xl">
              <TextReveal text="Featured" />
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-cream-200/70 md:block">
            A rotating selection chosen by the GRAFFITI curatorial team.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((a, i) => {
            const avg = getAverageRating(a.id);
            return (
              <motion.button
                key={a.id}
                onClick={() => {
                  viewArtwork(a.id);
                  navigate({ name: 'artwork', id: a.id });
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-2xl border border-cream-200/15">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-cream-100 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink">
                      View Artwork
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-xl font-medium">{a.title}</h3>
                  <p className="mt-0.5 text-sm text-cream-200/70">{a.artistName} · {a.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-display text-base">{formatPrice(a.price)}</p>
                    <StarRating rating={avg} size={12} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
