import { useApp } from '@/contexts/AppContext';
import { artists, artworks, ratings } from '@/data/mock';
import { formatPrice, getAverageRating, getRatingCount, totalViews, totalPurchases, avgRatingAcross } from '@/lib/artwork';
import DashboardShell, { StatCard, Empty } from '@/components/DashboardShell';
import StarRating from '@/components/StarRating';
import { Eye, Star, ShoppingBag, Package } from 'lucide-react';

export default function ArtistDashboard() {
  const { navigate, viewArtwork } = useApp();
  const artist = artists[0]; // Kwame Mensah as the signed-in artist
  const myWorks = artworks.filter((a) => a.artistId === artist.id);
  const totalRatings = myWorks.reduce((s, w) => s + getRatingCount(w.id), 0);

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard n={myWorks.length} l="Total artworks" />
            <StatCard n={totalViews(myWorks).toLocaleString()} l="Total views" />
            <StatCard n={avgRatingAcross(myWorks).toFixed(1)} l="Average rating" />
            <StatCard n={totalRatings} l="Ratings" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-light text-ink">Artwork performance</h3>
            <div className="mt-5 space-y-3">
              {myWorks.map((a) => {
                const avg = getAverageRating(a.id);
                const count = getRatingCount(a.id);
                const maxViews = Math.max(...myWorks.map((w) => w.views));
                return (
                  <div key={a.id} className="rounded-2xl border border-sand-200/70 bg-cream-50 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg text-ink">{a.title}</p>
                      <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${a.available ? 'bg-emerald-100 text-emerald-700' : 'bg-terracotta-400/20 text-terracotta-600'}`}>
                        {a.available ? 'Available' : 'Sold'}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <Metric icon={<Eye size={14} />} label="Views" value={a.views.toLocaleString()} />
                      <Metric icon={<Star size={14} />} label="Avg rating" value={avg > 0 ? avg.toFixed(1) : '—'} />
                      <Metric icon={<Package size={14} />} label="Ratings" value={count} />
                      <Metric icon={<ShoppingBag size={14} />} label="Purchases" value={a.purchases} />
                    </div>
                    <div className="mt-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand-200">
                        <div className="h-full bg-terracotta-500" style={{ width: `${(a.views / maxViews) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'works',
      label: 'My Artworks',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                <th className="py-3 pr-4 font-medium">Artwork</th>
                <th className="py-3 pr-4 font-medium">Category</th>
                <th className="py-3 pr-4 font-medium">Price</th>
                <th className="py-3 pr-4 font-medium">Views</th>
                <th className="py-3 pr-4 font-medium">Rating</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {myWorks.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => { viewArtwork(a.id); navigate({ name: 'artwork', id: a.id }); }}
                  className="cursor-pointer border-b border-sand-100 transition-colors hover:bg-cream-50"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={a.image} alt={a.title} className="h-12 w-12 rounded-lg object-cover" />
                      <span className="font-display text-base text-ink">{a.title}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">{a.category}</td>
                  <td className="py-3 pr-4 text-ink">{formatPrice(a.price)}</td>
                  <td className="py-3 pr-4 text-ink-muted">{a.views}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <StarRating rating={getAverageRating(a.id)} size={12} />
                      <span className="text-ink-muted">{getRatingCount(a.id)}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-[11px] uppercase tracking-[0.14em] ${a.available ? 'text-emerald-700' : 'text-terracotta-600'}`}>
                      {a.available ? 'Available' : 'Sold'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'ratings',
      label: 'Ratings',
      content: (
        <div className="space-y-4">
          {myWorks.map((a) => {
            const avg = getAverageRating(a.id);
            const count = getRatingCount(a.id);
            const list = ratings.filter((r) => r.artworkId === a.id);
            return (
              <div key={a.id} className="rounded-2xl border border-sand-200/70 bg-cream-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg text-ink">{a.title}</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={avg} size={14} />
                    <span className="text-sm text-ink-muted">{avg > 0 ? `${avg.toFixed(1)} / 5` : 'Not rated'} · {count} ratings</span>
                  </div>
                </div>
                {list.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-sand-200 pt-4">
                    {list.map((r) => (
                      <div key={r.id} className="flex items-center justify-between text-sm">
                        <span className="text-ink-soft">{r.userName}</span>
                        <span className="flex items-center gap-1.5">
                          <Star size={12} className="fill-gold-500 text-gold-500" /> {r.stars}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <div className="max-w-lg">
          <div className="flex items-center gap-5">
            <img src={artist.image} alt={artist.name} className="h-20 w-20 rounded-full object-cover" />
            <div>
              <p className="font-display text-2xl text-ink">{artist.name}</p>
              <p className="text-sm text-ink-muted">{artist.location}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-muted">{artist.medium}</p>
            </div>
          </div>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">{artist.bio}</p>
        </div>
      ),
    },
  ];

  return <DashboardShell title="Artist Studio" subtitle="Artist dashboard" tabs={tabs} accent="terracotta" />;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        <span className="text-ink">{icon}</span> {label}
      </p>
      <p className="mt-1 font-display text-xl text-ink">{value}</p>
    </div>
  );
}
