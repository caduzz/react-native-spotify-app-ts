import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ArrowLeft } from 'phosphor-react-native';

import {
  Container,

  Header,
  HeaderTitle,
  BtnBack,
  ScrollHitoricMusic
} from './styles';
import { MusicParams } from '../../@types/music';
import { api } from '../../service/api';
import { UserContext } from '../../contexts/UserContextProvider';

import MusicSimple from '../../components/MusicSimple';
import { Loading } from '../../components/Loading';

export default () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext)
  
  const [musics, setMusics] = useState<MusicParams[]>([])

  const getHistoric = async () => {
    if(user.logged){
      const data = await api.historicList(user.id)
      setMusics(data)
    }
  }

  useEffect(() => {
    getHistoric()
  }, [])

  return (
    <Container>
      <Header>
        <BtnBack onPress={()=>navigation.goBack()}>
          <ArrowLeft color='#fff'/>
        </BtnBack>
        <HeaderTitle>
          Tocados recentemente
        </HeaderTitle>
      </Header>
      {musics.length >= 1 ?
        <ScrollHitoricMusic
          data={musics}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: MusicParams, index: string) => index}
          renderItem={({item}: {item: MusicParams}) => (  
            <MusicSimple
              data={item} 
              key={item.id}
              onClick={()=>navigation.navigate('tocar', item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        > 
        </ScrollHitoricMusic>
        :
        <Loading size='large' color='#1db954'/>
      }
    </Container>
  );
}