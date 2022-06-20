import React, { Component } from 'react';
import {
  View,
  ScrollView,
  findNodeHandle,
  UIManager, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { ScrollIntoView, wrapScrollViewConfigured } from 'react-native-scroll-into-view';
import {
  appContexts,
  appConstants,
  icons,
  colors,
  helpers, globals
} from '../../../config';
import Loading from '../generic/loading';
import FontIcon from '../generic/fontIcon/_fontIcon';
import ErrorView from '../generic/errorView';
import styles from './styles';

import Ribbon from './ribbon';
import Anchors from './anchor';
import Techdata from './techdata';
import FeaturesAndBenefit from './featuresAndBenefit';
import Document from './document';
import Accessories from './accessories';
import Equipments from './equipments';
import DetergentWarnings from './detergentWarnings';
import Applicaions from './applications';
import CompatibleMachines from './compatibleMachines';
import ConfigurableComponents from './configurableComponents';
import Recommendations from './recommendations';
import Videos from './videos';

const { PageContentContext } = appContexts;
const { productDetailsDataSequence, apiNames, PAST_PRODUCT } = appConstants;
const CustomScrollView = wrapScrollViewConfigured({
  options: { align: 'top' },
})(ScrollView);

const ANCHORS_ARR = [
  { type: productDetailsDataSequence.TECH_DATA, name: 'DESCRIPTION', key: 'description' },
  { type: productDetailsDataSequence.EQUIPMENT, name: 'EQUIPMENT', key: 'equipment' },
  { type: productDetailsDataSequence.FEATURE_BENEFITS, name: 'FEATURES AND BENEFITS', key: 'feature_and_benefits' },
  { type: productDetailsDataSequence.DOCUMENTS, name: 'DOWNLOADS', key: 'downloads' },
  { type: productDetailsDataSequence.ACCESSORIES, name: 'ACCESSORIES', key: 'accessories' },
  { type: productDetailsDataSequence.CLEANING_AGENTS, name: 'CLEANING AGENTS', key: 'cleaning_agents' },
  { type: productDetailsDataSequence.DETERGENT_WARNINGS, name: 'DETERGENT WARNINGS', key: 'detergent_warning' },
  { type: productDetailsDataSequence.RECOMMENDATIONS, name: 'RECOMMENDATIONS', key: 'recommendations' },
  { type: productDetailsDataSequence.VIDEOS, name: 'VIDEOS', key: 'videos' },
  { type: productDetailsDataSequence.APPLICATIONS, name: 'APPLICATIONS', key: 'applications' },
  { type: productDetailsDataSequence.COMPATIBLEMACHINES, name: 'COMPATIBLE MACHINES', key: 'compatible_machines' },
  { type: productDetailsDataSequence.CONFIGURABLECOMPONENTS, name: 'CONFIGURABLE COMPONENTS', key: 'configurable_component' },
];

class ProductDetailManager extends Component {
  constructor(props) {
    super(props);
    const { productId } = this.props;
    let portrait = this.isPortrait()
    this.state = {
      productId,
      loading: true,
      error: false,
      productDetailsObj: {},
      productDetailsData: {},
      productDetailsArr: [],
      anchorsArr: [],
      isNetConnected: true,
      orientation: this.isPortrait() ? 'portrait' : 'landscape'
    };

    this.scrollView = null;
    this.anchorRef = {};
    this.ribbonRef = null;
    this.anchorDataRef = null;
    this.anchorContentRef = null;
    this.hideRibbonTriggered = false;
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: portrait ? 'portrait' : 'landscape'
      });
    });
  }

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  async componentDidMount() {
    const { productId } = this.state;
    const { getProductDetails, getReduxData } = this.context;

    const productDetails = await getReduxData(apiNames.PRODUCT_DETAILS);
    if (!productDetails[productId]) {
      getProductDetails(productId).then((data) => {
        this.setProductDetailsData(data);
      }).catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
    } else if (productDetails[productId].error) {
      this.setState({
        error: true,
        loading: false
      });
    } else {
      const data = productDetails[productId].obj;
      this.setProductDetailsData(data);
    }
  }

  setRibbonRef = (ref) => {
    this.ribbonRef = ref;
  }

  setAnchorData = (ref) => {
    this.anchorDataRef = ref;
  }

  swipeProduct = (direction) => {
    this.ribbonRef.navigate(direction);
  }

  navigateTo = (section) => {
    const ref = this.anchorRef[section];
    if (ref) {
      ref.scrollIntoView();
    }
  }

  handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 25) {
      if (!this.hideRibbonTriggered) {
        this.hideRibbonTriggered = true;
        this.ribbonRef.hideDesc();
      }
    } else {
      this.hideRibbonTriggered = false;
      this.ribbonRef.showDesc();
    }
  }

  onScrollEndDrag = () => {
    ANCHORS_ARR.map((item) => {
      if (this.anchorRef[item.type]) {
        UIManager.measure(findNodeHandle(this.anchorRef[`view_${item.type}`]), (x, y, width, height, pageX, pageY) => {
          UIManager.measure(findNodeHandle(this.anchorContentRef), (x1, y1, width1, height1, pageX1, pageY1) => {
            if (pageY < pageY1 + 50 && pageY > pageY1) {
              this.anchorDataRef.setActiveAnchor(item);
              this.ribbonRef.setActiveAnchor(item);
            }
          });
        });
      }
      return null;
    });
  }

  moveToTop = () => {
    this.scrollView.scrollTo({ y: 0, animated: true });
  }

  setProductDetailsData = async (resData) => {
    const data = JSON.parse(resData.data);
    const productDetailsData = JSON.parse(JSON.stringify(data));
    const { recomendationsData } = resData;

    const isNetConnected = await helpers.isNetConnected();
    this.setState({ isNetConnected });

    let recomendationsDataIsSet = false;
    const anchorsArr = [];
    const productDetailsArr = [];
    const productDetailsObj = { ...data };
    data.texts.map((item) => {
      if (item.type === 'short') {
        productDetailsObj.description = item.value;
      }
      return null;
    });
    const isPastProduct = productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-unused-vars, prefer-const
    for (let key in productDetailsDataSequence) {
      const keyVal = productDetailsDataSequence[key];
      if (data[keyVal] || recomendationsData) {
        if (data[keyVal]) {
          productDetailsArr.push({ [keyVal]: data[keyVal] });
          delete productDetailsObj[keyVal];
        }
        if (keyVal === productDetailsDataSequence.RECOMMENDATIONS && !recomendationsDataIsSet) {
          productDetailsArr.push({ [keyVal]: recomendationsData });
          recomendationsDataIsSet = true;
        }

        ANCHORS_ARR.map((item) => {
          if (item.type === keyVal) {
            if (item.type === productDetailsDataSequence.EQUIPMENT) {
              if ((data[keyVal].length > 0 || productDetailsObj.icons.length > 0) && !isPastProduct) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.FEATURE_BENEFITS) {
              if (data[keyVal].length > 0 && !isPastProduct) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.DOCUMENTS) {
              if (data[keyVal].length > 0) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.ACCESSORIES) {
              if (data[keyVal].length > 0) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.CLEANING_AGENTS) {
              if (data[keyVal].length > 0) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.VIDEOS) {
              if (data[keyVal].length > 0 && isNetConnected) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.DETERGENT_WARNINGS) {
              if (data[keyVal].length > 0 && !isPastProduct) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.RECOMMENDATIONS) {
              if (recomendationsData && recomendationsData.data.length) {
                const modifiedItem = { ...item };
                modifiedItem.hasSingle = recomendationsData.data.length === 1;
                if (modifiedItem.hasSingle) {
                  modifiedItem.single = { type: productDetailsDataSequence.RECOMMENDATIONS, name: 'RECOMMENDATION', key: 'recommendation' };
                }
                anchorsArr.push(modifiedItem);
              }
            } else if (item.type === productDetailsDataSequence.APPLICATIONS) {
              if (data[keyVal].length > 0 && !isPastProduct) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.COMPATIBLEMACHINES) {
              if ((data[keyVal].past.length > 0 || data[keyVal].current.length > 0) && !isPastProduct) {
                anchorsArr.push(item);
              }
            } else if (item.type === productDetailsDataSequence.CONFIGURABLECOMPONENTS) {
              if (data[keyVal].length > 0 && !isPastProduct) {
                anchorsArr.push(item);
              }
            } else {
              anchorsArr.push(item);
            }
          }
          return null;
        });
      }
    }
    const { productActiveAnchor } = this.context;
    this.setState({
      productDetailsArr,
      productDetailsObj,
      productDetailsData,
      anchorsArr,
      loading: false
    }, () => {
      // this.moveToTop();
      setTimeout(() => {
        if (productActiveAnchor) {
          this.navigateTo(productActiveAnchor.type);
          this.anchorDataRef.setActiveAnchor(productActiveAnchor);
        }
      }, 500);
    });
  }

  renderProductDetailItem = (item) => {
    const {
      onTabSwipe,
      isFirstProduct,
      isLastProduct
    } = this.props;
    const {
      productDetailsObj,
      productDetailsData,
      isNetConnected
    } = this.state;
    const typeArr = Object.keys(item);
    const type = typeArr[0];

    const isPastProduct = productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT;

    switch (type) {
      case productDetailsDataSequence.RIBBON:
        return (
          <Ribbon
            layoutData={item[type]}
            productDetailsObj={productDetailsObj}
            setRibbonRef={this.setRibbonRef}
            onTabSwipe={onTabSwipe}
            isFirstProduct={isFirstProduct}
            isLastProduct={isLastProduct}
          />
        );

      case productDetailsDataSequence.ANCHOR:
        return (
          <View
            ref={(ref) => { this.anchorContentRef = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <Anchors
              layoutData={item[type]}
              navigateTo={this.navigateTo}
              setAnchorData={this.setAnchorData}
            />
          </View>
        );

      case productDetailsDataSequence.TECH_DATA:
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              <Techdata
                layoutData={item[type]}
                productDetailsObj={productDetailsObj}
                productDetailsData={productDetailsData}
              />
            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.EQUIPMENT:
        if (isPastProduct) return null;
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length > 0 || productDetailsObj.icons.length > 0
                  ? (
                    <Equipments
                      layoutData={item[type]}
                      productDetailsObj={productDetailsObj}
                    />
                  )
                  : null
              }

            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.FEATURE_BENEFITS:
        if (isPastProduct) return null;
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length > 0
                  ? (
                    <FeaturesAndBenefit layoutData={item[type]} />
                  )
                  : null
              }
            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.DOCUMENTS:
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length === 0
                  ? <View />
                  : (
                    <Document layoutData={item[type]} />
                  )
              }
            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.ACCESSORIES:
      case productDetailsDataSequence.DETERGENTS:
      case productDetailsDataSequence.CLEANING_AGENTS:
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length === 0
                  ? <View />
                  : (
                    <Accessories
                      layoutData={item[type]}
                      type={type}
                      productDetailsObj={productDetailsObj}
                    />
                  )
              }
            </ScrollIntoView>
          </View>
        );
      case productDetailsDataSequence.RECOMMENDATIONS:
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length === 0
                  ? <View />
                  : (
                    <Recommendations
                      layoutData={item[type]}
                      type={type}
                      productDetailsObj={productDetailsObj}
                    />
                  )
              }
            </ScrollIntoView>
          </View>
        );
      case productDetailsDataSequence.VIDEOS:
        if (isNetConnected) {
          return (
            <View
              ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
              key={type}
              renderToHardwareTextureAndroid
            >
              <ScrollIntoView
                ref={(ref) => { this.anchorRef[type] = ref; }}
                style={{}}
              >
                {
                  item[type].length === 0
                    ? <View />
                    : (
                      <Videos
                        layoutData={item[type]}
                        type={type}
                        productDetailsObj={productDetailsObj}
                      />
                    )
                }
              </ScrollIntoView>
            </View>
          );
        }
        return null;

      case productDetailsDataSequence.DETERGENT_WARNINGS:
        if (isPastProduct) return null;
        if (item[type] === null) return null;
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length === 0
                  ? <View />
                  : (
                    <DetergentWarnings
                      layoutData={item[type]}
                    />
                  )
              }
            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.APPLICATIONS:
        if (isPastProduct) return null;
        if (item[type] === null) return null;
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length === 0
                  ? <View />
                  : (
                    <Applicaions
                      layoutData={item[type]}
                    />
                  )
              }
            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.COMPATIBLEMACHINES:
        if (isPastProduct) return null;
        if (item[type] === null) return null;
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].past.length === 0 && item[type].current.length === 0
                  ? <View />
                  : (
                    <CompatibleMachines
                      layoutData={item[type]}
                    />
                  )
              }
            </ScrollIntoView>
          </View>
        );

      case productDetailsDataSequence.CONFIGURABLECOMPONENTS:
        if (isPastProduct) return null;
        if (item[type] === null) return null;
        return (
          <View
            ref={(ref) => { this.anchorRef[`view_${type}`] = ref; }}
            key={type}
            renderToHardwareTextureAndroid
          >
            <ScrollIntoView
              ref={(ref) => { this.anchorRef[type] = ref; }}
              style={{}}
            >
              {
                item[type].length === 0
                  ? <View />
                  : (
                    <ConfigurableComponents
                      layoutData={item[type]}
                    />
                  )
              }
            </ScrollIntoView>
          </View>
        );

      default:
        break;
    }
    return null;
  }

  render() {
    const {
      loading,
      productDetailsArr,
      productDetailsObj,
      anchorsArr,
      error
    } = this.state;
    let getBreadCrumbData = globals.GET_APP_DATA('breadCrumbRef');
    let breadCrumbData = getBreadCrumbData && getBreadCrumbData.navigationObjArr.slice().reverse();

    let contextData = {
      'pg.pgid': productDetailsObj.productgroupId,
      'pr.sku': productDetailsObj.partnumberFormatted,
      'pr.name': productDetailsObj.name,
      'pr.name': productDetailsObj.name,
      'pr.type': productDetailsObj.businessUnit,
      'pr.mainCategory1': breadCrumbData[2] && breadCrumbData[2].title,
      'pr.subCategory1': breadCrumbData[0] && breadCrumbData[0].title,
      'pr.subCategory2': breadCrumbData[1] && breadCrumbData[1].title,
      'pr.subCategory3': breadCrumbData && breadCrumbData[3] ? breadCrumbData[3].title : '',
      'pr.subCategory4': breadCrumbData && breadCrumbData[4] ? breadCrumbData[4].title : '',
      'pr.subCategory5': breadCrumbData && breadCrumbData[5] ? breadCrumbData[5].title : ''
    };
    helpers.pageInfoAnalytics({ pageState: 'product_details', pageName: contextData });
    if (loading) {
      return (
        <View style={[styles.container]}>
          <Loading />
        </View>
      );
    }
    if (error) {
      return (
        <View style={[styles.container]}>
          <ErrorView />
        </View>
      );
    }

    const ribbonData = {
      [productDetailsDataSequence.RIBBON]: {
        name: productDetailsObj.name,
        description: productDetailsObj.description
      }
    };

    const anchorData = {
      [productDetailsDataSequence.ANCHOR]: anchorsArr
    };
    return (
      <View style={styles.container}>
        {this.renderProductDetailItem(ribbonData)}
        {anchorsArr.length !== 0 ? this.renderProductDetailItem(anchorData) : null}
        <CustomScrollView
          style={styles.contentContainer}
          ref={(ref) => { this.scrollView = ref; }}
          contentContainerStyle={styles.contentContainerInner}
          onScroll={this.handleScroll}
          onScrollEndDrag={this.onScrollEndDrag}
        >
          {
            productDetailsArr.map((item) => this.renderProductDetailItem(item))
          }
          <View style={styles.moveTopWrap}>
            <FontIcon
              type={icons.upArrowNew[1]}
              icon={icons.upArrowNew[0]}
              color={colors.text}
              size={40}
              onPress={() => this.moveToTop()}
              delayDuration={0}
            />
          </View>
        </CustomScrollView>
      </View>
    );
  }
}

ProductDetailManager.propTypes = {
  productId: PropTypes.number.isRequired,
  onTabSwipe: PropTypes.func.isRequired,
  isFirstProduct: PropTypes.bool.isRequired,
  isLastProduct: PropTypes.bool.isRequired,
};
ProductDetailManager.contextType = PageContentContext;
export default ProductDetailManager;
