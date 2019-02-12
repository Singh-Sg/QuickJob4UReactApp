import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps'

export default class Directions extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      customer: false,
      professional: false
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state
    console.log(params.customer)
    console.log(params.professional)
    this.setState({
      customer: params.customer,
      professional: params.professional
    }, () => {
      console.log(this.state.customer)
      console.log(this.state.professional)
      this.setState({
        loading: false
      })
    })
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    const origin = {latitude: parseFloat(this.state.professional.lat), longitude: parseFloat(this.state.professional.lng)};
    const destination = {latitude: parseFloat(this.state.customer.add1_latitude), longitude: parseFloat(this.state.customer.add1_longitude)};
    console.log(origin)
    console.log(destination)
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCYkM5bJdw5gSnK0Z5TdWlI8zcg_d5gbOI';
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <MapView style={pageStyle.map} initialRegion={{
          latitude: parseFloat(this.state.professional.lat),
          longitude: parseFloat(this.state.professional.lng),
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}>
          <MapView.Marker coordinate={origin} />
          <MapView.Marker coordinate={destination} />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={6}
            strokeColor="#42b9f4"
          />
        </MapView>
      </View>
    );
  }
}