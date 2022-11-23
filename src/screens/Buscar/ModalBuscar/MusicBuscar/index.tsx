import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { MusicParams } from '../../../../@types/navigation';
import { BASE_API } from '../../../../service/api';

const Container = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    flex-direction: row;
    align-items: center;
`;
const CoverMusic = styled.ImageBackground`
    width: 40px;
    height: 40px;
`;
const TextsArea = styled.View`
    margin-left: 15px;
`
const MusicName = styled.Text`
    font-size: 13px;
    color: #adadad;
`;
const MusicAuthor = styled.Text`
    font-size: 13px;
    color: #adadad;
`;

interface PropsMusic {
    data: MusicParams,
    onClick: () => void,
} 

const MusicBuscar = ({ data, onClick }: PropsMusic) => {
    return (
        <Container onPress={onClick} activeOpacity={0.9}>
            <CoverMusic source={{uri: `${BASE_API}/music/cover/${data.cover}?resize=200`}} />
            <TextsArea>
                <MusicName>
                    {data.title}
                </MusicName>
                <MusicAuthor>
                    {data.author.name}
                </MusicAuthor>
            </TextsArea>
        </Container>
    );
}

export default MusicBuscar;