import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Navigation } from 'react-native-navigation';
import OnBoarding from '../../onBoarding';
import { rootNavigation } from '../../../../navigation';
import {
  icons,
  colors,
  appConstants,
  texts,
  appContexts,
  globals,
  tr,
  productDetailsPdf,
  helpers
} from '../../../../config';
import DcaImage from '../../elements/dcaImage';
import TouchableDebounce from '../../elements/touchableDebounce';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import styles from './styles';

const {
  onBoardingSteps,
  navDirection,
  routes,
  firebaseEvents
} = appConstants;
const { LEFT_NAV, RIGHT_NAV } = navDirection;

const { PageContentContext } = appContexts;

class LeftSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0,
      imagesArr: [],
      compareLoading: false,
      isMounted: false,
      exportLoading: false
    };
    this.fullImgRef = [];
  }

  componentDidMount() {
    const { productDetailsObj } = this.props;
    let imagesArr = [];

    productDetailsObj.images.map((item) => {
      let fullImage = '';
      let thumbImage = '';
      item.urls.map((imageUrl) => {
        if (imageUrl.type === 'full') fullImage = imageUrl.url;
        if (imageUrl.type === 'thumb') thumbImage = imageUrl.url;
        return null;
      });
      imagesArr = [...imagesArr, [fullImage, thumbImage]];
      return null;
    });
    imagesArr = imagesArr.map((item, index) => ([...item, index]));
    this.setState({
      imagesArr,
      isMounted: true
    });
  }

  swipeImage = (direction) => {
    const { imagesArr, activeImageIndex } = this.state;
    if (direction === LEFT_NAV && imagesArr[activeImageIndex + 1]) {
      this.setState({
        activeImageIndex: activeImageIndex + 1
      }, () => {
        this.selectFullImage(activeImageIndex + 1);
      });
    }
    if (direction === RIGHT_NAV && imagesArr[activeImageIndex - 1]) {
      this.setState({
        activeImageIndex: activeImageIndex - 1
      }, () => {
        this.selectFullImage(activeImageIndex - 1);
      });
    }
  }

  renderLabelItem = ({ item }) => (
    new Date() < new Date(item.endDate * 1000) ? (
      <DcaImage
        url={item.url}
        imageStyle={styles.labelImg}
        wrapStyle={styles.labelImgWrap}
      />
    ) : null
  );

  renderLabels = () => {
    const { productDetailsObj } = this.props;
    if (typeof productDetailsObj.actionIcons === 'undefined') return null;
    const arr = productDetailsObj.actionIcons;
    if (arr.length === 0) return null;
    return (
      <View style={styles.labelWrap}>
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={this.renderLabelItem}
          keyExtractor={(_item, index) => `${index}_icons`}
          contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          scrollEnabled={false}
        />
      </View>
    );
  }

  renderSlideImage = ({ item }) => (
    <View style={styles.slideWrap}>
      <DcaImage
        url={item[0]}
        imageStyle={styles.fullImg}
        useApectRatio
        ref={(ref) => { this.fullImgRef[item[2]] = ref; }}
        showEnlargedImage
      />
    </View>
  );

  renderImage = () => {
    const { productDetailsObj } = this.props;
    const { imagesArr } = this.state;
    if (imagesArr.length === 0) return null;

    const wrapWidth = productDetailsObj.actionIcons && productDetailsObj.actionIcons.length > 0 ? 300 : 360;

    return (
      <View style={[styles.fullImgWrap, { width: wrapWidth }]}>
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={imagesArr}
          renderItem={this.renderSlideImage}
          sliderWidth={wrapWidth}
          itemWidth={wrapWidth}
          loop
        />
      </View>
    );
  }

  renderThumbnailItem = ({ item }) => (
    <TouchableDebounce
      style={styles.thumbnailImgWrap}
      onPress={() => {
        this.carousel.snapToItem(item[2]);
      }}
      delayDuration={0}
    >
      <DcaImage
        url={item[1]}
        imageStyle={styles.thumbnailImg}
        resizeMode="cover"
      />
    </TouchableDebounce>
  );

  renderThumbnails = () => {
    const { imagesArr } = this.state;
    const { productDetailsObj } = this.props;

    const wrapWidth = productDetailsObj.actionIcons && productDetailsObj.actionIcons.length > 0 ? 300 : 360;

    return (
      <View>
        {
          imagesArr.length < 3 ? null : (
            <TouchableDebounce
              onPress={() => { this.carouselThumnail.snapToPrev(); }}
              style={styles.prevNavScrol}
            >
              <FontIcon
                type={icons.arrowBack[1]}
                icon={icons.arrowBack[0]}
                color={colors.text}
                size={15}
              />
            </TouchableDebounce>
          )
        }
        <Carousel
          ref={(c) => { this.carouselThumnail = c; }}
          data={imagesArr}
          renderItem={this.renderThumbnailItem}
          sliderWidth={wrapWidth}
          itemWidth={wrapWidth / 3}
          activeSlideOffset={0}
          activeSlideAlignment="start"
          loop
        />
        {
          imagesArr.length < 3 ? null : (
            <TouchableDebounce
              onPress={() => { this.carouselThumnail.snapToNext(); }}
              style={styles.nextNavScrol}
            >
              <FontIcon
                type={icons.arrowForward[1]}
                icon={icons.arrowForward[0]}
                color={colors.text}
                size={15}
              />
            </TouchableDebounce>
          )
        }
      </View>
    );
  }

  toggleCompare = (flag, compareCount) => {
    const { imagesArr } = this.state;
    const { productDetailsObj } = this.props;
    const {
      toggleProductCompare,
      toggleLoader,
      getCompareModalRef,
      translations
    } = this.context;
    helpers.analyticsAction({ actionType: 'product_comparison', actionObj: { 'a.action': 'compare_detailpage' } });
    if (!flag && compareCount > 3) {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'max_four_product_warning_alert', 'Maximum four products can be added'),
      );
      return;
    }

    const toggleCompareCb = () => {
      const { productCompare } = this.context;
      const isCompare = productCompare.includes(productDetailsObj.id);
      if (!isCompare) {
        Alert.alert(
          tr(translations, 'success', texts.alerts.success),
          tr(translations, 'product_removed_from_compare_alert', 'Product removed from compare')
        );
      } else {
        const imageUrl = imagesArr[0] ? imagesArr[0][0] : '';
        const setCompareModal = getCompareModalRef();
        setCompareModal(productDetailsObj.name, productDetailsObj.partnumberFormatted, imageUrl, productDetailsObj.id);
      }
      this.setState({ compareLoading: false });
    };

    this.setState({
      compareLoading: true
    }, () => {
      setTimeout(() => {
        toggleLoader(true);
        toggleProductCompare(productDetailsObj.id).then(() => {
          toggleLoader(false, toggleCompareCb);
        });
      }, 50);
    });
  }

  renderCompare = () => {
    const { productDetailsObj } = this.props;
    const { compareLoading } = this.state;
    const { productCompare, translations } = this.context;

    if (compareLoading) {
      return (
        <View style={styles.compareWrap}>
          <ActivityIndicator size="small" color={colors.secondaryColor} />
          <Text style={styles.compareTxt}>{tr(translations, 'compare', 'Compare')}</Text>
        </View>
      );
    }

    const isCompare = productCompare.includes(productDetailsObj.id);
    return (
      <TouchableDebounce
        style={styles.compareWrap}
        onPress={() => { this.toggleCompare(isCompare, productCompare.length); }}
        delayDuration={0}
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

  exportPdf = async () => {
    const { structureData, universal } = this.context;
    const { productDetailsData } = this.props;

    helpers.analyticsEvent(
      firebaseEvents.EXPORT_PRODUCT_DETAILS,
      {
        name: productDetailsData.name,
        productId: productDetailsData.id,
        orderNumber: productDetailsData.partnumberFormatted
      },
      universal
    );

    this.setState({
      exportLoading: true
    }, () => {

    });
    await productDetailsPdf(productDetailsData, structureData);
    this.setState({
      exportLoading: false
    });
  }

  renderExport = (universal, pageId, translations) => {
    const { exportLoading } = this.state;

    if (exportLoading) {
      return (
        <View style={styles.exportWrap}>
          <ActivityIndicator size="small" color={colors.secondaryColor} />
          <Text style={styles.exportTxt}>{tr(translations, 'export', 'Export')}</Text>
        </View>
      );
    }
    return (
      <TouchableDebounce
        style={styles.exportWrap}
        onPress={() => { this.exportPdf(); }}
        delayDuration={0}
        ref={(ref) => { this.exportRef = ref; }}
        removeClippedSubviews={false}
      >
        <FontIcon
          type={icons.logout_line[1]}
          icon={icons.logout_line[0]}
          color={
            universal.onboardingIds
              && universal.onboardingIds.productId === pageId
              && universal.viewedOnboardingStep === 8
              && !universal.onboardingSkiped
              ? '#fff'
              : colors.text
          }
          size={16}
        />
        <Text
          style={[
            styles.exportTxt,
            {
              color: universal.onboardingIds
                && universal.onboardingIds.productId === pageId
                && universal.viewedOnboardingStep === 8
                && !universal.onboardingSkiped
                ? '#fff'
                : colors.text
            }
          ]}
        >
          {tr(translations, 'export', 'Export')}
        </Text>
      </TouchableDebounce>
    );
  }

  renderOnboarding = () => {
    const { universal, pageId, translations } = this.context;
    const { isMounted } = this.state;
    if (!isMounted) return null;
    if (
      universal.onboardingIds
      && universal.onboardingIds.productId === pageId
      && universal.viewedOnboardingStep === 8
      && !universal.onboardingSkiped
    ) {
      return (
        <OnBoarding
          stepName={onBoardingSteps.EXPORT}
          nextCb={() => { this.onboardingNextCb(9); }}
          backCb={() => { this.onboardingBackCb(7); }}
          skipCb={() => { this.onboardingSkipCb(9); }}
          step={8}
          fromRef={this.exportRef}
          translations={translations}
          placement="right"
        />
      );
    }
    return null;
  }

  onboardingNextCb = async (step) => {
    const { saveUniversalData, universal, componentId } = this.context;
    await saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
    const highligherRef = globals.GET_APP_DATA('highligherRef');
    highligherRef.hide();
    Navigation.push(componentId, rootNavigation.getRoute[routes.SETTINGS]);
  }

  onboardingBackCb = async (step) => {
    const { saveUniversalData, universal } = this.context;
    await saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
  }

  onboardingSkipCb = (step) => {
    const { saveUniversalData } = this.context;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingSkiped: true
    });
  }

  render() {
    const { universal, pageId, translations } = this.context;
    return (
      <View style={styles.leftWrap}>
        <View style={styles.actionWrap}>
          {this.renderCompare()}
          {this.renderExport(universal, pageId, translations)}
        </View>
        <View style={styles.leftContentWrap}>
          {this.renderLabels()}
          {this.renderImage()}
        </View>
        {this.renderThumbnails()}
        {this.renderOnboarding()}
      </View>
    );
  }
}

LeftSection.contextType = PageContentContext;
export default LeftSection;
