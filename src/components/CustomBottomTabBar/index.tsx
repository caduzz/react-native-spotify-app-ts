import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';

import { House, MagnifyingGlass, Pause, Play, Playlist, SpotifyLogo } from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import PlayerWidget from '../PlayerWidget';

import { MusicContext } from '../../contexts/MusicContextProvider';
import useHandleMusicPlayer from '../../hooks/useHandleMusicPlayer';

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
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

const TitleTab = styled.Text`
    margin-top: 1px;
    font-size: 10px;
`;

const CustomBottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
    const {soundObj, currentSound, musicModal, setMusicModal} = useContext(MusicContext);

    const playMusic = useHandleMusicPlayer()

    const goTo = (screenName: string) => {
        navigation.navigate(screenName);
    }

    return (
        <MainTab>
            <LinearGradient 
                style={{
                    flex: 1,
                    paddingTop: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }} 
                colors={['#0000', '#000']}

            >
                {soundObj.isLoaded && !musicModal &&
                    <PlayerWidget
                        onClick={()=>playMusic(currentSound)}
                        openModal={()=>setMusicModal(true)}
                        music={currentSound}
                        soundObj={soundObj}
                    >
                        {!soundObj.isPlaying ?
                            <Play weight='fill' size={22} color='#fff'/>
                            :
                            <Pause weight='fill' size={22} color='#fff'/>
                        }
                    </PlayerWidget>
                }
                <TabArea
                    pointerEvents='box-none'
                >
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
                </TabArea>
            </LinearGradient>
        </MainTab>
    );
}

export default CustomBottomTabBar;