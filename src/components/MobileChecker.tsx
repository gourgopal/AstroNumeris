import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeMobileNumber } from '../engine/modules/mobile';
import type { MobileNumerologyResult } from '../engine/modules/mobile';

interface MobileCheckerProps {
  mulank: number;
  bhagyank: number;
}

export const MobileChecker: React.FC<MobileCheckerProps> = ({ mulank, bhagyank }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [result, setResult] = useState<MobileNumerologyResult | null>(null);

  const handleAnalyze = () => {
    const cleaned = mobileNumber.replace(/\D/g, '');
    if (cleaned.length < 5) return; // Basic validation
    setResult(analyzeMobileNumber(cleaned, mulank, bhagyank));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
          Mobile Numerology Alignment
        </h3>
        <p className="text-sm text-gray-300 mb-6">
          Your mobile number carries a specific vibration. Let's check how well it aligns with your core energies (Mulank {mulank}, Bhagyank {bhagyank}).
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter Mobile Number"
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={handleAnalyze}
            disabled={mobileNumber.replace(/\D/g, '').length < 5}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze
          </button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Gauge & Score */}
          <div className="p-6 bg-white/5 border border-indigo-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
            <h4 className="text-gray-400 text-sm mb-2">Compatibility Score</h4>
            <div className="text-5xl font-bold text-white mb-2">
              {result.compatibilityScore}%
            </div>
            <div className={`px-4 py-1 rounded-full text-sm font-semibold border ${
              result.synergyStatus === 'Highly Favorable' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
              result.synergyStatus === 'Unfavorable' ? 'bg-red-500/20 text-red-400 border-red-500/50' :
              'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
            }`}>
              {result.synergyStatus}
            </div>
          </div>

          {/* Breakdown */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">Number Sum</span>
              <span className="text-white font-mono text-lg">{result.totalSum}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">Reduced Total</span>
              <span className="text-white font-mono text-xl font-bold">{result.reducedTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Zero Count</span>
              <span className={`font-mono text-lg ${result.zeroCount > 1 ? 'text-orange-400' : 'text-white'}`}>
                {result.zeroCount}
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="md:col-span-2 p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl">
            <h4 className="text-indigo-300 font-semibold mb-3">Cosmic Guidance</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};
