import React, { Component } from 'react';
import {
  View,
  Text,
  UIManager,
  findNodeHandle
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableDebounce } from '../../../elements';
import { FontIcon } from '../../../generic';
import {
  icons,
  colors,
  appConstants,
  appContexts,
  helpers,
  tr
} from '../../../../../config';
import RangeItem from './rangeItem';
import CheckBoxItem from './checkBoxItem';
import SelectedFilter from './selectedFilter';
import styles from './styles';

const { PageContentContext } = appContexts;
const { filterTypes, resetAllFilter } = appConstants;

class FilterWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      filtersArr: [],
      checkboxGroupObj: {},
      checkboxArr: [],
      selectedFiltersArr: [],
      selectedCheckboxGroup: {},
      commonFilter: [],
      isCheckboxGroupExpanded: false
    };
    this.rangeSliderRef = {};
    this.checkboxGroupRef = null;
    this.resetFilterKey = [];
    this.selectedFiltersArrNew = [];
  }

  componentDidMount() {
    const { layoutData, setFilterRef } = this.props;

    setFilterRef(this);

    const filtersArr = layoutData.filter;
    if (layoutData.filter) {
      const checkboxGroupObj = filtersArr.filter((item) => (item.type === filterTypes.CHECKBOX_GROUP));
      const checkboxArr = filtersArr.filter((item) => (item.type === filterTypes.CHECKBOX));
      const selectedCheckboxGroup = {};

      if (checkboxGroupObj[0]) {
        checkboxGroupObj[0].filter.map((item) => {
          selectedCheckboxGroup[item.key] = false;
          return null;
        });
      }

      checkboxArr.map((item) => {
        selectedCheckboxGroup[item.key] = false;
        return null;
      });

      this.setState({
        filtersArr,
        commonFilter: [],
        checkboxArr,
        selectedFiltersArr: [],
        checkboxGroupObj: checkboxGroupObj[0] || {},
        selectedCheckboxGroup
      });
    }
  }

  setRangeRef = (key, ref) => {
    this.rangeSliderRef[key] = ref;
  }

  selectFilter = (key) => {
    this.resetFilterClose(key);
  }

  filterValue = (initialLowValue, initialHighValue, key, unit) => {
    const { setFilter } = this.props;
    const { selectedFiltersArr, commonFilter, filtersArr } = this.state;

    const selectedFilterObj = filtersArr.find((filterItem) => (filterItem.key === key));

    let isCommonAdded = false;
    const commonFilterNew = commonFilter.map((item) => {
      let obj = item;
      if (item.key === key) {
        isCommonAdded = true;
        obj = {
          ...obj,
          min: initialLowValue,
          max: initialHighValue
        };
      }
      return obj;
    });
    if (!isCommonAdded) {
      commonFilterNew.push({
        ...selectedFilterObj,
        min: initialLowValue,
        max: initialHighValue
      });
    }

    let isFilterAdded = false;
    const arr = selectedFiltersArr.map((item) => {
      let obj = {};
      if (key === item.key) {
        isFilterAdded = true;
        obj = {
          initialLowValue,
          initialHighValue,
          key,
          unit
        };
      } else {
        obj = item;
      }
      return obj;
    });
    if (!isFilterAdded) {
      arr.push({
        initialLowValue,
        initialHighValue,
        key,
        unit
      });
    }

    this.setState({
      selectedFiltersArr: arr,
      commonFilter: commonFilterNew
    }, () => {
      this.resetFilterClose(key);
    });
    setFilter(commonFilterNew);
  }

  renderRange = () => {
    const { filtersArr, selectedFiltersArr } = this.state;
    const { pageId } = this.context;
    const viewArr = [];
    const arr = filtersArr.filter((item) => (item.type === filterTypes.SLIDER));
    arr.map((item) => {
      const selectedFilterObj = selectedFiltersArr.find((filterItem) => (filterItem.key === item.key));
      viewArr.push((
        <RangeItem
          key={`filter-${pageId}-range-${item.key}`}
          filterData={item}
          initialLowValue={selectedFilterObj ? selectedFilterObj.initialLowValue : item.min}
          initialHighValue={selectedFilterObj ? selectedFilterObj.initialHighValue : item.max}
          selectFilter={this.selectFilter}
          filterValue={this.filterValue}
          setRangeRef={this.setRangeRef}
        />
      ));
      return null;
    });
    return viewArr;
  }

  selectCheckboxFilter = (key) => {
    const { setFilter } = this.props;
    const {
      selectedCheckboxGroup,
      commonFilter,
      filtersArr,
      checkboxGroupObj
    } = this.state;

    const flag = selectedCheckboxGroup[key];

    let commonFilterNew = [];
    if (flag) {
      commonFilterNew = commonFilter.filter((item) => {
        let isAdded = true;
        if (item.key === key) {
          isAdded = false;
        }
        return isAdded;
      });
    } else {
      let filterObj = filtersArr.find((filterItem) => (filterItem.key === key));
      if (!filterObj) {
        filterObj = checkboxGroupObj.filter.find((filterItem) => (filterItem.key === key));
      }
      commonFilterNew = [...commonFilter, filterObj];
    }

    this.setState({
      selectedCheckboxGroup: { ...selectedCheckboxGroup, [key]: !flag },
      commonFilter: commonFilterNew
    });
    setFilter(commonFilterNew);
  }

  renderCheckbox = (arr, offset) => {
    const { selectedCheckboxGroup } = this.state;
    const { pageId } = this.context;

    return (
      <View
        style={styles.checkboxWrapper}
        key={`filter-checkbox-${pageId}-${offset}`}
      >
        <View style={styles.checkboxWrapperInner}>
          {
            arr.map((item) => (
              <CheckBoxItem
                key={`filter-checkbox-${pageId}-${item.key}`}
                filterData={item}
                isSelected={helpers.isEmptyObject(selectedCheckboxGroup) ? false : selectedCheckboxGroup[item.key]}
                selectCheckboxFilter={this.selectCheckboxFilter}
              />
            ))
          }
        </View>
      </View>
    );
  }

  openCheckBoxGroup = () => {
    const { getScrollY } = this.context;
    const { checkboxGroupObj, selectedCheckboxGroup } = this.state;
    const { openCheckBoxGroup } = this.props;

    this.setState({ isCheckboxGroupExpanded: true });

    const scrollY = getScrollY();
    UIManager.measure(findNodeHandle(this.checkboxGroupRef), (x, y, width, height, pageX, pageY) => {
      const positionObj = {
        top: pageY + scrollY,
        left: pageX,
        width,
        height
      };
      openCheckBoxGroup(positionObj, checkboxGroupObj, selectedCheckboxGroup);
    });
  }

  toggleCheckBoxGroup = () => {
    const { isCheckboxGroupExpanded } = this.state;
    this.setState({
      isCheckboxGroupExpanded: !isCheckboxGroupExpanded
    });
  }

  renderCheckBoxGroup = () => {
    const { checkboxGroupObj, isCheckboxGroupExpanded } = this.state;

    if (helpers.isEmptyObject(checkboxGroupObj)) return null;
    return (
      <TouchableDebounce
        style={styles.checkboxGroupWrapper}
        onPress={() => { this.openCheckBoxGroup(); }}
      >
        <View
          style={styles.checkboxGroupWrapperInner}
          removeClippedSubviews={false}
          ref={(ref) => { this.checkboxGroupRef = ref; }}
        >
          <Text>{checkboxGroupObj.label}</Text>
          <FontIcon
            type={isCheckboxGroupExpanded ? icons.upArrowIon[1] : icons.downArrowIon[1]}
            icon={isCheckboxGroupExpanded ? icons.upArrowIon[0] : icons.downArrowIon[0]}
            size={16}
            color={colors.text}
          />
        </View>
      </TouchableDebounce>
    );
  }

  renderSelectedFilterLabel = () => {
    const { selectedFiltersArr, filtersArr } = this.state;
    const { translations } = this.context;

    if (!selectedFiltersArr.length) return null;

    return (
      <SelectedFilter
        selectedFiltersArr={selectedFiltersArr}
        filtersArr={filtersArr}
        translations={translations}
        resetFilter={this.resetFilter}
      />
    );
  }

  resetFilter = (key) => {
    const { selectedFiltersArr, filtersArr } = this.state;

    this.selectedFiltersArrNew = selectedFiltersArr.filter((item) => {
      const flag = [item.key, resetAllFilter].includes(key);
      this.resetFilterKey = flag ? [...this.resetFilterKey, item.key] : this.resetFilterKey;
      return !flag;
    });

    selectedFiltersArr.map((item) => {
      if (item.key === key || key === resetAllFilter) {
        const filterObj = filtersArr.find((filterItem) => (filterItem.key === item.key));
        this.rangeSliderRef[item.key].setLowValue(filterObj.min);
        this.rangeSliderRef[item.key].setHighValue(filterObj.max);
        if (filterObj.min === item.initialLowValue && filterObj.max === item.initialHighValue) {
          this.resetFilterClose(item.key);
        }
      }
      return null;
    });
  }

  resetFilterClose = (key) => {
    if (this.resetFilterKey.includes(key)) {
      this.resetFilterKey = this.resetFilterKey.filter((item) => (item !== key));
      this.setState({
        selectedFiltersArr: this.selectedFiltersArrNew
      });
      if (this.resetFilterKey.length === 0) this.selectedFiltersArrNew = [];
    }
  }

  render() {
    const {
      isCollapsed,
      checkboxArr,
      filtersArr
    } = this.state;
    const { translations } = this.context;
    const chunk = 2;

    if (filtersArr.length === 0) return null;

    const checkboxChunks = [];
    for (let i = 0; i < checkboxArr.length; i += chunk) {
      checkboxChunks.push(checkboxArr.slice(i, i + chunk));
    }
    return (
      <View>
        <View style={styles.wrap}>
          <TouchableDebounce
            onPress={() => { this.setState({ isCollapsed: !isCollapsed }); }}
            style={styles.headWrap}
          >
            <Text style={styles.head}>{tr(translations, 'filter', 'Filter')}</Text>
            <FontIcon
              type={isCollapsed ? icons.downArrowIon[1] : icons.upArrowIon[1]}
              icon={isCollapsed ? icons.downArrowIon[0] : icons.upArrowIon[0]}
              size={20}
              color={colors.text}
            />
          </TouchableDebounce>
          {
            !isCollapsed ? (
              <View style={[styles.wrapInner, { display: isCollapsed ? 'none' : 'flex' }]}>
                {this.renderRange()}
                {checkboxChunks.map((item, index) => (this.renderCheckbox(item, index)))}
                {/* {checkboxGroupChunks.map((item, index) => (this.renderCheckbox(item, index)))} */}
                {this.renderCheckBoxGroup()}
              </View>
            ) : null
          }
        </View>
        {this.renderSelectedFilterLabel()}
      </View>
    );
  }
}

FilterWrap.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
  setFilterRef: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  openCheckBoxGroup: PropTypes.func.isRequired
};

FilterWrap.contextType = PageContentContext;
export default FilterWrap;
