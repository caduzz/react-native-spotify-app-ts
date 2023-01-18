import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #121214;
`;
export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const BtnBack = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    left: 15px;
`;

export const MusicHeader = styled.View`
    width: 100%;
    padding-top: 15px;
    align-items: center;
    justify-content: center;
`;
export const ImageThumb = styled.View`
    box-shadow: #0005 4px 5px 20px;
`;
export const MusicCover = styled.Image`
    width: 180px;
    height: 180px;
`;
export const MusicInfo = styled.View`
    margin-top: 15px;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px;
`;
export const MusicTitle = styled.Text`
    color: #fff;
    font-size: 23px;
    font-weight: bold;
`;
export const MusicAuthor = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
`;
export const MusicDuration = styled.Text`
    color: #d8d8d8;
    font-weight: light;
    font-size: 12px;
`;

export const MusicContent = styled.View`
    width: 100%;
    height: 100px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
export const BtnActions = styled.TouchableOpacity``;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;