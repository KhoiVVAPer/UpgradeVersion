import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { FontIcon } from '../../../generic';
import { TouchableDebounce } from '../../../elements';
import {
  colors,
  icons,
  appConstants,
  tr
} from '../../../../../config';
import styles from './styles';

const { resetAllFilter, textCasing } = appConstants;

const SelectedFilter = ({
  selectedFiltersArr,
  filtersArr,
  resetFilter,
  translations,
  status,
  selectedFiltersIndex
}) => (
  <View>
    {
      status === 'productFinder' ? (
        <View style={styles.selectedFilterWrap}>


          {
            selectedFiltersArr.Answer && selectedFiltersArr.Answer.map((item, index) => {
              const TranslationIdCheckingApi = item.Translation_ID;
              const TranslationUnitCheckingApi = selectedFiltersArr.Unit.Translation_ID && selectedFiltersArr.Unit.Translation_ID;
              console.log('in selected filter map====>', item);
              if (selectedFiltersArr.QuestionNode !== 'ProductGroup' && item.value !== 'Yes' && item.value !== 'No') {
                return (
                  <View
                    style={[styles.selectedFilterItem, { backgroundColor: colors.explainationColor }]}
                    key={item.Translation_ID}
                  // key={`filter-item-${item.key}`}
                  >
                    <View style={styles.selectedFilterItemSec1}>
                      {/* <Text style={[styles.selectedFilterTxt,{fontSize:12}]}>{ `${item.value}` }</Text> */}
                      <Text style={[styles.selectedFilterTxt, { fontSize: 12, color: colors.black }]}>
                        {tr(translations, TranslationIdCheckingApi, item.value, 'upper')}
                        {' '}
                        {tr(translations, TranslationUnitCheckingApi, selectedFiltersArr.Unit.Name, 'upper')}
                      </Text>

                    </View>
                    <FontIcon
                      type={icons.closeIon[1]}
                      icon={icons.closeIon[0]}
                      size={16}
                      color={colors.black}
                      wrapStyle={[styles.closeWrap, { backgroundColor: colors.explainationColor }]}
                      onPress={() => {
                        resetFilter({
                          item, index, selectedFiltersArr, selectedFiltersIndex
                        });
                      }}
                    />
                  </View>
                );
              }
              return false;
            })
          }
        </View>
      )
        : (
          <View style={styles.selectedFilterWrap}>
            <TouchableDebounce
              style={styles.selectedFilterItem}
              onPress={() => { resetFilter(resetAllFilter); }}
            >
              <Text style={styles.selectedFilterTxt}>{tr(translations, 'reset_filter', 'RESET FILTER', textCasing.U)}</Text>
            </TouchableDebounce>

            {selectedFiltersArr.map((item) => {
              const filterObj = filtersArr.find((filterItem) => (filterItem.key === item.key));
              return (
                <View
                  style={styles.selectedFilterItem}
                  key={`filter-item-${item.key}`}
                >
                  <View style={styles.selectedFilterItemSec1}>
                    <Text style={styles.selectedFilterTxt}>{`${item.initialLowValue} - ${item.initialHighValue} ${filterObj.unit}`}</Text>
                  </View>
                  <FontIcon
                    type={icons.closeIon[1]}
                    icon={icons.closeIon[0]}
                    size={16}
                    color={colors.text}
                    wrapStyle={styles.closeWrap}
                    onPress={() => { resetFilter(item.key); }}
                  />
                </View>
              );
            })}
          </View>
        )
    }

  </View>
);

SelectedFilter.propTypes = {
  selectedFiltersArr: PropTypes.arrayOf(PropTypes.any).isRequired,
  filtersArr: PropTypes.arrayOf(PropTypes.any).isRequired,
  resetFilter: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default SelectedFilter;
