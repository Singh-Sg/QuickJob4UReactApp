import firebase from 'react-native-firebase';
import {
  Platform
} from 'react-native'

firebase.initializeApp(
    {
        clientId: '572544023612-gcc478ahel3hpkuufl1e4uv3grud2s9i.apps.googleusercontent.com',
        appId: '1:780599047266:android:dd0ceff5e6284126',
        apiKey: 'AIzaSyDATsTk5yPBOPuub2pu-vz-qTxLBl5ph4Q',
        databaseURL: 'https://quickjobs-aec81.firebaseio.com',
        storageBucket: 'quickjobs4u-1524034260366.appspot.com',
        messagingSenderId: '572544023612',
        projectId: 'quickjobs-aec81',

        // enable persistence by adding the below flag
        persistence: true,
    }
);

this.unsubscribeFromNotificationListener;

export const getDeviceToken = (callback) => {
    console.log(this.unsubscribeFromNotificationListener)
    firebase.messaging().hasPermission()
    .then(enabled => {
        if (enabled) {
            firebase.messaging().getToken()
            .then((data) => {
                callback(data)
                createChannelID()
                if(!this.unsubscribeFromNotificationListener){
                    this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
                        makeNotification(notification)
                    });
                }
            })
            .catch(error => {
                alert(error)
                callback(false)
            });
        } else {
            firebase.messaging().requestPermission()
            .then((data) => {
                firebase.messaging().getToken()
                .then((data) => {
                    callback(data)
                    createChannelID()
                    if(!this.unsubscribeFromNotificationListener){
                        this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
                            makeNotification(notification)
                        });
                    }
                })
                .catch(error => {
                    alert(error)
                    callback(false)
                });
            })
            .catch(error => {
                alert(error)
                callback(false)
            });
        } 
    });
}

const makeNotification = (notification) => {
    console.log(notification)
    if (Platform.OS === 'android') {
      const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('main-channel')
        .android.setColor('#000000')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));

    } else if (Platform.OS === 'ios') {

      const localNotification = new firebase.notifications.Notification()
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));

    }
}

export const createChannelID = () => {
    const channel = new firebase.notifications.Android.Channel('main-channel', 'Main Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My notifications will use this channel');
      
    firebase.notifications().android.createChannel(channel);
}
