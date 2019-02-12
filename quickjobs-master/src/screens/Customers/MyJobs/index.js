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
  FlatList,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, UnreadCount } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData, saveMyJobsScreen } from '../../../config/formHandler'
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { getDeviceToken } from '../../../config/firebase';
import { Header } from 'react-native-elements';

export default class MyJobs extends Component {
  constructor(props){
    super(props)
    this.state = {
      jobs: false,
      extra_data: false,
      loading: true,
      refreshing: false,
      user: false,
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
          params.myJobsAction()
        }
        defaultHandler()
      }
    }
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

  myJobsAction(){
    this.setState({
      loading: true
    }, () => {
      saveMyJobsScreen(true, () => {})
      AsyncStorage.getItem('user', (err, result) => {
        result = JSON.parse(result)
        if(result !== null){
          postFormData({user_id:result.id,user_type:result.user_type}, 'seeNotification', (counts) => {})
        }
      })
      this.makeRemoteRequest()
    })
  }

  componentWillMount(){
    saveMyJobsScreen(true, () => {})
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        /* postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
          //console.log(counts)
          this.setState({
            jobUnread: counts.job_notification,
            messageUnread: counts.message
          })
        }) */
        setInterval(() => {
          postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
            //console.log(counts)
            this.setState({
              jobUnread: counts.job_notification,
              messageUnread: counts.message
            })
          })
        }, 10000);


        postFormData({user_id:result.id,user_type:result.user_type}, 'seeNotification', (counts) => {})
        this.setState({
          user: result
        }, () => {
          this.makeRemoteRequest();
        })
      }
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({ 
      myJobsAction: this.myJobsAction.bind(this) 
    });
    firebase.notifications().onNotificationOpened((notificationOpen) => {
      if (notificationOpen) {
        const notification: Notification = notificationOpen.notification;
        if(notification.data.type){
          firebase.notifications().removeAllDeliveredNotifications()
          if(notification.data.type == 'job_for_me'){
            this.setState({
              refreshing: true,
            }, () => {
              this.makeRemoteRequest();
            })
            //this.props.navigation.navigate('MyJobs')
          }
        }
      }
    });
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
    })
  }

  makeRemoteRequest(){
    let data = {
      user_id: this.state.user.id
    }
    postFormData({user_id:this.state.user.id,user_type:this.state.user.user_type}, 'seeNotification', (counts) => {})
    postFormData(data, 'customerMyJobs', (response) => {
      console.log('myjobs', response)
      if(response){
        this.setState({
          jobs: response.data,
          extra_data: response
        })
      }
      this.setState({
        loading: false,
        refreshing: false
      })
    })
  }
  
  flatListData(item){
    return <TouchableOpacity onPress={() => this.props.navigation.push('ViewJob', {id: item.id})}>
      <View style={pageStyle.listItem}>
        <View style={pageStyle.statusView}>
          <Text style={pageStyle.status}>{item.job_status == 'close' ? 'closed' : item.job_status}</Text>
        </View>
        <Text style={pageStyle.jobId}>ID: {item.job_id}</Text>
        <Text style={pageStyle.jobType}>{item.JobSubCategories ? item.JobSubCategories.sub_category_name : ''}</Text>
        {item.JobAppliedProfessionals.length > 0 && <Text style={pageStyle.applied}>{item.JobAppliedProfessionals.length} People Applied</Text>}
        {item.JobAppliedProfessionals.length > 0 && <View style={pageStyle.people}>
          {item.JobAppliedProfessionals.map((proitem, proindex) => {
        <Text>{this.state.extra_data.professnal_image_url+proitem.Users.image}</Text>
          return <Image
              style={pageStyle.avatar}
              source={proitem.Users.image != null ? {uri: this.state.extra_data.professnal_image_url+proitem.Users.image} : require('../../../assets/images/male_avatar.png')}
            />
          })}
        </View>}
      </View>
    </TouchableOpacity>
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#cf2525'}]}>
        <Header
          outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'My Jobs', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        {this.state.loading && <View style={styles.loadingView}>
          <ActivityIndicator size="large" />
        </View>}
        {(!this.state.loading && this.state.jobs) && <View style={styles.container}>
          <View style={pageStyle.balanceView}>
            <Text style={pageStyle.customerID}>C{this.state.user.id}</Text>
            <Text style={pageStyle.balance}>BALANCE: ${this.state.user.my_avl_balance}</Text>
          </View>
          <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.jobs}
          renderItem={({item}) => 
            this.flatListData(item)
          }
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          />
        </View>}
        {(!this.state.loading && !this.state.jobs) && <View style={{width:'100%',justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#fff'}}>
          <Text style={{fontSize: 20}}>No jobs for you yet</Text>
        </View>}
        <UnreadCount onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
      </SafeAreaView>
    );
  }
}