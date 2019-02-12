import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  inputView: {
    width: '100%',
    marginBottom: 10
  },
  label: {
    color: '#afafaf',
    fontSize: 12,
    marginTop: 10
  },
  input: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingVertical: 2,
    width: '100%',
    borderTopWidth: 0,
    borderLeftWidth: 0
  }
})