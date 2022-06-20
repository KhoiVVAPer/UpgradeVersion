/**
 * @fileoverview This is settings screen section-1 component.
 * @package
 */
import moment from 'moment';
import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Linking
} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {
  appConstants,
  appStyles,
  colors,
  globals,
  icons,
  texts,
  tr,
  helpers,
  refHandler,
  versionChecker
} from '../../../../config';
import {
  Button,
  FontIcon,
  HtmlParser,
  TouchableDebounce
} from '../../../custom';
import CardHead from '../cardHeader';
import styles from '../styles';
import DownloadProgressModal from './downloadProgressModal';

const {
  downloadingFlags,
  textCasing,
  alertTypes,
  netType,
  updatedAppVersionType
} = appConstants;

class Card1 extends Component {
  constructor(props) {
    super(props);

    const { offlineDownload, translations } = this.props;
    const allChecked = (offlineDownload.proffesional !== downloadingFlags.NONE && offlineDownload.home_and_garden !== downloadingFlags.NONE);
    const professionalChecked = offlineDownload.proffesional !== downloadingFlags.NONE;
    const homeChecked = offlineDownload.home_and_garden !== downloadingFlags.NONE;
    this.state = {
      useMobileData: false,
      allChecked,
      professionalChecked,
      homeChecked,
      showDownloadProgressModal: false
    };

    this.LABELS = {
      all: { key: 'allChecked', value: tr(translations, 'all', 'All') },
      home_and_garden: { key: 'homeChecked', value: tr(translations, 'home_garden', 'Home & Garden') },
      professional: { key: 'professionalChecked', value: tr(translations, 'professional', 'Professional') },
      useMobileData: { key: 'useMobileData', value: tr(translations, 'use_mobile_data_fordownload', 'Use mobile data for download') },
    };
    this.languageBtnRef = null;
  }

  componentDidMount() {
    const { setDownloadBtnRef } = this.props;
    setDownloadBtnRef(this.downloadBtnRef);
  }

  toggleDownloadFlag = (label) => {
    const { allChecked } = this.state;
    let obj = {
      // eslint-disable-next-line react/destructuring-assignment
      [label.key]: label.key === 'allChecked' ? true : !this.state[label.key]
    };
    if (label.key === 'allChecked' && !allChecked) {
      obj = {
        ...obj,
        professionalChecked: true,
        homeChecked: true,
      };
    }
    this.setState({ ...obj });
  }

