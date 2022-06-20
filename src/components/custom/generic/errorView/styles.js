import { StyleSheet } from 'react-native';
import { fonts, appStyles } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  wrapInner: {
    paddingVertical: 20,
    justifyContent: 'center',
    flex: 1
  },
  errorIco: {
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    ...fonts.banner,
    ...appStyles.h1_headFontSize,
    textAlign: 'center',
    marginBottom: 10
  },
  errorTxt: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    textAlign: 'center'
  },
  settingsWrap: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default styles;
