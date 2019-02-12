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
  ActivityIndicator,
  SafeAreaView,
  FlatList
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, UnreadCount } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons"
import { postFormData, removeMyJobsScreen } from '../../../config/formHandler'
import StateManager from '../../StateManager';
import { Header } from 'react-native-elements';

export default class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user: false,
      extraData: false,
      refreshing: false,
      messages: [],
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
          params.walletAction()
        }
        defaultHandler()
      }
    }
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
  }

  walletAction(){
    this.setState({
      loading: true
    }, () => {
      removeMyJobsScreen(true, () => {})
      this.makeRemoteRequest()
    })
  }

  receiveData(){
    this.setState({
      loading: true
    }, () => {
      removeMyJobsScreen(true, () => {})
      this.makeRemoteRequest()
    })
  }

  componentDidMount(){
    removeMyJobsScreen(true, () => {})
    this.makeRemoteRequest()
    this.props.navigation.setParams({ 
      walletAction: this.walletAction.bind(this) 
    });
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
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

  makeRemoteRequest(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
          ////console.log(counts)
          this.setState({
            jobUnread: counts.job_notification,
            messageUnread: counts.message
          })
        })
        setInterval(() => {
          postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
            ////console.log(counts)
            this.setState({
              jobUnread: counts.job_notification,
              messageUnread: counts.message
            })
          })
        }, 10000);
        postFormData({user_id:result.id,user_type:result.user_type}, 'seeMsgNotification', (counts) => {})
        this.setState({
          user: result
        })
        let data = {
          user_id: result.id
        }
        postFormData(data, 'chats', (response) => {
          if(response){
            this.setState({
              extraData: response,
              messages: response.data,
              refreshing: false,
              loading: false
            })
          }else {
            this.setState({
              refreshing: false,
              loading: false
            })
          }
        })
      }
    })
  }

  messagesData(item){
    if(item.sender_id == this.state.user.id){
      return <TouchableOpacity style={[pageStyle.listItem, {paddingVertical: 0, borderBottomWidth: 1}]} onPress={() => this.props.navigation.push('Chats', {thread: item.id, name: item.Reciver.name, sender_id: item.sender_id})}>
        <View style={pageStyle.listItem}>
          <View style={pageStyle.avatar}>
            <Image
              style={pageStyle.avatarImage}
              source={item.Reciver.image ? {uri: this.state.user.type == 'professionals' ?this.state.extraData.customer_image_url+item.Reciver.image : this.state.extraData.professional_image_url+item.Reciver.image} : require('../../../assets/images/avatar.png')}
            />
          </View>
          <View style={pageStyle.content}>
            <Text style={pageStyle.username}>{item.Reciver.name}</Text>
            {item.count_unread_msg > 0 && <Text style={pageStyle.status}>New Message</Text>}
          </View>
          <View style={pageStyle.icon}>
            <Image
              style={pageStyle.iconImage}
              source={require('../../../assets/images/message-icon.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
    }
    return <TouchableOpacity style={[pageStyle.listItem, {paddingVertical: 0, borderBottomWidth: 1}]} onPress={() => this.props.navigation.push('Chats', {thread: item.id, name: item.Sender.name, sender_id: item.sender_id})}>
      <View style={pageStyle.listItem}>
        <View style={pageStyle.avatar}>
          <Image
            style={pageStyle.avatarImage}
            source={item.Sender.image ? {uri: this.state.extraData.professional_image_url+item.Sender.image} : require('../../../assets/images/avatar.png')}
          />
        </View>
        <View style={pageStyle.content}>
          <Text style={pageStyle.username}>{item.Sender.name}</Text>
          {item.count_unread_msg > 0 && <Text style={pageStyle.status}>New Message</Text>}
        </View>
        <View style={pageStyle.icon}>
          <Image
            style={pageStyle.iconImage}
            source={require('../../../assets/images/message-icon.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  }

  render() {
    /* if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    } */
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#cf2525'}]}>
        <Header
          outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'Messages', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        {this.state.loading && <View style={styles.loadingView}>
          <ActivityIndicator size="large" />
        </View>}
        {(!this.state.loading && this.state.messages.length > 0) && <View style={styles.container}>
          <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false} style={pageStyle.messagesListing}>
            <FlatList
              ref="listRef"
              showsVerticalScrollIndicator={false}
              data={this.state.messages}
              renderItem={({item}) => 
                this.messagesData(item)
              }
              keyExtractor={item => item.id}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </ScrollView>
          <UnreadCount onPressJob={() => this.changeTabRead('MyJobs')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
        </View>}
        {(!this.state.loading && this.state.messages.length == 0) && <View style={styles.loadingView}>
          <Text style={{fontSize: 20}}>No message for you yet</Text>
        </View>}
      </SafeAreaView>
    );
  }
}