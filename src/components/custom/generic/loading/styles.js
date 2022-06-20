import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minHeight: 200,
    backgroundColor: colors.primaryColor
  },
  light: {
    backgroundColor: '#fff',
  },
  dark: {
    backgroundColor: colors.primaryColor,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaderImg: {
    height: 64,
    width: 64
  },
  configWrap: {
    marginTop: 30
  },
  configTxt: {
    ...fonts.bold,
    ...appStyles.h3_headFontSize,
    textAlign: 'center'
  }
});

export default styles;
