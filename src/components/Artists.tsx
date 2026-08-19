import { artists } from '@/data/mock';
import ArtistCard from './ArtistCard';
import { Reveal, TextReveal } from './SectionTransition';

export default function Artists() {
  return (
    <section id="artists" className="bg-cream-200/50 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The Makers</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-tight text-ink md:text-6xl">
              <TextReveal text="Artists" />
            </h2>
            <p className="mt-4 max-w-md text-ink-muted">
              The people behind the work — painters, sculptors, ceramicists and leatherworkers shaping a new generation of Ghanaian art.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artists.map((a, i) => (
            <ArtistCard key={a.id} artist={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
