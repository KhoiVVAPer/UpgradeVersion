import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../config';

export default StyleSheet.create({
  container: {
    ...appStyles.padH(20),
    ...appStyles.padT(30),
    ...appStyles.padB(10),
    flex: 1,
    backgroundColor: colors.darkBg
  },
  scrollContainer: {
  },
  headerWrap: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  },
  heading: {
    marginRight: 20
  },
  contentWrap: {
    flex: 1,
    flexDirection: 'row'
  },
  section1: {
    flex: 1
  },
  section2: {
    flex: 1,
    paddingHorizontal: 20
  },
  section3: {
    flex: 1
  },
  smallCard: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  cardMini: {
    backgroundColor: '#fff',
    padding: 20,
    height: 260
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    height: 300
  },
  cardHead: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  cardHeadContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardHeadTxt: {
    ...fonts.bold,
    marginLeft: 6,
    fontSize: 9,
    lineHeight: 20
  },
  cardContent: {
    flex: 1
  },
  cardHeadEyeIco: {
    borderRadius: 100,
    backgroundColor: colors.darkBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: 36
  },
  playBtnWrap: {
    alignSelf: 'flex-end'
  },
  downloadBtnWrap: {
    alignSelf: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  changeTxt: {
    marginBottom: 10
  },
  languageListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: colors.borderColor,
    borderWidth: 1,
    marginBottom: -1,
    height: 27
  },
  languageTxt: {

  },
  btn: {
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtStyle: {
    fontSize: 10,
    lineHeight: 20
  },
  downloadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  downloadItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    borderWidth: 1,
    borderColor: colors.black,
    height: 14,
    width: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  downloadLbl: {
    marginLeft: 5,
    ...fonts.bold,
    ...appStyles.contentFontSizeSmall,
    lineHeight: 20
  },
  lastDownloadTxt: {
    fontSize: 8,
    lineHeight: 12,
    color: colors.secondaryColor
  },
  mobileDataPromtWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.darkBg,
    marginTop: 5,
    paddingVertical: 10,
  },
  italicStyle: {
    lineHeight: 15,
    fontStyle: 'italic'
  },
  dropdown: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 27,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: '100%',
    marginBottom: 20
  },
  dropdownlbl: {
    fontSize: 9
  },
  textContent: {
    lineHeight: 15,
    ...appStyles.contentFontSize
  },
  countryContentWrap: {
    flex: 1
  },
  countryContent: {
    overflow: 'hidden',
    flex: 1
  },
  countryContentInner: {
  },
  downloadProgressWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.56)',
  },
  downloadProgressInner: {
    backgroundColor: '#fff',
    width: '50%',
    padding: 20,
    ...appStyles.padB(5)
  },
  downloadProgressItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  },
  downloadItemTxt: {
    ...appStyles.headFontSize,
    ...fonts.medium,
    ...appStyles.padL(10)
  },
  closeWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...appStyles.mgB(5)
  },
  downloadProgressHead: {
    ...fonts.medium,
    ...appStyles.h3_headFontSize
  }
});
