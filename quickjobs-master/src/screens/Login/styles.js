import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  back: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 99999
  },
  logoView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: '14%'
  },
  subtext: {

  },
  logoText: {
    color: '#cf2525',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Proxima Nova'
  },
  seperationView:{
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginVertical: 10
  },
  seperationLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000'
  },
  seperationText: {
    fontSize: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    color: '#000',
    fontFamily: 'Proxima Nova'
  },
  signinTextView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: '#000'
  },
  signinTextB: {
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova'
  },
  forgot: {
    alignSelf: 'center',
    marginTop: 10,
    fontStyle: 'italic'
  },
  signUpType: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    height: 40
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: '#cf2525',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    flex: 0.4
  },
  signUpButtonText: {
    color: '#cf2525',
    fontFamily: 'Proxima Nova',
    textAlign: 'center',
    fontSize: width < 360 ? 10 : 13
  }
})