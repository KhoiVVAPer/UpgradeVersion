import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Animated
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { rootNavigation } from '../../../navigation';
import {
  icons,
  colors,
  appContexts,
  appConstants,
  tr
} from '../../../config';
import {
  Button,
  FontIcon,
  DcaImage,
  TouchableDebounce,
  HtmlParser
} from '../../custom';
import styles from './styles';

const { textCasing } = appConstants;
const { MainHocContext } = appContexts;

class ImageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeLoading: false,
      removeOffset: null,
      removeWrapAnimate: new Animated.Value(0)
    };
    this.imageRef = [];
  }

  componentDidMount() {
    const { setImageSectionRef } = this.props;
    setImageSectionRef(this);
  }

  navigateToProduct = (offset) => {
    const { componentId } = this.context;
    const { productDetailsArr } = this.props;

    const productData = productDetailsArr[offset];

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

  animateImageHeight = (imgHeight) => {
    const { removeWrapAnimate } = this.state;

    if (
      (removeWrapAnimate._value === 1 && imgHeight !== 60)
      || (removeWrapAnimate._value === 0 && imgHeight !== 160)
    ) {
      Animated.timing(removeWrapAnimate, {
        toValue: imgHeight === 60 ? 1 : 0,
        duration: 500,
      }).start();
      this.imageRef.map((item) => {
        if (item) {
          item.animateImageHeight(imgHeight, 500);
        }
        return null;
      });
    }
  }

  renderReturnButton = (translations) => {
    const { componentId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => { Navigation.pop(componentId); }}
          text={tr(translations, 'return_to_previous_page', 'Return to Previous page', textCasing.U)}
          theme="app"
        />
      </View>
    );
  }

  removeProduct = (productId, offset) => {
    const { toggleProductCompare, removeProduct } = this.props;

    this.setState({
      removeLoading: true,
      removeOffset: offset
    }, () => {
      setTimeout(() => {
        toggleProductCompare(productId).then(() => {
          removeProduct(productId);
          this.setState({
            removeLoading: false,
            removeOffset: null
          });
        });
      }, 50);
    });
  }

  renderRemoveWrap = (productData, offset, translations) => {
    const { removeLoading, removeOffset, removeWrapAnimate } = this.state;

    if (removeLoading && removeOffset === offset) {
      return (
        <View style={styles.removingLoader}>
          <ActivityIndicator size="small" color={colors.secondaryColor} />
        </View>
      );
    }

    const animationStyle = {
      top: removeWrapAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 30]
      }),
      paddingLeft: removeWrapAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 15]
      })
    };
    const animationStyleLeft = {
      flex: removeWrapAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1 / 2]
      })
    };
    const animationStyleRight = {
      flex: removeWrapAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })
    };

    return (
      <Animated.View style={[styles.removeWrap, animationStyle]}>
        <TouchableDebounce
          style={styles.removeWrapInner}
          onPress={() => { this.removeProduct(productData.id, offset); }}
        >
          <Animated.View style={[animationStyleLeft]} />
          <FontIcon
            type={icons.delete_line[1]}
            icon={icons.delete_line[0]}
            size={16}
            color={colors.text}
          />
          <HtmlParser
            style={styles.removeTxt}
            html={tr(translations, 'remove', 'Remove')}
            textKey={`prodCompare-remove-${productData.id}`}
            onPress={() => this.removeProduct(productData.id, offset)}
          />
          <Animated.View style={[animationStyleRight]} />
        </TouchableDebounce>
      </Animated.View>
    );
  }

  renderItem = (offset) => {
    const { productDetailsArr, translations } = this.props;
    const { removeWrapAnimate } = this.state;
    if (!productDetailsArr[offset]) return null;

    const productData = productDetailsArr[offset];

    const animationStyleInner = {
      flex: removeWrapAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1 / 2]
      }),
    };

    let url = '';
    productData.images[0].urls.map((item) => {
      if (item.type === 'full') {
        url = item.url;
      }
      return null;
    });
    return (
      <View
        style={styles.imageSectionItem}
        key={`image_col_${productData.id}`}
      >
        {this.renderRemoveWrap(productData, offset, translations)}
        <TouchableDebounce onPress={() => this.navigateToProduct(offset)}>
          <View style={{ flexDirection: 'row' }}>
            <DcaImage
              url={url}
              wrapStyle={styles.imageWrap}
              resizeMode="contain"
              useApectRatio
              ref={(ref) => { this.imageRef = [...this.imageRef, ref]; }}
              animated
              height={160}
            />
            <Animated.View style={[animationStyleInner]} />
          </View>
          <HtmlParser
            style={styles.productNameTxt}
            html={productData.name}
            textKey={`prodCompare-prudctName-${productData.id}`}
          />
          <HtmlParser
            style={styles.productNameTxt}
            html={`${tr(translations, 'order_number', 'Order Number')}: ${productData.partnumberFormatted}`}
            textKey={`prodCompare-productOrderNumber-${productData.id}`}
          />
        </TouchableDebounce>
        {
          !productData.priceFormatted
            ? null
            : (
              <HtmlParser
                style={styles.productPriceTxt}
                html={`${tr(translations, 'price_in', 'Price in')}: ${productData.priceFormatted}`}
                textKey={`prodCompare-remove-${productData.id}`}
              />
            )
        }
      </View>
    );
  }

  render() {
    const { translations } = this.props;

    return (
      <View style={styles.imageSection}>
        {this.renderReturnButton(translations)}
        {this.renderItem(0)}
        {this.renderItem(1)}
        {this.renderItem(2)}
        {this.renderItem(3)}
      </View>
    );
  }
}

ImageSection.contextType = MainHocContext;
export default ImageSection;
