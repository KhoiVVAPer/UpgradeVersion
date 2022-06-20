import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 40
  },
  listContainer: {
    flexDirection: 'row'
  },
  listContainerItem: {
    flex: 1,
    marginRight: 10
  },
  listItemWrap: {
    flex: 1,
    marginBottom: 10
  },
  listItemHead: {
    backgroundColor: colors.bg,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemDesc: {
    padding: 15,
    paddingVertical: 10
  },
  listItemHeadTxt: {
    marginLeft: 15,
    ...fonts.bold
  },
  listItemDescTxt: {
    ...appStyles.contentFontSize,
    marginLeft: 27
  },
});

export default styles;
