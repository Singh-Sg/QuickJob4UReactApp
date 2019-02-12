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
  StatusBar
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import { TextField, Check, Button } from '../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../config/formHandler';

export default class ForgotPassword extends Component {
  constructor(props){
    super(props)
    this.refs = []
    this.state = {
      loading: false,
      mobile_number: '',
      mobile_numberError: false
    }
  }

  static navigationOptions = () => {
    header: null
  }

  componentDidMount(){
    /* StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff'); */
  }

  componentWillUnmount(){
    /* StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#8e1919'); */
  }

  changePhoneNumber(number){
    this.setState({
      mobile_number: number
    })
  }

  forgot(){
    if(this.state.mobile_number){
      this.setState({
        loading: true
      })
      let data = {
        phone: this.state.mobile_number
      };
      postFormData(data, 'sendOtp', (response) => {
        if(response){
          this.setState({
            loading: false
          })
          this.props.navigation.navigate('OTP', {phone: this.state.mobile_number, otp: response[0].otp, forgot: true})
        }else {
          this.setState({
            loading: false
          })
        }
      })
    }else {
      this.setState({
        mobile_numberError: true
      })
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        {/* <TouchableNativeFeedback style={pageStyle.back} onPress={() => goBack()}>
        <View style={pageStyle.back}>
          <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
        </View>
        </TouchableNativeFeedback> */}
        <View style={pageStyle.topView}>
          {/* <Text style={pageStyle.mainText}>Forgot Password</Text> */}
          <Text style={pageStyle.subtext}>Enter the phone number to get OTP and follow instructions to reset your password</Text>
        </View>
        <KeyboardAvoidingView style={[styles.formView, {paddingHorizontal: '20%', justifyContent: 'flex-start'}]} behavior="padding">
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 7, marginBottom: 10, color: '#afafaf'}}>+61</Text>
            <TextField keyboardType="phone-pad" inputStyle={{borderBottomColor: this.state.mobile_numberError ? '#fa0000' : '#dedede'}} onChangeText={(number) => this.changePhoneNumber(number)} value={this.state.mobile_number} placeholder="Mobile Number" />
          </View>
          <Button loading={this.state.loading} onPress={() => this.forgot()} style={{width: 200, marginTop: 20}} text="SUBMIT" />
          </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}