import { StyleSheet } from 'react-native';
import { colors, fonts, appStyles } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 50,
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderColor
  },
  headIcons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  cardHeadTxt: {
    ...fonts.bold,
    marginLeft: 6,
    fontSize: 20,
    lineHeight: 20
  },
  magnifyMinifyWrap: {
    flexDirection: 'row',
    width: 90,
    height: 40,
    backgroundColor: colors.darkBg,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 20,
    alignItems: 'center'
  },
  magnifyMinifyItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    flex: 1,
    ...appStyles.padV(20),
    ...appStyles.padH(30)
  },
  textContent: {
    lineHeight: 15,
    ...appStyles.contentFontSize
  },
  closeWrap: {
    borderRadius: 100,
    backgroundColor: colors.darkBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  }
});
