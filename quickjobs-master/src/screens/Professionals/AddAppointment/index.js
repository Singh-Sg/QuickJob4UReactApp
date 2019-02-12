import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, DateField } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData, postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class AddAppointment extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      title: '',
      titleError: false,
      location: '',
      locationError: false,
      date: '',
      dateError: false,
      description: '',
      descriptionError: false,
      saveLoading: false,
      user: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.appointment ? 'Edit Appointment' : 'Add Appointment' : 'Add Appointment',
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    if(params){
      if(params.appointment){

        let changeDate = params.appointment.date.split('-')
        changeDate = changeDate[2]+'/'+changeDate[1]+'/'+changeDate[0]
        
        this.setState({
          title: params.appointment.job_title,
          location: params.appointment.location,
          date: changeDate,
          description: params.appointment.description
        })
      }
    }
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      })
    })
  }

  addAppointment(){
    const { params } = this.props.navigation.state;
    error = 0
    if(!this.state.title){
      this.setState({
        titleError: true
      })
      error = 1
    }else {
      this.setState({
        titleError: false
      })
    }
    if(!this.state.location){
      this.setState({
        locationError: true
      })
      error = 1
    }else {
      this.setState({
        locationError: false
      })
    }
    if(!this.state.date){
      this.setState({
        dateError: true
      })
      error = 1
    }else {
      this.setState({
        dateError: false
      })
    }
    if(!this.state.description){
      this.setState({
        descriptionError: true
      })
      error = 1
    }else {
      this.setState({
        descriptionError: false
      })
    }
    if(error == 1){
      return;
    }
    this.setState({
      saveLoading: true
    })
    let data;
    if(params){
      if(params.appointment){
        data = {
          id: params.appointment.id,
          job_title: this.state.title,
          location: this.state.location,
          description: this.state.description,
          date: this.state.date
        }
      }
    }else {
      data = {
        user_id: this.state.user.id,
        job_title: this.state.title,
        location: this.state.location,
        description: this.state.description,
        date: this.state.date
      }
    }
    let changeDate = data.date.split('/')
    changeDate = changeDate[2]+'-'+changeDate[1]+'-'+changeDate[0]
    data.date = changeDate
    postFormData(data, params ? params.appointment ? 'editAppointment' : 'addAppointment' : 'addAppointment', (response) => {
      this.setState({
        saveLoading: false
      })
      StateManager.getInstance().receiveData(params ? params.appointment ? {type:'edited',data} : {type:'success',data} : {type:'success',data});
      this.props.navigation.goBack();
    })
  }

  render() {
    const { title, location, date, description } = this.state;
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
        <KeyboardAwareScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="always">
          <View style={[styles.formView, {justifyContent: 'flex-start'}]}>
            <TextField value={title} inputStyle={{borderBottomColor: this.state.titleError ? '#fa0000' : '#dedede'}} onChangeText={(title) => this.setState({title})} label="Job Title" />
            <TextField value={location} inputStyle={{borderBottomColor: this.state.locationError ? '#fa0000' : '#dedede'}} onChangeText={(location) => this.setState({location})} label="Location" />
            <DateField date={date} format="DD/MM/YYYY" mode="date" style={{borderBottomColor: this.state.date ? '#fa0000' : '#dedede'}} onDateChange={(date) => this.setState({date})} label="Date" />
            <TextField value={description} inputStyle={{borderBottomColor: this.state.descriptionError ? '#fa0000' : '#dedede'}} onChangeText={(description) => this.setState({description})} label="Description" multiline numberOfLines={6} />
            <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.saveLoading} text="SUBMIT" onPress={() => this.addAppointment()} />
          </View>
        </KeyboardAwareScrollView>
    );
  }
}