import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    sectionBlock: {
        marginBottom: 10
    },
    confirmationView: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    confirmationApplyView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 40
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radio: {
        flex: 0.13
    },
    heading: {
        flex: 1,
        fontSize: 15,
        lineHeight: 17,
        fontFamily: 'Proxima Nova'
    },
    textFieldBlock: {
        marginTop: 10
    },
    textFieldHeading: {
        fontFamily: 'Proxima Nova',
        lineHeight: 15,
        marginBottom: 5
    },
    textFieldView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 8,
        flexDirection: 'row',
        padding: 10
    },
    textfield: {
        flex: 1,
        marginBottom: 0
    },
    textFieldContentView:{
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#e8e8e8',
        borderWidth: 1
    },
    textFieldContentText: {
        fontFamily: 'Proxima Nova',
        lineHeight: 15,
        fontWeight: 'bold'
    },
    noteView: {

    },
    noteText: {
        fontStyle: 'italic',
        fontSize: 10
    },
    ranges: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rangeradio: {
        flex: 0.18
    },
    rangetitle: {
        flex: 1,
        lineHeight: 15
    }
})