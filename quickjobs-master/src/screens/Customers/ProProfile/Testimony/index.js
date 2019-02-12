import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../../config/formHandler'
import StateManager from '../../../StateManager';

export default class ProTestimony extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user: false,
      testimonies: [],
      refreshing: false
    }
  }

  componentWillMount(){
    this.getTestimonies()
  }

  deleteTestimony(id){
    let data = {
      id
    }
    postFormData(data, 'deleteTestimoney', (response) => {
      console.log(response)
      this.getTestimonies();
    })
  }

  testimonyData(item){
    return <View style={pageStyle.listItem}>
      <View style={pageStyle.testimonyDetails}>
        <Text style={pageStyle.testimonyTitle}>{item.name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.details}</Text>
      </View>
    </View>
  }
  
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getTestimonies();
    })
  }

  getTestimonies(){
    const { params } = this.props.navigation.state;
    console.log(params.id)
    postFormData({user_id: params.id}, 'getuserInfo', (response) => {
      this.setState({
        user: response
      })
      let data = {
        user_id: this.state.user.id
      }
      postFormData(data, 'professnalTestimoney', (response) => {
        console.log(response)
        if(response){
          this.setState({
            loading: false,
            testimonies: response,
            refreshing: false
          })
        }else {
          this.setState({
            loading: false,
            refreshing: false
          })
        }
      })
    })
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <View style={[styles.scrollViewContainer, {padding: 10}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.testimonies}
          renderItem={({item}) => 
            this.testimonyData(item)
          }
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}