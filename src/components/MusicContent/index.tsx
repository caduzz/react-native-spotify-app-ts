import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { MusicParams } from '../../@types/navigation';
import { BASE_API } from '../../service/api';

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
    return (
        <Container onPress={onClick} activeOpacity={0.9}>
            <CoverMusic source={{uri: `${BASE_API}/music/cover/${data.cover}?resize=100`}} />
            <MusicName>
                {data.title}
            </MusicName>
        </Container>
    );
}

export default MusicContent;