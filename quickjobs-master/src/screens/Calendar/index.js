import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableNativeFeedback
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
const { width, height } = Dimensions.get('window')
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

export default class CalendarView extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: {}
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.scrollViewContainer}>
        <Agenda
          items={{
            '2018-04-18': [{text: 'item 1 - any js object'}],
            '2018-04-19': [{text: 'item 2 - any js object'}],
            '2018-04-20': [],
            '2018-04-21': [{text: 'item 3 - any js object'},{text: 'any js object'}],
          }}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
        />
      </View>
    );
  }

  loadItems(day) {
  }

  renderItem(item) {
    return (
      <View style={[pageStyle.item, {height: item.height}]}><Text>{item.text}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={pageStyle.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}