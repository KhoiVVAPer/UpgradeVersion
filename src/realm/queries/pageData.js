import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save page content list into databse
 * @param {Object} realm is instance of page data into which content to be saved
 * @param {Integer} pageId is unique id of page
 * @param {Object} contentRealm key of page data into which content to be saved
 * @param {Array} dataArr is list of page contents
 */
const savePageContentDb = (realm, pageId, contentRealm, dataArr) => {
  dataArr.map((dataObj) => {
    let contentId = realm.objects(schemas.PAGE_CONTENT).max('contentId');
    contentId = contentId ? contentId + 1 : 1;
    contentRealm.push({
      contentId,
      pageId,
      id: dataObj.id,
      type: dataObj.type,
      config: dataObj.config,
    });
    return null;
  });
};

/**
 * Delete page data and page content data
 * @param {Int} pageId is unique id of page
 * @return {Boolean} if page data is deleted
 */
const deletePageDataDb = (pageId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const pageData = realm.objects(schemas.PAGE_DATA).filtered(`pageId=${pageId}`);
      realm.delete(pageData);

      const pageContent = realm.objects(schemas.PAGE_CONTENT).filtered(`pageId=${pageId}`);
      realm.delete(pageContent);

      resolve(true);
    });
  });
});

/**
 * Save page content list into databse
 * @param {Int} id is unique id of page
 * @param {Object} dataObj is data of page
 */
const savePageDataDb = async (productGroupId, dataObj) => {
  const pageId = parseInt(productGroupId);

  await deletePageDataDb(pageId);

  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.PAGE_DATA).max('id');
      id = id ? id + 1 : 1;
      const pageData = realm.create(schemas.PAGE_DATA, {
        id,
        pageId,
        style: dataObj.style,
        export: dataObj.export,
        year: dataObj.year,
        country: dataObj.country,
        language: dataObj.language,
        createdAt: dataObj.createdAt,
        content: [],
      });
      savePageContentDb(realm, pageId, pageData.content, dataObj.content);
    });
    // realm.close();
  });
};

/**
 * Get page data and pge content data
 * @param {Int} pageId is unique id of page
 * @return {Object} page data and pge content data
 */
const getPageDataDb = (pageId) => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    let pageData = realm.objects(schemas.PAGE_DATA).filtered(`pageId=${pageId}`);
    pageData = Array.from(pageData);

    if (!pageData[0]) resolve(undefined);

    let pageContent = realm.objects(schemas.PAGE_CONTENT).filtered(`pageId=${pageId}`);
    pageContent = Array.from(pageContent);

    // eslint-disable-next-line arrow-body-style
    pageContent = pageContent.map((item) => {
      return { ...item };
    });

    const obj = {
      ...pageData[0],
      content: pageContent
    };
    resolve(obj);
  });
});

export {
  savePageDataDb,
  getPageDataDb,
  deletePageDataDb
};
