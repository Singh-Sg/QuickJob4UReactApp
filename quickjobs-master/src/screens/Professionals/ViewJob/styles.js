import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    width,
    height: 140,
    position: 'relative',
    justifyContent: 'center',
  },
  textView: {
    width,
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  contentView: {

  },
  blockView: {
    padding: 20,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    flexDirection: 'column'
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
  iconView:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBlocktextView: {
    flex: 1
  },
  blockIcon: {
    height: 22,
    width: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  blockTextHeading: {
    lineHeight: 15,
    fontFamily: 'Proxima Nova',
  },
  blockText: {
    color: '#414141',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 8
  },
  questionsView: {
    flexDirection: 'column'
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
    marginBottom: 5
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
    borderRadius: 100
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
    borderRadius: 5
  },
  map: {
      width: '98%',
      height: 200,
      marginTop: 20,
      marginBottom: 10
  },
  applyView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  jobPrice: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    color: '#414141',
    marginBottom: 10
  },
  subtextJobPrice: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    textAlign: 'center'
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
  customerProfileView: {
    padding: 20
  },
  customerProfileHeading: {
    fontFamily: 'Proxima Nova',
    color: '#414141',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  customerProfileBackground: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customerBackgroundOverlay: {
    backgroundColor: 'rgba(38, 49, 60, 0.85)',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  profileContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: Platform.OS == 'android' ? 100 : 58
  },
  username: {
    fontFamily: 'Proxima Nova',
    color: '#fff',
    marginTop: 20,
    fontSize: 20
  },
  extraText: {
    fontFamily: 'Proxima Nova',
    color: '#979a9d',
    fontSize: 16,
    marginTop: 20,
  },
  customerPhone: {
    fontFamily: 'Proxima Nova',
    color: '#bdbec0',
    fontSize: 16,
    marginTop: 20,
  },
  alreadyAppliedText: {
    fontFamily: 'Proxima Nova',
    color: '#cf2525',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 10
  }
})