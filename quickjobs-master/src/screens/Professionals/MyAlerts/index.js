import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  AsyncStorage
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, Check, DropDown } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../config/formHandler';
import { onSignIn } from '../../../routes/auth'

export default class MyAlertsPro extends Component {
  constructor(props){
    super(props)
    this.state = {
      sms: false,
      email: false,
      notification: false,
      best_time: [
        {
          id: 'morning',
          name: 'Morning'
        },
        {
          id: 'noon',
          name: 'Noon'
        },
        {
          id: 'evening',
          name: 'Evening'
        },
        {
          id: 'night',
          name: 'Night'
        }
      ],
      selected_best_time: 'evening',
      loading: false,
      user: false
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result,
        sms: result.sms_notification == 'No' ? false : true,
        email: result.email_notification == 'No' ? false : true,
        notification: result.app_notification == 'No' ? false : true,
        selected_best_time: result.preferd_time
      })
    })
  }

  saveData(){
    const { goBack } = this.props.navigation;
    this.setState({
      loading: true
    })
    let data = {
      user_id: this.state.user.id,
      sms_notification: this.state.sms ? 'yes' : 'no',
      email_notification: this.state.email ? 'yes' : 'no',
      app_notification: this.state.notification ? 'yes' : 'no',
      preferd_time: this.state.selected_best_time
    }
    console.log(data)
    postFormData(data, 'myAlert', (response) => {
      console.log(response)
      if(response){
        onSignIn(response)
        this.setState({
          loading: false
        })
        goBack()
        //goBack()
      }else {
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    return (
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <View style={pageStyle.listing}>
          <TouchableOpacity>
            <View style={pageStyle.listItem}>
              <Text style={pageStyle.listItemText}>SMS</Text>
              <Switch onTintColor={Platform.OS == 'android' ? "#fb8519" : "#efefef"} thumbTintColor="#fb8519" value={this.state.sms} onValueChange={() => this.setState({
                sms: this.state.sms ? false : true
              })} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={pageStyle.listItem}>
              <Text style={pageStyle.listItemText}>EMAIL</Text>
              <Switch onTintColor={Platform.OS == 'android' ? "#fb8519" : "#efefef"} thumbTintColor="#fb8519" value={this.state.email} onValueChange={() => this.setState({
                email: this.state.email ? false : true
              })} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={pageStyle.listItem}>
              <Text style={pageStyle.listItemText}>App Notification</Text>
              <Switch onTintColor={Platform.OS == 'android' ? "#fb8519" : "#efefef"} thumbTintColor="#fb8519" value={this.state.notification} onValueChange={() => this.setState({
                notification: this.state.notification ? false : true
              })} />
            </View>
          </TouchableOpacity>
          {/* <DropDown selectType="name" value={this.state.selected_best_time} onValueChange={(value) => this.setState({selected_best_time: value})} style={{paddingHorizontal: 20}} labelStyle={{fontSize: 14}} label="Best Time" pickers={this.state.best_time} /> */}
          <Button containerStyle={{paddingHorizontal: '20%'}} style={{backgroundColor: '#fb8519', paddingVertical: 10}} text="SAVE" onPress={() => this.saveData()} loading={this.state.loading} />
        </View>
      </ScrollView>
    );
  }
}