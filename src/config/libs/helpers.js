/**
 * @fileoverview All the reusabled and hlper functions
 * used in aplication are retuned from this config file
 * @package
 */
// import { AppState, Platform } from 'react-native';
import Auth from '@aws-amplify/auth';
import Realm from 'realm';
import Config from 'react-native-config';
import RNFetchBlob from 'rn-fetch-blob';
import analytics from '@react-native-firebase/analytics';
import { ACPCore } from '@adobe/react-native-acpcore';
import NetInfo from '@react-native-community/netinfo';
import * as globals from './globals';
import appConstants from './constants';
import {
  PROFESSIONAL_DB_OPTIONS,
  HOME_AND_GARDEN_DB_OPTIONS,
  COMMON_DB_OPTIONS,
  LOCAL_DB_OPTIONS
} from '../../realm';
import getAppFonts from '../../services/appFonts';

const { appFonts } = appConstants;

const Analytics = analytics();


// abc def xyz  --->   abcDefXyz
const relaceSpaceWithCamelCase = str => (str || '')
  .split(' ')
  .map((c, i) => (i === 0 ? c : c[0].toUpperCase() + c.slice(1)))
  .join('');

// de-AT --->   de
// en    --->   en
const getLanguageCode = str => (str || '').split('-')[0];

const getFileName = str => str.replace(/^.*[\\/]/, '');

/**
 * Check if object is empty
 */
const isEmptyObject = (obj) => {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Changing app header key or adding key's to header for api request
 */
const buildHeader = (headerParams = {}) => {
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };
  header = { ...header, ...headerParams };
  return header;
};

/**
 * Create dynamic aspect ratio of image by taking its height and width
 * @param {int} val is division of image as => width/height
 * @param {int} lim limit of ratio of image
 */
const aspectRatio = (val, lim) => {
  let lower = [0, 1];
  let upper = [1, 0];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const mediant = [lower[0] + upper[0], lower[1] + upper[1]];

    if (val * mediant[1] > mediant[0]) {
      if (lim < mediant[1]) {
        return upper;
      }
      lower = mediant;
    } else if (val * mediant[1] === mediant[0]) {
      if (lim >= mediant[1]) {
        return mediant;
      }
      if (lower[1] < upper[1]) {
        return lower;
      }
      return upper;
    } else {
      if (lim < mediant[1]) {
        return lower;
      }
      upper = mediant;
    }
  }
};

/**
 * Login user to aws congnito
 */
const loginCognitoUser = () => new Promise(async (resolve, reject) => {
  try {
    let userToken = globals.GET_APP_DATA('userToken');
    const user = await Auth.signIn(Config.COGNITO_USERNAME, Config.COGNITO_PASSWORD);
    userToken = user.signInUserSession.idToken.jwtToken;
    globals.SET_APP_DATA('userToken', userToken);
    resolve(userToken);
  } catch (err) {
    reject();
  }
});

/**
 * Get aws congnito authentication token
 */
const getCongnitoToken = () => new Promise(async (resolve, reject) => {
  try {
    let userToken = globals.GET_APP_DATA('userToken');
    if (userToken === '') {
      const userLoginToken = await loginCognitoUser();
      resolve(userLoginToken);
      return;
    }
    Auth.currentSession().then((data) => {
      const currentUserToken = data.idToken.jwtToken;
      console.log('currentSession', currentUserToken);
      globals.SET_APP_DATA('userToken', currentUserToken);
      resolve(currentUserToken);
    }).catch(async () => {
      userToken = await loginCognitoUser();
      resolve(userToken);
    });
  } catch (err) {
    reject();
  }
});

const navDataPush = (route) => {
  let activeNavStack = globals.GET_APP_DATA('activeNavStack');
  activeNavStack = [...activeNavStack, route];
  globals.SET_APP_DATA('activeNavStack', activeNavStack);
};

const navDataPop = () => {
  const activeNavStack = globals.GET_APP_DATA('activeNavStack');
  activeNavStack.pop();
  globals.SET_APP_DATA('activeNavStack', activeNavStack);
};

