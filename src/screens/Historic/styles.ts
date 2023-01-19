import styled from 'styled-components/native';

interface props {
    color: string
}

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

export const ScrollHitoricMusic = styled.SectionList`

`;

export const SectionHeader = styled.View`
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 2px
`;

export const SectionTitle = styled.Text`
    padding: 5px 8px;
    border-radius: 12px; 
    background-color: ${(p: props) => p.color};
    font-size: 12px;
    font-weight: bold;
    color: #fff;
`