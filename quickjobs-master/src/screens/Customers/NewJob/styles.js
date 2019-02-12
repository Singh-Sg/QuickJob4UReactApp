import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    radioView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    checkboxBlock: {
        width: '50%'
    },
    map: {
        width: '98%',
        height: 200,
        marginTop: 20,
        marginBottom: 10
    },
    imagesLabel: {
        color: '#afafaf',
        fontSize: 12,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
    defaultImage: {
        alignSelf: 'center',
        width: width < 360 ? 70 : 80,
        height: 70,
        borderWidth: 1,
        borderColor: '#b7b7b7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        alignSelf: 'center',
        width: 80,
        height: 70,
        borderRadius: 10
    },
    submittedView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: height-80
    },
    job_submittedImage: {
        height: 150,
        marginBottom: 40,
        resizeMode: 'contain'
    },
    submittedText: {
        fontSize: 15,
        fontFamily: 'Proxima Nova',
        lineHeight: 25,
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: '#fff',
        marginVertical: 0,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    sectionView: {
        width: '100%',
        marginTop: 6
    },
    sectionBlock: {
        marginBottom: 10
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
})