import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/FontAwesome";
import { postFormData } from '../../../config/formHandler'
var FileUpload = require('NativeModules').FileUpload
import RNFetchBlob from 'react-native-fetch-blob'
import FilePickerManager from 'react-native-file-picker';

export default class ContactUs extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      nameError: false,
      email: '',
      emailError: false,
      phone: '',
      phoneError: false,
      subject: '',
      subjectError: false,
      message: '',
      messageError: false,
      file: false,
      loading: false,
      submitted: false
    }
  }

  static navigationOptions = { tabBarVisible: false }

  componentWillMount(){
    const { params } = this.props.navigation.state
  }

  chooseFile(){
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],

    },(error,res) => {
      console.log(
         res.uri,
         res.type,
         res.fileName,
         res.fileSize
      );
      if(error){
        console.log('DocumentPicker Error: ', error);
      }
      else{
        this.setState({
          file: res
        });
      }

    });
  }

  submit(){
    let error = 0;
    if(!this.state.name){
      this.setState({
        nameError: true
      })
      error = 1;
    }else {
      this.setState({
        nameError: false
      })
    }
    if(!this.state.email){
      this.setState({
        emailError: true
      })
      error = 1;
    }else {
      this.setState({
        emailError: false
      })
    }
    if(!this.state.subject){
      this.setState({
        subjectError: true
      })
      error = 1;
    }else {
      this.setState({
        subjectError: false
      })
    }
    if(!this.state.message){
      this.setState({
        messageError: true
      })
      error = 1;
    }else {
      this.setState({
        messageError: false
      })
    }
    if(error == 1){
      return;
    }
    this.setState({
      loading: true
    })
    let form_data = [
      { name : 'name', data : String(this.state.name)},
      { name : 'email_id', data : String(this.state.email)},
      { name : 'phone', data : String(this.state.phone)},
      { name : 'subject', data : String(this.state.subject)},
      { name : 'message', data : String(this.state.message)},
    ]
    if(this.state.file){
      let ret = String(this.state.file.uri).replace('file:///','');
      form_data.push({
        name : 'image',
        filename : this.state.file.fileName,
        type: this.state.file.type,
        data: RNFetchBlob.wrap(ret)
      })
    }
    console.log(form_data);
    RNFetchBlob.fetch('POST', 'https://quickjobs4u.com.au/api/home/contact', {
      'Content-Type' : 'multipart/form-data',
    }, form_data).then((resp) => {
      this.setState({
        loading: false,
        submitted: true,
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        file: false
      })
    }).catch((err) => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={styles.formView} behavior="padding">
          <TextField required value={this.state.name} inputStyle={{borderBottomColor: this.state.nameError ? '#fa0000' : '#dedede'}} onChangeText={(name) => this.setState({name})} label="Enter Your Name" />
          <TextField keyboardType="email-address" required value={this.state.email} inputStyle={{borderBottomColor: this.state.emailError ? '#fa0000' : '#dedede'}} onChangeText={(email) => this.setState({email})} label="Enter Email" />
          <TextField keyboardType="phone-pad" value={this.state.phone} onChangeText={(phone) => this.setState({phone})} label="Enter Mobile Number" />
          <TextField value={this.state.subject} required inputStyle={{borderBottomColor: this.state.subjectError ? '#fa0000' : '#dedede'}} onChangeText={(subject) => this.setState({subject})} label="Enter Subject" />
          <TextField value={this.state.message} multiline numberOfLines={6} required inputStyle={{borderBottomColor: this.state.messageError ? '#fa0000' : '#dedede'}} onChangeText={(message) => this.setState({message})} label="Message" />
          <TouchableNativeFeedback onPress={() => this.chooseFile()}>
            <View style={pageStyle.attachView}>
              <Icon name="paperclip" size={20} color="#afafaf" />
              {!this.state.file && <Text style={pageStyle.attachText}>Attach File</Text>}
              {this.state.file && <Text style={pageStyle.attachText}>{this.state.file.path}</Text>}
            </View>
          </TouchableNativeFeedback>
          {!this.state.submitted && <Button containerStyle={{width: '40%', marginTop: '10%'}} style={{backgroundColor: '#cf2525', paddingVertical: 10, height: 40}} loading={this.state.loading} onPress={() => this.submit()} text="SEND" />}
          {this.state.submitted && <Text style={pageStyle.submittedMessage}>Your message has been submitted.</Text>}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}