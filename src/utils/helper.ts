import {
  NOTIFICATION_TYPE,
  Store as NotificationStore,
} from 'react-notifications-component';

export function notify(type: NOTIFICATION_TYPE, data: string) {
  NotificationStore.addNotification({
    title: type === 'danger' ? 'Error' : 'Success',
    message: data,
    type: type,
    insert: 'top',
    container: 'top-right',
    dismiss: {
      duration: 1000,
      pauseOnHover: true,
      onScreen: true,
      showIcon: true,
    },
    animationIn: ['animate__animated animate__fadeIn'],
    animationOut: ['animate__animated animate__fadeOut'],
  });
}
