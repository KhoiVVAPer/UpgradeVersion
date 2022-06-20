import { StyleSheet } from 'react-native';
import { colors, tr, appStyles } from '../../../../config';

const styles = StyleSheet.create({
  closeIcoWrap: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10
  },
  footerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  footerSec1: {
    justifyContent: 'flex-end'
  },
  footerSec2: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  stepsTxt: {
    color: colors.textLight
  }
});
export default styles;
