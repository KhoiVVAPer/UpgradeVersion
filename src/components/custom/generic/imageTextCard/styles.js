import { StyleSheet } from 'react-native';
import { fonts, appStyles } from '../../../../config';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    paddingHorizontal: 5
  },
  imageWrap: {
    marginBottom: 5
  },
  image: {
    height: undefined,
    width: '100%'
  },
  contentWrap: {
    marginTop: 5
  },
  headline: {
    marginTop: 5,
    marginBottom: 5,
    ...appStyles.headFontSize,
    ...fonts.bold
  },
  description: {
    ...appStyles.lH(20),
    ...appStyles.headFontSizeMedium
  }
});

export default styles;
