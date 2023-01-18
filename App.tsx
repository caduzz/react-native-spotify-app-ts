import { useEffect, useRef, useState } from 'react';
import { StatusBar, View } from 'react-native';

import { MusicContextProvider } from './src/contexts/MusicContextProvider';
import { UserContextProvider } from './src/contexts/UserContextProvider';

import { Routes } from './src/routes';

import * as Notifications from 'expo-notifications'

import './src/service/Notification/configs'
import { registerForPushNotificationsAsync } from './src/service/Notification/getPushNotificationToken'
import { Subscription } from 'expo-modules-core';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(({ token }) =>{
      if(token) setExpoPushToken(token)
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      if(notificationListener.current && responseListener.current){
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#121214'}}>
      <StatusBar translucent={false} backgroundColor='#111'/>
      <UserContextProvider>
        <MusicContextProvider>
          <Routes /> 
        </MusicContextProvider>
      </UserContextProvider>
    </View>
  );
}