import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  userTexts: {
    marginLeft: 10
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6
  },
  ratingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#efefef',
    paddingVertical: 10,
    width: '75%',
    alignSelf: 'center',
    borderRadius: 5
  },
  ratingHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 15
  }
})