  downloadDb = async () => {
    const { resetOfflineDownload, translations } = this.props;
    const { professionalChecked, homeChecked } = this.state;

    const updateType = await versionChecker();
    if (updateType !== updatedAppVersionType.NONE) {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'patch_update_available_alert', 'There is an upgraded version of the App. Do you want to update the app?'),
        [{
          text: tr(translations, 'cancel', 'Cancel', textCasing.U),
        }, {
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: () => {
            VersionCheck.needUpdate().then((res) => {
              Linking.openURL(res.storeUrl);
            });
          }
        }]
      );
      return;
    }

    Alert.alert(
      tr(translations, 'attention', texts.alerts.attention),
      tr(translations, 'do_you_want_to_start_download', 'Do you want to start download?'),
      [
        {
          text: tr(translations, 'cancel', 'Cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: async () => {
            await resetOfflineDownload();
            refHandler.downloadInit({ professionalChecked, homeChecked });
          }
        },
      ]
    );
  }

  handleMobileDataChange = async () => {
    const { saveUniversalData, offlineDownload } = this.props;
    const { universal, translations } = this.props;
    await saveUniversalData({ useMobiledata: !universal.useMobiledata });
    globals.SET_APP_DATA('killOfflineDownload', false);
    refHandler.processOfflineDownload();

    const isDownloadingWaiting = globals.GET_APP_DATA('isDownloadingWaiting');
    const connectionType = await helpers.getConnectionType();

    const flagArr = [
      offlineDownload.proffesional,
      offlineDownload.home_and_garden,
      offlineDownload.proffesional_media_flag,
      offlineDownload.home_and_garden_media_flag
    ];

    if (
      flagArr.includes(downloadingFlags.DOWNLOADING)
      && !isDownloadingWaiting
      && connectionType === netType.CELLULAR
      // eslint-disable-next-line react/destructuring-assignment
      && !this.props.universal.useMobiledata
    ) {
      refHandler.showAlert({
        type: alertTypes.ERROR,
        heading: tr(translations, 'warning', texts.alerts.warning),
        msg: tr(
          translations,
          'download_error_for_mobile_netowork__alert',
          'Device is connected to mobile network. Download will start when connected to wifi network.'
        )
      });
      globals.SET_APP_DATA('killOfflineDownload', true);
      globals.SET_APP_DATA('isDownloadingWaiting', true);
      refHandler.cancelDbDownload();
      refHandler.cancelMediaDownload();
      refHandler.toggleDownloadIco(false);
    }
  }

  renderDownloadIcon = (label, checked, italicStyle = {}) => {
    const { offlineDownload } = this.props;

    const flagArr = [
      offlineDownload.proffesional,
      offlineDownload.home_and_garden,
      offlineDownload.proffesional_media_flag,
      offlineDownload.home_and_garden_media_flag
    ];

    const isDownloadMode = flagArr.includes(downloadingFlags.DOWNLOADING);

    return (
      <TouchableDebounce
        style={styles.downloadItem}
        onPress={async () => {
          if (label.value !== this.LABELS.useMobileData.value) {
            if (!isDownloadMode) this.toggleDownloadFlag(label);
          } else {
            this.handleMobileDataChange();
          }
        }}
      >
        <View style={styles.checkbox}>
          {
            !checked
              ? null
              : (
                <FontIcon
                  type={icons.done[1]}
                  icon={icons.done[0]}
                  color={isDownloadMode ? colors.textLight : colors.text}
                  size={8}
                />
              )
          }
        </View>
        <Text
          style={[
            styles.downloadLbl,
            italicStyle,
            { color: isDownloadMode ? colors.textLight : colors.text }
          ]}
        >
          {label.value}
        </Text>
      </TouchableDebounce>
    );
  }

  toggleDownloadProgressModal = (flag) => { this.setState({ showDownloadProgressModal: flag }); }

  render() {
    const {
      professionalChecked,
      homeChecked,
      showDownloadProgressModal
    } = this.state;
    const {
      offlineDownload,
      universal,
      translations,
      mediaUrlArr
    } = this.props;

    const isDownloading = (offlineDownload.proffesional === downloadingFlags.DOWNLOADING
      || offlineDownload.home_and_garden === downloadingFlags.DOWNLOADING
      || offlineDownload.proffesional_media_flag === downloadingFlags.DOWNLOADING
      || offlineDownload.home_and_garden_media_flag === downloadingFlags.DOWNLOADING);
    return (
      <View style={[styles.cardMini, { ...appStyles.mgB20 }]}>
        <CardHead
          heading={tr(translations, 'download', 'Download')}
          iconType={icons.save_filled[1]}
          icon={icons.save_filled[0]}
        />
        <View style={styles.cardContent}>
          <HtmlParser
            html={tr(translations, 'settings_download_caption', 'Simply select which areas you would like to download')}
            textKey="settings-cardHead-sec1-card1-prompt"
            style={{ ...appStyles.lH(15) }}
          />
          <View style={styles.downloadWrap}>
            {this.renderDownloadIcon(this.LABELS.all, professionalChecked && homeChecked)}
            {this.renderDownloadIcon(this.LABELS.home_and_garden, homeChecked)}
            {this.renderDownloadIcon(this.LABELS.professional, professionalChecked)}
          </View>
          <Text style={styles.lastDownloadTxt}>
            {`${tr(translations, 'last_download', 'Last download')}: ${moment(new Date(offlineDownload.lastDownload)).format('D/MM/YYYY') || 'n/a'}`}
          </Text>
          <View style={styles.mobileDataPromtWrap}>
            {this.renderDownloadIcon(this.LABELS.useMobileData, universal.useMobiledata, styles.italicStyle)}
          </View>
        </View>
        <View style={[styles.playBtnWrap, styles.downloadBtnWrap]}>
          <Button
            text={tr(translations, 'download_status', 'Download Status', textCasing.U)}
            onPress={() => { this.toggleDownloadProgressModal(true); }}
            theme="app"
            style={{ ...appStyles.mgR(10) }}
          />
          <View
            ref={(ref) => { this.downloadBtnRef = ref; }}
            removeClippedSubviews={false}
          >
            <Button
              text={tr(translations, 'download', 'Download', textCasing.U)}
              onPress={() => { this.downloadDb(); }}
              theme="app"
              loading={isDownloading}
              transparent={universal.viewedOnboardingStep === 9 && !universal.onboardingSkiped}
            />
          </View>
        </View>
        <DownloadProgressModal
          showDownloadProgressModal={showDownloadProgressModal}
          toggleDownloadProgressModal={this.toggleDownloadProgressModal}
          translations={translations}
          offlineDownload={offlineDownload}
          mediaUrlArr={mediaUrlArr}
        />
      </View>
    );
  }
}

export default Card1;
