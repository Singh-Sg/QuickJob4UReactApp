/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { createRootNavigator } from "./src/routes/";
import { isSignedIn } from "./src/routes/auth";
import SplashScreen from 'react-native-splash-screen'


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => {
        this.setState({ signedIn: res, checkedSignIn: true })
      })
      .catch(err => alert("An error occurred"));
      AsyncStorage.removeItem('notiReg')
     
      setTimeout(() => {  
         SplashScreen.hide();
      }, 800)
  }
  
  render() {
    const { checkedSignIn, signedIn } = this.state;
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

//125495478