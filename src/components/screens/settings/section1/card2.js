import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Dropdown } from 'react-native-material-dropdown-v2';
import {
  globals,
  tr,
  texts,
  appConstants,
  helpers,
  icons,
  colors,
  appStyles
} from '../../../../config';
import {
  FontIcon,
  Button,
  HtmlParser
} from '../../../custom';
import { saveActiveLanguage } from '../../../../realm/queries';
import CardHead from '../cardHeader';
import styles from '../styles';

const { textCasing } = appConstants;

class Card2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: { code: '', name: '' },
      languageArr: [],
      activeLanguage: null,
      activeLanguageName: null
    };
  }

  componentDidMount() {
    const { countries } = this.props;
    const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

    countries.arr.map((item) => {
      if (activeLanguageData.countryCode === item.code) {
        this.setState({
          languageArr: item.languages,
          selectedCountry: { code: item.code, name: item.name },
          activeLanguage: activeLanguageData.languageCode
        });
      }
      return null;
    });
  }

  changeLanguage = (index, data) => {
    this.setState({
      activeLanguage: data[index].languageCode,
      activeLanguageName: data[index].languageName
    });
  }

  switchLanguageConfirm = () => {
    const { toggleLoader, translations } = this.props;
    const { activeLanguage, selectedCountry } = this.state;
    const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

    if (
      activeLanguageData.languageCode === activeLanguage
      && activeLanguageData.countryCode === selectedCountry.code
    ) return;

    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'do_you_want_to_change_settings', 'Are you sure you want to change language?'),
      [
        {
          text: tr(translations, 'cancel', 'Cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: async () => {
            toggleLoader(true);
            const dbDownloadTask = globals.GET_APP_DATA('dbDownloadTask');
            if (dbDownloadTask) {
              dbDownloadTask.stop(() => {
                this.switchLanguage();
              });
            } else {
              this.switchLanguage();
            }
          }
        },
      ]
    );
  }

  switchLanguage = async () => {
    const { resetApp, componentId, toggleLoader } = this.props;
    const { selectedCountry, activeLanguage, activeLanguageName } = this.state;
    const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

    globals.SET_APP_DATA('killOfflineDownload', true);
    await helpers.manualDelay(3000);

    const isCountryChanged = activeLanguageData.countryCode === selectedCountry.code;
    const activeLanguageDataNew = {
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name,
      languageCode: activeLanguage,
      languageName: activeLanguageName
    };

    await globals.RESET_APP_DATA();

    resetApp(isCountryChanged).then(async () => {
      globals.SET_APP_DATA('activeLanguageData', activeLanguageDataNew);
      globals.SET_APP_DATA('blockOnboarding', true);
      const rootPageRef = globals.GET_APP_DATA('rootPageRef');
      await saveActiveLanguage(activeLanguageDataNew);
      toggleLoader(false);
      setTimeout(async () => {
        rootPageRef.startConfiguring();
        Navigation.popToRoot(componentId);
        rootPageRef.initPageContent();
      }, 2000);
    });
  }

  selectCountry = (index, data) => {
    this.setState({
      selectedCountry: { code: data[index].code, name: data[index].name },
      languageArr: data[index].languages,
      activeLanguage: data[index].languages[0] ? data[index].languages[0].languageCode : '',
      activeLanguageName: data[index].languages[0] ? data[index].languages[0].languageName : ''
    });
  }

  renderCountryDropdown = (label) => (
    <View style={styles.dropdown}>
      <Text style={styles.dropdownlbl}>{label}</Text>
      <FontIcon
        type={icons.arrow_down[1]}
        icon={icons.arrow_down[0]}
        color={colors.icons}
        size={7}
      />
    </View>
  );

  renderLanguageDropdown = () => {
    const { translations } = this.props;
    const { activeLanguage, languageArr } = this.state;

    let countryName = tr(translations, 'select_language', 'Select language');
    languageArr.forEach((item) => {
      if (item.languageCode === activeLanguage) countryName = item.languageName;
    });

    return (
      <View style={styles.dropdown}>
        <Text style={styles.dropdownlbl}>{countryName}</Text>
        <FontIcon
          type={icons.arrow_down[1]}
          icon={icons.arrow_down[0]}
          color={colors.icons}
          size={7}
        />
      </View>
    );
  }

  render() {
    const {
      countries,
      translations,
      universal,
      setLanguageBtnRef
    } = this.props;
    const {
      selectedCountry,
      activeLanguage,
      languageArr
    } = this.state;

    const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

    const isBtnDisabled = activeLanguageData.languageCode === activeLanguage && activeLanguageData.countryCode === selectedCountry.code;

    return (
      <View style={styles.card}>
        <CardHead
          heading={tr(translations, 'country_and_language_settings', 'Country and language settings')}
          iconType={icons.chat_filled[1]}
          icon={icons.chat_filled[0]}
        />
        <View style={styles.countryContentWrap}>
          <ScrollView
            style={styles.countryContent}
            contentContainerStyle={styles.countryContentInner}
            nestedScrollEnabled
          >
            <HtmlParser
              style={styles.changeTxt}
              html={tr(translations, 'change_the_country', 'Change the country')}
              textKey="settings-cardHead-sec1-card2-countryPrompt"
            />
            <Dropdown
              data={countries.arr}
              renderBase={() => this.renderCountryDropdown(selectedCountry.name)}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              valueExtractor={({ name }) => name}
              onChangeText={(value, index, data) => this.selectCountry(index, data)}
              pickerStyle={{ width: 480 }}
            />
            <HtmlParser
              style={styles.changeTxt}
              html={tr(translations, 'change_the_language', 'Change the language')}
              textKey="settings-cardHead-sec1-card2-langPrompt"
            />
            <Dropdown
              data={languageArr}
              renderBase={() => this.renderLanguageDropdown(selectedCountry.name)}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              valueExtractor={({ languageName }) => languageName}
              onChangeText={(value, index, data) => this.changeLanguage(index, data)}
              pickerStyle={{ width: 480 }}
            />
            <View style={[styles.playBtnWrap, { ...appStyles.mgT(15) }]}>
              <View
                ref={(ref) => { setLanguageBtnRef(ref); }}
                removeClippedSubviews={false}
              >
                <Button
                  text={tr(translations, 'change', 'Change', textCasing.U)}
                  onPress={() => { this.switchLanguageConfirm(); }}
                  theme="app"
                  transparent={universal.viewedOnboardingStep === 10 && !universal.onboardingSkiped}
                  isBtnDisabled={isBtnDisabled}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Card2;
