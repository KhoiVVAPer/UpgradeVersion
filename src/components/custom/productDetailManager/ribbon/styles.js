import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 30,
    flexDirection: 'row'
  },
  navControl: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40
  },
  leftNav: {
  },
  rightNav: {
  },
  navIcon: {
    paddingHorizontal: 5,
  },
  contentWrap: {
    flex: 1
  },
  headWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heading: {
    ...appStyles.h1_headFontSize,
    ...fonts.banner
  },
  settingIco: {
  },
  descriptionWrap: {
    overflow: 'hidden'
  },
  descWarningWrap: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  descWarning: {
    paddingLeft: 20,
    lineHeight: 20,
    paddingTop: 10,
    ...appStyles.headFontSizeMedium,
    flexWrap: 'wrap',
    width: '80%'
  },
  description: {
    lineHeight: 20,
    paddingTop: 10,
    ...appStyles.headFontSizeMedium
  },
});
