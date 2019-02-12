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
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../../components'
import Icon from "react-native-vector-icons/MaterialIcons"
import { postFormData } from '../../../../config/formHandler'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import StateManager from '../../../StateManager';
let setInetval;

export default class ChatsPro extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user: false,
      extraData: false,
      refreshing: false,
      messages: [],
      receiver: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params.name,
      headerLeft: <TouchableOpacity onPress={params.backAction}><View style={{paddingLeft: 15}}><Icon name="arrow-back" size={25} color="#fff" /></View></TouchableOpacity>
    }
  }

  componentWillUnmount(){
    clearInterval(setInetval);
  }

  backAction(){
    const { params } = this.props.navigation.state;
    StateManager.getInstance().receiveData();
    this.props.navigation.goBack();
  }

  componentDidMount(){
    this.props.navigation.setParams({ 
      backAction: this.backAction.bind(this) 
    });
    this.makeRemoteRequest()
    setInetval = setInterval(() => {
      this.getLatestMessages()
    }, 3000);
  }

  getLatestMessages(){
    if(!this.state.receiver){
      return;
    }
    let data = {
      sender_id: this.state.user.id,
      reciver_id: this.state.receiver,
    }
    console.log(data)
    let rawMessages;
    postFormData(data, 'getLatestMessages', (response) => {
      console.log('latest', response)
      if(response.data !== undefined){
        rawMessages = response.data
        rawMessages.forEach((element, index) => {
          let singleMessage = {
            _id: element.message_id,
            text: element.message,
            createdAt: element.msg_time,
            user: {
              _id: element.id,
              name: element.name,
            }
          }
          if(element.image){
            singleMessage.user.avatar = this.state.user.type == 'professionals' ? this.state.extraData.customer_image_url+element.image : this.state.extraData.customer_image_url+element.image
          }else {
            singleMessage.user.avatar = 'https://quickjobs4u.com.au/img/default_avatar.png'
          }
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, singleMessage),
          }))
        });
      }
    })
  }

  makeRemoteRequest(){
    const { params } = this.props.navigation.state;
    if(params.thread){
      let data = {
        thread_id: params.thread
      }
      this.setState({
        receiver: params.receiver_id
      })
      let rawMessages = [];
      AsyncStorage.getItem('user', (err, result) => {
        result = JSON.parse(result)
        if(result !== null){
          this.setState({
            user: result
          })
          data.sender_id = result.id
          console.log(data)
          console.log(params)
          postFormData(data, 'getChatMessages', (response) => {
            if(response){
              console.log('onload', response)
              rawMessages = response.data
              this.setState({
                extraData: response
              }, () => {
                rawMessages.forEach((element, index) => {
                  let singleMessage = {
                    _id: element.id,
                    text: element.message,
                    createdAt: element.created,
                    user: {
                      _id: element.sender_id,
                      name: element.sender_id == result.id ? element.Sender.name : element.Reciver.name,
                    }
                  }
                  if(index == 0){
                    this.setState({
                      receiver: element.sender_id == result.id ? element.Reciver.id : element.Sender.id
                    })
                  }
                  if(element.sender_id == result.id){
                    if(element.Sender.image){
                      singleMessage.user.avatar = this.state.extraData.professional_image_url+element.Sender.image
                    }else {
                      singleMessage.user.avatar = 'https://quickjobs4u.com.au/img/default_avatar.png'
                    }
                  }else {
                    if(element.Sender.image){
                      singleMessage.user.avatar = this.state.extraData.customer_image_url+element.Sender.image
                    }else {
                      singleMessage.user.avatar = 'https://quickjobs4u.com.au/img/default_avatar.png'
                    }
                  }
                  this.state.messages.push(singleMessage)
                });
                this.setState({
                  messages: this.state.messages,
                  refreshing: false,
                  loading: false
                })
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
    }else {
      AsyncStorage.getItem('user', (err, result) => {
        result = JSON.parse(result)
        if(result !== null){
          this.setState({
            user: result
          })
        }
      })
      this.setState({
        receiver: params.sender_id,
        loading: false
      })
    }
  }
  
  onSend(messages = []) {
    let data = {
      sender_id: this.state.user.id,
      reciver_id: this.state.receiver,
      message: messages[0].text
    }
    messages[0].user.avatar = this.state.user.image ? this.state.user.img_Url+this.state.user.image : 'https://quickjobs4u.com.au/img/default_avatar.png'
    console.log(messages)
    postFormData(data, 'sendMessage', (response) => {
      if(response){
        console.log(response)
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    })
  }

  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#fb8519'
          }
        }}
      />
    )
  }

  renderTime(item) {
    return (
      <Text>Test</Text>
    )
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <SafeAreaView style={styles.scrollViewContainer}>
        <GiftedChat
          showUserAvatar
          locale
          renderAvatarOnTop
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user.id,
          }}
        />
      </SafeAreaView>
    );
  }
}