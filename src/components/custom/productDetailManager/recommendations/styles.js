import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    paddingBottom: 40
  },
  sectionHead: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    marginBottom: 10
  },
  sectionHeadTxt: {
    ...appStyles.headFontSize
  },
  listItemContainer: {
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  listItemColContainer: {
    justifyContent: 'space-between'
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 4,
    margin: 10,
  },
  listItemImgWrap: {
    height: 218,
    width: '100%',
  },
  listItemImg: {
    height: 218,
    width: '100%',
  },
  listItemContent: {
    padding: 10,
    width: '100%',
    justifyContent: 'flex-end'
  },
  listItemImgHeadTxt: {
    color: colors.black,
    ...appStyles.headFontSize,
    paddingTop: 10,
    lineHeight: 15,
    fontWeight: '500',
    flexWrap: 'wrap',
    ...fonts.bold
  },
  listItemImgDescTxt: {
    paddingTop: 11,
    color: colors.black,
    ...appStyles.contentFontSize,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
  listItemImgPartnumberTxt: {
    paddingTop: 4,
    color: colors.black,
    ...appStyles.headFontSizeMedium,
    lineHeight: 15,
    ...fonts.bold,
  },
  compareWrap: {
    position: 'absolute',
    top: 0,
    left: 10,
    flexDirection: 'row',
    zIndex: 10,
    alignItems: 'center'
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
    marginBottom: 10,
    marginTop: 10,
  },
  dropdownlbl: {
    fontSize: 9
  },
});
