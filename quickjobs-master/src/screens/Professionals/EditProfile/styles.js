import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  tabView: {
    backgroundColor: '#fb8519',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  tabText: {
    fontSize: 10,
    color: '#fff'
  },
  activeTab: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
  },
  formView:{
      padding: 20,
      flex: 1,
      width
  },
  map: {
      width: '98%',
      height: 200,
      marginTop: 20,
      marginBottom: 10
  },
  rowCheckBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  checkboxBlock: {
      width: '25%'
  },
  submitButton: {
      backgroundColor: '#fff',
      marginVertical: 0,
      paddingVertical: 10,
      paddingHorizontal: 20
  }
})