import { StyleSheet } from 'react-native';
import { appStyles, fonts } from '../../../../config';

const styles = StyleSheet.create({
  sectionSubHead: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 0,
    marginBottom: 10,

  },

  sectionSubHeadTxt: {
    ...appStyles.headFontSizeMini,
    ...fonts.bold
  },
  sectionSubHeadTxtFade: {
    ...appStyles.headFontSizeMini,
    ...fonts.default
  },
});
export default styles;
