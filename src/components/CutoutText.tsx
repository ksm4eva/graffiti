import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  ariaLabel?: string;
}

const papers = [
  { bg: '#f4ead8', color: '#231712', font: 'Georgia, serif', rotate: -3, y: 2 },
  { bg: '#fdfbf7', color: '#b84335', font: 'Arial, sans-serif', rotate: 2, y: -3 },
  { bg: '#e5e0d6', color: '#176b60', font: 'Georgia, serif', rotate: -1, y: 3 },
  { bg: '#e8c7d2', color: '#b14e73', font: 'Palatino, serif', rotate: 3, y: -2 },
  { bg: '#dedbd3', color: '#171717', font: 'Impact, sans-serif', rotate: -2, y: 2 },
  { bg: '#f2e6cb', color: '#d36529', font: 'Times New Roman, serif', rotate: 4, y: -4 },
  { bg: '#d8e4ce', color: '#164d38', font: 'Arial Black, sans-serif', rotate: -2, y: 1 },
  { bg: '#f0d887', color: '#806014', font: 'Georgia, serif', rotate: 3, y: -2 },
];

export default function CutoutText({ text, className = '', ariaLabel }: Props) {
  const letters = Array.from(text);
  return (
    <span className={`cutout-text ${className}`} role="img" aria-label={ariaLabel ?? text}>
      {letters.map((letter, index) => {
        if (letter === ' ') return <span key={`space-${index}`} className="inline-block w-[0.3em]" aria-hidden="true" />;
        const paper = papers[(index * 3 + letters.length) % papers.length];
        return (
          <motion.span
            key={`${letter}-${index}`}
            initial={{ opacity: 0, y: 28, rotate: paper.rotate - 8 }}
            whileInView={{ opacity: 1, y: paper.y, rotate: paper.rotate }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
            className="cutout-letter"
            style={{
              backgroundColor: paper.bg,
              color: paper.color,
              fontFamily: paper.font,
              transform: `translateY(${paper.y}px) rotate(${paper.rotate}deg)`,
            }}
          >
            {letter}
          </motion.span>
        );
      })}
    </span>
  );
}
