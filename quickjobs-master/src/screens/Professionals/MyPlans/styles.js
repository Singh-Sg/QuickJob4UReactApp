import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  tabView: {
    backgroundColor: '#fb8519',
    //backgroundColor: '#efefef',
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
  },
  tabText: {
    fontSize: 15,
    color: '#fff'
  },
  activeTab: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row'
  },
  balanceView: {
    backgroundColor: '#efefef',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  balanceText: {
    fontFamily: 'Proxima Nova',
    color: '#414141',
    fontSize: 16
  },
  balance: {
    fontFamily: 'Proxima Nova',
    color: '#00c020',
    fontSize: 16
  },
  planTypeView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  planTypeCircle: {
    backgroundColor: '#fb8519',
    width: 130,
    height: 130,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  planTypeCircleText: {
    fontFamily: 'Proxima Nova',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  planTypeCirclePriceText: {
    fontFamily: 'Proxima Nova',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  planListingItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  planListingItemText: {
    fontFamily: 'Proxima Nova',
    marginLeft: 10
  },
  submitButton: {
    backgroundColor: '#fff',
    marginVertical: 0,
    paddingVertical: 10,
    paddingHorizontal: 50
  },
  upgradedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  congratsIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  congratsTextFirst: {
    fontWeight: 'bold',
    fontSize: 16
  },
  congratsTextSecond: {

  },
  confirmationView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  moneybag: {
    width: 120,
    height: 120
  },
  confirmationApplyView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 40
  },
  confirmationJobPrice: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    color: '#414141',
    marginBottom: 10
  },
  seperationView:{
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginVertical: 10
  },
  seperationLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000'
  },
  seperationText: {
    fontSize: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    color: '#000',
    fontFamily: 'Proxima Nova'
  },
  subtextJobPrice: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    textAlign: 'center'
  },
})