import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  balanceView: {
    flexDirection: 'row',
    backgroundColor: '#e3eaee',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  customerID: {
    alignSelf: 'flex-start',
    flex: 1
  },
  balance: {
  },
  listItem: {
    padding: 20,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    position: 'relative',
    width
  },
  statusView: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#cf2525',
    paddingVertical: 4,
    paddingHorizontal: 35,
    borderTopLeftRadius: Platform.OS == 'android' ? 50 : 10,
    borderBottomLeftRadius: Platform.OS == 'android' ? 50 : 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  status: {
    color: '#fff',
    fontFamily: 'Proxima Nova'
  },
  jobId: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
    fontFamily: 'Proxima Nova'
  },
  jobType: {
    color: '#000',
    fontFamily: 'Proxima Nova'
  },
  applied: {
    color: '#009edd',
    fontFamily: 'Proxima Nova'
  },
  people: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Platform.OS == 'android' ? 100 : 25,
    marginRight: 10
  }
})