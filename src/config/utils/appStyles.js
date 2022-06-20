import * as colors from './colors';
import fonts from './fonts';

export default {
  h1_headFontSize: { fontSize: 30 },
  h2_headFontSize: { fontSize: 25 },
  h3_headFontSize: { fontSize: 20 },
  headFontSize: { fontSize: 14 },
  headFontSizeMedium: { fontSize: 13 },
  headFontSizeMini: { fontSize: 12 },
  contentFontSize: { fontSize: 10 },
  contentFontSizeSmall: { fontSize: 9 },
  appHorizontalPadding: { paddingHorizontal: 40 },
  appHorizontalMargin: { marginHorizontal: 40 },

  defaultText: {
    color: colors.text,
    ...fonts.default,
    fontSize: 9
  },

  // Margins
  mgH10: { marginHorizontal: 10 },
  mgR10: { marginRight: 10 },
  mgL10: { marginLeft: 10 },
  mgB20: { marginBottom: 20 },

  mgL: (px) => ({ marginLeft: px }),
  mgR: (px) => ({ marginRight: px }),
  mgT: (px) => ({ marginTop: px }),
  mgB: (px) => ({ marginBottom: px }),
  mgV: (px) => ({ marginVertical: px }),
  mgH: (px) => ({ marginHorizontal: px }),
  padL: (px) => ({ paddingLeft: px }),
  padR: (px) => ({ paddingRight: px }),
  padT: (px) => ({ paddingTop: px }),
  padB: (px) => ({ paddingBottom: px }),
  padV: (px) => ({ paddingVertical: px }),
  padH: (px) => ({ paddingHorizontal: px }),
  w: (px) => ({ width: px }),
  h: (px) => ({ height: px }),
  lH: (px) => ({ lineHeight: px }),

  h1: { fontSize: 30, ...fonts.banner },
  h2: { fontSize: 22, ...fonts.banner },
  h3: { fontSize: 17, ...fonts.bold },
  h4: { fontSize: 15, ...fonts.medium },
  h5: { fontSize: 12, ...fonts.medium },
  h6: { fontSize: 10, ...fonts.medium },
};
