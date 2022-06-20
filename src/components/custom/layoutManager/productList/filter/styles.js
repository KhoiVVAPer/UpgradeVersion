import { StyleSheet } from 'react-native';
import { fonts, appStyles, colors } from '../../../../../config';

const styles = StyleSheet.create({
  wrap: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: 'rgba(242,242,242,1)',
    marginBottom: 20
  },
  headWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  head: {
    ...fonts.bold,
    ...appStyles.contentFontSizeSmall,
    lineHeight: 20
  },
  wrapInner: {
    flexDirection: 'row',
    paddingBottom: 15,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  rangeItem: {
    width: '25%',
    marginBottom: 10,
  },
  rangeItemInner: {
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10
  },
  rangeItemHead: {
    ...appStyles.contentFontSizeSmall,
    lineHeight: 20,
    color: colors.text
  },
  rangeItemContent: {
    marginBottom: 20,
    paddingHorizontal: 10
  },
  rangeItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    marginLeft: 10,
    paddingRight: 10
  },
  rangeItemFooterTxt: {
    ...appStyles.contentFontSizeSmall,
    lineHeight: 20,
    color: colors.text
  },
  checkboxWrapper: {
    width: '25%'
  },
  checkboxWrapperInner: {
    marginRight: 10
  },
  checkboxItem: {
    // paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkboxTxt: {
    ...appStyles.contentFontSizeSmall,
    marginRight: 5,
    marginLeft: 5,
    flex: 1
  },
  selectedFilterWrap: {
    flexDirection: 'row',
    marginBottom: 20
  },
  selectedFilterItem: {
    flexDirection: 'row',
    marginRight: 10,
    backgroundColor: colors.darkBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedFilterItemSec1: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedFilterTxt: {
    textAlign: 'center',
    fontWeight: '500'
  },
  checkboxGroupWrapper: {
    width: '25%'
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
  closeWrap: {
    marginLeft: 15,
    borderRadius: 100,
    backgroundColor: '#fff',
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default styles;
