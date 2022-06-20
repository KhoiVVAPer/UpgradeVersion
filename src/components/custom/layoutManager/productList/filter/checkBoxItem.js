import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableDebounce } from '../../../elements';
import { FontIcon } from '../../../generic';
import { colors, icons, tr } from '../../../../../config';
import styles from './styles';

const CheckBoxItem = ({
  filterData,
  selectCheckboxFilter,
  isSelected,
  order,
  Component,
  TranslationIdCheckingApi,
  translations,
  disabled
}) => (
  <TouchableDebounce
    onPress={() => { selectCheckboxFilter(filterData.key); }}
    disabled={disabled}
    style={[styles.checkboxItem, { paddingVertical: Component === 'ProductFinder' ? 5 : 10 }]}
  >
    {
      order === 'reverse'
        ? (
          <FontIcon
            type={isSelected ? icons.checkbox[1] : icons.checkboxEmpty[1]}
            icon={isSelected ? icons.checkbox[0] : icons.checkboxEmpty[0]}
            size={18}
            color={disabled ? colors.blur : colors.text}
          />
        ) : null
    }
    <Text style={[styles.checkboxTxt, { fontSize: Component === 'ProductFinder' ? 13.5 : 9, color: disabled ? colors.blur : colors.black }]}>{Component === 'ProductFinder' ? tr(translations, TranslationIdCheckingApi, filterData.value, 'upper') : filterData.label}</Text>
    {
      order === 'forward'
        ? (
          <FontIcon
            type={isSelected ? icons.checkbox[1] : icons.checkboxEmpty[1]}
            icon={isSelected ? icons.checkbox[0] : icons.checkboxEmpty[0]}
            size={18}
            color={colors.text}
          />
        ) : null
    }
  </TouchableDebounce >
);

CheckBoxItem.propTypes = {
  filterData: PropTypes.objectOf(PropTypes.any).isRequired,
  selectCheckboxFilter: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  order: PropTypes.string
};
CheckBoxItem.defaultProps = {
  order: 'forward'
};

export default CheckBoxItem;
