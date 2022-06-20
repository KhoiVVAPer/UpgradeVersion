import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: 462
  },
  headerWrap: {
    height: 66,
    marginBottom: 23
  },
  header: {
    fontSize: 52,
    ...fonts.banner
  },
  dropdownContent: {
    marginBottom: 45
  },
  dropdownPromptWrap: {
    height: 35
  },
  dropdownPrompt: {
    fontSize: 13
  },
  dropdownWrap: {
    flexDirection: 'row',
  },
  dropdownItem: {
    width: 223,
    marginRight: 16
  },
  dropdown: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 27,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: 223
  },
  dropdownlbl: {
    fontSize: 9
  },
  warningWrap: {
    height: 51,
    marginBottom: 30
  },
  warningHead: {
    fontSize: 13,
    ...fonts.bold
  },
  warningLabel: {
    fontSize: 13
  },
  startWrap: {
  },
  startBtn: {
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderImg: {
    height: 13,
    width: 13
  }
});
