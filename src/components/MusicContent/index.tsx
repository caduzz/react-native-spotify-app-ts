import React, { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { MusicNotesSimple } from 'phosphor-react-native';

import styled from 'styled-components/native';
import { MusicParams } from '../../@types/music';
import { BASE_API } from '../../service/api';
import CustomLoading from '../CustomLoading';

export const Container = styled.TouchableOpacity`
    flex-direction: column;
    margin: 8px;
`;
export const CoverMusic = styled.ImageBackground`
    width: 150px;
    height: 150px;
`;
export const MusicName = styled.Text`
    margin-top: 3px;
    font-size: 13px;
    color: #adadad;
`;

interface PropsMusic {
    data: MusicParams,
    onClick: () => void,
} 

const MusicContent = ({ data, onClick }: PropsMusic) => {
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <>
            {loading &&
                <CustomLoading 
                    colorsCustom={{
                        background: '#333',
                        text: '#757575'
                    }} 
                    styleCustom={{
                        size:{
                            width: 150,
                            height: 150,
                            icon: 55
                        },
                        marginTop: 8, 
                        margin: 8
                    }}
                />
            }
            <Container onPress={onClick} activeOpacity={0.9}>
                <CoverMusic 
                    source={{uri: `${BASE_API}/music/cover/${data.cover}?resize=200`}} 
                    onLoad={()=>setLoading(false)}
                />
                <MusicName>
                    {data.title}
                </MusicName>
            </Container>
        </>
    );
}

export default MusicContent;