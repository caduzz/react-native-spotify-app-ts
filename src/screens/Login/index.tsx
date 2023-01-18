import React, { useContext, useState } from 'react';

import {
  Container,
  FormLogin,
  HeaderLogin,
  SpotifyLogo,
  TitleHeader,
  InputLogin,
  InputLoginArea,
  BtnLogin,
  TextBtnLogin
} from './styles';
import { EnvelopeSimple, Lock } from 'phosphor-react-native';

import logo from '../../../assets/logoMenu.png'

import { api } from '../../service/api';
import { UserContext } from '../../contexts/UserContextProvider';

export default () => {
  const { userLogin } = useContext(UserContext) 

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const heandleUserLogin = async () => {
    const data = await api.login(email, password)
    if(data.error){return alert(data.error)}
      userLogin({logged: true, ...data})
  }

  return (
    <Container>
      <HeaderLogin>
        <SpotifyLogo source={logo}/>
        <TitleHeader>Música para todos.</TitleHeader>
      </HeaderLogin>
      <FormLogin>
        <InputLoginArea>
          <InputLogin 
            value={email}
            placeholder={`E-mail`}
            placeholderTextColor="#adadad"
            onChangeText={(t: string)=>setEmail(t)}
          />
          <EnvelopeSimple color='#adadad' />
        </InputLoginArea>
        <InputLoginArea>
          <InputLogin 
            value={password}
            placeholder={`Password`}
            placeholderTextColor="#adadad"
            onChangeText={(t: string)=>setPassword(t)}
            secureTextEntry={true}
          />
          <Lock color='#adadad'/>
        </InputLoginArea>
        <BtnLogin onPress={heandleUserLogin}>
          <TextBtnLogin>
            Login
          </TextBtnLogin>
        </BtnLogin>
      </FormLogin>
    </Container>
  );
}