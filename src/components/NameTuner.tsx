import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeChaldeanName } from '../engine/modules/chaldean';
import { analyzePythagoreanName } from '../engine/modules/pythagorean';
import { reduceToSingleDigit } from '../engine/core/calculator';

interface NameTunerProps {
  mulank: number;
  bhagyank: number;
  initialName?: string;
}

export const NameTuner: React.FC<NameTunerProps> = ({ mulank, bhagyank, initialName = '' }) => {
  const [name, setName] = useState(initialName);
  const [system, setSystem] = useState<'chaldean'|'pythagorean'>('chaldean');

  const chaldean = analyzeChaldeanName(name);
  const pythagorean = analyzePythagoreanName(name);

  const activeData = system === 'chaldean' ? chaldean : pythagorean;
  const activeSingle = reduceToSingleDigit(activeData.expression);
  
  // Harmony Check: if Expression matches Mulank or Bhagyank
  const isHarmonious = activeSingle === mulank || activeSingle === bhagyank;

  // Remedy Suggestion Engine: Brute-force adding common vowels
  const commonAdditions = ['a', 'e', 'i', 'o', 'u'];
  let remedySuggestion = '';
  
  if (name.length > 0 && !isHarmonious) {
    for (const add of commonAdditions) {
      const testName = name + add;
      const testData = system === 'chaldean' ? analyzeChaldeanName(testName) : analyzePythagoreanName(testName);
      const testSingle = reduceToSingleDigit(testData.expression);
      if (testSingle === mulank || testSingle === bhagyank) {
        remedySuggestion = `Try adding an '${add}' to make it ${testName} (Total: ${testSingle})`;
        break;
      }
    }
    if (!remedySuggestion) {
      // Try double letters
      for (const add of commonAdditions) {
        const testName = name + add + add;
        const testData = system === 'chaldean' ? analyzeChaldeanName(testName) : analyzePythagoreanName(testName);
        const testSingle = reduceToSingleDigit(testData.expression);
        if (testSingle === mulank || testSingle === bhagyank) {
          remedySuggestion = `Try adding '${add}${add}' to make it ${testName} (Total: ${testSingle})`;
          break;
        }
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] w-full max-w-2xl flex flex-col items-center mt-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
        Name Vibrational Tuner
      </h2>
      <p className="text-sm text-gray-300 text-center mb-6">
        Tune your name's vibration to match your Mulank ({mulank}) or Bhagyank ({bhagyank}).
      </p>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setSystem('chaldean')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${system === 'chaldean' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
        >
          Chaldean
        </button>
        <button 
          onClick={() => setSystem('pythagorean')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${system === 'pythagorean' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
        >
          Pythagorean
        </button>
      </div>

      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Type a name (e.g. John Doe)"
        className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white transition-colors text-center text-xl mb-6"
      />

      {name.length > 0 && (
        <div className="w-full mb-6 overflow-x-auto pb-4">
          <div className="flex justify-center gap-2 min-w-max">
            {activeData.breakdown.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-xs text-emerald-400 mb-1">{item.value > 0 ? item.value : '-'}</span>
                <span className="w-8 h-8 flex items-center justify-center bg-white/10 rounded text-white font-mono uppercase border border-white/5">
                  {item.char}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
        <div className="p-4 rounded-xl border bg-black/30 border-white/10 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1">Soul Urge (Vowels)</span>
          <span className="text-2xl font-bold text-white">{activeData.soulUrge}</span>
        </div>
        <div className="p-4 rounded-xl border bg-black/30 border-white/10 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1">Personality (Consonants)</span>
          <span className="text-2xl font-bold text-white">{activeData.personality}</span>
        </div>
        <div className={`p-4 rounded-xl border flex flex-col items-center ${isHarmonious ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-black/30 border-white/10'}`}>
          <span className="text-sm text-gray-400 mb-1">Expression (Total)</span>
          <span className="text-2xl font-bold text-white">{activeData.expression} ➔ {activeSingle}</span>
          <span className={`text-xs px-2 py-1 mt-2 rounded ${isHarmonious ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
            {isHarmonious ? 'Harmonious' : 'Neutral/Dissonant'}
          </span>
        </div>
      </div>

      {remedySuggestion && (
        <div className="w-full p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl text-yellow-200 text-sm text-center">
          <span className="block font-semibold mb-1">Remedy Suggestion:</span>
          {remedySuggestion}
        </div>
      )}

    </motion.div>
  );
};
