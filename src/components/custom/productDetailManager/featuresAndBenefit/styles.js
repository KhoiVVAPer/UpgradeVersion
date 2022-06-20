import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    paddingBottom: 40
  },
  imgListItemContainer: {
    justifyContent: 'flex-start'
  },
  imgListItemColContainer: {
    justifyContent: 'space-between',
  },
  imgListItem: {
    backgroundColor: '#fff',
    flex: 1 / 3,
    margin: 10
  },
  imgListItemImgWrap: {
    height: 304,
    width: '100%',
    backgroundColor: colors.bg
  },
  imgListItemImg: {
    height: 304,
    width: '100%',
  },
  imgListItemContent: {
    flex: 1,
    padding: 10,
    width: '100%'
  },
  imgListItemImgHeadTxt: {
    ...appStyles.contentFontSize,
    color: colors.black,
    ...fonts.bold,
    marginTop: 10,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
  imgListItemImgHeadDesc: {
    ...appStyles.contentFontSize,
    color: colors.black,
    lineHeight: 15,
    flexWrap: 'wrap'
  },


  groupListItemContainer: {
    justifyContent: 'flex-start'
  },
  groupListItemColContainer: {
    justifyContent: 'space-between',
    marginTop: 15
  },
  groupItem: {
    backgroundColor: colors.darkBg,
    flex: 1 / 2,
    margin: 10,
    padding: 15
  },
  groupItemHead: {
    ...appStyles.contentFontSize,
    color: colors.black,
    ...fonts.bold,
    lineHeight: 15,
    flexWrap: 'wrap',
    marginBottom: 10
  },
  groupSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  groupSubItemTxt: {
    ...appStyles.contentFontSize,
    color: colors.black,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
  bullet: {
    height: 4,
    width: 4,
    backgroundColor: colors.black,
    marginRight: 10
  }
});
