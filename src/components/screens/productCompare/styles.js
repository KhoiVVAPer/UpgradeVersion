import { StyleSheet } from 'react-native';
import { appStyles, fonts, colors } from '../../../config';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingVertical: 25,
    ...appStyles.appHorizontalPadding
  },
  scrollWrap: {
    marginTop: 25,
    flex: 1
  },
  wrapInner: {
    flex: 1
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heading: {
    marginRight: 15
  },
  exportWrap: {
    flexDirection: 'row'
  },
  exportTxt: {
    ...appStyles.contentFontSize,
    marginLeft: 10
  },
  imageSection: {
    flexDirection: 'row'
  },
  imageSectionItem: {
    flex: 1,
    marginTop: 10
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
});

export default styles;
