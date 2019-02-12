import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  AppState,
  TouchableNativeFeedback,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import { SearchBar, Button, Header } from 'react-native-elements'
import Carousel from 'react-native-carousel-view'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import MapView, { AnimatedRegion, Animated, Circle } from 'react-native-maps'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import HTML from 'react-native-render-html';
import { getFormData, removeMyJobsScreen, saveMyJobsScreen, notificationRegistered, postFormData } from '../../config/formHandler'
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { getDeviceToken } from '../../config/firebase';
import { UnreadCount } from '../../components'

export default class ProHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      slider: [],
      howitworks: [],
      customerReviews: [],
      latitude: null,
      longitude: null,
      error:null,
      sub_cat_image_url: false,
      avatar_url: false,
      items: {},
      jobUnread: false,
      messageUnread: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log(navigation)
        if(params){
          params.HomeAction()
        }
        defaultHandler()
      }
    }
  }

  HomeAction(){
    removeMyJobsScreen(true, () => {})
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        result = JSON.parse(result)
        postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
          //console.log(counts)
          this.setState({
            jobUnread: counts.job_notification,
            messageUnread: counts.message
          })
        })
      }
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({ 
      HomeAction: this.HomeAction.bind(this) 
    });
    setInterval(() => {
      AsyncStorage.getItem('user', (err, result) => {
        if(result !== null){
          result = JSON.parse(result)
          postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
            //console.log(counts)
            this.setState({
              jobUnread: counts.job_notification,
              messageUnread: counts.message
            })
          })
        }
      })
    }, 10000);
  }

  openSocial(type){
    let FANPAGE_ID;
    let FANPAGE_URL_FOR_APP;
    let FANPAGE_URL_FOR_BROWSER;
    if(type == 'yt'){
      Linking.openURL('https://www.youtube.com/channel/UCd6_EC3WnbW8b5EhXBygPSA?view_as=subscriber');
      return
    }
    if(type == 'fb'){
      FANPAGE_ID = 'Quickjobs4u.com.au'
      FANPAGE_URL_FOR_APP = `fb://page/${FANPAGE_ID}`
      FANPAGE_URL_FOR_BROWSER = `https://fb.com/${FANPAGE_ID}`
    }
    if(type == 'twitter'){
      FANPAGE_ID = 'Quickjobs4u'
      FANPAGE_URL_FOR_APP = `twitter:///user?screen_name=${FANPAGE_ID}`
      FANPAGE_URL_FOR_BROWSER = `https://twitter.com/${FANPAGE_ID}`
    }
    if(type == 'instagram'){
      FANPAGE_ID = 'quickjobs4u'
      FANPAGE_URL_FOR_APP = `instagram://user?username=${FANPAGE_ID}`
      FANPAGE_URL_FOR_BROWSER = `http://instagram.com/_u/${FANPAGE_ID}`
    }
    Linking.canOpenURL(FANPAGE_URL_FOR_APP)
    .then((supported) => {
      if (!supported) {
        Linking.openURL(FANPAGE_URL_FOR_BROWSER)
      } else {
        Linking.openURL(FANPAGE_URL_FOR_APP)
      }
    })
    .catch(err => console.error('An error occurred', err))
  }

  componentWillMount(){
    /* console.log(AppState.currentState)
    AppState.addEventListener('change', this._handleAppStateBackground); */
    removeMyJobsScreen(true, () => {})
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        result = JSON.parse(result)
        postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
          //console.log(counts)
          this.setState({
            jobUnread: counts.job_notification,
            messageUnread: counts.message
          })
        })
        getDeviceToken((test) => {
          firebase.notifications().getInitialNotification()
          .then((notificationOpen: NotificationOpen) => {
            if (notificationOpen) {
              const notification: Notification = notificationOpen.notification;
              if(notification.data.type){
                firebase.notifications().removeAllDeliveredNotifications()
                if(notification.data.type == 'job_for_me'){
                  AsyncStorage.getItem('jobScreen', (err, result) => {
                    if(result === null){
                      this.props.navigation.navigate('MyJobs')
                      saveMyJobsScreen(true, () => {})
                    }
                  })
                }
              }
            }
          });

          AsyncStorage.getItem('notiReg', (notieErr, notiResult) => {
            notiResult = JSON.parse(notiResult)
            console.log(notiResult)
            if(notiResult === null){
              firebase.notifications().onNotificationOpened((notificationOpen) => {
                if (notificationOpen) {
                  const notification: Notification = notificationOpen.notification;
                  if(notification.data.type){
                    firebase.notifications().removeAllDeliveredNotifications()
                    if(notification.data.type == 'job_for_me'){
                      AsyncStorage.getItem('jobScreen', (err, result) => {
                        if(result === null){
                          this.props.navigation.navigate('MyJobs')
                          saveMyJobsScreen(true, () => {})
                        }
                      })
                    }
                  }
                }
              });
              notificationRegistered(() => {})
            }
          })
        })
      }
    })

    getFormData('getHomeScreenData', (response) => {
      console.log(response)
      if(response){
        this.setState({
          sub_cat_image_url: response.sub_cat_image_url,
          avatar_url: response.customer_ReviewImage,
          howitworks: response.how_it_works,
          customerReviews: response.customerReviews,
          categories: response.Sub_category_info,
          loading: false
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })

    getFormData('professionalhomeSlider', (response) => {
      if(response){
        this.setState({
          slider: [
            {
              image: response.image_url+''+response.img,
              text: response.text
            },
            {
              image: response.image_url+''+response.img1,
              text: response.text1
            },
            {
              image: response.image_url+''+response.img2,
              text: response.text2
            }
          ],
          loading: false
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
  }

  changeTabRead(type){
    this.props.navigation.navigate(type)
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        result = JSON.parse(result)
        postFormData({user_id:result.id,user_type:result.user_type}, type == 'MyJobs' ? 'seeNotification' : 'seeMsgNotification', (counts) => {
          if(type == 'MyJobs'){
            this.setState({
              jobUnread: false
            })
          }else {
            this.setState({
              messageUnread: false
            })
          }
        })
      }
    })
  }

  /* _handleAppStateBackground = (nextAppState) => {
    console.log('abcd', nextAppState)
    if(nextAppState == 'background'){
      AsyncStorage.removeItem('notiReg')
      console.log('removed')
      AsyncStorage.getItem('notiReg', (err, result) => {
        console.log(result)
      })
    }
  } */

  callNumber(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    let sliderView = this.state.slider.map((slider, index) => {
      return (
        <View style={pageStyle.carouselContainer}>
          <ImageBackground
            style={pageStyle.sliderImage}
            source={{uri: slider.image}}
          >
            <Text style={pageStyle.sliderText}>{slider.text}</Text>
          </ImageBackground>
        </View>
      )
    })
    let howItWorksView = this.state.howitworks.map((howitwork, index) => {
      return (
        <View key={howitwork.id} style={pageStyle.howitworksBlock}>
          <Image
            style={pageStyle.howitworksImage}
            source={require('../../assets/images/howitworks.png')}
          />
          <Text style={pageStyle.howitworksJobHeading}>{howitwork.title.toUpperCase()}</Text>
          <Text style={pageStyle.howitworksJobDescription}>{howitwork.description}</Text>
          {/* <HTML html={howitwork.description} imagesMaxWidth={Dimensions.get('window').width} /> */}
        </View>
      )
    })
    let customerReviews = this.state.customerReviews.map((review, index) => {
      return (
        <View key={review.id} style={pageStyle.reviewUserBlock}>
          <Text style={pageStyle.review}>{review.description}</Text>
          <View style={pageStyle.reviewAvatarBlock}>
            <Image
              style={pageStyle.reviewAvatar}
              source={{uri: this.state.avatar_url+review.image}}
            />
            <Text style={pageStyle.reviewUser}>{review.name}</Text>
          </View>
        </View>
      )
    })
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#fb8519'}]}>
        <Header
          leftComponent={<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Icon name="menu" color="#fff" size={25} /></TouchableOpacity>}
          rightComponent={<Image style={{width: 30, height: 20}} source={require('../../assets/images/aus_flag.png')} />}
          outerContainerStyles={{width: '100%', backgroundColor: '#fb8519', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'QuickJobs4u', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          {this.state.loading && <View style={styles.loadingView}>
            <ActivityIndicator size="large" />
          </View>}
          {!this.state.loading && <View>
            {/*********** SLIDER VIEW ************/}
            <View style={pageStyle.sliderView}>
              <Carousel
                width={width}
                height={300}
                delay={5000}
                hideIndicators={true}
              >
                {sliderView}
              </Carousel>
              {/* <View style={pageStyle.queryButton}>
                <Text style={pageStyle.queryButtonText}>Get Quotes!</Text>
              </View> */}
            </View>
            {/*********** HOW IT WORKS VIEW ************/}
            <View style={pageStyle.howItWorksView}>
              <Text style={pageStyle.howitworksHeading}>HOW IT WORKS</Text>
              <Carousel
                width="100%"
                height={width < 360 ? 370 : 340}
                delay={5000}
                indicatorAtBottom={true}
                indicatorSize={Platform.OS == 'android' ? 25 : 0}
                indicatorColor="#cf2525"
              >
                {/* howItWorksView */}
                <View style={pageStyle.howitworksBlock}>
                  <Image
                    style={pageStyle.howitworksImage}
                    source={require('../../assets/images/howitworks1.png')}
                  />
                  <Text style={pageStyle.howitworksJobHeading}>Get Instant Notifications</Text>
                  <Text style={pageStyle.howitworksJobDescription}>The moment a job request is raised in your area get notified. Set your service area radius and be the first the know!</Text>
                </View>
                <View style={pageStyle.howitworksBlock}>
                  <Image
                    style={pageStyle.howitworksImage}
                    source={require('../../assets/images/howitworks2.png')}
                  />
                  <Text style={pageStyle.howitworksJobHeading}>Apply for the job with a quote</Text>
                  <Text style={pageStyle.howitworksJobDescription}>Apply for the job right away with a quote that you think is right for the job.</Text>
                </View>
                <View style={pageStyle.howitworksBlock}>
                  <Image
                    style={pageStyle.howitworksImage}
                    source={require('../../assets/images/howitworks3.png')}
                  />
                  <Text style={pageStyle.howitworksJobHeading}>Secure the job</Text>
                  <Text style={pageStyle.howitworksJobDescription}>Customer checks out your profile and awards the job. Once the job has been awarded to you connect with your customer and sort out the fine details and provide a great service.</Text>
                </View>
              </Carousel>
            </View>
            <View style={pageStyle.customerReviewsView}>
              <Text style={pageStyle.customerReviewsHeading}>CUSTOMER REVIEWS</Text>
              <View style={pageStyle.controls}>
                <View style={pageStyle.leftControl}>
                  <Image
                    style={pageStyle.controlIcon}
                    source={require('../../assets/images/left-arrow.png')}
                  />
                </View>
                <View style={pageStyle.rightControl}>
                  <Image
                    style={pageStyle.controlIcon}
                    source={require('../../assets/images/right-arrow.png')}
                  />
                </View>
              </View>
              <Carousel
                width="100%"
                hideIndicators={true}
                height={width < 360 ? 220 : 180}
                delay={5000}
                indicatorAtBottom={false}
                indicatorSize={0}
                indicatorColor="#cf2525"
              >
                {customerReviews}
              </Carousel>
            </View>
            {/*********** SOCIAL BLOCKS ************/}
              <View style={pageStyle.socialBlocksView}>
                <TouchableOpacity onPress={() => this.openSocial('fb')}>
                  <View style={pageStyle.socialBlock}>
                    <Image
                      style={pageStyle.socialIcon}
                      source={require('../../assets/images/facebook.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openSocial('yt')}>
                  <View style={pageStyle.socialBlock}>
                    <Image
                      style={pageStyle.socialIcon}
                      source={require('../../assets/images/youtube.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openSocial('instagram')}>
                  <View style={pageStyle.socialBlock}>
                    <Image
                      style={pageStyle.socialIcon}
                      source={require('../../assets/images/instagram.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openSocial('twitter')}>
                  <View style={pageStyle.socialBlock}>
                    <Image
                      style={pageStyle.socialIcon}
                      source={require('../../assets/images/twitter.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
          </View>}
        </ScrollView>
        <UnreadCount onPressJob={() => this.changeTabRead('MyJobs')} onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
      </SafeAreaView>
    );
  }
}