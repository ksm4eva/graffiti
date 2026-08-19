import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import GraffitiButton from '@/components/GraffitiButton';
import CutoutText from '@/components/CutoutText';
import { Reveal } from '@/components/SectionTransition';
import { useApp } from '@/contexts/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Message sent to the gallery. We will be in touch.');
    window.setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="bg-white pt-28 md:pt-36">
      <section className="container-x pb-10 md:pb-14">
        <Reveal>
          <p className="eyebrow">Get in touch</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <CutoutText text="TALK TO US" ariaLabel="Talk to us" className="text-4xl sm:text-6xl lg:text-7xl" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
            Questions about a work, a commission, feedback, or visiting the gallery in Accra? Send a note and we will respond within two days. All messages go to the gallery team.
          </p>
        </Reveal>
      </section>

      <section className="container-x grid gap-12 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="space-y-5">
            {[
              { Icon: MapPin, label: '24 Independence Avenue, Accra, Ghana' },
              { Icon: Mail, label: 'hello@graffiti.gallery' },
              { Icon: Phone, label: '+233 30 555 0124' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-sand-300 text-ink">
                  <Icon size={17} />
                </span>
                <span className="text-sm text-ink-soft">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-sand-200 bg-sand-200/50 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-sand-600">A note on messages</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Your message is received by the gallery admin team. Artists do not receive direct messages from visitors.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="lg:col-span-7">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-sand-200 bg-white p-6 md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="mt-5">
              <label className="eyebrow" htmlFor="topic">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                className="mt-2 w-full rounded-2xl border border-sand-200 bg-sand-200/50 px-5 py-3.5 text-ink outline-none transition-colors focus:border-ink/40"
              >
                <option>An artwork</option>
                <option>An artist</option>
                <option>A purchase</option>
                <option>General question</option>
                <option>Feedback</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="eyebrow" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell us a little more…"
                className="mt-2 w-full resize-none rounded-2xl border border-sand-200 bg-sand-200/50 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
              />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-[12px] text-ink-muted">
                {sent ? 'Thank you — your message is on its way.' : 'We reply within 48 hours.'}
              </p>
              <GraffitiButton type="submit" arrow>
                Send Message
              </GraffitiButton>
            </div>
          </form>
        </Reveal>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-sand-200 bg-sand-200/50 px-5 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink/40"
      />
    </div>
  );
}
