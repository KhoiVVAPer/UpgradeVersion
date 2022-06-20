import { StyleSheet } from 'react-native';
import { appStyles } from '../../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1
  },
  contentContainerInner: {
    ...appStyles.appHorizontalPadding
  },
  moveTopWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    marginVertical: 25
  }
});
