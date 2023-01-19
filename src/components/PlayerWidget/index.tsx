import React, { ReactNode, useContext, useState } from 'react'
import styled from 'styled-components/native';

import { HeartStraight } from 'phosphor-react-native';

import { MusicParams } from '../../@types/music';

import { convertTimer } from '../../service/misc/numberConvert';
import { BASE_API } from '../../service/api';
import { AVPlaybackStatus } from 'expo-av';

import SliderPlayer from '../SliderPlayer/indenx';
import CustomLoading from '../CustomLoading';

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
    const [loading, setLoading] = useState<boolean>(true)
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
                        {loading &&
                            <CustomLoading 
                                colorsCustom={{
                                    background: '#333',
                                    text: '#757575'
                                }} 
                                styleCustom={{
                                    size: {
                                        width: 40,
                                        height: 40,
                                        icon: 10
                                    },
                                    marginTop: 0,
                                    margin: 0,
                                    radius: 5
                                }}
                            />
                        }      
                        <MusicCover 
                            source={{uri: `${BASE_API}/music/cover/${music.cover}?resize=120`}}
                            onLoad={()=>setLoading(false)}
                        />
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
                            <HeartStraight weight='regular' size={28} color="#fff"/>
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