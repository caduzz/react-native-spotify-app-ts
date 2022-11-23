import { useContext, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications'

import { Routes } from './src/routes';

import './src/service/notificationsConfigs';
import { getPushNotificationToken } from './src/service/getPushNotificationToken';
import { Loading } from './src/components/Loading';
import { MusicContextProvider } from './src/contexts/MusicContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const getPushNotificationListner = useRef<Subscription>();
  const responseNotificationListner = useRef<Subscription>();

  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  useEffect(()=>{
    getPushNotificationToken();
  }, [])

  useEffect(()=>{
      getPushNotificationListner.current = Notifications.
      addNotificationReceivedListener(notfication => {})
      
      responseNotificationListner.current = Notifications
      .addNotificationResponseReceivedListener(notfication => {})

      return () => {
        if(getPushNotificationListner.current && responseNotificationListner.current){
          Notifications.removeNotificationSubscription(getPushNotificationListner.current)
          Notifications.removeNotificationSubscription(responseNotificationListner.current)
        }
      }
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#121214'}}>
      <MusicContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1a1a1a"
          translucent
        />
        {fontsLoaded ? <Routes/> : <Loading size='large' color='#fff'/> }
      </MusicContextProvider>
    </SafeAreaView>
  );
}