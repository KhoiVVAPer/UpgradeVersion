import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import PropTypes from 'prop-types';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Loading from '../generic/loading';
import ErrorView from '../generic/errorView';
import appStyle from '../../../assets/styles/appStyles';
import {
  appContexts, appConstants, helpers, globals
} from '../../../config';
import ProductDetailManager from '../productDetailManager';

const { PageContentContext } = appContexts;
const { apiNames, navDirection } = appConstants;
const { LEFT_NAV } = navDirection;

class ProductTabWrap extends Component {
  constructor(props) {
    super(props);
    const { layoutData } = this.props;
    this.state = {
      loading: true,
      error: false,
      index: 0,
      routes: [],
      activeProductId: layoutData.productId,
      productListArr: []
    };
    this.loadedProducts = [];
    this.componentVisible = true;
  }

  componentDidMount() {
    const { toggleScroll } = this.context;
    toggleScroll();
    this.productGroupDataInit();
  }

  reloadPage = () => {
    this.setState({
      loading: true,
      error: false
    }, () => {
      this.productGroupDataInit();
    });
  }

  productGroupDataInit = async () => {
    const { activeProductId } = this.state;
    const { getProductDetails, getReduxData } = this.context;

    const productDetails = await getReduxData(apiNames.PRODUCT_DETAILS);

    if (!productDetails[activeProductId]) {
      getProductDetails(activeProductId).then((res) => {
        const data = JSON.parse(res.data);
        this.getProductGroupData(data.productgroupId);
      }).catch(() => {
        this.setState({
          error: true,
          loading: false,
        });
      });
    } else if (productDetails[activeProductId].error) {
      this.setState({
        error: true,
        loading: false
      });
    } else {
      const res = productDetails[activeProductId].obj;
      const data = JSON.parse(res.data);
      this.getProductGroupData(data.productgroupId);
    }
  }

  getProductGroupData = async (productgroupId) => {
    const { getProductListData, getProductList } = this.context;

    const productList = await getProductListData();

    if (!productList[productgroupId]
      || productList[productgroupId].loading
      || productList[productgroupId].error) {
      const res = await getProductList(productgroupId);
      const productListArr = res.data;
      this.setupRoutes(productListArr);
    } else {
      const productListArr = productList[productgroupId].obj
        && productList[productgroupId].obj.data
        ? productList[productgroupId].obj.data : [];
      this.setupRoutes(productListArr);
    }
  }

  setupRoutes = (productListArr) => {
    const { activeProductId } = this.state;
    const productList = productListArr.filter((item) => !helpers.isEmptyObject(item));
    let activeIndex = 0;
    const routes = productList.map((item, index) => {
      if (item.id === activeProductId) {
        activeIndex = index;
      }
      return {
        key: item.id,
        title: item.name,
        index
      };
    });
    this.loadedProducts = [activeIndex];
    this.setState({
      routes,
      index: activeIndex,
      productListArr: productList,
      loading: false
    });
  }

  renderScene = ({ route }) => {
    if (!this.loadedProducts.includes(route.index)) return null;
    const { productListArr } = this.state;
    const isFirstProduct = route.index === 0;
    const isLastProduct = (route.index + 1) === productListArr.length;

    return (
      <ProductDetailManager
        key={route.key}
        productId={route.key}
        onTabSwipe={this.onTabSwipe}
        isFirstProduct={isFirstProduct}
        isLastProduct={isLastProduct}
      />
    );
  };

  onTabSwipe = (direction) => {
    const { index } = this.state;
    const newIndex = direction === LEFT_NAV ? index - 1 : index + 1;
    this.changeRoute(newIndex);
  }

  changeRoute = (index) => {
    this.loadedProducts.push(index);
    this.setState({
      index
    }, () => {
      const { routes } = this.state;
      const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
      if (breadCrumbRef) {
        breadCrumbRef.buildNavigationInit(routes[index].key);
      }
    });
  }

  render() {
    const { loading, error } = this.state;

    if (loading) return <Loading />;
    if (error) return <ErrorView reloadPage={this.productGroupDataInit} />;
    return (
      <View style={appStyle.container}>
        <TabView
          renderTabBar={() => null}
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={(index) => { this.changeRoute(index); }}
          initialLayout={{ width: Dimensions.get('window').width }}
          swipeEnabled
        />
      </View>
    );
  }
}

ProductTabWrap.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};
ProductTabWrap.contextType = PageContentContext;
export default gestureHandlerRootHOC(ProductTabWrap);
