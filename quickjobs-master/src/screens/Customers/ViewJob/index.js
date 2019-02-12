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
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import MapView, { Marker } from 'react-native-maps'
import { TextField, Button, ModalPopup } from '../../../components'
import Icon from "react-native-vector-icons/FontAwesome";
import ImageViewer from 'react-native-image-zoom-viewer';
import { postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';

export default class ViewJob extends Component {
  constructor(props){
    super(props)
    this.state = {
      popupVisible: false,
      jobData: false,
      loading: true,
      galleryVisible: false,
      galleryIndex: 1,
      activeTab: 'info',
      professionals: [1,1,1,1,1,1],
      user: false,
      otherDetailsPos: 0,
      professionalsPos: 0
    }
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
  }

  componentDidMount(){
    this.makeRemoteRequest()
  }

  receiveData(data){
    this.state.jobData.data.JobAppliedProfessionals.forEach(professional => {
      if(professional.user_id == data.prof_id){
        professional.Users.avarage_rating = data.rating
      }
    });
    this.setState({
      jobData: this.state.jobData
    })
    /* this.setState({
      loading: true
    }, () => {
      this.makeRemoteRequest()
    }) */
  }

  makeRemoteRequest(){
    const { params } = this.props.navigation.state
    let data = {
      id: params.id
    }
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        this.setState({
          user: result
        })
      }
    })
    console.log(data)
    postFormData(data, 'customerViewJob', (response) => {
      console.log(response)
      if(response){
        this.setState({
          jobData: response
        })
      }
      this.setState({
        loading: false
      })
    })
  }

  addMoneyPopup(){
    this.setState({
      popupVisible: true
    })
  }

  closePopup(){
    this.setState({
      popupVisible: false
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  changeTab(type){
    this.setState({
      activeTab: type
    }, () => {
      if(type == 'info'){
        this.refs.scrollView.scrollTo(0)  
      }
      if(type == 'other'){
        this.refs.scrollView.scrollTo(this.state.otherDetailsPos)  
      }
      if(type == 'applied'){
        this.refs.scrollView.scrollTo(this.state.professionalsPos)  
      }
    })
  }

  render() {
    const { jobData } = this.state
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    const images = [];
    if(jobData.data.image1){
      images.push({url: jobData.job_image_url+''+jobData.data.image1})
    }
    if(jobData.data.image2){
      images.push({url: jobData.job_image_url+''+jobData.data.image2})
    }
    if(jobData.data.image3){
      images.push({url: jobData.job_image_url+''+jobData.data.image3})
    }
    const galleryLeftArrow = () => {
      return <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 0})}><Icon style={{margin: 20, position: 'absolute'}} name="times-circle" size={40} color="#fff" /></TouchableOpacity>
    }
    const professionals = jobData.data.JobAppliedProfessionals.map((item, index) => {
      let priceBlock
      if(jobData.data.job_type == 'Coin Based Hour Job'){
        if(item.quote_type == 'give-quote-direct'){
          priceBlock = <Text style={pageStyle.additionalText}>Price: ${item.total_hour_amount}</Text>
        }else {
          priceBlock = <Text style={pageStyle.additionalText}>CONTACT FOR QUOTE</Text>
        }
      }
      if(jobData.data.job_type == 'Quote'){
        if(item.quote_type == 'Contact'){
          priceBlock = <Text style={pageStyle.additionalText}>CONTACT FOR QUOTE</Text>
        }else {
          priceBlock = <Text style={pageStyle.additionalText}>Price: ${item.quote}</Text>
        }
      }
      if(jobData.data.job_type == 'Electrician'){
        if(item.quote_type == 'Contact'){
          priceBlock = <Text style={pageStyle.additionalText}>CONTACT FOR QUOTE</Text>
        }else {
          priceBlock = <View><Text style={pageStyle.additionalText}>Price: {item.quote}$ for First 30 Min</Text><Text style={pageStyle.additionalText}>{item.quote_fee}$ for Every {item.quote_time} Min</Text></View>
        }
      }
      if(jobData.data.job_type == 'Equipment'){
        if(item.quote_type == 'Contact'){
          priceBlock = <Text style={pageStyle.additionalText}>CONTACT FOR QUOTE</Text>
        }else {
          priceBlock = <Text style={pageStyle.additionalText}>Price: ${item.quote}</Text>
        }
      }
      return <View style={pageStyle.professional}>
        <View style={pageStyle.detailView}>
          <View style={pageStyle.nameView}>
            {item.Users.verified_batch != 'No' && <Image style={pageStyle.certificate} source={require('../../../assets/images/certificate.png')} />}
            <Text style={pageStyle.professionalName}>{this.capitalizeFirstLetter(item.name)}</Text>
          </View>
          <Text style={pageStyle.additionalText}>Location: {item.Users.address1}</Text>
          {/* <Text style={pageStyle.additionalText}>Phone: {item.Users.phone}</Text> */}

          {priceBlock}

          <Text onPress={() => {
            let chatData = {
              thread: item.Users.thread_id ? item.Users.thread_id : false,
              name: item.Users.name,
              sender_id: this.state.user.id,
              receiver_id: item.Users.id
            }
            console.log(chatData)
            this.props.navigation.push('Chats', chatData)
          }} style={pageStyle.sendText}>SEND MESSAGE</Text>
        </View>
        <View style={pageStyle.avatarView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.push('ProProfile', {id: item.Users.id, name: item.name, job_id: item.id, job_unique_id: jobData.data.job_id})
            }}>
            <Image
              style={pageStyle.avatar}
              source={item.Users.image ? {uri: jobData.professnal_image_url+item.Users.image} : require('../../../assets/images/male_avatar.png')}
            />
          </TouchableOpacity>
          <Text style={pageStyle.ratingText}>RATING</Text>
          <View style={pageStyle.ratingView}>
            {item.Users.avarage_rating && <Icon name="star" size={15} color="gold" />}
            <Text style={{fontSize: 13, marginLeft: 5,fontFamily: 'Proxima Nova'}}>{item.Users.avarage_rating ? item.Users.avarage_rating+' Star Rating' : 'No Rating'}</Text>
          </View>
        </View>
      </View>
    })
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    const jobDate = new Date(jobData.data.create_on).getDate()+' '+monthNames[new Date(jobData.data.create_on).getMonth()]+' '+new Date(jobData.data.create_on).getFullYear()

    const modalHeader = () => {
      return <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true})} style={{position: 'absolute', zIndex: 9999, top: 15, left: 20}}>
        <View style={{paddingVertical: 6, paddingHorizontal: 12}}>
          <Icon name="chevron-left" color="#fff" size={25} />
        </View>
      </TouchableOpacity>
    }
    return (
      <View style={[styles.scrollViewContainer, {paddingBottom: 0}]}>
        <ImageBackground style={pageStyle.background} source={require('../../../assets/images/bg.png')}>
          <View style={pageStyle.textView}>
            <Text style={{color: '#fff', marginRight: 10, fontFamily: 'Proxima Nova'}}>{jobDate}</Text>
            <Text style={{color: '#fff', marginRight: 5, fontWeight: '700', fontSize: 20, fontFamily: 'Proxima Nova', marginBottom: 2}}>{jobData.data.job_id} - {jobData.data.job_title}</Text>
            <Text style={{color: '#fff', marginRight: 10, fontFamily: 'Proxima Nova'}}>{jobData.data.JobSubCategories.sub_category_name}, {jobData.data.JobSubSubCategories.sub_sub_name}</Text>
          </View>
          <View style={pageStyle.tabView}>
            <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab('info')}>
              <View style={[pageStyle.tab, this.state.activeTab == 'info' ? pageStyle.activeTab : {}]}>
                <Image
                  style={pageStyle.tabImage}
                  source={require('../../../assets/images/jobinfo.png')}
                />
                <Text style={pageStyle.tabText}>Job Info</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab('other')}>
              <View style={[pageStyle.tab, this.state.activeTab == 'other' ? pageStyle.activeTab : {}]}>
                <Image
                  style={pageStyle.tabImage}
                  source={require('../../../assets/images/otherdetails.png')}
                />
                <Text style={pageStyle.tabText}>Other Details</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab('applied')}>
              <View style={[pageStyle.tab, this.state.activeTab == 'applied' ? pageStyle.activeTab : {}]}>
                <Image
                  style={pageStyle.tabImage}
                  source={require('../../../assets/images/response.png')}
                />
                <Text style={pageStyle.tabText}>{jobData.data.JobAppliedProfessionals.length > 0 ? jobData.data.JobAppliedProfessionals.length : 'No'} Response</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView style={styles.contentView} ref="scrollView" showsVerticalScrollIndicator={false}>
          <View style={pageStyle.blockView}>
            <View style={pageStyle.headingView}>
              <Text style={pageStyle.headingText}>JOB INFORMATION</Text>
            </View>
            <View style={pageStyle.blockContentView}>
              <View style={pageStyle.blockWithIcon}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/jobtitle.png')}
                />
                <Text style={pageStyle.blockText}>{jobData.data.job_title}</Text>
              </View>
              <View style={pageStyle.blockWithIcon}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/notes.png')}
                />
                <Text style={pageStyle.blockText}>{jobData.data.description}</Text>
              </View>
              <View style={pageStyle.blockWithIcon}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/location.png')}
                />
                <Text style={pageStyle.blockText}>{jobData.data.registered_address === null ? jobData.data.address1 : jobData.data.registered_address}</Text>
              </View>
              {jobData.data.lat != "" && <MapView style={pageStyle.map}
              initialRegion={{
                latitude: parseFloat(jobData.data.lat),
                longitude: parseFloat(jobData.data.lng),
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}>
                <Marker coordinate={{latitude: parseFloat(jobData.data.lat),longitude: parseFloat(jobData.data.lng)}} />
              </MapView>}
              <View style={pageStyle.blockWithIcon}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/watch.png')}
                />
                <Text style={pageStyle.blockText}>{jobData.data.CustomerJobPreferences.asap == 'later' ? jobData.data.CustomerJobPreferences.exact_time : 'ASAP'}</Text>
              </View>
              {(jobData.data.image1 || jobData.data.image2 || jobData.data.image3) && <View style={pageStyle.blockWithIcon}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/photo.png')}
                />
                <View style={[styles.multipleColumnView, {marginLeft: 10}]}>
                  {jobData.data.image1 && <View style={styles.multipleColumnBlock}>
                    <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 0})}>
                      <Image
                        style={pageStyle.images}
                        source={{uri: jobData.job_image_url+''+jobData.data.image1}}
                      />
                    </TouchableOpacity>
                  </View>}
                  {jobData.data.image2 && <View style={styles.multipleColumnBlock}>
                    <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 1})}>
                      <Image
                        style={pageStyle.images}
                        source={{uri: jobData.job_image_url+''+jobData.data.image2}}
                      />
                    </TouchableOpacity>
                  </View>}
                  {jobData.data.image3 && <View style={styles.multipleColumnBlock}>
                    <TouchableOpacity onPress={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true, galleryIndex: 2})}>
                      <Image
                        style={pageStyle.images}
                        source={{uri: jobData.job_image_url+''+jobData.data.image3}}
                      />
                    </TouchableOpacity>
                  </View>}
                </View>
              </View>}
            </View>
          </View>
          <View style={pageStyle.blockView} onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.setState({
              otherDetailsPos: layout.y
            })
          }}>
            <View style={pageStyle.headingView}>
              <Text style={pageStyle.headingText}>OTHER DETAILS</Text>
            </View>
            <View style={pageStyle.blockContentView}>
              {jobData.data.CustomersJobAns.map((item, index) => {
              return <View style={pageStyle.blockWithIcon}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/question.png')}
                />
                <View>
                  <Text style={pageStyle.blockTextQuestion}>{item.question}</Text>
                  {item.question_type == 'input' && <Text style={pageStyle.blockTextAnswer}>{item.input_ans}</Text>}
                  {item.question_type == 'radio' && <Text style={pageStyle.blockTextAnswer}>{item.first_option ? item.first_option : item.second_option ? item.second_option : item.third_option ? item.third_option : item.fourth_option ? item.fourth_option : ''}</Text>}
                  {item.question_type == 'checkbox' && <Text style={pageStyle.blockTextAnswer}>{item.first_option ? item.first_option : ''}{item.second_option ? ' '+item.second_option : ''}{item.third_option ? ' '+item.third_option : ''}{item.fourth_option ? ' '+item.fourth_option : ''}</Text>}
                </View>
              </View>})}
            </View>
          </View>
          <View style={[pageStyle.blockView, {paddingHorizontal: 0, paddingBottom: 0}]} onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.setState({
              professionalsPos: layout.y
            })
          }}>
            <View style={[pageStyle.headingView, {paddingHorizontal: 20}]}>
              <Text style={pageStyle.headingText}>SERVICE PROFESSIONAL {jobData.data.JobAppliedProfessionals.length > 0 ? '('+jobData.data.JobAppliedProfessionals.length+' Response)' : 'No Response'}</Text>
            </View>
            <View style={pageStyle.blockContentView}>
              {/* <View style={[pageStyle.blockWithIcon, {paddingHorizontal: 20, marginBottom: 10}]}>
                <Image
                  style={pageStyle.blockIcon}
                  source={require('../../../assets/images/users.png')}
                />
                <Text style={pageStyle.blockText}>{jobData.data.JobAppliedProfessionals.length > 0 ? jobData.data.JobAppliedProfessionals.length : 'No'} People Applied</Text>
              </View> */}
              <View style={pageStyle.professionals}>
                {professionals}
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal visible={this.state.galleryVisible} transparent={true}>
          <ImageViewer renderHeader={modalHeader} index={this.state.galleryIndex} onSwipeDown={() => this.setState({galleryVisible: this.state.galleryVisible ? false : true})} imageUrls={images}/>
        </Modal>
      </View>
    );
  }
}