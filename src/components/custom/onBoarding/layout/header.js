import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { FontIcon } from '../../generic';
import {
  appConstants,
  icons,
  colors,
  tr
} from '../../../../config';
import styles from '../styles';

const { onBoardingSteps } = appConstants;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  renderHeader = () => {
    const { stepName, translations } = this.props;
    switch (stepName) {
      case onBoardingSteps.LOGO:
        return (
          <View style={styles.headerWrap}>
            <Text style={styles.heading}>{tr(translations, 'onboarding_logo_heading', 'Zurück zum Anfang')}</Text>
          </View>
        );

      case onBoardingSteps.SCANNER:
        return (
          <View style={styles.headerWrap}>
            <Text style={styles.heading}>{tr(translations, 'onboarding_scanner_heading', 'Scan')}</Text>
          </View>
        );

      case onBoardingSteps.ONLINE_OFFLINE_INDICATOR:
        return (
          <View style={styles.headerWrap}>
            <Text style={styles.heading}>{tr(translations, 'onboarding_onlineOfflineIndicator_heading', 'Statusanzeige')}</Text>
            <View style={styles.onlineIndicators}>
              <FontIcon
                type={icons.circle[1]}
                icon={icons.circle[0]}
                color={colors.green}
                size={13}
              />
              <FontIcon
                type={icons.circle[1]}
                icon={icons.circle[0]}
                color={colors.red}
                size={13}
              />
            </View>
          </View>
        );

      case onBoardingSteps.FAVORITE:
        return (
          <View style={styles.headerWrap}>
            <FontIcon
              type={icons.star[1]}
              icon={icons.star[0]}
              color={colors.black}
              size={15}
              wrapStyle={{ marginRight: 10 }}
            />
            <Text style={styles.heading}>{tr(translations, 'onboarding_favorite_heading', 'Favoriten')}</Text>
          </View>
        );

      case onBoardingSteps.PRODUCT_COMPARE:
        return (
          <View style={styles.headerWrap}>
            <FontIcon
              type={icons.machine_filled[1]}
              icon={icons.machine_filled[0]}
              color={colors.black}
              size={15}
              wrapStyle={{ marginRight: 10 }}
            />
            <Text style={styles.heading}>{tr(translations, 'onboarding_productCompare_heading', 'Produktvergleich')}</Text>
          </View>
        );

      case onBoardingSteps.MORE_INFORMATION_RIBBON:
        return (
          <View style={styles.headerWrap}>
            <Text style={styles.heading}>{tr(translations, 'onboarding_moreInformationRibbon_heading', 'Mehr Informationen')}</Text>
          </View>
        );

      case onBoardingSteps.ORDER_NUMBER:
        return (
          <View style={styles.headerWrap}>
            <Text style={styles.heading}>{tr(translations, 'onboarding_orderNumber_heading', 'Markieren und Kommentieren')}</Text>
          </View>
        );
      case onBoardingSteps.EXPORT:
        return (
          <View style={styles.headerWrap}>
            <FontIcon
              type={icons.logout_line[1]}
              icon={icons.logout_line[0]}
              color={colors.black}
              size={15}
              wrapStyle={{ marginRight: 10 }}
            />
            <Text style={styles.heading}>{tr(translations, 'onboarding_export_heading', 'Seitenexport')}</Text>
          </View>
        );

      case onBoardingSteps.DOWNLOAD:
        return (
          <View style={styles.headerWrap}>
            <FontIcon
              type={icons.save_filled[1]}
              icon={icons.save_filled[0]}
              color={colors.black}
              size={15}
              wrapStyle={{ marginRight: 10 }}
            />
            <Text style={styles.heading}>{tr(translations, 'onboarding_download_heading', 'Offlinenutzung')}</Text>
          </View>
        );
      case onBoardingSteps.CHANGE_LANGUAGE:
        return (
          <View style={styles.headerWrap}>
            <FontIcon
              type={icons.chat_filled[1]}
              icon={icons.chat_filled[0]}
              color={colors.black}
              size={15}
              wrapStyle={{ marginRight: 10 }}
            />
            <Text style={styles.heading}>{tr(translations, 'onboarding_changeLanguage_heading', 'Sprachenwechsel')}</Text>
          </View>
        );

      case onBoardingSteps.PLAY_ONBOARDING:
        return (
          <View style={styles.headerWrap}>
            <FontIcon
              type={icons.home_filled[1]}
              icon={icons.home_filled[0]}
              color={colors.black}
              size={15}
              wrapStyle={{ marginRight: 10 }}
            />
            <Text style={styles.heading}>{tr(translations, 'onboarding_playOnboarding_heading', 'Noch einmal ansehen')}</Text>
          </View>
        );

      default:
        return (
          <View>
            <Text>Zurück zum Anfang</Text>
          </View>
        );
    }
  }

  render() {
    return this.renderHeader();
  }
}

Header.propTypes = {
  stepName: PropTypes.string.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Header;
