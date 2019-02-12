import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
const { width, height } = Dimensions.get('window')
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';
import moment from 'moment'

export default class JobCalendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      smallLoading: false,
      year: '',
      month: '',
      appointments: {},
      selected_appointments: [],
      selectedDate: '',
      currentYear: moment().format('YYYY-MM-DD')
    }
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
  }

  receiveData(data){
    this.setState({
      loading: true,
      smallLoading: false,
      year: '',
      month: '',
      appointments: {},
      selected_appointments: [],
      selectedDate: ''
    })
    if(data.type == 'edited'){
      this.getAppointments();
      return;
    }else {
      this.getAppointments();
    }
  }

  componentDidMount() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    this.setState({
      year: new Date().getFullYear(),
      month: months[new Date().getMonth()]
    })
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      }, () => {
        this.getAppointments()
      })
    })
  }

  getAppointments(){
    let data = {
      user_id: this.state.user.id
    }
    postFormData(data, 'professnalAppointments', (response) => {
      if(response){
        if(response.length == 0){
          this.setState({
            loading: false
          })
          return;
        }
        let appointments = {}
        response.forEach((appointment, index) => {
          let mon = new Date(appointment.date).getMonth()+1;
          let month = new Date(appointment.date).getMonth() < 9 ? '0'+mon : new Date(appointment.date).getMonth()+1
          let date = new Date(appointment.date).getDate() < 10 ? '0'+new Date(appointment.date).getDate() : new Date(appointment.date).getDate()
          let year = new Date(appointment.date).getFullYear()
          let completeDate = year+'-'+month+'-'+date;
          console.log(completeDate)
          appointments[completeDate] = {marked: true, selected: false}
          if(index == response.length-1){
            this.setState({
              loading: false,
              appointments
            })
          }
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
  }

  deleteAppointment(id, index){
    let data = {
      id
    }
    delete this.state.selected_appointments[index]
    this.setState({
      selected_appointments: this.state.selected_appointments
    })
    postFormData(data, 'deleteAppointment', (response) => {
      this.getAppointments()
    })
  }

  changeDate(date){
    this.setState({
      smallLoading: true
    })
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let newAppointments = this.state.appointments
    let i = 0
    Object.keys(newAppointments).forEach((key) => {
      newAppointments = {...newAppointments, [key]: {
        selected: false,
        marked: newAppointments[key].marked ? true : false
      }}
      this.setState({
        appointments: newAppointments
      })
      i++
      if(i == Object.keys(newAppointments).length){
        newAppointments = {...newAppointments, [date.dateString]: {
          selected: true,
          marked: newAppointments[date.dateString] ? newAppointments[date.dateString].marked ? true : false : false
        }}
        this.setState({
          year: date.year,
          month: months[date.month-1],
          selectedDate: date.dateString,
          appointments: newAppointments
        })
      }
    })

    let data = {
      user_id: this.state.user.id,
      date: date.dateString
    }
    postFormData(data, 'getAppointmentByDay', (response) => {
      if(response){
        this.setState({
          selected_appointments: response
        })
      }
      this.setState({
        smallLoading: false
      })
    })
  }

  renderEmptyDate() {
    return (
      <View style={pageStyle.emptyDate}><Text style={pageStyle.appointmentText}>There is no appointment for today!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  changeMonth(date){
    this.setState({
      currentYear: moment(date.dateString).format('YYYY-MM-DD')
    })
  }

  render() {
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <View style={styles.scrollViewContainer}>
      <Calendar
        current={this.state.currentYear}
        onDayPress={(day) => this.changeDate(day)}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => {this.changeMonth(month)}}
        firstDay={1}
        markedDates={this.state.appointments}
      />
      {this.state.smallLoading && <View style={{marginTop: 30}}>
        <ActivityIndicator size="large" />
      </View>}
      {!this.state.smallLoading && <ScrollView style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#efefef'}} showsVerticalScrollIndicator={false}>
        {this.state.selected_appointments.map((item, index) => {
          let newDate = new Date(item.date)
          let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
          let month = months[newDate.getMonth()]
          let date = newDate.getDate() < 10 ? '0'+newDate.getDate() : newDate.getDate()
          let year = newDate.getFullYear()
          let completeDate = year+'-'+month+'-'+date;
          return <View style={{flexDirection: 'row', marginBottom: index == (this.state.selected_appointments.length-1) ? 30 : 0}}>
              <View style={pageStyle.day}>
                <Text allowFontScaling={false} style={pageStyle.dayNum}>{date}</Text>
                <Text allowFontScaling={false} style={pageStyle.dayText}>{month}</Text>
              </View>
              <View style={[pageStyle.item, {height: item.height}]}>
                <View style={pageStyle.descriptionView}>
                  <Text style={pageStyle.jobTitle}>{item.job_title}</Text>
                  <Text style={pageStyle.jobLocation}>{item.location}</Text>
                  <Text style={pageStyle.jobDescription}>{item.description}</Text>
                </View>
                <View style={pageStyle.actionView}>
                  <TouchableOpacity onPress={() => this.deleteAppointment(item.id, index)}>
                    <Image source={require('../../../assets/images/testimony_delete.png')} style={pageStyle.appointmentIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.push('AddAppointment', {appointment: item})}>
                    <Image source={require('../../../assets/images/testimony_edit.png')} style={pageStyle.appointmentIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        })}
      </ScrollView>}
      </View>
    );
  }

  loadItems(day) {
  }

  renderItem(item) {
    return (
      <View style={[pageStyle.item, {height: item.height}]}>
        <View style={pageStyle.descriptionView}>
          <Text style={pageStyle.jobTitle}>{item.job_title}</Text>
          <Text style={pageStyle.jobLocation}>{item.location}</Text>
          <Text style={pageStyle.jobDescription}>{item.description}</Text>
        </View>
        <View style={pageStyle.actionView}>
          <TouchableOpacity onPress={() => this.deleteAppointment(item.id)}>
            <Image source={require('../../../assets/images/testimony_delete.png')} style={pageStyle.appointmentIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.push('AddAppointment', {appointment: item})}>
            <Image source={require('../../../assets/images/testimony_edit.png')} style={pageStyle.appointmentIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}