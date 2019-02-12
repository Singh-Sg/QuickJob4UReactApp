import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  tabView: {
    backgroundColor: '#fb8519',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
    //paddingBottom: 17
  },
  tabText: {
    color: '#fff',
  },
  activeTab: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  mainCatView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  mainCatText: {
    color: '#515151',
    flex: 1,
    fontFamily: 'Proxima Nova'
  },
  subCatlistItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  popUpMainView: {
    padding: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1
  },
  popUpContentView: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1
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
  popupView: {
    marginTop: 30
  },
  popupHeading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'Proxima Nova'
  },
  popupListing: {
    paddingHorizontal: 20
  },
  popupListItem: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  submitButton: {
    backgroundColor: '#fff',
    marginVertical: 0,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  docListItem: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    flexDirection: 'row',
    minHeight: 80,
    borderRadius: 10,
    marginBottom: 10,
    width: width-40
  },
  testimonyDetails: {
      flex: 1
  },
  testimonyTitle: {
      fontFamily: 'Proxima Nova',
      fontWeight: 'bold',
      fontSize: 18
  },
  testimonyDetailsText: {
      fontFamily: 'Proxima Nova',
      fontSize: 16
  },
  actionView: {
      justifyContent: 'space-between'
  },
  testimonyIcon: {
      width: 22,
      height: 22,
      resizeMode: 'contain'
  },
  button: {
      backgroundColor: '#fb8519'
  },
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
    /* borderBottomWidth: 1,
    borderBottomColor: '#efefef', */
    paddingVertical: 20
  },
  loginText: {
    fontSize: 12,
    color: '#414141',
    fontFamily: 'Proxima Nova'
  },
})