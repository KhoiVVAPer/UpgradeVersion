import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    padding: 20,
    ...appStyles.padH(40)
  },
  wrapContent: {
    marginLeft: -20,
    marginRight: -20,
  },
  listItemContainer: {
    justifyContent: 'flex-start'
  },
  listItemColContainer: {
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 4,
    margin: 10,
  },
  listItemImgWrap: {
    height: 135,
    width: '100%',
  },
  listItemImg: {
    height: 135,
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
  compareWrap: {
    position: 'absolute',
    top: -10,
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
  checkboxGroupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 2000
  },
  checkboxGroupOverlayList: {
    position: 'absolute',
    height: 300,
    backgroundColor: '#fff',
    zIndex: 3002,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.borderColor,
    overflow: 'hidden'
  }
});
