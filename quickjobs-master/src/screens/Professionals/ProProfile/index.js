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
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { drawer_routes } from '../../../config/drawer_routes';
import { postFormData } from '../../../config/formHandler';

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
    }
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    let data = {
      prof_id: params.id
    }
    postFormData(data, 'customerViewSpProfile', (response) => {
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
  }

  render() {
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
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating < 2 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating < 3 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating < 4 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating < 5 ? 'gold' : '#dedede'} />
              <Icon name="star" size={20} color={this.state.user_data.avarage_rating === null ? '#dedede' : this.state.user_data.avarage_rating < 6 ? 'gold' : '#dedede'} />
            </View>
          </View>
          <View style={pageStyle.listingSection}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('AboutMe', {about_data: this.state.user_data.about_me})}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>About Me</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('MyAlerts')}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>My Accomplishments</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('ChangePassword')}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Review and Rating</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('ChangePassword')}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Testimony</Text>
                <Icon name="keyboard-arrow-right" size={20} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.navigation.push('ChangePassword')}>
              <View style={pageStyle.listItem}>
                <Text style={pageStyle.listItemText}>Youtube Video Link</Text>
              </View>
            </TouchableNativeFeedback>
            {this.state.username && <Button onPress={() => this.signOut()} text="Log out" style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '40%'}} />}
          </View>
        </View>
      </ScrollView>
    );
  }
}