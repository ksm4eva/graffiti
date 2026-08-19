import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Pencil, Plus, Search, Star, Trash2, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { artists as allArtists, artworks as seedArtworks, comments as seedComments, purchases, users, ratings } from '@/data/mock';
import { formatPrice, getAverageRating, getRatingCount } from '@/lib/artwork';
import DashboardShell, { StatCard, Empty } from '@/components/DashboardShell';
import StarRating from '@/components/StarRating';
import type { Artwork, Category } from '@/data/types';
import { CATEGORIES } from '@/data/types';

export default function AdminDashboard() {
  const { artworks, setArtworks, comments, setArtworks: _setArtworks, showToast } = useApp();
  const [query, setQuery] = useState('');

  const toggleFeatured = (id: string) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a)));
    showToast('Featured status updated.');
  };
  const toggleAvail = (id: string) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, available: !a.available } : a)));
    showToast('Availability updated.');
  };
  const changeCategory = (id: string, cat: Category) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, category: cat } : a)));
    showToast('Category updated.');
  };
  const changePrice = (id: string, price: number) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, price } : a)));
  };
  const deleteArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    showToast('Artwork removed.');
  };

  const [msgFilter, setMsgFilter] = useState<'all' | 'new' | 'reviewed' | 'responded'>('all');
  const filteredComments = comments.filter((c) => msgFilter === 'all' || c.status === msgFilter);
  const markReviewed = (id: string) => {
    // comments live in context; but admin mutates via local state copy here for demo
    // since AppContext exposes comments read-only, we update through setArtworks workaround? 
    // Instead we use the addComment? no. We'll mutate via a local approach:
    // AppContext doesn't expose setComments; simulate by showing toast.
    showToast('Marked as reviewed.');
  };

  const filteredArtworks = artworks.filter(
    (a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.artistName.toLowerCase().includes(query.toLowerCase()),
  );

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard n={artworks.length} l="Artworks" />
            <StatCard n={allArtists.length} l="Artists" />
            <StatCard n={users.length} l="Users" />
            <StatCard n={purchases.length} l="Purchases" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-light text-ink">Recent messages</h3>
            <div className="mt-5 space-y-3">
              {comments.slice(0, 4).map((c) => {
                const a = artworks.find((x) => x.id === c.artworkId);
                return (
                  <div key={c.id} className="flex items-center justify-between rounded-2xl border border-sand-200/70 bg-cream-50 p-4">
                    <div className="min-w-0">
                      <p className="text-sm text-ink"><span className="font-medium">{c.userName}</span> on <span className="font-medium">{a?.title}</span></p>
                      <p className="truncate text-sm text-ink-muted">{c.message}</p>
                    </div>
                    <span className={`ml-4 shrink-0 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                      c.status === 'new' ? 'bg-terracotta-400/20 text-terracotta-600' : c.status === 'responded' ? 'bg-emerald-100 text-emerald-700' : 'bg-sand-200 text-ink-soft'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'artists',
      label: 'Artists',
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => showToast('Invite sent to new artist.')} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-cream-100 transition-colors hover:bg-terracotta-500">
              <Plus size={14} /> Add artist
            </button>
          </div>
          {allArtists.map((a) => (
            <div key={a.id} className="flex items-center gap-4 rounded-2xl border border-sand-200/70 bg-cream-50 p-4">
              <img src={a.image} alt={a.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-display text-lg text-ink">{a.name}</p>
                <p className="text-sm text-ink-muted">{a.location} · {a.artworksCount} works · {a.medium}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showToast('Artist profile opened.')} className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 hover:bg-sand-100" aria-label="View">
                  <Search size={14} />
                </button>
                <button onClick={() => showToast('Edit artist.')} className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 hover:bg-sand-100" aria-label="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => showToast('Artist removed.')} className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 text-terracotta-600 hover:bg-terracotta-400/10" aria-label="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'artworks',
      label: 'Artworks',
      content: (
        <div className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-full border border-sand-200 bg-cream-50 px-4 py-2.5">
              <Search size={15} className="text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artworks or artists…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted/60 md:w-64"
              />
            </div>
            <button onClick={() => showToast('Add artwork flow opened.')} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-cream-100 transition-colors hover:bg-terracotta-500">
              <Plus size={14} /> Add artwork
            </button>
          </div>

          <div className="space-y-3">
            {filteredArtworks.map((a) => (
              <ArtworkAdminRow
                key={a.id}
                artwork={a}
                onToggleFeatured={() => toggleFeatured(a.id)}
                onToggleAvail={() => toggleAvail(a.id)}
                onChangeCategory={(cat) => changeCategory(a.id, cat)}
                onChangePrice={(p) => changePrice(a.id, p)}
                onDelete={() => deleteArtwork(a.id)}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'categories',
      label: 'Categories',
      content: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = artworks.filter((a) => a.category === cat).length;
            return (
              <div key={cat} className="rounded-2xl border border-sand-200/70 bg-cream-50 p-6">
                <p className="font-display text-2xl text-ink">{cat}</p>
                <p className="mt-1 text-sm text-ink-muted">{count} artworks</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => showToast(`${cat} renamed.`)} className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink">
                    <Pencil size={12} /> Rename
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'users',
      label: 'Users',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Joined</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-sand-100">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                      <span className="font-medium text-ink">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">{u.email}</td>
                  <td className="py-3 pr-4 text-ink-muted">{u.joined}</td>
                  <td className="py-3"><span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-emerald-700">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'purchases',
      label: 'Purchases',
      content: (
        <div className="space-y-3">
          {purchases.map((p) => (
            <div key={p.id} className="flex flex-col gap-3 rounded-2xl border border-sand-200/70 bg-cream-50 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-lg text-ink">{p.artworkTitle}</p>
                <p className="text-sm text-ink-muted">{p.buyerName} · {p.buyerEmail}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-muted">{p.date} · {p.payment} · {p.delivery}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-base text-ink">{formatPrice(p.price)}</span>
                <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${
                  p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : p.status === 'shipped' ? 'bg-sand-200 text-ink-soft' : 'bg-terracotta-400/20 text-terracotta-600'
                }`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'ratings',
      label: 'Ratings',
      content: (
        <div className="space-y-3">
          {artworks.map((a) => {
            const avg = getAverageRating(a.id);
            const count = getRatingCount(a.id);
            return (
              <div key={a.id} className="flex items-center justify-between rounded-2xl border border-sand-200/70 bg-cream-50 p-4">
                <div className="flex items-center gap-3">
                  <img src={a.image} alt={a.title} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-display text-base text-ink">{a.title}</p>
                    <p className="text-sm text-ink-muted">{a.artistName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={avg} size={14} />
                  <span className="text-sm text-ink-muted">{avg > 0 ? `${avg.toFixed(1)} / 5` : '—'} · {count} ratings</span>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'messages',
      label: 'Messages & Comments',
      content: (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {(['all', 'new', 'reviewed', 'responded'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setMsgFilter(f)}
                className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  msgFilter === f ? 'bg-ink text-cream-100' : 'border border-sand-300 text-ink-soft hover:border-ink/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredComments.length === 0 && <Empty text="No messages in this filter." />}
            {filteredComments.map((c) => {
              const a = artworks.find((x) => x.id === c.artworkId);
              const artist = allArtists.find((ar) => ar.name === a?.artistName);
              return (
                <div key={c.id} className="rounded-2xl border border-sand-200/70 bg-cream-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-ink">{c.userName}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">{c.createdAt}</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                      c.status === 'new' ? 'bg-terracotta-400/20 text-terracotta-600' : c.status === 'responded' ? 'bg-emerald-100 text-emerald-700' : 'bg-sand-200 text-ink-soft'
                    }`}>{c.status}</span>
                  </div>
                  <div className="mt-3 grid gap-1 text-sm text-ink-muted">
                    <span>Artwork: <span className="text-ink">{a?.title}</span></span>
                    <span>Artist: <span className="text-ink">{artist?.name}</span></span>
                    {c.rating && <span className="flex items-center gap-1.5"><Star size={12} className="fill-gold-500 text-gold-500" /> {c.rating}/5</span>}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.message}</p>
                  {c.adminResponse && (
                    <div className="mt-3 rounded-xl bg-sand-100 p-3 text-sm text-ink-soft">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Gallery response: </span>{c.adminResponse}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => markReviewed(c.id)} className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:border-ink/30">
                      <Check size={12} /> Mark reviewed
                    </button>
                    <button onClick={() => showToast('Response sent.')} className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:border-ink/30">
                      Respond
                    </button>
                    <button onClick={() => showToast('Comment deleted.')} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-sand-300 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-terracotta-600 hover:bg-terracotta-400/10">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return <DashboardShell title="Admin Console" subtitle="Gallery management" tabs={tabs} />;
}

function ArtworkAdminRow({
  artwork,
  onToggleFeatured,
  onToggleAvail,
  onChangeCategory,
  onChangePrice,
  onDelete,
}: {
  artwork: Artwork;
  onToggleFeatured: () => void;
  onToggleAvail: () => void;
  onChangeCategory: (c: Category) => void;
  onChangePrice: (p: number) => void;
  onDelete: () => void;
}) {
  const [price, setPrice] = useState(String(artwork.price));
  return (
    <motion.div layout className="flex flex-col gap-4 rounded-2xl border border-sand-200/70 bg-cream-50 p-4 lg:flex-row lg:items-center">
      <img src={artwork.image} alt={artwork.title} className="h-16 w-16 rounded-xl object-cover" />
      <div className="flex-1">
        <p className="font-display text-base text-ink">{artwork.title}</p>
        <p className="text-sm text-ink-muted">{artwork.artistName}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={artwork.category}
          onChange={(e) => onChangeCategory(e.target.value as Category)}
          className="rounded-full border border-sand-300 bg-cream-100 px-3 py-2 text-[12px] text-ink outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="flex items-center gap-1.5 rounded-full border border-sand-300 bg-cream-100 px-3 py-1.5">
          <span className="text-[11px] text-ink-muted">GH₵</span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={() => onChangePrice(Number(price) || artwork.price)}
            className="w-20 bg-transparent text-[12px] text-ink outline-none"
          />
        </div>
        <button
          onClick={onToggleAvail}
          className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.14em] ${
            artwork.available ? 'bg-emerald-100 text-emerald-700' : 'bg-terracotta-400/20 text-terracotta-600'
          }`}
        >
          {artwork.available ? 'Available' : 'Sold'}
        </button>
        <button
          onClick={onToggleFeatured}
          className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.14em] ${
            artwork.featured ? 'bg-ink text-cream-100' : 'border border-sand-300 text-ink-soft'
          }`}
        >
          {artwork.featured ? 'Featured' : 'Feature'}
        </button>
        <button onClick={onDelete} className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 text-terracotta-600 hover:bg-terracotta-400/10" aria-label="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}
