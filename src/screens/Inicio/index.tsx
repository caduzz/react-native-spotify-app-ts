import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

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

import { Bell, Clock, Gear } from 'phosphor-react-native';
import MusicContent from '../../components/MusicContent';

import { api } from '../../service/api';


import { MusicParams } from '../../@types/navigation';
import { Loading } from '../../components/Loading';

export default () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [musics, setMusic] = useState<MusicParams[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const playSound = (music: MusicParams) => {
    navigation.navigate('tocar', music)
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
    const date = new Date().toLocaleTimeString();

    if(date > '18:00:00' && date < '23:59:59'){
      return 'Boa noite'
    }
    
    if(date <= '11:59:59'){
      return 'Bom dia'
    }

    if(date >= '10:59:59'){
      return 'Boa tarde'
    }

  }

  useEffect(() => {
    searshMusics();
  }, [])

  return (
    <Container>
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
              <Bell size={26} weight={'bold'} color='#fff'/>
            </HeaderIcon>
            <HeaderIcon>
              <Clock size={26} weight={'bold'} color='#fff'/>
            </HeaderIcon>
            <HeaderIcon>
              <Gear size={26} weight={'bold'} color='#fff'/>
            </HeaderIcon>
          </HeaderOptions>
        </Header>

        {loading ?
          <Loading size='large' color='#fff'/>
          :
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
        }
      </Scroller>
    </Container>
  );
}
/*

*/