import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...appStyles.appHorizontalPadding,
    paddingVertical: 30,
    backgroundColor: colors.darkBg
  },
  headerWrap: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-end'
  },
  backBtn: {
    marginLeft: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputWrap: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: '#fff',
    height: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  searchInputView: {
    paddingLeft: 15,
    flex: 1,
  },
  searchInput: {
    padding: 0,
    margin: 0,
    ...appStyles.contentFontSizeSmall,
    height: 24,
    ...fonts.default,
    color: colors.text
  },
  morePopover: {
    paddingLeft: 15,
    paddingRight: 5
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row'
  },
  folderWrap: {
    width: 300,
    marginRight: 20
  },
  folderContainer: {
  },
  folderRow: {
    flexDirection: 'row'
  },
  folderTitleWrap: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
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
  favouriteWrap: {
    flex: 1,
  },
  favouriteWrapInner: {
    borderWidth: 1,
    borderColor: colors.borderDark,
    padding: 15,
    backgroundColor: '#fff'
  },
  favouriteItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    flex: 1
  },
  activeFavouriteItem: {
    backgroundColor: colors.darkBg
  },
  favouriteText: {
    ...appStyles.contentFontSize,
    lineHeight: 20
  },
  favouriteTextWrap: {
    flex: 1,
    paddingHorizontal: 15
  },
  propover: {
    padding: 15,
    paddingVertical: 10,
  },
  propoverTxt: {
    paddingVertical: 5,
  },
  folderBtnWrap: {
    flexDirection: 'row',
    marginTop: 20
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
    ...fonts.default,
    color: colors.text
  },
  editFavModalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.56)'
  },
  editFavModalWrapInner: {
    backgroundColor: '#fff',
    width: '60%',
    maxHeight: 400,
    padding: 25
  },
  editFavModalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...appStyles.mgT(15)
  },
  editFavModalInput: {
    fontSize: 14,
    ...appStyles.padV(10),
    ...appStyles.padH(20),
    borderColor: colors.borderColor,
    borderWidth: 1,
    color: colors.text,
    ...appStyles.mgT(15)
  },
  editFavModalCloseWrap: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    ...appStyles.padL(15)
  },
  editFavModalHead: {
    ...appStyles.h3_headFontSize,
    ...fonts.bold
  },
  duplicateFavModalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.56)'
  },
  duplicateFavModalWrapInner: {
    backgroundColor: '#fff',
    width: '60%',
    maxHeight: 400,
    padding: 25
  },
  duplicateFavModalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...appStyles.mgT(15)
  },
  duplicateFavModalInput: {
    fontSize: 14,
    ...appStyles.padV(10),
    ...appStyles.padH(20),
    borderColor: colors.borderColor,
    borderWidth: 1,
    color: colors.text,
    ...appStyles.mgT(15)
  },
  duplicateFavModalCloseWrap: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    ...appStyles.padL(15)
  },
  duplicateFavModalHead: {
    ...appStyles.h3_headFontSize,
    ...fonts.bold
  }
});
