import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
    zIndex: 100
  },
  highlighter: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.39)',
    borderRadius: 500,
    overflow: 'hidden',
    zIndex: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
