import { StyleSheet } from 'react-native';
import { colors, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    paddingBottom: 40
  },
  wrapInner: {
    flexDirection: 'row'
  },
  section: {
    flex: 1
  },
  equipmentWrap: {
  },
  activeRow: {
    backgroundColor: colors.darkBg
  },
  equipmentRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  equipmentLabel: {
    ...appStyles.contentFontSize,
    lineHeight: 20
  },
  bullet: {
    height: 4,
    width: 4,
    backgroundColor: colors.black,
    marginRight: 10
  },
  iconWrap: {
    paddingLeft: 15
  },
  iconItemContainer: {
    justifyContent: 'flex-start'
  },
  iconItemColContainer: {
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 6,
    margin: 10
  },
  image: {
    height: undefined,
    width: '100%',
  },
  iconTooltip: {
    backgroundColor: colors.primaryColor
  },
  propover: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primaryColor
  },
  propoverTxt: {
    ...appStyles.contentFontSize,
    lineHeight: 15,
    maxWidth: 100
  },
  popoverArrow: {
    backgroundColor: colors.primaryColor
  },
});
