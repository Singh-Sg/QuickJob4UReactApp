import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    listContainer: {
        backgroundColor: '#fff',
        flex: 1
    },
    careerView: {
        borderBottomWidth: 5,
        borderBottomColor: '#fff',
        backgroundColor: '#f5f5f5',
        padding: 10
    },
    jobID: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1c1c1c'
    },
    descBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    icon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descText: {
        flex: 1,
        paddingLeft: 20,
        color: '#1c1c1c'
    }
})