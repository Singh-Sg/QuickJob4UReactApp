import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  TouchableOpacity,
  AppState,
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
import HTML from 'react-native-render-html';
import { getFormData, removeMyJobsScreen, saveMyJobsScreen, removeNotificationRegistered, notificationRegistered, postFormData } from '../../config/formHandler'
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { getDeviceToken, dummyNoti } from '../../config/firebase'
import { UnreadCount } from '../../components'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchFocus: false,
      searchCategories: [],
      searchText: '',
      loading: true,
      slider: [],
      howitworks: [],
      categories: [],
      customerReviews: [],
      latitude: null,
      longitude: null,
      error:null,
      sub_cat_image_url: false,
      avatar_url: false,
      items: {},
      firstShow: false,
      registered: false,
      notificationListener: false,
      jobUnread: false,
      messageUnread: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log("homes tabs "+navigation)
        console.log("homes tabs params"+params)

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
        console.log({user_id:result.id,user_type:result.user_type})
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

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.navigation.setParams({ 
      HomeAction: this.HomeAction.bind(this) 
    });
    let notiCount = 0
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        result = JSON.parse(result)
        removeMyJobsScreen(true, () => {})
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
            console.log('res', notiResult)
            if(notiResult === null){
              firebase.notifications().onNotificationOpened((notificationOpen) => {
                if (notificationOpen) {
                  const notification: Notification = notificationOpen.notification;
                  console.log(notification)
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
            }
          })
          notificationRegistered(() => {})
        })
      }
    })
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

  componentWillUnmount(){
    //removeNotificationRegistered(() => {})
    //AppState.removeEventListener('change', this._handleAppStateBackground);
  }

  componentWillMount(){
    //AppState.addEventListener('change', this._handleAppStateBackground);
    getFormData('getHomeScreenData', (response) => {
      if(response){
        this.setState({
          sub_cat_image_url: response.sub_cat_image_url,
          avatar_url: response.customer_ReviewImage,
          howitworks: response.how_it_works,
          customerReviews: response.customerReviews,
          slider: [
            {
              image: response.slide_info.image_url+''+response.slide_info.img
            },
            {
              image: response.slide_info.image_url+''+response.slide_info.img1
            },
            {
              image: response.slide_info.image_url+''+response.slide_info.img2
            }
          ],
          categories: response.Sub_category_info,
          loading: false
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
    getFormData('getHomeSearchCategory', (response) => {
      if(response){
        this.setState({
          searchCategories: response
        })
      }
    })
  }

  changeTabRead(type){
    this.props.navigation.navigate(type)
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        console.log("change tab read ")
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

  createJob(category){
    AsyncStorage.getItem('user', (err, result) => {
      if(result === null){
        this.props.navigation.push('SignIn')
      }else {
        this.props.navigation.push('NewJob', {category_id: category.id})
      }
    });
  }

  createJobFromSearch(category){
    AsyncStorage.getItem('user', (err, result) => {
      if(result === null){
        this.props.navigation.push('SignIn')
      }else {
        this.setState({
          searchFocus: false,
          searchText: '',
          filteredCategories: false
        })
        this.props.navigation.push('NewJob', {category_id: category, searched: true})
      }
    });
  }

  openSocial(type){
    let FANPAGE_ID;
    let FANPAGE_URL_FOR_APP;
    let FANPAGE_URL_FOR_BROWSER;
    if(type == 'yt'){
      Linking.openURL('https://www.youtube.com/channel/UCd6_EC3WnbW8b5EhXBygPSA?view_as=subscriber');
      return;
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

  render() {
    let sliderView = this.state.slider.map((slider, index) => {
      return (
        <View style={pageStyle.carouselContainer}>
          <Image
            style={pageStyle.sliderImage}
            source={{uri: slider.image}}
          />
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
          {/* <Image
            style={pageStyle.howitworksImage}
            source={require('../../assets/images/howitworks.png')}
          />
          <Text style={pageStyle.howitworksJobHeading}>{review.name}</Text>
          <Text style={pageStyle.howitworksJobDescription}>{review.description}</Text> */}
        </View>
      )
    })
    let categoryBlocks = this.state.categories.map((category, index) => {
      return (
        <TouchableOpacity onPress={() => this.createJob(category)}>
          <View key={category.id} style={[pageStyle.categoryBlock, {backgroundColor: index % 2 ? '#fff' : '#efefef'}]}>
            {category.image1 && <Image
              style={pageStyle.categoryIconImage}
              source={{uri: this.state.sub_cat_image_url+category.image1}}
            />}
            <Text style={pageStyle.categoryName}>{category.sub_category_name}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#cf2525'}]}>
        <Header
          leftComponent={<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Icon name="menu" color="#fff" size={25} /></TouchableOpacity>}
          rightComponent={<Image style={{width: 30, height: 20}} source={require('../../assets/images/aus_flag.png')} />}
          outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'QuickJobs4u', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          {this.state.loading && <View style={styles.loadingView}>
            <ActivityIndicator size="large" />
          </View>}
          {!this.state.loading && <View>
            {/*********** SEARCH VIEW ************/}
            <SearchBar
            onChangeText={(searchText) => {
              this.setState({searchText}, () => {
                let filtered = [];
                this.state.searchCategories.filter((item) => {
                  if(item.toLowerCase().includes(searchText.toLowerCase())){
                    filtered.push(item)
                  }
                })
                this.setState({
                  filteredCategories: filtered
                })
              })
            }}
            value={this.state.searchText}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInputStyle}
            lightTheme
            showLoading
            onFocus={() => this.setState({searchFocus: true})}
            onSubmitEditing={() => {
              if(!this.state.searchText){
                this.setState({searchFocus: false})
              }
            }}
            icon={{ type: 'material', color: '#cf2525', name: 'search' }}
            placeholder='Whom do you need today? e.g. Cleaner, Tiler, Electrician...' />
            {/*********** SEARCH VIEW ************/}
            {this.state.searchFocus && <ScrollView style={styles.scrollViewContainer}>
            <View style={pageStyle.styleEgStrip}>
              <Text>eg. CLEANER, TILER, ELECTRICIAN</Text>
              <TouchableOpacity onPress={() => this.setState({searchFocus: false})}><Text style={{color: '#cf2525'}}>Close</Text></TouchableOpacity>
            </View>
            {this.state.filteredCategories && this.state.filteredCategories.map((item, index) => {
              return <TouchableOpacity onPress={() => this.createJobFromSearch(item)}>
                <View style={pageStyle.searchBlock}>
                  <Icon style={pageStyle.searchListIcon} size={20} color="#cf2525" name="call-made" />
                  <Text style={pageStyle.searchText}>{item}</Text>
                </View>
              </TouchableOpacity>
            })}
            {!this.state.filteredCategories && this.state.searchCategories.map((item, index) => {
              return <TouchableOpacity onPress={() => this.createJobFromSearch(item)}>
                <View style={pageStyle.searchBlock}>
                  <Icon style={pageStyle.searchListIcon} size={20} color="#cf2525" name="call-made" />
                  <Text style={pageStyle.searchText}>{item}</Text>
                </View>
              </TouchableOpacity>
            })}
            </ScrollView>}
            {!this.state.searchFocus && <View>
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
                <View style={pageStyle.queryButton}>
                  <Text style={pageStyle.queryButtonText}>Get Quotes!</Text>
                </View>
              </View>
              {/*********** CALLBACK VIEW ************/}
              {/* <View style={pageStyle.callBackView}>
                <View style={pageStyle.callBackHeading}>
                  <Text style={pageStyle.callBackHeadingText}>DIAL IN A JOB</Text>
                </View>
                <View style={pageStyle.callBackBlock}>
                  <View removeClippedSubviews style={pageStyle.callBackInputView}>
                    <View style={pageStyle.callBackInputBlock}>
                      <Text style={pageStyle.callbackInput}>03 85979129</Text>
                    </View>
                    <View style={pageStyle.callBackInputButtonBlock}>
                      <TouchableOpacity onPress={() => this.callNumber('tel:0385979129')}>
                        <View style={pageStyle.callBackInputButton}>
                          <Image
                            style={pageStyle.callIcon}
                            source={require('../../assets/images/call.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View> */}
              {/*********** CATEGORIES VIEW ************/}
              <View style={pageStyle.categoriesView}>
                {categoryBlocks}
              </View>
              {/*********** HOW IT WORKS VIEW ************/}
              <View style={pageStyle.howItWorksView}>
                <Text style={pageStyle.howitworksHeading}>HOW IT WORKS</Text>
                <Carousel
                  width={"100%"}
                  height={width < 360 ? 370 : 340}
                  delay={5000}
                  indicatorAtBottom={true}
                  indicatorSize={Platform.OS == 'android' ? 25 : 0}
                  indicatorColor="#cf2525"
                >
                  {howItWorksView}
                </Carousel>
              </View>
              {/*********** BANNER VIEW ************/}
              {/* <View style={pageStyle.bannerView}>
                <Image
                  style={pageStyle.bannerImage}
                  source={require('../../assets/images/banner.jpg')}
                />
              </View> */}
              {/*********** CUSTOMER REVIEW ************/}
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
                  height={width < 360 ? 200 : 200}
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
          </View>}
        </ScrollView>
        <UnreadCount onPressJob={() => this.changeTabRead('MyJobs')} onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
      </SafeAreaView>
    );
  }
}