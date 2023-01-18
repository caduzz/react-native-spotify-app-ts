import * as Notifications from 'expo-notifications'

import { Platform } from 'react-native';

interface RegisterForPushToken {
    token: string | null
}

export async function registerForPushNotificationsAsync(): Promise<RegisterForPushToken> {
    let token;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return {token: null};
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: 't',
            lightColor: "#FF231F7C",
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            bypassDnd: true,
        });
    }

    return {token};
}