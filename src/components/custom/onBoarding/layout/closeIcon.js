import React from 'react';
import PropTypes from 'prop-types';
import { TouchableDebounce } from '../../elements';
import { FontIcon } from '../../generic';
import { icons, colors } from '../../../../config';
import styles from './styles';

const CloseIcon = ({ closePopup }) => (
  <TouchableDebounce
    style={styles.closeIcoWrap}
    onPress={() => { closePopup(); }}
  >
    <FontIcon
      type={icons.closeIon[1]}
      icon={icons.closeIon[0]}
      color={colors.black}
      size={18}
    />
  </TouchableDebounce>
);

CloseIcon.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default CloseIcon;
