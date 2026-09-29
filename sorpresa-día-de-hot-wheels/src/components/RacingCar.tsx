import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio.ts';

export const RacingCar: React.FC = () => {
  const [isRevving, setIsRevving] = useState(false);

  const handleRev = () => {
    sound.playEngineRev();
    setIsRevving(true);
    setTimeout(() => setIsRevving(false), 1200);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center select-none pt-1">
      {/* Interactive Tooltip Prompt */}
      <button
        onClick={handleRev}
        className="group relative cursor-pointer focus:outline-none"
        title="¡Haz clic para acelerar el motor! 🏎️💨"
      >
        {/* Speed Smoke & Sparks when revving */}
        {isRevving && (
          <>
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8, x: 20 }}
              animate={{ scale: 1.6, opacity: 0, x: 60 }}
              transition={{ duration: 0.8 }}
              className="absolute -bottom-1 -right-6 text-2xl pointer-events-none"
            >
              💨
            </motion.div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8, x: -20 }}
              animate={{ scale: 1.6, opacity: 0, x: -60 }}
              transition={{ duration: 0.8 }}
              className="absolute -bottom-1 -left-6 text-2xl pointer-events-none"
            >
              💨
            </motion.div>
            <div className="absolute -top-6 text-rose-500 font-black text-xs tracking-wider animate-bounce bg-white/90 px-2 py-0.5 rounded-full border border-rose-300 shadow">
              ¡VROOOM! 🏎️🔥
            </div>
          </>
        )}

        {/* Car Image with Spring Hover & Rev vibration */}
        <motion.div
          animate={
            isRevving
              ? {
                  x: [-3, 3, -2, 2, -1, 1, 0],
                  y: [-2, 1, -1, 2, 0],
                  scale: [1, 1.05, 0.98, 1.03, 1],
                }
              : {
                  y: [0, -4, 0],
                }
          }
          transition={
            isRevving
              ? { duration: 0.8, ease: 'easeInOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative w-64 sm:w-72 h-24 sm:h-28 flex items-center justify-center"
        >
          {/* Shadow underneath */}
          <div className="absolute bottom-2 inset-x-8 h-4 bg-black/20 rounded-full blur-md" />

          {/* Hot Wheels Car Image */}
          <img
            src="/src/assets/images/hotwheels_f1_car_1790656297934.jpg"
            alt="Hot Wheels Formula 1 Car"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_18px_rgba(220,38,38,0.35)] cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </button>

      {/* Mini road line */}
      <div className="w-full max-w-[240px] h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full -mt-1 opacity-70" />
    </div>
  );
};
