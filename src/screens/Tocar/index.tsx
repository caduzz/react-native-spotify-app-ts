import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Container,
  Scroller,

  BtnBack,

  MusicHeader,
  ImageThumb,
  MusicCover,
  MusicInfo,
  MusicTitle,
  MusicAuthor,

  MusicContent,
  BtnActions,

} from './styles';
import { ArrowLeft, Heart, PauseCircle, PlayCircle } from 'phosphor-react-native';

import { MusicContext } from '../../contexts/MusicContextProvider';
import { MusicParams } from '../../@types/music';

import { LinearGradient } from 'expo-linear-gradient';

import useHandleMusicPlayer from '../../hooks/useHandleMusicPlayer';

import { api, BASE_API } from '../../service/api';
import { Loading } from '../../components/Loading';

export default () => {
  const navigation = useNavigation();
  const routeNavigate = useRoute();

  const musicRoute = routeNavigate.params as MusicParams;
  const handlePlayMusic = useHandleMusicPlayer()

  const { soundObj, currentSound } = useContext(MusicContext);
  
  const [music, setMusic] = useState<MusicParams>(musicRoute)
  const [loading, setLoading] = useState<boolean>(true)

  const findMusicAsync = async () => {
    const data = await api.musicById(music.id)
    setMusic(data)
    setLoading(false)
  }

  useEffect(() => {
    findMusicAsync()
  }, [])

  return (
    <>
      {!loading &&
        <StatusBar 
          backgroundColor={music.color}
        />
      }
      <Container>
          <Scroller
            contentContainerStyle={{
              flexGrow : 1, 
              alignItems: 'center',
            }}
          >
            {loading ?
              <Loading size='large' color='#1db954'/>
              :
              <LinearGradient
                colors={[music.color, '#121214']}
                style={{
                  width: '100%',
                }}
              >
                <BtnBack
                  onPress={()=>navigation.goBack()}
                >
                  <ArrowLeft 
                    size={28}
                    color='#fff'
                  />
                </BtnBack>
                <MusicHeader>
                  <ImageThumb
                    style={{                
                      shadowColor: "#0005",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity:  0.17,
                      shadowRadius: 3.05,
                      elevation: 25
                    }}
                  >
                    <MusicCover
                      source={{uri: `${BASE_API}/music/cover/${music.cover}?resize=200`}}
                    />
                  </ImageThumb>
                  <MusicInfo>
                    <MusicTitle>
                      {music.title}
                    </MusicTitle>
                    <MusicAuthor>
                      {music.author.name} 
                    </MusicAuthor>
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
            }
        </Scroller>
      </Container>
    </>
  );
}