import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Image,
  ImageBackground
} from 'react-native'
import styles from '../../../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData, postFormData } from '../../../../../config/formHandler'
import { TextField, Button } from '../../../../../components';
import StateManager from '../../../../StateManager';

export default class AddReview extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      rating: null,
      feedback: '',
      feedbackError: false
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    console.log(params)
  }

  changeRating(rating){
    this.setState({
      rating: rating
    })
  }

  applyRating(){
    const { params } = this.props.navigation.state;
    let error = 0
    if(!this.state.feedback){
      this.setState({
        feedbackError: true
      })
      error = 1
    }else {
      this.setState({
        feedbackError: false
      })
    }
    if(!this.state.rating){
      alert('Please select star rating')
      error = 1
    }
    if(error == 1){
      return;
    }
    this.setState({
      loading: true
    })
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      let datatosend = {
        cust_id: result.id,
        prof_id: params.prof.data.id,
        job_id: params.job_id,
        job_unique_id: params.job_unique_id,
        rating: this.state.rating,
        review: this.state.feedback
      }
      postFormData(datatosend, 'customerWriteReview', (response) => {
        if(response){
          console.log(response)
          this.setState({
            loading: false
          })
          StateManager.getInstance().receiveData(datatosend);
          this.props.navigation.goBack();
        }else {
          this.setState({
            loading: false
          })
        }
      })
    })
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ScrollView style={styles.scrollViewContainer}>
        <View style={pageStyle.userDetails}>
          <Image style={pageStyle.userAvatar} source={params.prof.data.image ? {uri:  params.prof.professnal_image_url+params.prof.data.image} : require('../../../../../assets/images/male_avatar.png')} />
          <View style={pageStyle.userTexts}>
            <Text style={pageStyle.userName}>{params.prof.data.first_name}</Text>
            <Text style={pageStyle.userJOBID}>{params.job_unique_id}</Text>
          </View>
        </View>
        <View style={pageStyle.ratingBox}>
          <TouchableOpacity onPress={() => this.changeRating(1)}>
            <Icon name="star" size={30} color={this.state.rating === null ? '#dedede' : this.state.rating > 0 ? 'gold' : '#dedede'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeRating(2)}>
            <Icon name="star" size={30} color={this.state.rating === null ? '#dedede' : this.state.rating > 1 ? 'gold' : '#dedede'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeRating(3)}>
            <Icon name="star" size={30} color={this.state.rating === null ? '#dedede' : this.state.rating > 2 ? 'gold' : '#dedede'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeRating(4)}>
            <Icon name="star" size={30} color={this.state.rating === null ? '#dedede' : this.state.rating > 3 ? 'gold' : '#dedede'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeRating(5)}>
            <Icon name="star" size={30} color={this.state.rating === null ? '#dedede' : this.state.rating > 4 ? 'gold' : '#dedede'} />
          </TouchableOpacity>
        </View>
        <Text style={pageStyle.ratingHeading}>RATING</Text>
        <View style={styles.formView}>
          <TextField inputStyle={{borderBottomColor: this.state.feedbackError ? '#fa0000' : '#dedede'}} onChangeText={(feedback) => this.setState({feedback})} label="Feedback" multiline numberOfLines={5} />
          <Button loading={this.state.loading} onPress={() => this.applyRating()} containerStyle={{width: '60%'}} style={{backgroundColor: '#cf2525'}} text="SUBMIT" />
        </View>
      </ScrollView>
    );
  }
}