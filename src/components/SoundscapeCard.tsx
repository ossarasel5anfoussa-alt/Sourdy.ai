import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, CloudRain, Trees, Wind, Ghost, Download, Square } from 'lucide-react';
import useSound from 'use-sound';
import { useState, useEffect, MouseEvent } from 'react';
import { useAudio } from '../context/AudioContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface SoundscapeProps {
  id: string;
  name: string;
  url: string;
  icon: 'rain' | 'forest' | 'space' | 'ethereal';
  key?: string | number;
}

const iconMap = {
  rain: CloudRain,
  forest: Trees,
  space: Wind,
  ethereal: Ghost,
};

export function SoundscapeCard({ name, url, icon }: SoundscapeProps) {
  const { masterVolume, isMuted, stopSignal } = useAudio();
  const { playClick, playHover } = useSoundEffects();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [play, { stop, sound }] = useSound(url, {
    volume: isMuted ? 0 : masterVolume * 0.6,
    loop: true,
    interrupt: true,
  });

  useEffect(() => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    }
  }, [stopSignal]);

  useEffect(() => {
    if (sound) {
      sound.volume(isMuted ? 0 : masterVolume * 0.6);
    }
  }, [masterVolume, isMuted, sound]);

  const togglePlay = () => {
    playClick();
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = (e: MouseEvent) => {
    e.stopPropagation();
    playClick();
    window.open(url, '_blank');
  };

  const Icon = iconMap[icon];

  return (
    <motion.div
      layout
      onMouseEnter={() => playHover()}
      className="glass-morphism rounded-3xl p-6 flex flex-col items-center gap-4 relative overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={togglePlay}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDownload}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-full z-20 opacity-0 group-hover:opacity-100 transition-all"
        title="Download Sound"
      >
        <Download size={16} />
      </motion.button>

      <div className={`p-4 rounded-full ${isPlaying ? 'bg-white text-black' : 'bg-white/10 text-white'} transition-colors relative`}>
        <Icon size={32} className={`${isPlaying ? 'opacity-20' : 'opacity-100'}`} />
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Square size={20} fill="currentColor" />
          </div>
        )}
      </div>
      
      <div className="text-center z-10">
        <h3 className="font-serif italic text-xl">{name}</h3>
        <p className="text-xs font-mono uppercase tracking-widest opacity-50 mt-1">
          {isPlaying ? 'Now Playing' : 'Click to Immere'}
        </p>
      </div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex gap-1 h-4 items-end"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 16, 8, 14, 6] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5 + Math.random(),
                  ease: "easeInOut"
                }}
                className="w-1 bg-white rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
