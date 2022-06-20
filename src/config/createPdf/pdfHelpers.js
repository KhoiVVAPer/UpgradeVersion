import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ImgToBase64 from 'react-native-image-base64';
import * as globals from '../libs/globals';
import appConstants from '../libs/constants';
import { imageUrlFormat, imageSavedCheck } from '../libs/helpers';
import { dimentions } from './pdfContants';

const { appFonts } = appConstants;

const getImageBase64 = (savedUrl) => new Promise(async (resolve) => {
  ImgToBase64.getBase64String(savedUrl)
    .then((base64String) => {
      resolve(`data:image/png;base64, ${base64String}`);
    })
    .catch(() => {
      resolve(`file://${savedUrl}`);
    });
});

const checkImageInDocuments = (url) => new Promise(async (resolve) => {
  const imageUrlFormatted = await imageUrlFormat(url);
  const savedUrl = `${globals.IMAGE_SAVE_LOCATION}/${imageUrlFormatted}`;
  RNFetchBlob.fs.exists(savedUrl)
    .then(async (exist) => {
      if (exist) {
        const resUrl = await getImageBase64(savedUrl);
        resolve(resUrl);
      } else {
        const resUrl = await getImageBase64(url);
        resolve(resUrl);
      }
    }).catch(() => {
      resolve(url);
    });
});

/**
 * Returns array of image urls. If url in cache then
 * cache url will be retunred otherwise web url is returned
 * @param {Array} data is urls to be check in cache if
 * not in cache then store in cache
 * @param {String} prop is key of image in data array object
 */
const getImageFromCache = (data, prop) => new Promise((resolve) => {
  let imageUrlArr = [];
  const getImage = async (index) => {
    const url = prop ? (data[index][prop] || '') : data[index];
    let imageUrl = '';
    if (url) {
      imageUrl = Platform.OS === 'ios' ? await checkImageInDocuments(url) : await imageSavedCheck(url);
    }

    imageUrlArr = [...imageUrlArr, imageUrl];

    if (data.length === (index + 1)) {
      resolve(imageUrlArr);
    } else {
      getImage((index + 1));
    }
  };
  getImage(0);
});

/**
 * Creates a vreadcrumb for pdf
 * @param {Int} id is a pageId of current page
 * @param {Array} structureData is array of app navigation structure
 */
const getBreadcrumbArr = (id, structureData) => new Promise((resolve) => {
  let navigationObjArr = [];
  const buildNavigation = (nav) => {
    if (nav && nav.parentId) {
      const activeRouteObj = structureData.find((item) => (item.id === parseInt(nav.parentId)));
      navigationObjArr.push(activeRouteObj);
      buildNavigation(activeRouteObj);
    } else {
      resolve([...navigationObjArr].reverse());
    }
  };

  const buildNavigationInit = (pageId) => {
    const activeRouteObj = structureData.find((item) => (item.id === parseInt(pageId)));
    if (activeRouteObj) {
      navigationObjArr = [activeRouteObj];
      buildNavigation(activeRouteObj);
    } else {
      resolve([...navigationObjArr].reverse());
    }
  };
  buildNavigationInit(id);
});

/**
 * Formated anchor tag in html string
 * @param {String} str is hrml string
 */
const formatAnchorTag = (str) => {
  if (!str.includes('{this.globalAppNavigation(')) return str;
  const strArr1 = str.split('{this.globalAppNavigation(');
  const strArr2 = str.split(')}}>');
  return `${strArr1[0]}${strArr2[1]}`;
};

/**
 * Set pdf height and width
 * @param {String} mode is pdf mode for portrait and landscape
 */
const setPdfDimention = (mode) => ({
  height: mode === dimentions.PORTRAIT ? 792 : 612,
  width: mode === dimentions.PORTRAIT ? 612 : 792
});

/**
 * Convert cached fonts to base64 url
 */
const fontToBase64 = () => new Promise(async (parentResolve) => {
  let clanProNarrBold = `${globals.DOCUMENT_DIR}${appFonts.clanProNarrBold}`;
  let clanProNarrBook = `${globals.DOCUMENT_DIR}${appFonts.clanProNarrBook}`;
  const getBase64 = (fontUrl) => new Promise((childResolve) => {
    RNFetchBlob.fs.readFile(fontUrl, 'base64')
      .then((res) => {
        childResolve(`data:font/otf;base64,${res}`);
      }).catch((err) => {
        console.log({ err });
      });
  });

  if (Platform.OS === 'ios') {
    clanProNarrBold = await getBase64(clanProNarrBold);
    clanProNarrBook = await getBase64(clanProNarrBook);
  }
  parentResolve({
    clanProNarrBold,
    clanProNarrBook
  });
});

export {
  getBreadcrumbArr,
  getImageBase64,
  getImageFromCache,
  formatAnchorTag,
  setPdfDimention,
  fontToBase64
};
