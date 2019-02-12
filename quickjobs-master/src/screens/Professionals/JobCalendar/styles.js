import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    currentMonth: {
        flex: 1
    },
    monthText: {
        fontFamily: 'Proxima Nova',
        color: '#fff',
        fontSize: width/9,
        fontWeight: 'bold'
    },
    yearText: {
        fontFamily: 'Proxima Nova',
        color: '#b8b1af'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    appointmentText: {
        fontFamily: 'Proxima Nova',
        fontSize: 18
    },
    jobTitle: {
        fontFamily: 'Proxima Nova',
        fontSize: 18,
        color: '#000',
        lineHeight: 20
    },
    jobLocation: {
        fontFamily: 'Proxima Nova',
        fontSize: 12,
        lineHeight: 20
    },
    jobDescription: {
        fontFamily: 'Proxima Nova',
        lineHeight: 20
    },
    actionView: {
        justifyContent: 'space-between'
    },
    appointmentIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    dayNum: {
      fontSize: 28,
      fontWeight: '200',
      color: '#000'
    },
    dayText: {
      fontSize: 14,
      fontWeight: '300',
      color: '#000',
      marginTop: -5,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    day: {
      width: 63,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 32
    },
})