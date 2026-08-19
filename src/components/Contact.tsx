import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import GraffitiButton from './GraffitiButton';
import { Reveal, TextReveal } from './SectionTransition';
import { useApp } from '@/contexts/AppContext';

export default function Contact() {
  const { showToast } = useApp();
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Message sent. We will be in touch.');
    window.setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="bg-sand-200/40 py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-tight text-ink md:text-6xl">
              <TextReveal text="Contact" />
            </h2>
            <p className="mt-5 max-w-md text-ink-muted">
              Questions about a work, a commission, or visiting the gallery in Accra? Send a note and we will respond within two days.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 space-y-5">
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
          </Reveal>
        </div>

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
              <Field label="Subject" name="subject" placeholder="What is this about?" />
            </div>
            <div className="mt-5">
              <label className="eyebrow">Message</label>
              <textarea
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
      </div>
    </section>
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
