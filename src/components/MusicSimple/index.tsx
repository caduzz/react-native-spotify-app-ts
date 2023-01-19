import React, { useState } from 'react';
import styled from 'styled-components/native';

import { BASE_API } from '../../service/api';
import CustomLoading from '../CustomLoading';

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
    data: {
        title: string,
        cover: string,
        author: {
            name: string
        }
    },
    onClick: () => void,
} 

const MusicSimple = ({ data: { title, cover, author }, onClick }: PropsMusic) => {
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
                        size: {
                            width: 40,
                            height: 40,
                            icon: 15
                        },
                        marginTop: 16,
                        margin: 8
                    }}
                />
            }
            <Container onPress={onClick} activeOpacity={0.5}>
                <ContentSimpleMusic>
                    <CoverMusic 
                        source={{uri: `${BASE_API}/music/cover/${cover}?resize=100`}}
                        onLoad={()=>setLoading(false)}
                    />
                    <TextsArea>
                        <MusicName>
                            {title}
                        </MusicName>
                        <MusicAuthor>
                            {author.name}
                        </MusicAuthor>
                    </TextsArea>
                </ContentSimpleMusic>
            </Container>
        </>
    );
}

export default MusicSimple;