import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingIcons from './FloatingIcons';

interface HeroProps {
  isAnalyzing: boolean;
}

const Hero: React.FC<HeroProps> = ({ isAnalyzing }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative pt-32 pb-16 px-6 overflow-hidden perspective-1000">
      {/* Background Effects with 3D Depth */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,102,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,255,102,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </motion.div>
      
      <FloatingIcons isAnalyzing={isAnalyzing} />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="inline-block px-4 py-1.5 mb-8 border border-border/80 rounded-full bg-surface/80 backdrop-blur-sm text-[0.65rem] font-bold tracking-widest text-secondary shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            AI EMAIL SECURITY
          </div>
          
          <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold tracking-tight mb-6 drop-shadow-sm dark:drop-shadow-lg leading-tight">
            AI-Powered Threat Detection.
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary font-medium max-w-3xl mx-auto">
            Leveraging advanced ML models to identify phishing, spam, and malicious intent in real-time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
