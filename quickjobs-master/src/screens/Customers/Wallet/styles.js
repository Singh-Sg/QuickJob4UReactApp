import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    width,
    height: 150,
    position: 'relative'
  },
  textView: {
    width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  listView: {

  },
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  headingText: {
    color: '#cf2525',
    fontFamily: 'Proxima Nova'
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef'
  },
  iconImage: {
    width: 40,
    height: 20
  },
  content: {
    paddingHorizontal: 20,
    flex: 1
  },
  topText: {
    color: '#cf2525',
    fontFamily: 'Proxima Nova',
    marginBottom: 6,
    fontSize: 16
  },
  bottomText: {
    fontSize: width < 360 ? 13 : 14,
    fontFamily: 'Proxima Nova',
  },
  priceText: {
    fontSize: width < 360 ? 15 : 18,
    color: '#e0a018',
    fontFamily: 'Proxima Nova'
  },
  buttonBlock: {
    width: '50%',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#cf2525',
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
  },
  popup: {
    /* width: width/1.3,
    flex: 0.35,
    marginTop: '10%',
    alignSelf: 'center',
    borderRadius: 5 */
    width: width,
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupView: {
    width: width/1.3,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 20
  },
  popupHeading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20
  },
  popupContent: {
    paddingHorizontal: 25
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Proxima Nova'
  },
  upgradedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  congratsIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  congratsTextFirst: {
    fontWeight: 'bold',
    fontSize: 16
  },
  congratsTextSecond: {
    textAlign: 'center'
  }
})