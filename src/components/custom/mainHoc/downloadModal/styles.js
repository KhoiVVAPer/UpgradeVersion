import { StyleSheet } from 'react-native';
import { fonts, appStyles, colors } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.56)'
  },
  wrapInner: {
    backgroundColor: '#fff',
    width: '60%',
    padding: 25
  },
  closeWrap: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 10
  },
  header: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    marginBottom: 20
  },
  content: {
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  loaderImg: {
    height: 20,
    width: 220
  },
  progressBarContent: {
    width: '100%'
  },
  downloadingLblTxt: {
    ...fonts.medium,
    fontSize: 14,
    ...appStyles.mgL(10)
  },
  progressBar: {
    height: 25,
    borderRadius: 4,
    backgroundColor: colors.darkBg,
    overflow: 'hidden',
    width: '100%'
  },
  progressBarActive: {
    backgroundColor: colors.primaryColor,
    height: 25
  },
  progressBarTxt: {
    textAlign: 'right',
    ...appStyles.mgT(5),
    fontSize: 12,
    ...fonts.medium,
    ...appStyles.padR(10),
  },
  progressCompleteWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  progressPercentTxt: {
    position: 'absolute',
    top: 5,
    left: '50%',
    color: colors.text,
    fontSize: 14,
    ...fonts.bold,
  }
});

export default styles;
