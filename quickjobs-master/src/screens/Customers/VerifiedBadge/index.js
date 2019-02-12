import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  ImageBackground,
  Image
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";

export default class VerifiedBadge extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.scrollViewContainer}>
        <Image style={pageStyle.certificate} source={require('../../../assets/images/certificate.png')} />
      </View>
    );
  }
}