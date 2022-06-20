/**
 * @fileoverview This component is used to handle tap events
 * on react-native TouchableOpacity component
 * @package
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { helpers } from '../../../../config';

class TouchableDebounce extends PureComponent {
  render() {
    const {
      onPress, children, delayDuration, disabled
    } = this.props;
    const duration = delayDuration !== undefined ? delayDuration : 0;
    return (
      <TouchableOpacity
        {...this.props}
        disabled={disabled}
        onPress={helpers.debounce(() => {
          onPress();
        }, duration)}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

TouchableDebounce.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any)
  ]).isRequired,
  delayDuration: PropTypes.number,
};

TouchableDebounce.defaultProps = {
  delayDuration: 0
};
export default TouchableDebounce;
