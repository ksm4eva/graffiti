import { useApp } from '@/contexts/AppContext';
import { artworks, purchases, users } from '@/data/mock';
import { formatPrice, getAverageRating, getRatingCount } from '@/lib/artwork';
import DashboardShell, { StatCard, Empty } from '@/components/DashboardShell';
import StarRating from '@/components/StarRating';
import { Heart, Eye, ShoppingBag, Star, User as UserIcon } from 'lucide-react';

const me = users[0];

export default function UserDashboard() {
  const { wishlist, recentlyViewed, userRatings, navigate, viewArtwork } = useApp();

  const wishArt = artworks.filter((a) => wishlist.includes(a.id));
  const recentArt = artworks.filter((a) => recentlyViewed.includes(a.id));
  const myPurchases = purchases.filter((p) => p.buyerEmail === me.email);
  const ratedArt = artworks.filter((a) => userRatings.some((r) => r.artworkId === a.id));

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard n={recentArt.length} l="Recently viewed" />
            <StatCard n={wishArt.length} l="Wishlist" />
            <StatCard n={myPurchases.length} l="Purchases" />
            <StatCard n={ratedArt.length} l="Rated" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-light text-ink">Recently viewed</h3>
            {recentArt.length === 0 ? (
              <Empty text="Artworks you view will appear here." />
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
                {recentArt.slice(0, 4).map((a) => (
                  <MiniCard key={a.id} artwork={a} onClick={() => { viewArtwork(a.id); navigate({ name: 'artwork', id: a.id }); }} />
                ))}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'purchases',
      label: 'My Purchases',
      content: (
        <div>
          {myPurchases.length === 0 ? (
            <Empty text="You have not purchased any artworks yet." />
          ) : (
            <div className="space-y-4">
              {myPurchases.map((p) => (
                <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-sand-200/70 bg-cream-50 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-display text-lg text-ink">{p.artworkTitle}</p>
                    <p className="text-sm text-ink-muted">{p.artistName} · {p.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-display text-base text-ink">{formatPrice(p.price)}</span>
                    <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${
                      p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : p.status === 'shipped' ? 'bg-sand-200 text-ink-soft' : 'bg-terracotta-400/20 text-terracotta-600'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      content: (
        <div>
          {wishArt.length === 0 ? (
            <Empty text="Your wishlist is empty. Tap the heart on any artwork to save it." />
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
              {wishArt.map((a) => (
                <MiniCard key={a.id} artwork={a} onClick={() => { viewArtwork(a.id); navigate({ name: 'artwork', id: a.id }); }} />
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'ratings',
      label: 'My Ratings',
      content: (
        <div>
          {ratedArt.length === 0 ? (
            <Empty text="You have not rated any artworks yet." />
          ) : (
            <div className="space-y-4">
              {ratedArt.map((a) => {
                const my = userRatings.find((r) => r.artworkId === a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => { viewArtwork(a.id); navigate({ name: 'artwork', id: a.id }); }}
                    className="flex w-full items-center gap-5 rounded-2xl border border-sand-200/70 bg-cream-50 p-4 text-left transition-colors hover:border-ink/30"
                  >
                    <img src={a.image} alt={a.title} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-lg text-ink">{a.title}</p>
                      <p className="text-sm text-ink-muted">{a.artistName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={my?.stars ?? 0} size={16} />
                      <span className="text-sm text-ink-muted">{my?.stars}/5</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <div className="max-w-lg">
          <div className="flex items-center gap-5">
            <img src={me.avatar} alt={me.name} className="h-20 w-20 rounded-full object-cover" />
            <div>
              <p className="font-display text-2xl text-ink">{me.name}</p>
              <p className="text-sm text-ink-muted">{me.email}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-muted">Member since {me.joined}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4">
            <ProfileRow icon={<UserIcon size={15} />} label="Full name" value={me.name} />
            <ProfileRow icon={<Heart size={15} />} label="Email" value={me.email} />
            <ProfileRow icon={<ShoppingBag size={15} />} label="Location" value="Accra, Ghana" />
          </div>
        </div>
      ),
    },
  ];

  return <DashboardShell title="My Dashboard" subtitle="Collector account" tabs={tabs} />;
}

function MiniCard({ artwork, onClick }: { artwork: { id: string; title: string; artistName: string; price: number; image: string; category: string }; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group text-left">
      <div className="overflow-hidden rounded-2xl border border-sand-200/70">
        <img src={artwork.image} alt={artwork.title} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <p className="mt-3 truncate font-display text-base text-ink">{artwork.title}</p>
      <p className="truncate text-sm text-ink-muted">{artwork.artistName}</p>
      <p className="mt-1 font-display text-sm text-ink">{formatPrice(artwork.price)}</p>
    </button>
  );
}

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-sand-200/70 bg-cream-50 px-5 py-4">
      <span className="flex items-center gap-3 text-sm text-ink-muted">
        <span className="text-ink">{icon}</span> {label}
      </span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  );
}
