import React from 'react';
import styled from 'styled-components/native';
import { MusicParams } from '../../@types/navigation';
import { BASE_API } from '../../service/api';

const Container = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;
const ContentSimpleMusic = styled.View`
    align-items: center;
    flex-direction: row;
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

const MusicSimple = ({ data: { title, cover, author, date }, onClick }: PropsMusic) => {
    return (
        <Container onPress={onClick} activeOpacity={0.5}>
            <ContentSimpleMusic>
                <CoverMusic source={{uri: `${BASE_API}/music/cover/${cover}?resize=20`}} />
                <TextsArea>
                    <MusicName>
                        {title}
                    </MusicName>
                    <MusicAuthor>
                        {author.name}
                    </MusicAuthor>
                </TextsArea>
            </ContentSimpleMusic>
            {date && <MusicAuthor>{date}</MusicAuthor>}
        </Container>
    );
}

export default MusicSimple;