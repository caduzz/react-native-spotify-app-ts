import { ReactNode, useContext } from 'react'
import styled from 'styled-components/native';

import { HeartStraight } from 'phosphor-react-native';

import { MusicParams } from '../../@types/navigation';
import { MusicContext } from '../../contexts/MusicContextProvider';

import { convertTimer, converterMsEmSec } from '../../misc/numberConvert';
import SliderPlayer from './SliderPlayer/indenx';
import { BASE_API } from '../../service/api';

export interface PlayerProps {
    bgColor: string
}

const Container = styled.TouchableOpacity`
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`
const MusicArea = styled.View`
    padding: 0 10px;
    padding-top: 10px;
    border-radius: 5px;
    flex-direction: column;
    background-color: ${ (p: PlayerProps) => p.bgColor};
`; 

const MusicContent = styled.View`
    padding-bottom: 7px;
    flex: 1;
    padding-right: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
`; 

const MusicInfos = styled.View`
    flex-direction: row;
    align-items: center;
`;

const MusicTextArea = styled.View`
    flex-direction: column;
`;

const MusicCover = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 8px;
`;
const MusicName = styled.Text`
    color: #fff;
    font-weight: bold;
`
const MusicDuration = styled.Text`
    color: #fff;
`
const MusicNameAuthor = styled.Text`
    color: #ddd;
`
const BtnActions = styled.TouchableOpacity`
    color: #fff;
    margin-left: 10px;
`

interface PlayerParams {
    music: MusicParams,
    children: ReactNode,
    openModal: () => void,
    onClick: () => void,
}

const PlayerWidget = ({ music, children, openModal, onClick }: PlayerParams) => {
    const { soundObj } = useContext(MusicContext);

    return (
        <Container onPress={openModal} activeOpacity={0.8}>
            <MusicArea bgColor={music.color}>
                <MusicContent>
                    <MusicInfos>
                        <MusicCover source={{uri: `${BASE_API}/music/cover/${music.cover}?resize=150`}}/>
                        <MusicTextArea>
                            <MusicName>
                                {music.title}
                            </MusicName>
                            <MusicNameAuthor>
                                {music.author.name}
                            </MusicNameAuthor>
                        </MusicTextArea>
                    </MusicInfos>
                    <MusicInfos>
                        {soundObj.isLoaded &&
                            <MusicDuration>
                                {converterMsEmSec(soundObj.positionMillis)}
                            </MusicDuration>
                        }
                        <BtnActions>
                            <HeartStraight weight='regular' size={28} color="#fff"/>
                        </BtnActions>
                        <BtnActions onPress={onClick}>
                            { children }
                        </BtnActions>
                    </MusicInfos>
                </MusicContent>
                <SliderPlayer
                    maximumTintColor='#fff8'
                    minimumTintColor='#fff'
                    value={convertTimer(soundObj)}
                />
            </MusicArea>
            
        </Container>
    );
}

export default PlayerWidget;

/**/