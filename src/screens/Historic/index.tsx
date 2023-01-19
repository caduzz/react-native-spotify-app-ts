import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ArrowLeft } from 'phosphor-react-native';

import {
  Container,

  Header,
  HeaderTitle,
  BtnBack,
  ScrollHitoricMusic,
  SectionHeader,
  SectionTitle
} from './styles';
import { MusicParams } from '../../@types/music';
import { api } from '../../service/api';

import { UserContext } from '../../contexts/UserContextProvider';

import MusicSimple from '../../components/MusicSimple';
import { Loading } from '../../components/Loading';

import groupBy from 'lodash/groupBy'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt';

interface SectionListInterface {
    title: string, 
    data: MusicParams[]
}

export default () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext)
  
  const [list, setList] = useState<SectionListInterface[]>([])
  const [musics, setMusics] = useState<MusicParams[]>([])

  const getHistoric = async () => {
    if(user.logged){
      const data = await api.historicList(user.id)
      setMusics(data)
    }
  }

  const agroupList = async () => {
    const listGroup = Object.values(
      groupBy(musics, (value) => {
        return format(new Date(value.date), 'PPP', {locale: pt});
      })
    )

    var data:SectionListInterface[] = [];
    
    listGroup.map((dia) => {
      ///GAMBIRRA MOMENTANIA
      var atual = new Date();

      var formatDate = format(new Date(dia[0].date), 'PPP', {locale: pt});
      var hoje = format(new Date(), 'PPP', {locale: pt})
      var ontem = format(new Date(atual.setDate(atual.getDate() - 1)), 'PPP', {locale: pt})

      var retornoTitle = formatDate === hoje ? 'Hoje' : formatDate && formatDate === ontem ? 'Ontem' : formatDate;

      let section = {
        title: retornoTitle,
        data: [...dia]
      } as SectionListInterface

      data.push(section)
    })
    setList(data)
  }

  useEffect(() => {
    agroupList()
  }, [musics])

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
          sections={list}
          keyExtractor={(item: MusicParams, index: string) => index}
          renderItem={({item}: {item: MusicParams}) => ( 
            <MusicSimple
              data={item}
              onClick={()=>navigation.navigate('tocar', item)}
            />
          )}
          initialNumToRender={15}
          renderSectionHeader={({section: { title }}: {section: SectionListInterface}) => (
            <SectionHeader>
              <SectionTitle color='#333'>{title}</SectionTitle>
            </SectionHeader>
          )}
          stickySectionHeadersEnabled
          contentContainerStyle={{ paddingBottom: 100 }}
        >
        </ScrollHitoricMusic>
        :
        <Loading size='large' color='#1db954'/>
      }
    </Container>
  );
}