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
  TouchableNativeFeedback,
  AsyncStorage,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import { TextField, Check, Button } from '../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../config/formHandler';
import { getDeviceToken } from '../../config/firebase'
import CodeInput from 'react-native-confirmation-code-input';

export default class OTPView extends Component {
  constructor(props){
    super(props)
    this.refs = []
    this.state = {
      first: '',
      second: '',
      third: '',
      forth: '',
      fifth: '',
      sixth: '',
      loading: false,
      resendLoading: false,
      otp: false
    }
  }

  componentWillUnmount(){
    /* StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#8e1919'); */
  }

  componentDidMount(){
    /* StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff'); */
    const { params } = this.props.navigation.state;
    console.log('professionals', params.professional)
    this.setState({
      otp: params.otp
    })
  }

  changeInput(field, next, value){
    if(value){
      this.state[field] = value
      this.setState(this.state)
      if(field != 'sixth'){
        this[next].focus()
      }
    }else {
      this.state[field] = value
      this.setState(this.state)
    }
  }

  onSubmit(code){
    const { params } = this.props.navigation.state;
    let data = {
      phone: params.phone,
      otp: code
    };
    if(params.forgot){
      if(this.state.otp == code){
        this.props.navigation.navigate('ResetPassword', {phone: params.phone})
      }else {
        alert('OTP does not match')
        return false;
      }
    }else {
      this.setState({
        //loading: true
      })
      postFormData(data, 'verifyOTP', (response) => {
        if(response){
          AsyncStorage.setItem('user', JSON.stringify(response), () => {
            getDeviceToken((deviceID) => {
              if(deviceID){
                let deviceRequest = {
                  user_id: response.id,
                  device_type: Platform.OS == 'android' ? 1 : 2,
                  device_token: deviceID
                }
                console.log(deviceRequest)
                postFormData(deviceRequest, 'AddDevices', (deviceResponse) => {
                  if(deviceResponse){
                    if(params.professional){
                      this.props.navigation.navigate('SignedInPro')
                    }else {
                      this.props.navigation.navigate('SignedIn')
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
          })
          this.setState({
            loading: false
          })
        }else {
          this.setState({
            loading: false
          })
        }
      })
    }
  }

  resendOTP(){
    const { params } = this.props.navigation.state;
    this.setState({
      resendLoading: true
    })
    let data = {
      phone: params.phone
    };
    postFormData(data, 'sendOtp', (response) => {
      if(response){
        this.setState({
          otp: response[0].otp,
          resendLoading: false
        })
      }else {
        this.setState({
          resendLoading: false
        })
      }
    })
  }

  render() {
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
        <TouchableNativeFeedback style={pageStyle.back} onPress={() => goBack()}>
            <View style={[pageStyle.back, {position: 'relative', top: 0, left: 0}]}>
          <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
        </View>
        </TouchableNativeFeedback>
        <View style={pageStyle.topView}>
          <Text style={pageStyle.mainText}>Enter Verification Code</Text>
          <Text style={pageStyle.subtext}>We have sent 6 digit verification code on</Text>
          <Text style={pageStyle.mainText}>{params.phone}</Text>
          {/* <Text style={pageStyle.mainText}>{this.state.otp}</Text> */}
        </View>
        <View style={[styles.formView, {paddingHorizontal: '20%', flexDirection: 'row', width: '100%', marginTop: 40, paddingBottom: 0}]}>
          <CodeInput
            keyboardType="numeric"
            codeLength={6}
            compareWithCode={this.state.otp}
            autoFocus={false}
            activeColor="#28bfa8"
            codeInputStyle={{borderWidth: 1, borderColor: '#dedede', color: '#000'}}
            /* codeInputStyle={{borderWidth: 1, borderColor: '#dedede', fontFamily: 'Proxima Nova', color: '#000', fontWeight: '100' }} */
            containerStyle={{alignItems: 'center'}}
            onFulfill={(isValid, code) => {this.onSubmit(code)}}
          />
        </View>
          {!this.state.resendLoading && <Text onPress={() => this.resendOTP()} style={pageStyle.resend}>Resend OTP</Text>}
          {this.state.resendLoading && <ActivityIndicator size="small" color="green" style={{marginTop: 20}} />}
          <Button loading={this.state.loading} onPress={() => this.onSubmit(this.state.otp)} style={{width: 200, marginTop: 40}} text="SUBMIT" />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}