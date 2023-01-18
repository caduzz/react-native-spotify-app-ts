import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components/native';

import { HeartStraight } from 'phosphor-react-native';

import { MusicParams } from '../../@types/music';

import { convertTimer } from '../../service/misc/numberConvert';
import { BASE_API } from '../../service/api';
import { AVPlaybackStatus } from 'expo-av';

import SliderPlayer from '../SliderPlayer/indenx';

export interface PlayerProps {
    bgColor: string
}

const Container = styled.View`
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`
const Widget = styled.TouchableOpacity`
    padding: 0 8px;
    padding-top: 8px;
    border-radius: 5px;
    flex-direction: column;
    background-color: ${ (p: PlayerProps) => p.bgColor};
`; 

const MusicContent = styled.View`
    padding-bottom: 5px;
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
const MusicNameAuthor = styled.Text`
    color: #ddd;
`
const BtnActions = styled.TouchableOpacity`
    color: #fff;
    margin: 0px;
    margin-left: 10px;
`

interface PlayerParams {
    music: MusicParams,
    children: ReactNode,
    soundObj: AVPlaybackStatus,
    openModal: () => void,
    onClick: (music: MusicParams) => void,
}

const PlayerWidget = ({ music, children, openModal, onClick, soundObj }: PlayerParams) => {
    return (
        <Container>
            { music.published &&
            <Widget
                activeOpacity={1} 
                onPress={openModal} 
                bgColor={music.color}
            >
                <MusicContent>
                    <MusicInfos>
                        <MusicCover source={{uri: `${BASE_API}/music/cover/${music.cover}?resize=20`}}/>
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
                        <BtnActions>
                            <HeartStraight weight='regular' size={26} color="#fff"/>
                        </BtnActions>
                        <BtnActions onPress={onClick}>
                            { children }
                        </BtnActions>
                    </MusicInfos>
                </MusicContent>
                <SliderPlayer
                    maximumTintColor='#fff7'
                    minimumTintColor='#fff'
                    height={2}
                    value={convertTimer(soundObj)}
                />
            </Widget>
            }
        </Container>
    );
}

export default PlayerWidget;

/**/