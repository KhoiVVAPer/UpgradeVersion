import { StyleSheet } from 'react-native';
import { appStyles, fonts, colors } from '../../../../../config';

const styles = StyleSheet.create({
  wrap: {
    ...appStyles.padH(40),
    ...appStyles.padV(20),
  },
  heading: {
    ...fonts.bold,
    ...appStyles.h3_headFontSize,
    ...appStyles.mgB(20)
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
    ...appStyles.padH(15),
    ...appStyles.padV(10),
    ...appStyles.mgB(15)
  },
  dropdownlbl: {

  },
  productListContainer: {
    justifyContent: 'flex-start'
  },
  productListColContainer: {
    justifyContent: 'space-between',
  },
  product: {
    backgroundColor: '#fff',
    flex: 1 / 4,
    margin: 10,
  },
  productImgWrap: {
    height: 170,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: 'hidden'
  },
  productImg: {
    height: 170,
    width: '100%',
  },
  productContent: {
    padding: 10,
    width: '100%',
    justifyContent: 'flex-end'
  },
  productImgHeadTxt: {
    color: colors.black,
    ...appStyles.headFontSize,
    paddingTop: 10,
    lineHeight: 15,
    flexWrap: 'wrap',
    ...fonts.bold
  },
  productImgDescTxt: {
    paddingTop: 11,
    color: colors.black,
    ...appStyles.contentFontSize,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
  compareWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    ...appStyles.mgB(15)
  },
  checkBox: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  compareTxt: {
    ...appStyles.contentFontSize
  },
  showMoreBtn: {
    ...appStyles.mgH(10),
    ...appStyles.mgT(10)
  }
});

export default styles;
