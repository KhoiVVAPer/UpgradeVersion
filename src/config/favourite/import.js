import { Alert, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import * as globals from '../libs/globals';
import texts from '../utils/texts';
import tr from '../libs/translator';
import { importFavouriteDb } from '../../realm/queries/favourite';

const favorite_import_different_country_error = "This file can't be imported because it corresponds to different country. Please switch your country in the settings accordingly";
const favorite_import_different_language_error = 'Favorite data belongs to different Language of the Current Country. While switching to this Country data will be shown.';
const favorite_import_different_invalid_file_error = 'This file is invalid.';

/**
 * Validate the import data and then save to realm
 * @param {*} favData is favourite data to be imported
 * @param {Array} translations is translations of active language
 * @param {Function} getFavourite is redux action for getting favourite data
 * @param {Function} resetFavouriteData is redux action for reseting favourite data
 * @param {*} resolve is promise success after import is done
 */
const validateImportData = async (favData, translations, getFavourite, resetFavouriteData, resolve) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const { languageCode, countryCode } = activeLanguageData;

  if (!favData.countryCode) {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'favorite_import_different_invalid_file_error', favorite_import_different_invalid_file_error)
    );
  } else if (favData.countryCode !== countryCode) {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'favorite_import_different_country_error', favorite_import_different_country_error)
    );
    resolve();
  } else if (favData.languageCode !== languageCode) {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'favorite_import_different_language_error', favorite_import_different_language_error)
    );
    resolve();
  } else {
    resetFavouriteData();
    await importFavouriteDb(favData.favouriteFolder);
    await getFavourite();
    resolve();
  }
};

/**
 * Import favourite data
 * @param {Array} translations is translations of active language
 * @param {Function} getFavourite is redux action for getting favourite data
 * @param {Function} resetFavouriteData is redux action for reseting favourite data
 */
const importFavourite = (translations, getFavourite, resetFavouriteData) => new Promise(async (resolve) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.plainText],
    });
    const filePath = Platform.OS === 'ios' ? res.uri.split('file://')[1] : res.uri.split('raw%3A')[1].replace(/\%2F/gm, '/');

    // const { dirs } = RNFetchBlob.fs;
    // const filePath = `${dirs.DocumentDir}/DigitalCatalog_FavoriteExport-DE-de_16.04.2020.txt`;
    // const filePath = `${dirs.DocumentDir}/test.txt`;
    // const filePath = `${dirs.DocumentDir}/DigitalCatalog_FavoriteExport-AT-de_23.04.2020.txt`;
    RNFetchBlob.fs.readFile(filePath).then((data) => {
      const favData = JSON.parse(data);
      validateImportData(favData, translations, getFavourite, resetFavouriteData, resolve);
    }).catch(() => {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'favorite_import_different_invalid_file_error', favorite_import_different_invalid_file_error)
      );
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
});

export default importFavourite;
