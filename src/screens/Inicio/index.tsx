import React, { useState, useEffect } from 'react';
import { RefreshControl, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Scroller,

  Header,
  HeaderIcon,
  HeaderTitle,
  HeaderOptions,

  ScrollMusic,
} from './styles';

  import { Bell, Gear, ClockClockwise } from 'phosphor-react-native';
import MusicContent from '../../components/MusicContent';

import { api } from '../../service/api';


import { MusicParams } from '../../@types/music';
import { Loading } from '../../components/Loading';

export default () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [musics, setMusic] = useState<MusicParams[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const playSound = (music: MusicParams) => {
    navigation.navigate('tocar', music)
  }

  const navegar = () => {
    navigation.navigate('historic')
  }

  const searshMusics = async () => {
    setLoading(true)
    const res = await api.music();
    setLoading(false)
    setMusic(res)
  };

  const onRefresh = () => {
    setRefreshing(false);
    searshMusics();
  }
  
  const getHora = () => {
    let horaAtual = new Date().getHours();
    if (horaAtual <= 5) return 'Boa Noite';
    if (horaAtual < 12) return 'Bom dia';
    if (horaAtual < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  useEffect(() => {
    searshMusics();
  }, [])

  return (
    <Container>
      <StatusBar translucent={false} backgroundColor='#000'/>
      {loading ?
        <Loading size='large' color='#1db954'/>
        :
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header>
          <HeaderTitle>
            {getHora()}
          </HeaderTitle>
          <HeaderOptions>
            <HeaderIcon>
              <Bell size={26} weight='bold' color='#fff'/>
            </HeaderIcon>
            <HeaderIcon onPress={navegar}>
              <ClockClockwise size={26} weight='bold' color='#fff'/>
            </HeaderIcon>
            <HeaderIcon>
              <Gear size={26} weight='bold' color='#fff'/>
            </HeaderIcon>
          </HeaderOptions>
        </Header>
          <ScrollMusic
            data={musics}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: MusicParams) => item.id}
            renderItem={({item}: {item: MusicParams}) => (  
              <MusicContent
                data={item}
                onClick={()=>playSound(item)}
              />
            )}
            contentContainerStyle={{
              paddingRight: 25,
            }}
          > 
          </ScrollMusic>
      </Scroller>
      }
    </Container>
  );
}