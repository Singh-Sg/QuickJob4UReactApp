import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  mainView: {
    width: '100%',
    marginVertical: 0,
  },
  inputView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: '#afafaf',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10
  },
  checkboxView: {
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    paddingRight: 0,
    width: 25
  },
  contentView: {
    flex: 1,
    width: '100%',
  },
  content: {
    fontStyle: 'italic',
    fontSize: 14
  }
})