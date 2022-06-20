import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import RangeSlider from 'rn-range-slider';
import { colors } from '../../../../../config';
import styles from './styles';
let lowValue; 
let highValue;
const RangeItem = ({
  filterData,
  initialLowValue,
  initialHighValue,
  selectFilter,
  filterValue,
  setRangeRef
}) => (
  <View style={styles.rangeItem}>
    <View style={styles.rangeItemInner}>
      <Text style={styles.rangeItemHead}>{`${filterData.label} (${filterData.unit})`}</Text>
      <View style={styles.rangeItemContent}>
        <RangeSlider
          ref={(ref) => { setRangeRef(filterData.key, ref); }}
          style={{ flex: 1, height: 50, paddingHorizontal: 10 }}
          gravity="center"
          min={filterData.min}
          max={filterData.max}
          initialLowValue={initialLowValue}
          initialHighValue={initialHighValue}
          step={1}
          lineWidth={7}
          handleDiameter={10}
          selectionColor={colors.primaryColor}
          blankColor={colors.darkBg}
          thumbBorderColor={colors.borderDark}
          onValueChanged={(low, high) => {
            selectFilter(low, high, filterData.key, filterData.unit);
            lowValue = low;
            highValue = high
          }}
          onTouchEnd={() => filterValue(lowValue, highValue, filterData.key, filterData.unit)}
          labelStyle="none"
        />
      </View>
      <View style={styles.rangeItemFooter}>
        <Text style={styles.rangeItemFooterTxt}>{filterData.min}</Text>
        <Text style={styles.rangeItemFooterTxt}>{filterData.max}</Text>
      </View>
    </View>
  </View>
);

RangeItem.propTypes = {
  filterData: PropTypes.objectOf(PropTypes.any).isRequired,
  initialLowValue: PropTypes.number.isRequired,
  initialHighValue: PropTypes.number.isRequired,
  selectFilter: PropTypes.func.isRequired,
  setRangeRef: PropTypes.func.isRequired
};
export default RangeItem;
