import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, Heart, Minus, Plus, Star, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { artworks, artists, comments as allComments } from '@/data/mock';
import { formatPrice, getAverageRating, getRatingCount } from '@/lib/artwork';
import StarRating from '@/components/StarRating';
import GraffitiButton from '@/components/GraffitiButton';
import { Reveal } from '@/components/SectionTransition';

interface Props {
  id: string;
}

export default function ArtworkDetail({ id }: Props) {
  const { navigate, wishlist, toggleWishlist, userRatings, rateArtwork, comments, addComment, showToast, viewArtwork } = useApp();
  const artwork = artworks.find((a) => a.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [hoverStar, setHoverStar] = useState(0);

  const artComments = useMemo(
    () => comments.filter((c) => c.artworkId === id),
    [comments, id],
  );

  if (!artwork) {
    return (
      <main className="container-x flex min-h-screen flex-col items-center justify-center pt-32 text-center">
        <p className="font-display text-3xl text-ink">Artwork not found</p>
        <GraffitiButton className="mt-6" onClick={() => navigate({ name: 'home' })}>
          Back home
        </GraffitiButton>
      </main>
    );
  }

  const artist = artists.find((a) => a.id === artwork.artistId);
  const avg = getAverageRating(artwork.id);
  const count = getRatingCount(artwork.id);
  const inWish = wishlist.includes(artwork.id);
  const myRating = userRatings.find((r) => r.artworkId === id);

  const relatedArtworks = artworks
    .filter((a) => a.category === artwork.category && a.id !== id)
    .slice(0, 4);

  return (
    <main className="bg-cream-100 pt-24 md:pt-28">
      <div className="container-x py-8">
        <button
          onClick={() => navigate({ name: 'home' })}
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Image gallery */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-sand-200/70">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={artwork.gallery[activeImg]}
                  alt={artwork.title}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="mt-4 flex gap-3">
                {artwork.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`overflow-hidden rounded-xl border transition-all ${
                      activeImg === i ? 'border-ink' : 'border-sand-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={g} alt="" className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="eyebrow">{artwork.category}</p>
              <h1 className="mt-3 font-display text-4xl font-light leading-tight text-ink md:text-5xl">
                {artwork.title}
              </h1>
              <button
                onClick={() => artist && navigate({ name: 'artist', id: artist.id })}
                className="mt-3 font-serif text-xl italic text-ink-soft transition-colors hover:text-terracotta-600"
              >
                {artwork.artistName}
              </button>

              <div className="mt-5 flex items-center gap-3">
                <StarRating rating={avg} size={18} />
                <span className="text-sm text-ink-muted">
                  {avg > 0 ? `${avg.toFixed(1)} / 5` : 'Not yet rated'} · {count} ratings
                </span>
              </div>

              <p className="mt-7 font-display text-3xl font-medium text-ink">{formatPrice(artwork.price)}</p>

              <div className="mt-3 inline-flex items-center gap-2 text-sm">
                <span
                  className={`h-2 w-2 rounded-full ${artwork.available ? 'bg-emerald-600' : 'bg-terracotta-500'}`}
                />
                <span className={artwork.available ? 'text-ink-soft' : 'text-terracotta-600'}>
                  {artwork.available ? 'Available' : 'Sold'}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <GraffitiButton
                  size="lg"
                  arrow
                  onClick={() => (artwork.available ? setPurchaseOpen(true) : showToast('This artwork is no longer available'))}
                >
                  Purchase Artwork
                </GraffitiButton>
                <GraffitiButton
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    toggleWishlist(artwork.id);
                    showToast(inWish ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                >
                  <Heart size={16} className={inWish ? 'fill-terracotta-500 text-terracotta-500' : ''} />
                  {inWish ? 'Saved' : 'Add to Wishlist'}
                </GraffitiButton>
              </div>

              {/* Details grid */}
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-sand-200 pt-8">
                {[
                  { k: 'Medium', v: artwork.medium },
                  { k: 'Dimensions', v: artwork.dimensions },
                  { k: 'Year', v: String(artwork.year) },
                  { k: 'Availability', v: artwork.available ? 'Available' : 'Sold' },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="eyebrow">{row.k}</dt>
                    <dd className="mt-1 text-sm text-ink-soft">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* About the artwork + artist */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-light text-ink">About the artwork</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{artwork.description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-display text-3xl font-light text-ink">About the artist</h2>
            {artist && (
              <div className="mt-5 flex gap-5">
                <img src={artist.image} alt={artist.name} className="h-24 w-24 rounded-2xl object-cover" />
                <div>
                  <p className="font-display text-xl text-ink">{artist.name}</p>
                  <p className="text-sm text-ink-muted">{artist.location} · {artist.medium}</p>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">{artist.bio}</p>
                  <button
                    onClick={() => navigate({ name: 'artist', id: artist.id })}
                    className="mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-terracotta-500"
                  >
                    View Artist Profile
                    <ArrowLeft size={14} className="rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </Reveal>
        </div>

        {/* Ratings + comments */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl font-light text-ink">Rate this work</h2>
              <p className="mt-3 text-sm text-ink-muted">
                {myRating ? `You rated this ${myRating.stars} stars.` : 'Share your impression with the gallery.'}
              </p>
              <div className="mt-5 flex gap-2" onMouseLeave={() => setHoverStar(0)}>
                {[1, 2, 3, 4, 5].map((s) => {
                  const active = (hoverStar || myRating?.stars || 0) >= s;
                  return (
                    <button
                      key={s}
                      onMouseEnter={() => setHoverStar(s)}
                      onClick={() => {
                        rateArtwork(artwork.id, s as 1 | 2 | 3 | 4 | 5);
                        showToast(`You rated this ${s} star${s > 1 ? 's' : ''}`);
                      }}
                      aria-label={`${s} stars`}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={active ? 'fill-gold-500 text-gold-500' : 'text-sand-300'}
                        strokeWidth={1.5}
                      />
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <h3 className="font-display text-xl text-ink">Ratings</h3>
              <div className="mt-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => {
                  const stars = 5 - i;
                  const c = getRatingCount(artwork.id) || 0;
                  const pct = count > 0 ? Math.round((c / count) * 100) : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3 text-sm">
                      <span className="w-8 text-ink-muted">{stars}★</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-200">
                        <div className="h-full bg-gold-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-ink-muted">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl font-light text-ink">Comments</h2>
              <p className="mt-3 text-sm text-ink-muted">
                Comments are visible to gallery staff for review. Artists do not receive direct messages.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!commentText.trim()) return;
                  addComment(artwork.id, commentText.trim());
                  setCommentText('');
                  showToast('Comment posted — visible to the gallery admin.');
                }}
                className="mt-5"
              >
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  placeholder="Share a thoughtful note about this work…"
                  className="w-full resize-none rounded-2xl border border-sand-200 bg-cream-50 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
                />
                <div className="mt-3 flex justify-end">
                  <GraffitiButton size="sm" type="submit">
                    Post Comment
                  </GraffitiButton>
                </div>
              </form>

              <div className="mt-8 space-y-5">
                {artComments.length === 0 && (
                  <p className="text-sm text-ink-muted">No comments yet — be the first to share.</p>
                )}
                {artComments.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-sand-200/70 bg-cream-50 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-ink">{c.userName}</p>
                      <span className="text-[11px] text-ink-muted">{c.createdAt}</span>
                    </div>
                    {c.rating && (
                      <div className="mt-2">
                        <StarRating rating={c.rating} size={12} />
                      </div>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.message}</p>
                    {c.adminResponse && (
                      <div className="mt-4 rounded-xl bg-sand-100 p-4">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">Gallery response</p>
                        <p className="mt-1 text-sm text-ink-soft">{c.adminResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related */}
        {relatedArtworks.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-light text-ink">More in {artwork.category}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {relatedArtworks.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    viewArtwork(a.id);
                    navigate({ name: 'artwork', id: a.id });
                    setActiveImg(0);
                  }}
                  className="group text-left"
                >
                  <div className="overflow-hidden rounded-2xl border border-sand-200/70">
                    <img src={a.image} alt={a.title} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-display text-base text-ink">{a.title}</p>
                  <p className="text-sm text-ink-muted">{formatPrice(a.price)}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Purchase modal */}
      <AnimatePresence>
        {purchaseOpen && (
          <PurchaseModal
            artwork={artwork}
            onClose={() => setPurchaseOpen(false)}
            onConfirm={() => {
              setPurchaseOpen(false);
              showToast('Purchase confirmed. A receipt is on its way to your inbox.');
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function PurchaseModal({
  artwork,
  onClose,
  onConfirm,
}: {
  artwork: { id: string; title: string; artistName: string; price: number; image: string };
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState('Card');
  const shipping = 120;
  const total = artwork.price * qty + shipping;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/40 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-cream-100 p-6 md:rounded-3xl md:p-10"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Checkout</p>
            <h3 className="mt-2 font-display text-2xl text-ink">Purchase Artwork</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-sand-200/60">
            <X size={18} />
          </button>
        </div>

        {/* Artwork summary */}
        <div className="mt-6 flex gap-4 rounded-2xl border border-sand-200/70 bg-cream-50 p-4">
          <img src={artwork.image} alt={artwork.title} className="h-20 w-20 rounded-xl object-cover" />
          <div className="flex flex-1 flex-col">
            <p className="font-display text-lg text-ink">{artwork.title}</p>
            <p className="text-sm text-ink-muted">{artwork.artistName}</p>
            <p className="mt-auto font-display text-base text-ink">{formatPrice(artwork.price)}</p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-sand-300" aria-label="Decrease">
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full border border-sand-300" aria-label="Increase">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {step === 'form' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep('review');
            }}
            className="mt-6 space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <CheckoutField label="Full name" placeholder="Your name" />
              <CheckoutField label="Email" type="email" placeholder="you@example.com" />
            </div>
            <CheckoutField label="Delivery address" placeholder="Street, city, country" />
            <div>
              <p className="eyebrow">Payment method</p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {['Card', 'Mobile Money', 'Bank Transfer'].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPayment(p)}
                    className={`rounded-xl border px-3 py-3 text-[12px] uppercase tracking-[0.14em] transition-colors ${
                      payment === p ? 'border-ink bg-ink text-cream-100' : 'border-sand-300 text-ink-soft hover:border-ink/40'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <GraffitiButton type="submit" arrow>Continue</GraffitiButton>
            </div>
          </form>
        ) : (
          <div className="mt-6">
            <div className="space-y-3 rounded-2xl border border-sand-200/70 bg-cream-50 p-5 text-sm">
              <Row label="Subtotal" value={formatPrice(artwork.price * qty)} />
              <Row label="Shipping (insured)" value={formatPrice(shipping)} />
              <div className="border-t border-sand-200 pt-3">
                <Row label="Total" value={formatPrice(total)} bold />
              </div>
              <Row label="Payment" value={payment} />
            </div>
            <p className="mt-4 text-[12px] text-ink-muted">
              Payment is handled securely at checkout. This is a preview flow — no charge is made.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setStep('form')} className="text-[12px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink">
                Back
              </button>
              <GraffitiButton onClick={onConfirm} arrow>
                <Check size={16} /> Confirm Purchase
              </GraffitiButton>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CheckoutField({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-sand-200 bg-cream-100 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
      />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className={bold ? 'font-display text-lg text-ink' : 'text-ink'}>{value}</span>
    </div>
  );
}
