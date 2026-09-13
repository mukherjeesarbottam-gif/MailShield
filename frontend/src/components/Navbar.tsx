import { Activity, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  return (
    <nav className="w-full border-b border-border bg-nav-bg/90 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.3)] rounded-xl overflow-hidden bg-background">
            <img src="/logo.jpg" alt="MailShield Logo" className="w-[70px] h-[70px] object-cover" />
          </div>
          <span className="font-extrabold tracking-[0.25em] text-[26px] uppercase drop-shadow-[0_0_10px_rgba(0,255,102,0.8)] text-primary">MailShield</span>
        </div>

        {/* Right Section: System Status & Theme Toggle */}
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-4 px-5 py-3 bg-surface border border-border rounded-full transition-colors duration-300">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Activity className="w-6 h-6 text-accent-green" />
            </motion.div>
            <span className="text-[14px] font-bold tracking-widest text-secondary uppercase">System Online</span>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-4 rounded-full hover:bg-surface border border-transparent hover:border-border transition-colors duration-300 text-secondary hover:text-primary cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
