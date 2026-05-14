import { motion } from 'motion/react';
import { Volume2, VolumeX, Settings2, Square } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

export function VolumeController() {
  const { masterVolume, setMasterVolume, isMuted, setIsMuted, triggerStopAll } = useAudio();
  const { playClick, playHover } = useSoundEffects();

  const handleMuteToggle = () => {
    playClick();
    setIsMuted(!isMuted);
  };

  const handleStopAll = () => {
    playClick();
    triggerStopAll();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
      <motion.div 
        className="glass-morphism rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center gap-4 border-r border-white/10 pr-4">
          <button 
            onClick={handleMuteToggle}
            onMouseEnter={() => playHover()}
            className="hover:scale-110 transition-transform cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} className="text-rose-500" /> : <Volume2 size={18} />}
          </button>

          <button 
            onClick={handleStopAll}
            onMouseEnter={() => playHover()}
            className="hover:scale-110 transition-transform cursor-pointer opacity-60 hover:opacity-100"
            title="Stop All All Signals"
          >
            <Square size={14} fill="currentColor" />
          </button>
        </div>
        
        <div className="relative flex items-center w-32 group">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVolume}
            onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            onMouseEnter={() => playHover()}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white transition-all group-hover:h-2"
          />
        </div>

        <button 
          onMouseEnter={() => playHover()}
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          <Settings2 size={16} />
        </button>
      </motion.div>
    </div>
  );
}
