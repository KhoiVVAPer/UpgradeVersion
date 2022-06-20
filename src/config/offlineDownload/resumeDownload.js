import { Alert } from 'react-native';
import * as globals from '../libs/globals';
import * as helpers from '../libs/helpers';
import refHanlder from '../libs/refHandler';
import tr from '../libs/translator';
import appConstants from '../libs/constants';
import texts from '../utils/texts';
// import { alertsManager } from './downloadHelpers';

const {
  downloadingFlags,
  textCasing,
  netType
} = appConstants;

const resumeOfflineDownload = async (offlineDownload, universal) => {
  const isDownloadingStarted = globals.GET_APP_DATA('isDownloadingStarted');
  const isDownloadingCanceled = globals.GET_APP_DATA('isDownloadingCanceled');
  const isDownloadingWaiting = globals.GET_APP_DATA('isDownloadingWaiting');
  const translations = globals.GET_APP_DATA('translationsArr');
  const isNetConnected = await helpers.isNetConnected();
  const connectionType = await helpers.getConnectionType();

  const flagArr = [
    offlineDownload.proffesional,
    offlineDownload.home_and_garden,
    offlineDownload.proffesional_media_flag,
    offlineDownload.home_and_garden_media_flag
  ];

  if (
    flagArr.includes(downloadingFlags.DOWNLOADING)
    && !isDownloadingStarted
    && !isDownloadingCanceled
    && !isDownloadingWaiting
  ) {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(
        translations,
        'resume_download_alert',
        'Offline downloading is incomplete. Do you want to resume it again?'
      ),
      [
        {
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: () => {
            if (!isNetConnected) {
              Alert.alert(
                tr(translations, 'warning', texts.alerts.warning),
                tr(translations, 'user_offline_message', 'Sorry, No internet connection is available. Please try again.')
              );
              globals.SET_APP_DATA('isDownloadingWaiting', true);
              refHanlder.toggleDownloadIco(false);
            } else if (connectionType === netType.CELLULAR && !universal.useMobiledata) {
              Alert.alert(
                tr(translations, 'warning', texts.alerts.warning),
                tr(
                  translations,
                  'download_error_for_mobile_netowork__alert',
                  'Device is connected to mobile network. Download will start when connected to wifi network.'
                )
              );
              refHanlder.toggleDownloadIco(false);
              globals.SET_APP_DATA('isDownloadingWaiting', true);
            } else {
              const professionalChecked = offlineDownload.proffesional !== downloadingFlags.NONE;
              const homeChecked = offlineDownload.home_and_garden !== downloadingFlags.NONE;
              refHanlder.downloadInit({ professionalChecked, homeChecked, isResumeMode: true });
            }
          }
        }, {
          text: tr(translations, 'cancel', 'Cancel'),
          onPress: () => {
            globals.SET_APP_DATA('isDownloadingCanceled', true);
            refHanlder.checkHeaderDownload();
          },
          style: 'cancel',
        }
      ]
    );
  }
};

export default resumeOfflineDownload;
