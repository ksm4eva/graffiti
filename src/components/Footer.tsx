import { Instagram, Music2, Facebook } from 'lucide-react';
import Wordmark from './Wordmark';
import { useApp } from '@/contexts/AppContext';

export default function Footer() {
  const { navigate } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand-200 bg-white text-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark className="text-2xl md:text-3xl" onClick={() => navigate({ name: 'home' })} />
          <p className="mt-5 max-w-xs font-serif text-2xl italic leading-snug text-ink-soft">
            Art worth discovering.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
            A contemporary Ghanaian gallery and marketplace for original paintings, sculptures, ceramics, leatherwork and prints.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-ink-muted">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { label: 'About', action: () => navigate({ name: 'about' }) },
              { label: 'Gallery', action: () => navigate({ name: 'gallery' }) },
              { label: 'Contact', action: () => navigate({ name: 'contact' }) },
              { label: 'Dashboard', action: () => navigate({ name: 'user-dashboard' }) },
              { label: 'Privacy', action: () => {} },
              { label: 'Terms', action: () => {} },
            ].map((l) => (
              <li key={l.label}>
                <button onClick={l.action} className="text-ink-soft transition-colors hover:text-terracotta-400">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-ink-muted">Follow</p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Music2, label: 'TikTok' },
              { Icon: Facebook, label: 'Facebook' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-sand-300 text-ink-soft transition-all duration-300 hover:border-terracotta-400 hover:bg-terracotta-500 hover:text-[#100e0c]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="mt-8 text-[12px] text-ink-muted">
            © {year} GRAFFITI Gallery. Accra, Ghana.
          </p>
        </div>
      </div>
    </footer>
  );
}
