import { useState, createContext, ReactNode, useEffect } from 'react'

import { Audio, AVPlaybackStatus } from 'expo-av';

import { MusicParams } from '../@types/navigation';

type MusicContextProps = {
  children: ReactNode
}

type MusicContextType = {
  soundObj: AVPlaybackStatus, 
  playBackObj: Audio.Sound,
  currentSound: MusicParams,
  musicModal: boolean,
  updateValuesState: (status: AVPlaybackStatus, play: Audio.Sound, music: MusicParams) => void,
  setStatus: (status: AVPlaybackStatus) => void ,
  setMusicModal: (value: boolean) => void,
}

const initialValue = {
  soundObj: {}, 
  playBackObj: new Audio.Sound(),
  currentSound: {},
  musicModal: false,
  updateValuesState: () => {},
  setStatus: () => {},
  setMusicModal: () => {},
} 


export const MusicContext = createContext<MusicContextType>(initialValue);

export const MusicContextProvider = ({ children }: MusicContextProps) => {
  const [ soundObj, setSoundObj ] = useState<AVPlaybackStatus>(initialValue.soundObj);
  const [ playBackObj, setPlayBackObj ] = useState<Audio.Sound>(initialValue.playBackObj);
  const [ currentSound, setCurrentSound ] = useState<MusicParams>(initialValue.currentSound);
  const [ musicModal, setMusicOpen ] = useState<boolean>(initialValue.musicModal);

  const setMusicModal = (value: boolean) => {
    setMusicOpen(value)
  }

  const updateValuesState = (status: AVPlaybackStatus, play: Audio.Sound, music: MusicParams) => {
    setCurrentSound(music);
    setPlayBackObj(play); 
    setSoundObj(status);
  }

  const setStatus = (status: AVPlaybackStatus) => {
    setSoundObj(status)
  }

  return (
      <MusicContext.Provider
        value={{ 
            soundObj,
            playBackObj,
            currentSound,
            musicModal,
            setStatus,
            updateValuesState,
            setMusicModal,
        }}
      >
          {children}
      </MusicContext.Provider>
  );
}