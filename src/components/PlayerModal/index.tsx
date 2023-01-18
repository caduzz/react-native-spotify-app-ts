import React, { useContext } from 'react';

import { Modal, ModalProps, StatusBar } from 'react-native';

import styled from 'styled-components/native';

import { MusicContext } from '../../contexts/MusicContextProvider';

import SliderPlayer from '../SliderPlayer/indenx';

import { LinearGradient } from 'expo-linear-gradient';
import { CaretDown, DotsThreeVertical, HeartStraight, MinusCircle, PauseCircle, PlayCircle, SkipBack, SkipForward } from 'phosphor-react-native';

import { pause, resume } from '../../misc/audioController';
import { convertTimer, converterMsEmSec } from '../../misc/numberConvert';

import { BASE_API } from '../../service/api';
import useHandleMusicPlayer from '../../hooks/useHandleMusicPlayer';


export interface PlayerProps {
    bgColor: string
}

const PlayerModalArea = styled.SafeAreaView`
    flex: 1;
`; 

const PlayerModalHeader = styled.View`
    width: 100%;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`; 
const BtnCloseModal = styled.TouchableOpacity``; 

const MusicInfo = styled.View`
    align-items: center;
`;
const MusicAuthorTop = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
`;
const MusicText = styled.Text`
    color: #fff;
    font-size: 14px;
`;

const MusicName = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`;
const MusicAuthor = styled.Text`
    color: #fff8;
    font-size: 15px;
    text-transform: capitalize;
`;

const PlayerModalBody = styled.View`
    flex: 1;
    align-items: center;
`;
const PlayerModalCover = styled.Image`
    width: 300px;
    height: 300px;
`;

const MusicTextInfos = styled.View`
    width: 100%;
    padding: 10px 30px;
    padding-top: 12px;
`;

const PlayerSlideArea = styled.View`
    padding: 4px 15px;
    padding-top: 12px;
    width: 100%;
`;
const SlideContent = styled.View`
    padding: 8px 15px;
`
const PlayerTimeArea = styled.View`
    padding: 0 15px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;
const TimerText = styled.Text`
    font-size: 12px;
    color: #fff;
`;

const PlayerOptions = styled.View`
    width: 100%;
    padding: 0 30px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const PlayerOptionsContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const PlayerOptionsBtn = styled.TouchableOpacity``;


interface PlayerParams extends ModalProps {
}

const PlayerModal = ({ ...rest }: PlayerParams) => {
    const {currentSound, soundObj, setMusicModal} = useContext(MusicContext);

    const playMusic = useHandleMusicPlayer();

    return (
        <Modal
            animationType='slide'
            {...rest}
        >
            <StatusBar backgroundColor={currentSound.color}/>
            <LinearGradient
                style={{
                    flex: 1,
                }}
                colors={[currentSound.color, '#141012']}
            >
                <PlayerModalArea>
                    <PlayerModalHeader>
                        <BtnCloseModal onPress={()=>setMusicModal(false)}>
                            <CaretDown weight='light' size={25} color='#fff' />
                        </BtnCloseModal>

                        <MusicInfo>
                            <MusicText>{currentSound.title}</MusicText>
                            <MusicAuthorTop>{currentSound.author.name}</MusicAuthorTop>
                        </MusicInfo>

                        <BtnCloseModal>
                            <DotsThreeVertical weight='light' size={28} color='#fff' />
                        </BtnCloseModal>
                    </PlayerModalHeader>
                    <PlayerModalBody>
                        <PlayerModalCover 
                            source={{uri: `${BASE_API}/music/cover/${currentSound.cover}?resize=120`}}
                        />

                        <MusicTextInfos>
                            <MusicName>{currentSound.title}</MusicName>
                            <MusicAuthor>{currentSound.author.name}</MusicAuthor>
                        </MusicTextInfos>

                        <PlayerSlideArea>
                            <SlideContent>
                                <SliderPlayer
                                    maximumTintColor='#fff3'
                                    minimumTintColor='#fff'
                                    playerCircle={true}
                                    height={3}
                                    value={convertTimer(soundObj)}
                                />
                            </SlideContent>
                            {soundObj.isLoaded &&
                                <PlayerTimeArea>
                                    <TimerText>
                                        {converterMsEmSec(soundObj.positionMillis)}
                                    </TimerText>
                                    <TimerText>
                                        {converterMsEmSec(currentSound.duration)}
                                    </TimerText>
                                </PlayerTimeArea>
                            }

                        </PlayerSlideArea>
                        <PlayerOptions>
                            <PlayerOptionsBtn>
                                <HeartStraight color='#fff' size={25}/>
                            </PlayerOptionsBtn>

                            <PlayerOptionsContent>
                                <PlayerOptionsBtn>
                                    <SkipBack weight='fill' size={30} color='#fff'/>
                                </PlayerOptionsBtn>

                                <PlayerOptionsBtn style={{paddingHorizontal: 15}} onPress={()=>playMusic(currentSound)}>
                                    {soundObj.isLoaded && soundObj.isPlaying ?
                                        <PauseCircle weight='fill' color='#fff' size={75}/>
                                        :
                                        <PlayCircle weight='fill' color='#fff' size={75}/>
                                    }
                                </PlayerOptionsBtn>

                                <PlayerOptionsBtn>
                                    <SkipForward weight='fill' size={30} color='#fff'/>
                                </PlayerOptionsBtn>
                            </PlayerOptionsContent>

                            <PlayerOptionsBtn>
                                <MinusCircle color='#fff' size={25}/>
                            </PlayerOptionsBtn>
                        </PlayerOptions>
                    </PlayerModalBody>
                </PlayerModalArea>
            </LinearGradient>
        </Modal>
    );
}

export default PlayerModal;
