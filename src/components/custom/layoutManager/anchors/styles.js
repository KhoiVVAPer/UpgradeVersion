import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

export default StyleSheet.create({
  container: {
    ...appStyles.appHorizontalMargin,
    overflow: 'hidden',
  },
  containerInner: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    backgroundColor: colors.darkBg
  },
  anchorWrap: {
    maxWidth: 170,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#fff',
    justifyContent: 'center',
    backgroundColor: colors.darkBg,
    ...appStyles.padV(8)
  },
  anchor: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 15,
    ...fonts.medium,
    color: colors.secondaryColor
  },
  anchorWrapActive: {
    backgroundColor: colors.black
  },
  anchorActive: {
    color: colors.primaryColor
  },
});
