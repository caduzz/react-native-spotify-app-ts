import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #121214;
`;

export const HeaderLogin = styled.View`
    width: 100%;
    padding: 30px;
    align-items: center;
    justify-content: center;
`
export const SpotifyLogo = styled.Image`
    width: 168px;
    height: 50px;
`
export const TitleHeader = styled.Text`
    color: #fff;
    margin-top: 12px;
    font-size: 30px;
    font-weight: bold;
`

export const FormLogin = styled.View`
    width: 100%;
    padding: 25px;
    align-items: center;
    justify-content: center;
`
export const InputLoginArea = styled.View`
    width: 100%;
    margin-top: 15px;
    font-size: 17px;
    background-color: #333;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-right: 10px;
`
export const InputLogin = styled.TextInput`
    flex: 1;
    padding: 10px;
    color: #fff;
`

export const BtnLogin = styled.TouchableOpacity`
    margin-top: 50px;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    background-color: #fff;
    align-items: center;
`

export const TextBtnLogin = styled.Text`
    font-size: 17px;
`