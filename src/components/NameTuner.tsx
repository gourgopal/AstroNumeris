import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateChaldeanValue } from '../engine/modules/chaldean';
import { calculatePythagoreanValue } from '../engine/modules/pythagorean';
import { reduceToSingleDigit } from '../engine/core/calculator';

interface NameTunerProps {
  mulank: number; // Psychic
  bhagyank: number; // Destiny
}

export const NameTuner: React.FC<NameTunerProps> = ({ mulank, bhagyank }) => {
  const [name, setName] = useState('');

  const chaldeanSum = calculateChaldeanValue(name);
  const chaldeanSingle = reduceToSingleDigit(chaldeanSum);

  const pythagoreanSum = calculatePythagoreanValue(name);
  const pythagoreanSingle = reduceToSingleDigit(pythagoreanSum);

  // A basic harmony check: If the name vibration matches either Mulank or Bhagyank
  const isChaldeanHarmonious = chaldeanSingle === mulank || chaldeanSingle === bhagyank;
  const isPythagoreanHarmonious = pythagoreanSingle === mulank || pythagoreanSingle === bhagyank;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] w-full max-w-lg flex flex-col items-center mt-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
        Name Vibrational Tuner
      </h2>
      <p className="text-sm text-gray-300 text-center mb-6">
        Tune your name's vibration to match your Mulank ({mulank}) or Bhagyank ({bhagyank}).
      </p>

      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Type a name (e.g. John Doe)"
        className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white transition-colors text-center text-xl mb-6"
      />

      <div className="grid grid-cols-2 gap-4 w-full">
        {/* Chaldean Card */}
        <div className={`p-4 rounded-xl border flex flex-col items-center ${isChaldeanHarmonious ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-black/30 border-white/10'}`}>
          <span className="text-sm text-gray-400 mb-1">Chaldean</span>
          <span className="text-3xl font-bold text-white mb-2">{chaldeanSum > 0 ? `${chaldeanSum} ➔ ${chaldeanSingle}` : '0'}</span>
          {chaldeanSum > 0 && (
            <span className={`text-xs px-2 py-1 rounded ${isChaldeanHarmonious ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
              {isChaldeanHarmonious ? 'Harmonious' : 'Neutral/Dissonant'}
            </span>
          )}
        </div>

        {/* Pythagorean Card */}
        <div className={`p-4 rounded-xl border flex flex-col items-center ${isPythagoreanHarmonious ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-black/30 border-white/10'}`}>
          <span className="text-sm text-gray-400 mb-1">Pythagorean</span>
          <span className="text-3xl font-bold text-white mb-2">{pythagoreanSum > 0 ? `${pythagoreanSum} ➔ ${pythagoreanSingle}` : '0'}</span>
          {pythagoreanSum > 0 && (
            <span className={`text-xs px-2 py-1 rounded ${isPythagoreanHarmonious ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
              {isPythagoreanHarmonious ? 'Harmonious' : 'Neutral/Dissonant'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
