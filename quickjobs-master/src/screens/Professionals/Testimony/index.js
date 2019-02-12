import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';

export default class Testimony extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user: false,
      testimonies: false,
      refreshing: false
    }
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      }, () => {
        this.getTestimonies()
      })
    })
  }

  deleteTestimony(id){
    Alert.alert(
      'Delete Testimony',
      'Do you want to delete this testimony?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          let data = {
            id
          }
          console.log(data)
          postFormData(data, 'deleteTestimoney', (response) => {
            console.log(response)
            this.getTestimonies();
          })
        }},
      ],
      { cancelable: false }
    )
  }

  testimonyData(item){
    return <View style={pageStyle.listItem}>
      <View style={pageStyle.testimonyDetails}>
        <Text style={pageStyle.testimonyTitle}>{item.name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.details}</Text>
      </View>
      <View style={pageStyle.actionView}>
        <TouchableOpacity onPress={() => this.deleteTestimony(item.id)}>
          <Image source={require('../../../assets/images/testimony_delete.png')} style={pageStyle.testimonyIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push('AddTestimony', {testimony: item})}>
          <Image source={require('../../../assets/images/testimony_edit.png')} style={pageStyle.testimonyIcon} />
        </TouchableOpacity>
      </View>
    </View>
  }

  receiveData(data){
    console.log(data)
    this.getTestimonies();
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getTestimonies();
    })
  }

  getTestimonies(){
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