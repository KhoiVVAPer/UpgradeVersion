import { StyleSheet } from 'react-native';
import { colors, appStyles } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  text: {
    color: colors.black,
    ...appStyles.headFontSize
  }
});

export default styles;
