import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Popover from 'react-native-popover-view';
import PropTypes from 'prop-types';
import { globals } from '../../../config';
import {
  Header,
  Content,
  CloseIcon,
  Footer
} from './layout';
import styles from './styles';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isVisible: true
      }, () => {
        setTimeout(() => {
          this.showHighlighter();
        }, 500);
      });
    }, 200);
    this.showHighlighter();
  }

  showHighlighter = () => {
    const { fromRef, stepName } = this.props;
    globals.SET_APP_DATA('onBoardingRef', this);
    const highligherRef = globals.GET_APP_DATA('highligherRef');
    if (highligherRef) {
      highligherRef.show(fromRef, stepName);
    } else {
      setTimeout(() => {
        this.showHighlighter();
      }, 500);
    }
  }

  closePopup = () => {
    const { skipCb } = this.props;

    const highligherRef = globals.GET_APP_DATA('highligherRef');
    highligherRef.hide();
    this.setState({
      isVisible: false
    }, () => {
      skipCb();
    });
  }

  render() {
    const { isVisible } = this.state;
    const {
      stepName,
      nextCb,
      backCb,
      fromRef,
      placement,
      translations,
      showMoreInformationStep
    } = this.props;
    let { step } = this.props;
    let totalSteps = 10;
    if (showMoreInformationStep) totalSteps = 11;
    else if (step > 6) {
      step -= 1;
    }
    return (
      <Popover
        isVisible={isVisible}
        fromView={fromRef}
        placement={placement}
        onRequestClose={() => { }}
        popoverStyle={styles.popoverStyle}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        verticalOffset={10}
        animationConfig={{ duration: 0 }}
      >
        <View style={styles.wrap}>
          <CloseIcon closePopup={this.closePopup} />
          <Header
            stepName={stepName}
            translations={translations}
          />
          <Content
            stepName={stepName}
            translations={translations}
          />
          <Footer
            stepNumber={step}
            totalSteps={totalSteps}
            nextCb={nextCb}
            backCb={backCb}
            translations={translations}
          />
        </View>
      </Popover>
    );
  }
}

Onboarding.propTypes = {
  stepName: PropTypes.string.isRequired,
  nextCb: PropTypes.func.isRequired,
  backCb: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  fromRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,
  placement: PropTypes.string,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired,
  showMoreInformationStep: PropTypes.bool
};
Onboarding.defaultProps = {
  placement: 'bottom',
  showMoreInformationStep: false
};

const mapStateToProps = (state) => ({
  showMoreInformationStep: state.universal.showMoreInformationStep
});
const mapDispatchToProps = () => ({});
const OnboardingRedux = connect(mapStateToProps, mapDispatchToProps)(Onboarding);

export default OnboardingRedux;
