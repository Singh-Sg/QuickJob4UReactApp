import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Picker,
  Platform,
  TouchableOpacity
} from 'react-native'
import styles from './styles'

export class DropDown extends Component {
  render() {
    const { style, value, onValueChange, pickers, label, labelStyle, selectType, onPress } = this.props
    if(!pickers){
      return (
        <View style={[styles.inputView, style]}>
          {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        </View>
      )
    }
    const pickerItems = pickers.map((item, index) => {
      return <Picker.Item style={styles.picker} label={item[selectType]} value={item.id} />
    })
    if(Platform.OS == 'android'){
      return (
        <View style={[styles.inputView, style]}>
          {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
          {pickers && <Picker
            selectedValue={value}
            style={{width: '100%', height: 44}} itemStyle={{height: 44, fontSize: 10}}
            onValueChange={onValueChange}>
            {pickerItems}
          </Picker>}
        </View>
      );
    }
    let valueName;
    pickers.forEach((item) => {
      if(item.id == value){
        valueName = item[selectType]
      }
    })
    return (
      <View style={[styles.inputView, style]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TouchableOpacity onPress={onPress}><Text style={{paddingVertical: 5}}>{valueName}</Text></TouchableOpacity>
      </View>
    )
  }
}