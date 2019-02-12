import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import { TextField, Check, Button } from '../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../config/formHandler'

export default class CustomerRegister extends Component {
  constructor(props){
    super(props)
    this.state = {
      display_name: '',
      display_nameError: '',
      email_address: '',
      password: '',
      passwordError: '',
      confirm_password: '',
      confirm_passwordError: '',
      phone: '',
      phoneError: '',
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
    const { params } = this.props.navigation.state;
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
        user_type: params.professional ? 'professionals' : 'customer',
      }
      console.log(data)
      postFormData(data, 'userRegistration', (response) => {
        if(response){
          this.props.navigation.navigate('OTP', {phone: this.state.phone, otp: response[0].otp, professional: params.professional ? true : false})
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
    const { goBack, state } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={[styles.scrollViewContainer, {paddingTop: Platform.OS == 'ios' ? 40 : 0}]}>
        <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <View style={styles.topArea}>
            <TouchableOpacity style={pageStyle.back} onPress={() => goBack()}>
              <View style={[pageStyle.back, {position: 'relative', top: 0, left: 0}]}>
                <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
              </View>
            </TouchableOpacity>
            <View style={pageStyle.logoView}>
              <Text style={pageStyle.subtext}>Welcome to</Text>
              <Text style={pageStyle.logoText}>QuickJobs4u</Text>
              <Text style={pageStyle.subtext}>{state.params.professional ? 'Professional' : 'Customer'} Sign Up</Text>
            </View>
            <View style={[styles.formView, {paddingHorizontal: '20%'}]}>
              <TextField style={{width: '110%'}} inputStyle={{borderBottomColor: this.state.display_nameError ? '#fa0000' : '#dedede'}} onChangeText={(display_name) => this.setState({display_name})} placeholder="Display Name" />
              <TextField style={{width: '110%'}} inputStyle={{borderBottomColor: this.state.passwordError ? '#fa0000' : '#dedede'}} secureTextEntry onChangeText={(password) => this.setState({password})} placeholder="Password" />
              <TextField style={{width: '110%'}} inputStyle={{borderBottomColor: this.state.confirm_passwordError ? '#fa0000' : '#dedede'}} secureTextEntry onChangeText={(confirm_password) => this.setState({confirm_password})} placeholder="Confirm Password" />

              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 7, marginBottom: 10, color: '#afafaf'}}>+61</Text>
                <TextField inputStyle={{borderBottomColor: this.state.phoneError ? '#fa0000' : '#dedede'}} keyboardType="numeric" onChangeText={(phone) => {
                  if(phone){
                    if(/^\d+$/.test(phone)){
                      this.setState({phone})
                    }
                  }else {
                    this.setState({phone})
                  }
                }} value={this.state.phone} placeholder="Mobile Number" />
              </View>

              <Check italic onPress={() => this.setState({terms_agree: this.state.terms_agree ? false : true})} checked={this.state.terms_agree} text="I agree to the terms of use and privacy statements" />
              <Button loading={this.state.loading} onPress={() => this.signup()} style={{width: 200, marginTop: 20}} text="SIGN UP" />
            </View>
          </View>
          <View style={styles.bottomArea}>
            <View style={pageStyle.seperationView}>
              <View style={pageStyle.seperationLine} />
              <Text style={pageStyle.seperationText}>or</Text>
            </View>
            <View style={pageStyle.signinTextView}>
              <Text style={pageStyle.signinText}>Already have an account? <Text onPress={() => this.props.navigation.push('SignIn')} style={pageStyle.signinTextB}>Sign In</Text></Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}