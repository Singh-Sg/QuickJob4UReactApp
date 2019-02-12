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
import { onSignIn } from '../../routes/auth'

export default class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.refs = []
    this.state = {
      loading: false,
      password: '',
      passwordError: false,
      confirm_password: '',
      confirmPasswordError: false,
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

  resetPassword(){
    const { params } = this.props.navigation.state;
    if(!this.state.password){
      this.setState({
        passwordError: true
      })
      return;
    }else {
      this.setState({
        passwordError: false
      })
    }
    if(!this.state.confirm_password){
      this.setState({
        confirmPasswordError: true
      })
      return;
    }else {
      this.setState({
        confirmPasswordError: false
      })
    }
    this.setState({
      loading: true
    })
    let data = {
      phone: params.phone,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    }
    postFormData(data, 'resetPassword', (response) => {
      if(response){
        if(response.user_type == 'professionals'){
          onSignIn(response)
          this.props.navigation.navigate('SignedInPro')
        }else {
          onSignIn(response)
          this.props.navigation.navigate('SignedIn')
        }
      }
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <TouchableNativeFeedback onPress={() => goBack()}>
        <View style={pageStyle.back}>
          <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
        </View>
        </TouchableNativeFeedback>
        <View style={pageStyle.topView}>
          <Text style={pageStyle.mainText}>Reset Password</Text>
        </View>
        <KeyboardAvoidingView style={[styles.formView, {paddingHorizontal: '20%', justifyContent: 'flex-start', paddingTop: '15%'}]} behavior="padding">
            <TextField secureTextEntry inputStyle={{borderBottomColor: this.state.passwordError ? '#fa0000' : '#dedede'}} onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder="New Password" />
            <TextField secureTextEntry inputStyle={{borderBottomColor: this.state.confirmPasswordError ? '#fa0000' : '#dedede'}} onChangeText={(confirm_password) => this.setState({confirm_password})} value={this.state.confirm_password} placeholder="Confirm Password" />
            <Button loading={this.state.loading} onPress={() => this.resetPassword()} style={{width: 200, marginTop: 20}} text="SUBMIT" />
          </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}