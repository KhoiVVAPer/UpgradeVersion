/**
 * @fileoverview Logo wrap in header is render from this component.
 * @package
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Onboarding from '../../onBoarding';
import {
  appContexts,
  images,
  appConstants
} from '../../../../config';
import styles from './styles';

const { onBoardingSteps } = appConstants;
const { MainHocContext } = appContexts;

class LogoWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
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
    const { startscreen } = this.context;
    if (!isMounted) return null;

    if (startscreen && universal.viewedOnboardingStep === 1 && !universal.onboardingSkiped) {
      return (
        <Onboarding
          stepName={onBoardingSteps.LOGO}
          nextCb={() => { onboardingNextCb(2); }}
          backCb={() => { onboardingBackCb(0); }}
          skipCb={() => { onboardingSkipCb(2); }}
          step={1}
          fromRef={this.logoWrapRef}
          translations={translations}
        />
      );
    }
    return null;
  }

  render() {
    const { componentId, startscreen } = this.context;
    const { universal } = this.props;
    return (
      <View>
        <View
          style={[styles.headerlogoWrap]}
          removeClippedSubviews={false}
          ref={(ref) => { this.logoWrapRef = ref; }}
        >
          <TouchableOpacity
            onPress={() => Navigation.popToRoot(componentId)}
            style={styles.logoImgTouch}
          >
            {
              startscreen && universal.viewedOnboardingStep === 1 && !universal.onboardingSkiped
                ? null : (
                  <Image
                    source={images.logo}
                    style={styles.logoImg}
                    resizeMode="contain"
                  />
                )
            }
          </TouchableOpacity>
        </View>
        {this.renderOnboarding()}
      </View>
    );
  }
}

LogoWrap.contextType = MainHocContext;
export default LogoWrap;
