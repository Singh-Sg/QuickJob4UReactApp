import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  AsyncStorage
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, Check, TextFieldAddress, DateField } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../config/formHandler';
import { onSignIn } from '../../../routes/auth'
import StateManager from '../../StateManager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      display_name: '',
      gender: '',
      dob: '',
      email: '',
      address: '',
      addressError: false,
      neighbourhood: '',
      postal_code: '',
      phone_number: '',
      lat: '',
      lng: '',
      user: '',
      loading: false
    }
  }

  static navigationOptions = { tabBarVisible: false }

  componentWillMount(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result,
        display_name: result.name,
        gender: result.gender,
        dob: result.dob,
        email: result.email,
        lat: result.add1_latitude,
        lng: result.add1_longitude,
        address: result.address1,
        neighbourhood: result.neighbourhood,
        phone_number: result.phone
      })
    })
  }

  saveData(){
    if(this.state.agree){
      const { goBack } = this.props.navigation;
      let data = {
        user_id: this.state.user.id,
        display_name: this.state.display_name,
        email: this.state.email,
        gender: this.state.gender,
        dob: this.state.dob,
        address1: this.state.address,
        lat: this.state.lat,
        lng: this.state.lng,
        phone: this.state.phone_number,
        neighbourhood: this.state.neighbourhood
      }
      if(!this.state.address){
        this.setState({
          addressError: true
        })
      }else {
        this.setState({
          addressError: false,
          loading: true
        })
        postFormData(data, 'editCustomerProfile', (response) => {
          if(response){
            onSignIn(response)
            this.setState({
              loading: false
            })
            StateManager.getInstance().receiveData();
            goBack()
          }else {
            this.setState({
              loading: false
            })
          }
        })
      }
    }else {
      alert('Please agree to terms of use')
    }
  }

  render() {
    return (
        <KeyboardAwareScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <View style={[styles.formView, {justifyContent: 'flex-start'}]}>
            <TextField onChangeText={(display_name) => this.setState({display_name})} value={this.state.display_name} label="Display Name" />
            <Check checked={this.state.gender == 'male' ? true : false} onPress={() => this.setState({gender: 'male'})} round text="Male" label="Gender" />
            <Check checked={this.state.gender == 'female' ? true : false} onPress={() => this.setState({gender: 'female'})} round text="Female" />
            <DateField format="DD/MM/YYYY" mode="date" onDateChange={(dob) => {this.setState({dob})}} date={this.state.dob} label="Date of Birth" />
            <TextField onChangeText={(email) => this.setState({email})} value={this.state.email} label="Email Address" />
            <TextFieldAddress required style={{borderBottomColor: this.state.addressError ? '#fa0000' : '#dedede'}} value={this.state.address} onPress={(data, details = null) => {
              this.setState({
                address: details.formatted_address,
                neighbourhood: details.name,
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
                addressError: false
              })
            }} label="Address Line 1" />
            <TextField editable={false} onChangeText={(neighbourhood) => this.setState({neighbourhood})} value={this.state.neighbourhood} label="Suburb / Neighbourhood" />
            <TextField editable={false} onChangeText={(phone_number) => this.setState({phone_number})} value={this.state.phone_number} label="Phone Number" />
            <Check onPress={() => this.setState({agree: this.state.agree ? false : true})} checked={this.state.agree} text="I agree to the terms of use and privacy statments" />
            <Button style={{backgroundColor: '#cf2525', paddingVertical: 10}} loading={this.state.loading} onPress={() => this.saveData()} text="SUBMIT" />
          </View>
        </KeyboardAwareScrollView>
    );
  }
}