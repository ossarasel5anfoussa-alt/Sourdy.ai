import { useState, FC, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useSound from 'use-sound';
import { Search, Volume2, Sparkles, Zap, Bug, Radio, Download, Square } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

const SOUND_COLLECTIONS = [
  {
    category: 'Interface & UI',
    icon: Zap,
    sounds: [
      { id: 'i1', name: 'Digital Pop', url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
      { id: 'i2', name: 'Click Soft', url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
      { id: 'i3', name: 'UI Sparkle', url: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' },
      { id: 'i4', name: 'Alert Pulse', url: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3' },
      { id: 'i5', name: 'Confirm Tone', url: 'https://assets.mixkit.co/active_storage/sfx/602/602-preview.mp3' },
      { id: 'i6', name: 'Success Chime', url: 'https://assets.mixkit.co/active_storage/sfx/604/604-preview.mp3' },
      { id: 'i7', name: 'Error Buzz', url: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3' },
      { id: 'i8', name: 'Menu Open', url: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3' },
    ]
  },
  {
    category: 'Nature & Organic',
    icon: Sparkles,
    sounds: [
      { id: 'n1', name: 'Bird Chirp', url: 'https://assets.mixkit.co/active_storage/sfx/2381/2381-preview.mp3' },
      { id: 'n2', name: 'Water Drip', url: 'https://assets.mixkit.co/active_storage/sfx/2385/2385-preview.mp3' },
      { id: 'n3', name: 'Wind Howl', url: 'https://assets.mixkit.co/active_storage/sfx/2401/2401-preview.mp3' },
      { id: 'n4', name: 'Campfire', url: 'https://assets.mixkit.co/active_storage/sfx/2391/2391-preview.mp3' },
      { id: 'n5', name: 'Cricket Night', url: 'https://assets.mixkit.co/active_storage/sfx/2382/2382-preview.mp3' },
      { id: 'n6', name: 'Leaves Rustle', url: 'https://assets.mixkit.co/active_storage/sfx/2383/2383-preview.mp3' },
      { id: 'n7', name: 'Ocean Mist', url: 'https://assets.mixkit.co/active_storage/sfx/2384/2384-preview.mp3' },
      { id: 'n8', name: 'Thunder Clap', url: 'https://assets.mixkit.co/active_storage/sfx/2402/2402-preview.mp3' },
    ]
  },
  {
    category: 'Cinematic FX',
    icon: Radio,
    sounds: [
      { id: 'c1', name: 'Deep Whoosh', url: 'https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3' },
      { id: 'c2', name: 'Impact Hit', url: 'https://assets.mixkit.co/active_storage/sfx/2581/2581-preview.mp3' },
      { id: 'c3', name: 'Rise Build', url: 'https://assets.mixkit.co/active_storage/sfx/2582/2582-preview.mp3' },
      { id: 'c4', name: 'Bass Drop', url: 'https://assets.mixkit.co/active_storage/sfx/2583/2583-preview.mp3' },
      { id: 'c5', name: 'Glitch Sweep', url: 'https://assets.mixkit.co/active_storage/sfx/2584/2584-preview.mp3' },
      { id: 'c6', name: 'Tension', url: 'https://assets.mixkit.co/active_storage/sfx/2585/2585-preview.mp3' },
      { id: 'c7', name: 'Epic Slam', url: 'https://assets.mixkit.co/active_storage/sfx/2586/2586-preview.mp3' },
      { id: 'c8', name: 'Atmosphere', url: 'https://assets.mixkit.co/active_storage/sfx/2587/2587-preview.mp3' },
    ]
  },
  {
    category: 'Sci-Fi & Tech',
    icon: Zap,
    sounds: [
      { id: 's1', name: 'Laser Shot', url: 'https://assets.mixkit.co/active_storage/sfx/2590/2590-preview.mp3' },
      { id: 's2', name: 'Droid Bleep', url: 'https://assets.mixkit.co/active_storage/sfx/2591/2591-preview.mp3' },
      { id: 's3', name: 'Power Up', url: 'https://assets.mixkit.co/active_storage/sfx/2592/2592-preview.mp3' },
      { id: 's4', name: 'Scanner', url: 'https://assets.mixkit.co/active_storage/sfx/2593/2593-preview.mp3' },
      { id: 's5', name: 'Warp Drive', url: 'https://assets.mixkit.co/active_storage/sfx/2594/2594-preview.mp3' },
      { id: 's6', name: 'Shields', url: 'https://assets.mixkit.co/active_storage/sfx/2595/2595-preview.mp3' },
      { id: 's7', name: 'Teleport', url: 'https://assets.mixkit.co/active_storage/sfx/2596/2596-preview.mp3' },
      { id: 's8', name: 'Engine Hum', url: 'https://assets.mixkit.co/active_storage/sfx/2597/2597-preview.mp3' },
    ]
  }
];

interface SoundItemProps {
  name: string;
  url: string;
}

const SoundItem: FC<SoundItemProps> = ({ name, url }) => {
  const { masterVolume, isMuted, stopSignal } = useAudio();
  const { playClick, playHover } = useSoundEffects();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [play, { stop }] = useSound(url, { 
    volume: isMuted ? 0 : masterVolume,
    interrupt: true,
    onend: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false)
  });

  useEffect(() => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    }
  }, [stopSignal]);

  const handleDownload = (e: MouseEvent) => {
    e.stopPropagation();
    playClick();
    window.open(url, '_blank');
  };

  const handlePlayClick = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      play();
    }
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => playHover()}
      onClick={handlePlayClick}
      className={`flex items-center justify-between gap-3 p-3 rounded-xl glass-morphism transition-colors text-left group w-full ${isPlaying ? 'bg-white/20 border-white/40' : 'hover:bg-white/10'}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-white text-black' : 'bg-white/5 group-hover:bg-white group-hover:text-black'}`}>
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Volume2 size={14} />
            </motion.div>
          ) : (
            <Volume2 size={14} />
          )}
        </div>
        <span className={`text-xs font-mono tracking-tight transition-opacity ${isPlaying ? 'opacity-100 font-bold' : 'opacity-70 group-hover:opacity-100'} truncate`}>{name}</span>
      </div>

      <div className="flex items-center gap-1">
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        )}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDownload}
          className="p-1.5 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          title="Download"
        >
          <Download size={12} />
        </motion.div>
      </div>
    </motion.button>
  );
};

export function SoundLibrary() {
  const [search, setSearch] = useState('');
  
  const filteredCollections = SOUND_COLLECTIONS.map(col => ({
    ...col,
    sounds: col.sounds.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  })).filter(col => col.sounds.length > 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif italic">Sound FX Library</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mt-1">
            Browse through 24+ high-fidelity samples
          </p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} />
          <input 
            type="text" 
            placeholder="Search sounds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white/5 rounded-full border border-white/10 outline-none focus:border-white/30 transition-all font-sans text-sm w-full md:w-64"
          />
        </div>
      </div>

      <div className="space-y-12">
        {filteredCollections.map((col) => (
          <div key={col.category} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <col.icon size={18} className="opacity-60" />
              </div>
              <h3 className="font-serif italic text-xl">{col.category}</h3>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {col.sounds.map((sound) => (
                <SoundItem key={sound.id} name={sound.name} url={sound.url} />
              ))}
            </div>
          </div>
        ))}
        
        {filteredCollections.length === 0 && (
          <div className="py-20 text-center opacity-30 space-y-4">
            <Bug size={48} className="mx-auto" />
            <p className="font-mono text-sm">No sonic frequencies matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
