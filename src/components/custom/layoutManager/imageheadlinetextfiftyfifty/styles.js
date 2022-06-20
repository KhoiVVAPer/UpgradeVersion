import { StyleSheet } from 'react-native';
import { fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: 40,
    flexDirection: 'row'
  },
  imageWrap: {
    flex: 1
  },
  content: {
    flex: 1,
    // justifyContent: 'center'
  },
  headingWrap: {
    marginVertical: 15
  },
  heading: {
    fontSize: 22,
    ...fonts.bold
  },
  descWrap: {

  },
  description: {
    ...appStyles.lH(20),
    ...appStyles.headFontSizeMedium
  }
});
