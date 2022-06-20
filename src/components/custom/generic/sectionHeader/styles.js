import { StyleSheet } from 'react-native';
import { appStyles, colors, fonts } from '../../../../config';

const styles = StyleSheet.create({
  sectionHead: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    marginBottom: 10,
  },
  sectionHeadTxt: {
    ...appStyles.headFontSize,
    ...fonts.bold
  },
});
export default styles;
