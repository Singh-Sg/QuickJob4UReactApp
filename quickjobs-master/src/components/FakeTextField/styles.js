import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  inputView: {
    width: '100%',
    marginBottom: 10
  },
  label: {
    color: '#afafaf',
    fontSize: 14,
    marginTop: 10
  },
  input: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingVertical: 2,
    color: '#000',
    marginTop: 10
  },
  descText: {
    fontStyle: 'italic',
    fontSize: 10,
    marginTop: 2
  }
})