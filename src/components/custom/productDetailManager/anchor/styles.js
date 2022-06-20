import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../config';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  containerInner: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    backgroundColor: colors.darkBg,
  },
  anchorWrap: {
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#fff',
    justifyContent: 'center',
    backgroundColor: colors.darkBg,
    flex: 1,
    paddingVertical: 8
  },
  anchor: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 15,
    ...fonts.medium,
    color: colors.secondaryColor,
    flexWrap: 'wrap'
  },
  anchorWrapActive: {
    backgroundColor: colors.black
  },
  anchorActive: {
    color: colors.primaryColor
  },
});
