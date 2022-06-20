import { Dimensions, StyleSheet } from 'react-native';

const displayHeight = Dimensions.get('window').height;
const displayWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.56)'
  },
  modalWrap: {
    backgroundColor: '#fff',
    height: displayHeight,
    width: displayWidth,
    position: 'relative'
  },
  closeWrap: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 10
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  }
});
