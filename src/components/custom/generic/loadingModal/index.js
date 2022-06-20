/**
 * @fileoverview This is genric loading component for app.
 * All loading states in app is shown from this component
 * @package
 */
import React from 'react';
import { View, Image, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../../../../config';
import styles from './styles';

const LoadingModal = ({ visible = false }) => (
  <Modal
    transparent
    visible={visible}
    onRequestClose={() => { }}
  >
    <View style={styles.wrap}>
      <Image
        source={images.loader}
        resizeMode="contain"
        style={styles.loaderImg}
      />
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  visible: PropTypes.bool
};

LoadingModal.defaultProps = {
  visible: false
};

export default LoadingModal;
