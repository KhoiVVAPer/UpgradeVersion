import { StyleSheet, Platform } from 'react-native';
import { fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  imageCollection: {
    height: 540,
    flexDirection: 'row',
    padding: 20,
    paddingHorizontal: 40,
    backgroundColor: '#fff'
  },
  imageCollectionLeft: {
    padding: 20,
    flex: 7
  },
  imageCollectionLeftInner: {
    height: '100%',
    width: '100%'
  },
  imageCollectionHeadingLeftTxt: {
    fontWeight: '800',
    fontSize: 39,
    color: '#fff',
    marginBottom: 20,
    width: '60%',
    ...fonts.banner
  },
  imageCollectionRight: {
    flex: 3,
    justifyContent: 'space-between',
    marginLeft: 20
  },
  imageCollectionRightItem: {
    height: 160
  },
  imageCollectionRightItemInner: {
    height: 160,
    padding: 15,
    justifyContent: 'flex-end'
  },
  imageCollectionHeadingRightTxt: {
    color: '#fff',
    ...appStyles.headFontSize,
    ...fonts.bold
  },
  bannerBtn: {
    // borderColor: colors.borderDark
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0.75,
    shadowRadius: 1,
    shadowColor: '#00000061',
    shadowOffset: { height: 0, width: 0 },
    elevation: 3
  }
});
