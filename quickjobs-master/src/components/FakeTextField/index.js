import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput
} from 'react-native'
import styles from './styles'
import HTML from 'react-native-render-html'

export class FakeTextField extends Component {
  render() {
    const { placeholder, style, keyboardType, onChangeText, onKeyPress, ref, value, returnKeyType, onSubmitEditing, inputStyle, label, editable, required, secureTextEntry, multiline, numberOfLines, desc, maxLength } = this.props
    return (
      <View style={[styles.inputView, style]}>
        {label && <Text style={styles.label}>{label} {required &&<Text style={{color: '#cf2525'}}>*</Text>}</Text>}
        {value != '' && <Text
        style={[styles.input, inputStyle]}
        >{value}</Text>}
        {/* <TextInput
          style={[styles.input, inputStyle, {borderWidth: numberOfLines ? 1 : 0, borderColor: numberOfLines ? '#dedede' : '#fff', borderRadius: numberOfLines ? 10 : 0, marginTop: numberOfLines ? 10 : 0}]}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          editable={editable}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onKeyPress={onKeyPress}
          ref={ref}
          textAlignVertical={numberOfLines ? "top" : "center"}
          multiline={multiline}
          numberOfLines={numberOfLines}
          value={value}
          maxLength={maxLength}
          underlineColorAndroid="transparent"
        /> */}
        {desc && <HTML onLinkPress={() => {}}  html={desc} imagesMaxWidth="100%" />}
      </View>
    );
  }
}