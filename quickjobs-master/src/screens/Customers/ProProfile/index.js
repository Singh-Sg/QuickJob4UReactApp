import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  ImageBackground,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { drawer_routes } from '../../../config/drawer_routes';
import { postFormData } from '../../../config/formHandler';
import StateManager from '../../StateManager';

let headerAction;

export default class ProProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user_data: false,
      extra_data: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params.name,
      headerLeft: <TouchableOpacity onPress={params.backAction}><View style={{paddingLeft: 15}}><Icon name="arrow-back" size={25} color="#fff" /></View></TouchableOpacity>
    }
  }

  backAction(){
    const { params } = this.props.navigation.state;
    StateManager.getInstance().receiveData({
      prof_id: params.id,
      rating: this.state.user_data.avarage_rating
    });
    this.props.navigation.goBack();
  }

  componentDidMount(){
    this.props.navigation.setParams({ 
      backAction: this.backAction.bind(this) 
    });
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
    this.remoteData()
  }

  remoteData(){
    const { params } = this.props.navigation.state;
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      let data = {
        prof_id: params.id,
        customer_id: result.id,
        job_id: params.job_id
      }
      postFormData(data, 'customerViewSpProfile', (response) => {
        console.log(response.data)
        if(response.data){
          this.setState({
            extra_data: response,
            user_data: response.data,
            loading: false
          })
        }else {
          this.setState({
            loading: false
          })
        }
      })
    })
  }

  receiveData(data){
    this.state.extra_data.reviewThisJob = 'yes'
    this.setState({
      extra_data: this.state.extra_data
    })
    this.remoteData()
  }

  render() {
    headerAction = this
    const { params } = this.props.navigation.state;
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <ImageBackground style={pageStyle.background} source={this.state.user_data.cover_image ? {uri:  this.state.extra_data.professnal_image_url+this.state.user_data.cover_image} : require('../../../assets/images/bg.png')}>
        </ImageBackground>
        <View style={pageStyle.contentView}>
          <View style={pageStyle.userSection}>
            <View style={pageStyle.avatarView}>
              <Image
                style={pageStyle.avatarImage}
                source={this.state.user_data.image ? {uri:  this.state.extra_data.professnal_image_url+this.state.user_data.image} : require('../../../assets/images/male_avatar.png')}
              />
            </View>
            {this.state.user_data.name && <Text style={pageStyle.username}>{this.state.user_data.name}</Text>}
            {this.state.user_data.address1 && <Text style={pageStyle.userid}>{this.state.user_data.address1}</Text>}
            <View style={pageStyle.ratingView}>
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating > 0 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating > 1 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating > 2 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating > 3 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating > 4 ? 'gold' : '#dedede'} />
            </View>
            {this.state.extra_data.reviewThisJob == 'no' && <TouchableOpacity onPress={() => {
              let datatosend = {
                prof: this.state.extra_data,
                job_id: params.job_id,
                job_unique_id: params.job_unique_id,
              }
              this.props.navigation.push('AddReview', datatosend)
            }}><Text style={[pageStyle.userid, {marginTop: 10}]}>Write a Review</Text></TouchableOpacity>}
          </View>
          <View style={pageStyle.listingSection}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('AboutMe', {about_data: this.state.user_data.about_me})}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>About Me</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('Accomplishments', {user: this.state.extra_data})}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>My Accomplishments</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('ProRatingsReviews', {id: params.id})}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Review and Rating</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('ProTestimony', {id: params.id})}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Testimony</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {
              if(this.state.user_data.video_link){
                this.props.navigation.push('VideoPlayer', {video: this.state.user_data.video_link})
              }else {
                alert("Video doesn't exist")
              }
            }}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Youtube Video Link</Text>
              </View>
            </TouchableNativeFeedback>
            {(this.state.user_data.paypal_me_link !== undefined && this.state.user_data.paypal_me_link != '') && <TouchableNativeFeedback onPress={() => {
                if(this.state.user_data.paypal_me_link){
                  Linking.openURL(this.state.user_data.paypal_me_link)
                }else {
                  alert('URL is not available')
                }
              }}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Paypal Payment</Text>
                <View style={{backgroundColor: '#cf2525', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 25}}>
                  <Text style={{color: '#fff', fontSize: 12}}>Pay</Text>
                </View>
              </View>
            </TouchableNativeFeedback>}
            {this.state.username && <Button onPress={() => this.signOut()} text="Log out" style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '40%'}} />}
          </View>
        </View>
      </ScrollView>
    );
  }
}