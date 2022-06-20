/**
 * @fileoverview This is app's layout manager component.
 * Layout retuned from page content api is dyamicaly render from this component
 * @package
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { appConstants } from '../../../config';
import { Spacer } from '../generic';
import BusinessUnitEntry from './businessUnitEntry';
import ImageCollection from './imageCollection';
import ProductGroupList from './productGroupList';
import ProductGroupOverview from './productGroupOverview';
import ProductList from './productList';
import HeadlineText from './headlineText';
import ImageHeadlineText from './imageheadlinetext';
import ImageHeadlineTextFiftyFifty from './imageheadlinetextfiftyfifty';
import FullWidthImage from './fullWidthImage';
import HorizontalRule from './horizontalRule';
import ImageHeadlineTextTwoCol from './imageHeadlineTextTwoCol';
import ImageHeadlineTextThreeCol from './imageHeadlineTextThreeCol';
import ImageHeadlineTextFourCol from './imageHeadlineTextFourCol';
import Anchors from './anchors';
import Table from './table';
import TextContent from './textContent';
import ProductTabWrap from '../productTabWrap';

const { layouts } = appConstants;

class LayoutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  renderLayout = () => {
    let { layoutData } = this.props;
    const {
      layoutType,
      getProductGroups,
      getSubProductGroups,
      moveToTop,
      navigateTo,
      showFixContent,
      setRibbonRef, productFinderContent,translations
    } = this.props;

    layoutData = JSON.parse(layoutData);
    let layout = '';

    if (layouts.PRODUCT_GROUP_LIST === layoutType) {
      layout = layouts.PRODUCT_GROUP_LIST;
    } else if (layouts.PRODUCT_GROUPS_OVERVIEW === layoutType) {
      layout = layouts.PRODUCT_GROUPS_OVERVIEW;
    } else if (layouts.PRODUCT_LIST === layoutType) {
      layout = layouts.PRODUCT_LIST;
    } else if (layouts.PRODUCT_DETAILS === layoutType) {
      layout = layouts.PRODUCT_DETAILS;
    } else {
      // eslint-disable-next-line prefer-destructuring
      layout = layoutData.layout;
    }

    let layoutComponent = null;

    const space = layout === layouts.FULLWIDTHIMAGE ? 10 : 20;

    switch (layout) {
      case layouts.BUSINESS_ENTRY:
      case layouts.BUSINESS_ENTRY_OLD:
        return <BusinessUnitEntry layoutData={layoutData} translations={translations} />;

      case layouts.IMAGE_COLLECTION:
        if (!showFixContent) return null;
        return <ImageCollection layoutData={layoutData} />;

      case layouts.PRODUCT_GROUPS_OVERVIEW:
        return (
          <ProductGroupOverview
            layoutData={layoutData}
            getProductGroups={getProductGroups}
            productFinderContent={productFinderContent}
            moveToTop={moveToTop}
            layoutType={layoutType}
          />
        );

      case layouts.PRODUCT_GROUP_LIST:
        return (
          <ProductGroupList
            layoutData={layoutData}
            getProductGroups={getProductGroups}
            getSubProductGroups={getSubProductGroups}
            productFinderContent={productFinderContent}
            moveToTop={moveToTop}
            layoutType={layoutType}
          />
        );

      case layouts.PRODUCT_LIST:
        return (
          <ProductList
            layoutData={layoutData}
            moveToTop={moveToTop}
            layoutType={layoutType}
          />
        );

      case layouts.RIBBON:
        if (!showFixContent) return null;
        return (
          <HeadlineText
            layoutData={layoutData}
            setRibbonRef={setRibbonRef}
            isExport
          />
        );

      case layouts.HEADLINE_TEXT:
        layoutComponent = <HeadlineText layoutData={layoutData} />;
        break;

      case layouts.IMAGE_HEADLINE_TEXT:
        layoutComponent = <ImageHeadlineText layoutData={layoutData} />;
        break;

      case layouts.IMAGE_HEADLINE_TEXT_FIFTY_FIFTY:
        layoutComponent = <ImageHeadlineTextFiftyFifty layoutData={layoutData} />;
        break;

      case layouts.FULLWIDTHIMAGE:
        layoutComponent = <FullWidthImage layoutData={layoutData} />;
        break;

      case layouts.IMAGEHEADLINETEXTTWOCOL:
        layoutComponent = <ImageHeadlineTextTwoCol layoutData={layoutData} />;
        break;

      case layouts.IMAGEHEADLINETEXTTHREECOL:
        layoutComponent = <ImageHeadlineTextThreeCol layoutData={layoutData} />;
        break;

      case layouts.IMAGEHEADLINETEXTFOURCOL:
        layoutComponent = <ImageHeadlineTextFourCol layoutData={layoutData} />;
        break;

      case layouts.HORIZOANTAL_RULE:
        layoutComponent = <HorizontalRule />;
        break;

      case layouts.ANCHOR:
        if (!showFixContent) return null;
        return (
          <Anchors
            layoutData={layoutData}
            navigateTo={navigateTo}
          />
        );

      case layouts.TABLE:
        layoutComponent = <Table layoutData={layoutData} />;
        break;

      case layouts.PRODUCT_DETAILS:
        return <ProductTabWrap layoutData={layoutData} />;

      case layouts.TEXT_CONTENT:
        layoutComponent = <TextContent layoutData={layoutData} />;
        break;

      default:
        layoutComponent = <View />;
        break;
    }

    return (
      <View>
        <Spacer space={space} />
        {layoutComponent}
      </View>
    );
  }

  render() {
    return this.renderLayout();
  }
}

export default LayoutManager;
