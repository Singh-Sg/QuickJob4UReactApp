import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import styles from './styles'
import HTML from 'react-native-render-html'

export class UnreadCount extends Component {
  render() {
    const { jobCount, messageCount, onPressJob, onPressMessage } = this.props
    if((jobCount && jobCount > 0) || (messageCount && messageCount > 0)){
      return (
        <View style={{justifyContent: 'flex-end', flexDirection: 'row', height: 18, marginTop: -25}}>
          <TouchableOpacity style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressJob} style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {jobCount > 0 && <ImageBackground style={{width: 32, height: 18, alignItems: 'center'}} source={require('../../assets/images/notification-arrow.png')}><Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>{jobCount.toString()}</Text></ImageBackground>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressMessage} style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {messageCount > 0 && <ImageBackground style={{width: 32, height: 18, alignItems: 'center'}} source={require('../../assets/images/notification-arrow.png')}><Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>{messageCount.toString()}</Text></ImageBackground>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    return <View></View>
  }
}