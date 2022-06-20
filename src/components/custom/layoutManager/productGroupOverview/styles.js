import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    marginLeft: -10,
    marginRight: -10,
  },
  heading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    ...fonts.bold
  },
  wrap: {
    backgroundColor: colors.bg,
    padding: 20,
    paddingHorizontal: 40,
  },
  listItemContainer: {
    justifyContent: 'flex-start'
  },
  listItemColContainer: {
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 4,
    margin: 10
  },
  listItemImgWrap: {
    height: 135,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemImg: {
    height: 135,
    width: '100%',
  },
  listItemContent: {
    flex: 1,
    padding: 10,
    width: '100%',
    justifyContent: 'flex-end'
  },
  listItemImgHeadTxt: {
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    paddingTop: 10,
    lineHeight: 15,
    flexWrap: 'wrap',
    ...fonts.medium
  },
  listItemImgDescTxt: {

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
