import { StyleSheet } from 'react-native';
import { fonts, appStyles } from '../../../config';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  step1_OnboardingWrap: {
    flex: 1,
    backgroundColor: '#0000006b',
    alignItems: 'center',
    justifyContent: 'center'
  },
  step1_OnboardingInner: {
    width: 400,
    padding: 25,
    backgroundColor: '#fff'
  },
  step1_OnboardingFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  onboardingHead: {
    ...fonts.bold,
    ...appStyles.headFontSize,
    lineHeight: 18,
    marginBottom: 15
  },
  onboardingContent: {
    ...appStyles.headFontSizeMedium,
    marginBottom: 20
  },
  onboardingLogoWrap: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  onboardingLogo: {
    width: 100,
    height: 35
  },
  moveTopWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingVertical: 25
  }
});
