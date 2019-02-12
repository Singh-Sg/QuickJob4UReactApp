import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    listItem: {
        backgroundColor: '#f7f7f7',
        padding: 10,
        flexDirection: 'row',
        minHeight: 80,
        borderRadius: 10,
        marginBottom: 10
    },
    testimonyDetails: {
        flex: 1
    },
    testimonyTitle: {
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        fontSize: 18
    },
    testimonyDetailsText: {
        fontFamily: 'Proxima Nova',
        fontSize: 16
    },
    actionView: {
        justifyContent: 'space-between'
    },
    testimonyIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    }
})