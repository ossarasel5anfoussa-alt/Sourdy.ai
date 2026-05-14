import { useState, createContext, useContext, ReactNode } from 'react';

interface AudioContextType {
  masterVolume: number;
  setMasterVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  stopSignal: number;
  triggerStopAll: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [masterVolume, setMasterVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [stopSignal, setStopSignal] = useState(0);

  const triggerStopAll = () => setStopSignal(prev => prev + 1);

  return (
    <AudioContext.Provider value={{ masterVolume, setMasterVolume, isMuted, setIsMuted, stopSignal, triggerStopAll }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
