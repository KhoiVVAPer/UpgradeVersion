import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingBottom: 40,
    marginTop: 20
  },
  leftWrap: {
    width: 360,
    justifyContent: 'space-between'
  },
  actionWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    flexDirection: 'row',
  },
  compareWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    ...appStyles.mgR(10)
  },
  checkBox: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  compareTxt: {
    ...appStyles.contentFontSize
  },
  exportWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  exportWrapInner: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  exportTxt: {
    ...appStyles.contentFontSize,
    marginLeft: 5
  },
  leftContentWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 25
  },
  labelWrap: {
    width: 60,
    justifyContent: 'center'
  },
  labelImgWrap: {
    height: 44,
    width: 44,
    marginBottom: 10
  },
  labelImg: {
    height: 44,
    width: 44
  },
  fullImgWrap: {
    width: 300,
    alignItems: 'center'
  },
  slideWrap: {
    flex: 1,
    justifyContent: 'center'
  },
  fullImg: {
    height: undefined,
    width: '100%'
  },
  thumbnailWrap: {
    marginTop: 10
  },
  thumbnailItemContainer: {
    justifyContent: 'flex-start'
  },
  thumbnailItemColContainer: {
    justifyContent: 'space-between',
  },
  prevNavScrol: {
    position: 'absolute',
    top: 23,
    left: -15,
    padding: 10,
    zIndex: 10
  },
  nextNavScrol: {
    position: 'absolute',
    top: 23,
    right: -15,
    padding: 10,
    zIndex: 10
  },
  thumbnailImgWrap: {
    backgroundColor: '#fff',
    flex: 1 / 3,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.borderColor
  },
  thumbnailImg: {
    height: 60,
    width: '100%',
  },
  rightWrap: {
    flex: 1,
    paddingLeft: 15
  },
  orderNumberWrap: {
    flexDirection: 'row',
  },
  preconfigurationWrap: {
    flexDirection: 'row',
    marginTop: 15,
  },
  pricingWrap: {
    flexDirection: 'row',
    marginTop: 15,
  },
  pricingItem: {
  },
  pricingWrapTxt: {
    ...fonts.bold,
    ...appStyles.headFontSizeMedium,
    width: 200
  },
  priceRemarkTxt: {
    ...fonts.default,
    ...appStyles.headFontSizeMedium,
  },
  statWrap: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    paddingVertical: 5,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: colors.borderColor,
    borderBottomColor: colors.borderColor,
  },
  statView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  statTxt: {
    ...appStyles.headFontSizeMini,
    ...fonts.bold,
    marginLeft: 5
  },
  statTxtVal: {
    ...appStyles.headFontSizeMini
  },
  instructionRequiredWrap: {
    flexDirection: 'row',
    marginTop: 15
  },
  instructionRequiredWrapTxt: {
    ...fonts.bold,
    ...appStyles.headFontSizeMedium
  },
  descWrap: {
    marginTop: 15,
  },
  descWrapTxt: {
    ...appStyles.headFontSizeMedium,
    flexWrap: 'wrap',
    flex: 1,
    lineHeight: 20
  },
  showMoreIco: {
    padding: 15,
    position: 'absolute',
    bottom: -20,
    right: 0,
    zIndex: 10
  },
  techWrap: {
    marginTop: 15,
  },
  texhHeading: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    lineHeight: 18,
    marginBottom: 15
  },
  techItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 15
  },
  techItemDark: {
    backgroundColor: colors.darkBg,
  },
  techItemTxt: {
    ...appStyles.contentFontSize,
    lineHeight: 20,
    ...fonts.medium
  },
});
