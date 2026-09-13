import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox } from 'lucide-react';

const ScanAnimation: React.FC = () => {
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    // Trigger burst right before transitioning to RESULT
    const timer = setTimeout(() => {
      setShowBurst(true);
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 relative">
      <AnimatePresence>
        {!showBurst && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [-10, 10, -10]
            }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            className="relative z-10"
          >
            <div className="bg-surface/50 p-6 rounded-2xl border border-border shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
              <Inbox className="w-16 h-16 text-primary drop-shadow-md" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-bold tracking-widest text-secondary mt-6 uppercase text-center">Processing...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Burst Animation */}
      {showBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-accent-green dark:to-primary"
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ 
                x: Math.cos((i * 30) * Math.PI / 180) * 120,
                y: Math.sin((i * 30) * Math.PI / 180) * 120,
                scale: 0,
                opacity: 0
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
          {/* Central flash */}
          <motion.div 
            className="absolute w-32 h-32 bg-cyan-400/30 dark:bg-accent-green/30 rounded-full blur-xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </div>
  );
};

export default ScanAnimation;
