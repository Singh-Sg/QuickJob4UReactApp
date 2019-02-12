import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  TouchableNativeFeedback,
  ActivityIndicator,
  FlatList
} from 'react-native'
import styles from '../../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../../config/formHandler'

export default class PlanHistory extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      refreshing: false,
      plans: []
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
    })
  }

  componentWillMount(){
    this.makeRemoteRequest()
  }

  makeRemoteRequest(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      postFormData({user_id: result.id}, 'professnalPlanHistory', (response) => {
        if(response){
          this.setState({
            plans: response,
            loading: false,
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

  flatListData(item, index){
    let month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    expiryDate = new Date(item.expiry_date);
    let expiryDay = expiryDate.getDate() < 10 ? '0'+expiryDate.getDate() : expiryDate.getDate()
    let expiryMonth = month[expiryDate.getMonth()]
    let expiryYear = expiryDate.getFullYear()
    expiryDate = expiryDay+' '+expiryMonth+', '+expiryYear

    paymentDate = new Date(item.payment_date);
    let paymentDay = paymentDate.getDate() < 10 ? '0'+paymentDate.getDate() : paymentDate.getDate()
    let paymentMonth = month[paymentDate.getMonth()]
    let paymentYear = paymentDate.getFullYear()
    paymentDate = paymentDay+' '+paymentMonth+', '+paymentYear
    return <View style={pageStyle.listItem}>
      <View style={pageStyle.statusView}>
        <Text style={pageStyle.status}>{item.payment_status}</Text>
      </View>
      <Text style={pageStyle.jobId}>{item.Users.first_name}</Text>
      <Text style={pageStyle.jobType}>Payment Type: {item.payment_type}</Text>
      <Text style={pageStyle.price}>{item.amount_pay} AUD</Text>
      <View style={pageStyle.jobLocationView}>
        <Text style={pageStyle.locationText}>{paymentDate} - {expiryDate}</Text>
      </View>
    </View>
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <View style={styles.scrollViewContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.plans}
          renderItem={({item, index}) => 
            this.flatListData(item, index)
          }
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          />
      </View>
    );
  }
}