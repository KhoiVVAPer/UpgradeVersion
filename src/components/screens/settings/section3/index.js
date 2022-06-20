/**
 * @fileoverview This is settings screen section-3 component.
 * @package
 */
import React from 'react';
import { View } from 'react-native';
import styles from '../styles';
import Card1 from './card1';
import Card2 from './card2';

export default ({
  translations,
  saveUniversalData,
  universal
}) => (
  <View style={styles.section3}>
    <Card1
      translations={translations}
      saveUniversalData={saveUniversalData}
      universal={universal}
    />
    <Card2 translations={translations} />
  </View>
);
