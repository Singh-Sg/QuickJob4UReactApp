import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    searchBarContainer: {
        width,
        backgroundColor: '#fff',
        position: 'relative'
    },
    loadingView: {
        flex: 1,
        height: height-150,
        width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topArea: {
        //flex: 1,
    },
    bottomArea: {
        //flex: 0.3,
        paddingHorizontal: 30,
        //marginTop: '20%',
        paddingBottom: 30,
        height: 200,
    },
    searchBarInputStyle: {
        backgroundColor: '#fff',
        fontSize: 14
    },
    scrollViewContainer: {
        flex: 1,
        width,
        backgroundColor: '#fff',
        position: 'relative'
        //paddingBottom: 40
    },
    formView:{
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width
    },
    multipleColumnView: {
        flexDirection: 'row',
    },
    multipleColumnBlock: {
        marginRight: 20
    }
})