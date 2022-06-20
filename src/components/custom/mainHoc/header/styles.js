import { StyleSheet } from 'react-native';
import { fonts, colors, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    height: 58,
    paddingHorizontal: 40.56,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  logoWrap: {
    width: 84.84,
    justifyContent: 'center'
  },
  menuWrap: {
    flexDirection: 'row',
    flex: 1,
  },
  menuItemWrap: {
    height: '100%',
    justifyContent: 'center',
  },
  menuItem: {
    fontSize: 13,
    marginRight: 15
  },
  menuItemBold: {
    fontSize: 13,
    marginRight: 15,
    ...fonts.bold
  },
  searchWrap: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchInputWrap: {
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    paddingHorizontal: 11,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: 260,
    height: 28,
    justifyContent: 'space-between',
  },
  searchInput: {
    borderWidth: 0,
    flex: 1,
    fontSize: 9,
    padding: 0,
    ...fonts.default,
    color: colors.text
  },
  searchIco: {
    height: 12,
    width: 12,
    borderRadius: 50,
    overflow: 'hidden'
  },
  downloadIco: {
    marginLeft: 15,
    height: 15,
    width: 15
  },
  tooltipWrap: {
    maxHeight: 200
  },
  tooltipItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  tooltipTxt: {

  },
  scannerIcon: {
    paddingRight: 15,
    paddingVertical: 10
  },
  scannerHeader: {
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    paddingHorizontal: 30,
    position: 'absolute',
    top: 0,
  },
  scannerFooter: {
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  scannerFooterTxt: {
    color: colors.text,
    ...appStyles.h3_headFontSize,
    textAlign: 'center'
  },
  headerlogoWrap: {
    width: 84,
    marginRight: 31.6
  },
  logoImgTouch: {
    height: '100%',
    justifyContent: 'center'
  },
  logoImg: {
    width: 84,
    height: 30
  }
});
