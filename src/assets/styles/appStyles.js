import { StyleSheet } from 'react-native';
import { fonts } from '../../config';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    fontSize: 30,
    ...fonts.banner
  }
});
