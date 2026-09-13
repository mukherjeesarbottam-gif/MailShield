import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

export interface AnalysisData {
  prediction: string;
  decision_score: number;
  url_count: number;
  suspicious_url_count: number;
  url_stats?: {
    url_count_extracted: number;
    http_count: number;
    https_count: number;
    ip_url_count: number;
    short_url_count: number;
    suspicious_url_count: number;
  };
}

interface ThreatResultProps {
  data: AnalysisData;
}

const ThreatResult: React.FC<ThreatResultProps> = ({ data }) => {
  const isSpam = data.prediction === 'SPAM';
  
  // Use fallback values from url_stats if top-level values are missing or 0
  const displayUrlCount = data.url_count || data.url_stats?.url_count_extracted || 0;
  const displaySuspCount = data.suspicious_url_count || data.url_stats?.suspicious_url_count || 0;

  // Threat Signal calculation (bound -3 to +3 for visual meter)
  const boundedScore = Math.max(-3.0, Math.min(3.0, data.decision_score));
  const signalPercentage = ((boundedScore + 3.0) / 6.0) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex flex-col gap-6"
    >
      {/* Primary Result */}
      <div className={`p-10 border rounded-xl flex flex-col items-center justify-center text-center transition-colors duration-500
        ${isSpam ? 'border-accent-red/20 bg-accent-red/5' : 'border-accent-green/20 bg-accent-green/5'}`}
      >
        <div className="mb-4">
          {isSpam ? (
            <AlertTriangle className="w-16 h-16 text-accent-red drop-shadow-[0_0_15px_rgba(255,51,51,0.5)]" />
          ) : (
            <ShieldCheck className="w-16 h-16 text-accent-green drop-shadow-[0_0_15px_rgba(0,255,102,0.5)]" />
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${isSpam ? 'bg-spam-bg text-spam-text border border-spam-border' : 'bg-ham-bg text-ham-text border border-ham-border'}`}>
            {isSpam ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-1">Analysis Complete</div>
            <h3 className={`text-3xl font-bold tracking-wide ${isSpam ? 'text-spam-text' : 'text-ham-text'}`}>
              {isSpam ? 'SPAM' : 'NOT SPAM'}
            </h3>
          </div>
        </div>
        <p className="text-secondary max-w-lg mt-4">
          {isSpam 
            ? "MailShield detected characteristics associated with spam or phishing."
            : "MailShield classified this email as legitimate based on its learned signals."}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border p-6 rounded-xl flex flex-col">
          <span className="text-[0.65rem] text-secondary tracking-widest font-semibold mb-2">MODEL DECISION SCORE</span>
          <span className="text-3xl font-bold">{data.decision_score.toFixed(3)}</span>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl flex flex-col">
          <span className="text-[0.65rem] text-secondary tracking-widest font-semibold mb-2">URLS DETECTED</span>
          <span className="text-3xl font-bold">{displayUrlCount}</span>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl flex flex-col">
          <span className="text-[0.65rem] text-secondary tracking-widest font-semibold mb-2">SUSPICIOUS URLS</span>
          <span className="text-3xl font-bold">{displaySuspCount}</span>
        </div>
      </div>

      {/* Threat Signal Meter */}
      <div className="bg-surface border border-border p-8 rounded-xl">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[0.65rem] text-secondary tracking-widest font-semibold">LOW</span>
          <span className="text-xs font-bold tracking-[0.15em] text-primary">THREAT SIGNAL</span>
          <span className="text-[0.65rem] text-secondary tracking-widest font-semibold">HIGH</span>
        </div>
        <div className="h-2 w-full bg-background rounded-full overflow-hidden relative border border-border/50">
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out
              ${data.decision_score > 0 ? 'bg-gradient-to-r from-accent-amber to-accent-red' : 'bg-gradient-to-r from-accent-green to-accent-amber'}
            `}
            style={{ width: `${signalPercentage}%` }}
          />
        </div>
        <p className="text-xs text-secondary mt-4 text-center">
          * This is a model signal, not a calibrated probability.
        </p>
      </div>

      {/* URL Security Analysis */}
      {displayUrlCount > 0 && data.url_stats && (
        <div className="bg-surface border border-border p-8 rounded-xl">
          <h3 className="text-sm font-bold tracking-widest mb-6">URL SECURITY ANALYSIS</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-secondary tracking-wide">Total URLs</span>
              <span className="font-semibold text-lg">{data.url_stats.url_count_extracted}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-secondary tracking-wide">HTTPS URLs</span>
              <span className="font-semibold text-lg">{data.url_stats.https_count}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-secondary tracking-wide">HTTP URLs</span>
              <span className="font-semibold text-lg">{data.url_stats.http_count}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-secondary tracking-wide">Suspicious URLs</span>
              <span className="font-semibold text-lg text-accent-amber">{data.url_stats.suspicious_url_count}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-secondary tracking-wide">IP-based URLs</span>
              <span className="font-semibold text-lg">{data.url_stats.ip_url_count}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-secondary tracking-wide">Shortened URLs</span>
              <span className="font-semibold text-lg">{data.url_stats.short_url_count}</span>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default ThreatResult;
