import React from 'react';
import { motion } from 'framer-motion';
import type { InputProfile } from '../engine/core/types';
import type { LoShuGridResult } from '../engine/modules/loshu';
import { numerologyData, getNumberDetail } from '../engine/data';
import { reduceToSingleDigit } from '../engine/core/calculator';

interface NumerologyInsightsProps {
  profile: InputProfile;
  grid: LoShuGridResult;
}

export const NumerologyInsights: React.FC<NumerologyInsightsProps> = ({ profile, grid }) => {
  const { dob } = profile;
  
  // 1. Core Traits & Planetary Ruler (based on Psychic/Mulank)
  const mulankDetail = getNumberDetail(grid.psychic);

  // 2. Personal Year Calculation
  // Birth Day + Birth Month + Current Year
  const currentYear = new Date().getFullYear();
  const bDay = dob.getDate();
  const bMonth = dob.getMonth() + 1; // 1-12
  const personalYearSum = bDay + bMonth + currentYear;
  const personalYear = reduceToSingleDigit(personalYearSum);
  const personalYearDetail = numerologyData.personalYears[personalYear.toString() as keyof typeof numerologyData.personalYears];

  // 3. Missing Numbers Calculation
  const allDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const missingNumbers = allDigits.filter(d => !grid.generatedNumbers.includes(d));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mt-4 flex flex-col gap-6"
    >
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
        Cosmic Insights
      </h2>

      {/* Planetary Traits Card */}
      {mulankDetail && (
        <div className="p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.05)]">
          <h3 className="text-xl font-semibold text-purple-300 mb-2 flex items-center gap-2">
            Ruling Planet: <span className="text-white">{mulankDetail.planet}</span>
          </h3>
          <p className="text-gray-300 mb-4">{mulankDetail.traits}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="block text-green-400 text-sm font-semibold mb-1">Strengths</span>
              <span className="text-gray-300 text-sm">{mulankDetail.strengths}</span>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="block text-red-400 text-sm font-semibold mb-1">Weaknesses</span>
              <span className="text-gray-300 text-sm">{mulankDetail.weaknesses}</span>
            </div>
          </div>
        </div>
      )}

      {/* Personal Year Forecast */}
      {personalYearDetail && (
        <div className="p-6 backdrop-blur-md bg-white/5 border border-indigo-500/20 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.05)]">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-xl font-semibold text-indigo-300">Personal Year</h3>
            <span className="text-3xl font-bold text-white">{personalYear}</span>
          </div>
          <p className="text-indigo-200 font-medium mb-3 italic">Theme: {personalYearDetail.keyword}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm text-gray-400 mb-1">Opportunities</span>
              <p className="text-gray-300 text-sm">{personalYearDetail.positive}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-400 mb-1">Challenges</span>
              <p className="text-gray-300 text-sm">{personalYearDetail.negative}</p>
            </div>
          </div>
        </div>
      )}

      {/* Missing Numbers & Remedies */}
      {missingNumbers.length > 0 && (
        <div className="p-6 backdrop-blur-md bg-white/5 border border-orange-500/20 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.05)]">
          <h3 className="text-xl font-semibold text-orange-300 mb-4">Missing Energies</h3>
          <div className="flex flex-col gap-3">
            {missingNumbers.map(num => {
              const remedy = numerologyData.missingNumbers[num.toString() as keyof typeof numerologyData.missingNumbers];
              return (
                <div key={num} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-black/30 rounded-lg border border-white/5">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-orange-900/30 text-orange-400 font-bold text-xl rounded-full border border-orange-500/30">
                    {num}
                  </div>
                  <p className="text-sm text-gray-300 flex-1">{remedy || 'No specific remedy found.'}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </motion.div>
  );
};
