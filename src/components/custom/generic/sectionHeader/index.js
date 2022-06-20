import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { HtmlParser } from '..';
import styles from './styles';

const SectionHeader = ({
  heading,
  capitalize,
  marking,
  textKey
}) => {
  const headingText = capitalize ? heading.toLocaleUpperCase() : heading;
  return (
    <View style={styles.sectionHead}>
      {
        !marking
          ? (
            <Text style={styles.sectionHeadTxt}>{headingText}</Text>
          )
          : (
            <HtmlParser
              html={headingText}
              textKey={textKey}
              style={styles.sectionHeadTxt}
            />
          )
      }
    </View>
  );
};

SectionHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  capitalize: PropTypes.bool,
  marking: PropTypes.bool,
  textKey: PropTypes.string
};

SectionHeader.defaultProps = {
  capitalize: true,
  marking: false,
  textKey: ''
};

export default SectionHeader;
