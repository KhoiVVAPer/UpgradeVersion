import { StyleSheet } from 'react-native';
import { fonts, appStyles } from '../../../config';

const styles = StyleSheet.create({
  popoverStyle: {
    borderRadius: 0
  },
  wrap: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    width: 400
  },
  headerWrap: {
    flexDirection: 'row',
    marginBottom: 15
  },
  heading: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    lineHeight: 18
  },
  onlineIndicators: {
    alignItems: 'flex-end',
    marginLeft: 10,
    flexDirection: 'row',
    width: 26,
    justifyContent: 'space-between'
  },
  contentWrap: {
    marginBottom: 10
  },
  contentTxt: {
    ...appStyles.headFontSizeMedium
  },
  compareWrap: {
    flexDirection: 'row',
    ...appStyles.mgV(10)
  }
});
export default styles;
