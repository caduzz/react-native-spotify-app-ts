import React, { useContext } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Container,
  Scroller,

  BtnBack,

  MusicHeader,
  MusicCover,
  MusicInfo,
  MusicTitle,
  MusicAuthor,
  
  MusicContent,
  BtnActions,

} from './styles';
import { ArrowLeft, Heart, PauseCircle, PlayCircle } from 'phosphor-react-native';

import { MusicContext } from '../../contexts/MusicContextProvider';
import { MusicParams } from '../../@types/navigation';
import { AVPlaybackStatus } from 'expo-av';

import { LinearGradient } from 'expo-linear-gradient';

import { converterMsEmSec } from '../../misc/numberConvert';

import { pause, play, resume } from '../../misc/audioController';

import { StatusBar } from 'react-native';


import { BASE_API } from '../../service/api';

export default () => {
  const navigation = useNavigation();
  const routeNavigate = useRoute();
  const music = routeNavigate.params as MusicParams;
  
  const { soundObj, playBackObj, currentSound, setStatus, updateValuesState } = useContext(MusicContext);

  const handlePlayMusic = async ( music : MusicParams ) => {
    let uri = `${BASE_API}/music/${music.uri}`;

    if(!soundObj || currentSound.id !== music.id) {
      await playBackObj.unloadAsync();
      const status = await play(playBackObj, uri);
      
      return updateValuesState(
        status,
        playBackObj,
        music
      );
    }
    
    if(soundObj.isLoaded && currentSound.id === music.id && soundObj.durationMillis === soundObj.positionMillis) {
      playBackObj.unloadAsync();
      const status = await play(playBackObj, uri);

      return updateValuesState(
        status,
        playBackObj,
        music
      );
    }

    if(soundObj.isLoaded && soundObj.isPlaying){
      const status = await pause(playBackObj)
      return setStatus(status)
    }

    if(soundObj.isLoaded && !soundObj.isPlaying && currentSound.id === music.id){
      const status = await resume(playBackObj);
      return setStatus(status)
    }
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor={music.color}/>
        <Scroller
          contentContainerStyle={{
            flexGrow : 1,
            alignItems: 'center'
          }}
        >
          <LinearGradient
            colors={[music.color, '#121214']}
            style={{
              width: '100%',
            }}
          >
            <BtnBack
              onPress={navigation.goBack}
            >
              <ArrowLeft 
                size={28}
                color='#fff'
              />
            </BtnBack>
            <MusicHeader>
              <MusicCover 
                source={{uri: `${BASE_API}/music/cover/${music.cover}?resize=400`}} 
              />
              <MusicInfo>
                <MusicTitle>
                  {music.title}
                </MusicTitle>
                <MusicTitle>
                  Publicada Por <MusicAuthor>{music.author.name}</MusicAuthor>
                </MusicTitle>
                <MusicTitle>
                  {converterMsEmSec(music.duration)}min
                </MusicTitle>
              </MusicInfo>
            </MusicHeader>
            <MusicContent>
              <BtnActions>
                <Heart weight='regular' size={30} color='#fff' />
              </BtnActions>

              <BtnActions onPress={()=>handlePlayMusic(music)}>
                {soundObj.isLoaded && currentSound.id === music.id ?
                    !soundObj.isPlaying ?
                      <PlayCircle weight='fill' size={55} color='#14d16a'/>
                    :
                      <PauseCircle weight='fill' size={55} color='#14d16a'/>
                : <PlayCircle weight='fill' size={55} color='#14d16a'/>}
              </BtnActions>
              
            </MusicContent>
          </LinearGradient>
       </Scroller>
    </Container>
  );
}