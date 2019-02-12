import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  tabView: {
    backgroundColor: '#fb8519',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
    //paddingBottom: 17
  },
  tabText: {
    color: '#fff',
  },
  activeTab: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  newJobs: {
    flex: 1
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 6,
    position: 'relative',
    backgroundColor: '#FAFAFA'
  },
  statusView: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#cf2525',
    paddingVertical: 4,
    paddingHorizontal: 15,
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
    fontFamily: 'Proxima Nova',
    fontSize: 18,
    width: '80%'
  },
  price: {
    color: '#cf2525',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
  },
  jobLocationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  locationText: {
    color: '#cf2525',
    fontFamily: 'Proxima Nova',
    textAlign: 'center'
  }
})