import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GraffitiButton from './GraffitiButton';
import { TextReveal } from './SectionTransition';
import { galleryImages } from '@/data/mock';
import { useApp } from '@/contexts/AppContext';

export default function Hero() {
  const { navigate, viewArtwork } = useApp();

  const goGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };
  const goArtists = () => {
    document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative overflow-hidden bg-cream-100 pt-28 md:pt-36">
      {/* Decorative sand gradient */}
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
            Contemporary Ghanaian Gallery & Marketplace
          </motion.p>

          <h1 className="mt-6 font-display text-[13vw] font-light leading-[0.92] tracking-tightest text-ink sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
            <TextReveal text="ART SHOULD" />
            <br />
            <TextReveal text="BE" delay={0.15} />
            <br />
            <span className="italic text-terracotta-600">
              <TextReveal text="EXPERIENCED." delay={0.3} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-ink-soft"
          >
            Discover paintings, sculptures, ceramics, leatherwork and posters created by emerging artists.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted"
          >
            GRAFFITI is a contemporary art gallery created to give artists a place to share their work and give people a simple way to discover and own original art.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.74 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <GraffitiButton size="lg" arrow onClick={goGallery}>
              Explore Gallery
            </GraffitiButton>
            <button
              onClick={goArtists}
              className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
            >
              Meet the Artists
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Hero image collage */}
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
                  viewArtwork('w2');
                  navigate({ name: 'artwork', id: 'w2' });
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
  );
}
