/**
 * @fileoverview This is genric font icon component for app.
 * This is wrapper component on top of react-native-vector-icons
 * @package
 */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
import { colors } from '../../../../config';
import TouchableDebounce from '../../elements/touchableDebounce';

const CustomFont = createIconSetFromFontello(fontelloConfig);

const FontWrap = (props) => {
  const {
    wrapStyle, innerWrapStyle, onPress, children, delayDuration
  } = props;
  if (onPress) {
    return (
      <TouchableDebounce
        style={wrapStyle}
        onPress={onPress}
        delayDuration={delayDuration}
      >
        <View style={innerWrapStyle}>
          {children}
        </View>
      </TouchableDebounce>
    );
  }
  return (
    <View style={wrapStyle}>
      {children}
    </View>
  );
};

const renderIcons = ({
  icon, type, style, size, color
}) => {
  switch (type) {
    case 'Entypo':
      return <Entypo name={icon} style={style} size={size} color={color} />;
    case 'EvilIcons':
      return <EvilIcons name={icon} style={style} size={size} color={color} />;
    case 'Feather':
      return <Feather name={icon} style={style} size={size} color={color} />;
    case 'Foundation':
      return <Foundation name={icon} style={style} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={icon} style={style} size={size} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons name={icon} style={style} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={icon} style={style} size={size} color={color} />;
    case 'Octicons':
      return <Octicons name={icon} style={style} size={size} color={color} />;
    case 'Zocial':
      return <Zocial name={icon} style={style} size={size} color={color} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={icon} style={style} size={size} color={color} />;
    case 'Custom':
      return <CustomFont name={icon} style={style} size={size} color={color} />;
    case 'FontAwesome':
    default:
      return <FontAwesome name={icon} style={style} size={size} color={color} />;
  }
};

const FontIcon = ({
  icon,
  type,
  wrapStyle = {},
  innerWrapStyle = {},
  style = {},
  size = 20,
  color = colors.primaryColor,
  onPress,
  delayDuration
}) => (
  <FontWrap
    wrapStyle={wrapStyle}
    onPress={onPress}
    innerWrapStyle={innerWrapStyle}
    delayDuration={delayDuration}
  >
    {renderIcons({
      icon, type, style, size, color
    })}
  </FontWrap>
);

FontIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  wrapStyle: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  innerWrapStyle: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func,
  delayDuration: PropTypes.number,
};

FontIcon.defaultProps = {
  wrapStyle: {},
  innerWrapStyle: {},
  style: {},
  size: 20,
  color: colors.primaryColor,
  onPress: undefined,
  delayDuration: 0
};

export default FontIcon;
