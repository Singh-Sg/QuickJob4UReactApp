import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    overlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)'
    },
    image: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10
    },
    innerContent: {
      backgroundColor: 'white',
      flex: 1,
      paddingTop: 10,
      position: 'relative'
    },
    closeIconView: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 999
    },
    closeIcon: {
      color: '#6e6e6e',
      fontSize: 20
    }
})