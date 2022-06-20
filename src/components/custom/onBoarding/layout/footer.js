import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../generic';
import { colors, tr, appStyles } from '../../../../config';
import styles from './styles';

const Footer = ({
  stepNumber,
  nextCb,
  backCb,
  translations,
  totalSteps
}) => (
  <View style={styles.footerWrap}>
    <View style={styles.footerSec1}>
      <Text style={styles.stepsTxt}>{`${stepNumber}/${totalSteps}`}</Text>
    </View>
    <View style={styles.footerSec2}>
      <Button
        onPress={() => { backCb(); }}
        text={tr(translations, 'back', 'Back')}
        theme="gray"
      />
      <Button
        onPress={() => { nextCb(); }}
        text={stepNumber === 11
          ? tr(translations, 'next', 'Finish')
          : tr(translations, 'next', 'Next')}
        theme="app"
        style={{ ...appStyles.mgL(10) }}
      />
    </View>
  </View>
);

Footer.propTypes = {
  nextCb: PropTypes.func.isRequired,
  backCb: PropTypes.func.isRequired,
  stepNumber: PropTypes.number.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired,
  totalSteps: PropTypes.number.isRequired
};
export default Footer;
