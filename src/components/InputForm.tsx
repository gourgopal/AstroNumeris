import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gender, InputProfile } from '../engine/core/types';

interface InputFormProps {
  onSubmit: (profile: InputProfile) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && dob) {
      // Create a Date object in local time based on the input
      const [year, month, day] = dob.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      onSubmit({ name, dob: date, gender });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
        Enter Your Details
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white transition-colors"
            required
            placeholder="John Doe"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Date of Birth</label>
          <input 
            type="date" 
            value={dob} 
            onChange={e => setDob(e.target.value)} 
            className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Gender</label>
          <select 
            value={gender} 
            onChange={e => setGender(e.target.value as Gender)} 
            className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white transition-colors [&>option]:bg-gray-900"
          >
            <option value={Gender.Male}>Male</option>
            <option value={Gender.Female}>Female</option>
          </select>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0px 0px 8px rgb(168, 85, 247)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          Reveal My Cosmic Path
        </motion.button>
      </form>
    </motion.div>
  );
};
