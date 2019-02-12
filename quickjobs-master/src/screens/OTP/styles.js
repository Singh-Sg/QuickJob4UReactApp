import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  back: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 99999
  },
  topView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  subtext: {
    marginVertical: 10,
    fontFamily: 'Proxima Nova'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Proxima Nova'
  },
  textfield: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dedede',
    marginRight: 10,
    width: 60,
    height: 45,
  },
  inputStyle: {
    fontSize: 20,
    width: 40,
    height: 45,
    textAlign: 'center'
  },
  resend: {
    color: 'green',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: 'Proxima Nova'
  }
})