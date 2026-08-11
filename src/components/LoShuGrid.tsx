import React from 'react';
import { motion } from 'framer-motion';
import { LoShuGridResult } from '../engine/modules/loshu';

interface LoShuGridProps {
  result: LoShuGridResult;
}

const GRID_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

export const LoShuGrid: React.FC<LoShuGridProps> = ({ result }) => {
  const { generatedNumbers, psychic, destiny, kua } = result;

  // Count occurrences of each digit 1-9
  const digitCounts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };

  generatedNumbers.forEach(n => {
    if (n >= 1 && n <= 9) {
      digitCounts[n]++;
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] w-full max-w-lg flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
        Your Lo Shu Grid
      </h2>
      
      <div className="grid grid-cols-3 gap-2 w-full max-w-[300px] mb-8">
        {GRID_LAYOUT.map((row, rowIndex) => (
          row.map((cellNum, colIndex) => {
            const count = digitCounts[cellNum] || 0;
            const display = count > 0 ? String(cellNum).repeat(count) : '';
            return (
              <motion.div
                key={cellNum}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center justify-center h-24 rounded-xl border ${
                  count > 0 
                    ? 'border-indigo-500/50 bg-indigo-900/40 text-white shadow-[inset_0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'border-white/5 bg-black/20 text-gray-700'
                } text-2xl font-bold tracking-widest transition-colors duration-500`}
              >
                {display}
              </motion.div>
            );
          })
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Psychic</span>
          <span className="text-xl font-bold text-indigo-300">{psychic}</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Destiny</span>
          <span className="text-xl font-bold text-purple-300">{destiny}</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Kua</span>
          <span className="text-xl font-bold text-cyan-300">{kua}</span>
        </div>
      </div>
    </motion.div>
  );
};
