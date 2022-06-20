import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { connect } from 'react-redux';
import {
  MainHoc,
  ErrorView,
  Loading,
  HtmlParser,
  FontIcon,
  TouchableDebounce
} from '../../custom';
import {
  appConstants,
  globals,
  appContexts,
  tr,
  icons,
  colors,
  productComparePdf, helpers
} from '../../../config';
import { getProductDetails as fetchProductDetails, toggleProductCompare as switchProductCompare } from '../../../redux/actions';
import ImageSection from './imageSection';
import TechData from './techData';
import Equipment from './equipment';
import Description from './description';
import appStyle from '../../../assets/styles/appStyles';
import styles from './styles';
import { getProductCompareLabels } from '../../../config/libs/helpers';

const { routes, textCasing, favouriteTypes } = appConstants;
const { PageContentContext } = appContexts;

class ProductCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetailsArr: [],
      techDataLabels: [],
      techDataNames: [],
      equipmentLabels: [],
      exportLoading: false
    };
    this.imageSectionRef = null;
    this.activeYOffset = 0;
  }

  async componentDidMount() {
    const {
      productCompare,
      productDetails,
      getProductDetails,
      universal
    } = this.props;
    if (universal.analyticsTracking === null || universal.analyticsTracking) {
      analytics().logScreenView('Product Compare', appConstants.firebaseGenericPage);
    }
    const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
    globals.SET_APP_DATA('checkParent', true);
    breadCrumbRef.setBreadcrumbData([]);

    const productDetailsArr = [];

    if (productCompare[0] && !productDetails[productCompare[0]]) {
      await getProductDetails(productCompare[0]);
    }
    if (productCompare[1] && !productDetails[productCompare[1]]) {
      await getProductDetails(productCompare[1]);
    }
    if (productCompare[2] && !productDetails[productCompare[2]]) {
      await getProductDetails(productCompare[2]);
    }
    if (productCompare[3] && !productDetails[productCompare[3]]) {
      await getProductDetails(productCompare[3]);
    }

    productCompare.map((item) => {
      // eslint-disable-next-line react/destructuring-assignment
      let productData = this.props.productDetails[item].obj;
      productData = JSON.parse(productData.data);
      productDetailsArr.push(productData);
      return null;
    });
    this.pushProduct(productDetailsArr);
    helpers.pageInfoAnalytics({ pageState: 'product_comparison', pageName: { 'att.comparisonProducts': productDetailsArr.map(navObj => navObj.id).join(',') } });
  }

  setImageSectionRef = (ref) => {
    this.imageSectionRef = ref;
  }

  pushProduct = (productDetailsArr) => {
    this.setState({
      productDetailsArr
    }, () => {
      this.buildLabels();
    });
  }

  buildLabels = () => {
    const { productDetailsArr } = this.state;
    const data = getProductCompareLabels(productDetailsArr);
    this.setState({
      ...data
    });
  }

  handleScroll = (event) => {
    this.activeYOffset = event.nativeEvent.contentOffset.y;
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 0) {
      this.imageSectionRef.animateImageHeight(60);
    } else {
      this.imageSectionRef.animateImageHeight(160);
    }
  }

  moveScrollToBottom = () => {
    this.scrollView.scrollTo({ y: this.activeYOffset + 120, animated: true });
  }

  removeProduct = (productId) => {
    const { productDetailsArr } = this.state;

    const arr = productDetailsArr.filter((item) => (item.id !== productId));
    this.setState({ productDetailsArr: arr }, () => {
      this.buildLabels();
    });
  }

  exportPdf = () => {
    const {
      productDetailsArr,
      techDataLabels,
      equipmentLabels
    } = this.state;
    this.setState({
      exportLoading: true
    }, async () => {
      const compareData = {
        productDetailsArr,
        techDataLabels,
        equipmentLabels
      };
      await productComparePdf(compareData);
      this.setState({ exportLoading: false });
    });
  }

  addToFavourite = () => {
    const { productCompare, translations, getFavouriteModalRef } = this.props;
    const favouriteModalRef = getFavouriteModalRef();
    if (productCompare && productCompare.length) {
      const pageIds = productCompare.toString().split(',').join('-');
      const obj = {
        title: tr(translations, 'product_comparison', 'PRODUCT COMPARISON'),
        pageId: 0,
        type: `${favouriteTypes.COMPARE_FAVOURITE}-${pageIds}`
      };
      favouriteModalRef.showFavouriteModal(obj, () => { });
    }
  }

  renderExportICon = (showExport, translations) => {
    const { exportLoading } = this.state;

    if (exportLoading) {
      return (
        <View style={styles.exportWrap}>
          <ActivityIndicator size="small" color={colors.secondaryColor} />
          <HtmlParser
            style={[styles.exportTxt, { display: showExport ? 'flex' : 'none' }]}
            html={tr(translations, 'export', 'Export')}
            textKey="prodCompare-export"
          />
        </View>
      );
    }

    return (
      <TouchableDebounce
        onPress={() => { this.exportPdf(); }}
        style={styles.exportWrap}
      >
        <FontIcon
          type={icons.logout_line[1]}
          icon={icons.logout_line[0]}
          size={16}
          color={colors.text}
          wrapStyle={{ display: showExport ? 'flex' : 'none' }}
          onPress={() => { this.exportPdf(); }}
        />
        <HtmlParser
          style={[styles.exportTxt, { display: showExport ? 'flex' : 'none' }]}
          html={tr(translations, 'export', 'Export')}
          textKey="prodCompare-export"
          onPress={() => { this.exportPdf(); }}
        />
      </TouchableDebounce>
    );
  }

  renderHeader = (showExport, translations, productCompare) => (
    <View style={styles.headWrap}>
      <HtmlParser
        style={[appStyle.heading, styles.heading]}
        html={tr(translations, 'product_comparison', 'PRODUCT COMPARISON', textCasing.U)}
        textKey="prodCompare-pageHeading"
      />
      {productCompare && productCompare.length
        ? (
          <FontIcon
            type={icons.feedback_line[1]}
            icon={icons.feedback_line[0]}
            color={colors.black}
            size={16}
            wrapStyle={styles.favIco}
            onPress={() => this.addToFavourite()}
          />
        )
        : null}
      {this.renderExportICon(showExport, translations)}
    </View>
  );

  renderImageSection = () => {
    const { toggleProductCompare, componentId, translations } = this.props;
    const { productDetailsArr } = this.state;

    return (
      <ImageSection
        productDetailsArr={productDetailsArr}
        removeProduct={this.removeProduct}
        toggleProductCompare={toggleProductCompare}
        componentId={componentId}
        setImageSectionRef={this.setImageSectionRef}
        translations={translations}
      />
    );
  }

  renderTechDataSection = () => {
    const { productDetailsArr, techDataLabels, techDataNames } = this.state;
    const { translations } = this.props;

    if (techDataLabels.length === 0) return null;

    return (
      <TechData
        productDetailsArr={productDetailsArr}
        techDataLabels={techDataLabels}
        techDataNames={techDataNames}
        translations={translations}
      />
    );
  }

  renderEquipmentSection = () => {
    const { productDetailsArr, equipmentLabels } = this.state;
    const { translations } = this.props;

    if (equipmentLabels.length === 0) return null;

    return (
      <Equipment
        productDetailsArr={productDetailsArr}
        equipmentLabels={equipmentLabels}
        translations={translations}
      />
    );
  }

  renderDescriptionSection = () => {
    const { productDetailsArr } = this.state;
    const { translations } = this.props;

    return (
      <Description
        productDetailsArr={productDetailsArr}
        moveScrollToBottom={this.moveScrollToBottom}
        translations={translations}
      />
    );
  }

  render() {
    const {
      productCompare, getMarkingModalRef, textMarking, translations
    } = this.props;
    const { productDetailsArr } = this.state;

    if (productCompare.length < 1) {
      return (
        <View style={styles.wrap}>
          {this.renderHeader(productDetailsArr.length, translations, productCompare)}
          <ErrorView
            error={tr(translations, 'compare_alert', 'No products are selected for comparison')}
            showTitle={false}
          />
        </View>
      );
    }

    if (productCompare.length && productDetailsArr.length === 0) {
      return (
        <View style={styles.wrap}>
          <Loading />
        </View>
      );
    }

    return (
      <PageContentContext.Provider
        value={{
          getMarkingModalRef,
          textMarking
        }}
      >
        <View style={styles.wrap}>
          {this.renderHeader(productDetailsArr.length, translations, productCompare)}
          {this.renderImageSection()}
          <ScrollView
            ref={(ref) => { this.scrollView = ref; }}
            style={styles.scrollWrap}
            contentContainerStyle={{}}
            onScroll={this.handleScroll}
            scrollEventThrottle={5}
          >
            <View style={styles.wrapInner}>
              {this.renderTechDataSection()}
              {this.renderEquipmentSection()}
              {this.renderDescriptionSection()}
            </View>
          </ScrollView>
        </View>
      </PageContentContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  productDetails: state.productDetails,
  productCompare: state.productCompare,
  structureData: state.structureData,
  textMarking: state.textMarking,
  translations: state.translations.arr,
  universal: state.universal
});

const mapDispatchToProps = (dispatch) => ({
  getProductDetails: (productId) => fetchProductDetails(dispatch, productId),
  toggleProductCompare: (productId) => switchProductCompare(dispatch, productId)
});

const ProductCompareRedux = connect(mapStateToProps, mapDispatchToProps)(ProductCompare);
export default MainHoc({
  screen: routes.PRODUCT_COMPARE,
  breadCrumb: true
})(ProductCompareRedux);
