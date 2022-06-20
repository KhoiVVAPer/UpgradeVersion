import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { HtmlParser } from '..';
import styles from './styles';

const sectionSubHeader = ({
  heading, capitalize, fade, marking, textKey
}) => {
  const headingText = capitalize ? heading.toLocaleUpperCase() : heading;
  return (
    <View style={styles.sectionSubHead}>
      {
        !marking
          ? (
            <Text style={fade ? styles.sectionSubHeadTxtFade : styles.sectionSubHeadTxt}>{headingText}</Text>
          )
          : (
            <HtmlParser
              html={headingText}
              textKey={textKey}
              style={fade ? styles.sectionSubHeadTxtFade : styles.sectionSubHeadTxt}
            />
          )
      }

    </View>
  );
};

sectionSubHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  capitalize: PropTypes.bool,
  fade: PropTypes.bool,
  marking: PropTypes.bool,
  textKey: PropTypes.string
};

sectionSubHeader.defaultProps = {
  capitalize: false,
  fade: false,
  marking: false,
  textKey: ''
};

export default sectionSubHeader;
