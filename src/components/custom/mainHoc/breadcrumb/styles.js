import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    backgroundColor: colors.bg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
    borderTopWidth: 6,
    borderTopColor: colors.secondaryColor
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 3,
    paddingVertical: 8
  },
  navInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  navTxtWrap: {
    justifyContent: 'center',
  },
  backTxtWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backTxt: {
    fontSize: 10,
    lineHeight: 20,
    paddingLeft: 3
  },
  navTxt: {
    fontSize: 10,
    lineHeight: 20
  },
  navTxtBold: {
    fontSize: 10,
    ...fonts.bold,
    marginRight: 3,
    lineHeight: 15
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  settingIco: {
    height: 35,
    paddingHorizontal: 10,
    paddingRight: 0,
    justifyContent: 'center'
  },
  compareCountWrap: {
    position: 'absolute',
    right: -8,
    top: 2,
    zIndex: 10
  },
  compareCountTxt: {
    ...fonts.bold,
    ...appStyles.contentFontSizeSmall
  },
});
