import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Vibration
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import {
  icons,
  colors,
  appContexts,
  tr,
  appConstants,
  globals,
  helpers
} from '../../../../config';
import { rootNavigation } from '../../../../navigation';
import Button from '../../generic/button';
import DcaImage from '../../elements/dcaImage';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import styles from './styles';

const { textCasing, firebaseEvents } = appConstants;
const { MainHocContext } = appContexts;

class ProductCompareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      orderNumber: '',
      productImage: '',
      isVisible: false
    };
    this.imgRef = null;
  }

  componentDidMount() {
    const { setCompareModalRef } = this.props;
    setCompareModalRef(this.setCompareModal);
  }

  setCompareModal = (productName, orderNumber, productImage, productId) => {
    const { universal } = this.props;
    this.setState({
      productName,
      orderNumber,
      productImage,
      isVisible: true
    }, () => {
      helpers.analyticsEvent(
        firebaseEvents.PRODUCT_COMPARE_ADDED,
        {
          productId,
          productName,
          orderNumber
        },
        universal
      );
      Vibration.vibrate(globals.VIBRATE_DURATION);
      this.imgRef.changeImage(productImage);
    });
  }

  hideModal = () => { this.setState({ isVisible: false }); }

  goToCompare = () => {
    const { componentId } = this.context;
    helpers.analyticsAction({ actionType: 'product_comparison', actionObj: { 'a.action': 'to_the_product_comparison' } });
    this.setState({
      isVisible: false
    }, () => {
      setTimeout(() => {
        Navigation.push(componentId, rootNavigation.productCompare);
      }, 150);
    });
  }

  renderContent = () => {
    const { translations } = this.props;
    const { productImage, productName, orderNumber } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <DcaImage
            url={productImage}
            imageStyle={{
              height: 200,
              width: '100%'
            }}
            ref={(ref) => { this.imgRef = ref; }}
          />
        </View>
        <View style={styles.contentRight}>
          <Text style={styles.productTxt}>{productName}</Text>
          <Text style={styles.orderTxt}>{`${tr(translations, 'order_number', 'Order number')}: ${orderNumber}`}</Text>
        </View>
      </View>
    );
  }

  renderFooter = (translations) => (
    <View style={styles.footer}>
      <Button
        onPress={() => this.hideModal()}
        text={tr(translations, 'continue', 'CONTINUE', textCasing.U)}
        theme="gray"
      />
      <Button
        onPress={() => { this.goToCompare(); }}
        text={tr(translations, 'to_comparison', 'TO COMPARISON', textCasing.U)}
        theme="app"
      />
    </View>
  );

  renderCloseIcon = () => (
    <View style={styles.closeWrap}>
      <FontIcon
        type={icons.closeIon[1]}
        icon={icons.closeIon[0]}
        color={colors.text}
        size={20}
        innerWrapStyle={{ padding: 8 }}
        onPress={() => this.hideModal()}
      />
    </View>
  );

  render() {
    const { translations } = this.props;
    const { isVisible } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <View style={styles.wrap}>
          <View style={styles.wrapInner}>
            {this.renderCloseIcon()}
            <Text style={styles.heading}>
              {tr(
                translations,
                'item_added_to_comparison',
                'THE FOLLOWING ITEM WAS ADDED TO COMPARISON',
                textCasing.U
              )}
            </Text>
            {this.renderContent()}
            {this.renderFooter(translations)}
          </View>
        </View>
      </Modal>
    );
  }
}

ProductCompareModal.contextType = MainHocContext;
const mapStateToProps = (state) => ({
  universal: state.universal,
  translations: state.translations.arr
});
const mapDispatchToProps = () => ({});
const ProductCompareModalRedux = connect(mapStateToProps, mapDispatchToProps)(ProductCompareModal);
export default ProductCompareModalRedux;
