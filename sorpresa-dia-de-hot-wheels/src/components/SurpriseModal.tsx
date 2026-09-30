import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HotWheelsLogo } from './HotWheelsLogo.tsx';
import { sound } from '../utils/audio.ts';
import {
  ArrowLeft,
  Heart,
  ChevronLeft,
  ChevronRight,
  Upload,
  Camera,
  Check,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type SurpriseType = 'letter' | 'trophy' | 'bouquet' | 'memories' | null;

interface SurpriseModalProps {
  type: SurpriseType;
  recipientName: string; // Marcelo
  senderName: string;    // Cristina
  onClose: () => void;
}

interface PhotoMemory {
  id: number;
  title: string;
  emoji: string;
  defaultImage: string;
  subtitle: string;
  sticker: string;
  message: string;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  type,
  recipientName,
  senderName,
  onClose,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  // User uploaded real photos stored in localStorage
  const [realPhotos, setRealPhotos] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('hotwheels_marcelo_cristina_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  // Save to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(
        'hotwheels_marcelo_cristina_photos',
        JSON.stringify(realPhotos)
      );
    } catch {
      // Ignore if quota exceeded
    }
  }, [realPhotos]);

  if (!type) return null;

  const handleBack = () => {
    sound.playPop();
    onClose();
  };

  // Cristina's 6 memories matching the exact 6 photos provided!
  const photoMemories: PhotoMemory[] = [
    {
      id: 0,
      title: 'Por la paciencia que me tienes ❤️',
      emoji: '❤️',
      defaultImage: '/src/assets/images/couple_polka_blanket_1790656797709.jpg',
      subtitle: 'Enredados en nuestra mantita rosa con lunares 💕',
      sticker: '🏁 100 KM/H',
      message:
        'Gracias por tenerme tanta paciencia, incluso cuando puedo ser un poquito complicada. Me encanta saber que siempre intentas entenderme y estar conmigo. Valoro muchísimo eso de ti. ❤️',
    },
    {
      id: 1,
      title: 'Por lo lindo que eres conmigo 🥰',
      emoji: '🥰',
      defaultImage: '/src/assets/images/couple_car_sleep_1790656808392.jpg',
      subtitle: 'Descansando en tu hombro en el auto/bus 🚗💤',
      sticker: '🏎️ TURBO LOVE',
      message:
        'Gracias por tratarme siempre con tanto cariño y por hacerme sentir especial con cada pequeño detalle. Me encanta la forma en que me cuidas y me demuestras lo mucho que me quieres. 🥰',
    },
    {
      id: 2,
      title: 'Por tratarme como una niña 🥺',
      emoji: '🥺',
      defaultImage: '/src/assets/images/couple_date_outfit_1790656818582.jpg',
      subtitle: 'Juntitos en nuestra cita más linda ✨',
      sticker: '🔥 HOT WHEELS #1',
      message:
        'Me encanta que me consientas, me cuides y me dejes sacar mi lado más tierno contigo. A tu lado puedo ser yo misma y sentirme querida de una manera muy especial. 🥺❤️',
    },
    {
      id: 3,
      title: 'Nuestras salidas en moto de noche 🛵🌙',
      emoji: '🛵',
      defaultImage: '/src/assets/images/couple_mirror_motorcycle_1790657131527.jpg',
      subtitle: 'Reflejo en el espejo retrovisor con señal de paz ✌️',
      sticker: '🏁 SPEED PILOT',
      message:
        'Cada salida, cada paseo y cada aventura a tu lado es una carrera que siempre quiero ganar contigo. ¡Gracias por cada instante inolvidable, mi amor! 🏁❤️',
    },
    {
      id: 4,
      title: 'Nuestras salidas a comer juntos 🍔💡',
      emoji: '🍔',
      defaultImage: '/src/assets/images/couple_date_outfit_1790656818582.jpg',
      subtitle: 'Sonriendo bajo las luces del centro comercial ✨',
      sticker: '⚡ SUPERCHARGED',
      message:
        'Compartir cada comida, cada risa y cada momento a tu lado hace que los días normales se vuelvan extraordinarios. ¡Me haces inmensamente feliz! 🥰',
    },
    {
      id: 5,
      title: 'Nuestras sonrisas en casa 🏡💖',
      emoji: '🏡',
      defaultImage: '/src/assets/images/cute_couple_memory_1790656329830.jpg',
      subtitle: 'Juntitos en la puerta con tu camisa a rayas 💕',
      sticker: '🏆 CAMPEÓN',
      message:
        'Tu sonrisa es mi lugar favorito en el mundo. No hay nadie con quien prefiera compartir mi vida que contigo, Marcelo. ¡Te amo con todo mi ser! 🏁❤️',
    },
  ];

  const currentMemory = photoMemories[photoIndex];
  // Determine displayed image: real photo if uploaded, otherwise fallback
  const displayedImage = realPhotos[photoIndex] || currentMemory.defaultImage;

  // Handle uploading individual photo or multiple photos
  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    sound.playSuccess();
    const updated = { ...realPhotos };
    let processed = 0;

    Array.from(files).forEach((file, index) => {
      const targetSlot = (photoIndex + index) % photoMemories.length;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updated[targetSlot] = reader.result;
        }
        processed++;
        if (processed === files.length) {
          setRealPhotos(updated);
          setUploadedSuccess(true);
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          setTimeout(() => setUploadedSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle single photo upload for currently active polaroid
  const handleSinglePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        sound.playSuccess();
        setRealPhotos((prev) => ({
          ...prev,
          [photoIndex]: reader.result as string,
        }));
        setUploadedSuccess(true);
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
        setTimeout(() => setUploadedSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#bfe3fe] via-[#dcf0ff] to-[#b3ddfc] rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-white overflow-hidden flex flex-col items-center"
        >
          {/* Top Checkered Racing Border with Hot Wheels cars */}
          <div className="absolute top-0 inset-x-0 h-4 racing-checkers opacity-85 z-10" />

          {/* Hot Wheels Orange Track Curved Line Bottom */}
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border-8 border-orange-500/25 pointer-events-none" />
          <div className="absolute -bottom-14 -right-14 w-52 h-52 rounded-full border-8 border-amber-400/20 pointer-events-none" />

          {/* Sunburst background effect */}
          <div className="absolute inset-0 sunburst-bg opacity-45 pointer-events-none" />

          {/* Floating decorative stickers & cars */}
          <div className="absolute top-6 right-3 pointer-events-none flex items-center gap-1">
            <span className="text-sm">🏎️</span>
            <span className="text-xl animate-float">🔥</span>
          </div>
          <div className="absolute top-12 left-3 pointer-events-none flex items-center gap-1">
            <span className="text-xl animate-pulse-heart">💋</span>
            <span className="text-sm">🚗</span>
          </div>

          {/* ============================================================ */}
          {/* SURPRISE 1: CARTA DE AMOR                                    */}
          {/* ============================================================ */}
          {type === 'letter' && (
            <div className="w-full flex flex-col items-center z-10 pt-2">
              <div className="relative mb-2 flex items-center justify-center">
                <div className="w-24 h-16 bg-white/95 rounded-t-xl border-2 border-sky-300 shadow-md relative overflow-hidden flex items-center justify-center">
                  <span className="text-2xl animate-bounce">💌</span>
                  <div className="absolute -top-1 w-full h-8 border-b-2 border-sky-200 rotate-12" />
                </div>
                <div className="absolute -right-9 -top-2 bg-amber-400 border-2 border-white rounded-lg px-1.5 py-0.5 shadow rotate-12 text-[10px] font-black text-amber-950 flex items-center gap-0.5">
                  ⚠️ 100% AMOR
                </div>
                <div className="absolute -left-8 -bottom-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-[9px] font-black shadow -rotate-12 flex items-center gap-0.5">
                  <span>🏁</span> HOT WHEELS
                </div>
              </div>

              {/* Scalloped Letter Paper */}
              <div className="w-full relative bg-white/95 rounded-2xl p-4 sm:p-5 shadow-lg border-2 border-dashed border-sky-400 text-slate-800">
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow rotate-[-4deg] flex items-center gap-1 border border-white">
                  <Heart className="w-3 h-3 fill-white" /> Para: {recipientName}
                </div>

                <div className="absolute top-3 right-3 text-lg rotate-12 select-none">
                  💋
                </div>

                <div className="absolute top-14 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-2 border-white rounded-full w-9 h-9 flex items-center justify-center shadow text-[10px] font-black rotate-12">
                  #1
                </div>

                {/* Letter Header */}
                <div className="mt-2 mb-3 pb-2 border-b border-sky-100 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-sky-900 font-cute flex items-center gap-1.5">
                    <span>🏎️</span> Carta para mi Piloto Favorito
                  </h3>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    Día de Hot Wheels 🔥
                  </span>
                </div>

                {/* Letter Body with Cristina's words */}
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-cute max-h-64 overflow-y-auto pr-1 space-y-2.5">
                  <p className="font-semibold text-rose-600 flex items-center gap-1">
                    <span>¡Mi Marcelo hermoso!</span>
                    <span>🏎️❤️</span>
                  </p>
                  <p>
                    ¡Feliz Día de Hot Wheels, mi amor! En este día tan especial quiero recordarte lo increíble que eres y cuánto agradezco tenerte a mi lado. Eres mi motor, mi alegría y la persona que acelera mi corazón a mil por hora. 🏎️💨
                  </p>
                  
                  {/* Highlights box with the 3 sweet notes */}
                  <div className="p-2.5 bg-sky-50/90 rounded-xl border border-sky-200 text-[11px] sm:text-xs space-y-2">
                    <p className="text-sky-950">
                      ❤️ <strong className="text-rose-600">Por la paciencia que me tienes:</strong> Gracias por tenerme tanta paciencia, incluso cuando puedo ser un poquito complicada. Me encanta saber que siempre intentas entenderme y estar conmigo. Valoro muchísimo eso de ti.
                    </p>
                    <p className="text-sky-950">
                      🥰 <strong className="text-blue-600">Por lo lindo que eres conmigo:</strong> Gracias por tratarme siempre con tanto cariño y por hacerme sentir especial con cada pequeño detalle. Me encanta la forma en que me cuidas y me demuestras lo mucho que me quieres.
                    </p>
                    <p className="text-sky-950">
                      🥺 <strong className="text-amber-600">Por tratarme como una niña:</strong> Me encanta que me consientas, me cuides y me dejes sacar mi lado más tierno contigo. A tu lado puedo ser yo misma y sentirme querida de una manera muy especial.
                    </p>
                  </div>

                  <p>
                    Gracias por ser mi compañero de ruta, mi cómplice y mi persona favorita en el mundo entero. ¡Te amo infinito, Marcelo! 🏁❤️
                  </p>
                </div>

                {/* Letter Signoff */}
                <div className="mt-3 pt-2.5 border-t border-sky-100 flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-500 font-cute">
                    Con todo mi amor: {senderName} 💕
                  </div>
                  <div className="scale-75 origin-right">
                    <HotWheelsLogo className="w-28 h-8" />
                  </div>
                </div>

                <div className="h-2 w-full racing-checkers-sm rounded-full mt-2 opacity-70" />
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SURPRISE 2: TROFEO DE CAMPEÓN                                */}
          {/* ============================================================ */}
          {type === 'trophy' && (
            <div className="w-full flex flex-col items-center z-10 pt-1">
              <div className="bg-red-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow border border-white flex items-center gap-1.5 mb-1">
                <span>🏎️</span> HOT WHEELS CHAMPIONSHIP <span>🏆</span>
              </div>

              {/* Trophy Artwork */}
              <div className="relative w-44 h-44 sm:w-50 sm:h-50 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-amber-300/50 blur-xl animate-pulse" />
                <img
                  src="/src/assets/images/golden_championship_trophy_1790656319728.jpg"
                  alt="Trofeo de Campeón"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(217,119,6,0.4)] relative z-10 animate-float"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Name Engraved Ribbon Banner */}
              <div className="relative -mt-4 z-20 mb-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 font-black text-sm sm:text-base px-6 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
                <span>🏆</span>
                <span className="tracking-widest uppercase font-cute">{recipientName}</span>
                <span>🏎️</span>
              </div>

              {/* Trophy Description Card */}
              <div className="w-full bg-white/95 rounded-2xl p-4 shadow-lg border-2 border-dashed border-amber-300 text-slate-800 text-center relative">
                <h4 className="font-cute font-extrabold text-amber-800 text-sm mb-1 flex items-center justify-center gap-1">
                  <span>🥇</span> 1er Lugar: El Mejor Novio del Mundo
                </h4>
                <p className="text-xs sm:text-sm font-cute text-slate-700 leading-relaxed">
                  Desde que llegaste a mi vida, encendiste mi motor. Cada día contigo es como acelerar hacia un destino lleno de amor, sonrisas y momentos inolvidables.
                  <br />
                  <span className="font-bold text-rose-600 mt-1 block">
                    ¡Eres el campeón indiscutible de mi corazón, Marcelo! 🏁❤️
                  </span>
                </p>

                <div className="mt-3 pt-2 border-t border-amber-100 flex items-center justify-between px-2">
                  <span className="text-[11px] text-amber-700 font-bold">Con amor de Cristina 🏆</span>
                  <div className="scale-75 origin-right">
                    <HotWheelsLogo className="w-24 h-7" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SURPRISE 3: RAMO DE HOT WHEELS                               */}
          {/* ============================================================ */}
          {type === 'bouquet' && (
            <div className="w-full flex flex-col items-center z-10 pt-1">
              <div className="scale-90 mb-1">
                <HotWheelsLogo className="w-40 h-10" />
              </div>

              {/* Bouquet Artwork */}
              <div className="relative w-44 h-44 sm:w-50 sm:h-50 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-sky-300/35 blur-xl" />
                <img
                  src="/src/assets/images/hotwheels_flower_bouquet_1790656309999.jpg"
                  alt="Ramo de Hot Wheels"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(14,165,233,0.35)] relative z-10 animate-float"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description Card */}
              <div className="w-full bg-white/95 rounded-2xl p-4 shadow-lg border-2 border-dashed border-sky-400 text-slate-800 text-center relative mt-1">
                <h4 className="font-cute font-extrabold text-sky-900 text-sm mb-1 flex items-center justify-center gap-1.5">
                  <span>💐</span> Ramo de Carritos para Marcelo <span>🏎️</span>
                </h4>
                <p className="text-xs sm:text-sm font-cute text-slate-700 leading-relaxed">
                  Las rosas comunes se marchitan con el tiempo, pero este ramo de Hot Wheels y mi amor por ti van a durar para siempre.
                </p>
                <p className="text-xs font-cute text-rose-600 font-semibold mt-1.5">
                  ¡Gracias por ser mi piloto favorito y acelerar mis latidos cada día! 💙🏎️
                </p>

                <div className="mt-3 pt-2 border-t border-sky-100 flex items-center justify-between px-2">
                  <span className="text-[11px] text-sky-700 font-bold">De Cristina para ti 🌹</span>
                  <span className="text-[11px] text-orange-500 font-bold">¡VROOOM! 🏁</span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SURPRISE 4: POLAROID MEMORIES (WITH REAL PHOTO SELECTOR!)    */}
          {/* ============================================================ */}
          {type === 'memories' && (
            <div className="w-full flex flex-col items-center z-10 pt-1">
              <div className="flex items-center justify-between w-full mb-1.5 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📷</span>
                  <h3 className="font-cute font-extrabold text-sky-950 text-xs sm:text-sm">
                    Nuestros Recuerdos & Razones
                  </h3>
                </div>

                {/* Bulk Select Real WhatsApp Photos Button */}
                <label className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-full text-[11px] font-bold shadow-md transition-all">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Subir Fotos de WhatsApp</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleFiles}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Upload Success Alert */}
              {uploadedSuccess && (
                <div className="mb-2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1 animate-bounce">
                  <Check className="w-3.5 h-3.5" /> ¡Foto real de Marcelo y Cristina cargada!
                </div>
              )}

              {/* Polaroid Frame */}
              <div className="relative bg-white p-3 pb-3 rounded-xl shadow-xl border border-slate-200 w-64 sm:w-72 transition-all">
                {/* Washi tape on top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/90 backdrop-blur-sm rotate-1 shadow-sm border border-amber-300/60" />

                {/* Stickers */}
                <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black rounded-full px-2.5 py-0.5 shadow-md rotate-12 flex items-center gap-0.5 border border-white">
                  {currentMemory.sticker}
                </div>
                <div className="absolute -bottom-2 -left-2 text-xl rotate-12">
                  💋
                </div>

                {/* Image display */}
                <div className="w-full aspect-[4/5] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative group">
                  <img
                    src={displayedImage}
                    alt={currentMemory.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />

                  {/* Quick Change Individual Photo button overlay */}
                  <label className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer backdrop-blur-xs transition-colors shadow">
                    <Upload className="w-3 h-3" />
                    <span>Cambiar esta foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSinglePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Indicator if it's the real user photo */}
                  {realPhotos[photoIndex] && (
                    <div className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> FOTO REAL
                    </div>
                  )}
                </div>

                {/* Polaroid title */}
                <div className="mt-2 text-center">
                  <h4 className="font-cute text-xs sm:text-sm font-bold text-rose-600 flex items-center justify-center gap-1">
                    <span>{currentMemory.emoji}</span> {currentMemory.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {currentMemory.subtitle}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows & Dots */}
              <div className="mt-2 flex items-center justify-between w-full max-w-[280px]">
                <button
                  onClick={() => {
                    sound.playPop();
                    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : photoMemories.length - 1));
                  }}
                  className="p-1.5 bg-white/90 hover:bg-white text-sky-800 rounded-full shadow border border-sky-200 cursor-pointer transition-colors"
                  title="Foto anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-1.5 items-center">
                  {photoMemories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sound.playPop();
                        setPhotoIndex(i);
                      }}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        i === photoIndex ? 'bg-sky-600 w-6' : 'bg-white/80 w-2.5'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    setPhotoIndex((prev) => (prev < photoMemories.length - 1 ? prev + 1 : 0));
                  }}
                  className="p-1.5 bg-white/90 hover:bg-white text-sky-800 rounded-full shadow border border-sky-200 cursor-pointer transition-colors"
                  title="Siguiente foto"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Cristina's Heartfelt Message Card */}
              <div className="w-full bg-white/95 rounded-2xl p-3 shadow-md border-2 border-dashed border-rose-300 text-slate-800 text-center mt-2">
                <p className="text-xs font-cute text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                  "{currentMemory.message}"
                </p>
                <div className="mt-1.5 text-[10px] font-bold text-rose-500 flex items-center justify-center gap-1">
                  <span>— De Cristina para Marcelo</span>
                  <Heart className="w-3 h-3 fill-rose-500" />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VOLVER BUTTON                                                */}
          {/* ============================================================ */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="mt-3 px-8 py-2 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-black text-sm tracking-wider rounded-full shadow-lg border-2 border-white flex items-center gap-2 transition-all cursor-pointer z-20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
