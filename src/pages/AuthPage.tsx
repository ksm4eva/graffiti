import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import GraffitiButton from '@/components/GraffitiButton';
import Wordmark from '@/components/Wordmark';
import { galleryImages } from '@/data/mock';

interface Props {
  mode: 'login' | 'register' | 'forgot';
}

export default function AuthPage({ mode }: Props) {
  const { navigate, signIn, showToast } = useApp();
  const [loading, setLoading] = useState(false);

  const heading = mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create your account' : 'Reset your password';
  const sub = mode === 'login' ? 'Sign in to access your wishlist, ratings and purchases.' : mode === 'register' ? 'Join GRAFFITI to discover and own original art.' : 'Enter your email and we will send reset instructions.';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      showToast('Reset link sent — check your inbox.');
      navigate({ name: 'auth', mode: 'login' });
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      signIn();
      showToast('Signed in. Welcome to GRAFFITI.');
      navigate({ name: 'user-dashboard' });
    }, 700);
  };

  const googleSignIn = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      signIn();
      showToast('Signed in with Google.');
      navigate({ name: 'user-dashboard' });
    }, 700);
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Image side */}
      <div className="relative hidden overflow-hidden lg:block">
        <img src={galleryImages.aboutTall} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-serif text-3xl italic leading-snug">“Art worth discovering.”</p>
          <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-white/80">GRAFFITI Gallery · Accra</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center bg-white px-6 py-12 md:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center justify-between">
            <Wordmark className="text-xl" onClick={() => navigate({ name: 'home' })} />
            <button
              onClick={() => navigate({ name: 'home' })}
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink"
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-12">
            <h1 className="font-display text-4xl font-light text-ink">{heading}</h1>
            <p className="mt-3 text-ink-muted">{sub}</p>
          </motion.div>

          {mode !== 'forgot' && (
            <motion.button
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              onClick={googleSignIn}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-sand-200 bg-white px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>
          )}

          {mode !== 'forgot' && (
            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-sand-200" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">or</span>
              <span className="h-px flex-1 bg-sand-200" />
            </div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={submit}
            className="space-y-4"
          >
            {mode === 'register' && <Field label="Full name" type="text" placeholder="Your name" />}
            <Field label="Email" type="email" placeholder="you@example.com" icon={<Mail size={15} />} />
            {mode !== 'forgot' && <Field label="Password" type="password" placeholder="••••••••" />}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => navigate({ name: 'auth', mode: 'forgot' })} className="text-[12px] text-ink-muted hover:text-ink">
                  Forgot password?
                </button>
              </div>
            )}

            <GraffitiButton type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Send reset link'}
            </GraffitiButton>
          </motion.form>

          <p className="mt-6 text-center text-sm text-ink-muted">
            {mode === 'login' ? (
              <>New to GRAFFITI?{' '}
                <button onClick={() => navigate({ name: 'auth', mode: 'register' })} className="font-medium text-ink underline-offset-4 hover:underline">Create an account</button>
              </>
            ) : mode === 'register' ? (
              <>Already have an account?{' '}
                <button onClick={() => navigate({ name: 'auth', mode: 'login' })} className="font-medium text-ink underline-offset-4 hover:underline">Sign in</button>
              </>
            ) : (
              <button onClick={() => navigate({ name: 'auth', mode: 'login' })} className="font-medium text-ink underline-offset-4 hover:underline">Back to sign in</button>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({ label, type, placeholder, icon }: { label: string; type: string; placeholder?: string; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <div className="relative mt-2">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">{icon}</span>}
        <input
          required
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-sand-200 bg-sand-200/50 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40 ${icon ? 'pl-11 pr-5' : 'px-5'}`}
        />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}
