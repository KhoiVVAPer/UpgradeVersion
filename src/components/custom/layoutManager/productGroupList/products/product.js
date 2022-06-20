/**
 * @fileoverview This component renders design template
 * for image product group list item manual content.
 * @package
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import {
  icons,
  colors,
  appContexts,
  texts,
  tr
} from '../../../../../config';
import { rootNavigation } from '../../../../../navigation';
import { DcaImage, TouchableDebounce } from '../../../elements';
import { FontIcon, HtmlParser } from '../../../generic';
import styles from './styles';
import { getShortDescription } from '../../../../../config/libs/helpers';

const { PageContentContext } = appContexts;

class Product extends PureComponent {
  constructor(props) {
    super(props);
    const { productData } = this.props;
    this.state = {
      productData,
      compareLoading: false
    };
  }

  navigateToProduct = () => {
    const { componentId } = this.context;
    const { productData } = this.props;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId: productData.id }
      })
    );
  }

  toggleCompare = (flag, compareCount) => {
    const { productData } = this.props;
    const {
      toggleProductCompare,
      toggleLoader,
      getCompareModalRef,
      translations
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

      const isCompare = productCompare.includes(productData.id);
      if (!isCompare) {
        Alert.alert(
          tr(translations, 'success', texts.alerts.success),
          tr(translations, 'product_removed_from_compare_alert', 'Product removed from compare')
        );
      } else {
        const imageUrl = (productData.images
          && productData.images[0]
          && productData.images[0].urls
          && productData.images[0].urls[2]
          && productData.images[0].urls[2].url) || '';
        const setCompareModal = getCompareModalRef();
        setCompareModal(productData.name, productData.partnumberFormatted, imageUrl, productData.id);
      }
      this.setState({ compareLoading: false });
    };

    this.setState({
      compareLoading: true
    }, () => {
      setTimeout(() => {
        toggleLoader(true);
        toggleProductCompare(productData.id).then(() => {
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
        <View style={styles.compareWrap}>
          <ActivityIndicator size="small" color={colors.secondaryColor} />
        </View>
      );
    }

    const isCompare = productCompare.includes(productData.id);
    return (
      <TouchableDebounce
        style={styles.compareWrap}
        onPress={() => { this.toggleCompare(isCompare, productCompare.length); }}
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

  _renderShortDescription = (text) => {
    const { textKey } = this.props;
    const shortDesc = getShortDescription(text);
    if (shortDesc) {
      return (
        <HtmlParser
          html={shortDesc}
          textKey={`${textKey}-shortDesc`}
          style={styles.productImgDescTxt}
          onPress={() => this.navigateToProduct()}
        />
      );
    }
    return null;
  }

  render() {
    const { productData } = this.state;
    const { textKey } = this.props;

    const imageUrl = (productData.images
      && productData.images[0]
      && productData.images[0].urls
      && productData.images[0].urls[2]
      && productData.images[0].urls[2].url) || '';
    return (
      <View style={styles.product}>
        {this.renderCompare()}
        <TouchableDebounce onPress={() => { this.navigateToProduct(); }}>
          <DcaImage
            url={imageUrl}
            imageStyle={styles.productImg}
            wrapStyle={styles.productImgWrap}
            resizeMode="contain"
          />
          <View style={styles.productContent}>
            <HtmlParser
              html={productData.name}
              textKey={`${textKey}-headline`}
              style={styles.productImgHeadTxt}
              onPress={() => this.navigateToProduct()}
            />
            {productData.productType === 'accessory' && this._renderShortDescription(productData.texts) }
          </View>
        </TouchableDebounce>
      </View>
    );
  }
}

Product.propTypes = {
  productData: PropTypes.objectOf(PropTypes.any).isRequired,
  textKey: PropTypes.string.isRequired,
};

Product.contextType = PageContentContext;
export default Product;
