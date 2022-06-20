import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    ...fonts.bold
  },
  wrap: {
    backgroundColor: '#fff',
    padding: 20,
    paddingHorizontal: 40,
    marginLeft: -10,
    marginRight: -10,
  },
  listItemContainer: {
    justifyContent: 'flex-start',
  },
  listItemColContainer: {
    justifyContent: 'space-between',
    marginBottom: 32
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 4,
    margin: 10,
    marginVertical: 0
  },
  listItemImgWrap: {
    height: 135,
    width: '100%'
  },
  listItemImg: {
    height: 135,
    width: '100%'
  },
  listItemContent: {
    padding: 10,
    paddingHorizontal: 0,
    width: '100%',
    justifyContent: 'flex-end'
  },
  listItemImgHeadTxt: {
    color: colors.black,
    ...appStyles.headFontSize,
    paddingTop: 10,
    lineHeight: 15,
    flexWrap: 'wrap',
    ...fonts.bold
  },
  listItemImgDescTxt: {
    paddingTop: 11,
    color: colors.black,
    ...appStyles.contentFontSize,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
  subProductGroupItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subProductGroupTxt: {
    ...appStyles.contentFontSize,
    lineHeight: 18,
    ...fonts.bold
  },
  moveTopWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    marginVertical: 25
  }
});
