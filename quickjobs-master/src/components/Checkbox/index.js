import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput
} from 'react-native'
import styles from './styles'
import { CheckBox } from 'react-native-elements'

export class Check extends Component {
  render() {
    const { text, round, checked, onPress, label, italic, style, checkedColor } = this.props
    return (
      <View style={[styles.mainView, style]}>
        {label && <Text style={styles.label} numberOfLines={1} ellipsizeMode='tail'>{label}</Text>}
        <View style={styles.inputView}>
          <View style={styles.checkboxView}>
            <CheckBox
              onPress={onPress}
              checkedIcon={round ? 'dot-circle-o' : 'check-square-o'}
              uncheckedIcon={round ? 'circle-o' : 'square-o'}
              checked={checked}
              checkedColor={checkedColor}
              containerStyle={styles.checkbox}
            />
          </View>
          <View style={styles.contentView}>
            <Text style={[styles.content, {fontStyle: italic ? 'italic' : 'normal'}]}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }
}