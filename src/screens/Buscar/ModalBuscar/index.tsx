import styled from 'styled-components/native';

import { ArrowLeft } from 'phosphor-react-native';
import { MusicParams } from '../../../@types/navigation';

import MusicBuscar from './MusicBuscar';


const Content = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #121214;
`

const SearchArea = styled.View`
    padding: 15px;
    width: 100%;
    align-items: center;
    flex-direction: row;
    background-color: #333;
`
const BtnClose = styled.TouchableOpacity`
`
const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 17px;
    margin-left: 12px;
    color: #fff;
`;
const AreaMusic = styled.FlatList`
    padding: 8px
`;

const WarningText = styled.Text`
    width: 100%;
    font-size: 16px;
    padding: 25px;
    text-align: center;
    color: #fff;
`

interface ModalParams {
    closeModal: ()=>void
    buscar: (value: string)=>void,
    navigate: (music: MusicParams)=>void,
    music: MusicParams[]
}

const ModalBuscar = ({ closeModal, buscar, navigate, music  }: ModalParams) => {

    return (
        <Content>
            <SearchArea>
                <BtnClose onPress={closeModal}>
                    <ArrowLeft color='#fff'/>
                </BtnClose>
                <SearchInput 
                    onChangeText={(text: string)=>buscar(text)} 
                    placeholder='O que você quer ouvir'
                    selectionColor='#1DB954'
                    placeholderTextColor='#ddd'
                />
                    
            </SearchArea>
            {music.length > 0 ?
                <AreaMusic 
                    data={music}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item: MusicParams) => item.id}
                    renderItem={({item}: {item: MusicParams}) => (  
                        <MusicBuscar
                            data={item}
                            onClick={()=>navigate(item)}
                        />
                    )}
                    contentContainerStyle={{
                        paddingLeft: 5,
                        paddingRight: 5
                    }}
                />
                :
                <WarningText>
                    Encontre o que você quer ouvir
                </WarningText>
            }
        </Content>
    );
}

export default ModalBuscar;