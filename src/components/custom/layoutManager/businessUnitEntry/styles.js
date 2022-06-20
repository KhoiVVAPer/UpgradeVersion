import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  catalogueItem: {
    flex: 1
  },
  catalogueItemInner: {
    height: '100%',
    width: '100%',
    paddingTop: 17,
    paddingBottom: 50,
    paddingHorizontal: 40,
  },
  item1: {
    backgroundColor: colors.primaryColor
  },
  item2: {
    // backgroundColor: colors.secondaryColor
    backgroundColor: '#6E6E6E'
  },
  catalogueImageWrap: {
    flex: 1,
    paddingVertical: 15
  },
  catalogueImage: {
    height: '100%',
    width: '100%'
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    ...fonts.banner,
    lineHeight: 38
  },
  heading1: {
  },
  heading2: {
    color: '#fff'
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  btnTxt: {
    lineHeight: 20
  }
});
