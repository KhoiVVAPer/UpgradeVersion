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
  tr,
  helpers
} from '../../../../config';
import { rootNavigation } from '../../../../navigation';
import { DcaImage, TouchableDebounce } from '../../elements';
import { FontIcon, HtmlParser } from '../../generic';
import styles from './styles';

const { PageContentContext } = appContexts;

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    const { productData } = this.props;
    this.state = {
      productData,
      compareLoading: false
    };
  }

  navigateToProduct = () => {
    if (this.context) {
      const { componentId } = this.context;
      const { productData } = this.props;
      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: { pageId: productData.id }
        })
      );
    } else {
      const { componentId, productData } = this.props;
      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: { pageId: productData.id }
        })
      );
    }
    // const { componentId } = this.context;
    // const { productData } = this.props;
  }

  toggleCompare = (flag, compareCount) => {
    const { productData } = this.props;
    const {
      toggleProductCompare,
      toggleLoader,
      getCompareModalRef,
      translations
    } = this.context ? this.context : this.props;
    helpers.analyticsAction({ actionType: 'product_comparison', actionObj: { 'a.action': 'compare' } });
    if (!flag && compareCount > 3) {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'max_four_product_warning_alert', 'Maximum four products can be added')
      );
      return;
    }

    const toggleCompareCb = () => {
      const { productCompare } = this.context ? this.context : this.props;
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
    const { productCompare, translations } = this.context ? this.context : this.props;

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

  render() {
    const { productData } = this.state;
    const { textKey } = this.props;
    const imageUrl = (productData.images
      && productData.images[0]
      && productData.images[0].urls
      && productData.images[0].urls[2]
      && productData.images[0].urls[2].url) || '';
    return (
      <View style={styles.listItem}>
        {this.renderCompare()}
        <TouchableDebounce onPress={() => { this.navigateToProduct(); }}>
          <DcaImage
            url={imageUrl}
            imageStyle={styles.listItemImg}
            wrapStyle={styles.listItemImgWrap}
          />
          <View style={styles.listItemContent}>
            <HtmlParser
              html={productData.name}
              textKey={`${textKey}-headline`}
              style={styles.listItemImgHeadTxt}
              onPress={() => this.navigateToProduct()}
            />
            {
              productData.texts[0] && productData.texts[0].value
                ? (
                  <HtmlParser
                    html={productData.texts[0].value}
                    textKey={`${textKey}-desc`}
                    style={styles.listItemImgDescTxt}
                    onPress={() => this.navigateToProduct()}
                  />
                )
                : null
            }
          </View>
        </TouchableDebounce>
      </View>
    );
  }
}

ListItem.propTypes = {
  productData: PropTypes.objectOf(PropTypes.any).isRequired,
  textKey: PropTypes.string.isRequired,
};

ListItem.contextType = PageContentContext;
export default ListItem;
