import * as Notifications from 'expo-notifications'
import { MusicParams } from '../../@types/music';

import { converterMsEmSec } from '../misc/numberConvert';

export async function schedulePushNotification(music: MusicParams, timer: number) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: music.title,
      body: `${music.author.name} - ${converterMsEmSec(music.duration)}`,
      sticky: true,
      categoryIdentifier: 'teste',
      sound: 'default',
      color: music.color,
      priority: 'max',
    },
    trigger: {seconds: timer},
  });
  return id;
}