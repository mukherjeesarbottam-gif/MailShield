import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EmailAnalyzer from './components/EmailAnalyzer';
import Footer from './components/Footer';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [analyzerStatus, setAnalyzerStatus] = useState<'IDLE' | 'ANALYZING' | 'RESULT' | 'ERROR'>('IDLE');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let dark = true;
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      dark = false;
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    // Only update state if it differs from initial state to prevent unnecessary re-renders
    if (dark !== isDark) {
      setIsDark(dark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col transition-colors duration-300">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="flex-grow flex flex-col mt-16">
        <Hero isAnalyzing={analyzerStatus === 'ANALYZING'} />
        
        {/* The Email Analyzer Component */}
        <div className="relative -mt-10 mb-20 z-20">
          <EmailAnalyzer onStatusChange={setAnalyzerStatus} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
