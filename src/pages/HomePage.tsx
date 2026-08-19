import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CutoutText from '@/components/CutoutText';
import GraffitiButton from '@/components/GraffitiButton';
import StarRating from '@/components/StarRating';
import { Reveal } from '@/components/SectionTransition';
import { useApp } from '@/contexts/AppContext';
import { artworks, galleryImages } from '@/data/mock';
import { formatPrice, getAverageRating } from '@/lib/artwork';

// Pinterest-like varying aspect ratios for the featured collage.
const RATIOS = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]'];

export default function HomePage() {
  const { navigate, viewArtwork } = useApp();
  const featured = artworks.filter((a) => a.featured).slice(0, 6);

  return (
    <main className="bg-white">
      {/* Hero — light, airy, image-forward like Pinterest's explore header */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sand-200 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-terracotta-400/10 blur-3xl" />
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
              <div className="overflow-hidden rounded-2xl">
                <button
                  onClick={() => {
                    viewArtwork(artworks[1].id);
                    navigate({ name: 'artwork', id: artworks[1].id });
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
                className="absolute -bottom-5 -left-5 max-w-[220px] rounded-2xl bg-white p-4 shadow-lg md:-left-8"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">Now showing</p>
                <p className="mt-1 font-display text-lg text-ink">Mother's Hands</p>
                <p className="text-sm text-ink-muted">Ama Serwaa · 2023</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured preview — Pinterest-style masonry collage */}
      <section className="bg-sand-200/40 py-20 md:py-28">
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
              className="hidden items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors hover:text-terracotta-500 md:inline-flex"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </Reveal>

          <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
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
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-sand-200">
                    <div className={`${RATIOS[i % RATIOS.length]} w-full overflow-hidden`}>
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-ink">
                        {formatPrice(a.price)}
                      </span>
                    </div>
                  </div>
                  <div className="px-1 pt-2.5">
                    <h3 className="truncate text-[15px] font-semibold text-ink">{a.title}</h3>
                    <p className="mt-0.5 truncate text-[13px] text-ink-soft">{a.artistName}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <StarRating rating={avg} size={12} />
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
      <section className="bg-white py-20 md:py-28">
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
