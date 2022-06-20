import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.56)'
  },
  modalWrap: {
    backgroundColor: '#fff',
    height: 475,
    width: 625,
    padding: 30
  },
  closeWrap: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 10
  },
  heading: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    marginBottom: 20
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: 33,
    paddingHorizontal: 15
  },
  input: {
    borderWidth: 0,
    height: 33,
    ...appStyles.contentFontSizeSmall,
    ...fonts.default,
    color: colors.text
  },
  contentWrap: {
    flex: 1,
    marginTop: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: colors.borderColor
  },
  contentWrapInner: {
    padding: 15
  },
  btnWrap: {
    flexDirection: 'row'
  },
  btnLeftWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  saveBtn: {
    marginLeft: 10
  },
  btnRightWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  folderContainer: {
  },
  folderWrap: {
    flexDirection: 'row',
    marginBottom: 8
  },
  folderIconWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  folderName: {
    ...appStyles.contentFontSizeSmall,
    lineHeight: 20,
    ...fonts.bold
  },
  favTitle: {
    ...appStyles.contentFontSizeSmall,
    lineHeight: 20,
    color: colors.text,
    marginBottom: 10,
    marginLeft: 20
  },
  newFolderInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  newFolderInput: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#fff',
    ...appStyles.contentFontSizeSmall,
    height: 25,
    color: colors.text,
    minWidth: 60
  }
});
