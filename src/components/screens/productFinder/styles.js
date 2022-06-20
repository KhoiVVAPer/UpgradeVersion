import { StyleSheet, Dimensions } from 'react-native';
import { appStyles, fonts, colors } from '../../../config';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  productGroupWrap: {
    paddingHorizontal: width * 0.03
  },
  productFilterWrap: {
    paddingHorizontal: width * 0.015, flex: 1
  },
  productFilterHeaderWrap: {
    paddingVertical: height * 0.03, paddingTop: height * 0.025, flex: 0.05, paddingHorizontal: width * 0.01
  },
  productMySelectedFilterWrap: {
    paddingHorizontal: width * 0.01, flexDirection: 'row'
  },
  productFilterFooterWrap: {
    flexDirection: 'row', paddingHorizontal: width * 0.005, flex: 0.9
  },
  filterListWrap: {
    flex: 0.26, paddingHorizontal: width * 0.006
  },
  productResultWrap: {
    flex: 0.74
  },
  productGroupHeader: {
    paddingVertical: height * 0.03, paddingTop: height * 0.015
  },
  productGroupQuestion: {
    paddingVertical: height * 0.015
  },
  removingLoader: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    paddingRight: 15,
    alignItems: 'flex-start',
    top: -10
  },
  removeWrap: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    paddingRight: 15
  },
  removeWrapInner: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    width: '100%',
  },
  removeTxt: {
    marginLeft: 10,
    ...appStyles.contentFontSize
  },
  imageWrap: {
    height: 160,
    width: '100%'
  },
  productNameTxt: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    color: colors.text,
    marginTop: 5,
    paddingHorizontal: 5
  },
  productPriceTxt: {
    ...appStyles.headFontSize,
    color: colors.text
  },
  sectionHead: {
    flexDirection: 'row',
    marginBottom: 10
  },
  sectionHeadTxt: {
    ...fonts.bold,
    ...appStyles.headFontSizeMini,
    marginRight: 10
  },
  techDataSection: {
    marginTop: 20
  },
  techDataRow: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  techDataItem: {
    flex: 1
  },
  equipmentSection: {
    marginTop: 20
  },
  equipmentRow: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  equipmentItem: {
    flex: 1
  },
  activeRow: {
    backgroundColor: colors.bg
  },
  descSection: {
    marginTop: 20
  },
  descItem: {
    flex: 1,
    padding: 5
  },
  descTxt: {
    ...appStyles.headFontSizeMedium,
    color: colors.text,
    lineHeight: 20
  },
  checkboxImg: {
    height: 14,
    width: 14
  },
  favIco: {
    paddingRight: 15,
    marginVertical: 'auto'
  },
  checkboxGroupWrapper: {
    width: '92%',
    // flexWrap: 'wrap',
  },
  checkboxGroupWrapperInner: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  filterOption: {
    flex: 0.9
  },
  filterOptionCheckBox: {
    flex: 0.1, alignItems: 'flex-end'
  },
  checkboxGroupOverlay: {
    // position: 'absolute',
    //  top: 50,
    // left: 0,
    //  height: '60%',
    //  width: '60%',
    // backgroundColor: 'yellow',
    // zIndex: 2000
  },
  checkboxGroupOverlayList: {
    position: 'absolute',
    height: 300,
    backgroundColor: '#fff',
    // zIndex: 3002,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.borderColor,
    // overflow: 'hidden'
  },
  selectedYesNoCheckbox: {
    padding: 7,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: '10%'
  },
  checkBox: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorWrapper:{
    flex: 0.7, 
    justifyContent:'center',
    alignItems:'center'
  },
  errorTextStyle:{
    ...fonts.bold,
    ...appStyles.headFontSize,
  }
});

export default styles;
