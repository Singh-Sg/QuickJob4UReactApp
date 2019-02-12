import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  certificate: {
    width: width/1,
    height: width/2,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain'
  },
  loginTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingVertical: 20
  },
  loginText: {
    fontSize: 12,
    color: '#414141',
    fontFamily: 'Proxima Nova'
  },
  imageHeading: {
    color: '#afafaf',
    fontSize: 11,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  uploadImageView: {
    flexDirection: 'row'
  },
  uploadImageBlock: {
    borderWidth: 1,
    borderColor: '#a2a2a2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    width: '100%'
  },
  uploadText: {
    fontSize: 16,
    marginTop: 10
  },
  image: {
    width: '100%',
    height: 200
  },
  closeIconView: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    padding: 8
  }
})