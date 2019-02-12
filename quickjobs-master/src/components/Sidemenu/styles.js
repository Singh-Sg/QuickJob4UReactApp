import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        //height
    },
    logo: {
        width: 60,
        height: 60,
        margin: 20
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemText: {
        flex: 1
    },
    innerLevelPage: {
        flex: 1,
        width: '100%',
        height,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff'
    },
    backView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
    },
    backIcon: {
        paddingLeft: 20,
        paddingVertical: 30,
        paddingRight: 40
    },
    backTextView: {
        flex: 1
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    bottomView: {
        backgroundColor: '#353944',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        zIndex: 999
    },
    bottomViewText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Proxima Nova',
        textAlign: 'center',
        lineHeight: 16
    }
})