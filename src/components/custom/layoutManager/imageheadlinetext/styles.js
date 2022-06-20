import { StyleSheet } from 'react-native';
import { appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: 40
  },
  headingWrap: {
    marginVertical: 15
  },
  heading: {
    fontSize: 22
  },
  descWrap: {

  },
  description: {
    ...appStyles.headFontSizeMedium,
    ...appStyles.lH(20)
  }
});
