import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    headerImage: {
        width: 20,
        height: 20
    },
    headerText: {
        fontFamily: 'Proxima Nova',
        color: '#1c1c1c',
        fontSize: 14,
        flex: 1,
        marginHorizontal: 10
    },
    contentText: {
        fontFamily: 'Proxima Nova',
        color: '#636363'
    },
    content: {
    }
})