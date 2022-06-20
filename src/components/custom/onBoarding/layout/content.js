/* eslint-disable max-len */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { FontIcon, HtmlParser } from '../../generic';
import {
  appConstants,
  tr,
  icons,
  colors,
  appStyles,
  helpers
} from '../../../../config';
import styles from '../styles';

const { onBoardingSteps } = appConstants;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  renderContent = () => {
    const { stepName, translations } = this.props;

    const stepKey = helpers.strToKey(stepName);

    switch (stepName) {
      case onBoardingSteps.LOGO:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_logo_description', 'Klicken Sie auf das Kärcher-Logo, um zum Startbildschirm zurück zu gelangen. Sie kommen so auch zurück zu den Bereichen Home & Garden sowie Professional.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.SCANNER:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_scanner_description', 'Scan')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.ONLINE_OFFLINE_INDICATOR:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_onlineOfflineIndicator_description', 'Über die Statusanzeige sehen Sie auf einen Blick, ob die Anwendung online oder offline ist.\n\nBitte beachten Sie, dass die Daten nur aktualisiert werden, wenn Sie online sind.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.FAVORITE:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_favorite_description', 'Hier können Sie Ihre gespeicherten Favoriten finden und verwalten.\n\nEine Seite speichern Sie ganz einfach als Favorit, indem Sie das Sternsymbol anklicken.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.PRODUCT_COMPARE:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_productCompare_description1', 'Innerhalb unserer App haben Sie die Möglichkeit Produkte\nzu vergleichen. Klicken Sie einfach die folgende Option an:')}
              textKey={`onboarding-content1-${stepKey}`}
              style={styles.contentTxt}
            />
            <View style={styles.compareWrap}>
              <FontIcon
                type={icons.checkboxEmpty[1]}
                icon={icons.checkboxEmpty[0]}
                color={colors.text}
                size={16}
                wrapStyle={{ ...appStyles.mgR(10) }}
              />
              <Text style={styles.contentTxt}>{tr(translations, 'compare', 'Compare')}</Text>
            </View>
            <HtmlParser
              html={tr(translations, 'onboarding_productCompare_description2', 'Innerhalb unserer App haben Sie die Möglichkeit Produkte\nzu vergleichen. Klicken Sie einfach die folgende Option an:')}
              textKey={`onboarding-content2-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.MORE_INFORMATION_RIBBON:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_moreInformationRibbon_description', 'Über das Feld Mehr Informationen erhalten Sie weiterführende Inhalte zur jeweiligen Produktgruppe,\nz. B. zu verschiedenen Anwendungsmöglichkeiten.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.ORDER_NUMBER:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_orderNumber_description', 'Sie können jeden Text farblich markieren. Außerdem können Sie auf allen Seiten Ihre individuellen Kommentare einfügen.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.EXPORT:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_export_description', 'Sie können jede Seite exportieren und z. B. als PDF abspeichern und versenden.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.DOWNLOAD:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_download_description', 'Wenn Sie das Kärcher Programm auch offline nutzen möchten, haben Sie unter Einstellungen die Möglichkeit,\ndie Inhalte auf Ihr Endgerät herunterzuladen.\n\nDie Inhalte aktualisieren sich bei der nächsten Internetverbindung automatisch.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.CHANGE_LANGUAGE:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_changeLanguage_description', 'Über Einstellungen können Sie die Sprache des Kärcher Programms nach Ihren Vorlieben wechseln.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      case onBoardingSteps.PLAY_ONBOARDING:
        return (
          <View style={styles.contentWrap}>
            <HtmlParser
              html={tr(translations, 'onboarding_playOnboarding_description', 'Über Einstellungen können Sie sich diese Anleitung erneut anschauen, um die wichtigsten Funktionen des Kärcher Programms kennenzulernen.')}
              textKey={`onboarding-content-${stepKey}`}
              style={styles.contentTxt}
            />
          </View>
        );

      default:
        return (
          <View style={styles.contentWrap}>
            <Text style={styles.contentTxt}>Klicken Sie auf das Kärcher-Logo, um zum Startbildschirm zurück zu gelangen. Sie kommen so auch zurück zu den Bereichen Home & Garden sowie Professional.</Text>
          </View>
        );
    }
  }

  render() {
    return this.renderContent();
  }
}

Content.propTypes = {
  stepName: PropTypes.string.isRequired,
  translations: PropTypes.arrayOf(PropTypes.any).isRequired
};
export default Content;
