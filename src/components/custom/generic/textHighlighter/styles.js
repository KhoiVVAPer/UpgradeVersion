import { StyleSheet } from 'react-native';
import { appStyles } from '../../../../config';

// const textFont = Platform.OS !== 'ios' ? { fontWeight: 'normal' } : {};

const styles = StyleSheet.create({
  textContainer: {
    flexWrap: 'wrap',
    ...appStyles.contentFontSize,
    zIndex: 10
  },
  text: {
    ...appStyles.contentFontSize,
    zIndex: 10,
    // ...textFont
  }
});

export default styles;
