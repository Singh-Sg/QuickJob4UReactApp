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
  Switch,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, UnreadCount } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from "react-native-image-picker";
import { onSignOut, onSignIn } from '../../../routes/auth'
import { drawer_routes } from '../../../config/drawer_routes';
import { postFormData, removeMyJobsScreen } from '../../../config/formHandler';
import StateManager from '../../StateManager';
import { Header } from 'react-native-elements';
var FileUpload = require('NativeModules').FileUpload

export default class ProfilePro extends Component {
  constructor(props){
    super(props)
    this.state = {
      avatarSource: false,
      not_status: false,
      avl_bal: false,
      avatarURL: false,
      username: false,
      user_id: false,
      avatarLoading: false,
      user_real_id: false,
      coverImageLoading: false,
      coverImageSource: false,
      coverImageURL: false,
      online: false,
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

  walletAction(){
    removeMyJobsScreen(true, () => {})
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      console.log(result)
      postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
        //console.log(counts)
        this.setState({
          jobUnread: counts.job_notification,
          messageUnread: counts.message
        })
      })
      this.setState({
        not_status: result.job_notification_status,
        avl_bal: result.my_avl_balance,
        user_real_id: result.id,
        username: result.name,
        user_id: 'SP'+result.id,
        avatarSource: result.image ? {uri: result.img_Url+''+result.image} : false,
        coverImageSource: result.cover_image ? {uri: result.img_Url+''+result.cover_image} : false,
        online: result.profile_show_status == 0 ? false : true
      })
    })
  }

  componentDidMount(){
    removeMyJobsScreen(true, () => {})
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
        //console.log(counts)
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
        not_status: result.job_notification_status,
        avl_bal: result.my_avl_balance,
        user_real_id: result.id,
        username: result.name,
        user_id: 'SP'+result.id,
        avatarSource: result.image ? {uri: result.img_Url+''+result.image} : false,
        coverImageSource: result.cover_image ? {uri: result.img_Url+''+result.cover_image} : false,
        online: result.profile_show_status == 0 ? false : true
      })
    })
    this.props.navigation.setParams({ 
      walletAction: this.walletAction.bind(this) 
    });
  }

  receiveData(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        not_status: result.job_notification_status,
        avl_bal: result.my_avl_balance,
        user_real_id: result.id,
        username: result.name,
        user_id: 'SP'+result.id,
        avatarSource: result.image ? {uri: result.img_Url+''+result.image} : false,
        coverImageSource: result.cover_image ? {uri: result.img_Url+''+result.cover_image} : false,
        online: result.profile_show_status == 0 ? false : true
      })
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
    
        this.setState({
          avatarSource: source,
          avatarURL: Platform.OS == 'android' ? response.path : response.uri
        }, () => {
          this.uploadPicture()
        });
      }
    });
  }

  uploadPicture(){
    var obj = {
        uploadUrl: 'https://quickjobs4u.com.au/api/home/customerProfilePic',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        fields: {
          'id': String(this.state.user_real_id),
        },
        files: [{
          name: 'image',
          filename: 'file.jpg',
          filepath: this.state.avatarURL,
          extension: 'image/jpeg'
        }]
    };
    console.log(obj)
    FileUpload.upload(obj, (err, result) => {
      if(JSON.parse(result.data).code == 0){
        alert(JSON.parse(result.data).message)
      }else {
        onSignIn(JSON.parse(result.data).data)
      }
      this.setState({
        avatarLoading: false
      })
    })
  }

  changeCoverPic(){
    this.setState({
      coverImageLoading: true
    })
    var options = {
      title: 'Select Cover Image',
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
          coverImageLoading: false
        })
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({
          coverImageLoading: false
        })
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        this.setState({
          coverImageSource: source,
          coverImageURL: Platform.OS == 'android' ? response.path : response.uri
        }, () => {
          this.uploadCoverPicture()
        });
      }
    });
  }

  uploadCoverPicture(){
    var obj = {
        uploadUrl: 'https://quickjobs4u.com.au/api/home/changeCoverPic',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        fields: {
          'id': String(this.state.user_real_id),
        },
        files: [{
          name: 'image',
          filename: 'file.jpg',
          filepath: this.state.coverImageURL,
          extension: 'image/jpeg'
        }]
    };
    FileUpload.upload(obj, (err, result) => {
      if(JSON.parse(result.data).code == 0){
        alert(JSON.parse(result.data).message)
      }else {
        onSignIn(JSON.parse(result.data).data)
      }
      this.setState({
        coverImageLoading: false
      })
    })
  }

  signOut(){
    onSignOut()
    this.props.navigation.navigate('SignedOut')
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
  }

  changeOnlineStatus(){
    let data = {
      user_id: this.state.user_real_id
    }
    postFormData(data, 'changeUserProfileStatus', (response) => {
      if(response){
        onSignIn(response)
        this.setState({
          online: this.state.online ? false : true
        })
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#fb8519'}]}>
        <Header
          outerContainerStyles={{width: '100%', backgroundColor: '#fb8519', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          <ImageBackground style={pageStyle.background} source={this.state.coverImageSource ? this.state.coverImageSource : require('../../../assets/images/probg.jpg')}>
            <View style={pageStyle.coverImageView}>
              <TouchableOpacity onPress={() => this.changeCoverPic()}>
                <View style={pageStyle.editCoverImageView}>
                  <Icon name="photo-camera" size={15} color="#000" />
                  <Text style={pageStyle.editCoverImageText}>EDIT</Text>
                </View>
              </TouchableOpacity>
            </View>
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
              {this.state.user_id && <Text style={pageStyle.userid}>Your Balance: AUD {this.state.avl_bal.toFixed(2)}</Text>}
              <View style={pageStyle.goOnlineView}>
                <Text style={pageStyle.goOnlineText}>Go Online</Text>
                <Switch onTintColor={Platform.OS == 'android' ? "#fb8519" : "#efefef"} thumbTintColor="#fb8519" value={this.state.online} onValueChange={() => this.changeOnlineStatus()} />
              </View>
            </View>
            <View style={pageStyle.listingSection}>
              <TouchableOpacity onPress={() => this.props.navigation.push('EditProfilePro')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>My Profile</Text>
                  <Icon name="keyboard-arrow-right" size={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('MyAlertsPro')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>My Alert</Text>
                  <Icon name="keyboard-arrow-right" size={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('CategoryDocs')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Category &amp; Documents</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('Testimony')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Testimony</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('RatingsReviews')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Ratings &amp; Reviews</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('JobCalendar')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Job Calendar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('MyPlans')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>My Plans</Text>
                  {/* <Icon name="keyboard-arrow-right" size={20} /> */}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('PlanHistory')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Plan History</Text>
                  {/* <Icon name="keyboard-arrow-right" size={20} /> */}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.push('ChangePassword')}>
                <View style={pageStyle.listItem}>
                  <Text style={pageStyle.listItemText}>Change Password</Text>
                </View>
              </TouchableOpacity>
              {this.state.username && <Button onPress={() => this.signOut()} text="Log out" style={{backgroundColor: '#fb8519', paddingVertical: 10, width: '40%'}} />}
            </View>
          </View>
        </ScrollView>
        <UnreadCount onPressJob={() => this.changeTabRead('MyJobs')} onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
      </SafeAreaView>
    );
  }
}