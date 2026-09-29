import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio.ts';

interface CarItem {
  id: string;
  name: string;
  color: string;
  emoji: string;
  bgGrad: string;
}

export const HotWheelsCarTrack: React.FC = () => {
  const [activeCar, setActiveCar] = useState<string | null>(null);

  const cars: CarItem[] = [
    {
      id: 'car-1',
      name: 'Twin Mill Turbo',
      color: 'text-red-500',
      emoji: '🏎️',
      bgGrad: 'from-red-500 to-amber-500',
    },
    {
      id: 'car-2',
      name: 'Bone Shaker Blue',
      color: 'text-blue-500',
      emoji: '🚙',
      bgGrad: 'from-blue-600 to-cyan-400',
    },
    {
      id: 'car-3',
      name: 'Muscle Bound Orange',
      color: 'text-orange-500',
      emoji: '🚗',
      bgGrad: 'from-orange-500 to-yellow-400',
    },
    {
      id: 'car-4',
      name: 'Night Shifter Black',
      color: 'text-slate-800',
      emoji: '🏎️',
      bgGrad: 'from-slate-900 to-red-600',
    },
  ];

  const handleCarClick = (id: string) => {
    sound.playEngineRev();
    setActiveCar(id);
    setTimeout(() => setActiveCar(null), 1000);
  };

  return (
    <div className="w-full my-2 relative">
      {/* Orange Track Bar with Tire Tracks */}
      <div className="w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 h-2.5 rounded-full shadow-md border-b-2 border-orange-600 relative overflow-hidden flex items-center justify-between px-2">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px] opacity-25" />
      </div>

      {/* Row of Miniature Hot Wheels Cars sitting on track */}
      <div className="flex items-center justify-around mt-1 px-1">
        {cars.map((car) => {
          const isRevving = activeCar === car.id;
          return (
            <motion.button
              key={car.id}
              onClick={() => handleCarClick(car.id)}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              animate={
                isRevving
                  ? {
                      x: [0, 8, -8, 15, 0],
                      scale: [1, 1.25, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className="relative p-1 rounded-xl bg-white/80 hover:bg-white shadow-sm border border-orange-200 flex flex-col items-center cursor-pointer group transition-all"
              title={`¡Acelerar ${car.name}! 🏎️💨`}
            >
              {/* Little sound tooltip when tapped */}
              {isRevving && (
                <div className="absolute -top-6 text-[10px] font-black text-red-600 bg-white px-1.5 py-0.5 rounded-full shadow border border-red-300 animate-bounce whitespace-nowrap z-20">
                  ¡VROOM! 💨
                </div>
              )}
              <span className="text-xl group-hover:rotate-6 transition-transform">
                {car.emoji}
              </span>
              <span className="text-[9px] font-extrabold text-slate-700 tracking-tight font-cute">
                {car.name.split(' ')[0]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Collector Cars Banner */}
      <div className="mt-2 w-full rounded-2xl overflow-hidden border-2 border-orange-300 shadow-md relative group">
        <img
          src="/src/assets/images/hotwheels_cars_row_1790657121396.jpg"
          alt="Colección de autos Hot Wheels"
          className="w-full h-16 sm:h-20 object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between px-3 py-1">
          <span className="text-[11px] font-black text-amber-300 flex items-center gap-1 font-cute">
            <span>🔥</span> Colección Oficial Hot Wheels para Marcelo
          </span>
          <span className="text-[10px] font-bold text-white/90 bg-red-600 px-2 py-0.5 rounded-full">
            100% Amor
          </span>
        </div>
      </div>
    </div>
  );
};
