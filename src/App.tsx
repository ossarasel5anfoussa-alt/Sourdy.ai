import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioProvider } from './context/AudioContext';
import { SoundscapeCard } from './components/SoundscapeCard';
import { SynthPad } from './components/SynthPad';
import { SoundLibrary } from './components/SoundLibrary';
import { DiscoveryHub } from './components/DiscoveryHub';
import { VolumeController } from './components/VolumeController';
import { useSoundEffects } from './hooks/useSoundEffects';
import { Music, Zap, Waves, Sparkles, Headphones, Info, Radio } from 'lucide-react';

const SOUNDSCAPES = [
  { id: '1', name: 'Thunderstorm Rain', icon: 'rain' as const, url: 'https://assets.mixkit.co/active_storage/sfx/2400/2400-preview.mp3' }, 
  { id: '2', name: 'Pacific Waves', icon: 'space' as const, url: 'https://assets.mixkit.co/active_storage/sfx/1120/1120-preview.mp3' },
  { id: '3', name: 'Morning Forest', icon: 'forest' as const, url: 'https://assets.mixkit.co/active_storage/sfx/1230/1230-preview.mp3' },
  { id: '4', name: 'Celestial Void', icon: 'ethereal' as const, url: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3' },
  { id: '5', name: 'Cafe Ambience', icon: 'space' as const, url: 'https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3' },
  { id: '6', name: 'Suburban Night', icon: 'ethereal' as const, url: 'https://assets.mixkit.co/active_storage/sfx/2380/2380-preview.mp3' },
];

function MainContent() {
  const { playClick, playHover } = useSoundEffects();
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-black">
        <div className="atmosphere" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism p-12 rounded-[3.5rem] max-w-lg w-full text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          <div className="space-y-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mx-auto"
            >
              <Headphones size={40} />
            </motion.div>
            <h1 className="text-5xl font-serif italic tracking-tight">Sonic Symphony</h1>
            <p className="text-white/60 font-sans leading-relaxed">
              Experience a world of sound. Best enjoyed with headphones in a quiet space.
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              setHasEntered(true);
            }}
            onMouseEnter={() => playHover()}
            className="w-full py-4 bg-white text-black rounded-2xl font-mono text-sm uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Enter the Playground
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg:p-12 pb-32">
      <div className="atmosphere" />
      
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-24">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 opacity-40">
              <span className="w-8 h-[1px] bg-white" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Acoustic Experience v1.2</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-serif italic leading-none">The Sonic <br/>Playground</h1>
          </div>
          
          <div className="lg:max-w-xs text-sm text-white/40 font-sans leading-relaxed border-l border-white/10 pl-6">
            An interactive exploration of spatial audio and haptic sound design. Interact with any element to trigger high-fidelity sonic responses.
          </div>
        </header>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Soundscapes & Library */}
          <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24">
            {/* Ambient Layers */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Waves size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium tracking-tight">Ambient Layers</h2>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Background Soundscapes</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {SOUNDSCAPES.map((s) => (
                  <SoundscapeCard 
                    key={s.id} 
                    id={s.id}
                    name={s.name}
                    url={s.url}
                    icon={s.icon}
                  />
                ))}
              </div>
            </section>

            {/* Mass Sound FX Library */}
            <section>
              <SoundLibrary />
            </section>
          </div>

          {/* Right Column: Interactive Sides */}
          <div className="lg:col-span-4 sticky top-12 space-y-8">
             <SynthPad />
             
             <div className="glass-morphism rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Info size={18} className="text-blue-400" />
                  <span className="text-sm font-medium">Sonic Facts</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  The loudest natural sound on Earth is the roar of a blue whale, which can reach 188 decibels—louder than a jet engine!
                </p>
             </div>

             <div className="glass-morphism rounded-3xl p-6 space-y-4 border-amber-500/20">
                <div className="flex items-center gap-3">
                  <Radio size={18} className="text-amber-400" />
                  <span className="text-sm font-medium">Live Feed</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['20%', '90%', '40%', '60%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="h-full bg-amber-400/50" 
                  />
                </div>
                <p className="text-[9px] font-mono opacity-30 uppercase tracking-[0.2em]">Signal detection active</p>
             </div>
          </div>
        </div>

        {/* Global Hub */}
        <section>
           <DiscoveryHub />
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center">
            <p className="font-mono text-[10px] tracking-[0.5em] opacity-20 uppercase">End of Sonic Transmission</p>
        </footer>
      </div>

      <VolumeController />
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  );
}

