import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Wordmark from './Wordmark';
import { useApp, type Route } from '@/contexts/AppContext';

const links: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'About', route: { name: 'about' } },
  { label: 'Gallery', route: { name: 'gallery' } },
  { label: 'Contact', route: { name: 'contact' } },
];

// Inspired by the "I" letter in the hero GRAFFITI cutout: yellow paper, brownish-gold ink.
const SEARCH_BORDER = '#f0d887';
const SEARCH_TEXT = '#c9a44a';
// Light-green cutout paper tone for the menu button.
const MENU_GREEN = '#d8e4ce';

export default function Navbar() {
  const { route, navigate, wishlist, isAuthed, signOut } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPop = () => navigate(routeFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [navigate]);

  const isActive = (r: Route) => r.name === route.name;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-sand-200'
            : 'bg-white border-b border-sand-200'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-10">
            <Wordmark className="text-xl md:text-2xl" onClick={() => navigate({ name: 'home' })} />
            <ul className="hidden items-center gap-7 lg:flex">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.route)}
                    className={`group relative text-[12px] uppercase tracking-[0.22em] transition-colors hover:text-ink ${
                      isActive(l.route) ? 'text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-terracotta-500 transition-all duration-300 ease-smooth ${
                        isActive(l.route) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            {/* Search as text in a yellow oval border, light-brownish text */}
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.03]"
              style={{ borderColor: SEARCH_BORDER, color: SEARCH_TEXT }}
              aria-label="Search"
            >
              <Search size={15} style={{ color: SEARCH_TEXT }} />
              Search
            </button>

            {/* Three-line menu with circular light-green border background */}
            <button
              className="grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-[1.05]"
              style={{ borderColor: MENU_GREEN, backgroundColor: 'rgba(216, 228, 206, 0.12)', color: MENU_GREEN }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </nav>
      </header>

      {/* Slide-in menu panel (all screens) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[61] flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between px-5 md:h-20">
                <Wordmark className="text-xl" onClick={() => { setMenuOpen(false); navigate({ name: 'home' }); }} />
                <button
                  className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sand-200/60"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
                {/* Primary nav */}
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                  className="flex flex-col gap-1"
                >
                  {links.map((l) => (
                    <motion.li
                      key={l.label}
                      variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                    >
                      <button
                        onClick={() => { setMenuOpen(false); navigate(l.route); }}
                        className={`w-full py-2.5 text-left font-display text-3xl font-light transition-colors ${
                          isActive(l.route) ? 'text-ink' : 'text-ink-soft hover:text-ink'
                        }`}
                      >
                        {l.label}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="my-6 h-px bg-sand-200/70" />

                {/* Dashboard icons moved into the menu */}
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
                  className="flex flex-col gap-1"
                >
                  <MenuRow
                    icon={<Heart size={18} />}
                    label="Wishlist"
                    badge={wishlist.length}
                    onClick={() => { setMenuOpen(false); navigate({ name: 'user-dashboard' }); }}
                  />
                  <MenuRow
                    icon={<ShoppingBag size={18} />}
                    label="Shopping Bag"
                    onClick={() => { setMenuOpen(false); navigate({ name: 'user-dashboard' }); }}
                  />
                  <MenuRow
                    icon={<User size={18} />}
                    label={isAuthed ? 'Profile' : 'Sign In'}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(isAuthed ? { name: 'user-dashboard' } : { name: 'auth', mode: 'login' });
                    }}
                  />
                  <MenuRow
                    icon={<Menu size={18} />}
                    label="Dashboard"
                    onClick={() => { setMenuOpen(false); navigate({ name: 'user-dashboard' }); }}
                  />
                </motion.ul>

                <div className="mt-auto pt-6">
                  {isAuthed ? (
                    <button
                      onClick={() => { setMenuOpen(false); signOut(); }}
                      className="text-sm uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
                    >
                      Sign out
                    </button>
                  ) : (
                    <button
                      onClick={() => { setMenuOpen(false); navigate({ name: 'auth', mode: 'register' }); }}
                      className="text-sm uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
                    >
                      Create account
                    </button>
                  )}
                  <p className="mt-4 text-[11px] text-ink-muted">
                    © {new Date().getFullYear()} GRAFFITI Gallery
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mx-auto mt-20 w-[92%] max-w-2xl rounded-3xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 rounded-full bg-sand-200 px-5 py-4">
                <Search size={20} className="text-ink-muted" />
                <input
                  autoFocus
                  placeholder="Search artworks, artists, categories…"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X size={20} className="text-ink-muted" />
                </button>
              </div>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-ink-muted">
                Try: paintings · ceramics · Kwame Mensah
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuRow({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <motion.li variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
      <button
        onClick={onClick}
        className="flex w-full items-center gap-4 rounded-full px-3 py-3 text-left transition-colors hover:bg-sand-200"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-sand-300 text-ink">
          {icon}
        </span>
        <span className="text-sm uppercase tracking-[0.16em] text-ink">{label}</span>
        {badge && badge > 0 ? (
          <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-terracotta-500 px-1.5 text-[10px] font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </button>
    </motion.li>
  );
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
