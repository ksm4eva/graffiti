import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import Wordmark from '@/components/Wordmark';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface Props {
  title: string;
  subtitle: string;
  tabs: Tab[];
  accent?: 'terracotta' | 'ink';
}

export default function DashboardShell({ title, subtitle, tabs, accent = 'ink' }: Props) {
  const { navigate, signOut } = useApp();
  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];
  const accentClass = accent === 'terracotta' ? 'bg-terracotta-500' : 'bg-ink';

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-28">
      <div className="container-x py-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate({ name: 'home' })}
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> Back to gallery
          </button>
          <button
            onClick={() => {
              signOut();
              navigate({ name: 'home' });
            }}
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>

        <div className="mt-8 border-b border-sand-200 pb-8">
          <p className="eyebrow">{subtitle}</p>
          <h1 className="mt-3 font-display text-4xl font-light text-ink md:text-5xl">{title}</h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-left text-[12px] uppercase tracking-[0.18em] transition-colors lg:w-full ${
                    isActive ? 'text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dash-tab"
                      className={`absolute inset-0 -z-10 rounded-full ${accentClass}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {!isActive && <span className="absolute inset-0 -z-10 rounded-full border border-sand-200 lg:hidden lg:border-none" />}
                  {t.label}
                </button>
              );
            })}
          </nav>

          <div className="min-w-0">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab.content}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function StatCard({ n, l }: { n: string | number; l: string }) {
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-5">
      <p className="font-display text-3xl font-medium text-ink">{n}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">{l}</p>
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-200/30 p-12 text-center">
      <p className="text-ink-muted">{text}</p>
    </div>
  );
}
