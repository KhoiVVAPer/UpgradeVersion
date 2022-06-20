import React, { Component } from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  Image,
  Text
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { FontIcon, Button } from '../../generic';
import {
  globals,
  appConstants,
  images,
  icons,
  colors,
  tr
} from '../../../../config';
import styles from './styles';

const { onBoardingSteps, textCasing } = appConstants;

const PLACEMENT = {
  [onBoardingSteps.ROOT]: { top: 0, left: 0 },
  [onBoardingSteps.LOGO]: { top: 26, left: 12 },
  [onBoardingSteps.SCANNER]: { top: 5, left: 12, extraPadding: 5 },
  [onBoardingSteps.ONLINE_OFFLINE_INDICATOR]: { top: 11, left: 10 },
  [onBoardingSteps.FAVORITE]: { top: 1, left: 1, extraPadding: 1 },
  [onBoardingSteps.PRODUCT_COMPARE]: { top: 1, left: 1, extraPadding: 1 },
  [onBoardingSteps.MORE_INFORMATION_RIBBON]: { top: 60, left: 12 },
  [onBoardingSteps.ORDER_NUMBER]: { top: 90, left: 20 },
  [onBoardingSteps.EXPORT]: { top: 30, left: 8 },
  [onBoardingSteps.DOWNLOAD]: { top: 40, left: 10 },
  [onBoardingSteps.CHANGE_LANGUAGE]: { top: 40, left: 10 },
  [onBoardingSteps.PLAY_ONBOARDING]: { top: 30, left: 10 },
};

class OnBoardingHighlighter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      highlighterStyle: {
        height: 100,
        width: 100,
        top: 0,
        left: 0
      },
      onBoardingType: ''
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    globals.SET_APP_DATA('highligherRef', this);
  }

  show = (fromView, type) => {
    if (!fromView) return;
    setTimeout(() => {
      UIManager.measure(findNodeHandle(fromView), (x, y, width, height, pageX, pageY) => {
        const maxVal = height > width ? height : width;
        this.setState({
          isVisible: true,
          highlighterStyle: {
            height: maxVal + (PLACEMENT[type].extraPadding || 20),
            width: maxVal + (PLACEMENT[type].extraPadding || 20),
            top: pageY - PLACEMENT[type].top,
            left: pageX - PLACEMENT[type].left,
          },
          onBoardingType: type
        });
      });
    }, 200);
  }

  hide = () => {
    this.setState({
      isVisible: false
    });
  }

  componentDidAppear() {
    globals.SET_APP_DATA('highligherRef', this);
  }

  componentDidDisappear() { this.setState({ isVisible: false }); }

  renderContent = () => {
    const { onBoardingType } = this.state;
    const { translations } = this.props;

    switch (onBoardingType) {
      case onBoardingSteps.LOGO:
        return (
          <Image
            source={images.logo}
            style={{ width: 84, height: 30 }}
            resizeMode="contain"
          />
        );

      case onBoardingSteps.SCANNER:
        return (
          <View>
            <FontIcon
              type={icons.full_screen[1]}
              icon={icons.full_screen[0]}
              color={colors.text}
              size={17}
            />
          </View>
        );

      case onBoardingSteps.ONLINE_OFFLINE_INDICATOR:
        return (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 50,
              overflow: 'hidden',
              backgroundColor: '#4B8969'
            }}
          />
        );

      case onBoardingSteps.FAVORITE:
        return (
          <FontIcon
            type={icons.star[1]}
            icon={icons.star[0]}
            color={colors.black}
            size={16}
          />
        );

      case onBoardingSteps.PRODUCT_COMPARE:
        return (
          <FontIcon
            type={icons.machine_filled[1]}
            icon={icons.machine_filled[0]}
            color={colors.black}
            size={16}
          />
        );

      case onBoardingSteps.MORE_INFORMATION_RIBBON:
        return (
          <View>
            <Button
              text={tr(translations, 'more_information', 'MORE INFORMATION', textCasing.U)}
              theme="dark"
              onPress={() => { }}
            />
          </View>
        );

      case onBoardingSteps.ORDER_NUMBER:
        return (
          <View />
        );

      case onBoardingSteps.EXPORT:
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontIcon
              type={icons.logout_line[1]}
              icon={icons.logout_line[0]}
              color={colors.text}
              size={16}
            />
            <Text style={styles.exportTxt}>{tr(translations, 'export', 'Export')}</Text>
          </View>
        );

      case onBoardingSteps.DOWNLOAD:
        return (
          <View>
            <Button
              text={tr(translations, 'download', 'Download', textCasing.U)}
              onPress={() => { }}
              theme="app"
            />
          </View>
        );

      case onBoardingSteps.CHANGE_LANGUAGE:
        return (
          <View>
            <Button
              text={tr(translations, 'change', 'Change', textCasing.U)}
              onPress={() => { }}
              theme="app"
            />
          </View>
        );

      case onBoardingSteps.PLAY_ONBOARDING:
        return (
          <View>
            <Button
              text={tr(translations, 'play', 'PLAY', textCasing.U)}
              onPress={() => { }}
              theme="app"
            />
          </View>
        );

      default:
        return <View />;
    }
  }

  render() {
    const { isVisible, highlighterStyle } = this.state;

    if (!isVisible) return null;
    return (
      <View style={styles.wrap}>
        <View style={[styles.highlighter, highlighterStyle]}>
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  translations: state.translations.arr
});
const mapDispatchToProps = () => ({});
const OnBoardingHighlighterRedux = connect(mapStateToProps, mapDispatchToProps)(OnBoardingHighlighter);
export default OnBoardingHighlighterRedux;
