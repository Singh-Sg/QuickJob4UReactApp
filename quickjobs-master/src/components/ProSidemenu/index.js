import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './styles'
import {  NavigationActions } from 'react-navigation'
import { ScrollView, Text, View, Animated, Easing, TouchableOpacity, Image, AsyncStorage, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialIcons";
import { drawer_routes } from '../../config/drawer_routes'

class ProSidemenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props){
    super(props)
    this.state = {
      aboutUsPosition: new Animated.Value(300),
      support: new Animated.Value(300),
      userNavs: []
    }
  }

  componentDidMount(){
    drawer_routes((navs) => {
      this.setState({
        userNavs: navs
      })
    })
  }

  openAboutUs(){
    Animated.timing(this.state.aboutUsPosition, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease
    }).start();
  }

  closeAboutUs(){
    Animated.timing(this.state.aboutUsPosition, {
      toValue: 300,
      duration: 200,
      easing: Easing.ease
    }).start();
  }

  openSupport(){
    Animated.timing(this.state.support, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease
    }).start();
  }

  closeSupport(){
    Animated.timing(this.state.support, {
      toValue: 300,
      duration: 200,
      easing: Easing.ease
    }).start();
  }

  render () {
    return (
      <View style={[styles.container, {overflow: 'hidden'}]}>
        <View style={styles.bottomView}>
          <Text style={styles.bottomViewText}>QuickJobs4u.com.au is owned and operated</Text>
          <Text style={styles.bottomViewText}>by HVS INFO TECH PTY LTD, ACN : 623 922 609</Text>
          <Text style={styles.bottomViewText}>Copyright &copy; 2017 HVS INFO TECH PTY LTD.</Text>
        </View>
        <View style={{backgroundColor: '#fff', paddingTop: Platform.OS == 'ios' ? 40 : 0}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <View style={styles.backView}>
                <Image style={styles.logo} source={require('../../assets/images/nav-icon.png')} />
              <View style={styles.backTextView}>
                <Text style={[styles.backText, {color: '#cf2525'}]}>QuickJobs4u</Text>
              </View>
            </View>
          </TouchableOpacity>
          {this.state.userNavs.map((item, index) => {
            return <TouchableOpacity onPress={() => {
              if(item.title == 'Sign In'){
                this.props.navigation.navigate('SignIn')
              }
              if(item.title == 'Customer Sign up'){
                this.props.navigation.navigate('CustomerSignUp', {professional: false})
              }
              if(item.title == 'Service Professional Sign up'){
                this.props.navigation.navigate('CustomerSignUp', {professional: true})
              }
            }}>
              <View style={styles.listItem}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          })}
          <TouchableOpacity onPress={() => this.openAboutUs()}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>About Us</Text>
              <Icon name="keyboard-arrow-right" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProHowItWorks')}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>How it works</Text>
              {/* <Icon name="keyboard-arrow-right" size={20} /> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openSupport()}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Support</Text>
              <Icon name="keyboard-arrow-right" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.innerLevelPage, {left: this.state.aboutUsPosition, paddingTop: Platform.OS == 'ios' ? 40 : 0}]}>
          <View style={styles.backView}>
            <TouchableOpacity onPress={() => this.closeAboutUs()}>
              <View style={styles.backIcon}>
                <Icon name="arrow-back" size={25} color="#515151" />
              </View>
            </TouchableOpacity>
            <View style={styles.backTextView}>
              <Text style={styles.backText}>About Us</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutUs', {mission: false})}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>About Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutUs', {mission: true})}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Our Mission</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Career')}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Careers</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs')}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Contact Us</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.innerLevelPage, {left: this.state.support, paddingTop: Platform.OS == 'ios' ? 40 : 0}]}>
          <View style={styles.backView}>
            <TouchableOpacity onPress={() => this.closeSupport()}>
              <View style={styles.backIcon}>
                <Icon name="arrow-back" size={25} color="#515151" />
              </View>
            </TouchableOpacity>
            <View style={styles.backTextView}>
              <Text style={styles.backText}>Support</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpFaq')}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Help &amp; FAQ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs')}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Contact Us</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

ProSidemenu.propTypes = {
  navigation: PropTypes.object
};

export default ProSidemenu;