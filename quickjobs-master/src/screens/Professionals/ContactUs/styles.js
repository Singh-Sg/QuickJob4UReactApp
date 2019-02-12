import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    attachView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    attachText: {
        marginLeft: 10
    },
    submittedMessage: {
        color: 'green', marginTop: '10%'
    }
})