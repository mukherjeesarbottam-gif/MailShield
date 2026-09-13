import React from 'react';
import { motion } from 'framer-motion';

const ThunderShield: React.FC = () => {
  return (
    <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
      {/* 3D Shield Logo */}
      <img 
        src="/logo.jpg" 
        alt="MailShield Thunder Shield" 
        className="w-20 h-20 object-cover rounded-[1rem] relative z-10 opacity-80 drop-shadow-[0_0_15px_rgba(0,255,102,0.4)]"
      />

      {/* Core Glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-accent-green/40 blur-xl rounded-full z-0"
      />

      {/* Lightning Crackles (Cyan & Green) */}
      <motion.div 
        animate={{ opacity: [0, 1, 0, 0, 1, 0], scale: [1, 1.2, 1, 1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 0.55, 0.6] }}
        className="absolute inset-[-10px] border border-cyan-400/50 rounded-xl blur-[2px] z-20"
        style={{ clipPath: 'polygon(50% 0%, 100% 20%, 80% 50%, 100% 80%, 50% 100%, 0% 80%, 20% 50%, 0% 20%)' }}
      />
      
      <motion.div 
        animate={{ opacity: [0, 0, 1, 0, 0, 0], scale: [1, 1, 1.3, 1, 1, 1], rotate: [0, 0, 15, 0, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.9, 1] }}
        className="absolute inset-[-15px] border-2 border-accent-green/60 rounded-lg blur-[1px] z-20"
        style={{ clipPath: 'polygon(50% 10%, 90% 30%, 70% 60%, 80% 90%, 40% 80%, 10% 90%, 30% 60%, 10% 30%)' }}
      />
      
      <motion.div 
        animate={{ opacity: [0, 0, 0, 1, 0, 0], rotate: [0, 0, 0, -20, 0, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.3, 0.4, 0.45, 0.5, 1] }}
        className="absolute w-20 h-2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[2px] z-20"
      />
    </div>
  );
};

export default ThunderShield;
