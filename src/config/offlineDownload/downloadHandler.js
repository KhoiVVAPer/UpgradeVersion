import {
  Platform,
  Vibration
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Config from 'react-native-config';
import * as globals from '../libs/globals';
import refHandler from '../libs/refHandler';
import appConstants from '../libs/constants';
import * as helpers from '../libs/helpers';
import {
  deleteFile,
  deleteFolder,
  getMediaIdentifier,
  unzipFile,
  downloadMediaZip,
  alertsManager
} from './downloadHelpers';
import {
  getDownloadExport,
  mediaUrlZipService
} from '../../services';

const dbBaseUrl = Platform.OS === 'ios'
  ? globals.DB_BASE_URL
  : globals.GET_APP_DATA('dbBaseUrl');
const {
  downloadingFlags,
  catelogueTypes,
  netType
} = appConstants;
const dbTempFolder = `${dbBaseUrl}temp`;

let pageProps = {};
let downloadUrls = {};
let downloadUrlArr = [];
let downloadedDbs = [];
let downloadedMediaType = [];
let downloadedMedia = {
  [catelogueTypes.HOME_AND_GARDEN]: [],
  [catelogueTypes.PROFFESSIONAL]: []
};
let mediaUrls = {
  [catelogueTypes.HOME_AND_GARDEN]: [],
  [catelogueTypes.PROFFESSIONAL]: []
};
const mediaPromiseArr = {
  [catelogueTypes.HOME_AND_GARDEN]: [],
  [catelogueTypes.PROFFESSIONAL]: []
};
let mediaDownloadTimestamp = 0;

const downloadComplete = async () => {
  const {
    professionalChecked,
    homeChecked,
    offlineDownload,
    saveOfflineDownload
  } = pageProps;

  let isDownloadComplete = true;
  if (
    (homeChecked && !downloadedMediaType.includes(catelogueTypes.HOME_AND_GARDEN))
    || (professionalChecked && !downloadedMediaType.includes(catelogueTypes.PROFFESSIONAL))
  ) {
    isDownloadComplete = false;
  }
  if (!isDownloadComplete) return;

  const translations = globals.GET_APP_DATA('translationsArr');

  const obj = {
    proffesional: professionalChecked ? downloadingFlags.DOWNLOADED : offlineDownload.proffesional,
    home_and_garden: homeChecked ? downloadingFlags.DOWNLOADED : offlineDownload.home_and_garden,
    proffesional_db: professionalChecked ? downloadedDbs.join('|') : offlineDownload.proffesional_db,
    home_and_garden_db: homeChecked ? downloadedDbs.join('|') : offlineDownload.home_and_garden_db,
    lastDownload: new Date().toString(),
    proffesional_media_flag: professionalChecked ? downloadingFlags.DOWNLOADED : offlineDownload.proffesional_media_flag,
    home_and_garden_media_flag: homeChecked ? downloadingFlags.DOWNLOADED : offlineDownload.home_and_garden_media_flag,
    mediaLastDownload: pageProps.stopMediaDownload ? offlineDownload.mediaLastDownload : new Date().toString()
  };
  await saveOfflineDownload(obj);

  refHandler.hideDownloadModal();
  setTimeout(() => {
    Vibration.vibrate(globals.VIBRATE_DURATION);
    alertsManager.downloadSuccess(translations);
  }, 500);
};

const mediaDownloadAfterUnzip = async (type) => {
  const {
    professionalChecked,
    homeChecked,
    saveOfflineDownload,
    offlineDownload,
  } = pageProps;

  const proffesionalFlag = professionalChecked ? downloadingFlags.DOWNLOADING : offlineDownload.proffesional_media_flag;
  const homeFlag = homeChecked ? downloadingFlags.DOWNLOADING : offlineDownload.home_and_garden_media_flag;

  downloadedMediaType = [...downloadedMediaType, type];

  const obj = {
    proffesional: professionalChecked ? downloadingFlags.DOWNLOADED : offlineDownload.proffesional,
    home_and_garden: homeChecked ? downloadingFlags.DOWNLOADED : offlineDownload.home_and_garden,
    proffesional_db: professionalChecked ? downloadedDbs.join('|') : offlineDownload.proffesional_db,
    home_and_garden_db: homeChecked ? downloadedDbs.join('|') : offlineDownload.home_and_garden_db,
    lastDownload: new Date().toString(),
    proffesional_media_flag: downloadedMediaType.includes(catelogueTypes.PROFFESSIONAL) ? downloadingFlags.DOWNLOADED : proffesionalFlag,
    home_and_garden_media_flag: downloadedMediaType.includes(catelogueTypes.HOME_AND_GARDEN) ? downloadingFlags.DOWNLOADED : homeFlag,
    mediaLastDownload: offlineDownload.mediaLastDownload
  };
  await saveOfflineDownload(obj);
  downloadComplete();
};

const downloadMedia = async (index, type, resolve, currentTimestamp) => {
  const {
    saveMediaUrl
  } = pageProps;
  if (currentTimestamp !== mediaDownloadTimestamp) return;
  const killOfflineDownload = globals.GET_APP_DATA('killOfflineDownload');
  if (killOfflineDownload) return;

  const translations = globals.GET_APP_DATA('translationsArr');

  if (!globals.LIVE) console.log(`Downloading-${index}`);

  const mediaZipUrl = mediaUrls[type][index];
  const formattedUrl = getMediaIdentifier(mediaZipUrl);
  const isLastChunk = !mediaUrls[type][index + 1];
  const isDownloaded = downloadedMedia[type].includes(formattedUrl);

  if (!isDownloaded) {
    const zipData = await downloadMediaZip(mediaZipUrl, `${globals.IMAGE_SAVE_LOCATION}/${formattedUrl}.zip`, formattedUrl);
    refHandler.setupDownloadModal(0);
    if (!zipData.isDownloaded) {
      alertsManager.downloadError(translations);
      return;
    }
    downloadedMedia[type] = [...downloadedMedia[type], formattedUrl];
    const newMediaUrlArr = [...downloadedMedia[type]];
    await saveMediaUrl(newMediaUrlArr, type);
    refHandler.configDownloadModal();
  }

  const promise = unzipFile(`${globals.IMAGE_SAVE_LOCATION}/${formattedUrl}.zip`, globals.IMAGE_SAVE_LOCATION);
  mediaPromiseArr[type] = [...mediaPromiseArr[type], promise];

  if (isLastChunk) {
    resolve(true);
  } else {
    const isNetConnected = await helpers.isNetConnected();
    if (isNetConnected) {
      // eslint-disable-next-line no-plusplus, no-param-reassign
      downloadMedia(++index, type, resolve, currentTimestamp);
    }
  }
};

const downloadMediaInit = (type) => new Promise(async (resolve) => {
  mediaDownloadTimestamp = new Date().getTime();
  downloadMedia(0, type, resolve, mediaDownloadTimestamp);
});


export const realDbDownloadComplete = async (professionalChecked, homeChecked, offlineDownload, mediaUrlArr) => {
  const translations = globals.GET_APP_DATA('translationsArr');

  if (mediaUrlArr) {
    downloadedMedia = {
      [catelogueTypes.HOME_AND_GARDEN]: mediaUrlArr[catelogueTypes.HOME_AND_GARDEN],
      [catelogueTypes.PROFFESSIONAL]: mediaUrlArr[catelogueTypes.PROFFESSIONAL]
    };
  }


  try {
    globals.SET_APP_DATA('dbDownloadTask', null);
    refHandler.setDownloadModalLoading(true);

    const hgUrls = homeChecked ? await mediaUrlZipService(catelogueTypes.HOME_AND_GARDEN) : [];
    const proUrls = professionalChecked ? await mediaUrlZipService(catelogueTypes.PROFFESSIONAL) : [];
    // const hgUrls = [
    //   'https://ak-dca-s3-web-app.s3.eu-central-1.amazonaws.com/dummy_zip/AK_DCA_hg_1.zip',
    //   'https://ak-dca-s3-web-app.s3.eu-central-1.amazonaws.com/dummy_zip/AK_DCA_hg_2.zip',
    //   'https://ak-dca-s3-web-app.s3.eu-central-1.amazonaws.com/dummy_zip/AK_DCA_hg_3.zip',
    // ];
    // const proUrls = [
    //   'https://ak-dca-s3-web-app.s3.eu-central-1.amazonaws.com/dummy_zip/AK_DCA_pro_1.zip',
    //   'https://ak-dca-s3-web-app.s3.eu-central-1.amazonaws.com/dummy_zip/AK_DCA_pro_2.zip',
    //   'https://ak-dca-s3-web-app.s3.eu-central-1.amazonaws.com/dummy_zip/AK_DCA_pro_3.zip',
    // ];

    const totalMediaUrlsCount = (homeChecked ? hgUrls.length : 0) + (professionalChecked ? proUrls.length : 0);
    refHandler.setDownoadImageCount(totalMediaUrlsCount);
    globals.SET_APP_DATA('totalMediaCount', totalMediaUrlsCount);

    mediaUrls = {
      [catelogueTypes.HOME_AND_GARDEN]: hgUrls,
      [catelogueTypes.PROFFESSIONAL]: proUrls
    };
    refHandler.setDownloadModalLoading(false);

    if (professionalChecked && !pageProps.stopMediaDownload) {
      if (offlineDownload.proffesional_media_flag !== downloadingFlags.DOWNLOADED) {
        await downloadMediaInit(catelogueTypes.PROFFESSIONAL);
        Promise.all(mediaPromiseArr[catelogueTypes.PROFFESSIONAL]).then(() => {
          mediaDownloadAfterUnzip(catelogueTypes.PROFFESSIONAL);
        });
      }
    }
    if (homeChecked && !pageProps.stopMediaDownload) {
      if (offlineDownload.home_and_garden_media_flag !== downloadingFlags.DOWNLOADED) {
        await downloadMediaInit(catelogueTypes.HOME_AND_GARDEN);
        Promise.all(mediaPromiseArr[catelogueTypes.HOME_AND_GARDEN]).then(() => {
          mediaDownloadAfterUnzip(catelogueTypes.HOME_AND_GARDEN);
        });
      }
    }
  } catch (e) {
    if (globals.LIVE) console.log({ e });
    alertsManager.netConnectionError(translations);
    globals.SET_APP_DATA('isDownloadingCanceled', true);
    refHandler.checkHeaderDownload();
    refHandler.hideDownloadModal();
  }
};

export const dbDownloadComplete = async () => {
  const {
    professionalChecked,
    homeChecked,
    offlineDownload,
    mediaUrlArr
  } = pageProps;

  realDbDownloadComplete(professionalChecked, homeChecked, offlineDownload, mediaUrlArr);
};

const downloadData = async (index) => {
  const {
    professionalChecked,
    homeChecked,
    saveOfflineDownload,
    offlineDownload
  } = pageProps;
  // const translations = globals.GET_APP_DATA('translationsArr');
  let killOfflineDownload = globals.GET_APP_DATA('killOfflineDownload');
  if (killOfflineDownload) return;

  const dbName = downloadUrlArr[index];
  let isDownloaded = false;
  isDownloaded = offlineDownload.proffesional_db.split('|').includes(dbName)
    || offlineDownload.home_and_garden_db.split('|').includes(dbName);

  if (isDownloaded) {
    downloadedDbs = [...downloadedDbs, dbName];
    if (downloadUrlArr.length > (index + 1)) {
      // eslint-disable-next-line no-plusplus, no-param-reassign
      downloadData(++index);
    } else {
      dbDownloadComplete();
    }
  } else {
    const dbUrl = `${dbTempFolder}/${dbName}.realm`;

    const downloadUrl = downloadUrls[dbName];

    const dbDownloadTask = RNBackgroundDownloader.download({
      id: dbName,
      url: downloadUrl,
      destination: dbUrl
    })
      .begin((expectedBytes) => {
        if (!globals.LIVE) console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress((percent) => {
        if (!globals.LIVE) console.log('progress', percent * 100);
        refHandler.setupDownloadModal(percent * 100);
      })
      .done(async () => {
        if (!globals.LIVE) console.log('Download is done!');
        killOfflineDownload = globals.GET_APP_DATA('killOfflineDownload');
        if (killOfflineDownload) return;

        downloadedDbs = [...downloadedDbs, dbName];

        const downloadFlag = (downloadUrlArr.length > (index + 1)) ? downloadingFlags.DOWNLOADING : downloadingFlags.DOWNLOADED;

        const obj = {
          proffesional: professionalChecked ? downloadFlag : offlineDownload.proffesional,
          home_and_garden: homeChecked ? downloadFlag : offlineDownload.home_and_garden,
          proffesional_db: professionalChecked ? downloadedDbs.join('|') : offlineDownload.proffesional_db,
          home_and_garden_db: homeChecked ? downloadedDbs.join('|') : offlineDownload.home_and_garden_db,
          lastDownload: new Date().toString(),
          proffesional_media_flag: professionalChecked && !pageProps.stopMediaDownload ? downloadingFlags.DOWNLOADING : offlineDownload.proffesional_media_flag,
          home_and_garden_media_flag: homeChecked && !pageProps.stopMediaDownload ? downloadingFlags.DOWNLOADING : offlineDownload.home_and_garden_media_flag,
          mediaLastDownload: offlineDownload.mediaLastDownload
        };
        await saveOfflineDownload(obj);

        const dbUrlOld = `${dbBaseUrl}${dbName}.realm`;
        const dbUrlOldLock = `${dbBaseUrl}${dbName}.realm.lock`;
        const dbUrlOldManagement = `${dbBaseUrl}${dbName}.realm.management`;

        await deleteFile(dbUrlOldLock);
        await deleteFile(dbUrlOldManagement);
        await deleteFile(dbUrlOld);
        RNFetchBlob.fs.mv(dbUrl, dbUrlOld).then(() => { }).catch(() => { });

        if (downloadUrlArr.length > (index + 1)) {
          const isNetConnected = await helpers.isNetConnected();
          if (isNetConnected) {
            // eslint-disable-next-line no-plusplus, no-param-reassign
            downloadData(++index);
          }
        } else {
          dbDownloadComplete();
        }
      })
      .error((error) => {
        console.log('Download canceled due to error: ', error);
      });

    globals.SET_APP_DATA('dbDownloadTask', dbDownloadTask);
  }
};

const downloadDataInit = async (props) => {
  pageProps = { ...pageProps, ...props };
  downloadUrls = {};
  downloadUrlArr = [];
  downloadedDbs = [];

  const {
    saveOfflineDownload,
    offlineDownload,
    professionalChecked,
    homeChecked,
    useMobiledata
  } = props;
  const translations = globals.GET_APP_DATA('translationsArr');

  downloadedDbs = [...offlineDownload.proffesional_db.split('|'), ...offlineDownload.home_and_garden_db.split('|')];

  if (!professionalChecked && !homeChecked) {
    alertsManager.noCatelogueSelectedError(translations);
    return;
  }

  const isNetConnected = await helpers.isNetConnected();
  if (!isNetConnected) {
    alertsManager.netConnectionError(translations);
    return;
  }
  globals.SET_APP_DATA('isDownloadingStarted', true);

  const obj = {
    proffesional: professionalChecked ? downloadingFlags.DOWNLOADING : offlineDownload.proffesional,
    home_and_garden: homeChecked ? downloadingFlags.DOWNLOADING : offlineDownload.home_and_garden,
    proffesional_db: offlineDownload.proffesional_db,
    home_and_garden_db: offlineDownload.home_and_garden_db,
    lastDownload: offlineDownload.lastDownload,
    proffesional_media_flag: professionalChecked && !props.stopMediaDownload ? downloadingFlags.DOWNLOADING : offlineDownload.proffesional_media_flag,
    home_and_garden_media_flag: homeChecked && !props.stopMediaDownload ? downloadingFlags.DOWNLOADING : offlineDownload.home_and_garden_media_flag,
    mediaLastDownload: offlineDownload.mediaLastDownload
  };
  saveOfflineDownload(obj).then(async () => {
    try {
      const connectionType = await helpers.getConnectionType();
      if (connectionType === netType.CELLULAR && !useMobiledata) {
        alertsManager.wifiWaitingError(translations);
        globals.SET_APP_DATA('isDownloadingWaiting', true);
        refHandler.cancelDbDownload();
        refHandler.cancelMediaDownload();
        refHandler.toggleDownloadIco(false);
        return;
      }

      if (!props.isResumeMode) refHandler.toggleLoader(true);
      const dbRes = await getDownloadExport();

      if (!professionalChecked) delete dbRes[Config.PROFESSIONAL_DATABASE];
      if (!homeChecked) delete dbRes[Config.HOME_AND_GARDEN_DATABASE];
      delete dbRes.__typename;

      downloadUrls = dbRes;
      downloadUrlArr = Object.keys(downloadUrls);

      await helpers.manualDelay(1000);
      refHandler.toggleLoader(false, async () => {
        if (!props.isResumeMode) refHandler.showDownloadModal();

        refHandler.checkHeaderDownload();

        await deleteFolder(dbTempFolder);
        downloadData(0);
      });
    } catch (err) {
      refHandler.toggleLoader(false);
      alertsManager.downloadError(translations);
      globals.SET_APP_DATA('isDownloadingCanceled', true);
      refHandler.checkHeaderDownload();
    }
  });
};

export default downloadDataInit;
