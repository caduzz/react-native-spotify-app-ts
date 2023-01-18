import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #121214;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 22px;
`;

export const BtnBack = styled.TouchableOpacity`
    position: absolute;
    left: 15px;
`

export const HeaderTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`

export const ScrollHitoricMusic = styled.FlatList`
    padding: 8px
`;