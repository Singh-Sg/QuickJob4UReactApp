import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../config/formHandler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ProChangePassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: false,
      old_password: '',
      old_passwordError: '',
      new_password: '',
      new_passwordError: '',
      confirm_password: '',
      confirm_passwordError: '',
      loading: false
    }
  }

  static navigationOptions = {
    //header: null,
    tabBarVisible: false
  }

  /* componentDidMount(){
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }

  componentWillUnmount(){
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#8e1919');
  } */

  componentWillMount(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      })
    })
  }

  saveData(){
    const { goBack } = this.props.navigation;
    let error = 0;
    if(!this.state.old_password){
      this.setState({
        old_passwordError: true
      })
      error = 1;
    }else {
      this.setState({
        old_passwordError: false
      })
    }
    if(!this.state.new_password){
      this.setState({
        new_passwordError: true
      })
      error = 1;
    }else {
      this.setState({
        new_passwordError: false
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
    if(error == 1){
      return;
    }
    this.setState({
      loading: true
    })
    let data = {
      user_id: this.state.user.id,
      old_password: this.state.old_password,
      new_password: this.state.new_password,
      confirm_password: this.state.confirm_password
    }
    postFormData(data, 'changePassword', (response) => {
      if(response){
        this.setState({
          loading: false
        })
        goBack()
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
      <KeyboardAwareScrollView style={[styles.scrollViewContainer, {paddingTop: Platform.OS == 'ios' ? 40 : 0}]} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity style={pageStyle.back} onPress={() => goBack()}>
            <View style={pageStyle.back}>
              <Icon name="keyboard-arrow-left" size={36} color="#cf2525" />
            </View>
          </TouchableOpacity>
          <View style={pageStyle.topView}>
            <Text style={pageStyle.mainText}>Change Password</Text>
          </View>
          <View style={[styles.formView, {paddingHorizontal: '20%', justifyContent: 'flex-start', marginTop: '10%', height: 300}]} behavior="padding">
            <TextField inputStyle={{borderBottomColor: this.state.old_passwordError ? '#fa0000' : '#dedede'}} secureTextEntry onChangeText={(old_password) => this.setState({old_password})} value={this.state.old_password} placeholder="Old Password" />
            <TextField inputStyle={{borderBottomColor: this.state.new_passwordError ? '#fa0000' : '#dedede'}} secureTextEntry onChangeText={(new_password) => this.setState({new_password})} value={this.state.new_password} placeholder="Enter Password" />
            <TextField inputStyle={{borderBottomColor: this.state.confirm_passwordError ? '#fa0000' : '#dedede'}} secureTextEntry onChangeText={(confirm_password) => this.setState({confirm_password})} placeholder="Confirm Password" />
            <Button loading={this.state.loading} onPress={() => this.saveData()} style={{width: 200, marginTop: 20, paddingVertical: 10}} text="SUBMIT" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}