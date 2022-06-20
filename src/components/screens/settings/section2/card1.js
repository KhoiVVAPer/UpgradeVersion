/* eslint-disable no-unused-vars */
/**
 * @fileoverview This is settings screen section-2 component.
 * @package
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  icons,
  appStyles,
  tr,
  appConstants,
  globals
} from '../../../../config';
import { Button, HtmlParser } from '../../../custom';
import OnBoarding from '../../../custom/onBoarding';
import APP_STRINGS from '../../../../assets/data/appStrings';
import styles from '../styles';
import appStyle from '../../../../assets/styles/appStyles';
import CardHead from '../cardHeader';

const { watchAgainTxt } = APP_STRINGS;
const { textCasing, onBoardingSteps } = appConstants;

class Card1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  renderOnboarding = () => {
    const { isMounted } = this.state;
    const {
      universal,
      onboardingNextCb,
      onboardingBackCb,
      onboardingSkipCb,
      translations
    } = this.props;

    if (!isMounted) return null;
    if (universal.viewedOnboardingStep === 11 && !universal.onboardingSkiped) {
      return (
        <OnBoarding
          stepName={onBoardingSteps.PLAY_ONBOARDING}
          nextCb={() => { onboardingNextCb(12); }}
          backCb={() => { onboardingBackCb(10); }}
          skipCb={() => { onboardingSkipCb(12); }}
          step={11}
          fromRef={this.playBynref}
          translations={translations}
        />
      );
    }
    return null;
  }

  playOnboarding = async () => {
    const { saveUniversalData } = this.props;
    globals.SET_APP_DATA('blockOnboarding', false);
    const rootNav = globals.GET_APP_DATA('rootNav');
    await saveUniversalData({
      viewedOnboardingStep: 0,
      onboardingPlay: true,
      onboardingSkiped: false
    });
    Navigation.popTo(rootNav.componentId);
  }

  render() {
    const { translations, universal } = this.props;
    return (
      <View style={[styles.cardMini, { ...appStyles.mgB20 }]}>
        <ScrollView
          style={appStyle.container}
          contentContainerStyle={appStyle.container}
        >
          <CardHead
            heading={tr(translations, 'watch_the_onboarding_again', 'Watch the onboarding again')}
            iconType={icons.information_sign[1]}
            icon={icons.information_sign[0]}
          />
          <View style={appStyle.container}>
            <HtmlParser
              html={tr(translations, 'settings_introduction_caption', watchAgainTxt)}
              textKey="settings-cardHead-sec2-card1-content"
              style={{ ...appStyles.lH(15) }}
            />
          </View>
          <View style={styles.playBtnWrap}>
            <View
              ref={(ref) => { this.playBynref = ref; }}
              removeClippedSubviews={false}
              style={styles.commonBtn}
            >
              <Button
                text={tr(translations, 'play', 'PLAY', textCasing.U)}
                onPress={() => { this.playOnboarding(); }}
                theme="app"
                transparent={universal.viewedOnboardingStep === 11 && !universal.onboardingSkiped}
              />
            </View>
          </View>
        </ScrollView>
        {this.renderOnboarding()}
      </View>
    );
  }
}

export default Card1;
