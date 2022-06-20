import { StyleSheet } from 'react-native';
import { fonts, appStyles, colors } from '../../../../config';

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start'
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    ...fonts.default,
    ...appStyles.contentFontSize
  },
  default: {
    borderColor: colors.text,
  },
  defaultTxt: {
    color: colors.text
  },
  light: {
    borderColor: '#fff',
  },
  lightTxt: {
    color: '#fff'
  },
  app: {
    borderColor: colors.primaryColor,
    backgroundColor: colors.primaryColor,
  },
  appTxt: {
    color: colors.text
  },
  dark: {
    borderColor: colors.secondaryColor,
    backgroundColor: colors.secondaryColor,
  },
  darkTxt: {
    color: '#fff'
  },
  gray: {
    borderColor: colors.darkBg,
    backgroundColor: colors.darkBg,
  },
  grayTxt: {
    color: colors.text
  },
  whie: {
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  whiteTxt: {
    color: colors.text,
  },
  btnShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  loaderImg: {
    height: 13,
    width: 13
  }
});

export default styles;
