import { useContext, useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AppRoute from './app.routes'
import AuthRoutes from './auth.routes'

import { Audio } from 'expo-av'

import { UserParams } from '../@types/music'
import { api } from '../service/api'

import { MusicContext } from '../contexts/MusicContextProvider'
import { UserContext } from '../contexts/UserContextProvider'

import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import PlayerModal from '../components/PlayerModal'
import { Loading } from '../components/Loading'


export function Routes() {
  const { user, userLogin, userLogout } = useContext(UserContext)
  const { currentSound, musicModal, setMusicModal } = useContext(MusicContext)

  const { getItem } = useAsyncStorage('spotify@user')

  const [loading, setLoading] = useState<boolean>(true)

  const permissionsVerify = async () => {
    const {granted} = await Audio.requestPermissionsAsync();
    if(granted){
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    }else {
      return
    }
  }

  const userCofirmLogin = async () => {
    const asyncValueStore = await getItem();

    if(!asyncValueStore) return userLogout();
    
    const user : UserParams = JSON.parse(asyncValueStore); 
    
    if(user.logged){
      const { validate } = await api.validate(`Bearer ${user.token}`)
      if(validate){
        userLogin(user)
      }else{
        userLogout()
      }
    }else {
      userLogout()
    }
    setLoading(false)
  }
  
  useEffect(()=>{
    userCofirmLogin()
    permissionsVerify()
  }, [])

  return (
    <NavigationContainer>
      {loading ?
        <Loading size='large' color='#1db954'/>
        :
        !user.logged ? <AuthRoutes /> : <AppRoute />
      }
      <PlayerModal
        visible={currentSound && musicModal}
        onRequestClose={()=>setMusicModal(false)}
      />
    </NavigationContainer>
  )
}