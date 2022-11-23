import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import { House, MagnifyingGlass, Pause, Play, Playlist, SpotifyLogo } from 'phosphor-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import PlayerWidget from '../PlayerWidget/indenx';
import { MusicContext } from '../../contexts/MusicContextProvider';
import PlayerModal from '../PlayerModal';
import { pause, resume } from '../../misc/audioController';

const MainTab = styled.View`
    bottom: 0;
    position: absolute;
    width: 100%;
`
const TabArea = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const TabItem = styled.TouchableOpacity`
    padding: 8px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

const TitleTab = styled.Text`
    margin-top: 1px;
    font-size: 10px;
`;

const CustomBottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
    const {soundObj, currentSound, playBackObj, setMusicModal, setStatus} = useContext(MusicContext);

    const goTo = (screenName: string) => {
        navigation.navigate(screenName);
    }

    const playMusic = async () => {
        if(soundObj.isLoaded && soundObj.isPlaying){
          const status = await pause(playBackObj)
          return setStatus(status)
        }
    
        if(soundObj.isLoaded && !soundObj.isPlaying){
          const status = await resume(playBackObj);
          return setStatus(status)
        }
    }

    return (
        <MainTab>
            {soundObj.isLoaded &&
                <PlayerWidget
                    onClick={playMusic}
                    openModal={()=>setMusicModal(true)}
                    music={currentSound}
                >
                    {!soundObj.isPlaying ?
                        <Play weight='fill' size={22} color='#fff'/>
                        :
                        <Pause weight='fill' size={22} color='#fff'/>
                    }
                </PlayerWidget>
            }
            <TabArea>
                <LinearGradient style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} colors={['#0001', '#000']} >
                    <TabItem
                        onPress={()=>goTo('inicio')}
                    >
                        {state.index === 0 ?
                            <House weight={'fill'} size={26} color='#FFF'/>
                        :
                            <House weight={'bold'} size={26} color='#BCCBCC' />
                        }                    
                        <TitleTab style={{ color: state.index === 0 ? '#FFF' : '#BCCBCC' }}>
                            Início
                        </TitleTab>
                    </TabItem>
                    <TabItem
                        onPress={()=>goTo('buscar')}
                    >
                        {state.index === 1 ?
                            <MagnifyingGlass weight={'fill'} size={26} color='#FFF'/>
                        :
                            <MagnifyingGlass weight={'bold'} size={26} color='#BCCBCC' />
                        }                    
                        <TitleTab style={{ color: state.index === 1 ? '#FFF' : '#BCCBCC' }}>
                            Buscar
                        </TitleTab>
                    </TabItem>
                    <TabItem
                        onPress={()=>goTo('favoritos')}
                    >
                        {state.index === 2 ?
                            <Playlist weight={'fill'} size={26} color='#FFF'/>
                        :
                            <Playlist size={26} color='#BCCBCC' />
                        }                    
                        <TitleTab style={{ color: state.index === 2 ? '#FFF' : '#BCCBCC'}}>
                            Sua Biblioteca
                        </TitleTab>
                    </TabItem>
                    <TabItem
                        onPress={()=>goTo('premium')}
                    >
                        <SpotifyLogo weight={'fill'} size={26} color={state.index === 3 ? '#FFF' : '#BCCBCC'} />
                        <TitleTab style={{ color: state.index === 3 ? '#FFF' :'#BCCBCC' }}>
                            Premium
                        </TitleTab>
                    </TabItem>
                </LinearGradient>
            </TabArea>

        </MainTab>
    );
}

export default CustomBottomTabBar;