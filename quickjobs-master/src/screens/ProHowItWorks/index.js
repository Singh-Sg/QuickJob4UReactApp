import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image
} from 'react-native'
import styles from '../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData } from '../../config/formHandler'
import Accordion from 'react-native-collapsible/Accordion';
import HTML from 'react-native-render-html'

export default class ProHowItWorks extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      content: false
    }
  }

  static navigationOptions = { tabBarVisible: false }

  componentWillMount(){
    getFormData('howItWorks', (response) => {
      if(response){
        this.setState({
          content: response,
          loading: false
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
  }

  _renderSectionTitle(section) {
    return (
      <View style={pageStyle.content}>
        <HTML onLinkPress={() => {}}  html={section.description} imagesMaxWidth="100%" />
      </View>
    );
  }

  _renderHeader(section, i, isActive) {
    return (
      <View style={pageStyle.header}>
        <Text style={pageStyle.headerText}>{section.title}</Text>
        <Icon style={pageStyle.headerIcon} name={isActive ? "remove" : "add"} size={20} color="#a5a5a5" />
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={pageStyle.content}>
        <HTML onLinkPress={() => {}} html={section.description} imagesMaxWidth="100%" />
      </View>
    );
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={[styles.scrollViewContainer, {padding: 20}]} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        {this.state.loading && <ActivityIndicator size="large" />}
        {!this.state.loading && <Accordion
          touchableComponent={TouchableNativeFeedback}
          initiallyActiveSection={0}
          sections={this.state.content}
          //renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />}
      </ScrollView>
    );
  }
}