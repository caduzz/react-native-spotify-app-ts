import styled from 'styled-components/native';

import { Modal, ModalProps, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CaretDown, DotsThreeVertical, HeartStraight, MinusCircle, PauseCircle, PlayCircle, SkipBack, SkipForward } from 'phosphor-react-native';

import Slider from '@react-native-community/slider';

import { convertTimer, converterMsEmSec } from '../../misc/numberConvert';
import { pause, resume } from '../../misc/audioController';
import { useContext } from 'react';
import { MusicContext } from '../../contexts/MusicContextProvider';
import { BASE_API } from '../../service/api';

export interface PlayerProps {
    bgColor: string
}

const PlayerModalArea = styled.View`
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
const MusicAuthor = styled.Text`
    color: #fff;
    font-size: 14px;
`;
const MusicName = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: bold;
`;

const PlayerModalBody = styled.View`
    flex: 1;
    align-items: center;
`;
const PlayerModalCover = styled.Image`
    width: 320px;
    height: 320px;
`;

const MusicTextInfos = styled.View`
    width: 100%;
    padding: 10px 30px;
`;

const PlayerSlideArea = styled.View`
    padding: 4px 15px;
    width: 100%;
`;
const PlayerTimeArea = styled.View`
    padding: 0 20px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;
const TimerText = styled.Text`
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
const PlayerOptionsBtn = styled.TouchableOpacity`
`;


interface PlayerParams extends ModalProps {
}

const PlayerModal = ({ ...rest }: PlayerParams) => {

    const {currentSound, soundObj, playBackObj, setMusicModal, setStatus} = useContext(MusicContext);

    const setPosition = async (value: number) => {
        const res = (currentSound.duration * value) / 100
        const status = await playBackObj.setPositionAsync(res)
        setStatus(status)
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
        <Modal
            animationType='slide'
            {...rest}
        >
            <StatusBar translucent backgroundColor={currentSound.color}/>
            <LinearGradient
                style={{
                    flex: 1
                }} 
                colors={[currentSound.color, '#141012']}
            >
                <PlayerModalArea>
                    <PlayerModalHeader>
                        <BtnCloseModal onPress={()=>setMusicModal(false)}>
                            <CaretDown weight='light' size={25} color='#fff' />
                        </BtnCloseModal>

                        <MusicInfo>
                            <MusicName>{currentSound.title}</MusicName>
                            <MusicAuthor>{currentSound.author.name}</MusicAuthor>
                        </MusicInfo>

                        <BtnCloseModal>
                            <DotsThreeVertical weight='light' size={28} color='#fff' />
                        </BtnCloseModal>
                    </PlayerModalHeader>
                    <PlayerModalBody>
                        <PlayerModalCover source={{uri: `${BASE_API}/music/cover/${currentSound.cover}?resize=550`}}/>

                        <MusicTextInfos>
                            <MusicName>{currentSound.title}</MusicName>
                            <MusicAuthor>{currentSound.author.name}</MusicAuthor>
                        </MusicTextInfos>

                        <PlayerSlideArea>
                            <Slider
                                value={convertTimer(soundObj)}
                                onSlidingComplete={(value)=>setPosition(value)}
                                minimumValue={0}
                                maximumValue={100}
                                thumbTintColor='#fff'
                                maximumTrackTintColor='#fff'
                                minimumTrackTintColor='#fff'
                                style={{
                                    width: '100%',
                                    padding: 0
                                }}
                            />

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

                                <PlayerOptionsBtn onPress={playMusic}>
                                    {soundObj.isLoaded && soundObj.isPlaying ?
                                        <PauseCircle weight='fill' color='#fff' size={70}/>
                                        :
                                        <PlayCircle weight='fill' color='#fff' size={70}/>
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
