// Web Audio API synthesizer for retro / cute sound effects and lo-fi romantic melody

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicPlaying = false;
  private musicInterval: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute pop sound on button tap
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio might be blocked before interaction
    }
  }

  // Sweet chime for success / celebration
  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.09;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch {
      // Audio blocked
    }
  }

  // Playful boing/sad sound when saying no
  playSad() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Audio blocked
    }
  }

  // Hot Wheels engine rev sound effect (vroom vroom!)
  playEngineRev() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc2.type = 'triangle';

      // Pitch rev up then idle down
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.55);
      osc.frequency.exponentialRampToValueAtTime(120, now + 1.1);

      osc2.frequency.setValueAtTime(45, now);
      osc2.frequency.exponentialRampToValueAtTime(130, now + 0.35);
      osc2.frequency.exponentialRampToValueAtTime(160, now + 0.55);
      osc2.frequency.exponentialRampToValueAtTime(60, now + 1.1);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.45);
      filter.frequency.exponentialRampToValueAtTime(500, now + 1.1);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 1.15);
      osc2.stop(now + 1.15);
    } catch {
      // Audio blocked
    }
  }

  // Soft romantic synth melody toggle
  toggleBgm(): boolean {
    this.initCtx();
    if (this.musicPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  isBgmActive(): boolean {
    return this.musicPlaying;
  }

  private startBgm() {
    if (!this.ctx) return;
    this.musicPlaying = true;

    // Sweet cheerful melody notes (Hot Wheels Day sweet tune)
    // Melody: C4, E4, G4, A4, G4, E4, D4, C4...
    const melody = [
      { f: 261.63, d: 0.3 }, // C4
      { f: 329.63, d: 0.3 }, // E4
      { f: 392.00, d: 0.3 }, // G4
      { f: 440.00, d: 0.4 }, // A4
      { f: 392.00, d: 0.3 }, // G4
      { f: 329.63, d: 0.3 }, // E4
      { f: 293.66, d: 0.4 }, // D4
      { f: 261.63, d: 0.6 }, // C4
      { f: 329.63, d: 0.3 }, // E4
      { f: 392.00, d: 0.3 }, // G4
      { f: 523.25, d: 0.5 }, // C5
      { f: 493.88, d: 0.3 }, // B4
      { f: 440.00, d: 0.3 }, // A4
      { f: 392.00, d: 0.6 }, // G4
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.musicPlaying || !this.ctx) return;
      const note = melody[noteIndex % melody.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + note.d);

      noteIndex++;
      this.musicInterval = window.setTimeout(playNext, note.d * 1000 + 120);
    };

    playNext();
  }

  stopBgm() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      window.clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundManager();
