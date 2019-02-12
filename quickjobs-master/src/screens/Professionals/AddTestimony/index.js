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
  Alert
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData, postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';

export default class AddTestimony extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      name: '',
      nameError: false,
      testimony: '',
      testimonyError: false,
      saveTestimonyLoading: false,
      user: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.testimony ? 'Edit Testimony' : 'Add Testimony' : 'Add Testimony',
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    if(params){
      if(params.testimony){
        this.setState({
          name: params.testimony.name,
          testimony: params.testimony.details
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

  addTestimony(){
    const { params } = this.props.navigation.state;
    error = 0
    if(!this.state.name){
      this.setState({
        nameError: true
      })
      error = 1
    }else {
      this.setState({
        nameError: false
      })
    }
    if(!this.state.testimony){
      this.setState({
        testimonyError: true
      })
      error = 1
    }else {
      this.setState({
        testimonyError: false
      })
    }
    if(error == 1){
      return;
    }
    this.setState({
      saveTestimonyLoading: true
    })
    let data;
    if(params){
      if(params.testimony){
        data = {
          id: params.testimony.id,
          name: this.state.name,
          details: this.state.testimony
        }
      }
    }else {
      data = {
        user_id: this.state.user.id,
        name: this.state.name,
        details: this.state.testimony
      }
    }
    console.log(data)
    postFormData(data, params ? params.testimony ? 'editTestimoney' : 'addTestimoney' : 'addTestimoney', (response) => {
      console.log(response)
      this.setState({
        saveTestimonyLoading: false
      })
      StateManager.getInstance().receiveData(response);
      this.props.navigation.goBack();
    })
  }

  render() {
    const { name, testimony } = this.state;
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <View style={styles.scrollViewContainer}>
        <View style={[styles.formView, {justifyContent: 'flex-start'}]}>
          <TextField value={this.state.name} inputStyle={{borderBottomColor: this.state.nameError ? '#fa0000' : '#dedede'}} onChangeText={(name) => this.setState({name})} label="Name/Organisation" />
          <TextField value={this.state.testimony} inputStyle={{borderBottomColor: this.state.testimonyError ? '#fa0000' : '#dedede'}} onChangeText={(testimony) => this.setState({testimony})} label="Testimony Details" multiline numberOfLines={6} />
          <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.saveTestimonyLoading} text="SUBMIT" onPress={() => this.addTestimony()} />
        </View>
      </View>
    );
  }
}