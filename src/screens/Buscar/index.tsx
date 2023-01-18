import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { MagnifyingGlass } from 'phosphor-react-native';
import { MusicParams } from '../../@types/navigation';

import ModalBuscar from './ModalBuscar';

import { api } from '../../service/api';

import {
  Container,

  Header,
  HeaderTitle,
  BtnSearch,
  BtnText

} from './styles';
import { useSafeArea } from 'react-native-safe-area-context';


export default () => {
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchMusic, setSearchMusic] = useState<MusicParams[]>([])

  const playSound = (music: MusicParams) => {
    navigation.navigate('tocar', music)
  }

  const Search = async (text: string) => {
    if(text !== ''){
      const data = await api.searsh(text);
      setSearchMusic(data); 
    }else{
      setSearchMusic([])
    }
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Buscar
        </HeaderTitle>
        <BtnSearch onPress={()=>setOpenModal(true)} activeOpacity={0.9}>
          <MagnifyingGlass size={25} weight='bold'/>
          <BtnText>
            O que você quer ouvir
          </BtnText>
        </BtnSearch>
      </Header>
      {openModal &&  
        <ModalBuscar
          navigate={playSound}
          music={searchMusic}
          closeModal={()=>setOpenModal(false)}
          buscar={Search}
        />
      }
    </Container>
  );
}