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
  KeyboardAvoidingView,
  Modal,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import MapView, { Marker } from 'react-native-maps'
import { TextField, Button, ModalPopup } from '../../../components'
import Icon from "react-native-vector-icons/FontAwesome";
import ImageViewer from 'react-native-image-zoom-viewer';
import { postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';
import { onSignIn } from '../../../routes/auth';

export default class ViewJobPro extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: false,
      popupVisible: false,
      jobData: false,
      extraData: false,
      loading: true,
      galleryVisible: false,
      galleryIndex: 1,
      activeTab: 'info',
      confirmation: false,
      nobalance: false,
      applyLoading: false,
      overRuledPro: false
    }
  }
    
  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
  }

  receiveData(data){
    if(data.success){
      this.state.extraData['job_apply_status'] = 1
      this.setState({
        extraData: this.state.extraData
      })
      postFormData({user_id: this.state.user.id}, 'getuserInfo', (response) => {
        onSignIn(response)
      })
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        this.setState({
          user: result
        }, () => {
          let data = {
            id: params.id,
            user_id: this.state.user.id
          }
          postFormData(data, 'professnalViewJob', (response) => {
            if(response){
              this.setState({
                extraData: response,
                jobData: response.data
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

  closePopup(){
    this.setState({
      popupVisible: false
    })
  }

  changeTab(type){
    this.setState({
      activeTab: type
    }, () => {
      if(type == 'info'){
        this.refs.scrollView.scrollTo(0)  
      }
      if(type == 'other'){
        this.refs.scrollView.scrollTo(500)  
      }
      if(type == 'applied'){
        this.refs.scrollView.scrollTo(700)  
      }
    })
  }

  moveToWallet(){
    this.props.navigation.goBack()
    this.props.navigation.navigate('Wallet')
    this.setState({
      nobalance: false
    })
  }

  applyJob(){
    const { jobData, extraData, confirmation, nobalance, user } = this.state
    let exp_date = new Date(user.exp_date).getTime()
    let today = new Date().getTime()

    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        let checkData = {
          job_id: jobData.id
        }
        postFormData(checkData, 'checkApplyCount', (response) => {
          if(response){
            if(response.apply_count < 3){
              this.setState({
                user: result
              }, () => {
                if(user.professional_plan_id != 1){
                  if(exp_date > today){
                    if(jobData.job_type == 'No Quote'){
                      this.confirmApplyJob()
                    }else {
                      this.props.navigation.push('GiveQuote', {prof: user, job_data: jobData})
                    }
                  }else {
                    this.setState({
                      confirmation: true
                    })
                    if(this.state.confirmation){
                      this.props.navigation.push('GiveQuote', {prof: user, job_data: jobData})
                      this.setState({
                        confirmation: false
                      })
                    }
                  }
                }else {
                  if(user.my_avl_balance >= jobData.JobSubSubCategories.price_aus){
                    this.setState({
                      confirmation: true
                    })
                    //this.confirmApplyJob()
                    /* if(jobData.job_type == 'No Quote'){
                      this.confirmApplyJob()
                    }else {
                      this.setState({
                        confirmation: false
                      })
                      this.props.navigation.push('GiveQuote', {prof: user, job_data: jobData})
                    } */
                  }else{
                    this.setState({
                      nobalance: true
                    })
                  }
                }
              })
            }else {
              this.setState({
                overRuledPro: true
              })
            }
          }
        })
      }
    })
  }

  confirmApplyJob(){
    const { jobData, extraData, confirmation, nobalance, user } = this.state
    let checkData = {
      job_id: jobData.id
    }
    postFormData(checkData, 'checkApplyCount', (response) => {
      if(response){
        if(response.apply_count < 3){
          let data = {
            prof_id: user.id,
            job_id: jobData.id,
            quote_type: jobData.job_type == 'No Quote' ? 'No Quote' : '',
            quote: null,
            quote_fee: null,
            quote_time: null
          }
          if(jobData.job_type == 'No Quote'){
            this.setState({
              applyLoading: true
            })
            postFormData(data, 'applyJobs', (response) => {
              if(response){
                extraData.job_apply_status = 1
                this.setState({
                  applyLoading: false,
                  extraData: extraData
                })
                postFormData({user_id: this.state.user.id}, 'getuserInfo', (response) => {
                  onSignIn(response)
                  StateManager.getInstance().receiveData({});
                  this.props.navigation.goBack();
                  this.setState({
                    loading: false,
                    confirmation: false
                  })
                })
              }
            })
          }else {
            this.setState({
              confirmation: false
            })
            this.props.navigation.push('GiveQuote', {prof: user, job_data: jobData})
            //this.applyJob()
          }
        }else {
          this.setState({
            overRuledPro: true
          })
        }
      }
    })
  }

  render() {
    const { jobData, extraData, confirmation,nobalance } = this.state
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    const images = [];
    if(jobData.image1){
      images.push({url: extraData.job_image_url+''+jobData.image1})
    }
    if(jobData.image2){
      images.push({url: extraData.job_image_url+''+jobData.image2})
    }
    if(jobData.image3){
      images.push({url: extraData.job_image_url+''+jobData.image3})
    }
    const questionAnswers = jobData.CustomersJobAns.map((item, index) => {
      return <View style={pageStyle.blockWithIcon}>
        <View style={pageStyle.iconView}>
          <Image
            style={pageStyle.blockIcon}
            source={require('../../../assets/images/question.png')}
          />
        </View>
        <View style={pageStyle.questionsView}>
          <View style={pageStyle.iconBlocktextView}>
            <Text style={pageStyle.blockTextHeading}>{item.question}</Text>
            {item.question_type == 'input' && <Text style={pageStyle.blockText}>{item.input_ans}</Text>}
            {item.question_type == 'radio' && <Text style={pageStyle.blockText}>{item.first_option ? item.first_option : item.second_option ? item.second_option : item.third_option ? item.third_option : item.fourth_option ? item.fourth_option : ''}</Text>}
            {item.question_type == 'checkbox' && <Text style={pageStyle.blockText}>{item.first_option ? item.first_option : ''}{item.second_option ? ' '+item.second_option : ''}{item.third_option ? ' '+item.third_option : ''}{item.fourth_option ? ' '+item.fourth_option : ''}</Text>}
          </View>
        </View>
      </View>
    })
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    const jobDate = new Date(jobData.create_on).getDate()+' '+monthNames[new Date(jobData.create_on).getMonth()]+' '+new Date(jobData.create_on).getFullYear()
    if(nobalance){
      return (
        <View style={[styles.scrollViewContainer, pageStyle.confirmationView]}>
          <Image style={pageStyle.moneybag} source={require('../../../assets/images/moneybag.png')} />
          <View style={pageStyle.confirmationApplyView}>
            <Text style={pageStyle.subtextJobPrice}>You need <Text style={{fontWeight: 'bold'}}>{jobData.JobSubSubCategories.price_aus} AUD</Text> is Required You do not have sufficient available balance to do this transaction. Please go to your wallet and add money.</Text>
            <Button onPress={() => this.moveToWallet()} style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '70%'}} text="BUY" />
            <View style={pageStyle.seperationView}>
              <View style={pageStyle.seperationLine} />
              <Text style={pageStyle.seperationText}>or</Text>
            </View>
            <Button onPress={() => this.setState({nobalance: false})} style={{backgroundColor: '#adadad', paddingVertical: 10, width: '70%'}} text="NO" />
          </View>
        </View>
      )
    }
    if(this.state.overRuledPro){
      return (
        <View style={[styles.scrollViewContainer, pageStyle.confirmationView]}>
          {/* <Image style={pageStyle.moneybag} source={require('../../../assets/images/moneybag.png')} /> */}
          <View style={pageStyle.confirmationApplyView}>
            <Text style={[pageStyle.subtextJobPrice, {fontSize: 16}]}>This job is closed as three people have already applied for this job. We encourage you to apply for the job as soon as you receive notification</Text>
            <Text style={{marginTop: 10, fontSize: 16, marginBottom: 10}}>Thank you</Text>
            <Button onPress={() => this.props.navigation.goBack()} style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '70%'}} text="Back to Jobs" />
          </View>
        </View>
      )
    }
    if(confirmation){
      return (
        <View style={[styles.scrollViewContainer, pageStyle.confirmationView]}>
          <Image style={pageStyle.moneybag} source={require('../../../assets/images/moneybag.png')} />
          <View style={pageStyle.confirmationApplyView}>
            <Text style={pageStyle.confirmationJobPrice}>COST = {jobData.JobSubSubCategories.price_aus} AUD</Text>
            <Text style={pageStyle.subtextJobPrice}>Click YES to continue.</Text>
            <Button onPress={() => this.confirmApplyJob()} loading={this.state.applyLoading} style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '70%'}} text="YES" />
            <View style={pageStyle.seperationView}>
              <View style={pageStyle.seperationLine} />
              <Text style={pageStyle.seperationText}>or</Text>
            </View>
            <Button onPress={() => this.setState({confirmation: false})} style={{backgroundColor: '#adadad', paddingVertical: 10, width: '70%'}} text="NO" />
          </View>
        </View>
      )
    }
    const modalHeader = () => {
      return <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true})} style={{position: 'absolute', zIndex: 9999, top: 15, left: 20}}>
        <View style={{paddingVertical: 6, paddingHorizontal: 12}}>
          <Icon name="chevron-left" color="#fff" size={25} />
        </View>
      </TouchableOpacity>
    }
    return (
      <View style={[styles.scrollViewContainer, {paddingBottom: 0}]}>
        <ScrollView style={styles.contentView} ref="scrollView" showsVerticalScrollIndicator={false}>
          <ImageBackground style={pageStyle.background} source={require('../../../assets/images/probg.jpg')}>
            <View style={pageStyle.textView}>
              <Text style={{color: '#fff', marginRight: 10, fontFamily: 'Proxima Nova'}}>{jobDate}</Text>
              <Text style={{color: '#fff', marginRight: 5, fontWeight: '700', fontSize: 20, fontFamily: 'Proxima Nova', marginBottom: 2}}>{jobData.job_id} - {jobData.job_title}</Text>
              <Text style={{color: '#fff', marginRight: 10, fontFamily: 'Proxima Nova'}}>{jobData.JobSubSubCategories ? jobData.JobSubSubCategories.sub_sub_name : ''}</Text>
            </View>
          </ImageBackground>
          <View style={pageStyle.blockView}>
            <View style={pageStyle.blockWithIcon}>
              <View style={pageStyle.iconView}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/location.png')}
                />
              </View>
              <View style={pageStyle.iconBlocktextView}>
                <Text style={pageStyle.blockTextHeading}>Suburb/Neighbourhood</Text>
                <Text style={pageStyle.blockText}>{jobData.neighbourhood}Melbourne</Text>
              </View>
            </View>
            {jobData.lat != "" && <MapView style={pageStyle.map}
            initialRegion={{
              latitude: parseFloat(jobData.lat),
              longitude: parseFloat(jobData.lng),
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}>
              <Marker coordinate={{latitude: parseFloat(jobData.lat),longitude: parseFloat(jobData.lng)}} />
            </MapView>}
            {extraData.job_apply_status == 1 && <Button onPress={() => this.props.navigation.push('Directions', {customer: this.state.user, professional: this.state.jobData})} style={{backgroundColor: '#fb8519', paddingVertical: 10, width: '60%'}} text="GET DIRECTIONS" />}
          </View>
          <View style={pageStyle.blockView}>
            <View style={pageStyle.blockWithIcon}>
              <View style={pageStyle.iconView}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/jobtitle.png')}
                />
              </View>
              <View style={pageStyle.iconBlocktextView}>
                <Text style={pageStyle.blockTextHeading}>Job Title/Name of Job</Text>
                <Text style={pageStyle.blockText}>{jobData.job_title}</Text>
              </View>
            </View>
            <View style={pageStyle.blockWithIcon}>
              <View style={pageStyle.iconView}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/notes.png')}
                />
              </View>
              <View style={pageStyle.iconBlocktextView}>
                <Text style={pageStyle.blockTextHeading}>Description</Text>
                <Text style={pageStyle.blockText}>{jobData.description}</Text>
              </View>
            </View>
            {jobData.job_type == "Coin Based Hour Job" && <View style={pageStyle.blockWithIcon}>
              <View style={pageStyle.iconView}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/watch.png')}
                />
              </View>
              <View style={pageStyle.iconBlocktextView}>
                <Text style={pageStyle.blockTextHeading}>{jobData.hourly_job_type}</Text>
                <Text style={pageStyle.blockText}>{jobData.hourly_job_type == 'Hour Basis' ? jobData.hourly_time+' hrs '+jobData.hourly_minute+' mins' : jobData.how_many_day+' Days '+jobData.per_hrs_day+' Hrs/Day'}</Text>
              </View>
            </View>}
            <View style={pageStyle.blockWithIcon}>
              <View style={pageStyle.iconView}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/photo.png')}
                />
              </View>
              <View style={pageStyle.iconBlocktextView}>
                <Text style={pageStyle.blockTextHeading}>Photo</Text>
                <View style={[styles.multipleColumnView, {marginTop: 10}]}>
                  {jobData.image1 && <View style={styles.multipleColumnBlock}>
                    <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 0})}>
                      <Image
                        style={pageStyle.images}
                        source={{uri: extraData.job_image_url+''+jobData.image1}}
                      />
                    </TouchableOpacity>
                  </View>}
                  {jobData.image2 && <View style={styles.multipleColumnBlock}>
                    <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 1})}>
                      <Image
                        style={pageStyle.images}
                        source={{uri: extraData.job_image_url+''+jobData.image2}}
                      />
                    </TouchableOpacity>
                  </View>}
                  {jobData.image3 && <View style={styles.multipleColumnBlock}>
                    <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 2})}>
                      <Image
                        style={pageStyle.images}
                        source={{uri: extraData.job_image_url+''+jobData.image3}}
                      />
                    </TouchableOpacity>
                  </View>}
                </View>
              </View>
            </View>
            <View style={pageStyle.blockWithIcon}>
              <View style={pageStyle.iconView}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/watch.png')}
                />
              </View>
              <View style={pageStyle.iconBlocktextView}>
                <Text style={pageStyle.blockTextHeading}>Required Preferences</Text>
                <Text style={pageStyle.blockText}>{jobData.CustomerJobPreferences.asap == 'later' ? jobData.CustomerJobPreferences.exact_time : 'ASAP'}</Text>
              </View>
            </View>
            {questionAnswers}
          </View>
          {(extraData.job_apply_status == 0 && jobData.job_status != 'close') && <View style={pageStyle.applyView}>
            <Text style={pageStyle.jobPrice}>COST = {jobData.JobSubSubCategories.price_aus} AUD</Text>
            <Button loading={this.state.applyLoading} onPress={() => this.applyJob()} style={{backgroundColor: '#fb8519', paddingVertical: 10, width: '60%'}} text="APPLY" />
          </View>}
          {(extraData.job_apply_status == 0 && jobData.job_status == 'close') && <View style={[pageStyle.applyView, {paddingHorizontal: 20}]}>
            <Text style={{fontSize: 14, textAlign: 'center', lineHeight: 23}}>This job is closed as three people have already applied for this job. We encourage you to apply for the job as soon as you receive notification. </Text>
            <Text style={{fontWeight: 'bold'}}>Thank you.</Text>
          </View>}
          {extraData.job_apply_status == 1 && <View style={pageStyle.customerProfileView}>
            <Text style={pageStyle.customerProfileHeading}>CUSTOMER DETAILS</Text>
            <ImageBackground
              style={pageStyle.customerProfileBackground}
              source={jobData.Users.image ? {uri: extraData.customer_image_url+jobData.Users.image} : require('../../../assets/images/male_avatar.png')}
            >
              <View style={pageStyle.customerBackgroundOverlay}></View>
              <View style={pageStyle.profileContent}>
                <Image
                  style={pageStyle.avatarImage}
                  source={jobData.Users.image ? {uri: extraData.customer_image_url+jobData.Users.image} : require('../../../assets/images/male_avatar.png')}
                />
                <Text style={pageStyle.username}>{jobData.Users.first_name.toUpperCase()}</Text>
                <Text style={pageStyle.extraText}>{jobData.Users.email}</Text>
                <Text style={pageStyle.extraText}>{jobData.Users.address1}</Text>
                <Text style={pageStyle.customerPhone}>{jobData.Users.phone}</Text>
                <Button onPress={() => {
                  let chatData = {
                    thread: extraData.thread_id ? extraData.thread_id : false,
                    name: jobData.Users.first_name,
                    sender_id: jobData.Users.id,
                    receiver_id: this.state.user.id
                  }
                  this.props.navigation.push('ChatsPro', chatData)
                }}  style={{backgroundColor: '#fb8519', paddingVertical: 10, width: Platform.OS == 'android' ? '100%' : '100%'}} text="SEND MESSAGE" />
                {/* <Button onPress={() => this.props.navigation.push('ChatsPro', extraData.thread_id != "" ? {thread: extraData.thread_id, name: jobData.Users.first_name} : {user_id: jobData.Users.id})} style={{backgroundColor: '#fb8519', paddingVertical: 10, width: '60%'}} text="SEND MESSAGE" /> */}
              </View>
            </ImageBackground>
            <Text style={pageStyle.alreadyAppliedText}>*** You have been already applied for this job ! ***</Text>
          </View>}
        </ScrollView>
        <Modal visible={this.state.galleryVisible} transparent={true}>
          <ImageViewer renderHeader={modalHeader} index={this.state.galleryIndex} onSwipeDown={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true})} imageUrls={images}/>
        </Modal>
      </View>
    );
  }
}