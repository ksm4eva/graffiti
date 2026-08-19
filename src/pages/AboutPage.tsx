import { motion } from 'framer-motion';
import CutoutText from '@/components/CutoutText';
import GraffitiButton from '@/components/GraffitiButton';
import { Reveal } from '@/components/SectionTransition';
import { useApp } from '@/contexts/AppContext';
import { galleryImages } from '@/data/mock';

export default function AboutPage() {
  const { navigate } = useApp();

  return (
    <main className="bg-cream-100 pt-28 md:pt-36">
      {/* Hero statement */}
      <section className="container-x pb-16 md:pb-24">
        <Reveal>
          <p className="eyebrow">About GRAFFITI</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <CutoutText text="OUR STORY" ariaLabel="Our Story" className="text-5xl sm:text-7xl lg:text-8xl" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-ink-soft">
            GRAFFITI exists to create a simple connection between artists and people who appreciate original creative work.
          </p>
        </Reveal>
      </section>

      {/* Editorial image + text */}
      <section className="container-x grid gap-12 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="overflow-hidden rounded-3xl border border-sand-200/70">
            <img
              src={galleryImages.aboutWide}
              alt="Gallery interior"
              loading="lazy"
              className="h-72 w-full object-cover md:h-96"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <h2 className="font-display text-3xl font-light text-ink md:text-4xl">What GRAFFITI is</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              GRAFFITI is a contemporary Ghanaian art gallery and marketplace. We are a gallery first and a marketplace second — a place where art is encountered before it is bought. Every artist is invited, every piece is considered, and every sale supports the maker directly.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="mt-10 font-display text-3xl font-light text-ink md:text-4xl">The vision</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              We believe the experience of seeing is the beginning of owning. Our vision is a digital gallery that feels like walking through a real one — quiet, warm, and built around the work, not the transaction.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Supporting artists */}
      <section className="bg-cream-200/50 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <CutoutText text="ORIGINAL" ariaLabel="Original" className="text-4xl sm:text-6xl lg:text-7xl" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
                Supporting Ghanaian artists means more than selling their work. It means giving them a room to be seen in, a context to be understood in, and a fair return when someone takes a piece home.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
                We connect artists with people who appreciate and purchase original art — painters, sculptors, ceramicists, leatherworkers and printmakers shaping a new generation of Ghanaian creativity.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-10">
                <GraffitiButton arrow onClick={() => navigate({ name: 'gallery' })}>
                  Meet the Collection
                </GraffitiButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-6">
            <div className="grid gap-6">
              <div className="overflow-hidden rounded-2xl border border-sand-200/70">
                <img
                  src={galleryImages.aboutTall}
                  alt="Artist portrait"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-sand-200/70 bg-sand-100 p-6">
                <p className="font-serif text-xl italic leading-snug text-ink-soft">
                  “We built GRAFFITI so that the art, not the algorithm, decides what is seen.”
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  — The Curatorial Team
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream-100 py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="grid grid-cols-3 gap-6 border-t border-sand-200 pt-8">
              {[
                { n: '120+', l: 'Original works' },
                { n: '40+', l: 'Emerging artists' },
                { n: '5', l: 'Categories' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-4xl font-medium text-ink md:text-5xl"
                  >
                    {s.n}
                  </motion.p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