/**
 * Split url in mobile readable format
 * @param {String} url Web image url returned from api
 * @return {object} Object with promise
 */
const imageUrlFormat = (url) => new Promise((resolve) => {
  let formattedUrl = url.split('http://').join('');
  formattedUrl = formattedUrl.split('https://').join('');
  formattedUrl = formattedUrl.split('/').join('-');
  formattedUrl = formattedUrl.split(' ').join('');
  resolve(formattedUrl);
});

/**
 * Save image in mobile
 * @param {String} imageUrl :  Web image url returned from api
 * @return {object}   Object with promise
 */
const imageSave = (imageUrl) => new Promise(async (resolve) => {
  const imageUrlFormatted = await imageUrlFormat(imageUrl);
  RNFetchBlob.config({
    path: `${globals.IMAGE_SAVE_LOCATION}/${imageUrlFormatted}`
  }).fetch('GET', imageUrl, {
  }).then(() => {
    resolve();
  }).catch((err) => {
    console.log(err);
    resolve();
  });
});

/**
 * This function returns status of whether device is
 * connected to internet or not
 */
const isNetConnected = () => new Promise((resolve) => {
  NetInfo.fetch().then((state) => {
    resolve(state.isConnected);
  });
});

/**
 * Deleted the file from provided url
 * @param {String} url of file to be deleted
 */
const deleteFile = (url) => new Promise((resolve) => {
  RNFetchBlob.fs.unlink(url).then(() => {
    resolve();
  }).catch(() => { });
});


/**
 * Check if image is alreay stored in mobile
 * @param {String} url : Web image url returned from api
 * @return {object}   Object with promise
 */
const imageSavedCheck = async (url) => {
  let imageUrlFormatted = await imageUrlFormat(url);
  return new Promise((resolve, reject) => {
    imageUrlFormatted = `${globals.IMAGE_SAVE_LOCATION}/${imageUrlFormatted}`;
    RNFetchBlob.fs.exists(imageUrlFormatted)
      .then(async (exist) => {
        const isConnected = await isNetConnected();
        if (isConnected) {
          if (exist) {
            await deleteFile(imageUrlFormatted);
          }
          await imageSave(url);
          resolve(url);
        } else if (exist) {
          resolve(`file://${imageUrlFormatted}`);
        } else {
          // if we do not have internet, FOR SURE, the fetch.('GET' in this function will not work
          // await imageSave(url);
          // resolve(url);
          reject(new Error('image not found on device, and no connection available to download it'));
        }
        // AND CATCHING AND IGNORING ALL EXCEPTIONS IS JUST ASKING FOR TROUBLE
        // }).catch(() => { });
      }).catch((error) => {
        console.warn('Error in imageSaveCheck', error);
      });
  });
};


/**
 * Function to handle multiple taps on device
 * @param {function} callback is function to be called after tap
 * @param {int}      wait is delay to be added for tap
 * @param {object}   context is context for the function
 */
