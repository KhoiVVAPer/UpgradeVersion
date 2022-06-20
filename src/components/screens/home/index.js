/**
 * @fileoverview This is country select screen component.
 * Country and language to be used in aplication is selected in this component
 * @package
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { getContries as fetchContries } from '../../../redux/actions';
import { rootNavigation } from '../../../navigation';
import { saveActiveLanguage } from '../../../realm/queries';
import {
  appConstants,
  validator,
  globals,
  colors,
  icons,
  requestPermission,
  images,
  helpers,
  initAdobeSdk
} from '../../../config';
import {
  MainHoc,
  FontIcon,
  Button,
  Loading,
  ErrorView
} from '../../custom';
import styles from './styles';

const {
  routes,
  validationFor,
  screenTxt
} = appConstants;
const homeTxt = screenTxt.home;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slectedCountry: {
        name: homeTxt.selectCountry,
        code: '',
        languages: []
      },
      selectedLanguage: {
        languageCode: '',
        languageName: homeTxt.selectLanguage
      },
      error: false
    };
  }

  async componentDidMount() {
    const { universal } = this.props;
    if (universal.analyticsTracking === null || universal.analyticsTracking) {
      await analytics().setAnalyticsCollectionEnabled(true);
      analytics().logScreenView('Country Selection', appConstants.firebaseGenericPage);
      initAdobeSdk();
    } else {
      await analytics().setAnalyticsCollectionEnabled(false);
    }
    await requestPermission();
    this.getCountries();
  }

  getCountries = async () => {
    try {
      const { getContries } = this.props;

      getContries().then(() => {
        const { countries, hidePageLoading } = this.props;
        helpers.cacheAppData();
        if (countries.arr[0]) {
          this.setState({
            slectedCountry: countries.slectedCountry,
            selectedLanguage: countries.selectedLanguage,
            error: false
          });
        }

        hidePageLoading();
      }).catch((err) => {
        this.setState({ error: true });
      });
    } catch (err) {
      this.setState({ error: true });
    }
  }

  renderDropdown = (label) => {
    const { countries } = this.props;

    return (
      <View style={[styles.dropdown]}>
        <Text style={styles.dropdownlbl}>{label}</Text>
        {
          countries.loading
            ? (
              <Image
                source={images.loader}
                resizeMode="contain"
                style={styles.loaderImg}
              />
            )
            : (
              <FontIcon
                type={icons.arrow_down[1]}
                icon={icons.arrow_down[0]}
                color={colors.icons}
                size={7}
              />
            )
        }
      </View>
    );
  };

  selectCountry = (index, data) => {
    this.setState({
      slectedCountry: data[index],
      selectedLanguage: data[index].languages[0]
    });
  }

  selectLanguage = (index, data) => this.setState({ selectedLanguage: data[index] });

  navigate = async () => {
    const { componentId } = this.props;
    const { slectedCountry, selectedLanguage } = this.state;

    const flag = validator(validationFor.LANDING_PAGE, { slectedCountry, selectedLanguage });

    const activeLanguageData = {
      countryCode: slectedCountry.code,
      countryName: slectedCountry.name,
      languageCode: selectedLanguage.languageCode,
      languageName: selectedLanguage.languageName
    };

    if (flag) {
      await saveActiveLanguage(activeLanguageData);
      globals.SET_APP_DATA('activeLanguageData', activeLanguageData);
      Navigation.setStackRoot(componentId, rootNavigation.rootPageNav);
    }
  }

  render() {
    const {
      loading, slectedCountry, selectedLanguage, error
    } = this.state;
    const { countries } = this.props;

    if (error) {
      return (
        <View style={{ flex: 1 }}>
          <ErrorView reloadPage={this.getUserToken} />
        </View>
      );
    }
    if (loading) return <Loading />;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerWrap}>
            <Text style={styles.header}>{homeTxt.welcome}</Text>
          </View>
          <View style={styles.dropdownContent}>
            <View style={styles.dropdownPromptWrap}>
              <Text style={styles.dropdownPrompt}>{homeTxt.chooseCountryLbl}</Text>
            </View>
            <View style={styles.dropdownWrap}>
              <View style={styles.dropdownItem}>
                <Dropdown
                  data={countries.arr}
                  renderBase={() => this.renderDropdown(slectedCountry.name)}
                  inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  valueExtractor={({ name }) => name}
                  onChangeText={(value, index, data) => this.selectCountry(index, data)}
                  pickerStyle={{ width: 480 }}
                />
              </View>
              <View style={styles.dropdownItem}>
                <Dropdown
                  data={slectedCountry.languages}
                  renderBase={() => this.renderDropdown(selectedLanguage.languageName)}
                  inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  valueExtractor={({ languageName }) => languageName}
                  onChangeText={(value, index, data) => this.selectLanguage(index, data)}
                />
              </View>
            </View>
          </View>
          {/* <View style={styles.warningWrap}>
            <Text style={styles.warningHead}>{homeTxt.attention}</Text>
            <Text style={styles.warningLabel}>{homeTxt.selectCountryLbl}</Text>
          </View> */}
          {
            countries.loading ? null : (
              <View style={styles.startWrap}>
                <Button
                  text="START"
                  onPress={() => this.navigate()}
                  style={styles.startBtn}
                />
              </View>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries,
  universal: state.universal
});
const mapDispatchToProps = (dispatch) => ({
  getContries: () => fetchContries(dispatch)
});
const HomeRedux = connect(mapStateToProps, mapDispatchToProps)(Home);
export default MainHoc({
  screen: routes.HOME,
})(HomeRedux);
