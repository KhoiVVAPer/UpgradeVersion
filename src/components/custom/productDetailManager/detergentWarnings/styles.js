import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 40
  },
  listItemContainer: {
    justifyContent: 'flex-start'
  },
  listItemColContainer: {
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 2,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemTxt: {
    ...fonts.medium
  },
  bullet: {
    height: 4,
    width: 4,
    backgroundColor: colors.black,
    marginRight: 10
  },
  activeRow: {
    backgroundColor: colors.darkBg
  },
});

export default styles;
