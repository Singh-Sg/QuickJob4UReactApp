import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  inputView: {
    width: '100%',
    marginVertical: 10
  },
  buttonView: {
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})