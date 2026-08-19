import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export default function Toast() {
  const { toast } = useApp();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 30, x: '-50%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[90] flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-cream-100 shadow-xl"
        >
          <CheckCircle2 size={16} className="text-terracotta-400" />
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
