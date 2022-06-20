import { StyleSheet } from 'react-native';
import { appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: 40
  },
  descWrap: {
    ...appStyles.lH(20),
    ...appStyles.headFontSizeMedium
  },
});
