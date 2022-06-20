import { Alert } from 'react-native';
import * as globals from '../libs/globals';
import * as helpers from '../libs/helpers';
import refHandler from '../libs/refHandler';
import tr from '../libs/translator';
import appConstants from '../libs/constants';
// import { alertsManager } from './downloadHelpers';

const {
  downloadingFlags,
  netType,
  alertTypes
} = appConstants;

let sync_offline_count = 0;

const syncOfflineDownload = async (offlineDownload, saveOfflineDownload, useMobileData) => {
  const isDownloadingStarted = globals.GET_APP_DATA('isDownloadingStarted');
  const isDownloadingCanceled = globals.GET_APP_DATA('isDownloadingCanceled');
  const translations = globals.GET_APP_DATA('translationsArr');
  const stopDailySync = parseInt((helpers.dateWithoutTime(new Date()) - helpers.dateWithoutTime(offlineDownload.lastDownload)) / (24 * 3600 * 1000));
  const flagArr = [
    offlineDownload.proffesional,
    offlineDownload.home_and_garden,
    offlineDownload.proffesional_media_flag,
    offlineDownload.home_and_garden_media_flag
  ];

  // Daily synchronise download
  if (
    flagArr.includes(downloadingFlags.DOWNLOADED)
    && !flagArr.includes(downloadingFlags.DOWNLOADING)
    && !isDownloadingStarted
    && !isDownloadingCanceled
    && stopDailySync > 6
    // && helpers.dateWithoutTime(offlineDownload.lastDownload) !== helpers.dateWithoutTime(new Date())
    && offlineDownload.loaded
  ) {
    const isNetConnected = await helpers.isNetConnected();
    const connectionType = await helpers.getConnectionType();

    if (!isNetConnected) {
      if (sync_offline_count < 2) {
        sync_offline_count += 1;
        // refHandler.showAlert({
        //   type: alertTypes.WARNING,
        //   heading: tr(translations, 'sync_offline_data', 'Sync offline data'),
        //   msg: tr(translations, 'user_offline_message', 'Sorry, No internet connection is available. Please try again.')
        // });
        globals.SET_APP_DATA('isSyncWaiting', true);
      }
      return;
    }
    if (connectionType === netType.CELLULAR && !useMobileData) {
      refHandler.showAlert({
        type: alertTypes.WARNING,
        heading: tr(translations, 'sync_offline_data', 'Sync offline data'),
        msg: tr(
          translations,
          'download_error_for_mobile_netowork__alert',
          'Device is connected to mobile network. Download will start when connected to wifi network.'
        )
      });
      globals.SET_APP_DATA('isSyncWaiting', true);
      return;
    }
    Alert.alert(
      tr(translations, 'sync_offline_data', 'Sync offline data'),
      tr(translations, 'do_you_want_to_start_download', 'Do you want to start download?'),
      [
        {
          text: 'Cancel',
          onPress: () => {
            globals.SET_APP_DATA('isDownloadingCanceled', true);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const lastDownloadMonth = new Date(offlineDownload.mediaLastDownload).getMonth() + 1;
            const currentMonth = new Date().getMonth() + 1;

            //  checking the month to download the media
            const stopMediaDownload = lastDownloadMonth === currentMonth;

            const obj = {
              proffesional: offlineDownload.proffesional === downloadingFlags.DOWNLOADED
                ? downloadingFlags.DOWNLOADING : offlineDownload.proffesional,
              home_and_garden: offlineDownload.home_and_garden === downloadingFlags.DOWNLOADED
                ? downloadingFlags.DOWNLOADING : offlineDownload.home_and_garden,
              proffesional_db: offlineDownload.proffesional === downloadingFlags.DOWNLOADED
                ? downloadingFlags.NONE : offlineDownload.proffesional_db,
              home_and_garden_db: offlineDownload.home_and_garden === downloadingFlags.DOWNLOADED
                ? downloadingFlags.NONE : offlineDownload.home_and_garden_db,
              lastDownload: offlineDownload.lastDownload,
              proffesional_media_flag: offlineDownload.proffesional_media_flag === downloadingFlags.DOWNLOADED
                ? downloadingFlags.DOWNLOADED : offlineDownload.proffesional_media_flag,
              home_and_garden_media_flag: offlineDownload.home_and_garden_media_flag === downloadingFlags.DOWNLOADED
                ? downloadingFlags.DOWNLOADED : offlineDownload.home_and_garden_media_flag,
              mediaLastDownload: offlineDownload.mediaLastDownload
            };
            await saveOfflineDownload(obj);
            const professionalChecked = offlineDownload.proffesional !== downloadingFlags.NONE;
            const homeChecked = offlineDownload.home_and_garden !== downloadingFlags.NONE;
            refHandler.downloadInit({ professionalChecked, homeChecked, stopMediaDownload });
          }
        },
      ],
    );
  }
};

export default syncOfflineDownload;
