import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, AtSign, Inbox, MessageSquare } from 'lucide-react';

interface FloatingIconsProps {
  isAnalyzing: boolean;
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({ isAnalyzing }) => {
  // Define positions and colors for 5 floating icons
  const icons = [
    { Icon: Mail, x: '-35vw', y: '15vh', delay: 0, color: 'text-pink-500', blur: 'bg-pink-500/20' },
    { Icon: Send, x: '35vw', y: '10vh', delay: 1, color: 'text-blue-500', blur: 'bg-blue-500/20' },
    { Icon: AtSign, x: '-25vw', y: '35vh', delay: 2, color: 'text-yellow-500', blur: 'bg-yellow-500/20' },
    { Icon: MessageSquare, x: '25vw', y: '30vh', delay: 1.5, color: 'text-accent-green', blur: 'bg-accent-green/20' },
    { Icon: Inbox, x: '-45vw', y: '25vh', delay: 0.5, color: 'text-purple-500', blur: 'bg-purple-500/20' },
    { Icon: Mail, x: '45vw', y: '20vh', delay: 2.5, color: 'text-teal-500', blur: 'bg-teal-500/20' }
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-visible flex items-start justify-center">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ x: item.x, y: item.y, opacity: 0 }}
          animate={
            isAnalyzing
              ? { 
                  // Swoop down to the analyzer box
                  x: '0vw', 
                  y: '50vh', // Approximate center of the analyzer box below Hero
                  scale: 0,
                  opacity: 0,
                  rotate: 180,
                  transition: { duration: 0.8, ease: "anticipate", delay: index * 0.1 }
                }
              : {
                  x: [item.x, `calc(${item.x} + 20px)`, item.x],
                  y: [item.y, `calc(${item.y} + 30px)`, item.y],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                  opacity: 0.8,
                  transition: { 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: item.delay,
                    opacity: { duration: 1 } 
                  }
                }
          }
        >
          <div className="relative opacity-60 dark:opacity-80">
            <div className={`absolute inset-0 blur-xl ${item.blur} dark:opacity-50 rounded-full scale-150`} />
            <item.Icon className={`w-12 h-12 ${item.color} drop-shadow-lg relative z-10`} strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
