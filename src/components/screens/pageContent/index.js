/**
 * @fileoverview This is dynamic page screen component.
 * All the screens which uses pageContent api will be rendered from this screen
 * @package
 */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  findNodeHandle,
  UIManager,
  Linking,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
// import { ACPCore } from '@adobe/react-native-acpcore';
import {connect} from 'react-redux';
import {
  ScrollIntoView,
  wrapScrollViewConfigured,
} from 'react-native-scroll-into-view';
import {
  appConstants,
  helpers,
  appContexts,
  globals,
  resumeDownload,
  syncOfflineDownload,
  setDefaultMarking,
  tr,
  colors,
  icons,
  dbMigration,
  initAdobeSdk,
} from '../../../config';
import {
  getProductGroups as fetchProductGroups,
  getSubProductGroups as fetchSubProductGroups,
  getSubProductGroupsArr as fetchSubProductGroupsArr,
  getProductList as fetchProductList,
  getTranslationData as fetchTranslationData,
  getPageData as fetchPageData,
  getContries as fetchContries,
  getStructureList as fetchStructureList,
  getProductDetails as fetchProductDetails,
  toggleProductCompare as switchProductCompare,
  getMarkingText as fetchMarkingText,
  getOfflineDownload as fetchOfflineDownload,
  saveOfflineDownload as persistOfflineDownload,
  getMediaUrl as fetchMediaUrl,
  getUniversalData as fetchUniversalData,
  saveUniversalData as persistUniversalData,
  saveMarkingText as persistMarkingText,
  productFinder as getProductFinder,
} from '../../../redux/actions';
import {getOnboardingPagesService} from '../../../services';
import {
  MainHoc,
  LayoutManager,
  ErrorView,
  Loading,
  FontIcon,
} from '../../custom';
import OnBoardingModal from './onBoardingModal';
import appStyles from '../../../assets/styles/appStyles';
import styles from './styles';
import {ACPAnalytics} from '@adobe/react-native-acpanalytics';
import {
  ACPCore,
  ACPLifecycle,
  ACPIdentity,
  ACPSignal,
  ACPMobileLogLevel,
} from '@adobe/react-native-acpcore';

// import {
//   headlineText,
//   textContent,
//   ribbon,
//   imageHeadlineText,
//   imageHeadlineTextFiftyFifty,
//   fullWidthImage,
//   imageHeadlineTextTwoCol,
//   imageHeadlineTextThreeCol,
//   imageHeadlineTextFourCol,
//   horizontalRule,
//   anchors,
//   table
// } from '../../../assets/data/pageContent';

const {routes, layouts} = appConstants;
const {PageContentContext} = appContexts;

