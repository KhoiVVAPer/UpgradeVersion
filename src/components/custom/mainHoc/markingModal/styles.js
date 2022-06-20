import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

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
    maxHeight: 400,
    padding: 25
  },
  heading: {
    ...appStyles.h3_headFontSize,
    ...fonts.bold,
    marginBottom: 15,
  },
  closeWrap: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
    padding: 10
  },
  input: {
    fontSize: 14,
    padding: 20,
    backgroundColor: colors.bg,
    color: colors.text,
    maxHeight: 250
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  footerLeft: {
    flexDirection: 'row'
  },
  footerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  colorBoxWrap: {
    height: 25,
    width: 25,
    backgroundColor: colors.darkBg,
    marginRight: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorBox: {
    height: 15,
    width: 15
  },
  activeColorBox: {
    backgroundColor: colors.black
  },
  commentWrap: {
  },
  commentHeadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  commentHeadLeft: {
    flexDirection: 'row'
  },
  commentIco: {
    marginRight: 15
  },
  commentDate: {
    color: colors.textLight,
    paddingRight: 25,
    ...appStyles.headFontSize,
    fontWeight: '600'
  },
  commentContent: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    minHeight: 100
  },
  commentInput: {
    borderWidth: 0,
    ...appStyles.headFontSizeMini,
    color: colors.text
  },
  commentFooter: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end'
  },
  deleteWrap: {
  },
  deleteContent: {
    padding: 20,
    backgroundColor: colors.bg,
    marginBottom: 20
  },
  deleteFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  commentTxt: {
    ...appStyles.headFontSizeMedium,
    lineHeight: 17
  }
});

export default styles;
