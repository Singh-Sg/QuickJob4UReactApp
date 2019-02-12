import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, DateField, DropDown } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from "react-native-image-picker";
import { postFormData, getFormData } from '../../../config/formHandler'
var FileUpload = require('NativeModules').FileUpload
import RNFetchBlob from 'react-native-fetch-blob'
import StateManager from '../../StateManager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class VerifiedBadge extends Component {
  constructor(props){
    super(props)
    this.state = {
      accreditation: [],
      selected_accreditation: '',
      accreditationError: false,
      other_accreditation: '',
      other_accreditationError: false,
      provider_name: '',
      provider_nameError: false,
      ticket_name: '',
      ticket_nameError: false,
      expiry_date: '',
      expiry_dateError: false,
      image: false,
      imageLoading: false,
      loading: true,
      user: false,
      buttonLoading: false,
      imagePath: false
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    if(params){
      if(params.document){
        console.log(params.document)
        this.setState({
          id: params.document.id,
          selected_accreditation: params.document.accreditation,
          other_accreditation: params.document.other_value ? params.document.other_value : '',
          provider_name: params.document.provider_name,
          ticket_name: params.document.ticket_name,
          expiry_date: params.document.expiry_date,
          image: params.document.image ? {uri: params.document.image} : false
        })
      }
    }
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        this.setState({
          user: result
        }, () => {
          getFormData('getAccreditations', (response) => {
            if(response){
              response.push({
                  "id": 'other',
                  "name": "Other"
              })
              this.setState({
                accreditation: response,
                selected_accreditation: params ? params.document ? params.document.accreditation : response[0].id : response[0].id
              })
            }
            this.setState({
              loading: false
            })
          })
        })
      }
    })
  }

  openCamera(){
    var options = {}
    ImagePicker.launchCamera(options, (response)  => {
      if (response.didCancel) {
        this.setState({
          imageLoading: false
        })
      }
      else if (response.error) {
        this.setState({
          imageLoading: false
        })
      }
      else {
        let source = { uri: response.uri };
    
        this.setState({
          image: source,
          imagePath: Platform.OS == 'android' ? response.path : response.uri
        });
      }
    });
  }

  openLibrary(){
    var options = {}
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        this.setState({
          imageLoading: false
        })
      }
      else if (response.error) {
        this.setState({
          imageLoading: false
        })
      }
      else {
        let source = { uri: response.uri };
    
        this.setState({
          image: source,
          imagePath: Platform.OS == 'android' ? response.path : response.uri
        });
      }
    });
  }

  addDocument(){
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let error = 0
    if(!this.state.accreditation){
      this.setState({
        accreditationError: true
      })
      error = 1
    }else {
      this.setState({
        accreditationError: false
      })
    }
    if(!this.state.provider_name){
      this.setState({
        provider_nameError: true
      })
      error = 1
    }else {
      this.setState({
        provider_nameError: false
      })
    }
    if(!this.state.ticket_name){
      this.setState({
        ticket_nameError: true
      })
      error = 1
    }else {
      this.setState({
        ticket_nameError: false
      })
    }
    if(!this.state.expiry_date){
      this.setState({
        expiry_dateError: true
      })
      error = 1
    }else {
      this.setState({
        expiry_dateError: false
      })
    }
    if(error == 1){
      return;
    }
    this.setState({
      buttonLoading: true
    })
    let form_data;
    if(params){
      if(params.document){
        form_data = [
          { name : 'id', data : String(this.state.id)},
          { name : 'user_id', data : String(this.state.user.id)},
          { name : 'accreditation_id', data : String(this.state.selected_accreditation)},
          { name : 'provider_name', data : String(this.state.provider_name)},
          { name : 'ticket_name', data : String(this.state.ticket_name)},
          { name : 'expiry_date', data : String(this.state.expiry_date)},
        ]
      }
    }else {
      form_data = [
        { name : 'user_id', data : String(this.state.user.id)},
        { name : 'accreditation_id', data : String(this.state.selected_accreditation)},
        { name : 'provider_name', data : String(this.state.provider_name)},
        { name : 'ticket_name', data : String(this.state.ticket_name)},
        { name : 'expiry_date', data : String(this.state.expiry_date)},
      ]
    }
    if(this.state.selected_accreditation == 'other'){
      form_data.push({ name : 'other', data : String(this.state.other_accreditation)})
    }
    if(this.state.image){
      form_data.push({
        name : 'image',
        filename : 'imagefile.png',
        type:'image/jpeg',
        data: RNFetchBlob.wrap(this.state.imagePath)
      })
    }
    let postURL
    if(params){
      postURL = 'https://quickjobs4u.com.au/api/home/editAccreditations'
    }else {
      postURL = 'https://quickjobs4u.com.au/api/home/addAccreditations'
    }
    RNFetchBlob.fetch('POST', postURL, {
      'Content-Type' : 'multipart/form-data',
    }, form_data).then((resp) => {
      this.setState({
        buttonLoading: false
      })
      StateManager.getInstance().receiveData(resp);
      goBack();
    }).catch((err) => {
      this.setState({
        buttonLoading: false
      })
    })
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={[styles.scrollViewContainer, {padding: 20}]}>
        <Image style={pageStyle.certificate} source={require('../../../assets/images/certificate.png')} />
        <View style={pageStyle.loginTextView}>
          <Text style={pageStyle.loginText}>TO GET VERIFIED BADGE, UPLOAD DOCUMENTS</Text>
        </View>
        <DropDown selectType="name" value={this.state.selected_accreditation} onValueChange={(value) => this.setState({selected_accreditation: value})} labelStyle={{fontSize: 14}} label="Accreditation" pickers={this.state.accreditation} />
        {this.state.selected_accreditation == 'other' && <TextField inputStyle={{borderBottomColor: this.state.other_accreditationError ? '#fa0000' : '#dedede'}} onChangeText={(text) => {this.setState({other_accreditation: text})}} value={this.state.other_accreditation} label="Other" />}
        <TextField value={this.state.provider_name} inputStyle={{borderBottomColor: this.state.provider_nameError ? '#fa0000' : '#dedede'}} onChangeText={(text) => {this.setState({provider_name: text})}} label="Provider Name" />
        <TextField value={this.state.ticket_name} inputStyle={{borderBottomColor: this.state.ticket_nameError ? '#fa0000' : '#dedede'}} onChangeText={(text) => {this.setState({ticket_name: text})}} label="Ticket Name" />
        <DateField format="DD/MM/YYYY" inputStyle={{borderBottomColor: this.state.expiry_dateError ? '#fa0000' : '#dedede'}} onDateChange={(text) => {this.setState({expiry_date: text})}} mode="date" label="Expiry Date" date={this.state.expiry_date} />
        <Text style={pageStyle.imageHeading} numberOfLines={1} ellipsizeMode='tail'>CHOOSE AN OPTION TO UPLOAD RELAVENT IMAGES</Text>
        {this.state.image && 
          <ImageBackground source={this.state.image} style={pageStyle.image}>
            <TouchableOpacity onPress={() => this.setState({image: false})}>
              <View style={pageStyle.closeIconView}>
                <Icon name="clear" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        }
        {!this.state.image && <View style={pageStyle.uploadImageView}>
          <TouchableOpacity style={[pageStyle.uploadImageBlock, {paddingVertical: 0, borderWidth: 0}]} onPress={() => this.openCamera()}>
            <View style={pageStyle.uploadImageBlock}>
              <Icon name="camera" size={50} color="#a2a2a2" />
              <Text style={pageStyle.uploadText}>CAMERA</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[pageStyle.uploadImageBlock, {paddingVertical: 0, borderWidth: 0}]} onPress={() => this.openLibrary()}>
            <View style={[pageStyle.uploadImageBlock, {borderLeftWidth: 0}]}>
              <Icon name="photo-library" size={50} color="#a2a2a2" />
              <Text style={pageStyle.uploadText}>GALLERY</Text>
            </View>
          </TouchableOpacity>
        </View>}
        <Button loading={this.state.buttonLoading} containerStyle={{marginVertical: 40}} style={{backgroundColor: '#fb8519', paddingVertical: 10, width: '60%'}} text="SUBMIT" onPress={() => this.addDocument()} />
      </KeyboardAwareScrollView>
    );
  }
}