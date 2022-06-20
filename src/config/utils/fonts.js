/**
 * @fileoverview Fonts used for application are retuned from this file
 * @package
 */
import { Platform } from 'react-native';

export default {
  default: {
    fontFamily: Platform.OS === 'ios' ? 'ClanPro-News' : 'clanpro_news'
  },
  medium: {
    fontFamily: Platform.OS === 'ios' ? 'ClanPro-Medium' : 'clanpro_medium',
    fontWeight: '500'
  },
  banner: {
    fontFamily: Platform.OS === 'ios' ? 'ClanPro-NarrBlack' : 'clanpro_narrblack',
    fontWeight: '900'
  },
  bold: {
    fontFamily: 'ClanPro-Bold',
    fontWeight: 'bold'
  },
};
