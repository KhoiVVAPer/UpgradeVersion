import { StyleSheet } from 'react-native';
import { fonts, appStyles } from '../../../../config';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.56)'
  },
  wrapInner: {
    backgroundColor: '#fff',
    width: '60%',
    padding: 25
  },
  heading: {
    ...appStyles.headFontSize,
    ...fonts.bold
  },
  content: {
    flexDirection: 'row',
    height: 250,
    paddingVertical: 20
  },
  contentLeft: {
    width: 200,
  },
  contentRight: {
    flex: 1
  },
  productTxt: {
    ...fonts.bold,
    ...appStyles.headFontSizeMini,
    marginBottom: 10,
    marginTop: 25,
  },
  orderTxt: {
    ...fonts.bold,
    ...appStyles.headFontSizeMini
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeWrap: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 10
  },
});

export default styles;
