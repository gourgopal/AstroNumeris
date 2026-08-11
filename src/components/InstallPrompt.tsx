import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global variable to capture the beforeinstallprompt event
let deferredPrompt: any = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export const InstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt if the event has fired and the app isn't already installed
    if (deferredPrompt) {
      setShowPrompt(true);
    }
    
    // Listen for the event in case it fires after mount
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    deferredPrompt = null;
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 bg-indigo-900/80 backdrop-blur-md border border-indigo-500/30 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.2)] z-50 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-white">Install AstroNumeris</h3>
            <button 
              onClick={() => setShowPrompt(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-indigo-200">
            Install the app for a full screen experience and offline calculations!
          </p>
          <button 
            onClick={handleInstallClick}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-400 hover:to-indigo-400 transition-colors font-medium text-sm"
          >
            Add to Home Screen
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
