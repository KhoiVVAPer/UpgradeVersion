/**
 * @fileoverview This is app's breadcrumb component.
 * It renders dynamic breadcrumb content depending on which screen we are on.
 * @package
 */
import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import _ from 'lodash';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import TouchableDebounce from '../../elements/touchableDebounce';
import { saveUniversalData as universalDataPersist } from '../../../../redux/actions';
import {
  colors,
  icons,
  appConstants,
  appContexts,
  globals,
  texts,
  tr,
  helpers
} from '../../../../config';
import Onboarding from '../../onBoarding';
import { rootNavigation } from '../../../../navigation';
import styles from './styles';

const { routes, onBoardingSteps, analyticsEvents } = appConstants;
const { MainHocContext } = appContexts;

const staticRoutes = [
  routes.SETTINGS,
  routes.FAVOURITE,
  routes.PRODUCT_COMPARE,
  routes.SEARCH_PAGE,
  routes.PRODUCTFINDER
];

class BreadCrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structureData: [],
      dataLoaded: false,
      navigationObjArr: [],
      isMounted: false,
      isBackBtn: false
    };
    this.navigationObjArr = [];
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    globals.SET_APP_DATA('breadCrumbRef', this);
  }

  setBreadcrumbData = (structureData) => {
    const { pageId } = this.context;
    this.setState({
      dataLoaded: true,
      structureData
    }, () => {
      this.buildNavigationInit(pageId);
      this.setupAnalytics();
    });
  }

  setupAnalytics = () => {
    const { universal } = this.props;
    const { structureData } = this.state;
    const { pageId } = this.context;
    if (structureData.length !== 0) {
      const pageObj = structureData.find((item) => (item.id === pageId));
      if (pageObj) {
        if (universal.analyticsTracking === null || universal.analyticsTracking) {
          analytics().logScreenView(`${String(pageId)}-${pageObj.title}`, pageObj.type);
        }
      }
    }
  }

  buildNavigationInit = (pageId) => {
    const { structureData } = this.state;
    const activeRouteObj = _.find(structureData, { id: parseInt(pageId) });
    if (activeRouteObj) {
      this.navigationObjArr = [activeRouteObj];
      this.buildNavigation(activeRouteObj);
    } else {
      this.setState({
        navigationObjArr: [...this.navigationObjArr].reverse()
      });
    }
  }

  buildNavigation = (nav) => {
    const { structureData } = this.state;
    if (nav && nav.parentId) {
      const activeRouteObj = _.find(structureData, { id: parseInt(nav.parentId) });
      this.navigationObjArr.push(activeRouteObj);
      this.buildNavigation(activeRouteObj);
    } else {
      this.setState({
        navigationObjArr: [...this.navigationObjArr].reverse()
      });
    }
  }

  navigate = (routeName) => {
    const { componentId } = this.context;
    Navigation.push(componentId, rootNavigation.getRoute[routeName]);
  }

  goBack = () => {
    const { goBack } = this.context;
    goBack();
  }

  goBackTo = (item) => {
    const { goBackTo } = this.context;

    goBackTo(item);
  }

  getStaticNavigation = (pageId) => {
    const { screen } = this.context;
    const { translations, countries } = this.props;
    const navArr = [];
    const back = tr(translations, 'back', 'Back');
    let title = '';
    if (screen === routes.SETTINGS) title = tr(translations, 'settings', 'Settings');
    if (screen === routes.FAVOURITE) title = tr(translations, 'favorite', 'Favorite');
    if (screen === routes.SEARCH_PAGE) title = tr(translations, 'search_result', 'Search result');
    if (screen === routes.PRODUCT_COMPARE) title = tr(translations, 'product_comparison', 'Product comparison');
    if (screen === routes.PRODUCTFINDER) title = tr(translations, 'product_finder', 'Product Finder');
    const country = countries.slectedCountry && countries.slectedCountry.code;
    const language = countries.selectedLanguage && countries.selectedLanguage.languageCode;
    const appType = 'mobile'
    let contextData = {
      'a.state': this.replaceSpaceByDash(screen),
      'us.ma': country,
      'us.la': language,
      'app.t': appType,
      'us.lg': 'guest',
      'pg.id': pageId,
      'pg.pgid': ''
    }
    this.configureAnalytics(screen, contextData)
    return (
      <View style={styles.nav}>
        <View style={styles.navInner}>
          {navArr}
          <TouchableDebounce
            onPress={() => { this.goBack(); }}
            style={styles.navTxtWrap}
          >
            <Text style={styles.navTxtBold}>{title}</Text>
          </TouchableDebounce>
          <TouchableDebounce
            onPress={() => this.goBack()}
            style={styles.backTxtWrap}
          >
            <FontIcon
              type={icons.arrow_left_sign[1]}
              icon={icons.arrow_left_sign[0]}
              color={colors.text}
              size={12}
              innerWrapStyle={{ padding: 8, paddingVertical: 4 }}
            />
            <Text style={styles.backTxt}>{back}</Text>
          </TouchableDebounce>
        </View>
      </View>
    );
  }

  setBackBtn = () => {
    this.setState({ isBackBtn: true });
  }

  renderBackBtn = (back) => (
    <View style={styles.nav}>
      <View style={styles.navInner}>
        <TouchableDebounce
          onPress={() => this.goBack()}
          style={styles.backTxtWrap}
        >
          <FontIcon
            type={icons.arrow_left_sign[1]}
            icon={icons.arrow_left_sign[0]}
            color={colors.text}
            size={12}
            innerWrapStyle={{ padding: 8, paddingVertical: 4 }}
          />
          <Text style={styles.backTxt}>{back}</Text>
        </TouchableDebounce>
      </View>
    </View>
  );

  // abc def xyz  --->   abc_def_xyz
  // replaceSpaceByDash = str => (str || '').toLowerCase().replaceAll(' ', '_');
  replaceSpaceByDash = (str) => {
    const lowerCaseStr = (str || '').toLowerCase().replace(' ', '_');
    return lowerCaseStr;
  };

  configureAnalytics = (state, stateData, status) => {
    helpers.pageInfoAnalytics({ pageState: state, pageName: stateData });
  }

  getNavigation = (pageId) => {
    const { navigationObjArr, dataLoaded, isBackBtn } = this.state;
    const { translations, countries } = this.props;
    const back = tr(translations, 'back', 'Back');
    if (!dataLoaded) {
      return <ActivityIndicator size="small" color={colors.secondaryColor} />;
    }

    if (!navigationObjArr.length || isBackBtn) return this.renderBackBtn(back);

    if (navigationObjArr.length < 2) return null;

    let navigation = (<View />);
    if (navigationObjArr.length === 2) {
      return (
        <View style={styles.nav}>
          <View style={styles.navInner}>
            {/* <TouchableDebounce
            onPress={() => this.goBack()}
            style={styles.navTxtWrap}
          >
            <Text style={styles.navTxt}>{`${tr(translations, 'programme', 'Programme')} ${globals.CURRENT_YEAR}`}</Text>
          </TouchableDebounce>
          <Text style={styles.navTxt}>{' > '}</Text> */}
            <Text style={styles.navTxtBold}>{navigationObjArr[1].title}</Text>
            <TouchableDebounce
              onPress={() => this.goBack()}
              style={styles.backTxtWrap}
            >
              <FontIcon
                type={icons.arrow_left_sign[1]}
                icon={icons.arrow_left_sign[0]}
                color={colors.text}
                size={12}
                innerWrapStyle={{ padding: 8, paddingVertical: 4 }}
              />
              <Text style={styles.backTxt}>{back}</Text>
            </TouchableDebounce>
          </View>
        </View>
      );
    }

    const arr = [];
    const country = countries.slectedCountry && countries.slectedCountry.code;
    const language = countries.selectedLanguage && countries.selectedLanguage.languageCode;
    const appType = 'mobile'
    navigationObjArr.map((item, index) => {
      let contextData = {
        'a.state': this.replaceSpaceByDash(item && item.title),
        'app.s': navigationObjArr.map(navObj => this.replaceSpaceByDash(navObj.title)).join(':'),
        'us.ma': country,
        'us.la': language,
        'app.t': appType,
        'us.lg': 'guest',
        'pg.id': pageId,
        'pg.pgid': ''
      };

      this.configureAnalytics(this.replaceSpaceByDash(navigationObjArr[1] && navigationObjArr[1].title), contextData);
      if (index < 2) return null;
      const navStyle = index === navigationObjArr.length - 1 ? styles.navTxtBold : styles.navTxt;
      const currentKey = helpers.strToKey(item.title);
      arr.push((
        <TouchableDebounce
          key={currentKey}
          onPress={() => this.goBackTo(item)}
          style={styles.navTxtWrap}
        >
          <Text style={navStyle}>{item.title}</Text>
        </TouchableDebounce>
      ));
      if (index !== navigationObjArr.length - 1) {
        arr.push((
          <Text
            key={`arrow_${currentKey}`}
            style={styles.navTxt}
          >
            {' > '}
          </Text>
        ));
      }
      return null;
    });
    navigation = (
      <View style={styles.nav}>
        <View style={styles.navInner}>
          {arr}
          <TouchableDebounce
            onPress={() => this.goBack()}
            style={styles.backTxtWrap}
          >
            <FontIcon
              type={icons.arrow_left_sign[1]}
              icon={icons.arrow_left_sign[0]}
              color={colors.text}
              size={12}
              innerWrapStyle={{ padding: 8, paddingVertical: 4 }}
            />
            <Text style={styles.backTxt}>{back}</Text>
          </TouchableDebounce>
        </View>
      </View>
    );

    return navigation;
  }

  renderCompareCount = () => {
    const { productCompare } = this.props;

    if (productCompare.length === 0) return null;

    return (
      <View style={styles.compareCountWrap}>
        <Text style={styles.compareCountTxt}>{productCompare.length}</Text>
      </View>
    );
  }

  renderOnboarding = () => {
    const { universal, translations } = this.props;
    const { startscreen } = this.context;
    const { isMounted } = this.state;
    if (!isMounted) return null;

    if (startscreen && universal.viewedOnboardingStep === 4 && !universal.onboardingSkiped) {
      return (
        <Onboarding
          stepName={onBoardingSteps.FAVORITE}
          nextCb={() => { this.onboardingNextCb(5); }}
          backCb={() => { this.onboardingBackCb(3); }}
          skipCb={() => { this.onboardingSkipCb(5); }}
          step={4}
          fromRef={this.favIcoRef}
          key={`onboarding-${onBoardingSteps.FAVORITE}`}
          translations={translations}
        />
      );
    }
    if (startscreen && universal.viewedOnboardingStep === 5 && !universal.onboardingSkiped) {
      return (
        <Onboarding
          stepName={onBoardingSteps.PRODUCT_COMPARE}
          nextCb={() => { this.onboardingNextCb(6); }}
          backCb={() => { this.onboardingBackCb(4); }}
          skipCb={() => { this.onboardingSkipCb(6); }}
          step={5}
          fromRef={this.compareIcoRef}
          key={`onboarding-${onBoardingSteps.PRODUCT_COMPARE}`}
          translations={translations}
        />
      );
    }
    return null;
  }

  onboardingNextCb = async (currentStep) => {
    const { componentId } = this.context;
    const { saveUniversalData, universal } = this.props;
    let step = currentStep;
    if (!universal.showMoreInformationStep && step === 6) step += 1;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
    if (step === 6) {
      const { onboardingIds } = universal;

      const highligherRef = globals.GET_APP_DATA('highligherRef');
      highligherRef.hide();
      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: { pageId: onboardingIds.productGroupId }
        })
      );
    }
    if (step === 7) {
      const { onboardingIds } = universal;
      const highligherRef = globals.GET_APP_DATA('highligherRef');
      highligherRef.hide();

      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: { pageId: onboardingIds.productId }
        })
      );
    }
  }

  onboardingBackCb = async (step) => {
    const { saveUniversalData, universal } = this.props;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
  }

  onboardingSkipCb = (step) => {
    const { saveUniversalData } = this.props;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingSkiped: true
    });
  }

  render() {
    const { screen, pageId, startscreen } = this.context;
    const { productCompare, translations, universal } = this.props;

    if (pageId === 0) return null;

    const isStaticRoute = staticRoutes.includes(screen);
    return (
      <View style={styles.wrap}>
        <View style={styles.left}>
          {
            isStaticRoute
              ? this.getStaticNavigation(pageId)
              : this.getNavigation(pageId)
          }
        </View>
        <View style={styles.right}>
          {/* <FontIcon
            type={icons.list[1]}
            icon={icons.list[0]}
            color={colors.black}
            size={16}
            wrapStyle={styles.settingIco}
            onPress={() => {
              const { componentId } = this.context;
              Navigation.push(
                componentId,
                rootNavigation.pageContent({
                  passProps: { pageId: 912 }
                  // passProps: { pageId: 1000 }
                })
              );
            }}
          /> */}
          <View
            ref={(ref) => { this.favIcoRef = ref; }}
            removeClippedSubviews={false}
          >
            <FontIcon
              type={icons.star[1]}
              icon={icons.star[0]}
              color={startscreen
                && universal.viewedOnboardingStep === 4
                && !universal.onboardingSkiped
                ? '#fff'
                : colors.black}
              size={16}
              wrapStyle={styles.settingIco}
              onPress={() => {
                if (screen !== routes.FAVOURITE) {
                  this.navigate(routes.FAVOURITE);
                }
              }}
            />
          </View>
          <View
            ref={(ref) => { this.compareIcoRef = ref; }}
            removeClippedSubviews={false}
          >
            {this.renderCompareCount()}
            <FontIcon
              type={icons.machine_filled[1]}
              icon={icons.machine_filled[0]}
              color={startscreen
                && universal.viewedOnboardingStep === 5
                && !universal.onboardingSkiped
                ? '#fff'
                : colors.black}
              size={16}
              wrapStyle={styles.settingIco}
              onPress={() => {
                if (productCompare.length === 0) {
                  Alert.alert(
                    tr(translations, 'warning', texts.alerts.warning),
                    tr(translations, 'no_product_is_added_for_comparison_alert', 'No product is added for comparison')
                  );
                  return;
                }
                if (screen !== routes.PRODUCT_COMPARE) {
                  this.navigate(routes.PRODUCT_COMPARE);
                }
              }}
            />
          </View>
          <FontIcon
            type={icons.settings_filled[1]}
            icon={icons.settings_filled[0]}
            color={colors.black}
            size={16}
            wrapStyle={styles.settingIco}
            onPress={() => {
              if (screen !== routes.SETTINGS) {
                this.navigate(routes.SETTINGS);
              }
            }}
          />
        </View>
        {this.renderOnboarding()}
      </View>
    );
  }
}

BreadCrumb.contextType = MainHocContext;
const mapStateToProps = (state) => ({
  translations: state.translations.arr,
  productCompare: state.productCompare,
  universal: state.universal,
  countries: state.countries,
});
const mapDispatchToProps = (dispatch) => ({
  saveUniversalData: (dataObj, tempSkip = false) => universalDataPersist(dispatch, dataObj, tempSkip)
});
const BreadCrumbRedux = connect(mapStateToProps, mapDispatchToProps)(BreadCrumb);
export default BreadCrumbRedux;
