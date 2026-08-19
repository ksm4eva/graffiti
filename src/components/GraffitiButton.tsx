import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'solid' | 'outline';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  size?: Size;
  variant?: Variant;
  arrow?: boolean;
  fullWidth?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[12px]',
  md: 'px-7 py-3.5 text-[13px]',
  lg: 'px-9 py-4 text-sm',
};

export default function GraffitiButton({
  children,
  size = 'md',
  variant = 'solid',
  arrow = false,
  fullWidth = false,
  className = '',
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  // Pinterest-style: solid dark pill with white text; outline = dark border + dark text.
  const variantClass =
    variant === 'outline'
      ? 'border-ink bg-transparent text-ink hover:bg-ink hover:text-white'
      : 'border-ink bg-ink text-white';

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border px-7 py-3.5 font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${variantClass} ${sizeMap[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...(rest as any)}
    >
      {/* Moving inner highlight */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2.5 transition-transform duration-300 group-hover:-translate-x-0.5">
        {children}
        {arrow && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}
