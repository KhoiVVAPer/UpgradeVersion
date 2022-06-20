import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  headerTextWrap: {
    backgroundColor: '#fff',
    padding: 20,
    ...appStyles.appHorizontalPadding
  },
  ribbonWrap: {
    backgroundColor: colors.primaryColor,
    padding: 20,
    ...appStyles.appHorizontalPadding
  },
  headWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headRightContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  heading: {
    fontSize: 30,
    ...fonts.banner
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'hidden'
  },
  descriptionWrap: {
    width: '75%',
    paddingTop: 10
  },
  btnWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  favIco: {
    paddingTop: 5
  },
  exportIco: {
    paddingTop: 5,
    marginLeft: 10
  },
  contentTxt: {
    ...appStyles.headFontSizeMedium,
    lineHeight: 20
  }
});
