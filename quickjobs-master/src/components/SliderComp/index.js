import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Slider
} from 'react-native'
import styles from './styles'
import HTML from 'react-native-render-html'

export class SliderComp extends Component {
  render() {
    const { style, label, required, desc, onValueChange, value } = this.props
    return (
      <View style={[styles.inputView, style]}>
        {label && <Text style={styles.label}>{label} {required &&<Text style={{color: '#cf2525'}}>*</Text>}</Text>}
        <Slider minimumValue={0} maximumValue={50} style={{marginTop: 10}} minimumTrackTintColor="#cf2525" thumbTintColor="#cf2525" onValueChange={onValueChange} value={value} />
        {desc && <HTML onLinkPress={() => {}}  html={desc} imagesMaxWidth="100%" />}
      </View>
    );
  }
}