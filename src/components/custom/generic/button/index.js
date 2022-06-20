/**
 * @fileoverview This is genric button component for app.
 * Button contains four themes: default, light, app, dark
 * App should render buttons from this component
 * @package
 */
import React from 'react';
import { Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import TouchableDebounce from '../../elements/touchableDebounce';
import { images } from '../../../../config';
import styles from './styles';

// This is generic button component
const Button = (props) => {
  const {
    text,
    onPress,
    theme,
    style,
    txtStyle,
    loading,
    shadow,
    transparent,
    isBtnDisabled
  } = props;

  const activeTheme = theme || 'default';

  const stylesCombo = {
    default: {
      btn: styles.default,
      btnTxt: styles.defaultTxt
    },
    light: {
      btn: styles.light,
      btnTxt: styles.lightTxt
    },
    app: {
      btn: styles.app,
      btnTxt: styles.appTxt
    },
    dark: {
      btn: styles.dark,
      btnTxt: styles.darkTxt
    },
    gray: {
      btn: styles.gray,
      btnTxt: styles.grayTxt
    },
    white: {
      btn: styles.white,
      btnTxt: styles.whiteTxt
    },
  };

  const shadowStyle = shadow ? styles.btnShadow : {};
  return (
    <TouchableDebounce
      onPress={() => { if (!loading) onPress(); }}
      style={[
        styles.btn,
        stylesCombo[activeTheme].btn,
        shadowStyle,
        style || {},
        transparent ? { backgroundColor: 'transparent', borderWidth: 0 } : {}
      ]}
      disabled={isBtnDisabled}
    >
      {
        loading ? (
          <Image
            source={images.loader}
            resizeMode="contain"
            style={styles.loaderImg}
          />
        ) : (
          <Text
            style={[
              styles.btnTxt,
              stylesCombo[activeTheme].btnTxt,
              txtStyle || {},
              transparent ? { color: 'transparent' } : {},
              { opacity: isBtnDisabled ? 0.5 : 1 }
            ]}
          >
            {text}
          </Text>
        )
      }
    </TouchableDebounce>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  theme: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  txtStyle: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  shadow: PropTypes.bool,
  transparent: PropTypes.bool,
  isBtnDisabled: PropTypes.bool
};

Button.defaultProps = {
  onPress: () => { },
  theme: 'default',
  style: {},
  txtStyle: {},
  loading: false,
  shadow: false,
  transparent: false,
  isBtnDisabled: false
};

export default Button;