const debounce = (callback, wait, context = this) => {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  // eslint-disable-next-line func-names
  return function () {
    // eslint-disable-next-line prefer-rest-params
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


/**
 * This function returns information of device
 * internet connection
 */
const netConnectionInfo = () => new Promise((resolve) => {
  // if (Platform.OS === 'ios' && AppState.currentState.match(/inactive|background/)) {
  //   resolve(false);
  //   return;
  // }
  NetInfo.fetch().then((state) => {
    resolve(state);
  });
});

/**
 * Returns root parent name of provided page id
 * @param {int} apiId is id of page
 */
const getRootPage = (apiId, source = '') => {
  const structureData = globals.GET_APP_DATA('structureData');
  const catalogueNames = globals.GET_APP_DATA('catalogueNames');
  const catalogueIds = globals.GET_APP_DATA('catalogueIds');

  const promise = new Promise((resolve, reject) => {
    const iterateRootPage = (nav) => {
      if (nav && nav.parentId) {
        if (nav.title === catalogueNames.HOME_AND_GARDEN || nav.title === catalogueNames.PROFESSIONAL) {
          if (nav.title === catalogueNames.HOME_AND_GARDEN) {
            resolve(catalogueIds.HOME_AND_GARDEN);
          } else if (nav.title === catalogueNames.PROFESSIONAL) {
            resolve(catalogueIds.PROFESSIONAL);
          } else {
            resolve(nav.id);
          }
        } else {
          const activeRouteObj = structureData.find((item) => (item.id === nav.parentId));
          iterateRootPage(activeRouteObj);
        }
      } else {
        resolve(nav.id);
      }
    };
    if (!apiId) resolve(null);

    const nav = structureData.find((item) => (apiId === item.id));
    if (!nav && source === 'header') {
      reject();
    } else {
      iterateRootPage(nav);
    }
  });
  return promise;
};

/**
 * This funtion decides which database is to be used
 * for database query
 * @param {string} db is name of database to is used
 * @param {int}    apiId is id of page from which we want to decide name of database
 */
const getDb = async (db, apiId) => {
  const rootNav = globals.GET_APP_DATA('rootNav');
  let { componentId } = rootNav;

  const checkParent = globals.GET_APP_DATA('checkParent');

  if (checkParent && !db) {
    componentId = await getRootPage(apiId);
  } else {
    componentId = !db && componentId ? componentId : db;
  }

  const catalogueIds = globals.GET_APP_DATA('catalogueIds');

  if (
    // eslint-disable-next-line eqeqeq
    componentId != catalogueIds.HOME_AND_GARDEN
    // eslint-disable-next-line eqeqeq
    && componentId != catalogueIds.PROFESSIONAL
    // eslint-disable-next-line eqeqeq
    && componentId != Config.COMMON_DATABASE
    // eslint-disable-next-line eqeqeq
    && componentId != Config.LOCAL_DATABASE
    // eslint-disable-next-line eqeqeq
    && componentId != Config.HOME_AND_GARDEN_DATABASE
    // eslint-disable-next-line eqeqeq
    && componentId != Config.PROFESSIONAL_DATABASE
  ) {
    componentId = rootNav.componentId;
  }

  const promise = new Promise((resolve) => {
    switch (String(componentId)) {
      case catalogueIds.HOME_AND_GARDEN:
      case Config.HOME_AND_GARDEN_DATABASE:
        Realm.open(HOME_AND_GARDEN_DB_OPTIONS).then((realm) => {
          resolve(realm);
        });
        break;

      case catalogueIds.PROFESSIONAL:
      case Config.PROFESSIONAL_DATABASE:
        Realm.open(PROFESSIONAL_DB_OPTIONS).then((realm) => {
          resolve(realm);
        });
        break;

      case Config.COMMON_DATABASE:
        Realm.open(COMMON_DB_OPTIONS).then((realm) => {
          resolve(realm);
        });
        break;

      case Config.LOCAL_DATABASE:
        Realm.open(LOCAL_DB_OPTIONS).then((realm) => {
          resolve(realm);
        });
        break;

      default:
        break;
    }
  });
  return promise;
};

/**
 * Function give pure date and restore time in provided timestamp
 * @param {str} str is timestamp string
 */
const dateWithoutTime = (str) => {
  let d = new Date(str);
  d.setHours(0, 0, 0, 0);
  d = d.getTime();
  return d;
};

/**
 * This function retunes promise to get internet connection type
 */
const getConnectionType = () => new Promise((resolve) => {
  NetInfo.fetch().then((state) => {
    resolve(state.type);
  });
});

/**
 * This function retuns promise to get internet connection information
 */
const getConnectionInfo = () => new Promise((resolve) => {
  NetInfo.fetch().then((state) => {
    resolve(state);
  });
});

/**
 * Function is used to delay execution of next line by time
 * @param {int} time is number in milisecconds
 */
const manualDelay = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time || 500);
});

