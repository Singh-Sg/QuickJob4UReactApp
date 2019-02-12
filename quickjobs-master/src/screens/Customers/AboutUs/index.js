import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView ,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Dimensions
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import HTML from 'react-native-render-html'
import { getFormData } from '../../../config/formHandler'
const { width, height } = Dimensions.get('window');

export default class AboutUs extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      content: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: params.mission ? 'Our Mission' : 'About Us'
    }
  }

  componentWillMount(){
    getFormData('aboutUs', (response) => {
      if(response){
        this.setState({
          content: response[0].description,
          loading: false
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
  }
  _getcontent(){
    if(this.state.content){
      return (<WebView  html={this.state.content} imagesMaxWidth="100%" />)
    }else{
      return (<ActivityIndicator size="large" />)
    }
  }
  render() {
    return (
  
      <WebView  html={this.state.content} imagesMaxWidth="100%" />
      
    );
  }
}