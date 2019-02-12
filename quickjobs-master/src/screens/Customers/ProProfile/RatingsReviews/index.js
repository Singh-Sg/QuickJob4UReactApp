import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  ActivityIndicator,
  AsyncStorage,
  Image,
  ImageBackground
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData, postFormData } from '../../../../config/formHandler'

export default class ProRatingsReviews extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      ratings: [],
      extraData: false,
      user: false
    }
  }

  componentDidMount(){
    this.getRatings()
  }

  getRatings(){
    const { params } = this.props.navigation.state;
    postFormData({user_id: params.id}, 'getuserInfo', (response) => {
      this.setState({
        user: response
      })
      let data = {
        prof_id: response.id
      }
      postFormData(data, 'professnalReviews', (response) => {
        if(response){
          this.setState({
            loading: false,
            ratings: response.data ? response.data : response,
            extraData: response
          })
        }
      })
    })
  }

  render() {
    const { ratings, extraData, user } = this.state;
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    const reviews = ratings.map((item, index) => {
      return <View style={pageStyle.reviewItem}>
        <View style={pageStyle.topViewReview}>
          <View style={pageStyle.avatarViewList}>
            <Image style={pageStyle.reviewUserAvatarImage} source={{uri: extraData.customer_image_url+item.Users.image}} />
          </View>
          <View style={pageStyle.reviewUserNameView}>
            <Text style={pageStyle.reviewUserName}>{item.Users.name}</Text>
          </View>
          <View style={pageStyle.reviewRatingView}>
            <Icon name="star" size={20} color="#fb8519" />
            <Text style={pageStyle.reviewRatingText}>{item.ratings}</Text>
          </View>
        </View>
        <View style={pageStyle.reviewDescView}>
          <Text style={pageStyle.reviewDescText}>{item.feedback}</Text>
        </View>
      </View>
    })
    if(reviews.length == 0){
      return <View style={styles.scrollViewContainer}>
        <Text style={{fontSize: 18, alignSelf: 'center',
      marginTop: 100, fontWeight: 'bold'}}>No Reviews Found</Text>
      </View>
    }
    return (
      <View style={styles.scrollViewContainer}>
        <View style={pageStyle.totalReviewsView}>
          <View style={pageStyle.totalReviewsInnerView}>
            <View style={pageStyle.totalReviews}>
              <Text style={pageStyle.totalReviewsText}>{this.state.user.avarage_rating}</Text>
              <Icon name="star" size={20} color="#fff" />
            </View>
            <View style={pageStyle.fromReviews}>
              <Text style={pageStyle.fromReviewsText}>from {ratings.length} review(s)</Text>
            </View>
            <View style={pageStyle.userAvatar}>
              <Image style={pageStyle.userAvatarImage} source={{uri: user.img_Url+user.image}} />
            </View>
          </View>
        </View>
        <View style={pageStyle.reviews}>
          {reviews}
        </View>
      </View>
    );
  }
}