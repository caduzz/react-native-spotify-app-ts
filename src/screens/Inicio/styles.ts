import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #121214;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    height: auto;
    padding: 18px;
    margin-top: 25px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const HeaderTitle = styled.Text`
    flex: 1;
    font-size: 23px;
    font-weight: bold;
    color: #fff;
`;
export const HeaderOptions = styled.View`
    flex: 1;
    flex-direction: row;
`;

export const HeaderIcon = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

export const ScrollMusic = styled.FlatList`
    padding: 8px
`;