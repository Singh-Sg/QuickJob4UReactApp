import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  certificate: {
    width: '60%',
    height: '52%',
    alignSelf: 'center',
    marginVertical: 20
  }
})