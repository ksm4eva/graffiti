import { motion } from 'framer-motion';

interface Props {
  className?: string;
  onClick?: () => void;
}

// Hand-tuned per-letter collage: each letter has its own paper, font, color, rotation and offset.
// Modeled on the attached "happy" reference — mismatched printed letters assembled into one word.
const letters: {
  ch: string;
  bg: string;
  color: string;
  font: string;
  weight: string;
  rotate: number;
  y: number;
  scale: number;
}[] = [
  { ch: 'G', bg: '#f4ead8', color: '#1a1715', font: 'Georgia, serif', weight: '700', rotate: -4, y: 1, scale: 1.02 },
  { ch: 'R', bg: '#fdfbf7', color: '#b84335', font: 'Arial, sans-serif', weight: '800', rotate: 3, y: -3, scale: 0.96 },
  { ch: 'A', bg: '#e8c7d2', color: '#1a1715', font: 'Palatino, serif', weight: '700', rotate: -2, y: 2, scale: 1.04 },
  { ch: 'F', bg: '#d8e4ce', color: '#164d38', font: 'Arial Black, sans-serif', weight: '900', rotate: 4, y: -2, scale: 0.97 },
  { ch: 'F', bg: '#f0d887', color: '#806014', font: 'Times New Roman, serif', weight: '700', rotate: -3, y: 3, scale: 1.01 },
  { ch: 'I', bg: '#e5e0d6', color: '#176b60', font: 'Georgia, serif', weight: '700', rotate: 2, y: -1, scale: 1.05 },
  { ch: 'T', bg: '#dedbd3', color: '#b14e73', font: 'Impact, sans-serif', weight: '900', rotate: -2, y: 2, scale: 0.98 },
  { ch: 'I', bg: '#f2e6cb', color: '#d36529', font: 'Arial, sans-serif', weight: '800', rotate: 3, y: -3, scale: 1.03 },
];

export default function Wordmark({ className = '', onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-[0.04em] ${className}`}
      aria-label="GRAFFITI home"
    >
      {letters.map((l, i) => (
        <motion.span
          key={`${l.ch}-${i}`}
          initial={{ opacity: 0, y: 14, rotate: l.rotate - 6 }}
          animate={{ opacity: 1, y: l.y, rotate: l.rotate }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="cutout-letter select-none"
          style={{
            backgroundColor: l.bg,
            color: l.color,
            fontFamily: l.font,
            fontWeight: l.weight,
            transform: `translateY(${l.y}px) rotate(${l.rotate}deg) scale(${l.scale})`,
            fontSize: '1em',
            lineHeight: 0.9,
            padding: '0.04em 0.12em 0.08em',
          }}
        >
          {l.ch}
        </motion.span>
      ))}
    </button>
  );
}
