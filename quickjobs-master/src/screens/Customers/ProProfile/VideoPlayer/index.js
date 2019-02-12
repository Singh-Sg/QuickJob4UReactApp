import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  TouchableNativeFeedback,
  ActivityIndicator
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import YouTube from 'react-native-youtube'

export default class VideoPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      ytlink: false,
      loading: true
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state
    let link = params.video.split('/')
    if(params.video){
      this.setState({
        ytlink: link[4]
      }, () => {
        this.setState({
          loading: false
        })
      })
    }
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <YouTube
          apiKey="AIzaSyCYkM5bJdw5gSnK0Z5TdWlI8zcg_d5gbOI"
          videoId={this.state.ytlink}
          play={true}
          fullscreen={true}
          loop={true}
          style={{ alignSelf: 'stretch', height: '100%' }}
          onChangeFullscreen={e => {
            if(!e.isFullscreen){
              this.props.navigation.goBack()
            }
          }}
        />
    );
  }
}