import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const EmptyList = ({ text }) => (
  <View style={styles.wrap}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

EmptyList.propTypes = {
  text: PropTypes.string
};

EmptyList.defaultProps = {
  text: 'No data available'
};

export default EmptyList;
