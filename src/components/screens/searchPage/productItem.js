/**
 * @fileoverview This is app's search page component.
 * It renders dynamic search page result
 * @package
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  TouchableDebounce,
  DcaImage,
  FontIcon
} from '../../custom';
import {
  appContexts,
  helpers,
  tr,
  icons,
  colors,
  appConstants
} from '../../../config';
import { rootNavigation } from '../../../navigation';
import styles from './styles';
import { getShortDescription } from '../../../config/libs/helpers';

const { MainHocContext } = appContexts;
const { PAST_PRODUCT } = appConstants;

const DiscontinuedWarning = ({ text }) => (
  <View style={styles.discontinuedWarning}>
    <FontIcon
      type={icons.exclamation_sign[1]}
      icon={icons.exclamation_sign[0]}
      color={colors.black}
      size={30}
    />
    <Text style={styles.discontinuedWarningTxt}>{text}</Text>
  </View>
);

class ProductItem extends Component {
  navigateToProduct = () => {
    const { componentId } = this.context;
    const { productData } = this.props;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: {
          pageId: productData.id,
          checkParent: true
        }
      })
    );
  }

  _renderShortDescription = (texts) => {
    const shortDesc = getShortDescription(texts);
    if (shortDesc) {
      return (
        <Text style={styles.listItemImgDescTxt}>{shortDesc}</Text>
      );
    }
    return null;
  }

  render() {
    const { productData, translations } = this.props;

    if (helpers.isEmptyObject(productData)) return <View style={{ flex: 1 / 4, margin: 10, marginVertical: 15 }} />;

    let imageUrl = '';
    if (productData && productData.images && productData.images[0] && productData.images[0].urls) {
      productData.images[0].urls.map((item) => {
        if (item.type === 'medium') imageUrl = item.url;
        return null;
      });
    }

    const isPastProduct = productData.productType === PAST_PRODUCT;
    const not_part_current_product_range = tr(translations, 'not_part_current_product_range', 'Not part of our current product range');

    return (
      <TouchableDebounce
        style={styles.listItem}
        onPress={() => this.navigateToProduct()}
      >
        <DcaImage
          url={imageUrl}
          imageStyle={styles.listItemImg}
          wrapStyle={styles.listItemImgWrap}
          isGrayScale={isPastProduct}
        />
        <View style={styles.listItemContent}>
          <Text style={styles.listItemImgHeadTxt}>{productData.name}</Text>
          {productData.productType === 'accessory' && this._renderShortDescription(productData.texts) }
        </View>
        {isPastProduct ? <DiscontinuedWarning text={not_part_current_product_range} /> : null}
      </TouchableDebounce>
    );
  }
}

ProductItem.contextType = MainHocContext;
export default ProductItem;
