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
  Dimensions,
  AsyncStorage,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, UnreadCount } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData, saveMyJobsScreen } from '../../../config/formHandler'
import StateManager from '../../StateManager';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window')
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { getDeviceToken } from '../../../config/firebase';
import { Header } from 'react-native-elements';

export default class MyJobsPro extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 1,
      newjobs: false,
      appliedjobs: false,
      newloading: true,
      appliedloading: true,
      newrefreshing: false,
      appliedrefreshing: false,
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

  myJobsAction(){
    this.setState({
      appliedloading: true,
      newloading: true
    }, () => {
      saveMyJobsScreen(true, () => {})
      AsyncStorage.getItem('user', (err, result) => {
        result = JSON.parse(result)
        if(result !== null){


          postFormData({user_id:result.id,user_type:result.user_type}, 'seeNotification', (counts) => {})



          this.setState({
            user: result
          }, () => {
            this.getNewJobs();
            this.getAppliedJobs();
          })
        }
      })
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({ 
      myJobsAction: this.myJobsAction.bind(this) 
    });

    AsyncStorage.getItem('jobScreen', (err, result) => {
      console.log(result)
    })
  }

  componentWillMount(){
    saveMyJobsScreen(true, () => {})
    StateManager.getInstance().setReceiver(this);
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){


        postFormData({user_id:result.id,user_type:result.user_type}, 'seeNotification', (counts) => {})
        setInterval(() => {
          postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
            //console.log(counts)
            this.setState({
              jobUnread: counts.job_notification,
              messageUnread: counts.message
            })
          })
        }, 10000);


        this.setState({
          user: result
        }, () => {
          this.getNewJobs();
          this.getAppliedJobs();
        })
      }
    })
    firebase.notifications().onNotificationOpened((notificationOpen) => {
      if (notificationOpen) {
        const notification: Notification = notificationOpen.notification;
        if(notification.data.type){
          firebase.notifications().removeAllDeliveredNotifications()
          if(notification.data.type == 'job_for_me'){
            this.setState({
              newrefreshing: true,
              appliedrefreshing: true
            }, () => {
              this.getNewJobs();
              this.getAppliedJobs();
            })
            //this.props.navigation.navigate('MyJobs')
          }
        }
      }
    });
  }

  receiveData(data){
    this.setState({
      newrefreshing: true,
      appliedrefreshing: true
    })
    this.getNewJobs();
    this.getAppliedJobs();
  }

  handleNewRefresh = () => {
    this.setState({
      newrefreshing: true
    }, () => {
      this.getNewJobs();
    })
  }

  handleAppliedRefresh = () => {
    this.setState({
      appliedrefreshing: true
    }, () => {
      this.getAppliedJobs();
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

  getNewJobs(){
    AsyncStorage.getItem('jobScreen', (err, result) => {
      result = JSON.parse(result)
      console.log(result)
      if(result !== null){
      }
    })
    let data = {
      user_id: this.state.user.id
    }
    postFormData(data, 'ProfessnalJobForMe', (response) => {
      if(response){
        this.setState({
          newjobs: response,
          extra_data: response
        })
      }
      this.setState({
        newloading: false,
        newrefreshing: false
      })
    })
  }

  getAppliedJobs(){
    let data = {
      user_id: this.state.user.id
    }
    postFormData(data, 'ProfessnalAppliedJobs', (response) => {
      if(response){
        this.setState({
          appliedjobs: response,
          extra_data: response
        })
      }
      this.setState({
        appliedloading: false,
        appliedrefreshing: false
      })
    })
  }
  
  newJobsData(item){
    //if(item.CustomersCreatedJobs.job_type == 'Quote'){
      return <TouchableOpacity onPress={() => this.props.navigation.push('ViewJobPro', {id: item.CustomersCreatedJobs.id})}>
        <View style={pageStyle.listItem}>
          <View style={pageStyle.statusView}>
            <Text style={pageStyle.status}>{item.CustomersCreatedJobs.job_status == 'close' ? 'closed' : item.CustomersCreatedJobs.job_status}</Text>
          </View>
          <Text style={pageStyle.jobId}>ID: {item.CustomersCreatedJobs.job_id}</Text>
          <Text style={pageStyle.jobType}>{item.CustomersCreatedJobs.job_title}</Text>
          <Text style={pageStyle.price}>{item.CustomersCreatedJobs.JobSubSubCategories ? item.CustomersCreatedJobs.JobSubSubCategories.price_aus : ''} AUD</Text>
          <View style={pageStyle.jobLocationView}>
            <Icon name="location-on" size={18} color="1c1c1c" />
            <Text style={pageStyle.locationText}>{item.CustomersCreatedJobs.registered_address ? item.CustomersCreatedJobs.registered_address : item.CustomersCreatedJobs.address1}</Text>
          </View>
        </View>
      </TouchableOpacity>
    //}
  }
  
  appliedJobsData(item){
    return <TouchableOpacity onPress={() => {
      console.log(item.customers_created_job_id)
      this.props.navigation.push('ViewJobPro', {id: item.customers_created_job_id})
    }}>
      <View style={pageStyle.listItem}>
        <View style={pageStyle.statusView}>
          {/* <Text style={pageStyle.status}>{item.CustomersCreatedJobs.job_status}</Text> */}
          <Text style={pageStyle.status}>Applied</Text>
        </View>
        <Text style={pageStyle.jobId}>ID: {item.CustomersCreatedJobs.job_id}</Text>
        <Text style={pageStyle.jobType}>{item.CustomersCreatedJobs.job_title}</Text>
        <Text style={pageStyle.price}>{item.CustomersCreatedJobs.JobSubSubCategories ? item.CustomersCreatedJobs.JobSubSubCategories.price_aus : ''} AUD</Text>
      </View>
    </TouchableOpacity>
  }

  changeTab(index){
    this.setState({
      activeTab: index
    })
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#fb8519'}]}>
        <Header
          outerContainerStyles={{width: '100%', backgroundColor: '#fb8519', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'My Jobs', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        <View style={pageStyle.tabView}>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(1)}>
            <View style={[pageStyle.tab, this.state.activeTab == 1 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>NEW JOBS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(2)}>
            <View style={[pageStyle.tab, this.state.activeTab == 2 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>APPLIED JOBS</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={pageStyle.tabContent}>
          {this.state.activeTab == 1 && <View style={pageStyle.newJobs}>
            {this.state.newloading && <View style={styles.loadingView}>
              <ActivityIndicator size="large" />
            </View>}
            {(!this.state.newloading && this.state.newjobs.length > 0) && <FlatList
            ref="listRef"
            showsVerticalScrollIndicator={false}
            data={this.state.newjobs}
            renderItem={({item}) => 
              this.newJobsData(item)
            }
            keyExtractor={item => item.id}
            refreshing={this.state.newrefreshing}
            onRefresh={this.handleNewRefresh}
            />}
            {(!this.state.newloading && this.state.newjobs.length == 0) && <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{fontSize: 20}}>No jobs for you yet</Text>
            </View>}
          </View>}
          {this.state.activeTab == 2 && <View style={pageStyle.newJobs}>
            {this.state.appliedloading && <View style={styles.loadingView}>
              <ActivityIndicator size="large" />
            </View>}
            {(!this.state.newloading && this.state.appliedjobs.length > 0) && <FlatList
            ref="listRef"
            showsVerticalScrollIndicator={false}
            data={this.state.appliedjobs}
            renderItem={({item}) => 
              this.appliedJobsData(item)
            }
            keyExtractor={item => item.id}
            refreshing={this.state.appliedrefreshing}
            onRefresh={this.handleAppliedRefresh}
            />}
            {(!this.state.newloading && this.state.appliedjobs.length == 0) && <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{fontSize: 20}}>No jobs for you yet</Text>
            </View>}
          </View>}
        </View>
        <UnreadCount onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
      </SafeAreaView>
    );
  }
}