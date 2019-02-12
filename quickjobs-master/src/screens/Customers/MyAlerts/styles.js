import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  listItem: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#dedede',
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
  },
  listItemText: {
      flex: 1
  },
})