import React from 'react';
import { View } from 'react-native';
import Card1 from './card1';
import Card2 from './card2';
import styles from '../styles';

const Settings = ({
  translations,
  saveUniversalData,
  universal,
  onboardingNextCb,
  onboardingBackCb,
  onboardingSkipCb
}) => (
  <View style={styles.section2}>
    <Card1
      translations={translations}
      saveUniversalData={saveUniversalData}
      universal={universal}
      onboardingNextCb={onboardingNextCb}
      onboardingBackCb={onboardingBackCb}
      onboardingSkipCb={onboardingSkipCb}
    />
    <Card2 translations={translations} />
  </View>
);

export default Settings;
