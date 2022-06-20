import { StyleSheet } from 'react-native';
import { colors, appStyles, fonts } from '../../../../config';

export default StyleSheet.create({
  wrap: {
    paddingBottom: 40
  },
  listContainer: {
    justifyContent: 'flex-start'
  },
  listColContainer: {
    justifyContent: 'space-between',
  },
  listItem: {
    backgroundColor: '#fff',
    flex: 1 / 6,
    margin: 10,
    marginBottom: 0
  },
  imgWrap: {
    height: 205,
    width: '100%',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.borderColor
  },
  image: {
    height: 205,
    width: '100%',
  },
  loaderImgWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderImg: {
    height: 45,
    width: 45,
  },
  title: {
    ...appStyles.contentFontSize,
    color: colors.black,
    ...fonts.bold,
    marginTop: 10,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
});
