import React from 'react';
import { View } from 'react-native';
import { colors, icons } from '../../../config';
import { FontIcon, HtmlParser, TouchableDebounce } from '../../custom';
import styles from './styles';

export default ({
  heading,
  iconType,
  icon,
  isImprint,
  isPrivacyPolicy,
  callback
}) => (
  <View style={styles.cardHead}>
    <FontIcon
      type={iconType}
      icon={icon}
      color={colors.text}
      size={13}
    />
    <View style={styles.cardHeadContent}>
      <HtmlParser
        style={styles.cardHeadTxt}
        html={heading}
        textKey={`settings-cardHead-${heading}`}
      />
      {!isImprint && !isPrivacyPolicy ? null : (
        <TouchableDebounce onPress={callback} style={styles.cardHeadEyeIco}>
          <FontIcon
            type={icons.view[1]}
            icon={icons.view[0]}
            color={colors.text}
            size={20}
          />
        </TouchableDebounce>
      )}
    </View>
  </View>
);
