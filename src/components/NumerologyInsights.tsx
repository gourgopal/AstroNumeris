import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InputProfile } from '../engine/core/types';
import type { ExpandedProfile } from '../engine/core/types';
import { numerologyData, getNumberDetail } from '../engine/data';

interface NumerologyInsightsProps {
  profile: InputProfile;
  expandedProfile: ExpandedProfile;
}

export const NumerologyInsights: React.FC<NumerologyInsightsProps> = ({ expandedProfile }) => {
  const [activeTab, setActiveTab] = useState<'core' | 'planes' | 'name' | 'cycles'>('core');
  
  const mulankDetail = getNumberDetail(expandedProfile.psychic);
  const currentYear = new Date().getFullYear();
  const personalYear = expandedProfile.personalYears.find(py => py.year === currentYear)?.personalYear || expandedProfile.personalYears[0].personalYear;
  const personalYearDetail = numerologyData.personalYears[personalYear.toString() as keyof typeof numerologyData.personalYears];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mt-4 flex flex-col gap-6"
    >
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-2">
        Cosmic Insights
      </h2>

      {/* Custom Tabs */}
      <div className="flex w-full overflow-x-auto gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
        <TabButton active={activeTab === 'core'} onClick={() => setActiveTab('core')} label="Core Profile" />
        <TabButton active={activeTab === 'planes'} onClick={() => setActiveTab('planes')} label="Planes & Grid" />
        <TabButton active={activeTab === 'name'} onClick={() => setActiveTab('name')} label="Name Analysis" />
        <TabButton active={activeTab === 'cycles'} onClick={() => setActiveTab('cycles')} label="Life Cycles" />
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'core' && (
            <motion.div key="core" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-6">
              
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

              {/* Special Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expandedProfile.masterNumbers.length > 0 && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <h4 className="text-yellow-400 font-semibold mb-1">Master Numbers</h4>
                    <p className="text-gray-300">{expandedProfile.masterNumbers.join(', ')}</p>
                    <p className="text-xs text-yellow-500/70 mt-2">You possess higher spiritual potential and responsibilities.</p>
                  </div>
                )}
                {expandedProfile.karmicDebt > 0 && (
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <h4 className="text-orange-400 font-semibold mb-1">Karmic Debt Number</h4>
                    <p className="text-gray-300">{expandedProfile.karmicDebt}</p>
                    <p className="text-xs text-orange-500/70 mt-2">You carry lessons from past lives that must be resolved.</p>
                  </div>
                )}
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <h4 className="text-emerald-400 font-semibold mb-1">Lucky Numbers</h4>
                  <p className="text-gray-300">{expandedProfile.luckyNumbers.length > 0 ? expandedProfile.luckyNumbers.join(', ') : 'None perfectly aligned'}</p>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <h4 className="text-red-400 font-semibold mb-1">Unlucky Numbers</h4>
                  <p className="text-gray-300">{expandedProfile.unluckyNumbers.length > 0 ? expandedProfile.unluckyNumbers.join(', ') : 'None'}</p>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'planes' && (
            <motion.div key="planes" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-6">
              {expandedProfile.planes.length > 0 ? (
                <div className="p-6 bg-white/5 border border-indigo-500/20 rounded-2xl">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">Completed Planes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {expandedProfile.planes.map(p => {
                      const desc = numerologyData.planes[p as keyof typeof numerologyData.planes];
                      return (
                        <div key={p} className="p-3 bg-black/40 rounded-lg border border-indigo-500/20">
                          <h4 className="text-indigo-200 font-semibold">{p} Plane</h4>
                          <p className="text-xs text-gray-400 mt-1">{desc?.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center text-gray-400">
                  No fully completed planes in your Lo Shu Grid.
                </div>
              )}

              {/* Missing Numbers & Remedies */}
              {expandedProfile.missingNumbers.length > 0 && (
                <div className="p-6 backdrop-blur-md bg-white/5 border border-orange-500/20 rounded-2xl">
                  <h3 className="text-xl font-semibold text-orange-300 mb-4">Missing Energies & Remedies</h3>
                  <div className="flex flex-col gap-3">
                    {expandedProfile.missingNumbers.map(num => {
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
          )}

          {activeTab === 'name' && (
            <motion.div key="name" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-6">
              {expandedProfile.nameAnalysis.map((analysis, i) => (
                <div key={i} className="p-6 bg-white/5 border border-pink-500/20 rounded-2xl">
                  <h3 className="text-xl font-semibold text-pink-300 mb-4 capitalize">
                    {i === 0 ? "Full Name Analysis" : `Word ${i}: ${analysis.name}`}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-pink-500/10 rounded-xl text-center">
                      <span className="block text-4xl font-bold text-pink-400 mb-2">{analysis.soulUrge}</span>
                      <span className="block text-sm text-pink-200 font-semibold">Soul Urge (Vowels)</span>
                      <span className="text-xs text-gray-400">Your inner desires and motives.</span>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-xl text-center">
                      <span className="block text-4xl font-bold text-purple-400 mb-2">{analysis.personality}</span>
                      <span className="block text-sm text-purple-200 font-semibold">Personality (Consonants)</span>
                      <span className="text-xs text-gray-400">How others perceive you initially.</span>
                    </div>
                    <div className="p-4 bg-indigo-500/10 rounded-xl text-center">
                      <span className="block text-4xl font-bold text-indigo-400 mb-2">{analysis.destiny}</span>
                      <span className="block text-sm text-indigo-200 font-semibold">Expression (Total)</span>
                      <span className="text-xs text-gray-400">Your physical and mental constitution.</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'cycles' && (
            <motion.div key="cycles" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-6">
              
              {/* Personal Year Forecast */}
              {personalYearDetail && (
                <div className="p-6 bg-white/5 border border-cyan-500/20 rounded-2xl">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl font-semibold text-cyan-300">Personal Year ({currentYear})</h3>
                    <span className="text-3xl font-bold text-white">{personalYear}</span>
                  </div>
                  <p className="text-cyan-200 font-medium mb-3 italic">Theme: {personalYearDetail.keyword}</p>
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

              {/* Challenge Cycles */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Challenge Cycles (Pinnacles)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="block text-xs text-gray-400 mb-1">Ages 0 to {expandedProfile.challengeCycles.firstCycleAgeUpto}</span>
                    <span className="block text-2xl font-bold text-white mb-1">{expandedProfile.challengeCycles.firstCycle}</span>
                    <span className="text-sm text-gray-300">Phase 1</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="block text-xs text-gray-400 mb-1">Ages {expandedProfile.challengeCycles.firstCycleAgeUpto} to {expandedProfile.challengeCycles.secondCycleAgeUpto}</span>
                    <span className="block text-2xl font-bold text-white mb-1">{expandedProfile.challengeCycles.secondCycle}</span>
                    <span className="text-sm text-gray-300">Phase 2</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="block text-xs text-gray-400 mb-1">Ages {expandedProfile.challengeCycles.secondCycleAgeUpto} to {expandedProfile.challengeCycles.thirdCycleAgeUpto}</span>
                    <span className="block text-2xl font-bold text-white mb-1">{expandedProfile.challengeCycles.thirdCycle}</span>
                    <span className="text-sm text-gray-300">Phase 3</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="block text-xs text-gray-400 mb-1">Ages {expandedProfile.challengeCycles.fourthCycleAgeFrom} onwards</span>
                    <span className="block text-2xl font-bold text-white mb-1">{expandedProfile.challengeCycles.fourthCycle}</span>
                    <span className="text-sm text-gray-300">Phase 4</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

const TabButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-3 px-4 text-sm font-medium rounded-lg transition-all ${
      active 
        ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 shadow-inner' 
        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
    }`}
  >
    {label}
  </button>
);
