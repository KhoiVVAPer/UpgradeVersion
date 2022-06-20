/**
 * @fileoverview This component is used to handle tap events
 * on react-native Text component
 * @package
 */
import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { helpers } from '../../../../config';

const TextDebounce = (props) => {
  const { onPress, children, delayDuration } = props;
  return (
    <Text
      {...props}
      onPress={helpers.debounce(() => {
        onPress();
      }, delayDuration)}
    >
      {children}
    </Text>
  );
};

TextDebounce.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any)
  ]).isRequired,
  delayDuration: PropTypes.number,
};

TextDebounce.defaultProps = {
  onPress: () => { },
  delayDuration: 0
};

export default TextDebounce;
