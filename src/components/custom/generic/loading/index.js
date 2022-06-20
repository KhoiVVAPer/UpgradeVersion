/**
 * @fileoverview This is genric loading component for app.
 * All loading states in app is shown from this component
 * @package
 */
import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { images, tr } from '../../../../config';
import styles from './styles';

const Loading = ({
  theme,
  transparent,
  configuring,
  translations
}) => {
  const themeStyle = {
    light: styles.light,
    dark: styles.dark,
  };
  const transparentStyle = transparent ? { backgroundColor: 'transparent' } : {};
  const tanslationData = translations && translations.arr;
  return (
    <View
      style={[
        styles.wrap,
        themeStyle[theme],
        transparentStyle
      ]}
    >
      <View style={styles.loaderWrap}>
        <Image
          source={images.loader}
          resizeMode="contain"
          style={styles.loaderImg}
        />
        <View
          style={[
            styles.configWrap,
            { display: configuring ? 'flex' : 'none' }
          ]}
        >
          <Text style={styles.configTxt}>{tr(tanslationData, 'configuration_progress')}</Text>
        </View>
      </View>
    </View>
  );
};

Loading.propTypes = {
  theme: PropTypes.string,
  transparent: PropTypes.bool,
  configuring: PropTypes.bool
};

Loading.defaultProps = {
  theme: 'light',
  transparent: false,
  configuring: false
};

export default Loading;
