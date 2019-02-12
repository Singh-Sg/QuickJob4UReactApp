import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    sliderView: {
        height: width/1.86,
        backgroundColor: '#efefef',
        overflow: 'hidden'
    },
    carouselContainer: {
        width: width
    },
    sliderImage: {
        width: width,
        height: 220,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30
    },
    sliderText: {
        //color: '#2d2d2d',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    queryButton: {
        position: 'absolute',
        top: 10,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: Platform.OS == 'android' ? 50 : 20,
        borderBottomLeftRadius: Platform.OS == 'android' ? 50 : 20,
        paddingVertical: 12,
        paddingHorizontal: 15,
        elevation: 3
    },
    queryButtonText: {
        color: '#cf2525',
        fontFamily: Platform.OS == 'android' ? 'Proxima Nova' : 'Al Nile',
        fontSize: 16
    },
    callBackView: {
        paddingVertical: 15
    },
    callBackHeading: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    callBackHeadingText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
        fontFamily: 'Proxima Nova'
    },
    callBackBlock: {
        width: '100%'
    },
    callBackInputView: {
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#efefef',
        borderRadius: 50,
        overflow: 'hidden',
        height: 60
    },
    callBackInputBlock: {
        flex: 1,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    callbackInput: {
        color: '#000',
        fontSize: 19
    },
    callBackInputButtonBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cf2525',
        width: '40%',
        borderRadius: 100
    },
    callBackInputButton: {

    },
    callIcon: {
        height: 25,
        resizeMode: 'contain'
    },
    categoriesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    categoryBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width/3,
        height: 125
    },
    categoryIconImage: {
        width: 20,
        height: 20,
        marginBottom: 10
    },
    categoryName: {
        fontFamily: 'Proxima Nova'
    },
    howItWorksView: {
        backgroundColor: '#fff',
        padding: 20
    },
    howitworksBlock: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        width: width-50,
        paddingTop: 20,
        paddingHorizontal: 25
    },
    howitworksHeading: {
        color: '#cf2525',
        fontFamily: 'Proxima Nova',
        marginBottom: 10,
        fontSize: 16
    },
    howitworksJobHeading: {
        color: '#000',
        fontFamily: 'Proxima Nova',
        fontSize: 18,
        marginVertical: 10
    },
    howitworksJobDescription: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 20
    },
    howitworksText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20
    },
    howitworksImage: {
        width: 100,
        height: 100,
        borderColor: '#dedede',
        borderWidth: 1,
        borderRadius: Platform.OS == 'android' ? 500 : 50
    },
    bannerView: {

    },
    bannerImage: {
        width: '100%',
        height: width/2.4,
        resizeMode: 'contain'
    },
    map: {
        width,
        height: 300
    },
    customerReviewsView:{
        paddingVertical: 20,
        position: 'relative'
    },
    customerReviewsHeading: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000',
        fontFamily: 'Proxima Nova',
        fontSize: 18,
        marginBottom: 15
    },
    controls: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    leftControl: {
        //alignSelf: 'flex-start'
    },
    rightControl: {
        //alignSelf: 'flex-end'
    },
    controlIcon: {
        height: 20,
        resizeMode: 'contain'
    },
    reviewUserBlock: {
        paddingHorizontal: 25,
        width: width
    },
    review: {
        textAlign: 'center',
        fontSize: 15,
        color: '#000',
        lineHeight: 25,
        paddingHorizontal: 25
    },
    reviewAvatarBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    reviewAvatar: {
        width: 55,
        height: 55
    },
    reviewUser: {
        fontSize: 20,
        marginLeft: 15,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Proxima Nova'
    },
    socialBlocksView: {
        height: 50,
        backgroundColor: '#cf2525',
        marginHorizontal: 25,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 30
    },
    socialBlock: {
        backgroundColor: '#fff',
        width: 35,
        height: 35,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialIcon: {
        borderRadius: Platform.OS == 'android' ? 100 : 0,
        width: 30,
        height: 30
    },
    styleEgStrip: {
        backgroundColor: '#dedede',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchView: {
        padding: 0
    },
    searchBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchText: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        flex: 1,
        paddingVertical: 12
    },
    searchListIcon: {
        padding: 10,
        paddingRight: 20
    }
})