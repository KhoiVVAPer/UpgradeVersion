import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import { appConstants } from '../../config';

const { schemas, downloadingFlags } = appConstants;

/**
 * Save flags for offline download data status
 * @param {Object} dataObj is data of offline download data status
 * @return {Boolean} data is saved
 */
const saveOfflineDownloadDb = (dataObj) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const downloadData = realm.objects(schemas.OFFLINE_DOWNLOAD);
      realm.delete(downloadData);

      realm.create(schemas.OFFLINE_DOWNLOAD, {
        proffesional: dataObj.proffesional,
        home_and_garden: dataObj.home_and_garden,
        proffesional_db: dataObj.proffesional_db,
        home_and_garden_db: dataObj.home_and_garden_db,
        proffesional_media_flag: dataObj.proffesional_media_flag,
        home_and_garden_media_flag: dataObj.home_and_garden_media_flag,
        lastDownload: dataObj.lastDownload,
        mediaLastDownload: dataObj.mediaLastDownload
      });
      resolve(true);
    });
  });
});

/**
 * Get offline download data flag
 * @return {Object} data of offline data flag
 */
const getOfflineDownloadDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(async () => {
      const downloadData = realm.objects(schemas.OFFLINE_DOWNLOAD);
      let arr = Array.from(downloadData);
      if (arr.length === 0) {
        arr = [{
          proffesional: downloadingFlags.NONE,
          home_and_garden: downloadingFlags.NONE,
          proffesional_db: '',
          home_and_garden_db: '',
          proffesional_media_flag: downloadingFlags.NONE,
          home_and_garden_media_flag: downloadingFlags.NONE,
          lastDownload: '',
          mediaLastDownload: ''
        }];
        saveOfflineDownloadDb({ ...arr[0] });
      }
      resolve({ ...arr[0] } || false);
    });
  });
});

export { saveOfflineDownloadDb, getOfflineDownloadDb };
