import { useState, createContext, ReactNode, useEffect } from 'react'

import { Audio, AVPlaybackStatus } from 'expo-av';

import { MusicParams } from '../@types/navigation';
import { Sound } from 'expo-av/build/Audio';

type MusicContextProps = {
  children: ReactNode
}

type MusicContextType = {
  soundObj: AVPlaybackStatus, 
  playBackObj: Sound,
  currentSound: MusicParams,
  musicModal: boolean,
  setMusicModal: (value: boolean) => void, 
  updateValuesState: (status: AVPlaybackStatus, play: Audio.Sound, music: MusicParams) => void,
  setStatus: (status: AVPlaybackStatus) => void,
}

const initialValue = {
  soundObj: {isLoaded: false}, 
  playBackObj: new Audio.Sound(),
  currentSound: {author: {id:'', name: ''}, color: '', cover: '', duration: 0, id: '', title: '', uri: '', published: false, date: new Date()},
  musicModal: false,
  setMusicModal: () => {}, 
  updateValuesState: () => {},
  setStatus: () => {}
} as MusicContextType


export const MusicContext = createContext<MusicContextType>(initialValue);

export const MusicContextProvider = ({ children }: MusicContextProps) => {
  const [ soundObj, setSoundObj ] = useState<AVPlaybackStatus>(initialValue.soundObj);
  const [ playBackObj, setPlayBackObj ] = useState<Audio.Sound>(initialValue.playBackObj);
  const [ currentSound, setCurrentSound ] = useState<MusicParams>(initialValue.currentSound);
  const [musicModal, openMusicModal] = useState(initialValue.musicModal)

  const setMusicModal = (value: boolean) => {
    openMusicModal(value)
  }

  const updateValuesState = (status: AVPlaybackStatus, play: Sound, music: MusicParams) => {
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
          setMusicModal,
          setStatus,
          updateValuesState,
        }}
      >
          {children}
      </MusicContext.Provider>
  ); 
}