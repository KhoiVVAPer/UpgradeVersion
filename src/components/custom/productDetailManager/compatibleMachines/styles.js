import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 40
  },
  listItemContainer: {
    justifyContent: 'flex-start'
  },
  listItemColContainer: {
    justifyContent: 'space-between',
  },
  listItem: {
    flex: 1 / 4,
    marginRight: 10,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemTxt: {
    ...appStyles.contentFontSize,
    ...fonts.bold,
    marginLeft: 5
  },
  listItemTxtFade: {
    ...appStyles.contentFontSize,
    ...fonts.default,
    marginLeft: 5
  },
  activeRow: {
    backgroundColor: colors.bg
  },
});

export default styles;
