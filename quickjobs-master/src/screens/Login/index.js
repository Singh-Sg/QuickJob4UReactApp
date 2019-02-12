import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../config/formHandler'
import { getDeviceToken, dummyNoti } from '../../config/firebase'
import { onSignIn } from '../../routes/auth'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      phoneError: false,
      password: '',
      passwordError: false,
      loading: false
    }
  }

  /* componentDidMount(){
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }

  componentWillUnmount(){
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#8e1919');
  } */

  login(){
    let error = 0;
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
    if(error == 1){
      return;
    }
    this.setState({
      loading: true
    })
    let data = {
      phone: this.state.phone,
      password: this.state.password
    }
    postFormData(data, 'login', (response) => {
      if(response){
        getDeviceToken((deviceID) => {
          if(deviceID){
            let deviceRequest = {
              user_id: response.id,
              device_type: Platform.OS == 'android' ? 1 : 2,
              device_token: deviceID
            }
            postFormData(deviceRequest, 'AddDevices', (deviceResponse) => {
              if(deviceResponse){
                onSignIn(response)
                console.log(response.user_type)
                if(response.user_type == 'customer'){
                  //this.props.navigation.goBack()
                  this.props.navigation.navigate('SignedIn')
                }else {
                  this.props.navigation.navigate('SignedInPro')
                }
              }
              this.setState({
                loading: false
              })
            })
          }else {
            this.setState({
              loading: false
            })
          }
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={[styles.scrollViewContainer, {paddingTop: Platform.OS == 'ios' ? 40 : 0}]} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <View style={styles.topArea}>
          <TouchableOpacity style={pageStyle.back} onPress={() => goBack()}>
            <View style={[pageStyle.back, {position: 'relative', top: 0, left: 0}]}>
              <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
            </View>
          </TouchableOpacity>
          <View style={pageStyle.logoView}>
            <Text style={pageStyle.subtext}>Welcome back to</Text>
            <Text style={pageStyle.logoText}>QuickJobs4u</Text>
            <Text style={pageStyle.subtext}>Sign In</Text>
          </View>
          <KeyboardAvoidingView style={[styles.formView, {paddingHorizontal: '20%'}]} behavior="padding">
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 7, marginBottom: 10, color: '#afafaf'}}>+61</Text>
              <TextField inputStyle={{borderBottomColor: this.state.phoneError ? '#fa0000' : '#dedede'}} keyboardType="phone-pad" onChangeText={(phone) => {
                if(phone){
                  if(/^\d+$/.test(phone)){
                    this.setState({phone})
                  }
                }else {
                  this.setState({phone})
                }
              }} value={this.state.phone} placeholder="Mobile Number" />
            </View>
            <TextField style={{width: '110%'}} inputStyle={{borderBottomColor: this.state.passwordError ? '#fa0000' : '#dedede'}} secureTextEntry onChangeText={(password) => this.setState({password})} placeholder="Password" value={this.state.password} />
            <Button loading={this.state.loading} onPress={() => this.login()} style={{width: 200, marginTop: 20}} text="SIGN IN" />
            <Text onPress={() => this.props.navigation.push('Forgot')} style={pageStyle.forgot}>Forgot Password?</Text>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.bottomArea}>
          <View style={pageStyle.seperationView}>
            <View style={pageStyle.seperationLine} />
            <Text style={pageStyle.seperationText}>or</Text>
          </View>
          <View style={pageStyle.signinTextView}>
            <Text style={pageStyle.signinText}>Don't have an account? <Text style={pageStyle.signinTextB}>Sign Up</Text> as</Text>
          </View>
          <View style={pageStyle.signUpType}>
            <TouchableOpacity onPress={() => this.props.navigation.push('CustomerSignUp', {professional: false})} style={[pageStyle.signUpButton, {borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0}]}>
              <View style={[pageStyle.signUpButton, {flex: 1}]}>
                <Text style={pageStyle.signUpButtonText}>CUSTOMER</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.push('CustomerSignUp', {professional: true})} style={[pageStyle.signUpButton, {borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0}]}>
              <View style={[pageStyle.signUpButton, {flex: 1}]}>
                <Text style={pageStyle.signUpButtonText}>PROFESSIONAL</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}