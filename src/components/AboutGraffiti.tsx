import { Reveal, TextReveal } from './SectionTransition';
import { galleryImages } from '@/data/mock';

export default function AboutGraffiti() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">About GRAFFITI</p>
            <h2 className="mt-6 font-display text-5xl font-light leading-[0.95] text-ink md:text-7xl">
              <TextReveal text="WHY" />
              <br />
              <span className="italic text-terracotta-600">
                <TextReveal text="GRAFFITI?" delay={0.15} />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-ink-soft">
              GRAFFITI exists to create a simple connection between artists and people who appreciate original creative work.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
              We are a gallery first and a marketplace second. Every artist is invited, every piece is considered, and every sale supports the maker directly. We believe art should be encountered before it is bought — that the experience of seeing is the beginning of owning.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-sand-200 pt-8">
              {[
                { n: '120+', l: 'Original works' },
                { n: '40+', l: 'Emerging artists' },
                { n: '5', l: 'Categories' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-medium text-ink">{s.n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.2} className="grid gap-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={galleryImages.aboutWide}
                alt="Gallery interior"
                loading="lazy"
                className="h-72 w-full object-cover md:h-96"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={galleryImages.aboutTall}
                  alt="Artist portrait"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-sand-200 bg-sand-200/50 p-6">
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
      </div>
    </section>
  );
}
