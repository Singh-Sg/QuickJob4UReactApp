import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  back: {
    position: 'absolute',
    top: 8,
    left: 8
  },
  logoView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  subtext: {

  },
  logoText: {
    color: '#cf2525',
    fontWeight: 'bold',
    fontSize: 30
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
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    position: 'absolute'
  },
  signinTextView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 12
  },
  signinTextB: {
    fontWeight: 'bold',
    color: 'skyblue'
  }
})