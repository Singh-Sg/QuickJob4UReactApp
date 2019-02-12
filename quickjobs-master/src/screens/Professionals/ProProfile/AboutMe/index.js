import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import HTML from 'react-native-render-html'

export default class AboutMe extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: false
    }
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    this.setState({
      content: params.about_data
    })
  }

  render() {
    return (
      <ScrollView style={[styles.scrollViewContainer, {padding: 20}]} showsVerticalScrollIndicator={false}>
        <HTML html={this.state.content} imagesMaxWidth="100%" />
      </ScrollView>
    );
  }
}