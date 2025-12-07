import { motion } from 'framer-motion';

interface ProgressIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export const ProgressIndicators = ({ total, current, onSelect }: ProgressIndicatorsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="relative group"
          aria-label={`Go to slide ${index + 1}`}
        >
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-gold-500 scale-100'
                : 'bg-white/30 hover:bg-white/50 scale-75'
            }`}
          />
          {index === current && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold-400"
              layoutId="activeIndicator"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
