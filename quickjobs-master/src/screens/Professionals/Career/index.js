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
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData } from '../../../config/formHandler'

export default class Career extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      refreshing: false,
      careers: []
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
    getFormData('career', (response) => {
      if(response){
        this.setState({
          careers: response,
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
  }

  flatListData(item, index){
    return <View style={pageStyle.careerView}>
      <View style={pageStyle.jobIDView}><Text style={pageStyle.jobID}>Job ID: {item.job_id}</Text></View>
      <View style={pageStyle.jobDescription}>
        <View style={[pageStyle.descBlock, {marginBottom: 5, marginTop: 8}]}>
          <Image
            style={pageStyle.icon}
            source={require('../../../assets/images/jobtitle.png')}
          />
          <Text style={pageStyle.descText}>{item.position}</Text>
        </View>
        <View style={pageStyle.descBlock}>
          <Image
            style={pageStyle.icon}
            source={require('../../../assets/images/notes.png')}
          />
          <Text style={pageStyle.descText}>{item.description}</Text>
        </View>
      </View>
    </View>
  }

  render() {
    return (
      <View style={styles.scrollViewContainer}>
        {this.state.loading && <View style={styles.loadingView}>
          <ActivityIndicator size="large" />
        </View>}
        {!this.state.loading && <View style={pageStyle.listContainer}>
          <FlatList
          ref="listRef"
          showsVerticalScrollIndicator={false}
          data={this.state.careers}
          //style={{backgroundColor: '#d8d8d8'}}
          renderItem={({item, index}) => 
                this.flatListData(item, index)
          }
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          />
        </View>}
      </View>
    );
  }
}