/**
 * Convert a string to a key to pass as identifier
 * for the components
 * @param {string} str is a string which to be converted as a kwy
 */
const strToKey = (input) => {
  if (!input) return String('');

  const str = input.replace(/[^a-zA-Z 0-9 ]/g, '');

  let newStr = '';
  const arr = str.split(' ');
  newStr = arr.join('_');
  return String(newStr.toLocaleLowerCase());
};

/**
 * Returns array of style objects
 * @param {Object/Array} style is array/object of
 * style to be provided for component
 */
const combineStylesArr = (style) => {
  let textStyle = [{}];
  if (style) {
    if (Array.isArray(style)) {
      textStyle = style.map((styleItem) => ({ ...styleItem }));
    } else {
      textStyle = [style];
    }
  }
  return textStyle;
};

/**
 * Generated an single object of styles from array of styles
 * @param {array} style is array of styles
 * @return single object of style
 */
const combineStylesObj = (style) => {
  const styleArr = combineStylesArr(style);
  let styleObj = {};
  styleArr.map((item) => {
    styleObj = { ...styleObj, ...item };
    return null;
  });
  return styleObj;
};

/**
 * Get application environment
 */
const getAppEnv = () => {
  const urlArr = globals.SERVER_URL.split('/');
  const envType = urlArr[urlArr.length - 1];
  if (envType === 'prod') return '';
  return `( ${envType.charAt(0).toUpperCase()}${envType.slice(1)} )`;
};

/**
 * Convert array in chunk of sub-arrays
 */
const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
};

/**
 * Saves font into device's document directory
 * @param {String} fontUrl is signed url from api
 * @param {String} fontName is name with which font to be saved
 */
const cacheFonts = (fontUrl, fontName) => new Promise((resolve) => {
  RNFetchBlob.config({
    path: `${globals.DOCUMENT_DIR}/${fontName}`
  }).fetch('GET', fontUrl, {
  }).then(() => {
    resolve();
  }).catch(() => { });
});

/**
 * Save tick image in mobile
 * @param {String} imageUrl :  Web image url returned from api
 * @return {object}   Object with promise
 */
const tickImageSave = (imageUrl) => new Promise(async (resolve) => {
  RNFetchBlob.config({
    path: `${globals.IMAGE_SAVE_LOCATION}/tick.png`
  }).fetch('GET', imageUrl, {
  }).then(() => {
    resolve();
  }).catch((err) => {
    console.log(err);
  });
});

/**
 * Track anaylics events using firebase and adobe analytics
 * @param {String} event is name of event
 * @param {Object} eventObj is object with event details
 */
const analyticsEvent = (event, eventObj, universal) => {
  if (universal.analyticsTracking === null || universal.analyticsTracking) {
    Analytics.logEvent(event, eventObj);
    ACPCore.trackAction(event, eventObj);
  }
};

const pageInfoAnalytics = ({ pageState, pageName, appSection, pageType }) => {
  console.log('In pageInfoAnalytics===>', pageState, pageName, appSection, pageType)
  if (pageName) {
    ACPCore.trackState(pageState, pageName);
  }
  if (appSection) {
    ACPCore.trackState(pageState, pageName);
  }
};

const analyticsAction = ({ actionType, actionObj }) => {
  console.log('In analyticsAction===>', actionType, actionObj)
  ACPCore.trackAction(actionType, actionObj);
};

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
 * Check if app data is cached or not
 */
const checkCacheData = () => new Promise(async (resolve) => {
  const isFont1 = await isFileExist(`${globals.DOCUMENT_DIR}/${appFonts.clanProNarrBook}`);
  const isFont2 = await isFileExist(`${globals.DOCUMENT_DIR}/${appFonts.clanProNarrBold}`);
  const isMarkICon = await isFileExist(`${globals.IMAGE_SAVE_LOCATION}/tick.png`);

  const isAllCached = isFont1 && isFont2 && isMarkICon;
  resolve(isAllCached);
});

/**
 * Cache app data
 */
