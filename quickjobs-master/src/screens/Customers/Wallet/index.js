import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, ModalPopup, UnreadCount } from '../../../components'
//import PayPalButton from '../../../components/PayPalButton'
import PayPal from 'react-native-paypal-wrapper';
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { postFormData, removeMyJobsScreen } from '../../../config/formHandler'
import { onSignIn } from '../../../routes/auth'
import { Header } from 'react-native-elements';

export default class Wallet extends Component {
  constructor(props){
    super(props)
    this.state = {
      popupVisible: false,
      addMoneyLoading: false,
      moneyValue: '',
      moneyError: false,
      paymentConfirmed: false,
      user: false,
      wallet: [],
      refreshing: false,
      loading: true,
      jobUnread: false,
      messageUnread: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log(navigation)
        if(params){
          params.walletAction()
        }
        defaultHandler()
      }
    }
  }

  walletAction(){
    removeMyJobsScreen(true, () => {})
    this.getWalletInfo()
  }

  componentDidMount(){
    removeMyJobsScreen(true, () => {})
    this.getWalletInfo();
    this.props.navigation.setParams({ 
      walletAction: this.walletAction.bind(this) 
    });
  }

  addMoneyPopup(){
    this.setState({
      popupVisible: true
    })
  }

  closePopup(){
    this.setState({
      popupVisible: false,
      addMoneyLoading: false
    })
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getWalletInfo();
    })
  }

  changeTabRead(type){
    this.props.navigation.navigate(type)
    AsyncStorage.getItem('user', (err, result) => {
      if(result !== null){
        result = JSON.parse(result)
        postFormData({user_id:result.id,user_type:result.user_type}, type == 'MyJobs' ? 'seeNotification' : 'seeMsgNotification', (counts) => {
          if(type == 'MyJobs'){
            this.setState({
              jobUnread: false
            })
          }else {
            this.setState({
              messageUnread: false
            })
          }
        })
      }
    })
  }

  getWalletInfo(){
    this.setState({
      loading: true
    })
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      if(result !== null){
        postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
          //console.log(counts)
          this.setState({
            jobUnread: counts.job_notification,
            messageUnread: counts.message
          })
        })
        setInterval(() => {
          postFormData({user_id:result.id,user_type:result.user_type}, 'countNotification', (counts) => {
            //console.log(counts)
            this.setState({
              jobUnread: counts.job_notification,
              messageUnread: counts.message
            })
          })
        }, 10000);
        let data = {
          user_id: result.id
        }
        this.setState({
          user: result
        })
        postFormData(data, 'walletInfo', (response) => {
          if(response){
            this.setState({
              wallet: response.data
            })
          }
          this.setState({
            loading: false,
            refreshing: false
          })
        })
      }
    })
  }
  
  timeDifference(previous) {
    current = new Date()
    previous = new Date(previous)
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  }

  walletData(item){
    /*
      <View style={pageStyle.listItem}>
        <View style={pageStyle.icon}>
          <Image
            style={pageStyle.iconImage}
            source={require('../../../assets/images/money.png')}
          />
        </View>
        <View style={pageStyle.content}>
          <Text style={pageStyle.topText}>Add Money</Text>
          <Text style={pageStyle.bottomText}>Payment - 3 weeks ago</Text>
        </View>
        <View style={pageStyle.price}>
          <Text style={pageStyle.priceText}>AUD: 10</Text>
        </View>
      </View>
    */
    return <View style={pageStyle.listItem}>
      <View style={pageStyle.icon}>
        <Image
          style={pageStyle.iconImage}
          source={require('../../../assets/images/orange-money.png')}
        />
      </View>
      <View style={pageStyle.content}>
        <Text style={pageStyle.topText}>{item.payment_desc}</Text>
        <Text style={pageStyle.bottomText}>Payment - {this.timeDifference(item.payment_time)}</Text>
      </View>
      <View style={pageStyle.price}>
        <Text style={pageStyle.priceText}>AUD: {item.total_amount}</Text>
      </View>
    </View>
  }

  payNow(){
    let error = 0
    if(!this.state.moneyValue){
      this.setState({
        moneyError: true
      })
      error = 1
    }else {
      this.setState({
        moneyError: false
      })
    }
    if(error == 1){
      return
    }
    this.setState({
      addMoneyLoading: true
    })
    let data = {
      user_id: this.state.user.id,
      amount: this.state.moneyValue
    }
    postFormData(data, 'addMoney', (response) => {
      data.add_money_id = response.id
      PayPal.initialize(PayPal.SANDBOX, "AQk4sRb7ZmzraoS0Lr2B8dhYQelt-0zS79YHFX_smbrzV36D6ZPQN1zyBDitHHAnZNMf9yRnkNnil6To");
      PayPal.pay({
        price: this.state.moneyValue,
        currency: 'AUD',
        description: 'Add Money to Wallet',
      })
      .then(confirm => {
        console.log(confirm)
        data.transaction_id = confirm.response.id
        console.log(data)
        postFormData(data, 'addMoneyPaypalResponse', (paymentResponse) => {
          onSignIn(paymentResponse)
          this.setState({
            paymentConfirmed: true,
            addMoneyLoading: false,
            popupVisible: false,
            user: paymentResponse
          })
        })
      })
      .catch(error => {
        console.log(error)
      });
    })
  }

  render() {
    /* if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    } */
    if(this.state.paymentConfirmed){
      return (
        <View style={styles.scrollViewContainer}>
          <View style={pageStyle.upgradedView}>
            <Image style={pageStyle.congratsIcon} source={(require('../../../assets/images/congratulation.png'))} />
            <Text style={pageStyle.congratsTextFirst}>Congratulations!</Text>
            <Text style={pageStyle.congratsTextSecond}>You have successfully added money to your wallet!</Text>
            <Button containerStyle={{paddingHorizontal: '20%', marginTop: 20}} style={{backgroundColor: '#cf2525', paddingVertical: 10}} onPress={() => {
              this.setState({
                paymentConfirmed: false,
                loading: true,
                moneyValue: ''
              }, () => {
                this.getWalletInfo()
              })
            }} text="Back to Wallet" />
          </View>
        </View>
      )
    }
    const popupLayout = () => {
      return <View style={pageStyle.popupView}>
        <TouchableOpacity style={pageStyle.closeIconView} onPress={() => this.closePopup()}>
          <View style={pageStyle.closeIconView}>
            <MaterialIcons name="clear" size={15} color="#cf2525" />
          </View>
        </TouchableOpacity>
        <Text style={pageStyle.popupHeading}>Add Money</Text>
        <View style={pageStyle.popupContent}>
          <TextField inputStyle={{borderBottomColor: this.state.moneyError ? '#fa0000' : '#dedede'}} keyboardType="phone-pad" onChangeText={(money) => this.setState({moneyValue: money})} value={this.state.moneyValue} label="Enter Amount" />
        </View>
        <View style={pageStyle.actionButtons}>
          <Button onPress={() => this.payNow()} loading={this.state.addMoneyLoading} style={{backgroundColor: '#cf2525', paddingVertical: 10}} textStyle={pageStyle.buttonText} text="PROCEED TO PAYMENT" />
        </View>
      </View>
    }
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#cf2525'}]}>
        <Header
          outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center', height: 60, borderBottomWidth: 0}}
          innerContainerStyles={{alignItems: 'center'}}
          centerComponent={{ text: 'Wallet', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
        />
        {this.state.loading && <View style={styles.loadingView}>
          <ActivityIndicator size="large" />
        </View>}
        {!this.state.loading && <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} style={pageStyle.listing}>
            <ImageBackground style={pageStyle.background} source={require('../../../assets/images/wallet_bg.jpg')}>
              <View style={pageStyle.textView}>
                <Text style={{color: '#fff', marginRight: 10, fontFamily: 'Proxima Nova'}}>BALANCE</Text>
                <Text style={{color: '#fff', marginRight: 5, marginTop: -20, fontSize: 20, fontFamily: 'Proxima Nova'}}>$</Text>
                <Text style={{color: '#fff', fontSize: 50, fontFamily: 'Proxima Nova'}}>{this.state.user.my_avl_balance}</Text>
              </View>
            </ImageBackground>
            <View style={pageStyle.listView}>
              <View style={pageStyle.heading}>
                <Text style={pageStyle.headingText}>Transaction History</Text>
              </View>
              <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.wallet}
              renderItem={({item}) => 
                this.walletData(item)
              }
              keyExtractor={item => item.id}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              />
            </View>
          </ScrollView>
          <View style={pageStyle.moneyButtonView}>
            <Button
            onPress={() => this.addMoneyPopup()}
            containerStyle={pageStyle.buttonBlock}
            style={pageStyle.button}
            textStyle={{color: '#fff'}}
            text="Add Money" />
          </View>
          <ModalPopup
          innerStyle={pageStyle.popup}
          visible={this.state.popupVisible}
          content={popupLayout} />
          <UnreadCount onPressJob={() => this.changeTabRead('MyJobs')} onPressMessage={() => this.changeTabRead('Messages')} jobCount={this.state.jobUnread} messageCount={this.state.messageUnread} />
        </View>}
      </SafeAreaView>
    );
  }
}