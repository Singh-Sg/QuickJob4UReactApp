import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StatusBar,
  TouchableNativeFeedback
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import { TextField, Check, Button } from '../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../config/formHandler'

export default class ProfessionalRegister extends Component {
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      phone: '',
      email_address: '',
      password: '',
      confirm_password: '',
      terms_agree: false,
      loading: false
    }
  }

  componentDidMount(){
    /* StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff'); */
  }

  componentWillUnmount(){
    /* StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#8e1919'); */
  }

  signup(){
    if(this.state.terms_agree){
      let error = 0;
      if(!this.state.display_name){
        this.setState({
          display_nameError: true
        })
        error = 1;
      }else {
        this.setState({
          display_nameError: false
        })
      }
      if(!this.state.password){
        this.setState({
          passwordError: true
        })
        error = 1;
      }else {
        this.setState({
          passwordError: false
        })
      }
      if(!this.state.confirm_password){
        this.setState({
          confirm_passwordError: true
        })
        error = 1;
      }else {
        this.setState({
          confirm_passwordError: false
        })
      }
      if(!this.state.phone){
        this.setState({
          phoneError: true
        })
        error = 1;
      }else {
        this.setState({
          phoneError: false
        })
      }
      if(error == 1){
        return;
      }
      this.setState({
        loading: true
      })
      let data = {
        display_name: this.state.display_name,
        phone: this.state.phone,
        u_password: this.state.password,
        confirm_password: this.state.confirm_password,
        user_type: 'professionals',
      }
      postFormData(data, 'userRegistration', (response) => {
        if(response){
          this.props.navigation.navigate('OTP', {phone: this.state.phone, otp: response[0].otp})
        }
        this.setState({
          loading: false
        })
      })
    }else {
      alert('Please agree to terms of use')
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.scrollViewContainer}>
        <View style={styles.topArea}>
          <TouchableNativeFeedback onPress={() => goBack()}>
          <View style={pageStyle.back}>
            <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
          </View>
          </TouchableNativeFeedback>
          <View style={pageStyle.logoView}>
            <Text style={pageStyle.subtext}>Welcome to</Text>
            <Text style={pageStyle.logoText}>QuickJobs4u</Text>
            <Text style={pageStyle.subtext}>Professional Sign Up</Text>
          </View>
          <KeyboardAvoidingView style={[styles.formView, {paddingHorizontal: '20%'}]} behavior="padding">
            <TextField onChangeText={(first_name) => this.setState({first_name})} value={this.state.first_name} placeholder="Business Name" />
            <TextField onChangeText={(phone) => this.setState({phone})} value={this.state.phone} placeholder="Phone Number" />
            {/* <TextField onChangeText={(email_address) => this.setState({email_address})} placeholder="Email Address" /> */}
            <TextField secureTextEntry onChangeText={(password) => this.setState({password})} placeholder="Enter Password" />
            <TextField secureTextEntry onChangeText={(confirm_password) => this.setState({confirm_password})} placeholder="Confirm Password" />
            {/* <Check onPress={() => this.setState({terms_agree: this.state.terms_agree ? false : true})} checked={this.state.terms_agree} text="I agree to the terms of use and privacy statements" /> */}
            <Button loading={this.state.loading} style={{width: 200, marginTop: 20}} text="SIGN UP" />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.bottomArea}>
          <View style={pageStyle.seperationView}>
            <View style={pageStyle.seperationLine} />
            <Text style={pageStyle.seperationText}>or</Text>
          </View>
          <View style={pageStyle.signinTextView}>
            <Text style={pageStyle.signinText}>Already have an account? <Text style={pageStyle.signinTextB}>Sign In</Text></Text>
          </View>
        </View>
      </View>
    );
  }
}