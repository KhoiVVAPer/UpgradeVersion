import React, { Component } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  HtmlParser,
  TouchableDebounce,
  FontIcon
} from '../../../custom';
import {
  icons,
  appStyles,
  versionDetails,
  tr,
  helpers,
  colors
} from '../../../../config';
import styles from '../styles';
import appStyle from '../../../../assets/styles/appStyles';
import CardHead from '../cardHeader';

class Card1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleAnalyticsEnable = async () => {
    const { saveUniversalData, universal } = this.props;

    const flag = universal.analyticsTracking === null || universal.analyticsTracking;
    await analytics().logScreenView(!flag);
    saveUniversalData({
      analyticsTracking: !flag
    });
  }

  renderAnalyticsEnable = () => {
    const { universal, translations } = this.props;

    return (
      <TouchableDebounce
        style={[
          styles.downloadItem,
          { ...appStyles.mgT(20) }
        ]}
        onPress={this.toggleAnalyticsEnable}
      >
        <View style={styles.checkbox}>
          <FontIcon
            type={icons.done[1]}
            icon={icons.done[0]}
            color={colors.text}
            wrapStyle={{ display: universal.analyticsTracking || universal.analyticsTracking === null ? 'flex' : 'none' }}
            size={8}
          />
        </View>
        <Text style={styles.downloadLbl}>
          {tr(translations, 'enable_analytics_tracking', 'Enable analytics tracking')}
        </Text>
      </TouchableDebounce>
    );
  }

  render() {
    const { translations } = this.props;

    return (
      <View style={[styles.cardMini, { ...appStyles.mgB20 }]}>
        <CardHead
          heading={tr(translations, 'info_and_version', 'Info & Version')}
          iconType={icons.question_sign[1]}
          icon={icons.question_sign[0]}
        />
        <View style={appStyle.container}>
          <HtmlParser
            html={`${tr(translations, 'version', 'Version')} ${Platform.OS === 'ios' ? versionDetails.versionIOS : versionDetails.versionAndroid}${helpers.getAppEnv()}`}
            textKey="settings-cardHead-sec3-card1-version"
          />
          <HtmlParser
            html={`${tr(translations, 'launched_in', 'Launched in')} ${versionDetails[Platform.OS === 'ios' ? 'iosReleaseDate' : 'androidReleaseDate']}`}
            textKey="settings-cardHead-sec3-card1-launch"
          />
          {this.renderAnalyticsEnable()}
        </View>
      </View>
    );
  }
}

export default Card1;
