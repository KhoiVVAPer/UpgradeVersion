/**
 * @fileoverview This is app's header component.
 * It renders dynamic header content depending on which screen we are on.
 * @package
 */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  UIManager,
  findNodeHandle,
  Alert,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import { getProductDetailsByPartNoDb } from '../../../../realm/queries';
import TouchableDebounce from '../../elements/touchableDebounce';
import ScannerModal from './scannerModal';
import {
  colors,
  appConstants,
  globals,
  appContexts,
  icons,
  helpers,
  images,
  syncOfflineDownload,
  tr,
  texts,
  refHandler
} from '../../../../config';
import Onboarding from '../../onBoarding';
import {
  saveOfflineDownload as persistOfflineDownload,
  getOfflineDownload,
  saveUniversalData as persistUniversalData
} from '../../../../redux/actions';
import { searchSuggestions, getProductByPartNo } from '../../../../services';
import { rootNavigation } from '../../../../navigation';
import styles from './styles';
import LogoWrap from './logoWrap';

const {
  routes,
  downloadingFlags,
  onBoardingSteps,
  firebaseEvents,
  netType,
} = appConstants;
const { MainHocContext } = appContexts;

class Header extends Component {
  constructor(props) {
    super(props);

    const isDownloadingCanceled = globals.GET_APP_DATA('isDownloadingCanceled');
    this.state = {
      isNetConnected: false,
      searchText: '',
      pageTitle: '',
      isDownloadingCanceled,
      showDownloadingIco: true,
      isMounted: false,
      showScanner: false,
    };
    this.isComponentMounted = true;
    this.parentDataObj = {};
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    this.appNetInfoLiteners();
    this.getPageTitle();
    this.navigationEventListener = Navigation.events().bindComponent(this);
    globals.SET_APP_DATA('headerRef', this);
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getPageTitle = async () => {
    const { pageId } = this.props;

    const rootNav = globals.GET_APP_DATA('rootNav');
    const structureData = globals.GET_APP_DATA('structureData');
    const checkParent = globals.GET_APP_DATA('checkParent');

    let title = '';
    if (checkParent) {
      try {
        const parentId = await helpers.getRootPage(pageId, 'header');
        // eslint-disable-next-line eqeqeq
        const parentObj = structureData.find((item) => (item.id == parentId));
        this.parentDataObj = parentObj;

        if (parentObj) {
          title = parentObj.title.toLocaleUpperCase();
        }
      } catch (error) {
        title = '';
      }
    } else if (rootNav.title) {
      title = rootNav.title.toLocaleUpperCase();
    }
    this.setState({ pageTitle: title });
  }

  checkDownloadStatus = () => {
    const isDownloadingCanceled = globals.GET_APP_DATA('isDownloadingCanceled');
    this.setState({ isDownloadingCanceled });
  }

  toggleDownloadingIco = (flag) => { this.setState({ showDownloadingIco: flag }); }

  componentSetState = (obj) => new Promise((resolve) => {
    this.setState({
      ...obj
    }, () => {
      resolve();
    });
  });

  appNetInfoLiteners = () => {
    const handler = (state) => {
      const isDownloadingWaiting = globals.GET_APP_DATA('isDownloadingWaiting');
      if (isDownloadingWaiting) globals.SET_APP_DATA('killOfflineDownload', false);
      this.processOfflineDownload(state);
    };
    NetInfo.addEventListener(async (state) => {
      globals.SET_APP_DATA('isNetConnected', state.isConnected);
      this.setState({
        isNetConnected: state.isConnected
      });
      handler(state);
    });
  }

  processOfflineDownload = async (state) => {
    if (this.isComponentMounted) {
      const { offlineDownload, saveOfflineDownload, universal } = this.props;

      const flagArr = [
        offlineDownload.proffesional,
        offlineDownload.home_and_garden,
        offlineDownload.proffesional_media_flag,
        offlineDownload.home_and_garden_media_flag
      ];

      const isDownloadingWaiting = globals.GET_APP_DATA('isDownloadingWaiting');
      const isSyncWaiting = globals.GET_APP_DATA('isSyncWaiting');
      const isDownloadingCanceled = globals.GET_APP_DATA('isDownloadingCanceled');
      const connectionType = await helpers.getConnectionType();

      if (connectionType === netType.CELLULAR && !universal.useMobiledata) {
        refHandler.cancelDbDownload();
        refHandler.cancelMediaDownload();
      }

      if (flagArr.includes(downloadingFlags.DOWNLOADING) && !state.isConnected) {
        refHandler.cancelDbDownload();
        refHandler.cancelMediaDownload();
        globals.SET_APP_DATA('isDownloadingWaiting', true);
        return;
      }

      /**
       * Resuming the download
       */
      if (
        (
          (isDownloadingWaiting && connectionType === netType.WIFI)
          || (isDownloadingWaiting && connectionType === netType.CELLULAR && universal.useMobiledata)
        )
        && state.isConnected
        && !isDownloadingCanceled
      ) {
        const professionalChecked = offlineDownload.proffesional !== downloadingFlags.NONE;
        const homeChecked = offlineDownload.home_and_garden !== downloadingFlags.NONE;
        globals.SET_APP_DATA('isDownloadingWaiting', false);
        globals.SET_APP_DATA('isDownloadingCanceled', false);
        this.checkDownloadStatus();
        refHandler.downloadInit({ professionalChecked, homeChecked, isResumeMode: true });
      }

      /**
       * Resuming sync download
       */
      if (
        (
          (isSyncWaiting && connectionType === netType.WIFI)
          || (isSyncWaiting && connectionType === netType.CELLULAR && universal.useMobiledata)
        )
        && state.isConnected
        && !isDownloadingCanceled
      ) {
        globals.SET_APP_DATA('isSyncWaiting', false);
        // eslint-disable-next-line react/destructuring-assignment
        syncOfflineDownload(this.props.offlineDownload, saveOfflineDownload, universal.useMobiledata);
      }
    }
  }

  submitSearchResult = () => {
    const { resetSuggessions, } = this.context;
    const searchText = this.searchInput._lastNativeText;
    resetSuggessions();
    this.setState({
      searchText
    }, () => {
      this.goToSearchPage();
    });
  }

  goToSearchPage = () => {
    const {
      componentId,
      resetSuggessions,
      setupSuggessionsFlag
    } = this.context;
    const { universal } = this.props;
    const { searchText } = this.state;
    helpers.analyticsEvent(
      firebaseEvents.SEARCH_RESULT,
      {
        searchText
      },
      universal
    );

    setupSuggessionsFlag(true);
    resetSuggessions();
    Navigation.push(
      componentId,
      rootNavigation.searchPage({
        passProps: { searchText }
      })
    );
  }

  navigateToRoot = () => {
    const { componentId } = this.context;
    const rootNav = globals.GET_APP_DATA('rootNav');
    const catalogueNames = globals.GET_APP_DATA('catalogueNames');
    const catalogueIds = globals.GET_APP_DATA('catalogueIds');

    const checkParent = globals.GET_APP_DATA('checkParent');
    if (checkParent) {
      let rootId = null;
      if (catalogueNames.HOME_AND_GARDEN === this.parentDataObj.title) {
        rootId = catalogueIds.HOME_AND_GARDEN;
      }
      if (catalogueNames.PROFESSIONAL === this.parentDataObj.title) {
        rootId = catalogueIds.PROFESSIONAL;
      }
      globals.SET_APP_DATA('rootNav', { componentId: String(rootId), title: this.parentDataObj.title });
      globals.SET_APP_DATA('catalogueSwitch', {
        passProps: { pageId: rootId },
        pageId: String(rootId)
      });
      Navigation.popToRoot(componentId);
    } else {
      Navigation.popTo(rootNav.componentId);
    }
  }

  navigateToProductFinder = () => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.productFinder({
        passProps: {

        }
      })
    );
  }

  downloadDb = () => {
    const { offlineDownload } = this.props;
    if (
      offlineDownload.proffesional === downloadingFlags.DOWNLOADING
      || offlineDownload.home_and_garden === downloadingFlags.DOWNLOADING
      || offlineDownload.home_and_garden_media_flag === downloadingFlags.DOWNLOADING
      || offlineDownload.proffesional_media_flag === downloadingFlags.DOWNLOADING
    ) {
      refHandler.showDownloadModal();
    }
  }

  renderDownloadIco = () => {
    const { isDownloadingCanceled, showDownloadingIco } = this.state;
    const { offlineDownload } = this.props;
    const flagArr = [
      offlineDownload.proffesional,
      offlineDownload.home_and_garden,
      offlineDownload.proffesional_media_flag,
      offlineDownload.home_and_garden_media_flag
    ];
    if (
      (offlineDownload.proffesional === downloadingFlags.NONE
        && offlineDownload.home_and_garden === downloadingFlags.NONE)
      || isDownloadingCanceled
      || !showDownloadingIco
    ) {
      return null;
    }

    if (!flagArr.includes(downloadingFlags.DOWNLOADING)) {
      return null;
    }

    return (
      <TouchableDebounce onPress={() => { this.downloadDb(); }}>
        <Image
          source={images.download}
          style={styles.downloadIco}
          resizeMode="contain"
        />
      </TouchableDebounce>
    );
  }

  renderActiveUnit = () => {
    const { pageTitle } = this.state;
    const { screen, pageId } = this.props;
    const showMenu = { display: screen === routes.HOME || pageId === 0 ? 'none' : 'flex' };

    return (
      <TouchableDebounce
        onPress={() => this.navigateToRoot()}
        style={styles.menuItemWrap}
      >
        <Text style={[styles.menuItemBold, showMenu]}>{pageTitle}</Text>
      </TouchableDebounce>
    );
  }

  renderProductFinder = () => {
    const { pageTitle } = this.state;
    const { screen, pageId } = this.props;
    const showMenu = { display: screen === routes.HOME || pageId === 0 ? 'none' : 'flex' };

    return (
      <TouchableDebounce
        onPress={() => this.navigateToProductFinder()}
        style={styles.menuItemWrap}
      >
        <Text style={[styles.menuItemBold, showMenu]}>PRODUCT FINDER</Text>
      </TouchableDebounce>
    );
  }

  autoCompleteInit = async (searchText) => {
    const isNetConnected = await helpers.isNetConnected();

    const {
      setupSuggesstions,
      resetSuggessions,
      setupSuggessionsFlag
    } = this.context;

    setupSuggessionsFlag(false);
    resetSuggessions();
    this.setState({
      searchText
    }, async () => {
      if (!isNetConnected) return;
      const suggestions = await searchSuggestions(searchText);
      if (suggestions.length > 0) {
        UIManager.measure(findNodeHandle(this.inputWrapRef), (x, y, width, height, pageX, pageY) => {
          // eslint-disable-next-line react/destructuring-assignment
          if (this.state.searchText) setupSuggesstions(suggestions, pageX, pageY, width, height);
        });
      }
    });
  }

  setSearchText = (searchText) => {
    this.setState({ searchText }, () => {
      // this.searchInput.focus();
      this.goToSearchPage();
    });
  }

  onboardingNextCb = (step) => {
    const { saveUniversalData, universal } = this.props;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
  }

  onboardingBackCb = (step) => {
    const { saveUniversalData, universal } = this.props;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
    if (step === 0) {
      const highligherRef = globals.GET_APP_DATA('highligherRef');
      highligherRef.hide();
    }
  }

  onboardingSkipCb = (step) => {
    const { saveUniversalData } = this.props;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingSkiped: true
    });
  }

  renderOnboarding = () => {
    const { universal, translations } = this.props;
    const { startscreen } = this.context;
    const { isMounted } = this.state;
    if (!isMounted) return null;

    if (startscreen && universal.viewedOnboardingStep === 2 && !universal.onboardingSkiped) {
      return (
        <Onboarding
          stepName={onBoardingSteps.SCANNER}
          nextCb={() => { this.onboardingNextCb(3); }}
          backCb={() => { this.onboardingBackCb(1); }}
          skipCb={() => { this.onboardingSkipCb(3); }}
          step={2}
          fromRef={this.scanIcoRef}
          key={`onboarding-${onBoardingSteps.SCANNER}`}
          translations={translations}
        />
      );
    }

    if (startscreen && universal.viewedOnboardingStep === 3 && !universal.onboardingSkiped) {
      return (
        <Onboarding
          stepName={onBoardingSteps.ONLINE_OFFLINE_INDICATOR}
          nextCb={() => { this.onboardingNextCb(4); }}
          backCb={() => { this.onboardingBackCb(2); }}
          skipCb={() => { this.onboardingSkipCb(4); }}
          step={3}
          fromRef={this.onlineIndicatorRef}
          key={`onboarding-${onBoardingSteps.ONLINE_OFFLINE_INDICATOR}`}
          translations={translations}
        />
      );
    }
    return null;
  }

  scannerResponse = async (e) => {
    const { componentId } = this.context;
    const { toggleLoader, translations } = this.props;

    let partNo = null;
    if (e.data.includes('/')) {
      const arr = e.data.split('/');
      partNo = arr[arr.length - 2];
    } else {
      partNo = e.data.substring(0, e.data.length - 6);
    }

    this.setState({
      showScanner: false
    }, () => {
      setTimeout(async () => {
        toggleLoader(true);

        let pageId = null;
        const productDetailsProf = await getProductDetailsByPartNoDb(partNo, Config.PROFESSIONAL_DATABASE);
        const productDetailsHg = await getProductDetailsByPartNoDb(partNo, Config.HOME_AND_GARDEN_DATABASE);

        if (!productDetailsProf && !productDetailsHg) {
          const isNetConnected = await helpers.isNetConnected();
          if (isNetConnected) {
            pageId = await getProductByPartNo(partNo);
          } else {
            toggleLoader(false);
            setTimeout(() => {
              Alert.alert(
                tr(translations, 'warning', texts.alerts.warning),
                tr(translations, 'data_can_not_be_loaded', 'Data can not be loaded as you are offline')
              );
            }, 500);
            return;
          }
        } else if (productDetailsProf) {
          pageId = productDetailsProf.productId;
        } else {
          pageId = productDetailsHg.productId;
        }

        toggleLoader(false);
        setTimeout(() => {
          Navigation.push(
            componentId,
            rootNavigation.pageContent({
              passProps: {
                pageId,
                isScanner: true,
                checkParent: true
              }
            })
          );
        }, 500);
      }, 500);
    });
  }

  scannerToggle = () => {
    const { showScanner } = this.state;
    this.setState({
      showScanner: !showScanner
    });
  }

  renderScannerModal = () => {
    const { showScanner } = this.state;

    if (!showScanner) return null;

    return (
      <ScannerModal
        scannerResponse={this.scannerResponse}
        scannerToggle={this.scannerToggle}
      />
    );
  }

  productFinderNavigation = () => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.productFinder()
    );
  }

  componentDidAppear() {
    globals.SET_APP_DATA('headerRef', this);
    this.checkDownloadStatus();
    this.isComponentMounted = true;
  }

  componentDidDisappear() {
    this.isComponentMounted = false;
  }

  render() {
    const { startscreen } = this.context;
    const {
      screen,
      pageId,
      translations,
      universal
    } = this.props;
    const { isNetConnected } = this.state;
    const showMenu = { display: screen === routes.HOME || pageId === 0 ? 'none' : 'flex' };

    let onlineColor = 'red';
    if (startscreen && universal.viewedOnboardingStep === 3 && !universal.onboardingSkiped) {
      onlineColor = '#fff';
    } else if (isNetConnected) {
      onlineColor = '#4B8969';
    }

    const autoCompleteInit = _.debounce(this.autoCompleteInit, 500);
    return (
      <View style={styles.wrap}>
        <LogoWrap
          universal={universal}
          onboardingNextCb={this.onboardingNextCb}
          onboardingBackCb={this.onboardingBackCb}
          onboardingSkipCb={this.onboardingSkipCb}
          translations={translations}
        />
        <View style={styles.menuWrap}>
          {this.renderActiveUnit()}

          {/* {
            screen !== 'productFinder' &&
            <View style={{ paddingLeft: '10%' }}>
              {this.renderProductFinder()}
            </View>
          } */}

          {/* <View style={styles.menuItemWrap}>
            <Text style={styles.menuItem}>{tr(translations, 'programme', 'PROGRAMME', textCasing.U)} {globals.CURRENT_YEAR}</Text>
          </View> */}
        </View>
        <View style={styles.searchWrap}>
          <View
            style={[styles.searchInputWrap, showMenu]}
            ref={(ref) => { this.inputWrapRef = ref; }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                ref={(ref) => { this.searchInput = ref; }}
                placeholderTextColor="#989898"
                placeholder={tr(translations, 'search_for_product_or_keyword', 'Search For Product or Keyword')}
                onChangeText={autoCompleteInit}
                // value={searchText}
                style={styles.searchInput}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onSubmitEditing={this.submitSearchResult}
              />
              <View ref={(ref) => { this.suggestionsTooltip = ref; }} />
            </View>
            <FontIcon
              type="EvilIcons"
              icon="search"
              color={colors.borderColor}
              size={25}
              wrapStyle={showMenu}
              onPress={this.submitSearchResult}
            />
          </View>
          <View
            ref={(ref) => { this.scanIcoRef = ref; }}
            removeClippedSubviews={false}
          >
            <FontIcon
              type={icons.full_screen[1]}
              icon={icons.full_screen[0]}
              color={
                startscreen
                  && universal.viewedOnboardingStep === 2
                  && !universal.onboardingSkiped
                  ? '#fff'
                  : colors.text
              }
              size={17}
              onPress={() => {
                this.scannerToggle();
              }}
              wrapStyle={[styles.scannerIcon, showMenu]}
            />
          </View>
          <View
            style={[
              styles.searchIco,
              showMenu,
              { backgroundColor: onlineColor }
            ]}
            ref={(ref) => { this.onlineIndicatorRef = ref; }}
            removeClippedSubviews={false}
          />
          {this.renderDownloadIco()}
        </View>
        {this.renderScannerModal()}
        {this.renderOnboarding()}
      </View>
    );
  }
}

Header.contextType = MainHocContext;
const mapStateToProps = (state) => ({
  universal: state.universal,
  translations: state.translations.arr,
  offlineDownload: state.offlineDownload
});
const mapDispatchToProps = (dispatch) => ({
  getOfflineDownload: () => getOfflineDownload(dispatch),
  saveOfflineDownload: (offlineObj) => persistOfflineDownload(dispatch, offlineObj),
  saveUniversalData: (dataObj, tempSkip = false) => persistUniversalData(dispatch, dataObj, tempSkip)
});
const HeaderRedux = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderRedux;
