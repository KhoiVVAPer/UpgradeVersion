import { StyleSheet } from 'react-native';
import {
  colors,
  fonts,
  appStyles
} from '../../../config';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  tabHeading: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    marginTop: 20,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 30
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
    marginVertical: 15,
  },
  listItemImgWrap: {
    height: 145,
    width: '100%',
  },
  listItemImg: {
    height: 145,
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
  searchWrap: {
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor
  },
  searchInput: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    height: 20,
    flex: 1,
    ...fonts.default,
    color: colors.text
  },
  tabWrap: {
    flexDirection: 'row'
  },
  tabItem: {
    flex: 1,
    backgroundColor: colors.darkBg,
    marginRight: 1
  },
  tabItemTxt: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: colors.secondaryColor,
    ...appStyles.headFontSize,
    ...fonts.medium
  },
  activeTabItem: {
    backgroundColor: colors.black
  },
  activeTabItemTxt: {
    color: colors.primaryColor
  },
  loadMoreButton: {
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  suggesstionWrapInner: {
    position: 'absolute',
    top: 0,
    right: 65,
    backgroundColor: '#fff',
    width: 400,
    zIndex: 10000,
    overflow: 'hidden',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.borderColor
  },
  tooltipWrap: {
    maxHeight: 350,
    overflow: 'hidden'
  },
  tooltipItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  contentTypeWrap: {
    ...appStyles.padV(20),
    ...appStyles.padH(30),
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1
  },
  contentTypeHead: {
    ...fonts.bold,
    ...appStyles.headFontSize
  },
  discontinuedWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    ...appStyles.padH(10),

  },
  discontinuedWarningTxt: {
    fontWeight: '400',
    fontSize: 14,
    ...appStyles.mgL(10)
  },
});
export default styles;
