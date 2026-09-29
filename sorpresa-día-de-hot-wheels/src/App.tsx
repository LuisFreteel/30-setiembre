import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { HotWheelsLogo } from './components/HotWheelsLogo.tsx';
import { CuteBear, BearMood } from './components/CuteBear.tsx';
import { SurpriseModal, SurpriseType } from './components/SurpriseModal.tsx';
import { RacingCar } from './components/RacingCar.tsx';
import { HotWheelsCarTrack } from './components/HotWheelsCarTrack.tsx';
import { sound } from './utils/audio.ts';
import {
  Volume2,
  VolumeX,
  Heart,
  RotateCcw,
  Flame,
} from 'lucide-react';

export default function App() {
  // Fixed Names for Marcelo and Cristina
  const recipientName = 'Marcelo';
  const senderName = 'Cristina';

  // Flow State
  // 0: Initial question ("Te tengo una sorpresa, mi amor. ¿Quieres verla?")
  // 1: First rejection ("Por favor, amor...") -> Bear looks SAD / CRYING
  // 2: Second rejection ("¡Ya basta!...") -> Bear looks POUTING / GRUMPY
  // 3: Accepted! (Shows the 4 Hot Wheels surprises) -> Bear CELEBRATING
  const [step, setStep] = useState<number>(0);
  const [bearMood, setBearMood] = useState<BearMood>('asking');

  // Modal & Music
  const [activeSurprise, setActiveSurprise] = useState<SurpriseType>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Evasive "No" button animation offset on hover/touch
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });

  // Update bear mood dynamically when step changes
  useEffect(() => {
    if (step === 0) setBearMood('asking');
    else if (step === 1) setBearMood('pleading');
    else if (step === 2) setBearMood('grumpy');
    else if (step === 3) setBearMood('celebrating');
  }, [step]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    sound.playSuccess();
    const count = 220;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff0033', '#ffd700', '#0ea5e9', '#ec4899', '#ffffff', '#ff6600'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleAccept = () => {
    sound.playPop();
    setStep(3);
    triggerConfetti();
  };

  const handleReject = () => {
    sound.playSad();
    if (step === 0) {
      setStep(1); // Switches to SAD CRYING BEAR
    } else if (step === 1) {
      setStep(2); // Switches to ANGRY POUTING BEAR
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setStep(0); // Resets to HAPPY BEAR EATING CARROT
    setNoButtonOffset({ x: 0, y: 0 });
  };

  const toggleMusic = () => {
    sound.playPop();
    const active = sound.toggleBgm();
    setIsPlayingMusic(active);
  };

  // Evasive button playful behavior on first screen
  const dodgeNoButton = () => {
    if (step === 0) {
      const randomX = (Math.random() - 0.5) * 80;
      const randomY = (Math.random() - 0.5) * 40;
      setNoButtonOffset({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="min-h-screen bg-[#cfe5f8] flex flex-col items-center justify-between relative overflow-x-hidden selection:bg-rose-300 font-cute">
      {/* Decorative Background Hot Wheels Elements */}
      {/* Left Orange Stunt Loop Curve */}
      <div className="fixed -left-16 top-24 w-36 h-72 rounded-r-full border-[10px] border-orange-500/25 pointer-events-none -rotate-12 hidden sm:block" />
      <div className="fixed -left-20 top-20 w-44 h-80 rounded-r-full border-[6px] border-amber-400/20 pointer-events-none -rotate-12 hidden sm:block" />

      {/* Right Orange Stunt Loop Curve */}
      <div className="fixed -right-16 bottom-24 w-36 h-72 rounded-l-full border-[10px] border-orange-500/25 pointer-events-none rotate-12 hidden sm:block" />
      <div className="fixed -right-20 bottom-20 w-44 h-80 rounded-l-full border-[6px] border-amber-400/20 pointer-events-none rotate-12 hidden sm:block" />

      {/* Speedometer & Road Sign floating stickers */}
      <div className="fixed top-16 left-6 pointer-events-none opacity-60 hidden md:block animate-float">
        <div className="bg-amber-400 border-2 border-white rounded-lg p-1.5 shadow-md text-xs font-black text-amber-950 rotate-[-12deg] flex items-center gap-1">
          <span>⚠️</span> 100 KM/H
        </div>
      </div>
      <div className="fixed top-28 right-8 pointer-events-none opacity-60 hidden md:block animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-red-600 border-2 border-white rounded-full p-2 shadow-md text-xs font-black text-white rotate-[15deg] flex items-center gap-1">
          <span>🏎️</span> VROOOM!
        </div>
      </div>

      {/* Top Floating Music Control */}
      <div className="w-full max-w-md px-4 pt-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-xs rounded-full text-xs font-extrabold text-red-600 shadow-xs border border-red-200">
          <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
          <span>Edición Especial Día de Hot Wheels</span>
        </div>

        {/* Music Toggle */}
        <button
          onClick={toggleMusic}
          className={`p-1.5 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
            isPlayingMusic
              ? 'bg-rose-500 text-white border-rose-300 shadow-md animate-pulse'
              : 'bg-white/80 text-slate-700 border-sky-200 hover:bg-white'
          }`}
          title={isPlayingMusic ? 'Pausar música' : 'Activar música romántica'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Container Phone Frame / Centered App */}
      <main className="w-full max-w-md px-4 py-2 flex flex-col items-center z-10">
        {/* Checkered Racing Border Top with Flame Accents */}
        <div className="w-full relative mb-2">
          <div className="w-full h-3.5 racing-checkers rounded-full shadow-inner opacity-85" />
          <div className="absolute -left-1 -top-1 text-xs">🔥</div>
          <div className="absolute -right-1 -top-1 text-xs">🔥</div>
        </div>

        {/* Hot Wheels Header with Logo and Names */}
        <header className="w-full flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 text-xs font-cute font-bold text-slate-700">
            {/* Left: Para: Marcelo */}
            <div className="flex flex-col items-start bg-white/85 backdrop-blur-xs px-3 py-1 rounded-xl border border-sky-300 shadow-sm">
              <span className="text-[10px] uppercase text-sky-600 font-black tracking-wider flex items-center gap-1">
                <span>🏎️</span> Para
              </span>
              <span className="text-sm font-extrabold text-slate-900">{recipientName}</span>
            </div>

            {/* Center Heart Badge */}
            <div className="flex items-center justify-center p-1.5 bg-rose-50 rounded-full border border-rose-200 shadow-sm animate-pulse-heart">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>

            {/* Right: Con amor de: Cristina */}
            <div className="flex flex-col items-end bg-white/85 backdrop-blur-xs px-3 py-1 rounded-xl border border-rose-300 shadow-sm">
              <span className="text-[10px] uppercase text-rose-500 font-black tracking-wider flex items-center gap-1">
                Con amor de <span>💕</span>
              </span>
              <span className="text-sm font-extrabold text-slate-900">{senderName}</span>
            </div>
          </div>

          {/* Hot Wheels Iconic Flame Logo */}
          <div className="mt-1 transform hover:scale-105 transition-transform duration-300">
            <HotWheelsLogo className="w-56 h-18 sm:w-64 sm:h-20" />
          </div>
        </header>

        {/* Cute Animated Bear with dynamic mood transitions */}
        <div className="my-1">
          <CuteBear mood={bearMood} className="w-40 h-40 sm:w-44 sm:h-44" />
        </div>

        {/* ============================================================ */}
        {/* RETRO DIALOGUE WINDOW MODAL CARD                             */}
        {/* ============================================================ */}
        <div className="w-full bg-white/95 rounded-2xl p-4 sm:p-5 shadow-xl border-2 border-sky-300 text-slate-800 relative transition-all">
          {/* Retro Window Title Bar with Hot Wheels flame */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-sky-100">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-pixel text-sky-600 tracking-widest uppercase flex items-center gap-1 font-bold">
              <span>🏎️</span> CRISTINA & MARCELO.EXE <span>❤️</span>
            </span>
            <span className="text-xs">✨</span>
          </div>

          {/* Window Body Dialogue */}
          <div className="text-center min-h-[56px] flex items-center justify-center">
            {step === 0 && (
              <p className="font-cute font-bold text-slate-800 text-base sm:text-lg leading-snug">
                Te tengo una sorpresa, mi amor.
                <br />
                <span className="text-sky-600">¿Quieres verla?</span>
              </p>
            )}

            {step === 1 && (
              <p className="font-cute font-medium text-slate-700 text-sm sm:text-base leading-relaxed">
                Por favor, amor. Hice esto solo para ti, y me harías la persona más feliz si lo ves. 🥺💕
              </p>
            )}

            {step === 2 && (
              <p className="font-cute font-semibold text-rose-700 text-sm sm:text-base leading-relaxed">
                ¡Ya basta! No te daré más oportunidades. Tendrás que intentarlo otra vez desde el inicio 😤
              </p>
            )}

            {step === 3 && (
              <div className="text-center space-y-1">
                <h2 className="font-cute font-black text-rose-600 text-base sm:text-lg flex items-center justify-center gap-1">
                  <span>🏁</span> ¡Feliz Día de Hot Wheels, mi amor! <span>❤️</span>
                </h2>
                <p className="font-cute text-xs sm:text-sm text-slate-700 leading-snug">
                  Eres mi alegría, mi motor y mi razón de sonreír.
                  <br />
                  Gracias por ser parte de mi vida. <span className="font-bold text-sky-600">¡Te amo infinito, Marcelo!</span>
                </p>
              </div>
            )}
          </div>

          {/* Window Action Buttons (Steps 0, 1, 2) */}
          {step !== 3 && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {step === 0 && (
                <>
                  {/* ¡Claro que sí! Button with Hot Wheels Flame Gradient */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-cute font-bold text-sm rounded-xl shadow-md border-2 border-white flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>¡Claro que sí!</span>
                    <span>💘</span>
                  </motion.button>

                  {/* No, gracias Button (triggers sad crying bear!) */}
                  <motion.button
                    animate={{ x: noButtonOffset.x, y: noButtonOffset.y }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    onMouseEnter={dodgeNoButton}
                    onClick={handleReject}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-cute font-medium text-xs sm:text-sm rounded-xl border border-slate-300 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>No, gracias</span>
                    <span>😿</span>
                  </motion.button>
                </>
              )}

              {step === 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-cute font-bold text-sm rounded-xl shadow-md border-2 border-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>está bien, la veré!</span>
                    <span>🥹</span>
                  </motion.button>

                  {/* sigo sin querer (triggers grumpy bear!) */}
                  <button
                    onClick={handleReject}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-rose-50 text-rose-600 font-cute text-xs rounded-xl border border-rose-200 cursor-pointer transition-colors"
                  >
                    sigo sin querer 💔
                  </button>
                </>
              )}

              {step === 2 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-cute font-bold text-sm rounded-xl shadow-md border-2 border-white flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ok, lo intentaré otra vez</span>
                  <span>🥺</span>
                </motion.button>
              )}
            </div>
          )}
        </div>

        {/* Hot Wheels Car Collection Banner & Interactive Cars Track */}
        <div className="w-full mt-2">
          <HotWheelsCarTrack />
        </div>

        {/* ============================================================ */}
        {/* SURPRISE GRID (Appears when step === 3!)                     */}
        {/* ============================================================ */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full mt-3 flex flex-col items-center"
          >
            {/* 4 Interactive Surprise Cards Grid with Hot Wheels Badges */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Surprise 1: Carta de Amor */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.playPop();
                  setActiveSurprise('letter');
                }}
                className="bg-white/95 hover:bg-white rounded-2xl p-3 shadow-md border-2 border-sky-300 flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💌
                </div>
                <div className="text-center">
                  <span className="font-cute font-bold text-xs sm:text-sm text-slate-800 block">
                    Carta de Amor
                  </span>
                  <span className="text-[10px] text-sky-600 font-medium">
                    (Abrir carta 💋)
                  </span>
                </div>
                <div className="absolute top-1 right-2 text-rose-500 text-xs">❤️</div>
              </motion.button>

              {/* Surprise 2: Trofeo al Campeón */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.playPop();
                  setActiveSurprise('trophy');
                }}
                className="bg-white/95 hover:bg-white rounded-2xl p-3 shadow-md border-2 border-amber-300 flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <div className="text-center">
                  <span className="font-cute font-bold text-xs sm:text-sm text-slate-800 block">
                    Trofeo Campeón
                  </span>
                  <span className="text-[10px] text-amber-600 font-medium">
                    (#1 Mejor Novio)
                  </span>
                </div>
                <div className="absolute top-1 right-2 text-amber-500 text-xs">✨</div>
              </motion.button>

              {/* Surprise 3: Ramo de Hot Wheels */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.playPop();
                  setActiveSurprise('bouquet');
                }}
                className="bg-white/95 hover:bg-white rounded-2xl p-3 shadow-md border-2 border-blue-300 flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💐
                </div>
                <div className="text-center">
                  <span className="font-cute font-bold text-xs sm:text-sm text-slate-800 block">
                    Ramo Hot Wheels
                  </span>
                  <span className="text-[10px] text-blue-600 font-medium">
                    (Rosas & Carritos)
                  </span>
                </div>
                <div className="absolute top-1 right-2 text-blue-500 text-xs">🏎️</div>
              </motion.button>

              {/* Surprise 4: Polaroid Memories & Cristina's Messages */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.playPop();
                  setActiveSurprise('memories');
                }}
                className="bg-white/95 hover:bg-white rounded-2xl p-3 shadow-md border-2 border-rose-300 flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📷
                </div>
                <div className="text-center">
                  <span className="font-cute font-bold text-xs sm:text-sm text-slate-800 block">
                    Nuestras Fotos
                  </span>
                  <span className="text-[10px] text-rose-600 font-medium">
                    (Tus 4 recuerdos ❤️)
                  </span>
                </div>
                <div className="absolute top-1 right-2 text-rose-500 text-xs">📸</div>
              </motion.button>
            </div>

            {/* Helper text as in video */}
            <p className="mt-2 text-[11px] sm:text-xs text-sky-900/80 font-cute font-semibold text-center flex items-center justify-center gap-1">
              <span>🏎️</span> (presiona las cosas para descubrir las sorpresas) <span>🏁</span>
            </p>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* BOTTOM RACING CAR WITH SPEED TRACK                           */}
        {/* ============================================================ */}
        <div className="w-full mt-2">
          <RacingCar />
        </div>

        {/* Footer */}
        <footer className="w-full mt-2 pt-2 flex items-center justify-between text-[11px] text-slate-600 font-cute border-t border-sky-300/60">
          <span className="flex items-center gap-1 font-bold">
            <span>Para Marcelo con amor de Cristina</span>
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
          </span>
          {step === 3 && (
            <button
              onClick={handleRestart}
              className="text-sky-700 hover:text-sky-900 underline font-semibold transition-colors cursor-pointer"
            >
              Reiniciar
            </button>
          )}
          <span className="font-bold text-red-600 flex items-center gap-1">
            <span>🏎️</span> Día de Hot Wheels
          </span>
        </footer>
      </main>

      {/* Surprise Popups Modal */}
      <SurpriseModal
        type={activeSurprise}
        recipientName={recipientName}
        senderName={senderName}
        onClose={() => setActiveSurprise(null)}
      />
    </div>
  );
}
