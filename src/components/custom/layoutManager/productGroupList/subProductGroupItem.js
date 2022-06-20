/**
 * @fileoverview This component renders design template
 * for sub product product group list item.
 * @package
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableDebounce } from '../../elements';
import { HtmlParser, FontIcon } from '../../generic';
import { colors, icons, appStyles } from '../../../../config';
import styles from './styles';

const SubProductGroupItem = ({
  navigate,
  subProductGroup,
  textKey
}) => (
  <TouchableDebounce
    onPress={() => navigate(subProductGroup.id)}
    style={styles.subProductGroupItem}
  >
    <FontIcon
      type={icons.arrowForward[1]}
      icon={icons.arrowForward[0]}
      color={colors.text}
      size={15}
      wrapStyle={{ ...appStyles.mgR(5) }}
    />
    <HtmlParser
      html={`${subProductGroup.title}`}
      textKey={textKey}
      style={styles.subProductGroupTxt}
      onPress={() => navigate(subProductGroup.id)}
    />
  </TouchableDebounce>
);

SubProductGroupItem.propTypes = {
  navigate: PropTypes.func.isRequired,
  subProductGroup: PropTypes.objectOf(PropTypes.any).isRequired,
  textKey: PropTypes.string.isRequired
};
export default SubProductGroupItem;
