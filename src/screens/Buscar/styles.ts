import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #121214;
`;

export const Header = styled.View`
    margin-top: 25px;
    width: 100%;
    padding: 18px;
`;

export const HeaderTitle = styled.Text`
    font-size: 23px;
    font-weight: bold;
    color: #fff;
`

export const BtnSearch = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    padding: 12px;
    width: 100%;
    margin-top: 25px;
    border-radius: 4px;
    background-color: #fff;
` 

export const BtnText = styled.Text`
    margin-left: 8px;   
    font-weight: bold;
    font-size: 16px;
    color: #5a5a5a;
`