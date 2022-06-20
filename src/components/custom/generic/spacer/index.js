import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Spacer = ({ space }) => <View style={[styles.wrap, { height: space }]} />;

Spacer.propTypes = {
  space: PropTypes.number
};

Spacer.defaultProps = {
  space: 20
};

export default Spacer;
