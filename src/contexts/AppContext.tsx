import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Artwork, Rating } from '@/data/types';
import { artworks as initialArtworks, ratings as initialRatings, comments as initialComments } from '@/data/mock';
import type { Comment } from '@/data/types';

export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'gallery' }
  | { name: 'contact' }
  | { name: 'artwork'; id: string }
  | { name: 'artist'; id: string }
  | { name: 'auth'; mode: 'login' | 'register' | 'forgot' }
  | { name: 'user-dashboard' }
  | { name: 'artist-dashboard' }
  | { name: 'admin-dashboard' };

interface AppState {
  route: Route;
  navigate: (route: Route) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  recentlyViewed: string[];
  viewArtwork: (id: string) => void;
  userRatings: Rating[];
  rateArtwork: (artworkId: string, stars: 1 | 2 | 3 | 4 | 5) => void;
  comments: Comment[];
  addComment: (artworkId: string, message: string) => void;
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  isAuthed: boolean;
  signIn: () => void;
  signOut: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => routeFromPath(window.location.pathname));

  const navigate = (next: Route) => {
    setRoute(next);
    window.history.pushState({}, '', pathForRoute(next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [wishlist, setWishlist] = useState<string[]>(['w2', 'w4']);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['w1', 'w2', 'w5']);
  const [userRatings, setUserRatings] = useState<Rating[]>([
    { id: 'ur1', userId: 'u1', userName: 'You', artworkId: 'w2', stars: 5, createdAt: '2024-08-01' },
    { id: 'ur2', userId: 'u1', userName: 'You', artworkId: 'w5', stars: 4, createdAt: '2024-09-26' },
  ]);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [isAuthed, setIsAuthed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const value = useMemo<AppState>(
    () => ({
      route,
      navigate,
      wishlist,
      toggleWishlist: (id) =>
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      recentlyViewed,
      viewArtwork: (id) =>
        setRecentlyViewed((r) => [id, ...r.filter((x) => x !== id)].slice(0, 6)),
      userRatings,
      rateArtwork: (artworkId, stars) => {
        setUserRatings((prev) => {
          const existing = prev.find((r) => r.artworkId === artworkId);
          if (existing) {
            return prev.map((r) => (r.artworkId === artworkId ? { ...r, stars } : r));
          }
          return [
            ...prev,
            { id: `ur-${Date.now()}`, userId: 'u1', userName: 'You', artworkId, stars, createdAt: new Date().toISOString().slice(0, 10) },
          ];
        });
      },
      comments,
      addComment: (artworkId, message) =>
        setComments((c) => [
          {
            id: `c-${Date.now()}`,
            artworkId,
            userId: 'u1',
            userName: 'You',
            message,
            createdAt: new Date().toISOString().slice(0, 10),
            status: 'new',
          },
          ...c,
        ]),
      artworks,
      setArtworks,
      isAuthed,
      signIn: () => setIsAuthed(true),
      signOut: () => setIsAuthed(false),
      toast,
      showToast: (msg) => {
        setToast(msg);
        window.setTimeout(() => setToast(null), 2600);
      },
    }),
    [route, wishlist, recentlyViewed, userRatings, comments, artworks, isAuthed, toast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

function routeFromPath(pathname: string): Route {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/about') return { name: 'about' };
  if (path === '/gallery') return { name: 'gallery' };
  if (path === '/contact') return { name: 'contact' };
  if (path.startsWith('/artwork/')) return { name: 'artwork', id: path.split('/')[2] ?? '' };
  if (path === '/login') return { name: 'auth', mode: 'login' };
  if (path === '/register') return { name: 'auth', mode: 'register' };
  if (path === '/forgot-password') return { name: 'auth', mode: 'forgot' };
  if (path === '/dashboard') return { name: 'user-dashboard' };
  if (path === '/artist-dashboard') return { name: 'artist-dashboard' };
  if (path === '/admin') return { name: 'admin-dashboard' };
  return { name: 'home' };
}

function pathForRoute(route: Route): string {
  switch (route.name) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'gallery': return '/gallery';
    case 'contact': return '/contact';
    case 'artwork': return `/artwork/${route.id}`;
    case 'artist': return `/artist/${route.id}`;
    case 'auth': return route.mode === 'login' ? '/login' : route.mode === 'register' ? '/register' : '/forgot-password';
    case 'user-dashboard': return '/dashboard';
    case 'artist-dashboard': return '/artist-dashboard';
    case 'admin-dashboard': return '/admin';
  }
}
