import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
  }
})