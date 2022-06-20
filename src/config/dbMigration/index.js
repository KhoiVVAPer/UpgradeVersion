import { Alert, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import * as globals from '../libs/globals';
import * as helpers from '../libs/helpers';
import appConstants from '../libs/constants';
import tr from '../libs/translator';
import texts from '../utils/texts';
import versionChecker from './versionChecker';
import migrationManager from './migrationManager';

const { updatedAppVersionType, textCasing } = appConstants;

const majorUpdateAlert = () => {
  const translations = globals.GET_APP_DATA('translationsArr');
  Alert.alert(
    tr(translations, 'warning', texts.alerts.warning),
    tr(translations, 'major_update_available_alert', 'There is an upgraded version of the App. To work seamlessly need to upgrade the App.'),
    [{
      text: tr(translations, 'ok', 'OK', textCasing.U),
      onPress: () => {
        VersionCheck.needUpdate().then((res) => {
          Linking.openURL(res.storeUrl);
        });
      }
    }],
    { cancelable: false },
  );
};

const patchUpdateAlert = () => {
  const translations = globals.GET_APP_DATA('translationsArr');
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
};

const dbMigration = (universal, pageId) => new Promise(async (resolve) => {
  try {
    const isNetConnected = await helpers.isNetConnected();
    if (!isNetConnected) {
      resolve();
      return;
    }
    const updateType = pageId === 0 ? await versionChecker() : updatedAppVersionType.NONE;
    if (updateType === updatedAppVersionType.NONE) {
      if (universal.dbVersion !== globals.DB_VERSION) {
        await migrationManager();
        resolve();
      } else {
        resolve();
      }
    } else {
      if (
        updateType === updatedAppVersionType.MAJOR
        || updateType === updatedAppVersionType.MINOR
      ) {
        majorUpdateAlert();
      }
      if (updateType === updatedAppVersionType.PATCH) {
        patchUpdateAlert();
      }
      resolve();
    }
  } catch (err) {
    resolve();
  }
});

export default dbMigration;
