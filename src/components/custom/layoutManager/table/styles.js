import { StyleSheet } from 'react-native';
import { colors, appStyles } from '../../../../config';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  wrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: '#fff'
  },
  wrapDark: {
    backgroundColor: colors.bg
  },
  column: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  zoomIconWrap: {
    alignItems: 'flex-end'
  },
  zoomIcon: {
    backgroundColor: colors.bg,
    ...appStyles.padH(10),
    ...appStyles.padV(5),
  },
  modalWrap: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalWrapinner: {
    flex: 1
  },
  modalHeader: {
    width: '100%',
    ...appStyles.padH(20),
    ...appStyles.padV(10),
    ...appStyles.padT(20),
    alignItems: 'flex-end',
    backgroundColor: colors.darkBg
  }
});