const cacheAppData = async () => {
  const isAllCached = await checkCacheData();
  if (!isAllCached) {
    const fontUrls = await getAppFonts(isNetConnected, getCongnitoToken);
    await cacheFonts(fontUrls.CLANPRO_NARRBOOK, appFonts.clanProNarrBook);
    await cacheFonts(fontUrls.CLANPRO_NARRBOOK_BOLD, appFonts.clanProNarrBold);
    await tickImageSave(fontUrls.TICK_IMG_URL);
  }
};

/**
 * Takes a plane text, identified url from text and
 * adds anchor tag on the link
 * @param {String} text is plane text
 */
const addAnchorToUrl = (text) => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(urlRegex, (url) => `<a href="${url}">${url}</a>`);
};

/**
 * This function retuns short description from texts
 */
const getShortDescription = (texts) => {
  if (texts && Array.isArray(texts)) {
    const text = texts.find(({ type }) => type === 'short');
    if (text) return text.value;
  }
  return null;
};


const sortStringsInAscendingOrder = (arr, key) => {
  const sortArr = (a, b) => {
    // eslint-disable-next-line no-param-reassign
    a = a.toLowerCase();
    // eslint-disable-next-line no-param-reassign
    b = b.toLowerCase();

    // eslint-disable-next-line no-nested-ternary
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  };
  if (arr && Array.isArray(arr)) {
    return arr.sort((a, b) => sortArr(a[key], b[key]));
  }
  return [];
};

const sortCountriesAndLanguage = (countries) => {
  let temp = [];
  if (countries && Array.isArray(countries)) {
    countries.forEach((country) => {
      // eslint-disable-next-line no-param-reassign
      country.languages = sortStringsInAscendingOrder(country.languages, 'languageName');
      temp.push(country);
    });
    temp = sortStringsInAscendingOrder(temp, 'name');
    return temp;
  }
  return [];
};

function sortNumberInAscendingOrder(arr, key) {
  // eslint-disable-next-line no-nested-ternary
  const sortArr = (a, b) => ((a < b) ? -1 : (a > b) ? 1 : 0);
  if (arr && Array.isArray(arr)) {
    return arr.sort((a, b) => sortArr(a[key], b[key]));
  }
  return [];
}

function getProductCompareLabels(productDetailsArr) {
  const techDataLabels = [];
  const equipmentLabels = [];
  const techDataNames = [];
  productDetailsArr.map((item1) => {
    if (item1.techdata) {
      item1.techdata.map((item2) => {
        if (!techDataNames.includes(item2.name)) {
          techDataNames.push(item2.name);
          techDataLabels.push(item2.label);
        }
        return null;
      });
    }
    if (item1.equipment) {
      item1.equipment.map((item2) => {
        if (!equipmentLabels.includes(item2.label)) {
          equipmentLabels.push(item2.label);
        }
        return null;
      });
    }
    return null;
  });
  return {
    techDataLabels,
    equipmentLabels,
    techDataNames
  };
}

export {
  isEmptyObject,
  buildHeader,
  aspectRatio,
  getCongnitoToken,
  navDataPush,
  navDataPop,
  imageUrlFormat,
  imageSave,
  imageSavedCheck,
  debounce,
  isNetConnected,
  isFileExist,
  netConnectionInfo,
  getRootPage,
  getDb,
  dateWithoutTime,
  getConnectionType,
  getConnectionInfo,
  manualDelay,
  strToKey,
  combineStylesArr,
  combineStylesObj,
  getAppEnv,
  chunkArray,
  cacheFonts,
  tickImageSave,
  analyticsEvent,
  pageInfoAnalytics,
  analyticsAction,
  relaceSpaceWithCamelCase,
  getLanguageCode,
  getFileName,
  cacheAppData,
  addAnchorToUrl,
  getShortDescription,
  sortStringsInAscendingOrder,
  sortCountriesAndLanguage,
  sortNumberInAscendingOrder,
  getProductCompareLabels
};
