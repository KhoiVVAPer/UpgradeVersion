/* eslint-disable max-len */
import React from 'react';
import {
  View,
  Text,
  Image,
  Modal
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, HtmlParser } from '../../custom';
import { images, tr } from '../../../config';
import styles from './styles';

const OnBoardingModal = ({
  skipStartPageOnboarding,
  nextStartPageOnboarding,
  translations
}) => (
  <Modal
    transparent
    visible
    onRequestClose={() => { }}
  >
    <View style={styles.step1_OnboardingWrap}>
      <View style={styles.step1_OnboardingInner}>
        <View style={styles.onboardingLogoWrap}>
          <Image
            source={images.logo}
            style={styles.onboardingLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.onboardingHead}>{tr(translations, 'onboarding_root_heading', 'Willkommen im Kärcher Programm')}</Text>
        <HtmlParser
          html={tr(translations, 'onboarding_root_description', 'Lernen Sie die wichtigsten Funktionen im Kärcher Programm kennen.')}
          textKey="onboarding-content-root"
          style={styles.onboardingContent}
        />
        <View style={styles.step1_OnboardingFooter}>
          <Button
            onPress={() => { skipStartPageOnboarding(); }}
            text={tr(translations, 'skip', 'Skip')}
            theme="gray"
          />
          <Button
            onPress={() => { nextStartPageOnboarding(); }}
            text={tr(translations, 'next', 'Next')}
            theme="app"
            style={{ marginLeft: 15 }}
          />
        </View>
      </View>
    </View>
  </Modal>
);

OnBoardingModal.propTypes = {
  skipStartPageOnboarding: PropTypes.func.isRequired,
  nextStartPageOnboarding: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default OnBoardingModal;
