/**
 * @fileoverview This is settings screen component.
 * @package
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import analytics from '@react-native-firebase/analytics';
import {
  resetApp as reconstructApp,
  saveOfflineDownload as persistOfflineDownload,
  getOfflineDownload as fetchOfflineDownload,
  saveUniversalData as persistUniversalData,
  resetOfflineDownload as reconstructOfflineDownload
} from '../../../redux/actions';
import {
  appConstants,
  globals,
  appContexts,
  tr,
  helpers
} from '../../../config';
import {
  MainHoc,
  Button,
  HtmlParser
} from '../../custom';
import appStyles from '../../../assets/styles/appStyles';
import styles from './styles';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';

const { routes, textCasing } = appConstants;
const { PageContentContext } = appContexts;

class Settings extends Component {
  componentDidMount() {
    const { universal } = this.props;
    if (universal.analyticsTracking === null || universal.analyticsTracking) {
      analytics().logScreenView('Settings', appConstants.firebaseGenericPage);
    }
    const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
    breadCrumbRef.setBreadcrumbData([]);
  }

  goBack = () => {
    const { componentId } = this.props;
    Navigation.pop(componentId);
  }

  onboardingNextCb = async (step) => {
    const { saveUniversalData, universal } = this.props;
    setTimeout(async () => {
      await saveUniversalData({
        viewedOnboardingStep: step,
        onboardingPlay: universal.onboardingPlay
      });
    }, step === 10 ? 50 : 0);
    if (step === 10) {
      await helpers.manualDelay(500);
      this.pageScroll.scrollToEnd({ animated: false });
    }
    if (step === 12) {
      await helpers.manualDelay(500);
      saveUniversalData({ onboardingPlay: false });
      const highligherRef = globals.GET_APP_DATA('highligherRef');
      highligherRef.hide();

      const rootNav = globals.GET_APP_DATA('rootNav');
      Navigation.popTo(rootNav.componentId);
    }
  }

  onboardingBackCb = async (step) => {
    const { saveUniversalData, universal, componentId } = this.props;
    setTimeout(() => {
      saveUniversalData({
        viewedOnboardingStep: step,
        onboardingPlay: universal.onboardingPlay
      });
    }, step === 10 ? 50 : 0);
    if (step === 8) {
      setTimeout(() => {
        Navigation.pop(componentId);
      }, 500);
    }
    this.pageScroll.scrollToEnd({ animated: false });
  }

  onboardingSkipCb = (step) => {
    const { saveUniversalData } = this.props;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingSkiped: true
    });
  }

  renderHeader = (translations) => (
    <View style={styles.headerWrap}>
      <HtmlParser
        style={[appStyles.heading, styles.heading]}
        html={tr(translations, 'settings', 'SETTINGS', textCasing.U)}
        textKey="settings-pageHeading"
      />
      <View>
        <Button
          text={tr(translations, 'return_to_previous_page', 'Return to Previous page', textCasing.U)}
          onPress={() => this.goBack()}
          theme="app"
          style={styles.btn}
          txtStyle={styles.txtStyle}
        />
      </View>
    </View>
  );

  render() {
    const {
      countries,
      translations,
      resetApp,
      componentId,
      toggleLoader,
      getOfflineDownload,
      saveOfflineDownload,
      resetOfflineDownload,
      offlineDownload,
      getDowloadModalRef,
      textMarking,
      getMarkingModalRef,
      saveUniversalData,
      universal,
      mediaUrlArr
    } = this.props;
    return (
      <PageContentContext.Provider
        value={{
          textMarking,
          getMarkingModalRef
        }}
      >
        <View style={styles.container}>
          <ScrollView
            ref={(ref) => { this.pageScroll = ref; }}
            style={{}}
            contentContainerStyle={styles.scrollContainer}
          >
            {this.renderHeader(translations)}
            <View style={styles.contentWrap}>
              <Section1
                countries={countries}
                translations={translations}
                resetApp={resetApp}
                componentId={componentId}
                toggleLoader={toggleLoader}
                getOfflineDownload={getOfflineDownload}
                saveOfflineDownload={saveOfflineDownload}
                resetOfflineDownload={resetOfflineDownload}
                offlineDownload={offlineDownload}
                getDowloadModalRef={getDowloadModalRef}
                saveUniversalData={saveUniversalData}
                universal={universal}
                onboardingNextCb={this.onboardingNextCb}
                onboardingBackCb={this.onboardingBackCb}
                onboardingSkipCb={this.onboardingSkipCb}
                mediaUrlArr={mediaUrlArr}
              />
              <Section2
                translations={translations}
                saveUniversalData={saveUniversalData}
                universal={universal}
                onboardingNextCb={this.onboardingNextCb}
                onboardingBackCb={this.onboardingBackCb}
                onboardingSkipCb={this.onboardingSkipCb}
              />
              <Section3
                translations={translations}
                saveUniversalData={saveUniversalData}
                universal={universal}
              />
            </View>
          </ScrollView>
        </View>
      </PageContentContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries,
  translations: state.translations.arr,
  offlineDownload: state.offlineDownload,
  textMarking: state.textMarking,
  universal: state.universal,
  mediaUrlArr: state.mediaUrlArr.mediaUrls,
});

const mapDispatchToProps = (dispatch) => ({
  resetApp: (isCountryChanged) => reconstructApp(dispatch, isCountryChanged),
  getOfflineDownload: () => fetchOfflineDownload(dispatch),
  saveOfflineDownload: (offlineObj) => persistOfflineDownload(dispatch, offlineObj),
  saveUniversalData: (dataObj) => persistUniversalData(dispatch, dataObj),
  resetOfflineDownload: () => reconstructOfflineDownload(dispatch)
});

const SettingsRedux = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default MainHoc({
  screen: routes.SETTINGS,
  breadCrumb: true
})(SettingsRedux);
