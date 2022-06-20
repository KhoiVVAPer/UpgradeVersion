/**
 * @fileoverview This is settings screen section-1 component.
 * @package
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { appConstants } from '../../../../config';
import OnBoarding from '../../../custom/onBoarding';
import styles from '../styles';
import Card1 from './card1';
import Card2 from './card2';

const { onBoardingSteps } = appConstants;

class Section1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false
    };

    this.languageBtnRef = null;
    this.downloadBtnRef = null;
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  setLanguageBtnRef = (ref) => {
    this.languageBtnRef = ref;
  }

  setDownloadBtnRef = (ref) => {
    this.downloadBtnRef = ref;
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

    if (universal.viewedOnboardingStep === 9 && !universal.onboardingSkiped) {
      return (
        <OnBoarding
          stepName={onBoardingSteps.DOWNLOAD}
          nextCb={() => { onboardingNextCb(10); }}
          backCb={() => { onboardingBackCb(8); }}
          skipCb={() => { onboardingSkipCb(10); }}
          step={9}
          fromRef={this.downloadBtnRef}
          key={`onboarding-${onBoardingSteps.DOWNLOAD}`}
          translations={translations}
          placement="right"
        />
      );
    }
    if (universal.viewedOnboardingStep === 10 && !universal.onboardingSkiped) {
      return (
        <OnBoarding
          stepName={onBoardingSteps.CHANGE_LANGUAGE}
          nextCb={() => { onboardingNextCb(11); }}
          backCb={() => { onboardingBackCb(9); }}
          skipCb={() => { onboardingSkipCb(11); }}
          step={10}
          fromRef={this.languageBtnRef}
          placement="top"
          key={`onboarding-${onBoardingSteps.CHANGE_LANGUAGE}`}
          translations={translations}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.section1}>
        <Card1
          {...this.props}
          setDownloadBtnRef={this.setDownloadBtnRef}
        />
        <Card2
          {...this.props}
          setLanguageBtnRef={this.setLanguageBtnRef}
        />
        {this.renderOnboarding()}
      </View>
    );
  }
}

export default Section1;