const CustomScrollView = wrapScrollViewConfigured({
  options: {align: 'top'},
})(ScrollView);

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,
      pageConfigured: true,
      pageLoading: true,
    };
    this.scrollY = 0;
    this.anchorRef = null;
    this.anchorContentRef = null;
    this.ribbonRef = null;
    this.hideRibbonTriggered = false;
  }

  async componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        console.log('Linking URL===>', url);
        if (url) {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
            }
          });
        }
      })
      .catch(e => handleErrorSomehow(e));

    Linking.addEventListener('url', event => {
      console.log('Linking event===>', event);
      Linking.canOpenURL(event.url).then(supported => {
        if (supported) {
          yourCustomMethodToHandleUrl(event.url);
        }
      });
    });
    console.log('ACPCore==>', ACPCore);
    console.log('ACPLifecycle==>', ACPLifecycle);
    console.log('ACPIdentity==>', ACPIdentity);
    console.log('ACPSignal==>', ACPSignal);
    console.log('ACPMobileLogLevel==>', ACPMobileLogLevel);

    const {pageId, isConfiguring} = this.props;

    if (isConfiguring) this.setState({pageConfigured: false});

    if (pageId === 0) globals.SET_APP_DATA('rootPageRef', this);
    this.initPageContent();
    ACPAnalytics.extensionVersion().then(version =>
      console.log('AdobeExperienceSDK: ACPAnalytics version: ' + version),
    );
  }

  getContries = () => {
    const {countries, getContries} = this.props;
    if (countries.loading) {
      getContries();
    }
  };

  getTextMarkingData = () =>
    new Promise(resolve => {
      const {getMarkingText, textMarking} = this.props;
      if (textMarking.length === 0) {
        getMarkingText().then(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });

  getTranslations = () =>
    new Promise(resolve => {
      const {getTranslationData, translations} = this.props;
      if (translations.loading) {
        getTranslationData().then(() => {
          this.getPageData();
          resolve();
        });
      } else {
        this.getPageData();
        resolve();
      }
    });

  getStructure = () =>
    new Promise(resolve => {
      const {getStructureList, structureData} = this.props;
      const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
      if (structureData.length === 0) {
        getStructureList().then(data => {
          const arr = typeof data === 'object' ? data : JSON.parse(data);
          if (breadCrumbRef) breadCrumbRef.setBreadcrumbData(arr);
          globals.SET_APP_DATA('structureData', arr);
          resolve();
        });
      } else {
        const arr =
          typeof structureData === 'object'
            ? structureData
            : JSON.parse(structureData);
        if (breadCrumbRef) breadCrumbRef.setBreadcrumbData(arr);
        resolve();
      }
    });

  triggerOnboarding = () =>
    new Promise(async resolve => {
      const {getUniversalData, universal, saveUniversalData, saveMarkingText} =
        this.props;

      if (!universal.loaded) {
        await getUniversalData();
        // eslint-disable-next-line react/destructuring-assignment
        if (!this.props.universal.onboardingIds) {
          const onboardingIds = await getOnboardingPagesService();
          await saveUniversalData({
            onboardingIds: JSON.stringify(onboardingIds),
          });
          setDefaultMarking(saveMarkingText, onboardingIds.productId);
        }
      }
      resolve();
    });

  startConfiguring = () => {
    this.setState({pageConfigured: false});
  };

  initPageContent = async () => {
    const {
      toggleProductCompare,
      productCompare,
      getOfflineDownload,
      offlineDownload,
      saveOfflineDownload,
      universal,
      mediaUrlArr,
      getMediaUrl,
      pageId,
      productFinder,
      productFinderReducer,
    } = this.props;
    //* * Configure analytics for app */
    await this.configureAnalytics();

    //* * Getting cognito authentication key */
    helpers.getCongnitoToken();

    //* * Getting language and countries from database */
    this.getContries();

    //* * Getting marking data from database */
    await this.getTextMarkingData();

    //* * Getting Translation from api/database */
    await this.getTranslations();

    //* * Getting app structure from api/database */
    await this.getStructure();

    //* * Getting product finder group data */
    productFinderReducer && !productFinderReducer.arr.length && productFinder();

    //* * Getting product list added for compare from database */
    if (!productCompare.length) await toggleProductCompare();

    //* * Getting offline data download status from database */
    if (!offlineDownload.loaded) await getOfflineDownload();

    //* * Getting media url from database */
    if (mediaUrlArr.loading) await getMediaUrl();

    //* * Getting onboarding data from database */
    await this.triggerOnboarding();

    //* * Handle database migration */
    // eslint-disable-next-line react/destructuring-assignment
    await dbMigration(this.props.universal, pageId);

    //* * Cache app data */
    helpers.cacheAppData();

    //* * If download not completed resume download */
    // eslint-disable-next-line react/destructuring-assignment
    resumeDownload(this.props.offlineDownload, universal);

    //* * If all data downloaded locally then sync data from api daily */
    // eslint-disable-next-line react/destructuring-assignment
    syncOfflineDownload(
      this.props.offlineDownload,
      saveOfflineDownload,
      universal.useMobiledata,
    );

    //* * Stop page configuring/loading loader */
    this.setState({
      pageConfigured: true,
      pageLoading: false,
    });
    // eslint-disable-next-line react/destructuring-assignment
    globals.SET_APP_DATA('translationsArr', this.props.translations.arr);
  };

  configureAnalytics = async () => {
    const {pageId, universal} = this.props;
    if (pageId === 0) {
      let flag = false;
      if (universal.analyticsTracking === null || universal.analyticsTracking) {
        flag = true;
      }
      await analytics().setAnalyticsCollectionEnabled(flag);
      if (flag) {
        initAdobeSdk();
        ACPCore.trackState('pageContent', {mytest: 'state'});
      }
    }
  };

  getPageData = () => {
    const {pageData, getPageData, pageId} = this.props;
    if (
      !pageData[pageId] ||
      pageData[pageId].loading ||
      pageData[pageId].error
    ) {
      getPageData(pageId);
    }
  };

  moveToTop = () => {
    this.scrollView.scrollTo({y: 0, animated: true});
  };

  setAnchorRef = ref => {
    this.anchorRef = ref;
  };

  navigateTo = section => {
    const ref = this[`"${section}"`];
    if (ref) {
      ref.scrollIntoView();
    }
  };

  getProductListData = () =>
    new Promise(resolve => {
      const {productList} = this.props;
      resolve(productList);
    });

  getReduxData = type =>
    new Promise(resolve => {
      const {productList, productDetails, favourite} = this.props;
      switch (type) {
        case 'productDetails':
          resolve(productDetails);
          break;
        case 'productList':
          resolve(productList);
          break;
        case 'favourite':
          resolve(favourite);
          break;
        default:
          break;
      }
    });

  toggleScroll = () => {
    this.setState({scrollEnabled: false});
  };

  handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 25) {
      if (!this.hideRibbonTriggered) {
        this.hideRibbonTriggered = true;
        if (this.ribbonRef) this.ribbonRef.hideDesc();
      }
    } else {
      this.hideRibbonTriggered = false;
      if (this.ribbonRef) this.ribbonRef.showDesc();
    }
  };

  onScrollEndDrag = e => {
    this.scrollY = e.nativeEvent.contentOffset.y;
    // this.changeAnchorFlag();
  };

  onMomentumScrollEnd = e => {
    this.scrollY = e.nativeEvent.contentOffset.y;
    this.changeAnchorFlag();
  };

  changeAnchorFlag = () => {
    if (this.anchorRef) {
      const {pageData, pageId} = this.props;
      const pageContent = pageData[pageId].obj.content;
      pageContent.map(item => {
        UIManager.measure(
          findNodeHandle(this[`"${item.id}"`]),
          (x, y, width, height, pageX, pageY) => {
            UIManager.measure(
              findNodeHandle(this.anchorContentRef),
              (x1, y1, width1, height1, pageX1, pageY1) => {
                const anchorY = pageY1 + height1;
                if (pageY <= anchorY && anchorY <= pageY1 + height) {
                  this.anchorRef.setAnchor(item.id);
                }
              },
            );
          },
        );
        return null;
      });
    }
  };

  getScrollY = () => this.scrollY;

  reloadPage = () => {
    const {getPageData, pageId} = this.props;
    getPageData(pageId);
  };

  skipStartPageOnboarding = () => {
    const {saveUniversalData} = this.props;
    saveUniversalData({
      viewedOnboardingStep: 1,
      onboardingSkiped: true,
    });
  };

  nextStartPageOnboarding = () => {
    const {saveUniversalData, universal} = this.props;
    saveUniversalData({
      viewedOnboardingStep: 1,
      onboardingPlay: universal.onboardingPlay,
    });
  };

  renderStartPageOnboarding = () => {
    const {startscreen, universal, translations} = this.props;
    const blockOnboarding = globals.GET_APP_DATA('blockOnboarding');
    if (blockOnboarding) return null;
    if (!startscreen) return null;
    if (universal.viewedOnboardingStep >= 1) return null;
    return (
      <OnBoardingModal
        skipStartPageOnboarding={this.skipStartPageOnboarding}
        nextStartPageOnboarding={this.nextStartPageOnboarding}
        translations={translations.arr}
      />
    );
  };

  setRibbonRef = ref => {
    this.ribbonRef = ref;
  };

  renderFixLayout = (
    pageContent,
    layoutType,
    isRibbonRef = false,
    translations,
  ) =>
    pageContent.map(item => {
      const layoutData = JSON.parse(item.config);

      const extraProps = isRibbonRef ? {setRibbonRef: this.setRibbonRef} : {};
      if (layoutData.layout === layoutType) {
        return this.renderLayoutItem(
          item,
          pageContent.length + 1,
          true,
          extraProps,
          translations,
        );
      }
      return null;
    });

  renderLayoutItem = (
    item,
    index,
    showFixContent = false,
    extraProps = {},
    translations,
  ) => {
    const {scrollEnabled} = this.state;
    const {
      getProductGroups,
      getSubProductGroups,
      pageId,
      productFinderReducer,
    } = this.props;
    const containerStyle = pageId !== 0 && scrollEnabled ? {} : {flex: 1};
    return (
      <ScrollIntoView
        ref={ref => {
          this[`"${item.id}"`] = ref;
        }}
        key={index}
        style={containerStyle}>
        <LayoutManager
          layoutData={item.config}
          layoutType={item.type}
          getProductGroups={getProductGroups}
          getSubProductGroups={getSubProductGroups}
          productFinderContent={productFinderReducer.arr}
          moveToTop={this.moveToTop}
          navigateTo={this.navigateTo}
          showFixContent={showFixContent}
          translations={translations && translations.arr}
          {...extraProps}
        />
      </ScrollIntoView>
    );
  };

  renderScrollToTop = pageContent => {
    const {scrollEnabled} = this.state;
    const {pageId} = this.props;

    if (pageId === 0 || !scrollEnabled) return null;

    let overViewPageStyle = {};
    pageContent.forEach(item => {
      if (item.type && item.type === layouts.PRODUCT_GROUPS_OVERVIEW) {
        overViewPageStyle = {backgroundColor: colors.bg};
      }
    });

    return (
      <View style={[styles.moveTopWrap, overViewPageStyle]}>
        <FontIcon
          type={icons.upArrowNew[1]}
          icon={icons.upArrowNew[0]}
          color={colors.text}
          size={40}
          onPress={() => this.moveToTop()}
          delayDuration={0}
        />
      </View>
    );
  };

  render() {
    const {scrollEnabled, pageConfigured, pageLoading} = this.state;
    const {
      pageData,
      pageId,
      componentId,
      getProductList,
      getProductDetails,
      textMarking,
      productActiveAnchor,
      getFavouriteModalRef,
      favourite,
      productCompare,
      toggleProductCompare,
      toggleLoader,
      getCompareModalRef,
      getMarkingModalRef,
      translations,
      universal,
      saveUniversalData,
      getSubProductGroupsArr,
      subProductGroupList,
      isScanner,
      structureData,
    } = this.props;
    if (!pageConfigured)
      return <Loading configuring translations={translations} />;
    if (pageLoading) return <Loading translations={translations} />;
    if (!pageData[pageId] || pageData[pageId].loading)
      return <Loading translations={translations} />;
    if (
      (pageData[pageId].error ||
        !pageData[pageId].obj ||
        !pageData[pageId].obj.content) &&
      pageId !== 1000
    ) {
      const isNetConnected = globals.GET_APP_DATA('isNetConnected');
      const errorProps = {
        reloadPage: this.reloadPage,
        settings: true,
        isNetConnected,
        componentId,
        isScanner: isScanner || false,
        error: isNetConnected
          ? tr(
              translations.arr,
              'not_available_online',
              'Sorry, this content is not availble at the moment',
            )
          : tr(
              translations.arr,
              'not_available',
              'Sorry, this content is at the moment not availble because you are offline.\nPlease try again later',
            ),
      };
      return <ErrorView {...errorProps} componentId={componentId} />;
    }

    const containerStyle = pageId !== 0 && scrollEnabled ? {} : {flex: 1};

    const pageContent = pageData[pageId].obj.content;
    // if (pageId === 1000) {
    //   pageContent = [
    //     ribbon,
    //     textContent,
    //     anchors,
    //     headlineText,
    //     imageHeadlineText,
    //     imageHeadlineTextFiftyFifty,
    //     imageHeadlineTextFourCol,
    //     fullWidthImage,
    //     imageHeadlineTextTwoCol,
    //     imageHeadlineTextThreeCol,
    //     horizontalRule,
    //     table
    //   ];
    // }

    return (
      <PageContentContext.Provider
        value={{
          pageData,
          pageId,
          getProductList,
          getProductDetails,
          textMarking,
          getProductListData: this.getProductListData,
          componentId,
          getReduxData: this.getReduxData,
          toggleScroll: this.toggleScroll,
          productActiveAnchor,
          getFavouriteModalRef,
          favourite,
          productCompare,
          toggleProductCompare,
          toggleLoader,
          getCompareModalRef,
          getMarkingModalRef,
          translations: translations.arr,
          universal,
          saveUniversalData,
          subProductGroupList,
          getSubProductGroupsArr,
          getScrollY: this.getScrollY,
          setAnchorRef: this.setAnchorRef,
          structureData,
        }}>
        {this.renderFixLayout(pageContent, layouts.RIBBON, true)}
        <View
          ref={ref => {
            this.anchorContentRef = ref;
          }}>
          {this.renderFixLayout(pageContent, layouts.ANCHOR)}
        </View>
        <CustomScrollView
          style={styles.container}
          ref={ref => {
            this.scrollView = ref;
          }}
          contentContainerStyle={containerStyle}
          scrollEnabled={scrollEnabled}
          onScroll={this.handleScroll}
          onScrollEndDrag={this.onScrollEndDrag}
          onMomentumScrollEnd={this.onMomentumScrollEnd}>
          <View style={appStyles.container}>
            {this.renderFixLayout(
              pageContent,
              layouts.IMAGE_COLLECTION,
              translations,
            )}
            {pageContent.map((item, index) =>
              this.renderLayoutItem(item, index + 1, false, null, translations),
            )}
          </View>
          {this.renderScrollToTop(pageContent)}
        </CustomScrollView>
        {this.renderStartPageOnboarding()}
      </PageContentContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  translations: state.translations,
  pageData: state.pageData,
  countries: state.countries,
  productList: state.productList,
  structureData: state.structureData,
  productDetails: state.productDetails,
  productCompare: state.productCompare,
  favourite: state.favourite,
  textMarking: state.textMarking,
  offlineDownload: state.offlineDownload,
  mediaUrlArr: state.mediaUrlArr,
  universal: state.universal,
  subProductGroupList: state.subProductGroupList,
  productFinderReducer: state.productFinderReducer,
});
const mapDispatchToProps = dispatch => ({
  getTranslationData: data => fetchTranslationData(dispatch, data),
  getStructureList: () => fetchStructureList(dispatch),
  getPageData: pageId => fetchPageData(dispatch, pageId),
  getProductGroups: productgroupId =>
    fetchProductGroups(dispatch, productgroupId),
  getSubProductGroups: productgroupId =>
    fetchSubProductGroups(dispatch, productgroupId),
  getSubProductGroupsArr: productgroupIdArr =>
    fetchSubProductGroupsArr(dispatch, productgroupIdArr),
  getProductList: productgroupId => fetchProductList(dispatch, productgroupId),
  getProductDetails: productId => fetchProductDetails(dispatch, productId),
  toggleProductCompare: productId => switchProductCompare(dispatch, productId),
  getContries: () => fetchContries(dispatch),
  getMarkingText: () => fetchMarkingText(dispatch),
  getOfflineDownload: () => fetchOfflineDownload(dispatch),
  getMediaUrl: () => fetchMediaUrl(dispatch),
  saveOfflineDownload: offlineObj =>
    persistOfflineDownload(dispatch, offlineObj),
  getUniversalData: () => fetchUniversalData(dispatch),
  saveUniversalData: dataObj => persistUniversalData(dispatch, dataObj),
  saveMarkingText: markingData => persistMarkingText(dispatch, markingData),
  productFinder: () => getProductFinder(dispatch),
});
const PageContentRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageContent);
export default MainHoc({
  screen: routes.PAGE_CONTENT,
  breadCrumb: true,
})(PageContentRedux);
