import React, { useContext } from 'react';

import { MusicContext } from '../contexts/MusicContextProvider';

import { MusicParams } from '../@types/music';

import { pause, play, resume } from '../service/misc/audioController';

import { api, BASE_API } from '../service/api';
import { AVPlaybackStatus } from 'expo-av';
import { UserContext } from '../contexts/UserContextProvider';
import { schedulePushNotification } from '../service/Notification/schedulePushNotification';


export default () => {
    const { user } = useContext(UserContext);
    const { soundObj, playBackObj, currentSound, setStatus, updateValuesState } = useContext(MusicContext);

    const _onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus, music: MusicParams) => {
        if (playbackStatus.isLoaded) {
            if (playbackStatus.isPlaying) {
                setStatus(playbackStatus)
            } else {
                setStatus(playbackStatus)
            }
            if (playbackStatus.didJustFinish) {
                if(user.logged){api.historicSave({ musicId: music.id, userId: user.id })}
            }
        }
    };

    
    const PlayMusic = async ( music : MusicParams  ) => {
        let uri = `${BASE_API}/music/${music.uri}`;
        
        // Music Replay
        if(!soundObj || currentSound.id !== music.id) {
            playBackObj.unloadAsync();
            const status = await play(playBackObj, uri);
            schedulePushNotification(music, 2)
            
            updateValuesState(
                status,
                playBackObj,
                music
            );
            return playBackObj.setOnPlaybackStatusUpdate((playbackStatus)=>_onPlaybackStatusUpdate(playbackStatus, music));
        }
        
        // Music Replay
        if(soundObj.isLoaded && currentSound.id === music.id && soundObj.durationMillis === soundObj.positionMillis) {
            playBackObj.unloadAsync();

            const status = await play(playBackObj, uri);

            return updateValuesState(
                status,
                playBackObj,
                music
            );
        }
        
        // Music Play
        if(soundObj.isLoaded && soundObj.isPlaying){
            const status = await pause(playBackObj)
            return setStatus(status)
        }

        // Music Resume
        if(soundObj.isLoaded && !soundObj.isPlaying && currentSound.id === music.id){
            const status = await resume(playBackObj);
            return setStatus(status)
        }
    }

  return PlayMusic;
}