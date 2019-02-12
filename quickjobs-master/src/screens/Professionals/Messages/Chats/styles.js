import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  messagesListing: {
    flex: 1,
    paddingLeft: 20
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  username: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5
  },
  status: {
    color: '#cf2525'
  },
  icon: {
    paddingHorizontal: 20
  },
  iconImage: {
    width: 30,
    height: 30
  }
})