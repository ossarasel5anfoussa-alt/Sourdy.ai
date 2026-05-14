import useSound from 'use-sound';
import { useAudio } from '../context/AudioContext';

export function useSoundEffects() {
  const { masterVolume, isMuted } = useAudio();
  const volume = isMuted ? 0 : masterVolume;

  const [playClick] = useSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', { volume: volume * 0.5 });
  const [playHover] = useSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', { volume: volume * 0.2 });
  const [playSuccess] = useSound('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', { volume: volume * 0.4 });
  const [playError] = useSound('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3', { volume: volume * 0.3 });
  
  return {
    playClick,
    playHover,
    playSuccess,
    playError
  };
}
