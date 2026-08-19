import { motion } from 'framer-motion';
import CutoutText from '@/components/CutoutText';
import GraffitiButton from '@/components/GraffitiButton';
import StarRating from '@/components/StarRating';
import { Reveal } from '@/components/SectionTransition';
import { useApp } from '@/contexts/AppContext';
import { artworks, galleryImages } from '@/data/mock';
import { formatPrice, getAverageRating } from '@/lib/artwork';

export default function HomePage() {
  const { navigate, viewArtwork } = useApp();
  const featured = artworks.filter((a) => a.featured).slice(0, 3);
  const heroArt = artworks[1];

  return (
    <main className="bg-cream-100">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sand-300/40 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-terracotta-400/15 blur-3xl" />
        </div>

        <div className="container-x grid items-center gap-12 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Contemporary Ghanaian Gallery
            </motion.p>

            <div className="mt-6">
              <CutoutText
                text="GRAFFITI"
                ariaLabel="GRAFFITI"
                className="text-[18vw] leading-[0.9] sm:text-7xl lg:text-[6.5rem] xl:text-[8rem]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-ink-soft"
            >
              Art created by people with something to say.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted"
            >
              A contemporary gallery giving emerging artists a place to share their work, and people a simple way to discover and own original art.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.74 }}
              className="mt-10"
            >
              <GraffitiButton size="lg" arrow onClick={() => navigate({ name: 'gallery' })}>
                Explore Gallery
              </GraffitiButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-sand-200/70">
                <button
                  onClick={() => {
                    viewArtwork(heroArt.id);
                    navigate({ name: 'artwork', id: heroArt.id });
                  }}
                  className="block w-full"
                  aria-label="View featured artwork"
                >
                  <img
                    src={galleryImages.hero}
                    alt="Featured artwork — Mother's Hands by Ama Serwaa"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-smooth hover:scale-[1.04]"
                  />
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="absolute -bottom-5 -left-5 max-w-[220px] rounded-2xl border border-sand-200 bg-cream-50 p-4 shadow-sm md:-left-8"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-sand-600">Now showing</p>
                <p className="mt-1 font-display text-lg text-ink">Mother's Hands</p>
                <p className="text-sm text-ink-muted">Ama Serwaa · 2023</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured preview */}
      <section className="bg-cream-200/50 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Handpicked</p>
              <div className="mt-4">
                <CutoutText text="FEATURED" ariaLabel="Featured" className="text-3xl sm:text-5xl" />
              </div>
            </div>
            <button
              onClick={() => navigate({ name: 'gallery' })}
              className="hidden text-[12px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink md:block"
            >
              View all →
            </button>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                  <div className="relative overflow-hidden rounded-2xl border border-sand-200/70">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-smooth group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[12px] uppercase tracking-[0.18em] text-cream-100">
                        View Artwork
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                          <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg font-medium text-ink">{a.title}</h3>
                      <p className="mt-0.5 truncate text-sm text-ink-muted">{a.artistName}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-sand-600">{a.category}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-base font-medium text-ink">{formatPrice(a.price)}</p>
                      <div className="mt-1 flex items-center justify-end gap-1.5">
                        <StarRating rating={avg} size={12} />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-12 text-center md:hidden">
            <GraffitiButton onClick={() => navigate({ name: 'gallery' })} arrow>
              View Gallery
            </GraffitiButton>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="container-x text-center">
          <Reveal>
            <CutoutText text="ART HAS A VOICE" ariaLabel="Art has a voice" className="text-4xl sm:text-6xl lg:text-7xl" />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
              We built GRAFFITI so that the art, not the algorithm, decides what is seen. Discover paintings, sculptures, ceramics, leatherwork and posters from a new generation of Ghanaian makers.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <GraffitiButton arrow onClick={() => navigate({ name: 'gallery' })}>
                Browse the Collection
              </GraffitiButton>
              <GraffitiButton
                variant="outline"
                onClick={() => navigate({ name: 'about' })}
              >
                Read Our Story
              </GraffitiButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
