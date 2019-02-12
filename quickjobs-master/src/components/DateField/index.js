import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput
} from 'react-native'
import styles from './styles'
import DatePicker from 'react-native-datepicker'

export class DateField extends Component {
  render() {
    const { style, value, label, mode, date, onDateChange, inputStyle, format } = this.props
    return (
      <View style={[styles.inputView, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        {mode == 'date' && <DatePicker
          style={[styles.input, inputStyle]}
          date={date}
          mode={mode}
          value={value}
          placeholder={mode == 'date' ? "select date" : "select time"}
          format={format ? format : "YYYY-MM-DD"}
          showIcon={false}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0,
              textAlign: 'left',
              alignSelf: 'flex-start',
              alignItems: 'flex-start'
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={onDateChange}
        />}
        {mode == 'time' && <DatePicker
        style={styles.input}
        date={date}
        mode={mode}
        format="h:mm a"
        value={value}
        placeholder={mode == 'date' ? "select date" : "select time"}
        showIcon={false}
        is24Hour={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 0,
            borderWidth: 0,
            textAlign: 'left',
            alignSelf: 'flex-start',
            alignItems: 'flex-start'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={onDateChange}
      />}
      </View>
    );
  }
}