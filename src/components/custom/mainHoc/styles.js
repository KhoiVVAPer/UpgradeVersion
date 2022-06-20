import { StyleSheet, Platform } from 'react-native';
import { colors, fonts, appStyles } from '../../../config';

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.46,
  shadowRadius: 11.14,

  elevation: 17,
};

const alertStyle = {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 350,
  backgroundColor: '#fff',
  padding: 25,
  borderBottomWidth: 3,
  zIndex: 9999,
  ...appStyles.padH(30),
  ...appStyles.padV(15)
};

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1
  },
  statusbar: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.black
  },
  suggesstionWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 10000,
    borderRadius: 8,
    height: '100%',
    width: '100%'
  },
  suggesstionWrapInner: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 300,
    zIndex: 10000,
    overflow: 'hidden',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.borderColor
  },
  tooltipWrap: {
    maxHeight: 350,
    overflow: 'hidden'
  },
  tooltipItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  successAlert: {
    borderBottomColor: colors.green,
    ...alertStyle,
    ...shadowStyle
  },
  errorAlert: {
    borderBottomColor: colors.red,
    ...alertStyle,
    ...shadowStyle
  },
  warningAlert: {
    borderBottomColor: colors.primaryColor,
    ...alertStyle,
    ...shadowStyle
  },
  alertHeadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  alertHeadText: {
    ...fonts.medium,
    ...appStyles.headFontSizeMedium
  },
  alertContentText: {
    ...appStyles.headFontSizeMini
  },
  innerSearchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1000,
    backgroundColor: 'transparent'
  }
});
