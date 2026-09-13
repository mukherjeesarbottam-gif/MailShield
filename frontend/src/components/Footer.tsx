import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-border py-12 relative z-20 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="font-bold tracking-[0.3em] text-sm mb-2">MAILSHIELD</div>
        <div className="text-[10px] text-secondary/80 uppercase tracking-widest mt-4 border-t border-border/50 pt-4 max-w-xs mx-auto">
          Made by Sarbottam Mukherjee
        </div>
      </div>
    </footer>
  );
};

export default Footer;
