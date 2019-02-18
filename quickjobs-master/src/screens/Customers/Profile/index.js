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
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, UnreadCount } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from "react-native-image-picker";
var FileUpload = require('NativeModules').FileUpload
import RNFetchBlob from 'react-native-fetch-blob'

import { onSignOut, onSignIn } from '../../../routes/auth'
import { drawer_routes } from '../../../config/drawer_routes';
import { dummyNoti } from '../../../config/firebase';
import StateManager from '../../StateManager';
import { removeMyJobsScreen, postFormData } from '../../../config/formHandler'
import { Header } from 'react-native-elements';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      avatarSource: false,
      avatarURL: false,
      username: false,
      user_id: false,
      avatarLoading: false,
      user_real_id: false,
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
          params.myProfileAction()
        }
        defaultHandler()
      }
    }
  }

  myProfileAction(){
    removeMyJobsScreen(true, () => {})
  }

  receiveData(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user_real_id: result.id,
        username: result.name,
        user_id: 'C'+result.id,
        avatarSource: result.image ? {uri: result.img_Url+''+result.image} : false
      })
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

  changeProfilePic(){
    this.setState({
      avatarLoading: true
    })
    var options = {
      title: 'Select Avatar',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({
          avatarLoading: false
        })
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({
          avatarLoading: false
        })
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        let ret = String(response.uri).replace('file:///','');
        this.setState({
          avatarSource: source,
          avatarURL: Platform.OS == 'android' ? response.path : ret
        }, () => {
          this.uploadPicture()
        });
      }
    });
  }

  uploadPicture(){
    // Post binary data using base64 encoding
    let form_data = [
      { name : 'id', data : String(this.state.user_real_id)},
    ]
    if(this.state.avatarURL){
      form_data.push({
        name: 'image',
        filename: 'file.jpeg',
        data: RNFetchBlob.wrap(this.state.avatarURL),
        type: 'image/jpeg'
      })
    }
    RNFetchBlob.fetch('POST', 'https://quickjobs4u.com.au/api/home/customerProfilePic', { 
        'Content-Type' : 'multipart/form-data', 
    }, form_data).then((res) => {
      if(JSON.parse(res.data).code == 0){
        alert(JSON.parse(res.data).message)
      }else {
        onSignIn(JSON.parse(res.data).data)
      }
    })
      this.setState({
        avatarLoading: false
      })

  }

  signOut(){
    onSignOut()
    this.props.navigation.navigate('SignedOut')
  }

  componentWillMount(){
    removeMyJobsScreen(true, () => {})
    StateManager.getInstance().setReceiver(this);
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
        this.setState({
          jobUnread: counts.job_notification,
          messageUnread: counts.message
        })
      })
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
        user_real_id: result.id,
        username: result.name,
        user_id: 'C'+result.id,
        avatarSource: result.image ? {uri: result.img_Url+''+result.image} : false
      })
    })
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#cf2525'}]}>
        <Header
          outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          <ImageBackground style={pageStyle.background} source={require('../../../assets/images/bg.png')}>
          </ImageBackground>
          <View style={pageStyle.contentView}>
            <View style={pageStyle.userSection}>
              <View style={pageStyle.avatarView}>
                <Image
                  style={pageStyle.avatarImage}
                  source={this.state.avatarSource ? this.state.avatarSource : require('../../../assets/images/male_avatar.png')}
                />
                <TouchableOpacity style={pageStyle.avatarEdit} onPress={() => this.changeProfilePic()}>
                  <View style={[pageStyle.avatarEdit, {bottom: 0, right: 0}]}>
                    <Icon name="photo-camera" size={15} color="#000" />
                  </View>
                </TouchableOpacity>
                {this.state.avatarLoading && <View style={pageStyle.loadingAvatar}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>}
              </View>
              {this.state.username && <Text style={pageStyle.username}>{this.state.username}</Text>}
              {this.state.user_id && <Text style={pageStyle.userid}>{this.state.user_id}</Text>}
            </View>
            <View style={pageStyle.listingSection}>
              <TouchableOpacity onPress={() => this.props.navigation.push('EditProfile')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>My Profile</Text>
                  <Icon name="keyboard-arrow-right" size={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('MyAlerts')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>My Alert</Text>
                  <Icon name="keyboard-arrow-right" size={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('ChangePassword')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Change Password</Text>
                  <Icon name="keyboard-arrow-right" size={20} />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => this.props.navigation.push('CategoryDocs')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Category and Documents</Text>
                  <Icon name="keyboard-arrow-right" size={20} />
                </View>
              </TouchableOpacity> */}
              {this.state.username && <Button onPress={() => this.signOut()} text="Log out" style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '40%'}} />}
            </View>
          </View>
        </ScrollView>
        <UnreadCount onPressJob={() => this.changeTabRead('MyJobs')} onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
      </SafeAreaView>
    );
  }
}