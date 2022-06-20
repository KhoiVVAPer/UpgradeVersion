import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { Loading } from '../../../generic';
import {
  tr,
  appContexts,
  helpers
} from '../../../../../config';
import { getProductListByRootline } from '../../../../../services';
import { getProductDetailsByRootline } from '../../../../../realm/queries';
import ContentDropdown from './contentDropdown';
import ProductList from './productList';
import styles from './styles';
import { sortStringsInAscendingOrder } from '../../../../../config/libs/helpers';

const { PageContentContext } = appContexts;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownAllArr: [],
      dropdownArr: [],
      productArr: [],
      loadedProductArr: [],
      productLoading: false
    };
  }

  async componentDidMount() {
    const { dataContent, layoutData } = this.props;
    const { pageId } = this.context;

    const isNetConnected = await helpers.isNetConnected();

    if (isNetConnected) {
      const dropdownAllArr = JSON.parse(dataContent);

      const arr = dropdownAllArr.filter((item) => item.parentId === layoutData.productgroupId);
      this.setState({
        dropdownAllArr,
        dropdownArr: [arr]
      });
    } else {
      this.setState({
        productLoading: true
      }, async () => {
        const productArr = await getProductDetailsByRootline(pageId);
        this.setState({
          productArr,
          loadedProductArr: productArr.slice(0, 8),
          productLoading: false
        });
      });
    }
  }

  setupDropdown = (index, selectedDropdown) => {
    const { dropdownArr, dropdownAllArr } = this.state;
    const dropdownArrNew = dropdownArr.slice(0, index + 1);
    this.setState({
      dropdownArr: dropdownArrNew,
      productArr: [],
      loadedProductArr: [],
      productLoading: true
    }, () => {
      const arr = dropdownAllArr.filter((item) => item.parentId === selectedDropdown.id);
      if (arr.length > 0) {
        this.setState({
          dropdownArr: [...dropdownArrNew, arr]
        });
      }
      this.setupProducts(selectedDropdown);
    });
  }

  setupProducts = async (selectedDropdown) => {
    const productObj = await getProductListByRootline(selectedDropdown.id);
    this.setState({
      productArr: productObj.data,
      loadedProductArr: productObj.data.slice(0, 8),
      productLoading: false
    });
  }

  loadMoreProduct = () => {
    const { productArr, loadedProductArr } = this.state;
    this.setState({
      loadedProductArr: productArr.slice(0, loadedProductArr.length + 8)
    });
  }

  renderDropdownItem = ({ item, index }) => {
    const { translations } = this.context;
    let dropdownArr = item;
    dropdownArr = sortStringsInAscendingOrder(dropdownArr, 'name');
    return (
      <ContentDropdown
        dataArr={dropdownArr}
        dropdownIndex={index}
        setupDropdown={this.setupDropdown}
        translations={translations}
      />
    );
  }

  renderDropdownList = () => {
    const { dropdownArr } = this.state;
    return (
      <FlatList
        extraData={this.state}
        data={dropdownArr}
        renderItem={this.renderDropdownItem}
        keyExtractor={(item, index) => `product_dropdown_${index}`}
        scrollEnabled={false}
      />
    );
  }

  render() {
    const { translations } = this.context;
    const { productArr, loadedProductArr, productLoading } = this.state;

    return (
      <View style={styles.wrap}>
        <Text style={styles.heading}>
          {tr(translations, 'select_via_machine', 'Selection via machine')}
        </Text>
        {this.renderDropdownList()}
        {
          productLoading ? <Loading /> : (
            <ProductList
              productArr={productArr}
              loadedProductArr={loadedProductArr}
              loadMoreProduct={this.loadMoreProduct}
            />
          )
        }
      </View>
    );
  }
}

Products.propTypes = {
  dataContent: PropTypes.string.isRequired,
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
};

Products.contextType = PageContentContext;
export default Products;
