import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    width,
    height: 162,
    position: 'relative',
  },
  textView: {
    width,
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  contentView: {

  },
  tabView: {
    flexDirection: 'row',
    marginTop: 12,
    width: width,
    height: 54
  },
  tab: {
    flex: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
    //paddingBottom: 5
  },
  activeTab: {
    flex: width/3,
    borderBottomColor: 'red',
    borderBottomWidth: 4,
    zIndex: 999
  },
  tabImage: {
    width: 30,
    height: 20,
    resizeMode: 'contain'
  },
  tabText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: '100',
    fontFamily: 'Proxima Nova',
    marginBottom: width < 360 ? 4 : 5
  },
  blockView: {
    padding: 20,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1
  },
  headingText: {
    fontWeight: '500',
    fontSize: width < 360 ? 14 : 16,
    color: '#000',
    fontFamily: 'Proxima Nova'
  },
  blockWithIcon: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-start',
    paddingRight: 20
  },
  blockIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginRight: 10,
  },
  blockText: {
    color: '#414141',
    fontFamily: 'Proxima Nova',
    lineHeight: 15
  },
  blockTextQuestion: {
    color: '#414141',
    fontFamily: 'Proxima Nova',
    lineHeight: 15
  },
  blockTextAnswer: {
    color: '#939393',
    fontFamily: 'Proxima Nova'
  },
  professionals: {
    marginTop: 10
  },
  professional: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  professionalName: {
    fontWeight: 'bold',
    color: '#414141',
    fontFamily: 'Proxima Nova',
    marginBottom: 5,
    alignItems: 'center',
    marginLeft: 5
  },
  detailView: {
    flex: 1
  },
  avatarView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: Platform.OS == 'android' ? 100 : 30
  },
  additionalText: {
    fontSize: 12,
    fontFamily: 'Proxima Nova'
  },
  sendText: {
    color: '#009edd',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 3,
    fontFamily: 'Proxima Nova'
  },
  ratingText: {
    color: '#009edd',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 3,
    fontFamily: 'Proxima Nova'
  },
  ratingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  images: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 10
  },
  map: {
    width: '98%',
    height: 200,
    marginTop: 20,
    marginBottom: 10
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  certificate: {
    width: 18,
    height: 18
  }
})