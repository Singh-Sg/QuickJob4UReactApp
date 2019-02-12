import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  AsyncStorage
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, Check, TextFieldAddress, DateField, SliderComp, FakeTextField } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../config/formHandler';
import { onSignIn } from '../../../routes/auth'
import MapView, { Circle } from 'react-native-maps'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EditProfilePro extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 1,
      business_name: '',
      business_nameError: '',
      gender: '',
      dob: '',
      email: '',
      emailError: false,
      address: '',
      addressError: false,
      neighbourhood: '',
      paypal: '',
      abn: '',
      abn_no: '',
      phone_number: '',
      loading_first: false,
      about_me: '',
      about_meError: '',
      youtube_link: '',
      youtube_linkError: false,
      how_far: 0,
      how_far_slide: 0,
      latitude: false,
      longitude: false,
      public_liability: '',
      provide_details: '',
      provide_detailsError: false,
      expiry_date: '',
      expiry_dateError: false,
      loading_second: false,
      lat: '',
      lng: '',
      user: '',
      error: false,
      loading: false
    }
  }

  static navigationOptions = { tabBarVisible: false }

  componentWillMount(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result,
        business_name: result.first_name,
        gender: result.gender,
        dob: result.dob,
        email: result.email,
        address: result.address1,
        neighbourhood: result.neighbourhood,
        phone_number: result.phone,
        abn: result.abn ? 'yes' : 'no',
        abn_no: result.abn,
        about_me: result.about_me,
        expiry_date: result.exp_date,
        how_far_slide: parseFloat(result.how_far_u),
        how_far: parseFloat(result.how_far_u)*1000,
        youtube_link: result.video_link,
        paypal: result.paypal_me_link,
        lat: result.add1_latitude,
        lng: result.add1_longitude,
        public_liability: result.libility_insurance == 'Yes' ? 'yes' : 'no',
        provide_details: result.libility_insurance_detail,
        expiry_date: result.libility_insurance_exp
      })
    })
  }

  componentDidMount() {
    /* navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     ); */
  }

  saveFirstData(){
    const { goBack } = this.props.navigation;
    let error = 0;
    let data = {
      user_id: this.state.user.id,
      display_name: this.state.business_name,
      email: this.state.email,
      gender: this.state.gender,
      dob: this.state.dob,
      address1: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
      phone: this.state.phone_number,
      paypal_me_link: this.state.paypal,
      check_abn: this.state.abn,
      abn: this.state.abn_no,
      neighbourhood: this.state.neighbourhood
    }
    if(!this.state.email){
      this.setState({
        emailError: true
      })
      error = 1
    }else {
      this.setState({
        emailError: false
      })
    }
    if(!this.state.address){
      this.setState({
        addressError: true
      })
      error = 1
    }else {
      this.setState({
        addressError: false
      })
    }
    if(!this.state.business_name){
      this.setState({
        business_nameError: true
      })
      error = 1
    }else {
      this.setState({
        business_nameError: false
      })
    }
    if(error == 1){
      return;
    }
    this.setState({
      loading_first: true
    })
    postFormData(data, 'editprofessnalProfile', (response) => {
      if(response){
        onSignIn(response)
        this.setState({
          loading_first: false,
          user: response,
          latitude: this.state.lat ? this.state.lat : this.state.latitude,
          longitude: this.state.lng ? this.state.lng : this.state.longitude
        })
        this.changeTab(2)
      }else {
        this.setState({
          loading_first: false
        })
      }
    })
  }

  validateYouTubeUrl(url)
  {
    var reg = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (reg.test(url) == false) 
    {
      return false;
    }
    return true;
  }

  saveSecondData(){
    const { goBack } = this.props.navigation;
    let error = 0;
    let data = {
      user_id: this.state.user.id,
      about_me: this.state.about_me,
      video_link: this.state.youtube_link,
      how_far_u: this.state.how_far_slide,
      libility_insurance: this.state.public_liability == 'yes' ? 'Yes' : 'No'
    }
    if(this.state.public_liability == 'yes'){
      data.libility_insurance_detail = this.state.provide_details
      data.libility_insurance_exp = this.state.expiry_date
    }
    if(this.state.youtube_link){
      if(this.validateYouTubeUrl(this.state.youtube_link)){
        this.setState({
          youtube_linkError: false
        })
      }else{
        this.setState({
          youtube_linkError: true
        })
        error = 1
      }
    }
    if(!this.state.about_me){
      this.setState({
        about_meError: true
      })
      error = 1
    }else {
      this.setState({
        about_meError: false
      })
    }
    /* 
    if(this.state.about_me.length < 100){
      this.setState({
        about_meError: true
      })
      error = 1
    }else {
      this.setState({
        about_meError: false
      })
      error = 0
    } */
    if(this.state.public_liability == 'yes'){
      if(!this.state.provide_details){
        this.setState({
          provide_detailsError: true
        })
        error = 1
      }else {
        this.setState({
          provide_detailsError: false
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
    }
    if(error == 1){
      return;
    }
    this.setState({
      loading_second: true
    })
    postFormData(data, 'professnalAboutMe', (response) => {
      if(response){
        onSignIn(response)
        this.setState({
          loading_second: false,
          user: response
        })
        this.changeTab(3)
      }else {
        this.setState({
          loading_second: false
        })
      }
    })
  }

  saveData(){
    if(this.state.agree){
      this.props.navigation.goBack()
    }else {
      alert('Please agree to terms of use')
    }
  }

  changeTab(index){
    this.setState({
      activeTab: index
    })
  }

  render() {
    const { activeTab } = this.state
    return (
      <View style={[styles.container, {justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
        <View style={pageStyle.tabView}>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(1)}>
            <View style={[pageStyle.tab, this.state.activeTab == 1 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>ACCOUNT DETAILS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(2)}>
            <View style={[pageStyle.tab, this.state.activeTab == 2 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>ABOUT ME</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(3)}>
            <View style={[pageStyle.tab, this.state.activeTab == 3 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>REVIEW / SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>

      
        <View style={pageStyle.tabContent}>
          {activeTab == 1 && <KeyboardAwareScrollView style={pageStyle.formView} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
              <TextField inputStyle={{borderBottomColor: this.state.business_nameError ? '#fa0000' : '#dedede'}} required onChangeText={(business_name) => this.setState({business_name})} value={this.state.business_name} label="Business Name" />
              <Check checkedColor="#fb8519" checked={this.state.gender == 'male' ? true : false} onPress={() => this.setState({gender: 'male'})} round text="Male" label="Gender" />
              <Check checkedColor="#fb8519" checked={this.state.gender == 'female' ? true : false} onPress={() => this.setState({gender: 'female'})} round text="Female" />
              <DateField format="DD/MM/YYYY" mode="date" onDateChange={(dob) => {this.setState({dob})}} date={this.state.dob} label="Date of Birth" />
              <TextField required inputStyle={{borderBottomColor: this.state.emailError ? '#fa0000' : '#dedede'}} onChangeText={(email) => this.setState({email})} value={this.state.email} label="Email Address" />
              <TextFieldAddress required style={{borderBottomColor: this.state.addressError ? '#fa0000' : '#dedede'}} value={this.state.address} onPress={(data, details = null) => {
                console.log(details)
                this.setState({
                  address: details.formatted_address,
                  neighbourhood: details.name,
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                  addressError: false
                })
              }} label="Address Line 1" />
              <TextField editable={false} onChangeText={(neighbourhood) => this.setState({neighbourhood})} value={this.state.neighbourhood} label="Suburb / Neighbourhood" />
              <TextField onChangeText={(paypal) => this.setState({paypal})} value={this.state.paypal} label="Your PayPal.me Link" desc="<p style='font-style: italic;margin: 0px; margin-top: 2px;margin-bottom: 0px;font-size: 10px'>Learn more about PayPal.me at <a style='text-decoration: none; color: #cf2525' href='https://www.paypal.me/'>www.paypal.me</a></p>" />
              <Text style={{color: '#afafaf',fontSize: 12,marginBottom: 10,marginTop: 10, alignSelf: 'flex-start'}} numberOfLines={1} ellipsizeMode='tail'>ABN</Text>
              <View style={pageStyle.rowCheckBox}>
                <Check style={pageStyle.checkboxBlock} checkedColor="#fb8519" checked={this.state.abn == 'yes' ? true : false} onPress={() => this.setState({abn: 'yes'})} round text="Yes" />
                <Check style={pageStyle.checkboxBlock} checkedColor="#fb8519" checked={this.state.abn == 'no' ? true : false} onPress={() => this.setState({abn: 'no'})} round text="No" />
              </View>
              {this.state.abn == 'yes' && <TextField onChangeText={(abn_no) => this.setState({abn_no})} value={this.state.abn_no} label="eg. 45786921" desc="<p style='font-style: italic;margin: 0px; margin-top: 2px;margin-bottom: 0px;font-size: 10px'>Show customers you are professional business. Don't have it hand? <a style='text-decoration: none; color: #cf2525' href='http://www.abr.business.gov.au/'>Lookup my ABN</a></p>" />}
              <TextField editable={false} onChangeText={(phone_number) => this.setState({phone_number})} value={this.state.phone_number} label="Phone Number" />
          </KeyboardAwareScrollView>}

          {activeTab == 2 && <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 40}} style={pageStyle.formView} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
              <TextField inputStyle={{borderBottomColor: this.state.about_meError ? '#fa0000' : '#dedede'}} required onChangeText={(about_me) => this.setState({about_me})} value={this.state.about_me} label="About Me" multiline={true} numberOfLines={5} desc="<p style='font-style: italic;margin: 0px; margin-top: 2px;margin-bottom: 0px;font-size: 10px'>(Note: Minimum Character should be 100.)</p>" />
              <TextField inputStyle={{borderBottomColor: this.state.youtube_linkError ? '#fa0000' : '#dedede'}} onChangeText={(youtube_link) => this.setState({youtube_link})} value={this.state.youtube_link} label="Youtube Video Link" />
              <SliderComp value={this.state.how_far_slide} onValueChange={(how_far) => {
                this.setState({
                  how_far: how_far*1000,
                  how_far_slide: how_far
                })
              }} label={`How far are you willing to tend? (${(this.state.how_far/1000).toFixed(0)}km)`} />
              {this.state.user.add1_latitude && <MapView style={pageStyle.map}
              region={{
                latitude: parseFloat(this.state.user.add1_latitude),
                longitude: parseFloat(this.state.user.add1_longitude),
                latitudeDelta: 0.4,
                longitudeDelta: 0.4,
              }}
              onRegionChange={this.onRegionChange}>
                <Circle center={{latitude: parseFloat(this.state.user.add1_latitude),longitude: parseFloat(this.state.user.add1_longitude)}} radius={this.state.how_far} fillColor="rgba(255, 63, 63,0.5)" strokeColor="rgba(255, 63, 63,0.5)" />
              </MapView>}
              <Text style={{color: '#afafaf',fontSize: 12,marginBottom: 10,marginTop: 10, alignSelf: 'flex-start'}} numberOfLines={1} ellipsizeMode='tail'>Public Liability Insurance</Text>
              <View style={pageStyle.rowCheckBox}>
                <Check style={pageStyle.checkboxBlock} checkedColor="#fb8519" checked={this.state.public_liability == 'yes' ? true : false} onPress={() => this.setState({public_liability: 'yes'})} round text="Yes" />
                <Check style={pageStyle.checkboxBlock} checkedColor="#fb8519" checked={this.state.public_liability == 'no' ? true : false} onPress={() => this.setState({public_liability: 'no'})} round text="No" />
              </View>
              {this.state.public_liability == 'yes' && <TextField inputStyle={{borderBottomColor: this.state.provide_detailsError ? '#fa0000' : '#dedede'}} onChangeText={(provide_details) => this.setState({provide_details})} value={this.state.provide_details} label="Provide details" />}
              {this.state.public_liability == 'yes' && <DateField inputStyle={{borderBottomColor: this.state.expiry_dateError ? '#fa0000' : '#dedede'}} required mode="date" onDateChange={(expiry_date) => {this.setState({expiry_date})}} date={this.state.expiry_date} label="Expiry Date" format="DD/MM/YYYY" />}
          </KeyboardAwareScrollView>}


          {activeTab == 3 && <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 40}} style={pageStyle.formView} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
              <FakeTextField required onChangeText={(business_name) => this.setState({business_name})} value={this.state.business_name} label="Display Name" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.gender} label="Gender" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.email} label="Enter Email Address" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.address} label="Enter Address line 1" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.neighbourhood} label="Suburb/Neighbourhood" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.phone_number} label="Enter Phone Number" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.abn} label="ABN" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.how_far_slide} label="Service Area Radius" />
              <FakeTextField required onChangeText={(email) => this.setState({email})} value={this.state.public_liability} label="Public Liability Insurance" />
              <Check onPress={() => this.setState({agree: this.state.agree ? false : true})} checked={this.state.agree} text="I agree to the terms of use and privacy statments" />
          </KeyboardAwareScrollView>}
        </View>

        

        {activeTab == 1 && <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.loading_first} onPress={() => this.saveFirstData()} text="SAVE & NEXT" />}

        {activeTab == 2 && <View style={[styles.multipleColumnView, {width: '100%', justifyContent: 'space-between', paddingHorizontal: 20}]}>
          <Button containerStyle={{width: '48%'}} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.loading} onPress={() => this.setState({
            activeTab: 1
          })} text="Previous" />
          <Button containerStyle={{width: '48%'}} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.loading_second} onPress={() => this.saveSecondData()} text="SAVE & NEXT" />
        </View>}

        
        {activeTab == 3 && <View style={[styles.multipleColumnView, {width: '100%', justifyContent: 'space-between', paddingHorizontal: 20}]}>
          <Button containerStyle={{width: '48%'}} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.loading} onPress={() => this.setState({
            activeTab: 2
          })} text="Previous" />
          <Button containerStyle={{width: '48%'}} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.loading} onPress={() => this.saveData()} text="SUBMIT" />
        </View>}


      </View>
    );
  }
}