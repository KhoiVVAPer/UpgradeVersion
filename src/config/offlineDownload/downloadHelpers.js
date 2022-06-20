import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import RNBackgroundDownloader from 'react-native-background-downloader';
import * as globals from '../libs/globals';
import appConstants from '../libs/constants';
import tr from '../libs/translator';
import texts from '../utils/texts';
import refHandler from '../libs/refHandler';

const {
  catelogueTypes,
  alertTypes,
} = appConstants;

/**
 * Removes duplicate image urls
 * @param {Array} urlArr array og images
 */
const uniqueMediaUrls = (urlArr) => new Promise((resolve) => {
  const urlArrNew = {};
  // eslint-disable-next-line no-restricted-syntax, no-unused-vars
  for (const item of urlArr) {
    urlArrNew[item.url] = true;
  }
  const arr = Object.keys(urlArrNew);
  resolve(arr);
});

/**
 * Retuens images which are not stored in database
 * @param {Array} urlArr array of images
 * @param {Object} pageProps download handler page data
 */
const filterMediaUrls = (urlArr, pageProps) => new Promise((resolve) => {
  const { mediaUrlArr } = pageProps;

  const urlArrNew = {};
  // eslint-disable-next-line no-restricted-syntax, no-unused-vars
  for (const item of urlArr) {
    if (
      !mediaUrlArr[catelogueTypes.HOME_AND_GARDEN].includes(item)
      && !mediaUrlArr[catelogueTypes.PROFFESSIONAL].includes(item)
    ) {
      urlArrNew[item] = true;
    }
  }
  const arr = Object.keys(urlArrNew);
  resolve(arr);
});

/**
 * Removed images from home and garden which are already in proffessional
 * @param {Array} hgUrls are home and garden images
 * @param {Array} proUrls are professional images
 */
const filterMediaAll = (hgUrls, proUrls) => {
  const arr = hgUrls.filter((item) => (!proUrls.includes(item)));
  return arr;
};

/**
 * Check if file is already in location then delete it
 * @param {String} url is a filepath to be deleted
 */
const deleteFile = (url) => new Promise((resolve) => {
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
 * Check if folder is already in location then delete it
 * @param {String} url is a folder path to be deleted
 */
const deleteFolder = (url) => new Promise((resolve) => {
  RNFetchBlob.fs.isDir(url).then((isDir) => {
    if (isDir) {
      RNFetchBlob.fs.unlink(url).then(() => {
        resolve();
      }).catch(() => { });
    } else {
      resolve();
    }
  });
});

/**
 * Check if folder is already in location
 * @param {String} url is a folder path to be check
 */
const isFolderExist = (url) => new Promise((resolve) => {
  RNFetchBlob.fs.isDir(url).then((isDir) => {
    resolve(isDir);
  });
});

/**
 * Check if file is already in location
 * @param {String} url is a file path to be check
 */
const isFileExist = (url) => new Promise((resolve) => {
  RNFetchBlob.fs.exists(url).then((exist) => {
    resolve(exist);
  });
});

/**
 * Get identifier from url
 * @param {String} url is zip file of images
 */
const getMediaIdentifier = (url) => {
  const plainUrl = url.split('.zip')[0];
  const plainUrlArr = plainUrl.split('/');
  return plainUrlArr[plainUrlArr.length - 1];
};

/**
 * Download the media zip
 * @param {String} zipUrl is a url to be downloaded
 * @param {String} destPath is path where zip is downloaded
 */
const downloadMediaZip = (zipUrl, destPath, formattedUrl) => new Promise(async (resolve) => {
  const mediaDownloadTask = RNBackgroundDownloader.download({
    id: formattedUrl,
    url: zipUrl,
    destination: destPath
  })
    .begin((expectedBytes) => {
      if (!globals.LIVE) console.log(`Going to download ${expectedBytes} bytes!`);
    })
    .progress((percent) => {
      if (!globals.LIVE) console.log('media download', percent * 100);
      refHandler.setupDownloadModal(percent * 100);
    })
    .done(async () => {
      if (!globals.LIVE) console.log('Download is done!');
      const killOfflineDownload = globals.GET_APP_DATA('killOfflineDownload');
      if (killOfflineDownload) return;

      const response = {
        isDownloaded: true,
        zipPath: destPath
      };
      resolve(response);
    })
    .error((error) => {
      console.log('Download canceled due to error: ', error);
    });
  globals.SET_APP_DATA('mediaDownloadTask', mediaDownloadTask);
});

/**
 * Unzip the file
 * @param {String} sourcePath is path of a zip file
 * @param {String} destPath is path of a zip file to be extracted
 */
const unzipFile = async (sourcePath, destPath) => {
  const isFile = await isFileExist(sourcePath);
  if (!isFile) return Promise.resolve();

  const formatedUrl = await getMediaIdentifier(sourcePath);
  const charset = 'UTF-8';
  refHandler.setUnziping(formatedUrl);
  return new Promise((resolve) => {
    unzip(sourcePath, destPath, charset)
      .then(async (path) => {
        // we do not delete the file now.
        // this is a workaround related to DCA-1678. If the offline cache fails
        // we will use this zip file for unpacking when entering the offline mode.
        // await deleteFile(sourcePath);
        if (!globals.LIVE) console.log({ path });
        refHandler.unsetUnziping(formatedUrl);
        resolve();
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

/**
 * All offline download alerts will be namaged from this handler
 */
const alertsManager = {
  downloadError: (translations) => {
    refHandler.showAlert({
      type: alertTypes.ERROR,
      heading: tr(translations, 'warning', texts.alerts.warning),
      msg: tr(translations, 'downloading_error_alert', 'Sorry, Some error occured while dowloading.')
    });
  },
  wifiWaitingError: (translations) => {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(
        translations,
        'download_error_for_mobile_netowork__alert',
        'Device is connected to mobile network. Download will start when connected to wifi network.'
      )
    );
  },
  netConnectionError: (translations) => {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'user_offline_message', 'Sorry, No internet connection is available. Please try again.')
    );
  },
  noCatelogueSelectedError: (translations) => {
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'nothing_is_selected_for_download', 'Nothing is selected for download')
    );
  },
  downloadSuccess: (translations) => {
    Alert.alert(
      tr(translations, 'success', texts.alerts.success),
      tr(translations, 'offline_download_completed', 'Offline download completed')
    );
  }
};

export {
  uniqueMediaUrls,
  filterMediaUrls,
  filterMediaAll,
  deleteFile,
  deleteFolder,
  getMediaIdentifier,
  unzipFile,
  downloadMediaZip,
  alertsManager,
  isFolderExist
};
