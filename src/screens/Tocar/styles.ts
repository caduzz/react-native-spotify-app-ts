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
    top: 10px;
    left: 10px;
`;

export const MusicHeader = styled.View`
    width: 100%;
    padding-top: 30px;
    align-items: center;
    justify-content: center;
`;
export const MusicCover = styled.ImageBackground`
    width: 200px;
    height: 200px;
`;
export const MusicInfo = styled.View`
    margin-top: 15px;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px;

`;
export const MusicTitle = styled.Text`
    color: #adadad;
    font-size: 14px;
`;
export const MusicAuthor = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
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