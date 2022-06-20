/**
 * @fileoverview This component renders design template
 * for prodict list.
 * @package
 */
import React, { Component } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import {
  helpers, appContexts, appConstants
} from '../../../../config';
import styles from './styles';
import ErrorView from '../../generic/errorView';
import Loading from '../../generic/loading';
import ListItem from './listItem';
import Filter from './filter';
import CheckBoxItem from './filter/checkBoxItem';
import HeadlineText from '../headlineText';
import { TouchableDebounce } from '../../elements';

const { PageContentContext } = appContexts;
const { favouriteTypes, filterTypes } = appConstants;

class ProductGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      productList: [],
      productGroupData: {},
      filterArr: [],
      checkboxGroupObj: {},
      selectedCheckboxGroup: {},
      checkboxGroupStyle: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    };
    this.filterRef = null;
  }

  async componentDidMount() {
    const { layoutData } = this.props;
    const { getProductListData } = this.context;

    const productList = await getProductListData();

    const layoutId = layoutData.productgroupId;

    if (layoutData && layoutId) {
      if (!productList[layoutId]
        || productList[layoutId].loading
        || productList[layoutId].error) {
        this.reloadPage();
      } else {
        const productListArr = productList[layoutId].obj
          && productList[layoutId].obj.data
          ? productList[layoutId].obj.data : [];
        this.setState({
          loading: false,
          productList: productListArr,
          productGroupData: JSON.parse(productList[layoutId].obj.productGroupData)
        });
      }
    }
  }

  setFilterRef = (ref) => {
    this.filterRef = ref;
  }

  reloadPage = () => {
    const { layoutData } = this.props;
    const { getProductList } = this.context;
    const layoutId = layoutData.productgroupId;

    this.setState({
      loading: true
    }, async () => {
      try {
        const res = await getProductList(layoutId);
        this.setState({
          productList: res.data,
          productGroupData: JSON.parse(res.productGroupData),
          loading: false,
          error: false
        });
      } catch (err) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  }

  renderItem = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, margin: 10 }} />;
    const { pageId } = this.context;

    return (
      <ListItem
        productData={item}
        textKey={`productList-${pageId}-${index}-${item.id}`}
      />
    );
  }

  renderRibbon = (productListArr) => {
    const { productGroupData } = this.state;
    const { layoutData } = this.props;

    if (!layoutData.ribbon) return false;

    if (!productGroupData || helpers.isEmptyObject(productGroupData)) return null;

    const ribbonData = productGroupData;

    if (!ribbonData) return null;
    const headline = ribbonData.name;
    let text = '';
    const ribbonTxt = ribbonData.texts.find((item) => (item.type === 'header'));
    if (ribbonTxt) {
      if (ribbonTxt.headline) {
        text += `<strong>${ribbonTxt.headline}</strong> `;
      }
      text += ribbonTxt.text;
    }

    return (
      <HeadlineText
        layoutData={{
          values: [{
            headline,
            text
          }],
          ribbonButtonTarget: layoutData.ribbonButtonTarget
        }}
        favType={favouriteTypes.PRODUCT_LIST}
        productListArr={productListArr}
        isExport
      />
    );
  }

  openCheckBoxGroup = (positionObj, checkboxGroupObj, selectedCheckboxGroup) => {
    this.setState({
      checkboxGroupStyle: { ...positionObj },
      checkboxGroupObj,
      selectedCheckboxGroup
    });
  }

  renderCheckboxGroup = () => {
    const { checkboxGroupStyle, checkboxGroupObj, selectedCheckboxGroup } = this.state;
    const { pageId } = this.context;

    if (helpers.isEmptyObject(checkboxGroupObj)) return null;

    return (
      <TouchableDebounce
        style={styles.checkboxGroupOverlay}
        onPress={() => {
          this.setState({
            checkboxGroupObj: {},
            selectedCheckboxGroup: {}
          });
          this.filterRef.toggleCheckBoxGroup();
        }}
      >
        <ScrollView
          style={[
            styles.checkboxGroupOverlayList,
            {
              top: checkboxGroupStyle.top - (Platform.OS === 'ios' ? 83 : 60),
              left: checkboxGroupStyle.left,
              width: checkboxGroupStyle.width
            }
          ]}
          contentContainerStyle={{}}
          nestedScrollEnabled
        >
          {checkboxGroupObj.filter.map((item) => (
            <CheckBoxItem
              key={`filter-checkbox-${pageId}-${item.key}`}
              filterData={item}
              isSelected={helpers.isEmptyObject(selectedCheckboxGroup) ? true : selectedCheckboxGroup[item.key]}
              selectCheckboxFilter={this.selectCheckboxFilter}
              order="reverse"
            />
          ))}
        </ScrollView>
      </TouchableDebounce>
    );
  }

  selectCheckboxFilter = (key) => {
    const { selectedCheckboxGroup } = this.state;
    const flag = selectedCheckboxGroup[key];
    this.setState({
      selectedCheckboxGroup: { ...selectedCheckboxGroup, [key]: !flag }
    });
    if (this.filterRef) {
      this.filterRef.selectCheckboxFilter(key);
    }
  }

  setFilter = (arr) => {
    const arrNew = arr.filter((item) => (item.type !== filterTypes.CHECKBOX_GROUP));
    const filterArr = arrNew.map((item) => {
      const obj = {
        ...item,
        key: item.key.split('.')[1] || item.key.split('.')[0]
      };
      return obj;
    });
    this.setState({ filterArr });
  }

  render() {
    const {
      loading,
      error,
      productList,
      filterArr
    } = this.state;
    const { layoutData } = this.props;

    const selectedFilters = filterArr.filter((item) => (item.key !== 'price'));

    if (loading) return <Loading />;
    if (error) return <ErrorView reloadPage={this.reloadPage} />;

    const productListArr = productList.filter((productItem) => {
      let flag = true;

      if (selectedFilters.length && !productItem.filterValues) {
        flag = false;
      }

      let productFilter = [];
      if (productItem.filterValues) {
        if (typeof productItem.filterValues === 'string') {
          productFilter = JSON.parse(productItem.filterValues);
        } else {
          productFilter = productItem.filterValues;
        }
      }

      if (flag) {
        for (let i = 0; i < filterArr.length; i += 1) {
          const filterItem = filterArr[i];

          if (filterItem.key === 'price') {
            if (productItem.price) {
              const price = parseFloat(productItem.price);
              flag = (price >= filterItem.min && price <= filterItem.max);
            } else {
              flag = false;
            }
          } else if (!Array.isArray(productFilter)) {
            if (filterItem.type === filterTypes.SLIDER) {
              if (!productFilter[filterItem.key]) {
                flag = false;
              } else {
                flag = (productFilter[filterItem.key] >= filterItem.min && productFilter[filterItem.key] <= filterItem.max);
              }
            } else if (filterItem.type === filterTypes.CHECKBOX) {
              if (!productFilter[filterItem.key]) {
                flag = false;
              }
            }
          }
          if (!flag) break;
        }
      }
      return filterArr.length === 0 ? true : flag;
    });

    const arrMod = productListArr.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      productListArr.push({});
    }

    return (
      <View>
        {this.renderRibbon(productListArr)}
        <View style={styles.wrap}>
          <Filter
            layoutData={layoutData}
            setFilter={this.setFilter}
            openCheckBoxGroup={this.openCheckBoxGroup}
            setFilterRef={this.setFilterRef}
          />
          <View style={styles.wrapContent}>
            <FlatList
              extraData={this.state}
              data={productListArr}
              renderItem={this.renderItem}
              contentContainerStyle={styles.listItemContainer}
              columnWrapperStyle={styles.listItemColContainer}
              keyExtractor={(item) => `group_${item.id}`}
              scrollEnabled={false}
              numColumns={4}
            />
          </View>
        </View>
        {this.renderCheckboxGroup()}
      </View>
    );
  }
}

ProductGroup.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
};
ProductGroup.contextType = PageContentContext;
export default ProductGroup;
