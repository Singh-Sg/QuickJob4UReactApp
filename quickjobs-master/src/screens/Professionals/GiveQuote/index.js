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
import styles from '../../../styles'
import pageStyle from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData } from '../../../config/formHandler'
import { TextField, Check, Button } from '../../../components'
import { postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';

export default class GiveQuote extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      activeSection: 1,
      call_out_fee: '',
      call_out_feeError: '',
      price: '',
      priceError: '',
      time: '',
      timeError: '',
      range: [],
      selected_range: '',
      applyLoading: false,
      overRuledPro: false
    }
  }

  static navigationOptions = { tabBarVisible: false }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    if(params.job_data.job_type == 'Quote'){
      getFormData('getQuoteTypeJobRange', (response) => {
        if(response){
          this.setState({
            range: response.range,
            loading: false
          })
        }else {
          this.setState({
            loading: false
          })
        }
      })
    }else {
      this.setState({
        loading: false
      })
    }
  }

  changeSection(index){
    this.setState({
      activeSection: index
    })
  }

  changeAmount(value){
    const { params } = this.props.navigation.state;
    let price;
    if(params.job_data.job_type == "Coin Based Hour Job"){
      if(params.job_data.hourly_job_type == "Hour Basis"){
        let time = params.job_data.hourly_time*2
        if(params.job_data.hourly_minute){
          time = time+1
        }
        price = time*value
        this.setState({price})
      }else {
        let time = params.job_data.how_many_day
        price = time*value
        this.setState({price})
      }
      this.setState({call_out_fee: value})
    }else {
      this.setState({call_out_fee: value})
    }
  }

  applyJob(){
    const { params } = this.props.navigation.state;
    let error = 0;
    if(this.state.activeSection == 1){
      if(!this.state.call_out_fee){
        this.setState({
          call_out_feeError: true
        })
        error = 1
      }else {
        this.setState({
          call_out_feeError: false
        })
      }
      if(params.job_data.job_type == 'Electrician'){
        if(!this.state.price){
          this.setState({
            priceError: true
          })
          error = 1
        }else {
          this.setState({
            priceError: false
          })
        }
        if(!this.state.time){
          this.setState({
            timeError: true
          })
          error = 1
        }else {
          this.setState({
            timeError: false
          })
        }
      }
    }
    if(error == 1){
      return;
    }
    this.confirmApplyJob()
  }

  confirmApplyJob(){
    const { params } = this.props.navigation.state;
    let checkData = {
      job_id: params.job_data.id
    }
    /* postFormData(checkData, 'checkApplyCount', (response) => {
      if(response){
        if(response.apply_count < 3){ */
          if(params.job_data.job_type != 'Coin Based Hour Job'){
            let data = {
              prof_id: params.prof.id,
              job_id: params.job_data.id,
              //quote_type: this.state.activeSection != 3 ? params.job_data.job_type == 'Electrician' ? 'give-quote-direct' : params.job_data.job_type == 'Equipment' ? 'give-quote-direct' : params.job_data.job_type == 'Quote' ? 'give-quote-direct' : '' : 'contact',
              quote_type: this.state.activeSection == 1 ? 'give-quote-direct' : this.state.activeSection == 2 ? 'give-a-range' : 'Contact',
              quote: this.state.call_out_fee,
              quote_fee: this.state.price,
              quote_time: this.state.time
            }
            if(this.state.activeSection == 2){
              if(!this.state.selected_range){
                alert('Please select a range')
                return;
              }
            }
            if(data.quote_type == 'give-a-range'){
              if(!this.state.selected_range){
                alert('Please select a range')
                return;
              }
              data.quote_range = this.state.selected_range
            }
            this.setState({
              applyLoading: true
            })
            postFormData(data, 'applyJobs', (response) => {
              if(response){
                StateManager.getInstance().receiveData({success: true});
                this.props.navigation.goBack();
              }
              this.setState({
                applyLoading: false
              })
            })
          }else {
            let data = {
              prof_id: params.prof.id,
              job_id: params.job_data.id,
              quote_type: this.state.activeSection == 1 ? 'give-quote-direct' : 'contact',
              per_thirty_minute: this.state.call_out_fee,
              total_hour_amount: this.state.price
            }
            this.setState({
              applyLoading: true
            })
            postFormData(data, 'applyCoinBasedHourJob', (response) => {
              StateManager.getInstance().receiveData({success: true});
              this.props.navigation.goBack();
              if(response){
              }
              this.setState({
                applyLoading: false
              })
            })
            this.setState({
              applyLoading: false
            })
          }
        /* }else {
          this.setState({
            overRuledPro: true
          })
        }
      }
    }) */
  }

  applyRange(item){
    this.setState({
      selected_range: item
    })
  }

  render() {
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { activeSection, range } = this.state;
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    const rangeView = range.map((item, index) => {
      return <View style={pageStyle.ranges}>
        <Check checked={this.state.selected_range == item ? true : false} onPress={() => this.applyRange(item)} checkedColor="#fb8519" style={pageStyle.rangeradio} />
        <Text style={pageStyle.rangetitle}>{item}</Text>
      </View>
    })
    if(this.state.overRuledPro){
      return (
        <View style={[styles.scrollViewContainer, pageStyle.confirmationView]}>
          {/* <Image style={pageStyle.moneybag} source={require('../../../assets/images/moneybag.png')} /> */}
          <View style={pageStyle.confirmationApplyView}>
            <Text style={[pageStyle.subtextJobPrice, {fontSize: 16}]}>This job is closed as three people have already applied for this job. We encourage you to apply for the job as soon as you receive notification</Text>
            <Text style={{marginTop: 10, fontSize: 16, marginBottom: 10}}>Thank you</Text>
            <Button onPress={() => this.props.navigation.goBack()} style={{backgroundColor: '#cf2525', paddingVertical: 10, width: '70%'}} text="Back to Jobs" />
          </View>
        </View>
      )
    }
    return (
      <ScrollView style={[styles.scrollViewContainer, {padding: 20}]} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <View style={pageStyle.sectionView}>
          <View style={pageStyle.sectionBlock}>
            <View style={pageStyle.headingView}>
              <Check onPress={() => this.changeSection(1)} checked={activeSection == 1 ? true : false} checkedColor="#fb8519" style={pageStyle.radio} round />
              <Text style={pageStyle.heading}>Give a quote number directly</Text>
            </View>
            {activeSection == 1 && <View style={pageStyle.contentView}>
              <View style={pageStyle.textFieldBlock}>
                <Text style={pageStyle.textFieldHeading}>Enter Amount</Text>
                <View style={[pageStyle.textFieldView, {borderColor: this.state.call_out_feeError ? '#fa0000' : '#cecece'}]}>
                  <TextField value={this.state.call_out_fee} keyboardType="numeric" onChangeText={(value) => this.changeAmount(value)} placeholder="Call Out Fee" inputStyle={{borderBottomWidth: 0}} style={pageStyle.textfield} />
                  <View style={pageStyle.textFieldContentView}>
                    <Text style={pageStyle.textFieldContentText}>{params.job_data.hourly_job_type == 'Hour Basis' ? '$ / 30 Min' : '$'}</Text>
                  </View>
                </View>
                {params.job_data.job_type == "Coin Based Hour Job" && <View style={[pageStyle.textFieldView, {borderColor: this.state.call_out_feeError ? '#fa0000' : '#cecece', marginTop: 15}]}>
                  <Text style={[pageStyle.textfield, {marginLeft: 5}]}>{this.state.price}</Text>
                  <View style={pageStyle.textFieldContentView}>
                    <Text style={pageStyle.textFieldContentText}>$</Text>
                  </View>
                </View>}
                {params.job_data.job_type == "Electrician" && <View style={[styles.multipleColumnView, {justifyContent: 'space-between', marginTop: 15}]}>
                  <View style={[pageStyle.textFieldView, {width: '48%', borderColor: this.state.priceError ? '#fa0000' : '#cecece'}]}>
                    <TextField value={this.state.price} keyboardType="numeric" onChangeText={(value) => this.setState({price: value})} inputStyle={{borderBottomWidth: 0}} style={pageStyle.textfield} />
                    <View style={pageStyle.textFieldContentView}>
                      <Text style={pageStyle.textFieldContentText}>$</Text>
                    </View>
                  </View>
                  <View style={[pageStyle.textFieldView, {width: '48%', borderColor: this.state.timeError ? '#fa0000' : '#cecece'}]}>
                    <TextField value={this.state.time} keyboardType="numeric" onChangeText={(value) => this.setState({time: value})} placeholder="For Every" inputStyle={{borderBottomWidth: 0}} style={pageStyle.textfield} />
                    <View style={pageStyle.textFieldContentView}>
                      <Text style={pageStyle.textFieldContentText}>Min</Text>
                    </View>
                  </View>
                </View>}
              </View>
            </View>}
          </View>
          {params.job_data.job_type == 'Quote' && <View style={pageStyle.sectionBlock}>
            <View style={pageStyle.headingView}>
              <Check onPress={() => this.changeSection(2)} checked={activeSection == 2 ? true : false} checkedColor="#fb8519" style={pageStyle.radio} round />
              <Text style={pageStyle.heading}>Give a range - (AUD)</Text>
            </View>
            {activeSection == 2 && <View style={[pageStyle.contentView, {paddingLeft: 33}]}>
              {rangeView}
            </View>}
          </View>}
          <View style={pageStyle.sectionBlock}>
            <View style={pageStyle.headingView}>
              <Check onPress={() => this.changeSection(3)} checked={activeSection == 3 ? true : false} checkedColor="#fb8519" style={pageStyle.radio} round />
              <Text style={pageStyle.heading}>Contact customer directly and give a quote</Text>
            </View>
            {activeSection == 3 && <View style={pageStyle.contentView}>
            </View>}
          </View>
          <View style={pageStyle.noteView}>
            <Text style={pageStyle.noteText}><Text style={{color: '#cf2525'}}>Note:</Text> Customer details will be shared with you regardless of the selection you make. This is just to give customers an idea of the cost. Your details will be shared with customer as well.</Text>
          </View>
          <Button loading={this.state.applyLoading} containerStyle={{marginTop: 40}} style={{backgroundColor: '#fb8519', paddingVertical: 10, width: '60%'}} onPress={() => this.applyJob()} text="APPLY" />
        </View>
      </ScrollView>
    );
  }
}