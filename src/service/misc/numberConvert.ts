import { AVPlaybackStatus } from "expo-av";

//Transforma os segundo em milisegundos
export const convertTimer = (soundObj: AVPlaybackStatus) => {
    if(soundObj.isLoaded){
        const res = (Number(soundObj.positionMillis) / Number(soundObj.durationMillis)) * 100
        return res
    }
    return 0
}

//Transforma os segundo em milisegundos
export const converterMsEmSec = (ms: number) => {
    let seconds = Math.floor(ms/1000);

    let campoMinuto = Math.floor(seconds / 60);
    let campoSegundos = Math.floor(seconds % 60);
    
    return `${campoMinuto}:${String(campoSegundos).padStart(2, '0')}`;
}