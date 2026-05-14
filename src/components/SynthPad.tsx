import { FC } from 'react';
import { motion } from 'motion/react';
import useSound from 'use-sound';
import { useAudio } from '../context/AudioContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

const PAD_DATA = [
  { id: '1', color: 'bg-indigo-500', url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', label: 'HIT' },
  { id: '2', color: 'bg-purple-500', url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', label: 'CLICK' },
  { id: '3', color: 'bg-pink-500', url: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', label: 'GLOW' },
  { id: '4', color: 'bg-blue-500', url: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3', label: 'PULSE' },
  { id: '5', color: 'bg-cyan-500', url: 'https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3', label: 'SPARK' },
  { id: '6', color: 'bg-emerald-500', url: 'https://assets.mixkit.co/active_storage/sfx/602/602-preview.mp3', label: 'BASS' },
  { id: '7', color: 'bg-orange-500', url: 'https://assets.mixkit.co/active_storage/sfx/605/605-preview.mp3', label: 'ECHO' },
  { id: '8', color: 'bg-rose-500', url: 'https://assets.mixkit.co/active_storage/sfx/610/610-preview.mp3', label: 'FLARE' },
];

const Pad: FC<{ item: typeof PAD_DATA[0] }> = ({ item }) => {
  const { masterVolume, isMuted } = useAudio();
  const [play] = useSound(item.url, { volume: isMuted ? 0 : masterVolume });

  return (
    <motion.button
      whileTap={{ scale: 0.9, rotate: -2 }}
      whileHover={{ y: -4, filter: 'brightness(1.2)' }}
      onClick={() => play()}
      className={`aspect-square rounded-2xl ${item.color} shadow-lg shadow-black/20 flex flex-col items-center justify-center p-2 relative group overflow-hidden border border-white/20`}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
      <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-white/80">{item.label}</span>
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/40" />
    </motion.button>
  );
};

export function SynthPad() {
  const { playClick } = useSoundEffects();

  return (
    <div className="glass-morphism rounded-3xl p-8 max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif italic text-2xl">Visual Synth</h2>
        <span className="font-mono text-[10px] px-2 py-1 bg-white/10 rounded uppercase tracking-tighter opacity-50">Experimental</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {PAD_DATA.map((pad) => (
          <Pad key={pad.id} item={pad} />
        ))}
      </div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-center mt-6 opacity-30">
        Tap keys to trigger sonic impulses
      </p>
    </div>
  );
}
