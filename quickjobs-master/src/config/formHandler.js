import {
  AsyncStorage
} from 'react-native'

export const getFormData = (type, callback) => {
    fetch('https://quickjobs4u.com.au/api/home/'+type)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 0){
          alert(responseJson.message[0])
          callback(false)
        }else {
          callback(responseJson.data)
        }
      })
      .catch((error) => {
        console.log(error)
        callback(false)
    });
}

export const postFormData = (data, type, callback) => {
    fetch('https://quickjobs4u.com.au/api/home/'+type, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 0){
          alert(responseJson.message)
          callback(false)
        }else {
          callback(typeof(responseJson.data) != "object" ? responseJson.message : responseJson.data)
        }
      })
      .catch((error) => {
        console.error(error);
        callback(false)
    });
}

export const saveMyJobsScreen = (status, callback) => {
  AsyncStorage.setItem('jobScreen', JSON.stringify({status: true}));
  console.log(1)
}

export const removeMyJobsScreen = (status, callback) => {
  AsyncStorage.removeItem('jobScreen');
  console.log(2)
}

export const notificationRegistered = (callback) => {
  AsyncStorage.setItem('notiReg', JSON.stringify({status: true}));
  console.log(3)
}

export const removeNotificationRegistered = (callback) => {
  AsyncStorage.removeItem('notiReg');
  console.log(4)
}