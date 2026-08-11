import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoShuGrid } from './components/LoShuGrid';
import { InstallPrompt } from './components/InstallPrompt';
import { DownloadReportButton } from './components/PDFReport';
import { NameTuner } from './components/NameTuner';
import { InputProfile } from './engine/core/types';
import { calculateLoShu, LoShuGridResult } from './engine/modules/loshu';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playSolfeggio, playMicroFeedback } from './lib/audio';
import './App.css';

function App() {
  const [result, setResult] = useState<LoShuGridResult | null>(null);

  const handleProfileSubmit = (profile: InputProfile) => {
    const calcResult = calculateLoShu(profile);
    setResult(calcResult);
    
    // Play micro-feedback and solfeggio based on Mulank
    playMicroFeedback('success');
    playSolfeggio(calcResult.psychic);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-gray-100 flex flex-col items-center p-4 sm:p-8 relative overflow-hidden">
      <InstallPrompt />
      {/* Cosmic background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none" />

      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-12 mt-8 z-10"
      >
        <Sparkles className="w-8 h-8 text-indigo-400" />
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
          AstroNumeris
        </h1>
      </motion.header>

      <main className="w-full max-w-4xl flex flex-col items-center z-10">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="input"
              exit={{ opacity: 0, x: -50 }}
              className="w-full flex justify-center"
            >
              <InputForm onSubmit={handleProfileSubmit} />
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full flex flex-col items-center gap-8"
            >
              <button 
                onClick={() => setResult(null)}
                className="self-start text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
              >
                ← Calculate another profile
              </button>
              
              <LoShuGrid result={result} />
              <DownloadReportButton result={result} />
              <NameTuner mulank={result.psychic} bhagyank={result.destiny} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
