import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import HTML from 'react-native-render-html'

export default class Accomplishments extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
  }

  render() {
    const { params } = this.props.navigation.state;
    const accomps = params.user.data.UserAccomplishes.map((item, index) => {
      return <View style={pageStyle.listItem}>
        <Text>{index+1}. {item.my_accomplishment}</Text>
      </View>
    })
    return (
      <ScrollView style={[styles.scrollViewContainer, {padding: 20}]} showsVerticalScrollIndicator={false}>
        <View style={pageStyle.listing}>
          {accomps}
        </View>
        <View style={pageStyle.imageViews}>
          {params.user.data.acomplis_img1 && <Image source={{uri: params.user.Accomplish_image_url+params.user.data.acomplis_img1}} style={pageStyle.image} />}
          {params.user.data.acomplis_img2 && <Image source={{uri: params.user.Accomplish_image_url+params.user.data.acomplis_img2}} style={pageStyle.image} />}
          {params.user.data.acomplis_img3 && <Image source={{uri: params.user.Accomplish_image_url+params.user.data.acomplis_img3}} style={pageStyle.image} />}
          {params.user.data.acomplis_img4 && <Image source={{uri: params.user.Accomplish_image_url+params.user.data.acomplis_img4}} style={pageStyle.image} />}
          {params.user.data.acomplis_img5 && <Image source={{uri: params.user.Accomplish_image_url+params.user.data.acomplis_img5}} style={pageStyle.image} />}
        </View>
      </ScrollView>
    );
  }
}