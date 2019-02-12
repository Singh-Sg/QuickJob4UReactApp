import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 220
  },
  totalReviewsView: {
    paddingHorizontal: 20,
    position: 'relative'
  },
  totalReviewsInnerView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'visible',
    marginTop: 12,
    elevation: 20
  },
  totalReviewsLayerOne: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    width: '95%',
    height: 12,
    alignSelf: 'center'
  },
  totalReviews: {
    backgroundColor: '#fb8519',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalReviewsText: {
    fontFamily: 'Proxima Nova',
    color: '#fff',
    marginRight: 5,
    fontSize: 16
  },
  fromReviews: {
    borderRightColor: '#414141',
    borderRightWidth: 1,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fromReviewsText: {
    fontFamily: 'Proxima Nova',
    color: '#414141',
    fontSize: 16
  },
  userAvatarImage: {
    width: 48,
    height: 48,
    borderRadius: 100
  },
  reviews: {
    padding: 20
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingBottom: 20
  },
  topViewReview: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarViewList: {
    marginRight: 20
  },
  reviewUserAvatarImage: {
    width: 65,
    height: 65,
    borderRadius: 100
  },
  reviewUserNameView: {
    marginRight: 20
  },
  reviewRatingView: {
    flexDirection: 'row'
  },
  reviewUserName: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  reviewRatingText: {
    fontSize: 16
  },
  reviewDescText: {
    marginTop: 10,
    fontSize: 16
  }
})