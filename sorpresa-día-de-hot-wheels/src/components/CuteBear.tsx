import React from 'react';
import { motion } from 'motion/react';

export type BearMood = 'asking' | 'pleading' | 'grumpy' | 'celebrating';

interface CuteBearProps {
  mood: BearMood;
  className?: string;
}

export const CuteBear: React.FC<CuteBearProps> = ({ mood, className = 'w-44 h-44' }) => {
  // Select the appropriate mood image
  const getImageForMood = () => {
    switch (mood) {
      case 'pleading':
        return '/src/assets/images/sad_crying_bear_1790657094301.jpg';
      case 'grumpy':
        return '/src/assets/images/angry_pouting_bear_1790657111019.jpg';
      case 'celebrating':
        return '/src/assets/images/bear_eating_carrot_1790656788718.jpg';
      case 'asking':
      default:
        return '/src/assets/images/bear_eating_carrot_1790656788718.jpg';
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Overhead Mood Speech Bubble / Badge */}
      {mood === 'pleading' && (
        <motion.div
          initial={{ scale: 0.8, y: 5 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -top-7 animate-bounce bg-white/95 backdrop-blur-sm px-3.5 py-0.5 rounded-full border-2 border-sky-400 shadow-md text-sky-600 font-bold text-xs tracking-wider z-20"
        >
          🥺 PLISS, di que sí... 💧
        </motion.div>
      )}

      {mood === 'grumpy' && (
        <motion.div
          initial={{ scale: 0.8, y: 5 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -top-7 animate-pulse bg-white/95 backdrop-blur-sm px-3.5 py-0.5 rounded-full border-2 border-rose-500 shadow-md text-rose-600 font-bold text-xs tracking-wider z-20"
        >
          💢 ¡YA BASTA! GRRR 😤 💢
        </motion.div>
      )}

      {mood === 'celebrating' && (
        <motion.div
          initial={{ scale: 0.8, y: -5 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -top-8 animate-bounce bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full border-2 border-rose-500 shadow-lg text-rose-500 font-extrabold text-sm tracking-widest z-20"
        >
          💖 ¡SIII! YAAS! 🎉 💖
        </motion.div>
      )}

      {/* Floating Particles depending on mood */}
      {mood === 'asking' && (
        <>
          <span className="absolute -top-2 left-2 text-rose-400 text-lg animate-float" style={{ animationDelay: '0s' }}>
            💕
          </span>
          <span className="absolute -top-1 right-2 text-amber-500 text-base font-bold animate-float" style={{ animationDelay: '0.8s' }}>
            ♪
          </span>
          <span className="absolute bottom-5 -right-3 text-rose-500 text-lg animate-pulse-heart">
            ❤️
          </span>
          <span className="absolute bottom-6 -left-3 text-orange-400 text-sm animate-float">
            🥕
          </span>
        </>
      )}

      {mood === 'pleading' && (
        <>
          <span className="absolute top-1 left-0 text-xl animate-float">💧</span>
          <span className="absolute top-2 right-1 text-xl animate-float" style={{ animationDelay: '0.4s' }}>
            🥺
          </span>
          <span className="absolute bottom-4 -left-2 text-base text-sky-500 animate-pulse">💔</span>
          <span className="absolute bottom-4 -right-2 text-base text-sky-400 animate-pulse">😢</span>
        </>
      )}

      {mood === 'grumpy' && (
        <>
          <span className="absolute -top-3 left-1 text-xl animate-pulse">💨</span>
          <span className="absolute -top-2 right-1 text-xl animate-pulse" style={{ animationDelay: '0.3s' }}>
            💢
          </span>
          <span className="absolute bottom-5 -left-3 text-lg animate-bounce">😤</span>
          <span className="absolute bottom-5 -right-3 text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
            💥
          </span>
        </>
      )}

      {mood === 'celebrating' && (
        <>
          <span className="absolute -top-4 -left-3 text-xl animate-float">🎉</span>
          <span className="absolute -top-3 -right-3 text-xl animate-float" style={{ animationDelay: '0.5s' }}>🏁</span>
          <span className="absolute bottom-2 -left-4 text-rose-500 text-lg animate-pulse-heart">💖</span>
          <span className="absolute bottom-3 -right-4 text-orange-500 text-lg animate-pulse-heart" style={{ animationDelay: '0.3s' }}>🏎️</span>
        </>
      )}

      {/* Main Bear Mood Image Container */}
      <motion.div
        key={mood}
        initial={{ scale: 0.85, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-2 bg-gradient-to-tr shadow-xl border-4 transition-all duration-300 flex items-center justify-center ${
          mood === 'pleading'
            ? 'from-sky-200 via-white to-blue-100 border-sky-400 ring-4 ring-sky-200'
            : mood === 'grumpy'
            ? 'from-rose-300 via-white to-red-200 border-red-500 ring-4 ring-red-200'
            : mood === 'celebrating'
            ? 'from-pink-200 via-yellow-100 to-rose-200 border-rose-400 ring-4 ring-rose-300'
            : 'from-pink-200 via-white to-rose-100 border-white ring-2 ring-pink-200'
        }`}
      >
        <img
          src={getImageForMood()}
          alt={`Osito ${mood}`}
          className="w-full h-full object-cover rounded-full filter drop-shadow-md relative z-10"
          referrerPolicy="no-referrer"
        />

        {/* Small corner badge indicating mood */}
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border-2 border-slate-200 shadow-md z-20 text-sm flex items-center justify-center">
          {mood === 'asking' && '🥕'}
          {mood === 'pleading' && '🥺'}
          {mood === 'grumpy' && '😤'}
          {mood === 'celebrating' && '🏁'}
        </div>
      </motion.div>
    </div>
  );
};
