import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ScanAnimation from './ScanAnimation';
import ThreatResult, { type AnalysisData } from './ThreatResult';
import ThunderShield from './ThunderShield';

interface EmailAnalyzerProps {
  onStatusChange?: (
    status: 'IDLE' | 'ANALYZING' | 'RESULT' | 'ERROR'
  ) => void;
}

const EmailAnalyzer: React.FC<EmailAnalyzerProps> = ({ onStatusChange }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const [status, setInternalStatus] = useState<
    'IDLE' | 'ANALYZING' | 'RESULT' | 'ERROR'
  >('IDLE');

  const setStatus = (
    newStatus: 'IDLE' | 'ANALYZING' | 'RESULT' | 'ERROR'
  ) => {
    setInternalStatus(newStatus);

    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const [resultData, setResultData] = useState<AnalysisData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = async () => {
    if (!subject.trim() && !body.trim()) {
      setErrorMessage(
        'Please enter an email subject or body to analyze.'
      );
      setStatus('ERROR');
      return;
    }

    setStatus('ANALYZING');
    setErrorMessage('');

    try {
      // Production API URL is supplied by Vite through Render
      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error(
          'MailShield API URL is not configured.'
        );
      }

      const response = await axios.post(`${API_URL}/api/analyze`, {
        subject: subject.trim(),
        body: body.trim(),
      });

      // Simulate slight processing time for the animation experience
      setTimeout(() => {
        setResultData(response.data);
        setStatus('RESULT');
      }, 2500);

    } catch (error: any) {
      setTimeout(() => {
        setErrorMessage(
          error?.response?.data?.detail ||
            error?.message ||
            'Unable to connect to the MailShield inference service.'
        );

        setStatus('ERROR');
      }, 1000);
    }
  };

  const handleReset = () => {
    setSubject('');
    setBody('');
    setStatus('IDLE');
    setResultData(null);
    setErrorMessage('');
  };

  return (
    <div className="w-[92%] max-w-[740px] mx-auto py-12 relative z-20">

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="bg-white/40 dark:bg-surface/80 backdrop-blur-[12px] border border-white/60 dark:border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_10px_40px_rgba(200,150,255,0.15)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
      >

        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-wide mb-1 drop-shadow-sm">
            Email Spam Analyzer
          </h2>

          <p className="text-secondary text-sm">
            Inspect an email for spam and phishing signals.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {status === 'IDLE' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-6"
            >

              <div className="flex flex-col gap-2 group">

                <label className="text-xs font-bold tracking-widest text-secondary uppercase group-focus-within:text-accent-green transition-colors">
                  Email Subject
                </label>

                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full bg-background border border-border/80 shadow-inner rounded-lg px-4 py-4 text-base focus:outline-none focus:border-accent-green/50 focus:ring-1 focus:ring-accent-green/30 transition-all text-primary placeholder:text-secondary/50"
                />

              </div>

              <div className="flex flex-col gap-2 group">

                <label className="text-xs font-bold tracking-widest text-secondary uppercase group-focus-within:text-accent-green transition-colors">
                  Email Body
                </label>

                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Paste the email content here..."
                  rows={8}
                  className="w-full bg-background border border-border/80 shadow-inner rounded-lg px-4 py-4 text-base focus:outline-none focus:border-accent-green/50 focus:ring-1 focus:ring-accent-green/30 transition-all text-primary placeholder:text-secondary/50 resize-y"
                />

              </div>

              <motion.button
                onClick={handleAnalyze}
                whileHover={{ y: -1 }}
                whileTap={{ y: 2, scale: 0.98 }}
                className="mt-2 w-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 dark:bg-primary dark:bg-none text-white dark:text-background font-extrabold tracking-widest text-base py-5 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_25px_rgba(255,255,255,0.1)] opacity-95 hover:opacity-100 transition-all duration-300"
              >
                ANALYZE EMAIL
              </motion.button>

              <div className="mt-8 flex flex-col items-center justify-center text-center">

                <ThunderShield />

                <p className="text-sm text-secondary dark:text-gray-400 font-medium max-w-sm mt-2">
                  Awaiting Data. Enter a subject and body to generate a comprehensive ML threat report.
                </p>

                <div
                  className="mt-6 text-slate-900 dark:text-white opacity-90 font-semibold text-[13px] md:text-[14px] tracking-[1.5px] cursor-pointer transition-all duration-300 hover:opacity-100 hover:[text-shadow:0_0_8px_rgba(0,255,136,0.6),0_0_16px_rgba(0,255,136,0.3)]"
                >
                  Made by Sarbottam Mukherjee
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* Dynamic State Rendering */}

        <AnimatePresence mode="wait">

          {status === 'ERROR' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 p-6 bg-accent-red/10 border border-accent-red/20 rounded-xl text-center"
            >

              <div className="text-accent-red font-bold tracking-widest text-sm mb-2">
                ANALYSIS SERVICE UNAVAILABLE
              </div>

              <p className="text-secondary text-sm mb-4">
                {errorMessage}
              </p>

              <button
                onClick={() => setStatus('IDLE')}
                className="text-xs tracking-widest px-4 py-2 bg-background border border-border rounded-md hover:bg-surface transition-colors"
              >
                TRY AGAIN
              </button>

            </motion.div>
          )}

          {status === 'ANALYZING' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScanAnimation />
            </motion.div>
          )}

          {status === 'RESULT' && resultData && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              <ThreatResult data={resultData} />

              <div className="mt-12 flex justify-center">

                <motion.button
                  onClick={handleReset}
                  whileHover={{
                    y: -3,
                    boxShadow:
                      '0 0 25px rgba(0,255,102,0.6), inset 0 0 10px rgba(0,255,102,0.4)',
                  }}
                  whileTap={{
                    y: 2,
                    boxShadow:
                      '0 0 10px rgba(0,255,102,0.8), inset 0 0 5px rgba(0,255,102,0.5)',
                  }}
                  className="px-8 py-4 bg-surface/80 backdrop-blur-md border border-accent-green/50 text-accent-green font-extrabold tracking-[0.2em] uppercase text-xs rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_15px_rgba(0,255,102,0.2)] transition-colors"
                >
                  Analyze Another Email
                </motion.button>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </motion.div>

    </div>
  );
};

export default EmailAnalyzer;