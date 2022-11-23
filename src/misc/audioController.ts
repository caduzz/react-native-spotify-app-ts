import { Audio, AVPlaybackStatus, AVPlaybackStatusError } from "expo-av";

// play audio
export const play = async (playBackObj: Audio.Sound, uri: string) : Promise<AVPlaybackStatus> => {
    try {
        return await playBackObj.loadAsync( { uri }, { shouldPlay: true });
    } catch ({message}){
        const err: AVPlaybackStatusError = {
            isLoaded: false,
            androidImplementation: 'erro ao iniciar a musica',
            error: String(message)
        }
        return err;
    }
}

// pause audio
export const pause = async (playBackObj: Audio.Sound) : Promise<AVPlaybackStatus> => {
    try {
        return await playBackObj.pauseAsync();
    } catch ({message}){
        const err: AVPlaybackStatusError = {
            isLoaded: false,
            androidImplementation: 'erro ao pausar na musica',
            error: String(message)
        }
        return err;
    }
}

// resume audio
export const resume = async (playBackObj: Audio.Sound) : Promise<AVPlaybackStatus> => {
    try {
        return await playBackObj.playAsync();
    } catch ({message}){
        const err: AVPlaybackStatusError = {
            isLoaded: false,
            androidImplementation: 'erro ao dar play na musica',
            error: String(message)
        }
        return err;
    }
}