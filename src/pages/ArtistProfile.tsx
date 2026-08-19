import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { artists, artworks } from '@/data/mock';
import { useApp } from '@/contexts/AppContext';
import { formatPrice, getAverageRating, getRatingCount, totalViews, totalPurchases, avgRatingAcross } from '@/lib/artwork';
import ArtworkCard from '@/components/ArtworkCard';
import StarRating from '@/components/StarRating';
import { Reveal, TextReveal } from '@/components/SectionTransition';
import GraffitiButton from '@/components/GraffitiButton';

interface Props {
  id: string;
}

export default function ArtistProfile({ id }: Props) {
  const { navigate, viewArtwork } = useApp();
  const artist = artists.find((a) => a.id === id);
  if (!artist) {
    return (
      <main className="container-x flex min-h-screen flex-col items-center justify-center pt-32 text-center">
        <p className="font-display text-3xl text-ink">Artist not found</p>
        <GraffitiButton className="mt-6" onClick={() => navigate({ name: 'home' })}>Back home</GraffitiButton>
      </main>
    );
  }

  const works = artworks.filter((a) => a.artistId === id);
  const stats = {
    works: works.length,
    views: totalViews(works),
    purchases: totalPurchases(works),
    avg: avgRatingAcross(works),
    ratings: works.reduce((s, w) => s + getRatingCount(w.id), 0),
  };

  return (
    <main className="bg-white pt-24 md:pt-28">
      <div className="container-x py-8">
        <button
          onClick={() => navigate({ name: 'home' })}
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl">
              <img src={artist.image} alt={artist.name} className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <p className="eyebrow">{artist.medium}</p>
              <h1 className="mt-4 font-display text-5xl font-light leading-tight text-ink md:text-6xl">
                <TextReveal text={artist.name} />
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ink-muted">{artist.location}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{artist.bio}</p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-4 border-t border-sand-200 pt-8 md:grid-cols-4">
              {[
                { n: stats.works, l: 'Works' },
                { n: stats.views.toLocaleString(), l: 'Views' },
                { n: stats.purchases, l: 'Purchases' },
                { n: stats.avg.toFixed(1), l: 'Avg rating' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-medium text-ink">{s.n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">{s.l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl font-light text-ink">Selected works</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {works.map((a, i) => (
              <ArtworkCard key={a.id} artwork={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
