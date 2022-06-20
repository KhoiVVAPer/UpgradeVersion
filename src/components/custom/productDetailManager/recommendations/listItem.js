/**
 * @fileoverview This component renders design template
 * for image product group list item manual content.
 * @package
 */
import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import {
  icons, colors, appContexts, texts, tr, appConstants, helpers
} from '../../../../config';
import { rootNavigation } from '../../../../navigation';
import { DcaImage, TouchableDebounce } from '../../elements';
import { FontIcon, HtmlParser } from '../../generic';
import styles from './styles';

const { firebaseEvents } = appConstants;


const { PageContentContext } = appContexts;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareLoading: false
    };
  }

  navigateToProduct = () => {
    const { componentId, universal } = this.context;
    const { productData } = this.props;
    const eventObj = {
      pageId: productData.pageID,
      title: productData.name
    };

    helpers.analyticsEvent(
      firebaseEvents.PRODUCT_RECOMMENDATION,
      eventObj,
      universal
    );
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId: productData.pageID }
      })
    );
  }

  toggleCompare = (flag, compareCount) => {
    const { productData } = this.props;
    const {
      toggleProductCompare, toggleLoader, getCompareModalRef, translations
    } = this.context;

    if (!flag && compareCount > 3) {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'max_four_product_warning_alert', 'Maximum four products can be added')
      );
      return;
    }

    const toggleCompareCb = () => {
      const { productCompare } = this.context;

      const isCompare = productCompare ? productCompare.includes(productData.pageID) : false;
      if (!isCompare) {
        Alert.alert(
          tr(translations, 'success', texts.alerts.success),
          tr(translations, 'product_removed_from_compare_alert', 'Product removed from compare')
        );
      } else {
        const imageUrl = productData.image;
        const setCompareModal = getCompareModalRef();
        setCompareModal(productData.name, productData.partnumberFormatted, imageUrl, productData.pageID);
      }
      this.setState({ compareLoading: false });
    };

    this.setState({
      compareLoading: true
    }, () => {
      setTimeout(() => {
        toggleLoader(true);
        toggleProductCompare(productData.pageID).then(() => {
          toggleLoader(false, toggleCompareCb);
        });
      }, 50);
    });
  }

  renderCompare = () => {
    const { productData } = this.props;
    const { compareLoading } = this.state;
    const { productCompare, translations } = this.context;

    if (compareLoading) {
      return (
        <View
          style={styles.compareWrap}
          dcaTest="loadingIndicator"
        >
          <ActivityIndicator size="small" color={colors.secondaryColor} />
        </View>
      );
    }

    // Ternary operator for test cases
    const isCompare = productCompare ? productCompare.includes(productData.pageID) : false;
    return (
      <TouchableDebounce
        style={styles.compareWrap}
        onPress={() => this.toggleCompare(isCompare, productCompare.length)}
        delayDuration={0}
        dcaTest="compareWrap"
      >
        <View style={styles.checkBox}>
          {
            !isCompare ? null : (
              <FontIcon
                type={icons.done[1]}
                icon={icons.done[0]}
                color={colors.text}
                size={10}
              />
            )
          }
        </View>
        <Text style={styles.compareTxt}>{tr(translations, 'compare', 'Compare')}</Text>
      </TouchableDebounce>
    );
  }

  render() {
    const { productData, textKey, translations } = this.props;
    return (
      <View style={styles.listItem}>
        {this.renderCompare()}
        <TouchableDebounce onPress={() => this.navigateToProduct()}>
          <DcaImage
            url={productData.image}
            imageStyle={styles.listItemImg}
            wrapStyle={styles.listItemImgWrap}
          />
          <View style={styles.listItemContent}>
            <HtmlParser
              dcaTest="productName"
              html={productData.name}
              textKey={`product-${textKey}`}
              style={styles.listItemImgHeadTxt}
            />
            <HtmlParser
              dcaTest="productPartNumber"
              html={`${tr(translations, 'order_number', 'Order number')}: ${productData.partnumberFormatted}`}
              textKey={`product-partnumber-format-${textKey}`}
              style={styles.listItemImgPartnumberTxt}
            />
          </View>
        </TouchableDebounce>
      </View>
    );
  }
}

ListItem.propTypes = {
  productData: PropTypes.objectOf(PropTypes.any).isRequired,
};
ListItem.contextType = PageContentContext;
export default ListItem;
