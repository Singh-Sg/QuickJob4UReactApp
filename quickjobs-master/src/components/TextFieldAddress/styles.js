import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  inputView: {
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#dedede',
    borderBottomWidth: 0.6
  },
  label: {
    color: '#afafaf',
    fontSize: 12,
    marginTop: 10
  },
  input: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingVertical: 2
  }
})