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
import { Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';

export default class DocumentsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user: false,
      documents: false,
      refreshing: false,
      extraData: false
    }
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      }, () => {
        this.getDocuments()
      })
    })
  }

  deleteAccreditations(id){
    Alert.alert(
      'Delete Document',
      'Do you want to delete this document?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          let data = {
            id,
            user_id: this.state.user.id
          }
          postFormData(data, 'deleteAccreditations', (response) => {
            this.getDocuments();
          })
        }},
      ],
      { cancelable: false }
    )
  }

  accreditationsData(item){
    return <View style={pageStyle.listItem}>
      <View style={pageStyle.testimonyDetails}>
        <Text style={pageStyle.testimonyTitle}>{item.accreditation_id == "other" ? item.other : item.Accreditations.name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.provider_name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.ticket_name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.expiry_date}</Text>
      </View>
      <View style={pageStyle.actionView}>
        <TouchableOpacity onPress={() => this.deleteAccreditations(item.id)}>
          <Image source={require('../../../assets/images/testimony_delete.png')} style={pageStyle.testimonyIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push('VerifiedBadge', {document: {
          id: item.id,
          accreditation: item.accreditation_id == "other" ? "other" : item.Accreditations.id,
          other_value: item.accreditation_id == "other" ? item.other : false,
          provider_name: item.provider_name,
          ticket_name: item.ticket_name,
          expiry_date: item.expiry_date,
          image: item.document ? this.state.extraData.img_Url+item.document : false
        }})}>
          <Image source={require('../../../assets/images/testimony_edit.png')} style={pageStyle.testimonyIcon} />
        </TouchableOpacity>
      </View>
    </View>
  }

  receiveData(data){
    console.log(data)
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getDocuments();
    })
  }

  getDocuments(){
    let data = {
      user_id: this.state.user.id
    }
    postFormData(data, 'UserAccreditations', (response) => {
      console.log(response)
      if(response){
        this.setState({
          loading: false,
          documents: response.data,
          refreshing: false,
          extraData: response
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
    if(!this.state.documents){
      return (
        <View style={[styles.scrollViewContainer, {padding: 10}]}>
          <Image style={pageStyle.certificate} source={require('../../../assets/images/certificate.png')} />
          <View style={pageStyle.loginTextView}>
            <Text style={pageStyle.loginText}>TO EARN THE BADGE, ADD DOCUMENTS HERE!</Text>
          </View>
          <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} text="Add More" onPress={() => this.props.navigation.push('VerifiedBadge')} />
        </View>
      )
    }
    return (
      <View style={[styles.scrollViewContainer, {padding: 10}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.documents}
          renderItem={({item}) => 
            this.accreditationsData(item)
          }
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
        <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} text="Add More" onPress={() => this.props.navigation.push('VerifiedBadge')} />
      </View>
    );
  }
}