import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import styles from './styles'

export class Button extends Component {
  render() {
    const { text, style, onPress, loading, containerStyle, textStyle } = this.props
    return (
      <View style={[styles.inputView, containerStyle]}>
        {!loading && <TouchableOpacity onPress={onPress}>
          <View style={[styles.buttonView, style]}>
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          </View>
        </TouchableOpacity>}
        {loading && <View style={[styles.buttonView, style]}>
          <ActivityIndicator color="#fff" />
        </View>}
      </View>
    );
  }
}