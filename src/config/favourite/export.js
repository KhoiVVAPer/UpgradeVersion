import { Platform, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';
import moment from 'moment';
import * as globals from '../libs/globals';
import texts from '../utils/texts';
import appConstants from '../libs/constants';
import tr from '../libs/translator';
import { manualDelay } from '../libs/helpers';

const { textCasing } = appConstants;

/**
 * Check if file is already in device. If it is there
 * then delete
 * @param {String} url is file url
 */
const fileChecked = (url) => new Promise((resolve) => {
  RNFetchBlob.fs.exists(url).then((exist) => {
    if (exist) {
      RNFetchBlob.fs.unlink(url).then(() => {
        resolve();
      }).catch(() => { });
    } else {
      resolve();
    }
  }).catch(() => { });
});

/**
 * Open share native share option for the device
 * @param {String} fileUrl is url of file to be shared
 * @param {String} fileName is name of file to be shared
 */
const shareExport = (fileUrl, fileName) => {
  Share.open({
    url: Platform.OS === 'ios' ? fileUrl : `file://${fileUrl}`,
    title: fileName,
    subject: `${fileName} export`
  }).then((res) => {
    console.log({ res });
  }).catch(() => { });
  // FileViewer.open(fileUrl, { showOpenWithDialog: true }).then(() => { }).catch((error) => {
  //   console.log({ error });
  // });
};

/**
 * Export the favorite folder
 * @param {Object} favourite is list of saved folder and page content
 * @param {Object} translations is list of translations
 */
const exportFavourite = (favourite, translations) => new Promise(async (resolve) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const { languageCode, countryCode } = activeLanguageData;

  const { favouriteFolder, favouriteContent } = favourite;

  const favouriteData = {
    languageCode,
    countryCode,
    favouriteFolder: []
  };
  favouriteFolder.forEach((folderItem) => {
    const obj = {
      id: folderItem.id,
      parentId: folderItem.parentId,
      folderName: folderItem.folderName,
      favouriteContent: []
    };
    favouriteContent.forEach((favItem) => {
      if (favItem.folderId === folderItem.id) {
        obj.favouriteContent.push({
          id: favItem.id,
          folderId: favItem.folderId,
          pageId: favItem.pageId,
          title: favItem.title,
          type: favItem.type,
          countryId: favItem.countryId,
          languageId: favItem.languageId,
          Year: favItem.Year,
        });
      }
    });
    favouriteData.favouriteFolder.push(obj);
  });

  const obj = {
    id: 0,
    parentId: 0,
    folderName: '',
    favouriteContent: []
  };
  favouriteContent.forEach((favItem) => {
    if (favItem.folderId === 0) {
      obj.favouriteContent.push({
        id: favItem.id,
        folderId: favItem.folderId,
        pageId: favItem.pageId,
        title: favItem.title,
        type: favItem.type,
        countryId: favItem.countryId,
        languageId: favItem.languageId,
        Year: favItem.Year,
      });
    }
  });
  favouriteData.favouriteFolder.push(obj);

  const { fs } = RNFetchBlob;
  const { dirs } = fs;

  const fileName = `DigitalCatalog_FavoriteExport-${countryCode}-${languageCode}_${moment().format('DD.MM.YYYY')}.txt`;
  const downloadDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const fileUrl = `${downloadDir}/${fileName}`;

  await fileChecked(fileUrl);
  fs.createFile(fileUrl, JSON.stringify(favouriteData), 'utf8');

  await manualDelay(1000);
  if (!favouriteContent.length) {
    Alert.alert(
      tr(translations, 'error', texts.alerts.error),
      tr(translations, 'no_favourite_added_alert', 'Sorry, No favorite is added')
    );
    return;
  }
  Alert.alert(
    tr(translations, 'success', texts.alerts.success),
    tr(translations, 'favorite_export_success_alert', 'Favorite exported successfully'),
    [{
      text: tr(translations, 'cancel', 'Cancel', textCasing.U),
    }, {
      text: tr(translations, 'ok', 'OK', textCasing.U),
      onPress: () => {
        shareExport(fileUrl, fileName);
      }
    }]
  );
  resolve();
});

export default exportFavourite;
